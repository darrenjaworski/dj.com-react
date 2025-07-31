#!/bin/bash
# Hook script to run checks and notify on failures

output=$(npm run checks 2>&1)
exit_code=$?

if [ $exit_code -ne 0 ]; then
    echo "🚨 BUILD FAILED - Code changes may have introduced issues:" >&2
    echo "$output" >&2
    exit 2
else
    echo "✅ All checks passed - code is clean!"
    exit 0
fi