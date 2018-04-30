


Before Running XSAM2.8 SMPP Proxy Regression Test Do following:
==============================================================

1.Use "SMPP.list" to run all testcases provided that all testcases should be entered in to this list.

2.Craete Outgoing Channels manually using XSAM UI before running the test.  
  Channel Name:SMPP_PROXY
  Primary SMSC listen port:9999
  Backup SMSC listen port:10999
  Primary SMSC listen IP address:SMSC HOST IP Address e.g.172.16.64.6
  Backup SMSC listen IP address:SMSC HOST IP Address e.g.172.16.64.6
  
3..Create all configuration parameter used in xsam_config.xml like given below in XSAM.
  e.g: 
  XSAM:
  1.Ip:XSAM Appliaction Host IP.
  2.SMPPPort:2121
  3.SMPPPort1:2323
  4.SMPPShortcode:2211
  5.SMPPShortcode1:2210
  6.ProvisioningURL:http://<MP IP Address>:<MP GUI PORT>/proxy/provisioning

  SMSC :

  1.SMPPPort:9999
  2.SMPPBackupPort:10999

4.Enter Proper Provisioning URL in "xsam_config.xml"
  e.g: http://172.16.64.6:8080/proxy/provisioning

5.Make sure that following Test data should not be configured before running provisioning Test cases.

CPShortcode:1972,9000,2000,4442,7896,4489,4646
CP Name:Manoj,4646,4442
ServiceName:1972,2210,4442,4444,4489
Outgoing Channel Name:SMPP_PROXY,ABCD,ASMPP_PROXY
WhiteListIPAddress:172.16.64.6,172.16.64.7
