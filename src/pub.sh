#!/bin/bash
cd /home/claude/erre-real && python3 build.py >/dev/null 2>&1 && cp index.html /home/claude/app/ && cp -r pwa/* /home/claude/app/ && cd /home/claude/app && git add -A && git commit -q -m "$1

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Cfa8yUCfjnsQGNuCVTm52X" && git -c push.negotiate=true push -q origin HEAD && git log --oneline | head -1
