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

from typing import Optional

from app.core.socketio import sio


async def emit_to_session_agents(event: str, payload: dict, session_id,
                                 user_id: Optional[object] = None) -> None:
    """Push a live update to the dashboard for one conversation.

    The inbox listens on the handling agent's personal room (user_<id>); the
    session room reaches anyone who joined that conversation explicitly.
    """
    if user_id is not None:
        await sio.emit(event, payload, room=f"user_{user_id}", namespace='/agent')
    await sio.emit(event, payload, room=str(session_id), namespace='/agent')
