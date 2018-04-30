
Video Optimization Transparent Proxy Setting Steps.

Prerequisites:
----------------

1. Configure 2 Windows boxes for Client and Server, and one linux machine for XMP.
2. Install XTT in both Windows boxes and Change XTT configuration file as describe here:

	<Server>
	<!-- the ip address of the Server -->
	<Ip>SERVER_IP</Ip>
	</Server>

3. Run the XTT in both windows machines.

Steps to Perform Testing:
------------------------------

Step 1: Change the Product View file as described here:

	1. Uncomment the <interception/> line in PV file.
	2. Change “requestPreviewTimeoutMicros” = 500000 and “responsePreviewTimeoutMicros” = 500000 in tcpRouter process line.

Step 2: Create Intercept File for Transparent Proxy Request as below:

	<?xml version="1.0" encoding="UTF-8"?>
	<intercept>
		<machine name="aruba" >
			<rule>
				<modifier sticky="true" />
				<source ipAddress="<CLIENT_IP>" >
					<port value="0" />
				</source>
				<destination ipAddress="<SERVER_IP>" >
					<portRange exclude="true" from="21" to="25" />
				</destination>
				<redirectTo>
					<target ipAddress="<XMP_IP>" port="4010" />
				</redirectTo>
			</rule>
			<rule>
				<modifier sticky="true" />
				<source ipAddress="<CLIENT_IP>" >
					<port value="0" />
				</source>
				<destination ipAddress="<XMP_IP>" >
					<port exclude="true"  value="8999" />
				</destination>
				<redirectTo>
					<target ipAddress="<XMP_IP>" port="4010" />
				</redirectTo>
			</rule>
			<rule>
				<modifier sticky="true" />
				<source ipAddress="<XMP_IP>" >
					<port value="0" />
				</source>
				<destination ipAddress="<CLIENT_IP>" >
					<port exclude="true"  value="8999" />
				</destination>
				<redirectTo>
					<target ipAddress="<XMP_IP>" port="4010" />
				</redirectTo>
			</rule>
		</machine>
	</intercept> 

	Note :	4010 - Tcp router port
		8999 - XTT port

Step 3:  Start the XMP machine and load Intercept File.

Step 4:  Logged in to Client machine and set the routing rules for Transperant requests.

	route ADD <SERVER_IP> MASK 255.255.255.255 <XMP_IP>

	SERVER_IP = where webserver is configured.
	XMP_IP = where XMP is installed.
	CLIENT_IP = Where Client is installed

Step 5: Run the xtt test cases on Server and Client machines.
	1. Run Server test case first to start Webserver and run Client test case for sending requests.
	2. Check all the required Traces for TCP Router process.

-------------------------------------------------------------------------------------------------------------------
