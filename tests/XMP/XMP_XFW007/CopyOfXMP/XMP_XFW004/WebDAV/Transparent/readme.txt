
WebDAV Transparent Proxy Setting Steps.

Prerequisites:
----------------

1. Configure 2 Windows boxes for Client and Server, and one linux machine for XMP.
2. Install XTT in both Windows boxes and Change XTT configuration file as describe here:

       <Server>
        <!-- the ip address of the Server -->
        <Ip>CLIENT_IP</Ip>
        </Server>

3. Run the XTT in both windows machines.

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

Step 4:  Logged in to Client machine and set the routing rules for HTTP requests.

	route ADD <SERVER_IP> MASK 255.255.255.255 <XMP_IP>

	SERVER_IP = where webserver is configured.
	XMP_IP = where XMP is installed.

Step 5: Run the xtt test cases on Server and Client machines.
	1. Run Server test case first to start Webserver and run Client test case for sending requests.
	2. Check all the required Traces for TCP Router process.

-------------------------------------------------------------------------------------------------------------------
