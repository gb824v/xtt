#!/bin/bash

#   This script uncomment the "defaultAuthenticationType" and change it to "pcrf"
chmod 777 /opt/xmp/examples/xmp_WorkflowConstants.xml
a=`grep -n -C1 '\"defaultAuthenticationType\"' /opt/xmp/examples/xmp_WorkflowConstants.xml | head -1 | cut -d"-" -f1`
string=`sed -n ''$a'p' /opt/xmp/examples/xmp_WorkflowConstants.xml`
orig="<!--"
if [ "$string" != "$orig" ]
	then
		exit 0
fi 
b=`grep -n -C1 '\"defaultAuthenticationType\"' /opt/xmp/examples/xmp_WorkflowConstants.xml | tail -1 | cut -d"-" -f1`
sed -i.backup 's/\"defaultAuthenticationType\">none<\/workflowConstant>/\"defaultAuthenticationType\">pcrf<\/workflowConstant>/' /opt/xmp/examples/xmp_WorkflowConstants.xml
sed -i ''$a'd;'$b'd' /opt/xmp/examples/xmp_WorkflowConstants.xml