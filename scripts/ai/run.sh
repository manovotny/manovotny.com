#!/bin/bash

# AI harnesses (Claude Code, Conductor) pick a free port and pass it via
# `PORT`; bind to it so the harness preview never points at a stale port
# (`next dev --port` fails if the port is taken rather than falling back).
# Without `PORT` (running by hand), keep Next's default next-available
# behavior.
if [ -n "$PORT" ]; then
  npm run dev -- --port "$PORT"
else
  npm run dev
fi
