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

from sqlalchemy import exc
from sqlalchemy.pool import QueuePool
from sqlalchemy.util import queue as sqla_queue

logger = logging.getLogger(__name__)


def _on_event_loop() -> bool:
    try:
        asyncio.get_running_loop()
        return True
    except RuntimeError:
        return False


class LoopSafeQueuePool(QueuePool):
    """A QueuePool that never makes the event loop wait for a connection.

    Socket handlers, async routes and agent tools run sync queries on the event
    loop. When the pool is full, a plain QueuePool blocks the loop until a
    connection comes back, but the connections out are held by coroutines
    suspended at an await, and by request teardowns that close their session
    from the loop. None of them can give theirs back while the loop is blocked,
    so the whole server froze until the timeout ran out.

    So on the loop, a full pool opens up to loop_overflow connections past its
    limit (they close again as they come back), and beyond that a checkout fails
    at once: one failed call instead of every user waiting. Checkouts from
    threads wait as usual, since the loop keeps running while they do.
    """

    loop_overflow = 10

    def _do_get(self):
        if self._max_overflow == -1 or not _on_event_loop():
            return super()._do_get()
        try:
            return self._pool.get(False)
        except sqla_queue.Empty:
            pass
        with self._overflow_lock:
            if self._overflow >= self._max_overflow + self.loop_overflow:
                raise exc.TimeoutError(
                    "QueuePool limit of size %d overflow %d reached on the event "
                    "loop, which never waits for a connection"
                    % (self.size(), self.overflow()),
                    code="3o7r",
                )
            beyond_limit = self._overflow >= self._max_overflow
            self._overflow += 1
        if beyond_limit:
            logger.warning(
                "Connection pool full: opened one past its limit for the event "
                "loop (%s)", self.status())
        try:
            return self._create_connection()
        except BaseException:
            self._dec_overflow()
            raise
