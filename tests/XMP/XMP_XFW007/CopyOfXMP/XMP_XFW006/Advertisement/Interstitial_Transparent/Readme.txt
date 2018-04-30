Interstitial Advertisement test steps for Transparent Condition:

Prerequisites:
----------------

1. Configure 2 Windows boxes for Client and Server, and one linux machine for XMP.
2. Install XTT in both Windows boxes and Change Client server XTT configuration file as describe here:

       <Server>
        <!-- provide the ip address of the Server -->
        <Ip>SERVER_IP</Ip>
        </Server>

3. Run the XTT in both windows machines.

4. Create index.html, reseller.jsp and images/jpg.jpg files in XTT webroot directory.

5. Create default.htm files in XTT webroot directory.
   
   <html>
		<head><title>Default Page</title></head>
		<body>
			Some text here
			<img src="images/jpg.jpg"/>
		</body>
   </html>

6. Add Advert tag in Product View file as described here:
	
	<webApplication enableWebServices="true" processNameSuffix="1" shutdownPort="8005">
		<webapps>
		<webapp>advert.war</webapp>
		</webapps>
	</webApplication>

7. Start the XMP server.

8. Create XUPDATE script for Subscriber Advert as described:

	<?xml version="1.0" encoding="UTF-8"?>
	<dbupdates>
		<subscribers>
			<add subscriber="12345">
				<attribute name="FirstName" value="Adam"/>
				<attribute name="insertAd" value="true"/>
			</add>
		</subscribers>
	</dbupdates>

9. Load XUPDATE script to XMP.

10. Remote XTT should start in XMP machine.

Steps to Perform Testing:
------------------------------

Step 1: Change the Product View file as described here:

	1. Uncomment the <interception/> line in PV file.
	2. Change �requestPreviewTimeoutMicros� = 10000 and �responsePreviewTimeoutMicros� = 10000 in tcpRouter process line.

Step 2: Create Intercept File for Transparent Proxy Request as below:

	<?xml version="1.0" encoding="UTF-8"?>
	<intercept>
		<machine name="mauritius" >
			<rule>
				<modifier sticky="true" />
				<source ipAddress=" CLIENT_ IP " >  
				<port value="0" />
				</source>
				<destination ipAddress=" SERVER_ IP " > 
				<portRange exclude="true"  from="21" to="25" />
				</destination>
				<redirectTo>
				<target ipAddress=" XMP_ IP" port="4000" /> 
				</redirectTo>
			</rule>
		</machine>
	</intercept>

Step 3:  Start the XMP machine and load Intercept File.

Step 4: Write the Request Modification file as described here:

	<?xml version="1.0" encoding="UTF-8"?>
	<requestModifications>

		<table name="InsertInterstitialAdverts" phase="httpRequest">   
			<selector urlPattern="http://*/*">       
			<modifyContext name="FTR_Advert" value="'interstitial'"/> 
			<modifyContext name="FTR_HtmlTidyDisable" value="'false'"/>  
			</selector>
		</table>

	</requestModifications>

Step 5: Load the above Request Modification file in XMP machine.

Step 6:  Logged in to Client machine and set the routing rules for HTTP requests.

	route ADD <SERVER_IP> MASK 255.255.255.255 <XMP_IP>

	SERVER_IP = where webserver is configured.
	XMP_IP = where XMP is installed.

Step 7: Run the xtt test cases on Server and Client machines.
	1. Run Server test case first to start Webserver and run Client test case for sending requests.
	2. Check all the required Traces for TCP Router process.

-------------------------------------------------------------------------------------------------------------------
