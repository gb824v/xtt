Interstitial Advertisement test steps for Non-Transparent Condition:

Prerequisites:
----------------

1. Run the XTT in the Windows machine.

2. Add Advert tag in Product View file as described here:
	
	<webApplication enableWebServices="true" processNameSuffix="1" shutdownPort="8005">
		<webapps>
		<webapp>advert.war</webapp>
		</webapps>
	</webApplication>

3. Start the XMP server.

4. Create XUPDATE script for Subscriber Advert as described:

	<?xml version="1.0" encoding="UTF-8"?>
	<dbupdates>
		<subscribers>
			<add subscriber="12345">
				<attribute name="FirstName" value="Adam"/>
				<attribute name="insertAd" value="true"/>
			</add>
		</subscribers>
	</dbupdates>

5. Load XUPDATE script to XMP.

6. Remote XTT should start in XMP machine.


Steps to Perform Testing:
------------------------------

Step 1: Write the Request Modification file as described here:

	<?xml version="1.0" encoding="UTF-8"?>
	<requestModifications>

		<table name="InsertInterstitialAdverts" phase="httpRequest">   
			<selector urlPattern="http://*/*">       
			<modifyContext name="FTR_Advert" value="'interstitial'"/>   
			</selector>
		</table>

	</requestModifications>

Step 2: Load the above Request Modification file in XMP machine.

Step 3: Run the xtt test cases Windows machines.

Step 4: Check all the required Traces for TCP Router process.

-------------------------------------------------------------------------------------------------------------------
