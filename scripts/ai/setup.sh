#!/bin/bash

AI_ROOT_PATH="${SUPERSET_ROOT_PATH:-$CONDUCTOR_ROOT_PATH}"

if [ -n "${AI_ROOT_PATH:-}" ]; then
    cp "$AI_ROOT_PATH/.env.local" .env.local
    cp -r "$AI_ROOT_PATH/.vercel" .
fi

npm i
