#!/bin/bash

# Script to kill process on a specific port
# Usage: ./kill-port.sh [PORT]
# Default: 5002

PORT=${1:-5002}

echo "🔍 Checking for process on port $PORT..."

PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "✅ Port $PORT is free - no process found"
    exit 0
fi

echo "⚠️  Found process $PID using port $PORT"
echo "🛑 Killing process $PID..."

kill -9 $PID

sleep 1

# Verify it's killed
if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "❌ Failed to kill process on port $PORT"
    exit 1
else
    echo "✅ Successfully freed port $PORT"
    exit 0
fi

