#!/bin/bash

# AI harnesses (Claude Code, Conductor) pick a free port and pass it via
# `PORT`; bind to it strictly so the harness preview never points at a stale
# port. Without `PORT` (running by hand), keep Vite's default next-available
# behavior.
if [ -n "$PORT" ]; then
  npm run dev -- --port "$PORT" --strictPort
else
  npm run dev
fi
