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

Interactive (choice) messages: limits, validation, and building one from the
agent's plain list of options.

The limits are WhatsApp's — the only channel that sends these today — and are
checked before sending so a bad message fails here with a readable reason
instead of as an opaque Graph 400.
https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-reply-buttons-messages
"""

from typing import List, Optional

from app.channels.base import (
    InteractiveButton, InteractiveKind, InteractiveMessage, InteractiveRow,
    InteractiveSection,
)
from app.channels.constants import MAX_CHOICE_LENGTH, MAX_CHOICE_OPTIONS

MAX_BUTTONS = 3
BUTTON_TITLE_MAX = 20
MAX_LIST_ROWS = MAX_CHOICE_OPTIONS
ROW_TITLE_MAX = 24
ROW_DESCRIPTION_MAX = MAX_CHOICE_LENGTH
SECTION_TITLE_MAX = 24
LIST_BUTTON_LABEL_MAX = 20
CTA_DISPLAY_TEXT_MAX = 20
HEADER_MAX = 60
FOOTER_MAX = 60
BODY_MAX = 1024
ID_MAX = 256

DEFAULT_LIST_BUTTON_LABEL = "Choose"
# The body of the choices when the reply itself was too long to carry them
DEFAULT_CHOICES_BODY = "Choose an option:"
ELLIPSIS = "…"

# Ids we give the agent's options
_QUICK_REPLY_ID_PREFIX = "qr_"


def _quick_reply_id(index: int) -> str:
    return f"{_QUICK_REPLY_ID_PREFIX}{index}"


def truncate(text: str, limit: int) -> str:
    """Cut to `limit` characters, marking the cut with an ellipsis."""
    text = text.strip()
    return text if len(text) <= limit else text[:limit - len(ELLIPSIS)].rstrip() + ELLIPSIS


def from_options(body: str, options: List[str]) -> InteractiveMessage:
    """Build the message for the agent's options.

    Reply buttons when there are few enough options and every one fits a
    button title; otherwise a list, whose rows allow longer titles and carry
    the full text in the description when the title had to be cut.
    """
    options = options[:MAX_CHOICE_OPTIONS]
    if len(options) <= MAX_BUTTONS and all(len(o) <= BUTTON_TITLE_MAX for o in options):
        return InteractiveMessage(
            kind=InteractiveKind.BUTTONS,
            body=body,
            buttons=[InteractiveButton(id=_quick_reply_id(i), title=o)
                     for i, o in enumerate(options)],
        )
    rows = [
        InteractiveRow(
            id=_quick_reply_id(i),
            title=truncate(o, ROW_TITLE_MAX),
            description=truncate(o, ROW_DESCRIPTION_MAX) if len(o) > ROW_TITLE_MAX else None,
        )
        for i, o in enumerate(options)
    ]
    return InteractiveMessage(
        kind=InteractiveKind.LIST,
        body=body,
        list_button_label=DEFAULT_LIST_BUTTON_LABEL,
        sections=[InteractiveSection(rows=rows)],
    )


def validate_interactive(message: InteractiveMessage) -> List[str]:
    """Every reason the platform would reject this message; empty when valid."""
    errors: List[str] = []
    _check_text(errors, "body", message.body, BODY_MAX, required=True)
    _check_text(errors, "header", message.header, HEADER_MAX)
    _check_text(errors, "footer", message.footer, FOOTER_MAX)

    if message.kind == InteractiveKind.BUTTONS:
        _validate_buttons(errors, message.buttons)
    elif message.kind == InteractiveKind.LIST:
        _validate_list(errors, message)
    elif message.kind == InteractiveKind.CTA_URL:
        _validate_cta(errors, message)
    return errors


def to_text_fallback(message: InteractiveMessage, max_length: Optional[int] = None) -> str:
    """The same choices as plain text, for when the interactive form can't be
    sent: the customer can still answer by typing the option. When the
    channel caps message length, the body is shortened — never the choices."""
    if message.kind == InteractiveKind.CTA_URL:
        tail = f"{message.display_text}: {message.url}" if message.display_text else message.url
        suffix = f"\n{tail}"
    else:
        lines = [f"{i}. {_fallback_line(c)}" for i, c in enumerate(all_choices(message), start=1)]
        suffix = "\n\n" + "\n".join(lines) if lines else ""
    body = message.body
    if max_length is not None and len(body) + len(suffix) > max_length:
        body = truncate(body, max(max_length - len(suffix), len(ELLIPSIS)))
    return body + suffix


def choice_text(choice) -> str:
    """The full text of one choice: a button's title, or a row whose title had
    to be cut, its description (see from_options)."""
    description = getattr(choice, "description", None)
    if description and choice.title.endswith(ELLIPSIS):
        return description
    return choice.title


def all_choices(message: InteractiveMessage) -> list:
    """Every button and list row, in order."""
    return list(message.buttons) + [r for s in message.sections for r in s.rows]


def _fallback_line(choice) -> str:
    text = choice_text(choice)
    description = getattr(choice, "description", None)
    # A real description (not the cut title's full text) is worth showing too
    return f"{text} — {description}" if description and description != text else text


def _check_text(errors: List[str], name: str, value: Optional[str], limit: int,
                required: bool = False) -> None:
    if not value or not value.strip():
        if required:
            errors.append(f"{name} is required")
        return
    if len(value) > limit:
        errors.append(f"{name} must be at most {limit} characters")


def _check_ids(errors: List[str], name: str, ids: List[str]) -> None:
    if any(not i or len(i) > ID_MAX for i in ids):
        errors.append(f"every {name} id must be 1-{ID_MAX} characters")
    if len(set(ids)) != len(ids):
        errors.append(f"{name} ids must be unique")


def _validate_buttons(errors: List[str], buttons: List[InteractiveButton]) -> None:
    if not 1 <= len(buttons) <= MAX_BUTTONS:
        errors.append(f"buttons needs 1-{MAX_BUTTONS} buttons")
    for button in buttons:
        _check_text(errors, "button title", button.title, BUTTON_TITLE_MAX, required=True)
    _check_ids(errors, "button", [b.id for b in buttons])


def _validate_list(errors: List[str], message: InteractiveMessage) -> None:
    _check_text(errors, "list button label", message.list_button_label,
                LIST_BUTTON_LABEL_MAX, required=True)
    rows = [r for s in message.sections for r in s.rows]
    if not message.sections or any(not s.rows for s in message.sections):
        errors.append("every list section needs at least one row")
    if not 1 <= len(rows) <= MAX_LIST_ROWS:
        errors.append(f"a list needs 1-{MAX_LIST_ROWS} rows in total")
    if len(message.sections) > 1 and any(not s.title for s in message.sections):
        errors.append("section titles are required when there is more than one section")
    for section in message.sections:
        _check_text(errors, "section title", section.title, SECTION_TITLE_MAX)
    for row in rows:
        _check_text(errors, "row title", row.title, ROW_TITLE_MAX, required=True)
        _check_text(errors, "row description", row.description, ROW_DESCRIPTION_MAX)
    _check_ids(errors, "row", [r.id for r in rows])


def _validate_cta(errors: List[str], message: InteractiveMessage) -> None:
    _check_text(errors, "display text", message.display_text, CTA_DISPLAY_TEXT_MAX, required=True)
    if not (message.url or "").lower().startswith("https://"):
        errors.append("url must be an https:// link")
