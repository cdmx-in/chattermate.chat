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

The server-side embed snippet matches what the dashboard hands out.
"""

from app.core.config import settings
from app.utils.widget_embed import widget_snippet


def test_snippet_points_at_this_install(monkeypatch):
    monkeypatch.setattr(settings, "BACKEND_URL", "https://api.example.com/")
    monkeypatch.setattr(settings, "FRONTEND_URL", "https://app.example.com/")
    assert widget_snippet("w-1") == (
        "<script>\n"
        "  window.chattermateId = 'w-1';\n"
        "  window.chattermateBaseUrl = 'https://api.example.com/api/v1';\n"
        "</script>\n"
        '<script src="https://app.example.com/webclient/chattermate.min.js"></script>'
    )
