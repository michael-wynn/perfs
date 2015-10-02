#!/usr/bin/env bash

CONNECTIONS=10 #override default

PORT=$1
THIS=`readlink -f ${0%/*}`
cd $THIS

wrk -t$THREADS -c$CONNECTIONS -d$DURATION --timeout $TIMEOUT -spost.lua http://localhost:$PORT

#special for this test: let sql server catch up with pending requestes before allowing
#parent script to kill server & start another test
sleep 10