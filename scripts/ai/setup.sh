#!/bin/bash

# The primary checkout is always the first entry in `git worktree list`.
# Every worktree tool in use (Superset, Conductor, Claude Code, clk) creates
# linked worktrees, so this resolves the same path their env vars point to.
ROOT_PATH="$(git worktree list --porcelain 2>/dev/null | head -1 | cut -d' ' -f2-)"

if [ -n "$ROOT_PATH" ] && ! [ "$ROOT_PATH" -ef "$(pwd)" ]; then
    [ -f "$ROOT_PATH/.env.local" ] && cp "$ROOT_PATH/.env.local" .env.local
    [ -d "$ROOT_PATH/.vercel" ] && cp -r "$ROOT_PATH/.vercel" .
fi

npm i
