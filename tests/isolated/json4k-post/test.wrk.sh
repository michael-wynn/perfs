#!/usr/bin/env bash
PORT=$1
THIS=`readlink -f ${0%/*}`
cd $THIS

wrk -t$THREADS -c$CONNECTIONS -d$DURATION --timeout $TIMEOUT -spost.lua http://localhost:$PORT

