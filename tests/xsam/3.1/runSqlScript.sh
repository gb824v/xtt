#!/bin/ksh
if [ $# -eq 4 ] ; then
   DATABASE=$1
   PASSWORD=$2
   SERVER=$3
   SQLSCRIPT=$4
else
   echo "INVALID # of PARAMETERS"
   exit 1
fi

ORACLE_HOME=/opt/oracle/OraHome92
PATH=$ORACLE_HOME/bin/:$PATH

export ORACLE_HOME
export PATH

sqlplus $DATABASE/$PASSWORD@$SERVER @$SQLSCRIPT
