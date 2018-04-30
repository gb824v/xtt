Video Optimization Test Steps:
------------------------------

Before Video optimization test, Need to required following configuration files:

A. Workflow package.
B. Workflow Constants file.
C. Request Modification file.
D. Video Optimization file.
E. Context Statistics file.

2. Changes in Files:

A. Workflow package -- no changes.

B. Workflow Constants file - should have following constant :

	<workflowConstant name="videoOptimizationFailureRetentionSecs">604800</workflowConstant>

C. Request Modification file - Required modification rules are added through test cases.

D. Video Optimization file - Required optimization settings are added through "XMPVideoOptCoreFunctionality.TC.000.xml"

E. Context Statistics file - Required Statistics are added through test cases.

3. Product View file changes: In product view following changes are required to run video optimization test cases:

	<mediaStore reaperSecs="10800" chunkSizeBytes="8192" firstChunkRequestTimeout="5" chunkRequestTimeout="30" maxMemorySizeMBytes="300"/>

	<processes>
		<mediaStorePartition backupMachineName="HOST_NAME" partitionNumber="1" />
		<videoOptimizer mediaStorePartitionNumber="1" processNameSuffix="1" />
		<videoOptimizer mediaStorePartitionNumber="1" processNameSuffix="2" />
	</processes>

Note : For one MEDIA STORE partition add minimum 2 video optimization process.

