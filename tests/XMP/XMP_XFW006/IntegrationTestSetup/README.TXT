PREPARATION OF THE TEST ENVIRONMENT
--------------------------------------------------------
1. Things that needs to be done in XTT package:
1.1. Edit "<XTT_ROOT>/tests/XMP/XMP_XFW004/IntegrationTestSetup/pv.xml" to replace password attribute of ldapServer with the encryped version of "secret".
          Use <xfw_inst_dir>/bin/pwcrypt -f <license_file> secret
1.2. TBD

2. Things that neeeds to be done in Regression Test Machine:
2.1. Install Kaspersky Executables according to the instructions in the installation Guide
2.2. 

3. Things that Integration Platform needs to do before each run of the test cases:
3.1. Use "<XTT_ROOT>/tests/XMP/XMP_XFW004/IntegrationTestSetup/pv.xml" as the product view file
3.2. Use "<XTT_ROOT>/tests/XMP/XMP_XFW004/IntegrationTestSetup/xtt.conf.xml" as the XTT configuration file
3.3. Use "<XTT_ROOT>/tests/XMP/XMP_XFW004/IntegrationTestSetup/xtt.tests.lst" as the XMP v4.1.1 Test List
3.4. Run "xms link workflow -out xmp.cxpdl xmp.xpdl" under "<XMP_ROOT>/cfg" directory
3.5. Run "xms load data <XMP_ROOT>/cfg/xmp.cxpdl"
3.6. Run "xms load data <XTT_ROOT>/tests/XMP/XMP_XFW004/IntegrationTestSetup/xmp_WorkflowConstants.xml"
3.7. TBD



4. Things that needs to be done in XMP and XTT to run it manually with XTT GUI mode:
4.1. XMP (See the XMP Installation GUIDE)
4.1.1. Edit "<XTT_ROOT>/tests/XMP/XMP_XFW004/IntegrationTestSetup/pv.xml" to replace password attribute of ldapServer with the encryped version of "secret".
          Use <xfw_inst_dir>/bin/pwcrypt -f <license_file> secret
4.1.2. Update all occurances of variables starting with 'UPDATE_' in pv file mentioned above with correct data (ex. 
- licenseFile (licenseFile="UPDATE_XFW_INSTALL_DIR/cfg/UPDATE_XFW_LICENSE_FILE")
- systemName
- jdkDirectory
- operatingSystem
- userId
- workspaceDirectory
- update all used IP Addresses (ie. UPDATE_XFW_HOST_IP)
- logging directory
etc.)
4.1.3. Generate CV, start system.
4.1.4. Run "xms link workflow -out xmp.cxpdl xmp.xpdl" under "<XMP_ROOT>/cfg" directory
4.1.5. Run "xms load data <XMP_ROOT>/cfg/xmp.cxpdl"
4.1.6. Run "xms load data <XTT_ROOT>/tests/XMP/XMP_XFW004/IntegrationTestSetup/xmp_WorkflowConstants.xml"
4.2. XTT
4.2.1. Use "<XTT_ROOT>/tests/XMP/XMP_XFW004/IntegrationTestSetup/xtt.conf.xml" as the XTT configuration file
4.2.2. Update all occurances of variables starting with 'UPDATE_' in xtt.conf.xml file with with correct data (ex.
- productlicense (<productlicense>UPDATE_XFW_LICENSE_DIR/UPDATE_XFW_LICENSE_FILE</productlicense>)
- all IP Addresses
etc.
4.3. Start manuall test execution
4.3.1. Use "<XTT_ROOT>/tests/XMP/XMP_XFW004/IntegrationTestSetup/xtt_tests_xmp414.list" as the XMP v4.1.4 Test List for XTT GUI
4.3.2. Start RemoteXTT on the machine under test.
4.3.3. Run List of Test Casses from XTT GUI.

