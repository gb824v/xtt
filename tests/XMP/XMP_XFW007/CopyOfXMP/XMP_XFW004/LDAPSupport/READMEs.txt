
Changes specific for Kaspersky virus scanning Testing:

1) File Name:Product view file
	Description:
	In <auxiliarySystems> tag add LDAP attribute as follows:

	<ldap>
		<ldapServer authenticationMethod="simple" 
		password="JCbJARb1RMcPfokMUrfXw9QkerL5rR8rM2o119N3H9fosAgwUNX6oYPzc9e36vRlRjTJB1XWyr8=" 
		url="ldap://172.20.14.34:389" 
		user="cn=Manager,o=wap_ext">
		<query baseDn="cn=sis,o=wap_ext" 
		defRefAlias="never" 
		name="GetSubscriberId" 
		scope="sub" 
		searchFilter="'(login-ip=' + TCP_RemoteIpAddress + ')'"
		sizeLimit="1" 
		timeLimitSecs="0" 
		typesOnly="false">
		<resultAttribute multipleValues="false" 
			 name="msisdn"/>
		</query>
	 </ldapServer>

	</ldap> 

	Please Note: 
	1. You need to encrypt the passord by using the following command.

		pwcrypt -f license.xml secret

	2.In the url attribute mentione your local IPaddress i:e the LDAP server's URL.


	Note:

	In the pv file if we have configured both "radius" and "ldap" attribute for "authenticationType"  then to run the radius login 
	related testcases we have to give following parameter in the workflowconstant file otherwise the testcases will be failed.

		<workflowConstant name="defaultAuthenticationType">radius</workflowConstant>
	
	
	--------------------------------------------------------------------------------------------------------------

	Request Modification file is having only one table with name="authentication"  :
	----------------------

	<?xml version="1.0" encoding="UTF-8"?>
	<requestModifications>

		 <!-- This table sets up  the   AuthenticationType as  LDAP and  RemoteIpAddress equalsip     -->
			<table name="authentication" phase="authentication">
			<selector context="TCP_RemoteIpAddress equalsip '172.20.14.37'">
			<modifyContext name="FTR_AuthenticationType" value="'ldap'"/>
			</selector>
			</table>

	</requestModifications>

	--------------------------------------------------------------------------------------------------------------

	WorkFlow Constants:
	-------------------
	
	ldapValiditySecs, ldapGetSubscriberIdKey and subscriberInfoValiditySecs - These 3 context variables are modified as follows:
	
	<!-- LDAP Parameters -->
	<workflowConstant name="ldapValiditySecs">60</workflowConstant>
	<workflowConstant name="radiusValiditySecs">60</workflowConstant>
	<workflowConstant name="subscriberInfoValiditySecs">60</workflowConstant>

	Test cse files
	--------------
	LDAPSupport.TC.001.xml
	LDAPSupport.TC.002.xml
	LDAPSupport.TC.003.xml
	LDAPSupport.TC.004.xml
	LDAPSupport.TC.005.xml
	LDAPSupport.TC.006.xml
	LDAPSupport.TC.007.xml
	LDAPSupport.TC.008.xml


	LDAP Config files
	-----------------
	ldapconfig.xml
	ldapconfig_TC6.xml
	ldapconfig_TC7.xml
	ldapconfig_TC8.xml
	ldapconfig.xml used for Test case LDAPSupport.TC.001 to 005.

	Request Modification file with "authentication"  table should be kept alongwith the test case files.

-


