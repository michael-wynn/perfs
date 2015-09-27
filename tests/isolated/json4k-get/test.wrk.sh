#!/usr/bin/env bash
PORT=$1
wrk -t$THREADS -c$CONNECTIONS -d$DURATION --timeout $TIMEOUT http://localhost:$PORT/json-4k