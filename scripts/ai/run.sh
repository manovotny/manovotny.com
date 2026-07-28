#!/bin/bash

# AI harnesses (Claude Code, Conductor) pick a free port and pass it via
# `PORT`; bind to it so the harness preview never points at a stale port.
# `--strictPort` matters: plain `vite dev --port` silently increments to the
# next free port, which would leave `PORT` disagreeing with the port actually
# served — and src/lib/constants.ts reads `PORT` back to build absolute URLs.
# Failing loudly is better than emitting URLs for the wrong port. Without
# `PORT` (running by hand), keep Vite's default next-available behavior.
if [ -n "$PORT" ]; then
  npm run dev -- --port "$PORT" --strictPort
else
  npm run dev
fi
