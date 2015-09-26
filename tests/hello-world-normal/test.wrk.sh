#!/usr/bin/env bash
PORT=$1
wrk -t2 -c100 -d10s http://localhost:$PORT

