#!/bin/bash

#   This script change the default "pcrfValiditySecs" value to 10 seconds
chmod 777 /opt/xmp/examples/xmp_WorkflowConstants.xml
sed -i.bak 's/<workflowConstant name=\"pcrfValiditySecs\">.*</<workflowConstant name=\"pcrfValiditySecs\">10</' /opt/xmp/examples/xmp_WorkflowConstants.xml
/opt/xmp/bin/xms load data /opt/xmp/examples/xmp_WorkflowConstants.xml