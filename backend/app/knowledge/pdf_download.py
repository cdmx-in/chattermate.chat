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

"""SSRF-guarded download of a knowledge PDF from a user-supplied URL."""

import httpx

from app.core.config import settings
from app.knowledge.url_safety import safe_stream

# Same ceiling as a directly uploaded PDF, so a URL is no way around it.
MAX_PDF_SIZE = 25 * 1024 * 1024
_CHUNK_SIZE = 8192


class PdfTooLargeError(ValueError):
    """The remote file is larger than the allowed PDF size."""


def download_pdf(url: str, dest_path: str, max_bytes: int = MAX_PDF_SIZE) -> str:
    """Stream ``url`` into ``dest_path`` and return the path.

    Every hop, redirects included, is checked against internal addresses.
    Raises BlockedHostError for an internal target, PdfTooLargeError past
    ``max_bytes`` and httpx.HTTPStatusError for a non-2xx answer; the caller
    owns cleaning up a partially written ``dest_path``.
    """
    with httpx.Client(
        timeout=settings.KB_TIMEOUT, verify=settings.VERIFY_SSL_CERTIFICATES
    ) as client, safe_stream(client, url) as response:
        response.raise_for_status()
        declared = response.headers.get("content-length", "")
        if declared.isdigit() and int(declared) > max_bytes:
            raise PdfTooLargeError(f"PDF is larger than {max_bytes} bytes: {url}")
        written = 0
        with open(dest_path, "wb") as f:
            for chunk in response.iter_bytes(_CHUNK_SIZE):
                written += len(chunk)
                if written > max_bytes:
                    raise PdfTooLargeError(f"PDF is larger than {max_bytes} bytes: {url}")
                f.write(chunk)
    return dest_path
