#
# $Id: xtt.ksh,v 1.11 2010/01/04 07:58:20 rsoder Exp $
#
# On build util to run java XTT 
#
# Passes all arguments com.tantau.xtt.XTT
#set -xv
baseDir=`dirname $0`
thisPlatform=`uname`

if [ "$thisPlatform" = "Windows_NT" ]; then
   thisSep=";"
   extension=".exe"
   separator="\\"
else
   thisSep=":"
   extension=""
   separator="/"
fi
if [ -z "$XTT_JAVA_HOME" ]; then
   if [ -z "$JAVA_HOME" ]; then
      JAVA_HOME=`which java$extension 2>/dev/null | xargs dirname 2>/dev/null | xargs dirname 2>/dev/null`
   fi
   XTT_JAVA_HOME="$JAVA_HOME"
fi   

if [ -f "$XTT_JAVA_HOME/bin/java$extension" ]; then
   JAVA_BINARY_LOC="$XTT_JAVA_HOME/bin"
elif [ -f "$XTT_JAVA_HOME/java$extension" ]; then
   JAVA_BINARY_LOC="$XTT_JAVA_HOME"
else
   echo "ERROR: $XTT_JAVA_HOME/bin/java$extension or $XTT_JAVA_HOME/java$extension not found."
   exit 1
fi

javaRT=`find $XTT_JAVA_HOME -follow -name rt.jar 2>/dev/null | tail -1`


currentDir=`pwd`

currentJava=`which $JAVA_BINARY_LOC/java$extension`

if [ -z "$currentJava" ]; then
   echo "ERROR: You need java to run XTT"
   exit 1
fi

cd $baseDir

if [ -f ./radclient3.jar ]; then
   XTT_JARS_DIR="."
elif [ -f ../lib/radclient3.jar ]; then
   cd ..
   XTT_JARS_DIR="lib"
elif [ -f /source/exports/lib/radclient3.jar ]; then
   XTT_JARS_DIR="${separator}source${separator}exports${separator}lib"
else 
   echo "ERROR can not find jar files. Make sure they are on xtt-install-dir${separator}lib"
   cd $currentDir
   exit 1
fi

XTT_CLASSPATH=".${separator}"

for eachJar in xtt.jar jdom.jar xercesImpl.jar radclient3.jar jWAP.jar jaxen-core.jar jaxen-jdom.jar saxpath.jar jdmkrt.jar jdmktk.jar jsnmpapi.jar avalon-framework-4.1.5.jar logkit-1.2.jar jacorb.jar sis2_client-1.1.2.jar
do
   XTT_CLASSPATH="${XTT_CLASSPATH}${thisSep}${XTT_JARS_DIR}${separator}$eachJar"
done

if [ -n "$javaRT" ]; then
   XTT_CLASSPATH="${javaRT}${thisSep}${XTT_CLASSPATH}"
fi

echo "PWD:" `pwd`

xttCommand="$1"

case $xttCommand in
#   -ip)
#       set -xv
#       $JAVA_BINARY_LOC/java -cp "$XTT_CLASSPATH" com.mobixell.xtt.RemoteXTT $@
#       rc=$?
#       set -
#       ;;
   RemoteXTT)
       shift
       set -xv
       $JAVA_BINARY_LOC/java -cp "$XTT_CLASSPATH" com.mobixell.xtt.RemoteXTT $@
       rc=$?
       set -
       ;;
   # DNSServer DOMAIN IP 
   # e.g.: DNSServer xtt724.com 172.20.9.3
   DNSServer)
       shift
       set -xv
       $JAVA_BINARY_LOC/java -cp "$XTT_CLASSPATH" com.mobixell.xtt.DNSServer -e xtt724.com $@
       rc=$?
       set -
       ;;
   SMSCServer)
       shift
       set -xv
       $JAVA_BINARY_LOC/java -cp "$XTT_CLASSPATH" com.mobixell.xtt.SMSCServer $@
       rc=$?
       set -
       ;;
   SMTPServer)
       shift
       set -xv
       $JAVA_BINARY_LOC/java -cp "$XTT_CLASSPATH" com.mobixell.xtt.SMTPServer $@
       rc=$?
       set -
       ;;
   WebServer)
       shift
       set -xv
       $JAVA_BINARY_LOC/java -cp "$XTT_CLASSPATH" com.mobixell.xtt.WebServer $@
       rc=$?
       set -
       ;;
   BillingServer)
       shift
       set -xv
       $JAVA_BINARY_LOC/java -cp "$XTT_CLASSPATH" com.mobixell.xtt.BillingServer $@
       rc=$?
       set -
       ;;
   TCPProxy)
       shift
       set -xv
       $JAVA_BINARY_LOC/java -cp "$XTT_CLASSPATH" com.mobixell.xtt.TCPProxy $@
       rc=$?
       set -
       ;;
   *)
       set -xv
       $JAVA_BINARY_LOC/java -Xmx256m -cp "$XTT_CLASSPATH" com.mobixell.xtt.XTT $@
       rc=$?
       set -
       ;;
esac

cd $currentDir

exit $rc
