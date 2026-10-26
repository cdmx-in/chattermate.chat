"""
Copyright 2024-2026 ChatterMate

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""

import asyncio
import logging
import time
from unittest.mock import MagicMock

import pytest
from sqlalchemy import exc
from sqlalchemy.pool import QueuePool

from app import database
from app.core.loop_safe_pool import LoopSafeQueuePool


def make_pool(pool_class=LoopSafeQueuePool, *, pool_size=1, max_overflow=0, timeout=5.0, loop_overflow=None):
    creator = MagicMock(side_effect=lambda: MagicMock(name="dbapi connection"))
    pool = pool_class(creator, pool_size=pool_size, max_overflow=max_overflow, timeout=timeout)
    if loop_overflow is not None:
        pool.loop_overflow = loop_overflow
    return pool, creator


def on_loop(fn):
    async def run():
        return fn()
    return asyncio.run(run())


async def hold_across_an_await(pool, seconds):
    # A handler that took a connection and is now awaiting an emit or a service
    conn = pool.connect()
    await asyncio.sleep(seconds)
    conn.close()


async def check_out_while_the_pool_is_full(pool):
    await asyncio.sleep(0)  # let the holder take the only connection first
    conn = pool.connect()
    conn.close()


def run_the_freeze(pool):
    async def both():
        await asyncio.gather(hold_across_an_await(pool, 0.05), check_out_while_the_pool_is_full(pool))
    started = time.monotonic()
    asyncio.run(both())
    return time.monotonic() - started


def test_a_plain_pool_freezes_the_loop_until_it_times_out():
    """The bug: the holder can't give its connection back while the loop waits."""
    pool, _ = make_pool(QueuePool, timeout=0.3)

    started = time.monotonic()
    with pytest.raises(exc.TimeoutError):
        run_the_freeze(pool)

    assert time.monotonic() - started >= 0.3


def test_a_connection_held_across_an_await_no_longer_freezes_the_loop():
    pool, _ = make_pool(timeout=5.0)

    elapsed = run_the_freeze(pool)

    assert elapsed < 1.0
    assert pool.checkedout() == 0


def test_on_the_loop_an_idle_connection_is_reused():
    pool, creator = make_pool()

    def twice():
        pool.connect().close()
        pool.connect().close()
    on_loop(twice)

    assert creator.call_count == 1


def test_on_the_loop_a_full_pool_opens_one_more_instead_of_waiting(caplog):
    pool, creator = make_pool(timeout=5.0)
    held = pool.connect()

    started = time.monotonic()
    with caplog.at_level(logging.WARNING, logger="app.core.loop_safe_pool"):
        extra = on_loop(pool.connect)

    assert time.monotonic() - started < 1.0
    assert creator.call_count == 2
    assert pool.checkedout() == 2
    assert "past its limit" in caplog.text
    extra.close()
    held.close()


def test_within_its_own_overflow_the_loop_opens_connections_without_a_warning(caplog):
    pool, creator = make_pool(max_overflow=1)
    held = pool.connect()

    with caplog.at_level(logging.WARNING, logger="app.core.loop_safe_pool"):
        extra = on_loop(pool.connect)

    assert creator.call_count == 2
    assert "past its limit" not in caplog.text
    extra.close()
    held.close()


def test_past_its_headroom_the_loop_fails_at_once_rather_than_waiting():
    pool, _ = make_pool(timeout=5.0, loop_overflow=1)
    held = [pool.connect(), on_loop(pool.connect)]

    started = time.monotonic()
    with pytest.raises(exc.TimeoutError, match="event loop"):
        on_loop(pool.connect)

    assert time.monotonic() - started < 1.0
    for conn in held:
        conn.close()


def test_connections_opened_past_the_limit_close_as_they_come_back():
    pool, _ = make_pool(pool_size=1, max_overflow=0)
    held = pool.connect()
    overflow_before = pool.overflow()
    extra = on_loop(pool.connect)
    dbapi_connections = [held.dbapi_connection, extra.dbapi_connection]

    extra.close()
    held.close()

    assert pool.checkedout() == 0
    assert pool.checkedin() == 1
    assert pool.overflow() == overflow_before
    # whichever came back to a full pool was closed, not kept
    assert sum(c.close.called for c in dbapi_connections) == 1


def test_a_failed_connect_on_the_loop_gives_its_place_back():
    pool, creator = make_pool()
    held = pool.connect()
    overflow_before = pool.overflow()
    creator.side_effect = OSError("database is down")

    with pytest.raises(OSError):
        on_loop(pool.connect)

    assert pool.overflow() == overflow_before
    held.close()


def test_a_thread_still_waits_and_times_out_as_before():
    pool, _ = make_pool(timeout=0.2)
    held = pool.connect()

    started = time.monotonic()
    with pytest.raises(exc.TimeoutError):
        pool.connect()

    assert time.monotonic() - started >= 0.2
    held.close()


def test_work_moved_off_the_loop_into_a_thread_waits_as_before():
    pool, _ = make_pool(timeout=0.2)
    held = pool.connect()

    async def from_a_thread():
        return await asyncio.to_thread(pool.connect)

    with pytest.raises(exc.TimeoutError):
        asyncio.run(from_a_thread())
    held.close()


def test_an_unlimited_pool_is_left_alone():
    pool, creator = make_pool(max_overflow=-1)
    held = pool.connect()

    extra = on_loop(pool.connect)

    assert creator.call_count == 2
    extra.close()
    held.close()


def test_the_app_engine_uses_it_and_keeps_it_in_a_forked_worker():
    assert isinstance(database.engine.pool, LoopSafeQueuePool)
    size, overflow = database.engine.pool.size(), database.engine.pool._max_overflow

    database._fresh_pool_after_fork()

    assert isinstance(database.engine.pool, LoopSafeQueuePool)
    assert (database.engine.pool.size(), database.engine.pool._max_overflow) == (size, overflow)
