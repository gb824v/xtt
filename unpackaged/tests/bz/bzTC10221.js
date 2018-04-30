/*
 * $Source: /cvs/CorePlatform/Repository/xtt/unpackaged/tests/bz/bzTC10221.js,v $
 * $Revision: 1.1 $
 * $Date: 2006/09/06 09:45:10 $
 *
 * JavaScript to create XMG GW Billing records
 *
 * Before we receive any records, we get called on function
 * initialAction(). This allows us to perform initialization
 * tasks.
 *
 * For each log record, we are called on recordAction().
 * We can print an output line, reconcile the records or
 * just keep totals.
 *
 * After all records have been processed, we are
 * called finalAction(). At this point we can print
 * out summaries.
 */

/*
 * initialAction
 *
 * Called once before we receive any records
 * Initialize variables and output the header lines
 */

function initialAction() {
    version = "logscan run on " +new Date();
    count             = 0;
    skip_count        = 0;
    pullCount         = 0;
    postCount         = 0;
    dspCount          = 0;
    w1Count           = 0;
    w2Count           = 0;
    connectCount      = 0;
    cStartCount       = 0;
    cStopCount        = 0;
    cSeizeCount       = 0;
    otherPseCount     = 0;
    noIpPseCount      = 0;
    pushRCount        = 0;
    pushDCount        = 0;
    pushNCount        = 0;
    pushInvalid       = 0;
    healthCount       = 0;
    current_record    = "not-set";

    start = new Date().getTime();
    initial = start;
    lastTime = 0;
    months = new makeArray('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec');
    logical_logs = new Object();
    activities   = new Object();
    records      = new Object();
    if (!exists( "pullStats" )) {
       pullStats = new Object();
       pullStats.total   = 0;   // total request
       pullStats.valid   = 0;   // valid requests based on code below
       pullStats.invalid = 0;   // invalid requests
       pullStats.ok      = 0;   // number of requests with code 200
       pullStats.other   = 0;   // number of requests with code <> 200
       pullStats.count   = 0;   // requests for this run/file
       pullStats.invCount= 0;   // invalid for this run/file
    } else {                    // for each run, we reset the counts for this run
       pullStats.count   = 0;   // requests for this run/file
       pullStats.invCount= 0;   // invalid for this run/file
    }

    // These defaults can be set/read via -userConfig
    setDefault( "PUSH_Name",                     "PUSH" );
    setDefault( "PRESENCE_Name",                  "PSE" );
    setDefault( "SERVICE_Name",               "SERVICE" );
    setDefault( "CUST_Name",                     "CUST" );
    setDefault( "MGMT_Name",            "MGMTWEBSERVER" );
    setDefault( "Consistency_Check",                  0 );
    setDefault( "TRACE_Skipped",                      1 );
    setDefault( "TRACE_Undefined",                    1 );
    setDefault( "TRACE_Invalid",                      1 );
}

    var testURL = new Array("^live\.vizzavi\.co\.uk$", "^[a-z.]*vodafone\.co\.uk$");
    var testURLre = new Array();
    for (i = 0; i < testURL.length; i++)
        testURLre[i] = new RegExp(testURL[i], "i");
    var newLineRE = new RegExp("\n", "g");
    var doubleQuoteRE = new RegExp('"', "g");

/*
 * Called after all records have been read
 * but before exporting JavaScript state.
 */
function finalAction() {
    now = new Date().getTime();

    // sum up the total pullStats
    pullStats.total += pullStats.count;

    trace( "\n"                   , version,           "\n",
           "Records processes : " , count,             "\n",
           "Pull Requests     : " , pullCount,
           "  (Wap1: ", w1Count, ", Wap2: ", w2Count, ")\n",
           "Pull POST count   : " , postCount,         "\n",
           "Pull CONNECT count: " , connectCount,      "\n",
           "Pull DSP records  : " , dspCount,          "\n",
           "Context Starts    : " , cStartCount,       "\n",
           "Context Stops     : " , cStopCount,        "\n",
           "Context Seizes    : " , cSeizeCount,       "\n",
           "PSE without IpAddr: " , noIpPseCount,      "\n",
	   "PSE count (other) : " , otherPseCount,     "\n",
           "Push Requests     : " , pushRCount,        "\n",
           "Push Deliveries   : " , pushDCount,        "\n",
           "Push Notifications: " , pushNCount,        "\n",
           "Push Invalid      : " , pushInvalid,       "\n",
           "Health Checks     : " , healthCount,       "\n",
           "Skipped           : " , skip_count,        "\n",
           "-- Reliability --"    ,                    "\n",
           "Requests processed: " , pullStats.count,   "\n",
           "Requests invalid  : " , pullStats.invCount,"\n",
           "Total requests    : " , pullStats.total,   "\n",
           "Total invalid     : " , pullStats.invalid, "\n"
           );

    elapsed = now - initial;
    trace("Records " + count + ", Elapsed " + (elapsed / 1000) + " secs, " + (elapsed / count) + " mS / record\n");

    for ( var element in logical_logs ) {
        trace( "Logical Log [" + element + "], Seq#: " + logical_logs[ element], "\n");
    }
    for ( var element in activities ) {
        trace( "Activity [ " + element + " ]: " + activities[ element], "\n");
    }
    for ( var element in records ) {
	trace( "Records  [ " + element + " ], Total: ", records[ element ].total,
	       ", Success: ", records[ element ].success,
	       ", Failure: ", records[ element ].failure,
               "\n" );
    }
}


/*
 * Called to process every record
 */
function recordAction() {
    //
    // Get the timestamp from the log record and convert it
    // to a JavaScript date
    //
    var thisTime  = parseFloat(LSA_EventTime) * 1000;

    if (Consistency_Check == 1) {
        if (lastTime > thisTime) {
	    trace("Error, time jumped back: ", lastTime, " - ", thisTime, "\n");
        }
        // remember logical logs and their seq #
        logical_logs[LSA_LogicalLog] = LSA_SequenceNumber;
    }

    if (Consistency_Check == 2) {
        var i;
	i = LSA_LogicalLog.indexOf( "." );
	if (i<0) {i = LSA_LogicalLog.length;}
	var logLog = LSA_LogicalLog.substring( 0, i );
	if (activities[ logLog ] == undefined) {
	    activities[ logLog ] = 1;
        } else {
	   activities[ logLog ]++;
        }
    }

    lastTime = thisTime;
    eventTime = new Date(thisTime);

    //
    // Count the records we have processed
    //
    count++;

    // reset record type
    current_record = "not-set";

    var i;
    i = LSA_LogicalLog.indexOf( "." );
    var logLog = LSA_LogicalLog.substring( 0, i );
    switch (logLog) {
        case PUSH_Name:
             pushRequest();
	     return;
             break;
        case SERVICE_Name:
             var method = getValue( "HTA_Method", 1 );
             switch (method) {
                case "GET":
                    pullRequest("PullR");
    		    pullCount++;
         	    return;
                case "HEAD":
                    pullRequest("PullR");
    		    pullCount++;
         	    return;
         	case "POST":
                    pullRequest("PostR");
    		    postCount++;
         	    return;
         	case "CONNECT":
                    pullRequest("ConnR");
    		    connectCount++;
         	    return;
                default:
                    break;
             } // switch (method)
             break;
        case PRESENCE_Name:
             var event = getValue( "LSA_Event" );
             switch (event) {
                 case "PSE_LIVE_FEED_LOGON":
                      contextStart();
	              return;
	         case "PSE_LIVE_FEED_LOGOFF":
	              contextStop();
	              return;
	         case "PSE_SEIZE_ADDRESS":
	              contextSeize();
	              return;
	         default:
		 // trace( "Bad Event: ", event, ", Name: ", logLog, "\n" );
		 otherPseCount++;
                 return;
	     } // switch (event)
             break;
        case CUST_Name:
             healthEvent();
             return
        default:
	     if (LSA_LogicalLog.indexOf( CUST_Name ) == 0) {  // does is start with that
                 healthEvent();
                 return
	     }
    } // switch (logLog)

    // if we come down here, we have a new, unknonw record type, trace it as skipped
    skip_count++;
    if (TRACE_Skipped) {
        var eventTime = new Date( parseFloat( getValue( "LSA_EventTime", 1 ) ) * 1000 );
        trace ("Skip-G    R#: ", count, ", ", eventTime.BillingDateTime(),
                ", "        , LSA_LogicalLog,
                ", HTA_Rq: ", getValue( "HTA_Request", 1 ),
                ", HTA_St: ", getValue( "HTA_ResponseStatus", 1 ),
                ", IM_E#: " , getValue( "IM_ENumber", 1 ), "\n");
    }
}


/************************
 *                      *
 *   Billing event      *
 *   creation functions *
 *                      *
 ************************/

/************************
 *                      *
 *   Pull Request Event *
 *   functions          *
 *                      *
 ************************/
/*
 * Function to emit a pullRequest_event record
   ------------------------------------------- */
 function pullRequest(reqType) {
    var pr = new _pullRequest_event();

    // record type and sender
    pr.event_type        = reqType;
    current_record       = pr.event_type;

    var eventTime        = new Date( parseFloat(exists("DSP_TransactionStartTime") ? DSP_TransactionStartTime : LSA_EventTime) * 1000 );
    pr.date_time         = eventTime.BillingDateTime();

    if (LSA_Component == "DSP" && !exists( "HTA_BytesIn" )) {
       dspCount++;
       return; // for a pull, we get 2 log entries
               // one from WPA, one from DSP
               // assume this is the DSP entry, ignore it
    }
    if (exists( "IM_Protocol" )) { // should always exist
	if (IM_Protocol == "WAP") {
	    pr.pull_code      = "W1";
	    pr.bytes_received = getValue( "WPA_BytesIn", 1 );
	    pr.bytes_sent     = getValue( "WPA_BytesOut", 1 );
	    w1Count++;
	} else { // IM_Protocol == "HTTP"
	    pr.pull_code      = "W2";
	    pr.bytes_received = getValue( "HTA_BytesIn", 1 );
	    pr.bytes_sent     = getValue( "DSP_BytesTransferredOut", 1 );
	    w2Count++;
	}
    } else {
        trace ("NoWAP1o2 R#: ", count, ", ", eventTime.BillingDateTime(),
	    ", "        , LSA_LogicalLog,
	    ", "        , getValue( "Internal_NAI", 1 ),
	    ", "        , getValue( "NTW_CalledStationId", 1 ),
	    ", "        , getValue( "HTA_Method" ),
	    ", "        , getValue( "HTA_Protocol" ),
	    ", "        , getValue( "HTA_Uri", 1 ),
	    ", "        , getValue( "HTA_ResponseStatus", 1 ),
	    ", "        , getValue( "HTG_ResponseStatus", 1 ),
	    "\n");
    }

    // required fields
    pr.unique_context_id = getValue( "NTW_AccountingSessionId", 1 );
    //.calling_station   = getValue( "NTW_Calling_Station_ID", 1 );
    pr.calling_station   = getValue( "Internal_NAI", 1 );
    pr.called_station    = getValue( "NTW_CalledStationId", 1 );
    pr.nas_ip_address    = getValue( "NTW_NASIPAddress", 1 );
    //.nas_identifier    = getValue( "NTW_NASIdentifier", 1) ;
    pr.vendor_attr_1     = getValue( "NTW_VendorAttr_1", 1 );
    //.pull_code         = see above

    pr.method            = getValue( "HTA_Method" );
    pr.protocol          = getValue( "HTA_Protocol" );
    pr.domain            = getValue( "HTA_DomainName", 1 );
    // search for characters which confuse CSV clients ('\n', '"') and replace them with %hex-value 
    if (pr.domain.indexOf( "\n" ) >= 0) {
        pr.domain          = pr.domain.replace(newLineRE, "%0A");
    }
    if (pr.domain.indexOf( '"' ) >= 0) {
        pr.domain          = pr.domain.replace(doubleQuoteRE, "%22");
    }
    //.port              = getValue( "HTA_Port", 1 );
    pr.port              = getValue( "TCP_LocalIpPort", 1 );    
    pr.path              = getValue( "HTA_Path", 1 );
    // search for characters which confuse CSV clients ('\n', '"') and replace them with %hex-value 
    if (pr.path.indexOf( "\n" ) >= 0) {
        pr.path          = pr.path.replace(newLineRE, "%0A");
    }
    if (pr.path.indexOf( '"' ) >= 0) {
        pr.path          = pr.path.replace(doubleQuoteRE, "%22");
    }
    pr.searchstring      = getValue( "HTA_SearchString", 1 );
    // search for characters which confuse CSV clients ('\n', '"') and replace them with %hex-value 
    if (pr.searchstring.indexOf( "\n" ) >= 0) {
        pr.searchstring          = pr.searchstring.replace(newLineRE, "%0A");
    }
    if (pr.searchstring.indexOf( '"' ) >= 0) {
        pr.searchstring          = pr.searchstring.replace(doubleQuoteRE, "%22");
    }
    pr.protocol_version  = getValue( "HTA_ProtocolVersion" );
    // pr.referrer          = getValue( "HTA_ReqHdr_referer", 1 );
    pr.user_agent        = getValue( "HTA_ReqHdr_user_agent", 1 );
    // search for characters which confuse CSV clients ('\n', '"') and replace them with %hex-value 
    if (pr.user_agent.indexOf( "\n" ) >= 0) {
        pr.user_agent          = pr.user_agent.replace(newLineRE, "%0A");
    }
    if (pr.user_agent.indexOf( '"' ) >= 0) {
        pr.user_agent          = pr.user_agent.replace(doubleQuoteRE, "%22");
    }
    pr.gateway_status    = getValue( "HTA_ResponseStatus", 1 );
    pr.content_status    = getValue( "HTG_ResponseStatus", 1 );
    pr.im_content_type   = getValue( "IM_ContentType", 1 );
    pr.rem_ip_address    = getValue( "TCP_RemoteIpAddress", 1 );
    pr.rem_ip_port       = getValue( "TCP_RemoteIpPort", 1 );
    //.bytes_received    = see above
    //.bytes_sent        = see above
    if (exists( "HTG_RequestEndTime" )) {
       var end_time      = parseFloat( getValue( "HTG_RequestEndTime", 1 ) );      // in micro sec
       var start_time    = parseFloat( getValue( "HTG_RequestStartTime", 1 ) );
       var rt            = (end_time - start_time) * 1000;  // in ms
       pr.content_resp_time = rt.toFixed();
    }

    pr.failure_code   = 0;           // assume valid request
    if (reqType == "PullR") {
	/* check if this is a valid request;
	* assume we always get a GW_Status, CP_Status may be absent
	* a request is checked against these rules:
	* - CP status exists and is the same as the GW status
	*   . any GW status -> valid
	* - CP status exists but is different to the GW status
	*   . GW status 2xx -> valid
	*   . GW status 3xx -> valid
	*   . GW status 406 -> valid (content not acceptable)
	*   . GW status other -> invalid
	* - CP status does not exist
	*   all request are counted as valid unless the GW status is 404 or 408
	*    and the URL matches one of the test URLs or GW status 500
	*/
	if (exists( "HTG_ResponseStatus" )) {            // CP status exists
	if (pr.gateway_status == pr.content_status) { // GW and CP had same status
	    pullStats.valid++;
	} else {                                      // GW and CP diff. status
	    var gw_status = parseInt( pr.gateway_status );
	    if ((gw_status < 400)||(gw_status == 406)) {
		pullStats.valid++;
	    } else {
		pullStats.invalid++;
		pullStats.invCount++;
		if (TRACE_Invalid) {
		    trace ("Invalid R#: ", count, ", ", pr.date_time,
			    ", "        , LSA_LogicalLog,
			    ", "        , pr.calling_station,
			    ", "        , pr.called_station,
			    ", "        , pr.method,
			    ", "        , pr.protocol,
			    ", "        , pr.domain,
			    ", "        , pr.path,
			    ", "        , pr.gateway_status,
			    ", "        , pr.content_status,
			    "\n");
		}
    
	    }
	}
	} else {                                         // no CP status
	var gw_status = parseInt( pr.gateway_status );
	var gw_validReq = true;
	if (gw_status == 404 || gw_status == 408) {
	    for (i = 0; i < testURLre.length; i++) {
		if (pr.domain.match(testURLre[i]) != null) {
		    gw_validReq = false;
		    break;
		}
	    }
	}
	if (gw_validReq == false || gw_status == 500) {
	    pr.failure_code = gw_status;           // invalid request
	    pullStats.invalid++;
	    pullStats.invCount++;
	    if (TRACE_Invalid) {
		trace ("Invalid R#: ", count, ", ", pr.date_time,
			", "        , LSA_LogicalLog,
			", "        , pr.calling_station,
			", "        , pr.called_station,
			", "        , pr.method,
			", "        , pr.protocol,
			", "        , pr.domain,
			", "        , pr.path,
			", "        , pr.gateway_status,
			", none, "  , getValue("IM_ENumber", 1),
			", "        , getValue("IM_EDetail", 1),
			"\n");
		}
	} else {
	    pullStats.valid++;
	}
	}
    
	// pullStats.total++;, this is now done in finalAction
	pullStats.count++;
	if (pr.gateway_status == 200) {
	    pullStats.ok++;
	} else {
	    pullStats.other++;
	}
    }

    pr.write();
}

/*
 * function to create and init a new pullRequest_event record
   ---------------------------------------------------------- */
function _pullRequest_event () {
    this.event_type      		= "";
    this.date_time                      = "";
    this.unique_context_id              = "";
    this.calling_station                = "";
    this.called_station                 = "";
    this.nas_ip_address                 = "";
  //this.nas_identifier                 = "";
    this.vendor_attr_1                  = "";
    this.pull_code                      = "";
    this.failure_code                   = "";
    this.method                         = "";
    this.protocol                       = "";
    this.domain                         = "";
    this.port                           = "";
    this.path                           = "";
    this.searchstring                   = "";
    this.protocol_version               = "";
  //this.referrer                       = "";
    this.user_agent                     = "";
    this.bytes_received                 = "";
    this.bytes_sent                     = "";
    this.gateway_status                 = "";
    this.content_status                 = "";
    this.content_resp_time              = "";
    this.im_content_type                = "";
    this.rem_ip_address                 = "";
    this.rem_ip_port                    = "";
    this.write                          = _pullRequest_event_write;
}

/*
 * function to write a pullRequest_event record
   -------------------------------------------- */
function _pullRequest_event_write() {
    write (
        '"', this.event_type             , '",',
        '"', this.date_time              , '",',
        '"', this.unique_context_id      , '",',
        '"', this.calling_station        , '",',
        '"', this.called_station         , '",',
        '"', this.nas_ip_address         , '",',
        '"', this.vendor_attr_1          , '",',
        '"', this.pull_code              , '",',
             this.failure_code           ,  ',',
        '"', this.method                 , '",',
        '"', this.protocol               , '",',
        '"', this.domain                 , '",',
             this.port                   ,  ',',
        '"', this.path                   , '",',
        '"', this.searchstring           , '",',
        '"', this.protocol_version       , '",',
        '"', this.user_agent             , '",',
             this.bytes_received         ,  ',',
             this.bytes_sent             ,  ',',
             this.gateway_status         ,  ',',
             this.content_status         ,  ',',
             this.content_resp_time      ,  ',',
        '"', this.im_content_type        ,  '",',
        '"', this.rem_ip_address         ,  '",',
	     this.rem_ip_port            ,
        '\n'
    );

    if (Consistency_Check == 2) {
	if (records[ this.event_type ] === undefined) {
	    records[ this.event_type ] = new Object();
	    records[ this.event_type ].total   = 0;
	    records[ this.event_type ].success = 0;
	    records[ this.event_type ].failure = 0;
	}
	records[ this.event_type ].total++;
	if (this.failure_code == 0) {
	    records[ this.event_type ].success++;
	} else {
	    records[ this.event_type ].failure++;
	}
    }
}

/************************
 *                      *
 *  Context Event       *
 *  functions           *
 *                      *
 ************************/
/*
 * Function to emit a contextStart_event record
   -------------------------------------------- */
 function contextStart() {
    var cs = new _context_event();

    // report only records containing an IP Address
    // for the VF GW project, there can be an "Interim Start"
    // containing the IP address, whereas the initial "Start"
    // does not have an IP
    if (!exists( "PSE_ADDRESS_TYPE_IP" )) {
       noIpPseCount++;
       return;
    }

    // record type and sender
    cs.event_type        = "CStart";
    current_record       = cs.event_type;

    // required fields
    var eventTime        = new Date( parseFloat(LSA_EventTime) * 1000 );
    cs.date_time         = eventTime.BillingDateTime();
    cs.unique_context_id = getValue( "NTW_AccountingSessionId", 1 );
    //.user_id           = PSE_USER_ID;
    cs.user_ip           = PSE_ADDRESS_TYPE_IP;
    //.calling_station   = getValue( "NTW_CallingStationId", 1 );
    cs.calling_station   = getValue( "PSE_USER_ID", 1 );
    cs.called_station    = getValue( "NTW_CalledStationId", 1 );
    cs.nas_ip_address    = getValue( "NTW_NASIPAddress", 1 );
    cs.nas_identifier    = getValue( "NTW_NASIdentifier", 1) ;
    cs.vendor_attr_1     = getValue( "NTW_VendorAttr_1", 1 );
    cs.pse_attr          = PSE_ALREADY_LOGGED_ON == "TRUE" ? "logged on": "";

    cs.write();
    cStartCount++;
}

/*
 * Function to emit a contextStop_event record
   -------------------------------------------- */
 function contextStop() {
    var cs = new _context_event();

    // record type and sender
    cs.event_type        = "CStop";
    current_record       = cs.event_type;

    // required fields
    var eventTime        = new Date( parseFloat(LSA_EventTime) * 1000 );
    cs.date_time         = eventTime.BillingDateTime();
    cs.unique_context_id = getValue( "NTW_AccountingSessionId", 1 );
    //.user_id           = PSE_USER_ID;
    cs.user_ip           = PSE_ADDRESS_TYPE_IP;
    //.calling_station   = getValue( "NTW_CallingStationId", 1 );
    cs.calling_station   = getValue( "PSE_USER_ID", 1 );
    cs.called_station    = getValue( "NTW_CalledStationId", 1 );
    cs.nas_ip_address    = getValue( "NTW_NASIPAddress", 1 );
    cs.nas_identifier    = getValue( "NTW_NASIdentifier", 1) ;
    cs.vendor_attr_1     = getValue( "NTW_VendorAttr_1", 1 );
    cs.pse_attr          = PSE_USER_MISMATCH == "TRUE" ? "user mismatch": "";

    cs.write();
    cStopCount++;
}

/*
 * Function to emit a contextSeize_event record
   -------------------------------------------- */
 function contextSeize() {
    var cs = new _context_event();

    // record type and sender
    cs.event_type        = "CSeize";
    current_record       = cs.event_type;

    // required fields
    var eventTime        = new Date( parseFloat(LSA_EventTime) * 1000 );
    cs.date_time         = eventTime.BillingDateTime();
    cs.unique_context_id = getValue( "NTW_AccountingSessionId", 1 );
    //.user_id           = PSE_USER_ID;
    cs.user_ip           = PSE_ADDRESS_TYPE_IP;
    //.calling_station   = getValue( "NTW_CallingStationId", 1 );
    cs.calling_station   = getValue( "PSE_USER_ID", 1 );
    cs.called_station    = getValue( "NTW_CalledStationId", 1 );
    cs.nas_ip_address    = getValue( "NTW_NASIPAddress", 1 );
    cs.nas_identifier    = getValue( "NTW_NASIdentifier", 1) ;
    cs.vendor_attr_1     = getValue( "PSE_SEIZED_USER_ID", 1 );

    cs.write();
    cSeizeCount++;
}
/*
 * function to create and init a new contextStart_event record
   --------------------------------------------------- */
function _context_event () {
    this.event_type      		= "";
    this.date_time                      = "";
    //  .user_id                        = "";
    this.user_ip                        = "";
    this.unique_context_id              = "";
    this.calling_station                = "";
    this.called_station                 = "";
    this.nas_ip_address                 = "";
    this.nas_identifier                 = "";
    this.vendor_attr_1                  = "";
    this.pse_attr                       = "";
    this.write                          = _context_event_write;
}

/*
 * function to write a contextStart_event record
   ------------------------------------- */
function _context_event_write() {
    write (
        '"', this.event_type        , '",',
        '"', this.date_time         , '",',
        '"', this.unique_context_id , '",',
        '"', this.user_ip           , '",',
        '"', this.calling_station   , '",',
        '"', this.called_station    , '",',
        '"', this.nas_ip_address    , '",',
        '"', this.nas_identifier    , '",',
        '"', this.vendor_attr_1     , '",' ,
        '"', this.pse_attr          , '"' ,
	"\n"
    );

    if (Consistency_Check == 2) {
	if (records[ this.event_type ] === undefined) {
	    records[ this.event_type ] = new Object();
	    records[ this.event_type ].total   = 0;
	    records[ this.event_type ].success = 0;
	    records[ this.event_type ].failure = 0;
	}
	records[ this.event_type ].total++;
        records[ this.event_type ].success++;
    }
}

/************************
 *                      *
 *  Push Event          *
 *  functions           *
 *                      *
 ************************/
/*
 * Function to emit a pushRequest_event record
   -------------------------------------------- */
 function pushRequest() {
    var pr = new _push_event();

    // PUSH produces 'bad' event records that not even contain
    // a HTA_ResponseStatus; with that, none of the other
    // PAP_ attributes are present, count the bad records,
    // but produce no record (found in Lenzburg)
    if (!exists( "HTA_ResponseStatus" )) {
       pushInvalid++;
       return;
    }

    // record type and sender
    pr.event_type        = "PushR";
    current_record       = pr.event_type;

    // required fields
    var eventTime        = new Date( parseFloat(LSA_EventTime) * 1000 );
    pr.date_time         = eventTime.BillingDateTime();
    pr.seq_no            = LSA_SequenceNumber;

    if (exists( "HTA_ResponseStatus" )) {
        pr.failure_code  = (HTA_ResponseStatus == 202)  ? 0 : HTA_ResponseStatus;
    }
    if (exists( "PAP_ResponseStatus" )) {
        pr.failure_code  = (PAP_ResponseStatus == 1001) ? 0 : PAP_ResponseStatus;
    }
    if (pr.failure_code == 0) {
       pr.push_id        = getValue( "PAP_push_id" );
       pr.pi_id          = getValue( "PI_Name", 1 );
       pr.target_address = getValue( "HTA_Path" );
       pr.push_type      = getValue( "PAP_delivery_method" );
       pr.bearer         = getValue( "PAP_bearer" );
       pr.qos            = getValue( "PAP_priority" );
    }
    pr.write();
    pushRCount++;
}

/*
 * Function to emit a pushDelivery_event record
   -------------------------------------------- */
 function pushDelivery() {
    var pd = new _push_event();

    // record type and sender
    pd.event_type        = "PushD";
    current_record       = pd.event_type;

    // required fields
    var eventTime        = new Date( parseFloat(LSA_EventTime) * 1000 );
    pd.date_time         = eventTime.BillingDateTime();

    pd.write();
    pushDCount++;
}

/*
 * Function to emit a pushNotification_event record
   ------------------------------------------------ */
 function pushNotification() {
    var pn = new _push_event();

    // record type and sender
    pn.event_type        = "PushD";
    current_record       = pn.event_type;

    // required fields
    var eventTime        = new Date( parseFloat(LSA_EventTime) * 1000 );
    pn.date_time         = eventTime.BillingDateTime();

    pn.write();
    pushNCount++;
}

/*
 * function to create and init a new contextStart_event record
   --------------------------------------------------- */
function _push_event () {
    this.event_type      		= "";
    this.date_time                      = "";
    this.failure_code                   = "";
    this.push_id                        = "";
    this.pi_id                          = "";
    this.target_address                 = "";
    this.push_type                      = "";
    this.bearer                         = "";
    this.qos                            = "";
    this.write                          = _push_event_write;
}

/*
 * function to write a push_event record
   ------------------------------------- */
function _push_event_write() {
    write (
        '"', this.event_type        , '",',
        '"', this.date_time         , '",',
             this.failure_code      ,  ',',
        '"', this.push_id           , '",',
        '"', this.pi_id             , '",',
        '"', this.target_address    , '",',
        '"', this.push_type         , '",',
        '"', this.bearer            , '",',
        '"', this.qos               +  '"', '\n'
    );

    if (Consistency_Check == 2) {
	if (records[ this.event_type ] === undefined) {
	    records[ this.event_type ] = new Object();
	    records[ this.event_type ].total   = 0;
	    records[ this.event_type ].success = 0;
	    records[ this.event_type ].failure = 0;
	}
	records[ this.event_type ].total++;
	if (this.failure_code == 0) {
	    records[ this.event_type ].success++;
	} else {
	    records[ this.event_type ].failure++;
	}
    }
}

/************************
 *                      *
 *  Health Event        *
 *  functions           *
 *                      *
 ************************/
/*
 * Function to emit a healthRequest_event record
   --------------------------------------------- */
 function healthEvent() {
    var hr = new _health_event();

    // record type and sender
    hr.event_type        = "Health";
    current_record       = hr.event_type;

    // required fields
    var eventTime        = new Date( parseFloat(LSA_EventTime) * 1000 );
    hr.date_time         = eventTime.HealthDateTime();

    if (getValue( "LSA_Component" ).indexOf( "WAP12Pull" ) == 0) { // start with WAP12Pull
        hr.failure_code  = getValue( "StatusCode", 1 );
        /* 
        new format for RM-Helper, 4 Mar 2005
        Old: Description: Wap12PullCONS : 10.149.7.43:9201
        New: Descritpion: 10.149.7.43 :9201
        no need to skip over name anymore
        remove the extra " " in front of ":"
        */
        hr.machine = getValue( "Description", 1);
    } else {
    if (getValue( "LSA_Component" ).indexOf( "Wap20Pull" ) == 0) { // start with Wap20Pull
        hr.failure_code  = getValue( "StatusCode", 1 );
        hr.machine       = getValue( "Proxy", 1 );
    } else {
    if (getValue( "LSA_Component" ).indexOf( "WAP12Push" ) == 0) { // start with WAP12Push
        hr.failure_code  = getValue( "StatusCode", 1 );
        hr.machine       = getValue( "PushIpPort", 1 );
    }}}

    hr.failure_code      = getValue( "StatusCode", 1 );
    hr.state             = getValue( "ResourceStatus" );
    hr.action            = getValue( "LSA_Component" );
    hr.url               = getValue( "Url", 1 );

    hr.write();
    healthCount++;
}

/*
 * function to create and init a new contextStart_event record
   --------------------------------------------------- */
function _health_event () {
    this.event_type                     = "";
    this.date_time                      = "";
    this.machine                        = "";
    this.failure_code                   = "";
    this.state                          = "";
    this.action                         = "";
    this.url                            = "";
    this.write                          = _health_event_write;
}

/*
 * function to write a contextStart_event record
   ------------------------------------- */
function _health_event_write() {
    write (
        "H,",                          // filler to make date&time the second field
        this.date_time         , ',',
        this.action            , ',',
        this.failure_code      , ',',
        this.state             , ',',
        this.machine           , ',',
        this.url               , '\n'
    );
}


/************************
 *                      *
 *   Utility functions  *
 *                      *
 ************************/
/*
 * Function to check if a variable exists
 */
 function exists(name)
 {
     return this[name] != undefined;
 }

/*
 * Function return value if a variable exists
 */
 function getValue(name, optional)
 {
     if (this[name] != undefined ) {
         return (this[name]) ;
     } else {
//       if (!optional && TRACE_Undefined) {
         if (TRACE_Undefined && (!optional || TRACE_Undefined == 2)) {
             var eventTime = new Date( parseFloat( getValue( "LSA_EventTime", 1 ) ) * 1000 );
             trace( "Undef-V   R#: ", count,
                    ", ", eventTime.BillingDateTime(),
                    ", ", current_record,
                    ", no value for: ", name, "\n" );
         }
         return "";
     }
 }

 /*
  * Function to access a context element
  * and supply a default if it is empty
  * or not defined
  */
 function setDefault(contextName, defaultValue)
 {
     if ((this[contextName] === undefined) ||
         (this[contextName] === "")) {
             this[contextName] = defaultValue;
     }
 }

 function makeArray() {
     for (i = 0; i<makeArray.arguments.length; i++)
          this[i + 1] = makeArray.arguments[i];
 }

 /*
  * Set of useful string handling functions from
  * http://webdeveloper.earthweb.com/webjs/article.php/640821
  * Very efficient and concise.
  *
  * Text.as(arg)                       Force arg to a string
  * Text.is(arg)                       True if arg is a string
  * Text.no(arg)                       Force arg to number (or zero)
  * Text.ex(string, multiplier)        Expand (replicate) a string
  * Text.pad(length, str, fill)        Pad,left justify
  * Text.pad(str, length, fill)        Pad,right justify
  * Text.trim(str)                     Remove leadin/gtrailing space
  */
 Text = {
     as:function(a1) { return '' + (a1 || '') },
     is:function(a1) { return '' + a1 === a1 },
     no:function(a1) {
         a1 = isNaN(a1=Number(a1)) ? parseFloat(a1) : a1;
         return isNaN(a1) ? 0 : a1;
     },
     ex:function(a1,a2) {
         var mo = Math.floor(a2/2);
         if (mo > 1) return this.ex(a1 + a1, mo) + (a2 % 2 && a1 || '');
         var fo = '';
         while (a2 > 0) { fo += a1; a2-- }
         return fo;
     },
     pad:function(a1,a2,a3) {
     return this.is(a1)
         ? a1 + this.ex(a3 || ' ', a2 - a1.length)
         : this.ex(a3 || ' ', a1 - ('' + a2).length) + a2;
     },
     trim:function(a1,a2,a3) {
         a1 = this.as(a1).replace(a3 || /^\s+|\s+$/g, '');
         return a2 && a1.length > a2 ? a1.substr(0,a2-1) + '\u2026' : a1;
     },
 }


// date and time in format required by CLF
Date.prototype.CLFDateTime = function() {
   return  '[' +
           Text.pad(2, this.getDate(), '0') + '/' +
           months[this.getMonth()+1] + '/' +
           this.getFullYear() + ':' +
           Text.pad(2, this.getHours(), '0') + ':' +
           Text.pad(2, this.getMinutes(), '0') + ':' +
           Text.pad(2, this.getSeconds(), '0') +
           ']';
}

// date and time in format required by Gateway Billing
Date.prototype.BillingDateTime = function() {
   var hdrs = (this.getUTCMilliseconds() / 10).toFixed();
   if (hdrs == 100) {hdrs = 99;}
   return  this.getUTCFullYear()                  +
           Text.pad(2, this.getUTCMonth() + 1, '0') +
           Text.pad(2, this.getUTCDate(), '0')    +
           Text.pad(2, this.getUTCHours(),   '0') +
           Text.pad(2, this.getUTCMinutes(), '0') +
           Text.pad(2, this.getUTCSeconds(), '0') +
           Text.pad(2, hdrs, '0') ;
}

// date and time in format required by Health Check log 
Date.prototype.HealthDateTime = function() {
   return  this.getFullYear()                    + "/" +
           Text.pad(2, this.getMonth() + 1, '0') + "/" +
           Text.pad(2, this.getDate(), '0')      + " " +
           Text.pad(2, this.getHours(),   '0')   + ":" +
           Text.pad(2, this.getMinutes(), '0')   + ":" +
           Text.pad(2, this.getSeconds(), '0');
}


