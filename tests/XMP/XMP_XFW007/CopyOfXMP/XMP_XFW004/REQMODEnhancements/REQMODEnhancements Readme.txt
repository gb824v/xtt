Changes specific for REQMODEnhancements Testing:

1) File Name:Product view file
   Description:

   a) Have following entry in your pv file for REQMODEnhancements.TC.004:
	<urlMatching>
	<matchEquivalentHostsInUrls lookupIntervalSecs="10" >
		<wildcardReplacement>www</wildcardReplacement>
	</matchEquivalentHostsInUrls>
	</urlMatching>

   b) Have following entry in your pv file for REQMODEnhancements.TC.005:
	<urlMatching>
	<matchEquivalentHostsInUrls lookupIntervalSecs="0" >
		<wildcardReplacement>www</wildcardReplacement>
	</matchEquivalentHostsInUrls>
	</urlMatching>

2) For the reverse DNS look-up you can configure XTT�s DNS server in the xtt config file as follows:

     <dnsserver>
        <startonload/>
        <entry>
            <name>www.bad.com</name>
            <ip>YOUR PC IP</ip>
	</entry>
    </dnsserver>


How to run the REQMODEnhancements-Tests:
-----------------------------------------


1) User "xttuser" must be provisioned in the xmp database.

2) Define XTT_CLASSPATH

 e.g. export XTT_CLASSPATH=".;u:/source/tests/xtt/xtt.jar;%JAR_DIR%\jdom.jar;%JAR_DIR%\xercesImpl.jar;%JAR_DIR%\radclient3.jar;%JAR_DIR%\jWAP.jar;%JAR_DIR%\jaxen-core.jar;%JAR_DIR%\jaxen-jdom.jar;%JAR_DIR%\saxpath.jar;%JAR_DIR%\jdmkrt.jar;%JAR_DIR%\jdmktk.jar;%JAR_DIR%\jsnmpapi.jar;%JAR_DIR%\avalon-framework-4.1.5.jar;%JAR_DIR%\logkit-1.2.jar;%JAR_DIR%\jacorb.jar;%JAR_DIR%\sis2_client-1.1.2.jar"



