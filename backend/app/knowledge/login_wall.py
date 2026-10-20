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

Pages that ask for a password are not knowledge: a store's admin, a site's
sign-in page, or a Shopify store that isn't open to visitors yet (its "Opening
soon" page). Storing one teaches the agent a login form, and following links
into them only reaches more of the same.
"""

from typing import Optional
from urllib.parse import urlparse

from bs4 import BeautifulSoup

# Leading path segments that are sign-in or admin areas, not public content
AUTH_PATHS = (
    "admin",
    "account/login",
    "account/register",
    "auth",
    "log-in",
    "login",
    "password",
    "sign-in",
    "signin",
    "user/login",
    "wp-admin",
    "wp-login.php",
)

# Said when someone adds one, so they can fix it right away
AUTH_URL_MESSAGE = (
    "That's a sign-in or admin page, which needs a login. Enter your site's "
    "public address instead, like yourstore.com."
)

# A sign-in page has a password box and little else. A real page with a login
# box in its header still has plenty to read, and stays.
MAX_TEXT_ON_A_LOGIN_PAGE = 1000


def is_auth_path(url: str) -> bool:
    """Whether the URL is a sign-in or admin area (by its path)."""
    path = urlparse(url).path.strip("/").lower()
    return any(path == auth or path.startswith(f"{auth}/") for auth in AUTH_PATHS)


def looks_like_login_wall(url: str, soup: BeautifulSoup, text: Optional[str]) -> bool:
    """Whether the page asks for a password instead of showing content. The
    URL alone can't tell when a site redirects there (a Shopify store that
    isn't open sends its homepage to /password), so the page is checked too."""
    if is_auth_path(url):
        return True
    has_password_box = soup.find("input", attrs={"type": lambda kind: (kind or "").lower() == "password"})
    return bool(has_password_box) and len(text or "") < MAX_TEXT_ON_A_LOGIN_PAGE
