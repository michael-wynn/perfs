#!/usr/bin/env bash

export THREADS=2
export CONNECTIONS=100
export DURATION=10s
export TIMEOUT=5s
export DELAY=2

GRP=$1
TST=$2
SUBJ=$3

clear
EMPTY=
THIS=`readlink -f ${0%/*}`
PORT=4827   #arbitrary seed, will increment before each test
APPFILE="app.js"
TESTSCRIPT="test.wrk.sh"
OUTEXTENSION="result"
ALLRESULTS="tests/wrk.result"

#clear consolidated results
echo "Performance test results:" > $ALLRESULTS

if [ X$GRP == X$EMPTY ]
    then
        TESTGROUPS=`ls -d tests/*/`
    else
        TESTGROUPS=(tests/$GRP/)
fi

for TESTGROUP in ${TESTGROUPS[*]}
do
    if [ X$TST == X$EMPTY ]
        then
            TESTS=`ls -d $TESTGROUP*/`
        else
            TESTS=($TESTGROUP$TST/)
    fi
    for TEST in ${TESTS[*]}
    do
        if [ X$SUBJ == X$EMPTY ]
            then
                SUBJECTS=`ls -d $TEST*.js`
            else
                SUBJECTS=($TEST$SUBJ\.app.js)
        fi
        for SUBJECT in ${SUBJECTS[*]}
        do
            echo in progress: $SUBJECT ...

            RESULT=${SUBJECT/app.js/$OUTEXTENSION}
            PORT=$((PORT + 1))
            APPSTART=node\ $SUBJECT\ $PORT
            TESTCMD=$TEST$TESTSCRIPT\ $PORT


#            echo TESTGROUP: $TESTGROUP
#            echo TEST: $TEST
#            echo SUBJECT: $SUBJECT
#            echo PORT: $PORT
#            echo RESULT: $RESULT
#            echo APPSTART: $APPSTART
#            echo TESTCMD: $TESTCMD

            #start http server & wait for spin-up
            $APPSTART &
            PID=$!
            sleep $DELAY

            #run test
            echo "#========= $SUBJECT ==========" > $RESULT
            $TESTCMD >> $RESULT
            cat $RESULT
            echo Done, results written to $RESULT

            #stop http server
            kill -s STOP $PID
            echo

            cat $RESULT >> $ALLRESULTS
        done
        echo "" >> $ALLRESULTS
    done
done
