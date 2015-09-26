#!/usr/bin/env bash
clear
THIS=`readlink -f ${0%/*}`
SUITES=$1
SRVNAMES=$2
PORT=4000
APPFILE="app.js"
TESTSCRIPT="test.wrk.sh"
OUTEXTENSION="result"

echo SUITES: $SUITES
if [ $SUITES ==  ]
    then
        SUITES=`ls -d tests/*/`
fi

if [ $SRVNAMES == ]
    then SRVNAMES=(necklace express koa)
fi


for SUITE in $SUITES
do
    for SRVNAME in ${SRVNAMES[*]}
    do
        echo ==== $SRVNAME \($SUITE\) =====
        PORT=$((PORT + 1))
        APPSTART=node\ $THIS/$SUITE/$SRVNAME.$APPFILE\ $PORT
        TESTCMD=$THIS/$SUITE/$TESTSCRIPT\ $PORT
        RESULT=$THIS/$SUITE/$SRVNAME.$OUTEXTENSION

#        echo SUITE: $SUITE
#        echo SRVNAME: $SRVNAME
#        echo PORT: $PORT
#        echo APPSTART: $APPSTART
#        echo TESTCMD: $TESTCMD
#        echo RESULT: $RESULT

        #start htp server & wait for spin-up
        $APPSTART &
        PID=$!
        sleep 1

        #run test
        $TESTCMD > $RESULT
        echo Test done, results written to ${RESULT##*/}
        echo
        cat $RESULT

        #stop server
        echo Stopping server
        kill -s STOP $PID
        echo
    done
done


#$THIS/necklace/wrk.sh
