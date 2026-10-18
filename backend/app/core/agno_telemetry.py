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

# agno reports every agent run to api.agno.com unless told not to, and it
# awaits that call inside the run (60s client timeout). When the call is slow
# the run outlives AGENT_RUN_TIMEOUT and the visitor gets an apology instead of
# an answer - for a report nobody here reads, sent from every install.
#
# Off by default. agno re-reads these variables on every run, so setting them
# once per process covers each Agent, Team and Workflow, wherever it is built.
# An operator who wants agno's telemetry or monitoring can still set them.
#
# An env var rather than Agent(telemetry=False) because agents are built in
# many places (chat, transfer, tickets, FAQs, summaries, help center) and in
# separate worker processes - app/__init__.py calls apply() first thing.

import os

AGNO_SWITCHES = ("AGNO_TELEMETRY", "AGNO_MONITOR")


def apply() -> None:
    """Turn agno's telemetry and monitoring off unless explicitly set (idempotent)."""
    for name in AGNO_SWITCHES:
        os.environ.setdefault(name, "false")
