Changes specific for Kaspersky virus scanning Testing:

1) File Name:Product view file
   Description:
	Configure <virusScanning> tag to use the Kaspersky virus scanner as follows:
	<virusScanning>
	<kaspersky installDirectory="/home/xmp/kaspersky/KAV_Server-Linux-5.5.4.116"/>
	</virusScanning>
	Where "/home/xmp/kaspersky/KAV_Server-Linux-5.5.4.116” is kaspersky_server-directory.

	Configures  <kasperskyDaemon> to run the Kaspersky daemon as follows:
	<kasperskyDaemon>
         <listenAddress ipAddress="172.21.5.5" port="9001"/>
	</kasperskyDaemon>

2) The default "xmp_WorkflowConstants.xml" from the example directory of the Build is used to execute the kaspersky testcases.As we have 
   not modofied the values of the constants mentioned in the xmp_WorkflowConstants.xml.

3) By default only content of type "application" is scanned.

4) Make sure that virus content file  "base64virus.bin" file is there in Kaspersky test case folder.

How to run the Kaspersky-Tests:


1) User "xttuser" must be provisioned in the xmp database.

2) Define XTT_CLASSPATH

 e.g. export XTT_CLASSPATH=".;u:/source/tests/xtt/xtt.jar;%JAR_DIR%\jdom.jar;%JAR_DIR%\xercesImpl.jar;%JAR_DIR%\radclient3.jar;%JAR_DIR%\jWAP.jar;%JAR_DIR%\jaxen-core.jar;%JAR_DIR%\jaxen-jdom.jar;%JAR_DIR%\saxpath.jar;%JAR_DIR%\jdmkrt.jar;%JAR_DIR%\jdmktk.jar;%JAR_DIR%\jsnmpapi.jar;%JAR_DIR%\avalon-framework-4.1.5.jar;%JAR_DIR%\logkit-1.2.jar;%JAR_DIR%\jacorb.jar;%JAR_DIR%\sis2_client-1.1.2.jar"


Note:
1) OBSOLETE: The test.html, and corrupted.exe should be placed in webroot folder.Otherwise the testcases will be failed. 
   THIS HAS BEEN FIXED BY CREATING PROPPER TESTS! NO LONGER NECESSARY!

2) Prerequsite for TC.007 and TC.008  :

KasperskyVirusScanningIntegration.TC.007.xml and tests\Kaspersky\KasperskyVirusScanningIntegration.TC.008.xml 
should be run in cluster enviornment.These testcases can't be run in the regression testing.
