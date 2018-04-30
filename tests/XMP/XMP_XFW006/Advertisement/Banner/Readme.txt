Banner Advertisement test steps for Non-Transparent Condition:

Prerequisites:
----------------

1. Create advert.html file in XTT webroot directory with following tags:

	<a href="xmp-clickthrough?12345" >
		<img src="xmp-banner?12345" width="500" height="200">
	</a>

2. Run the XTT in the Windows machine.

3. Add Advert tag in Product View file as described here:
	
	<webApplication enableWebServices="true" processNameSuffix="1" shutdownPort="8005">
		<webapps>
		<webapp>advert.war</webapp>
		</webapps>
	</webApplication>

4. Start the XMP server.

5. Create XUPDATE script for Subscriber Advert as described:

	<?xml version="1.0" encoding="UTF-8"?>
	<dbupdates>
		<subscribers>
			<add subscriber="12345">
				<attribute name="FirstName" value="Adam"/>
				<attribute name="insertAd" value="true"/>
			</add>
		</subscribers>
	</dbupdates>

6. Load XUPDATE script to XMP.

7. Remote XTT should start in XMP machine.


Steps to Perform Testing:
------------------------------

Step 1: Write the Request Modification file as described here:

	<?xml version="1.0" encoding="UTF-8"?>
	<requestModifications>
   
		<table name="RetrieveBannerImage" phase="httpRequest">
			<selector urlPattern="http://*/xmp-banner">
			<modifyContext name="FTR_Advert" value="'banner'"/>
			</selector>
		</table>

		<table name="RedirectToClickthroughUrl" phase="httpRequest">
			<selector urlPattern="http://*/xmp-clickthrough">
			<modifyContext name="FTR_Advert" value="'clickthrough'"/>
			</selector>
		</table>

	</requestModifications>

Step 2: Load the above Request Modification file in XMP machine.

Step 3: Run the xtt test cases Windows machines.

Step 4: Check all the required Traces for TCP Router process.

-------------------------------------------------------------------------------------------------------------------
