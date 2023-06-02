#!/bin/sh
echo "Check that we have the env vars"
test -n "$SPOTIFY_CLIENT_ID"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_SPOTIFY_CLIENT_ID#$SPOTIFY_CLIENT_ID#g"
test -n "$NEXT_PUBLIC_BACKEND_URL"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_SPOTIFY_CLIENT_SECRET#$SPOTIFY_CLIENT_SECRET#g"
echo "Starting Nextjs"
exec "$@"