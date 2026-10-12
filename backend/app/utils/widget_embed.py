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

The embed snippet for a widget, server-side - the twin of the frontend's
buildWidgetEmbed (frontend/src/utils/widgetEmbed.ts, simple variant). Keep
the two in step: an email that hands out a different snippet than the
dashboard would install a widget that behaves differently.
"""

from app.core.config import settings


def widget_snippet(widget_id: str) -> str:
    """The anonymous embed: the widget id and API base, then the loader the
    dashboard serves. Agents that require token auth need a backend call and
    get their snippet from the dashboard instead."""
    api_url = f"{settings.BACKEND_URL.rstrip('/')}{settings.API_V1_STR}"
    loader_origin = settings.FRONTEND_URL.rstrip("/")
    return (
        "<script>\n"
        f"  window.chattermateId = '{widget_id}';\n"
        f"  window.chattermateBaseUrl = '{api_url}';\n"
        "</script>\n"
        f'<script src="{loader_origin}/webclient/chattermate.min.js"></script>'
    )
