// KonySyncLib.js
//  --Generated On Mon Nov 09 17:45:50 IST 2015******************* 
// 
// 
//  **************** Start jsonWriter.js*******************
//#ifdef iphone
	//#define KONYSYNC_IOS
//#endif
//#ifdef bb
	//#define KONYSYNC_BB
//#endif
//#ifdef bb10
	//#define KONYSYNC_BB10
//#endif
//#ifdef winmobile
	//#define KONYSYNC_WINDOWS
//#endif
//#ifdef winmobile6x
	//#define KONYSYNC_WINDOWS
//#endif
//#ifdef winphone8
	//#define KONYSYNC_WINDOWS
//#endif
//#ifdef android
	//#define KONYSYNC_ANDROID
//#endif
//#ifdef j2me
	//#define KONYSYNC_J2ME
//#endif

//#ifdef ipad
	//#define KONYSYNC_IOS
//#endif
//#ifdef tabrcandroid
	//#define KONYSYNC_ANDROID
//#endif
//#ifdef playbook
	//#define KONYSYNC_WINDOWS
//#endif
//#ifdef spaipad
	//#define KONYSYNC_IOS
//#endif
//#ifdef spatabandroid
	//#define KONYSYNC_ANDROID
//#endif
//#ifdef spaplaybook
	//#define KONYSYNC_WINDOWS
//#endif
//#ifdef windows8
	//#define KONYSYNC_WINDOWS
//#endif
//#ifdef spatabwindows
	//#define KONYSYNC_WINDOWS
//#endif

//#ifdef desktop_kiosk
	//#define KONYSYNC_WINDOWS
//#endif
//#ifdef desktopweb
	//#define KONYSYNC_WINDOWS
//#endif


//#ifdef iphone
	//#define KONYSYNC_MOBILE
//#endif
//#ifdef bb
	//#define KONYSYNC_MOBILE
//#endif
//#ifdef bb10
	//#define KONYSYNC_MOBILE
//#endif
//#ifdef winmobile
	//#define KONYSYNC_MOBILE
//#endif
//#ifdef winmobile6x
	//#define KONYSYNC_MOBILE
//#endif
//#ifdef winphone8
	//#define KONYSYNC_MOBILE
//#endif
//#ifdef android
	//#define KONYSYNC_MOBILE
//#endif
//#ifdef j2me
	//#define KONYSYNC_MOBILE
//#endif
//#ifdef symbian
	//#define KONYSYNC_MOBILE
//#endif

//#ifdef ipad
	//#define KONYSYNC_TAB
//#endif
//#ifdef tabrcandroid
	//#define KONYSYNC_TAB
//#endif
//#ifdef playbook
	//#define KONYSYNC_TAB
//#endif
//#ifdef spaipad
	//#define KONYSYNC_TAB
//#endif
//#ifdef spatabandroid
	//#define KONYSYNC_TAB
//#endif
//#ifdef spaplaybook
	//#define KONYSYNC_TAB
//#endif
//#ifdef windows8
	//#define KONYSYNC_TAB
//#endif
//#ifdef spatabwindows
	//#define KONYSYNC_TAB
//#endif

//#ifdef desktop_kiosk
	//#define KONYSYNC_DESKTOP
//#endif
//#ifdef desktopweb
	//#define KONYSYNC_DESKTOP
//#endif

//#ifdef KONYSYNC_IOS
	//#define KONYSYNC_ENCRYPTION_AVAILABLE
//#endif
//#ifdef KONYSYNC_ANDROID
	//#define KONYSYNC_ENCRYPTION_AVAILABLE
//#endif
//#ifdef KONYSYNC_WINDOWS
	//#define KONYSYNC_ENCRYPTION_AVAILABLE
//#endif

if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}
if(typeof(sync) === "undefined") {
	sync = {};
}
/*
kony.sync.jsonGetType = function(node) {
	sync.log.trace("Entering kony.sync.jsonGetType ");
    if (kony.type(node) === "table") {
        for (var key in node) {
            if ((key === 1)) {
                return 1;
            } else if (key === "1") {
                return 1;
            } else {
                return 2;
            }
        }
        return 1;
    }
    return 0;
};

kony.sync.createJson = function(key, data) {
	sync.log.trace("Entering kony.sync.createJson ");
    kony.sync.jsonBegin();
    kony.sync.jsonWriteKeyValue(key, data);
    kony.sync.jsonEnd();
    return js;
};

kony.sync.jsonWriteKeyValue = function(key, data) {
	sync.log.trace("Entering kony.sync.jsonWriteKeyValue ");
    kony.sync.jsonBeginElement(key);
    kony.sync.jsonWriteValue(data);
};

kony.sync.jsonWriteValue = function(data) {
	sync.log.trace("Entering kony.sync.jsonWriteValue ");
    datatype = kony.sync.jsonGetType(data);
	var len = null;
    if (datatype === 0) {
        kony.sync.jsonString(data);
    } else if (datatype === 1) {
        kony.sync.jsonBeginArray();
        len = kony.sync.jsonwriter_ipairs_length(data);
        var count1 = 0;
		if(!kony.sync.isNullOrUndefined(data)){
			for (var i = 0; i < data.length; i++) {
				var v = data[i];
				count1 = count1 + 1;
				kony.sync.jsonWriteValue(v);
				if ((count1 !== len)) {
					js = js + ",";
				}
			}
		}
        kony.sync.jsonEndArray();
    } else {
        kony.sync.jsonBeginHash();
        len = kony.sync.jsonwriter_pairs_length(data);
        var count2 = 0;
        for (var key in data) {
            var value = data[key];
            count2 = count2 + 1;
            kony.sync.jsonWriteKeyValue(key, value);
            if ((count2 !== len)) {
                js = js + ",";
            }
        }
        kony.sync.jsonEndHash();
    }
};

kony.sync.jsonBegin = function() {
	sync.log.trace("Entering kony.sync.jsonBegin ");
    js = "{";
};

kony.sync.jsonEnd = function() {
	sync.log.trace("Entering kony.sync.jsonEnd ");
    js = js + " }";
};

kony.sync.jsonBeginElement = function(elementName) {
	sync.log.trace("Entering kony.sync.jsonBeginElement ");
    js = js + "\"" + elementName + "\"" + " : ";
};

kony.sync.jsonBeginArray = function() {
	sync.log.trace("Entering kony.sync.jsonBeginArray ");
    js = js + " \[";
};

kony.sync.jsonEndArray = function() {
	sync.log.trace("Entering kony.sync.jsonEndArray ");
    js = js + " \]";
};

kony.sync.jsonBeginHash = function() {
	sync.log.trace("Entering kony.sync.jsonBeginHash ");
    js = js + " \{";
};

kony.sync.jsonEndHash = function() {
	sync.log.trace("Entering kony.sync.jsonEndHash ");
    js = js + " \}";
};

kony.sync.jsonAddValue = function(key, value) {
	sync.log.trace("Entering kony.sync.jsonAddValue ");
    js = js + " \"" + key + "\" : " + "\"" + value + "\"";
};

kony.sync.jsonString = function(value) {
	sync.log.trace("Entering kony.sync.jsonString ");
    if ((value === "null")) {
        js = js + "null";
    } else {
        js = js + "\"" + value + "\"";
    }
};

kony.sync.jsonwriter_pairs_length = function(tab) {
	sync.log.trace("Entering kony.sync.jsonwriter_pairs_length ");
    var count = 0;
    if (!kony.sync.isNullOrUndefined(tab)) {
        for (var key in tab) {
            count = count + 1;
        }
    }
    return count;
};

kony.sync.jsonwriter_ipairs_length = function(tab) {
	sync.log.trace("Entering kony.sync.jsonwriter_ipairs_length ");
    var count = 0;
    if(!kony.sync.isNullOrUndefined(tab)){
        for (var key = 0; key < tab.length; key++) {
            count = count + 1;
        }
    }
    return count;
};
*/
//  **************** End jsonWriter.js*******************


//  **************** Start KonySyncAPI.js*******************
if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}

if(typeof(sync)=== "undefined"){
	sync = {};
}

// Device Auto Registration and Validation Starts here --
sync.startSession = function(config) {
	if(kony.sync.validateSyncConfigParams("startSession", config) === false){
		return;
	}
	if(kony.sync.preProcessSyncConfig("startSession", config, config[kony.sync.onSyncError]) === false){
		return;
	}
	kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncStart], kony.sync.currentSyncReturnParams);
	var registerSuccess = true;
	var alreadyRegistered = false;
	var isError = false;
	function single_transaction_callback(tx) {
		sync.log.trace("Entering single_transaction_callback");
		var query = kony.sync.qb_createQuery();
        kony.sync.qb_select(query, [kony.sync.syncConfigurationColumnDeviceIDName]);
        kony.sync.qb_from(query, kony.sync.syncConfigurationTableName);
        var query_compile = kony.sync.qb_compile(query);
        var sql = query_compile[0];
        var params = query_compile[1];
        var resultSet = kony.sync.executeSql(tx, sql, params,kony.sync.currentSyncConfigParams[kony.sync.onSyncError]);
		if(resultSet === false){
			registerSuccess = false;
			isError = true;
			return;
		}
		if(resultSet.rows.length === 0){
			isError = true;
			return;
		}
        var record = kony.db.sqlResultsetRowItem(tx, resultSet, 0);
		sync.log.debug("Device Record: ", record);
        sync.log.debug("Device ID: ", record.DeviceID);
        if (record.DeviceID !== kony.sync.getDeviceID()) {
			kony.sync.konyRegisterDevice(registerDeviceCallback);
			sync.log.info("Registering Device...");
        }
		else {
			alreadyRegistered = true;
			sync.log.info("Device already registered");
		}		
    }
	
	function registerDeviceCallback(serverResponse) {
		sync.log.trace("Entering registerDeviceCallback");
		if (!kony.sync.isNullOrUndefined(serverResponse.opstatus) && serverResponse.opstatus !== 0) {
			if (!kony.sync.isNullOrUndefined(serverResponse.d)) {
				sync.log.error("Register Device Response : ", serverResponse); 
				kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError], kony.sync.getServerError(
				serverResponse.d));
				kony.sync.isSessionInProgress = false;
			} else {
				sync.log.error("Register Device Response : ", serverResponse); 
				kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError], kony.sync.getServerError(serverResponse) );
				kony.sync.isSessionInProgress = false;
			}
			registerSuccess = false;
			return;
		}
		else if(kony.sync.isNullOrUndefined(serverResponse.d)){
			registerSuccess = false;
			kony.sync.isSessionInProgress = false;
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError], kony.sync.getServerError(serverResponse) );
			return;
		}
		if ((serverResponse.d.error === "true")) { 
			sync.log.error("Register Device Response : ", serverResponse); 
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError], kony.sync.getServerError(
			serverResponse.d));
			kony.sync.isSessionInProgress = false;
			registerSuccess = false;

			return;
		} 
		
		sync.log.debug("Register Device Response : ", serverResponse);
		var connection2 = kony.sync.getConnectionOnly(kony.sync.syncConfigurationDBName,kony.sync.syncConfigurationDBName, kony.sync.currentSyncConfigParams[kony.sync.onSyncError], "Load device id");
		if(connection2 !== null){
			kony.sync.startTransaction(connection2, single_device_register_callback, single_transaction_success_callback, single_transaction_error_callback, "Load device id");
		}
		function single_device_register_callback(tx) {
			sync.log.trace("Entering single_device_register_callback");
			kony.sync.instanceId = serverResponse.d.__registerdevice.instanceID;
			var insertTab = {};

			insertTab[kony.sync.syncConfigurationColumnInstanceIDName] = kony.sync.instanceId;
			insertTab[kony.sync.syncConfigurationColumnDeviceIDName] = kony.sync.getDeviceID();
			
			var wcs = {};
			kony.table.insert(wcs, {key: kony.sync.syncConfigurationColumnDeviceIDName, value: ""});
			
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_update(query, kony.sync.syncConfigurationTableName);
			kony.sync.qb_set(query, insertTab);
			kony.sync.qb_where(query, wcs);
			var query_compile = kony.sync.qb_compile(query);
			
			var sql = query_compile[0];
			var params = query_compile[1];
			if(kony.sync.executeSql(tx, sql, params)===false){
				isError = true;
				return;
			}
			alreadyRegistered = true;
			sync.log.info("Register Device success");
		}	
	}

    function single_transaction_error_callback(){
		sync.log.trace("Entering single_transaction_error_callback");
        sync.log.error("Register Device failed");
        //kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError], kony.sync.getSyncRegisterationFailed());
		kony.sync.isSessionInProgress = false;
		kony.sync.callTransactionError(isError, kony.sync.currentSyncConfigParams[kony.sync.onSyncError]);
	}
	
    function single_transaction_success_callback() {
		sync.log.trace("Entering single_transaction_success_callback");
        if(registerSuccess && alreadyRegistered && !isError) {
			//Check if schema upgrade is pending
			if(kony.sync.schemaUpgradeNeeded){
				kony.sync.upgradeSchema(kony.sync.syncStartSession);
			}
			else{
				kony.sync.isDownloadPendingForSchemaUpgrade(isDownloadPendingForSchemaUpgradeCallback);
			}
		}else if(isError){
			sync.log.fatal("SynConfigTable is empty. There seems to be problem in sync.init");
			kony.sync.getErrorTable(kony.sync.errorCodeMetatableError, kony.sync.getErrorMessage(kony.sync.errorCodeMetatableError), null);
		}
    }
	
	function isDownloadPendingForSchemaUpgradeCallback(isError, errorObject, pending){
		if(isError){
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError], errorObject);
		}else{
			if(pending){
				kony.sync.omitUpload = true; //only download
				kony.sync.schemaUpgradeDownloadPending = true;
			}
			kony.sync.syncStartSession();
		}
	}
	var connection = kony.sync.getConnectionOnly(kony.sync.syncConfigurationDBName,kony.sync.syncConfigurationDBName, kony.sync.currentSyncConfigParams[kony.sync.onSyncError], "Device Registration");
	if(connection !==null){
		kony.sync.startTransaction(connection, single_transaction_callback, single_transaction_success_callback, single_transaction_error_callback, "Device Registration");
	}
};

kony.sync.syncStartSession = function(){
	sync.log.trace("Entering kony.sync.syncStartSession ");
	sync.log.info("Calling syncStartSession...");
    kony.sync.isErrorInAnyScope = false;
	kony.sync.syncErrorMessage = {};
	kony.sync.validateScopeSession();
};

kony.sync.validateScopeSession = function(abortSync, syncErrorObject) {
	sync.log.trace("Entering kony.sync.validateScopeSession ");
	
	//If sync is aborted not because of scope issues
	if(abortSync === true){
		sync.log.trace("kony.sync.validateScopeSession->abortSync");
		kony.sync.isSessionInProgress = false;
		kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError], syncErrorObject);
		return;
	}
	
	kony.sync.resetscopesessionglobals(callback);
	function callback(isSyncComplete){
		var isError = false;
		if (isSyncComplete === true) {
			if(kony.sync.forceUpload === true){
				kony.sync.forceUpload = false;
				kony.sync.omitDownload = false;
				kony.sync.validateScopeSession(true, kony.sync.schemaUpgradeErrorObject);
				return;			
			}
			if(kony.sync.forceUploadUpgrade === true){
				kony.sync.forceUploadUpgrade = false;
				kony.sync.omitDownload = false;
				kony.sync.schemaUpgradeErrorObject();
				return;
			}
			if(!kony.sync.isErrorInAnyScope){
				if(!kony.sync.performOnlySchemaUpgrade){
					//Continue upgrade after upload
	/*				if(kony.sync.schemaUpgradeNeeded){
						kony.sync.upgradeSchema(kony.sync.syncStartSession);
						return;
					}*/
					
					//start normal sync process after downloading changes for schema upgrade
					if(kony.sync.schemaUpgradeDownloadPending){	
						kony.sync.schemaUpgradeDownloadPending = false;
						kony.sync.omitUpload = false;
						kony.sync.omitDownload = false;
						kony.sync.resetsyncsessionglobals();
						kony.sync.syncStartSession();
						return;
					}
				}
				kony.sync.omitUpload = false;
				kony.sync.omitDownload = false;			
				kony.sync.isSessionInProgress = false;
				kony.sync.performOnlySchemaUpgrade = false;
				sync.log.trace("kony.sync.validateScopeSession->calling onSyncSuccess function");
				kony.sync.schemaUpgradeDownloadPending = false;
				kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncSuccess], kony.sync.currentSyncReturnParams);
			}
			else{
				sync.log.error("kony.sync.validateScopeSession->calling onSyncError function");
				kony.sync.isSessionInProgress = false;
				kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError],kony.sync.getErrorTable(kony.sync.errorCodeSyncError,kony.sync.getErrorMessage(kony.sync.errorCodeSyncError),kony.sync.syncErrorMessage));
			}
			return;// Sync Completes here.
		}
				
		function validateTransaction(tx) {
			sync.log.trace("Entering kony.sync.validateScopeSession->validateTransaction");
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, kony.sync.metaTableName);
			kony.sync.qb_where(query, [{
				key: kony.sync.metaTableScopeColumn,
				value: kony.sync.currentScope[kony.sync.scopeName]
			}, {
				key: kony.sync.metaTableFilterValue,
				value: "no filter"
			}]);
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var resultSet = kony.sync.executeSql(tx, sql, params);
			if(resultSet === false){
				isError = true;
				return;
			}
			if (resultSet.rows.length !== 1) {
				isError = true; 
				return;
			}
			if(kony.sync.schemaUpgradeDownloadPending){
				//check if download is pending after schema upgrade for this scope
				var rowItem = kony.db.sqlResultsetRowItem(tx, resultSet, 0);
				if(rowItem[kony.sync.metaTableSchemaUpgradeSyncTimeColumn]==="0,0"){
					kony.sync.omitDownload = false; //download for this scope
				}else{
					kony.sync.omitDownload = true; //this scope has already been downloaded
				}
			}
			kony.sync.currentSyncReturnParams.currentScope = kony.sync.currentScope[kony.sync.scopeName];
		}

		function startScopeSession() {
			if(isError === true){
				errorScopeSession();
				return;
			}
			sync.log.trace("Entering kony.sync.validateScopeSession->startScopeSession");
			kony.sync.deleteMapKey(kony.sync.currentSyncReturnParams, kony.sync.serverDetails);
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onScopeStart], kony.sync.currentSyncReturnParams);
			kony.sync.startUpload();
		}

		function errorScopeSession() {
			sync.log.trace("Entering kony.sync.validateScopeSession->errorScopeSession");
			var isbreak = kony.sync.callTransactionError(isError, kony.sync.currentSyncConfigParams[kony.sync.onScopeError]);
			if (isbreak === true) {
				kony.sync.callTransactionError(isError, kony.sync.currentSyncConfigParams[kony.sync.onSyncError]);
				kony.sync.isSessionInProgress = false;
				return;
			}
			kony.sync.validateScopeSession();
		}
		var connection = kony.sync.getConnectionOnly(kony.sync.currentScope[kony.sync.scopeDataSource], kony.sync.currentScope[kony.sync.scopeDataSource], errorScopeSession, "validate scope session");
		if(connection !== null){
			kony.sync.startTransaction(connection, validateTransaction, startScopeSession, errorScopeSession, "validate scope session");
		}
	}
};

kony.sync.startUpload = function() {
	sync.log.trace("Entering kony.sync.startUpload ");
	if(kony.sync.omitUpload){
        kony.sync.uploadCompleted();
		return;
	}
    if (kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks])) {
        kony.sync.syncUploadChanges(kony.sync.currentScope[kony.sync.scopeName], kony.sync.currentScope[kony.sync.scopeDataSource], kony.sync.uploadCompleted);
    } else {
        var scopename = kony.sync.currentScope[kony.sync.scopeName];
        if (kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][scopename] !== null && kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][scopename] !== undefined && kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][scopename][kony.sync.sessionTaskDoUpload]) {
            kony.sync.syncUploadChanges(kony.sync.currentScope[kony.sync.scopeName], kony.sync.currentScope[kony.sync.scopeDataSource], kony.sync.uploadCompleted);
        } else {
            sync.log.info("Skipping Upload for Scope : ", kony.sync.currentScope[kony.sync.scopeName]);
            kony.sync.uploadCompleted();
        }
    }
};

kony.sync.uploadCompleted = function(error, msg) {
	sync.log.trace("Entering kony.sync.uploadCompleted ");
	if(error===true){
		sync.log.error("Error Occurred during upload : ",msg);
		
		//if schema change error occurred - app is not latest one
		if(msg.errorCode === kony.sync.servercodes.appVersionNotLatest){ 
			kony.sync.onSchemaUpgradeErrorFromServer(msg);			
			return;
		}
		
		kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onScopeError], msg);
		kony.sync.isErrorInAnyScope = true;
		kony.sync.syncErrorMessage[kony.sync.currentScope[kony.sync.scopeName]] = msg;
		kony.sync.validateScopeSession();
	}else{
		if(kony.sync.omitDownload){ //In case download is force disabled
			kony.sync.validateScopeSession();
			return;
		}
		if(kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks]) || kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][kony.sync.currentScope[kony.sync.scopeName]])) {
			kony.sync.syncDownloadChanges(kony.sync.currentScope[kony.sync.scopeName], kony.sync.currentScope[kony.sync.scopeDataSource], kony.sync.downloadCompletedCallback);
		} else {
			if (kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][kony.sync.currentScope[kony.sync.scopeName]][kony.sync.sessionTaskDoDownload]) {
				kony.sync.syncDownloadChanges(kony.sync.currentScope[kony.sync.scopeName], kony.sync.currentScope[kony.sync.scopeDataSource], kony.sync.downloadCompletedCallback);
			} else {
				sync.log.info("Skipping Download for Scope : ", kony.sync.currentScope[kony.sync.scopeName]);
				kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onScopeSuccess], kony.sync.currentSyncReturnParams);
				//In case of OTA scope and dodownload is false, the records for corresponding ack's will be deleted
				/*if (kony.sync.currentScope[kony.sync.syncStrategy] === kony.sync.syncStrategy_OTA){
					kony.sync.deleteRecordsAfterUpload(deleteRecordsAfterUploadCallback);
				}*/
				if (kony.sync.isUploadErrorPolicyCOE(kony.sync.currentScope)) {
					if(kony.sync.currentScope[kony.sync.syncStrategy] !== kony.sync.syncStrategy_OTA ) {
						deleteRecordsAfterUploadCallback(0);
					} else {
						kony.sync.updateSyncOrderForScope(deleteRecordsAfterUploadCallback);
					}
				}
				else{
					kony.sync.validateScopeSession();
				}
				
			}
		}
	}
	
	function deleteRecordsAfterUploadCallback(code){
		sync.log.trace("Entering deleteRecordsAfterUploadCallback");
		if(code!==0){
			kony.sync.isErrorInAnyScope = true;
			var errObject = null;
			
			//statement error
			if(code===kony.sync.errorCodeSQLStatement){
				errObject = kony.sync.errorObject;
			}
			//transaction error
			else{
				errObject = kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null);
			}
			kony.sync.syncErrorMessage[kony.sync.currentScope[kony.sync.scopeName]] = errObject;
			sync.log.error("Error occurred in Deleting Records After Upload : ", errObject); 
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onScopeError], errObject);
		}
		kony.sync.validateScopeSession();
	}
    
};

kony.sync.downloadCompletedCallback = function(error, msg) {
	sync.log.trace("Entering kony.sync.downloadCompletedCallback ");
	if(error){
		sync.log.error("Error occurred during download : ", msg); 
		
		//if schema change error occurred - app is not latest one
		if(msg.errorCode === kony.sync.servercodes.appVersionNotLatest){ 
			kony.sync.onSchemaUpgradeErrorFromServer(msg);			
			return;
		}
		
		
		kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onScopeError], msg);
		kony.sync.isErrorInAnyScope = true;
		kony.sync.syncErrorMessage[kony.sync.currentScope[kony.sync.scopeName]] = msg;
	}
	else{
		kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onScopeSuccess], kony.sync.currentSyncReturnParams);
	}
	kony.sync.validateScopeSession();
};

kony.sync.validateSyncConfigParams = function(opName, config){
	if(kony.sync.isNullOrUndefined(config)){
		kony.sync.alert("Argument type mismatch found for operation:sync." + opName + ". Expected 'config object' Actual 'null or undefined'");
		return false;
	}
	if(typeof(config) !== "object"){
		kony.sync.alert("Argument type mismatch found for operation:sync." + opName + ".  Expected 'config object' Actual '" + typeof(config) + "'");
		return false;
	}
	kony.sync.resetSessionVars();
};

kony.sync.preProcessSyncConfig = function(opName, config, errorcallback, sessionRequired){
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return false;
	}
	if(!kony.sync.scopenameExist(config,errorcallback)){
		return false;
	}
	kony.sync.syncConfigurationDBName = konysyncClientSyncConfig.AppID;
    config.appVersion = kony.sync.configVersion;//konysyncClientSyncConfig.Version;
    kony.sync.currentSyncConfigParams = config;
	kony.sync.uploadClientContext = {};
	kony.sync.downloadClientContext = {};
	if(sessionRequired!==false){
		if (kony.sync.isSessionInProgress) {
			sync.log.warn("Sync Session already in progress...");
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeSessionInProgress,kony.sync.getErrorMessage(kony.sync.errorCodeSessionInProgress),null));
			return false;
		}
		kony.sync.isSessionInProgress = true;
	}
	sync.log.debug("Starting sync." + opName + " with Current Config Params : ", config);
	
	kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey] = kony.sync.tonumber(kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey]);
    kony.sync.currentSyncConfigParams[kony.sync.maxParallelChunksKey] = kony.sync.tonumber(kony.sync.currentSyncConfigParams[kony.sync.maxParallelChunksKey]);
	kony.sync.resetsyncsessionglobals(opName);
};

kony.sync.scopenameExist = function(config,errorcallback){
	sync.log.trace("Entering kony.sync.scopenameExist");
	if(!kony.sync.isNullOrUndefined(config[kony.sync.sessionTasks])){
		for(var key in config[kony.sync.sessionTasks]){
			if(kony.sync.isNullOrUndefined(kony.sync.scopeDict[key])){
				sync.log.error("Wrong scopename given in SessionTasks");
				kony.sync.alert("Wrong scopename given in SessionTasks");
				kony.sync.verifyAndCallClosure(errorcallback, {});
				return false;
			}
		}	
	}
	if(!kony.sync.isNullOrUndefined(config[kony.sync.removeAfterUpload])){
		for(var key in config[kony.sync.removeAfterUpload]){
			if(kony.sync.isNullOrUndefined(kony.sync.scopeDict[key])){
				sync.log.error("Wrong scopename given in RemoveAfterUpload");
				kony.sync.alert("Wrong scopename given in RemoveAfterUpload");
				kony.sync.verifyAndCallClosure(errorcallback, {});
				return false;
			}
		}	
	}
	return true;
};

sync.stopSession = function(callback){
	sync.log.trace("Entering sync.stop");
	kony.sync.isSessionInProgress = false;
	kony.sync.isSyncStopped = true;
	kony.sync.onSyncStop = callback;
};

kony.sync.stopSyncSession = function(){
	kony.sync.isSyncStopped = false;
	kony.sync.verifyAndCallClosure(kony.sync.onSyncStop);
};
//  **************** End KonySyncAPI.js*******************


//  **************** Start KonySyncBlobConstants.js*******************
/**
 * Created by KH9093 on 21-09-2015.
 */

if (typeof(kony.sync) === "undefined") {
    kony.sync = {};
}
if (typeof(sync) === "undefined") {
    sync = {};
}

if(typeof(kony.sync.blobManager) === "undefined") {
    kony.sync.blobManager = {};
};

kony.sync.BlobType = {
    BASE64 : 1,
    FILE: 2
};



//defining states for blob manager.
kony.sync.blobManager.INSERT_PROCESSING = 1;
kony.sync.blobManager.INSERT_FAILED = 2;
kony.sync.blobManager.UPDATE_PROCESSING = 11;
kony.sync.blobManager.UPDATE_FAILED = 12;
kony.sync.blobManager.DELETE_PROCESSING = 21;
kony.sync.blobManager.DELETE_FAILED = 22;
kony.sync.blobManager.FILE_DOESNOT_EXIST = 31;
kony.sync.blobManager.DOWNLOAD_ACCEPTED= 61;
kony.sync.blobManager.DOWNLOAD_FAILED = 63;
kony.sync.blobManager.DOWNLOAD_IN_PROGRESS = 64;
kony.sync.blobManager.NO_OPERATION = 50;

kony.sync.blobManager.ONDEMAND_FETCH_LIMIT = 1;
kony.sync.blobManager.ONDEMAND_FETCH_OFFSET = 0;

//defining state messages..

kony.sync.blobManager.states = {};

kony.sync.blobManager.states[kony.sync.blobManager.INSERT_PROCESSING] = "Insert Operation in Process";
kony.sync.blobManager.states[kony.sync.blobManager.INSERT_FAILED] = "Insert Operation Failed";
kony.sync.blobManager.states[kony.sync.blobManager.UPDATE_PROCESSING] = "Update Operation in Process";
kony.sync.blobManager.states[kony.sync.blobManager.UPDATE_FAILED] = "Update Operation Failed";
kony.sync.blobManager.states[kony.sync.blobManager.DELETE_PROCESSING] = "Delete Operation in Process";
kony.sync.blobManager.states[kony.sync.blobManager.DELETE_FAILED] = "Delete Operation Failed";
kony.sync.blobManager.states[kony.sync.blobManager.FILE_DOESNOT_EXIST] = "Blob File doesn't exist.";
kony.sync.blobManager.states[kony.sync.blobManager.DOWNLOAD_ACCEPTED] = "Download request added to the queue";
kony.sync.blobManager.states[kony.sync.blobManager.DOWNLOAD_FAILED] = "Download Operation Failed";
kony.sync.blobManager.states[kony.sync.blobManager.DOWNLOAD_IN_PROGRESS] = "Download Operation in Process";
kony.sync.blobManager.states[kony.sync.blobManager.NO_OPERATION] = "Blob record available";
//  **************** End KonySyncBlobConstants.js*******************


//  **************** Start KonySyncBlobStoreManager.js*******************
//  **************** Start BlobStoreManager.js*******************
if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}
if(typeof(sync) === "undefined") {
	sync = {};
}
if(typeof(kony.sync.blobManager) === "undefined") {
	kony.sync.blobManager = {};
}
/*columns of the BlobStoreManager table are ---
 id, localPath, type, state, status, size, lastUpdatedTimeStamp
 */


kony.sync.blobManager.tableName = "tableName";
kony.sync.blobManager.columnName = "columnName";
kony.sync.blobManager.localPath = "localPath";
kony.sync.blobManager.id = "id";
kony.sync.blobManager.type = "type";
kony.sync.blobManager.state = "state";
kony.sync.blobManager.status = "status";
kony.sync.blobManager.size = "size";
kony.sync.blobManager.lastUpdatedTimeStamp = "lastUpdatedTimeStamp";


var dbname = kony.sync.syncConfigurationDBName;
var tbname = "konysyncBLOBSTOREMANAGER";
var resultset = null;

/**
 * Method used to update the blob store manager record for given blobid.
 * @param tx - transaction id
 * @param blobid - id of the blob store manager row.
 * @param valuesTable - values that are updated in the record.
 * @param errorCallback - error callback in case of failures.
 * @returns {*}
 */
kony.sync.blobManager.updateBlobManager = function(tx, blobid, valuesTable, errorCallback){
	var query = kony.sync.qb_createQuery();

	kony.sync.qb_set(query, valuesTable);
	kony.sync.qb_where(query, [
		{
			key : kony.sync.blobManager.id,
			value : blobid
		}
	]);

	kony.sync.qb_update(query, kony.sync.blobStoreManagerTable);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	resultset = kony.sync.executeSql(tx, sql, params, errorCallback);

	return resultset;
};

/**
 * This method is used to insert a base64 in the konysyncBLOBSTOREMANAGER table.
 * @param base64 the base64 value which has to be inserted in the blob store
 */

kony.sync.blobManager.saveBlob = function(tx, tableName, columnName, base64, error_callback) {

	if(!kony.sync.isNullOrUndefined(base64) && base64.trim().length > 0) {
		var query = kony.sync.qb_createQuery();

		kony.sync.qb_set(query, {
			localPath: "",
			size: base64.length,
			status: 100,
			state: kony.sync.blobManager.INSERT_PROCESSING,
			type: "base64",
			tableName : tableName,
			columnName : columnName,
			lastUpdatedTimeStamp: 'now()'
		});

		kony.sync.qb_insert(query, kony.sync.blobStoreManagerTable);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		resultset = kony.sync.executeSql(tx, sql, params, error_callback);

		if (resultset === null || resultset === false)
			return null;

		var blobId = resultset.insertId;

		var blobFileName = sync.util.savefile("" + blobId, base64);
		kony.print("blob file is " + blobFileName);
		//if file creation is successful.. insert the file path to the blobstoremanager.
		var valuesTable = {};

		if (blobFileName) {
			//TODO - update the progress information.
			valuesTable[kony.sync.blobManager.localPath] = blobFileName;
			valuesTable[kony.sync.blobManager.state] = kony.sync.blobManager.NO_OPERATION;
			valuesTable[kony.sync.blobManager.status] = 100;

			kony.sync.blobManager.updateBlobManager(tx, blobId, valuesTable, error_callback);

		} else {
			valuesTable[kony.sync.blobManager.state] = kony.sync.blobManager.INSERT_FAILED;
			valuesTable[kony.sync.blobManager.status] = 0;
			kony.sync.blobManager.updateBlobManager(tx, blobId, valuesTable, error_callback);

			var error = kony.sync.getErrorTable(
				kony.sync.errorCodeBlobFileNotCreated,
				kony.sync.getErrorMessage(kony.sync.errorCodeBlobFileNotCreated)
			);

			error_callback(error);
			return;
		}

		return blobId;
	} else {
		var error = kony.sync.getErrorTable(
			kony.sync.errorCodeEmptyOrNullBase64,
			kony.sync.getErrorMessage(kony.sync.errorCodeEmptyOrNullBase64)
		);

		error_callback(error);
		return;
	}

};

/**
 * This method is used to delete records from the konysyncBLOBSTOREMANAGER table.
 * @param id array which contains the list of valid ids whose records has to be deleted
 * @return true if deletion is successful else false
 */

kony.sync.blobManager.deleteBlob = function(tx, blobid, errorCallback) {

	kony.print("deleteBlobFromTable..");
	if (blobid === undefined || typeof(blobid) !== "number") {
		//TODO - error object create.
		var err = {};
		errorCallback(err);
		return;
	} else {
		var blobMeta = kony.sync.blobManager.getBlobMetaDetails(tx, blobid, errorCallback);
		//state, status, localPath
		//delete the record only if it is in valid state.
		var state = null;
		if(!kony.sync.isNullOrUndefined(blobMeta)) {
			state = blobMeta[kony.sync.blobManager.state];
		}
		//TODO - can downloadAccepted be downloaded.
		var possibleStates = [kony.sync.blobManager.INSERT_FAILED, kony.sync.blobManager.DELETE_FAILED, kony.sync.blobManager.FILE_DOESNOT_EXIST,
			kony.sync.blobManager.NO_OPERATION,kony.sync.blobManager.UPDATE_FAILED ,kony.sync.blobManager.DOWNLOAD_FAILED];
		if(!kony.sync.isNullOrUndefined(state) && possibleStates.indexOf(state) !== -1) {
			var valuesTable = {};
			valuesTable[kony.sync.blobManager.state] = kony.sync.blobManager.DELETE_PROCESSING;
			kony.sync.blobManager.updateBlobManager(tx, blobid, valuesTable, errorCallback);

			var deleteFile = sync.util.deletefile(blobMeta[kony.sync.blobManager.localPath]);
			if(deleteFile){
				var query = kony.sync.qb_createQuery();
				kony.sync.qb_delete(query, kony.sync.blobStoreManagerTable);
				var wcs = [{
					key: kony.sync.blobManager.id,
					value: blobid,
					comptype: 'OR'
				}];

				kony.sync.qb_where(query, wcs);

				var query_compile = kony.sync.qb_compile(query);
				var sql = query_compile[0];
				var params = query_compile[1];

				resultset = kony.db.executeSql(tx, sql, params, errorCallback);

				if(resultset === null || resultset === false ){
					valuesTable = {};
					valuesTable[kony.sync.blobManager.state] = kony.sync.blobManager.DELETE_FAILED;
					kony.sync.blobManager.updateBlobManager(tx, blobid, valuesTable, errorCallback)
				}

				return resultset;
			} else{
				valuesTable = {};
				valuesTable[kony.sync.blobManager.state] = kony.sync.blobManager.DELETE_FAILED;
				kony.sync.blobManager.updateBlobManager(tx, blobid, valuesTable, errorCallback);
			}
		} else {
			var error = kony.sync.getErrorTable(
				kony.sync.errorCodeBlobInvalidStateForDelete,
				kony.sync.getErrorMessage(kony.sync.errorCodeBlobInvalidStateForDelete, kony.sync.blobManager.states[state])
			);
			errorCallback(error);

		}
	}
}
/**
 * This method is used to update the binary data referred by id.
 * @param id unique id of the base64 value.
 * @param base64 is the binary value to be updated.
 */
kony.sync.blobManager.updateBlob = function(tx, blobid, base64, errorCallback) {

	if (blobid === undefined || typeof(blobid) !== "number") {
		//TODO - error object create.
		var err = {};
		errorCallback(err);
	} else {
		var blobMeta = kony.sync.blobManager.getBlobMetaDetails(tx, blobid, errorCallback);
		//state, status, localPath
		var state = null;
		if(!kony.sync.isNullOrUndefined(blobMeta)) {
			state = blobMeta[kony.sync.blobManager.state];
		}
		var possibleStates = [kony.sync.blobManager.INSERT_FAILED, kony.sync.blobManager.FILE_DOESNOT_EXIST,
			kony.sync.blobManager.NO_OPERATION, kony.sync.blobManager.UPDATE_FAILED ,kony.sync.blobManager.DOWNLOAD_FAILED,
			kony.sync.blobManager.DOWNLOAD_ACCEPTED, kony.sync.blobManager.DOWNLOAD_IN_PROGRESS];

		if(!kony.sync.isNullOrUndefined(state) && possibleStates.indexOf(state) !== -1) {
			var valuesTable = {};
			valuesTable[kony.sync.blobManager.state] = kony.sync.blobManager.UPDATE_PROCESSING;
			kony.sync.blobManager.updateBlobManager(tx, blobid, valuesTable, errorCallback);

			var isBlobSaved = sync.util.savefile(blobMeta[kony.sync.blobManager.localPath], base64);

			if (isBlobSaved !== null) {
				valuesTable = {};
				valuesTable[kony.sync.blobManager.state] = kony.sync.blobManager.NO_OPERATION;
				kony.sync.blobManager.updateBlobManager(tx, blobid, valuesTable, errorCallback);
				return true;
			} else {
				valuesTable = {};
				valuesTable[kony.sync.blobManager.state] = kony.sync.blobManager.UPDATE_FAILED;
				kony.sync.blobManager.updateBlobManager(tx, blobid, valuesTable, errorCallback);
				return false;
			}
		} else {
			var error = kony.sync.getErrorTable(
				kony.sync.errorCodeBlobInvalidStateForUpdate,
				kony.sync.getErrorMessage(kony.sync.errorCodeBlobInvalidStateForUpdate, kony.sync.blobManager.states[state])
			);
			errorCallback(error);
		}
	}
};

/**
 * This is a utility method used to insert blobvalues to konysyncBLOBSTOREMANAGER and return
 * corresponding blobids
 * @param tx transaction id
 * @param tbname tablename
 * @param values table columns
 * @return object containing columns and their blob indices
 */
kony.sync.blobstore_insert = function(tx, tbname, values, errorCallback) {
	var blobStoreIndices = {};
	if(kony.sync.isNullOrUndefined(kony.sync.scopes.syncScopeBlobInfoMap[tbname])){
		return blobStoreIndices;
	}
	var binaryColumns = kony.sync.scopes.syncScopeBlobInfoMap[tbname][kony.sync.columns];
	var binaryColumnsLength = binaryColumns.length;
	var binaryColumnName = null;
	var blobIndex = null;
	for(var i=0; i<binaryColumnsLength; i++) {
		binaryColumnName = binaryColumns[i];
		if(!kony.sync.isNullOrUndefined(values[binaryColumnName])) {
			blobIndex = kony.sync.blobManager.saveBlob(tx, tbname, binaryColumnName, values[binaryColumnName], errorCallback);
			if(!kony.sync.isNullOrUndefined(blobIndex)) {
				blobStoreIndices[binaryColumnName] = blobIndex;
			}
		}
	}
	kony.print("blobStoreindices "+JSON.stringify(blobStoreIndices));
	return blobStoreIndices;
};

/**
 * This is a utility method used to update blobvalues to konysyncBLOBSTOREMANAGER and return
 * corresponding blobids
 * @param tx - transaction id
 * @param tbname - tablename
 * @param values - table columns
 * @param wc - whereclause
 * @param isBatch - indicates whether utility function is used for batch or not
 * @return object containing columns and their blob indices
 */
kony.sync.blobstore_update = function(tx, tbname, values, wc, isBatch) {
	var blobStoreIndices = {};
	if(kony.sync.isNullOrUndefined(kony.sync.scopes.syncScopeBlobInfoMap[tbname])){
		return blobStoreIndices;
	}
	var binaryColumns = kony.sync.scopes.syncScopeBlobInfoMap[tbname][kony.sync.columns];
	var binaryColumnsLength = binaryColumns.length;
	var binaryColumnName = null;
	var blobIndex = null;
	var konysyncBinaryColumn = null;
	var query = null;
	var query_compile = null;
	var sql = null;
	var params = null;
	var resultset = null;
	for(var i=0; i < binaryColumnsLength; i++) {
		binaryColumnName = binaryColumns[i];
		konysyncBinaryColumn = kony.sync.binaryMetaColumnPrefix + binaryColumnName;
		if(!kony.sync.isNullOrUndefined(values[binaryColumnName])) {
			query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, [konysyncBinaryColumn]);
			kony.sync.qb_from(query, tbname);
			if(isBatch === true) {
				query_compile = kony.sync.qb_compile(query);
				sql = query_compile[0] + " " + wc;
			}
			else {
				kony.sync.qb_where(query, wc);
				query_compile = kony.sync.qb_compile(query);
				sql = query_compile[0];
			}
			params = query_compile[1];
			resultset = kony.sync.executeSql(tx, sql, params);
			if(resultset !== false && resultset.rows.length > 0) {
				var rowItem = kony.db.sqlResultsetRowItem(tx, resultset, 0);
				if (!kony.sync.isNullOrUndefined(rowItem[konysyncBinaryColumn])) {
					blobIndex = rowItem[konysyncBinaryColumn];
					var results = kony.sync.blobManager.updateBlob(tx, blobIndex, values[binaryColumnName],
						function (err) {
							kony.print("error in updateBlob " + JSON.stringify(err));
						});
					if(!results) {
						return;
					}
					blobStoreIndices[binaryColumnName] = blobIndex;
				}
			}
		}
	}
	return blobStoreIndices;
};

/**
 * This is a utility method used to delete blob from konysyncBLOBSTOREMANAGER
 * @param tx transaction id
 * @param tbname tablename
 * @param isBatch indicates whether utility function is used for batch or not
 * @return
 */
kony.sync.blobstore_delete = function(tx, tbname, wc, isBatch) {
	if(kony.sync.isNullOrUndefined(kony.sync.scopes.syncScopeBlobInfoMap[tbname])){
		return;
	}
	var binaryColumns = kony.sync.scopes.syncScopeBlobInfoMap[tbname][kony.sync.columns];
	var isDeleteSuccessful = true;
	var query_compile = null;
	var sql = null;
	var params = null;
	for(var i=0; i<binaryColumns.length; i++) {

		var konysyncBinaryColumn = kony.sync.binaryMetaColumnPrefix + binaryColumns[i];
		var query = kony.sync.qb_createQuery();
		kony.sync.qb_select(query, [konysyncBinaryColumn]);
		kony.sync.qb_from(query, tbname);
		if(isBatch === true) {
			query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0] + " " + wc;
		} else {
			kony.sync.qb_where(query, wc);
			query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
		}
		params = query_compile[1];
		var resultset = kony.sync.executeSql(tx, sql, params);
		if(resultset !== false && resultset.rows.length > 0) {
			var blobIndex = null;
			var rowItem = kony.db.sqlResultsetRowItem(tx, resultset, 0);
			if (!kony.sync.isNullOrUndefined(rowItem[konysyncBinaryColumn])) {
				blobIndex = rowItem[konysyncBinaryColumn];
			}
			if(blobIndex) {
				var results = kony.sync.blobManager.deleteBlob(tx, blobIndex, function (err) {
					kony.print("error in deleteblob " + JSON.stringify(err));
				});
				sync.log.trace("results from deleteBlob " + results);
				if (!results) {
					isDeleteSuccessful = false;
				}
			}
		}
	}
	return isDeleteSuccessful;
};

/**
 * Success callback called after successful completion of download.
 * @param response - contains the response from download manager. (blobid, value file/base64).
 */
kony.sync.blobManager.onDemandUniversalSuccessCallback = function(response) {
	sync.log.trace(" Entered into kony.sync.blobManager.onDemandUniversalSuccessCallback "+JSON.stringify(response));
	if(response.hasOwnProperty("blobid")) {
		var successResponse = {};
		var blobId = parseInt(response.blobid);
		var filePath = response.filePath;

		kony.sync.blobManager.updateStatusAfterDownload(blobId, filePath, true);
		//give the response to the user.
		var blobType = kony.sync.blobManager.getRegisteredBlobType(blobId);
		if (!kony.sync.isNullOrUndefined(blobType)) {

			successResponse.pkTable = kony.sync.blobManager.getRegisteredPkTable(blobId);
			if (blobType === kony.sync.BlobType.FILE)
				successResponse.filePath = response.filePath;
			else {
				var base64String = sync.util.getallbase64([response.filePath]);
				successResponse.base64 = base64String[0];
			}
			var successNotifier = kony.sync.blobManager.getRegisteredSuccessCallback(blobId);
			//clean up binarynotifier map..

			successNotifier(successResponse);
		} else {
			//log download completed..
			sync.log.info("Download completed for blob id " + blobId);
		}
	}
};


/**
 * Failure callback after error in download.
 * @param response - contains the error object and the corresponding blob id.
 */
kony.sync.blobManager.onDemandUniversalErrorCallback = function(response) {
	sync.log.error("universal error callback " + JSON.stringify(response));
	if(response.hasOwnProperty("blobid")) {
		var errorNotifier = kony.sync.blobManager.getRegisteredErrorCallback(response.blobid);
		if (!kony.sync.isNullOrUndefined(errorNotifier)) {
			kony.sync.blobManager.updateStatusAfterDownload(response.blobid, "" ,false);

			errorNotifier(response);
		}
	}
};

/** Method used to register success and error callbacks for given blob download.
 *
 * @param blobid - blobid which is under download
 * @param pks - primary key values which uniquely identify the blob in parent table
 * @param successNotifier - success callback to be called after successful download
 * @param errorNotifier - error callback to be called in case of failure.
 */
kony.sync.blobManager.registerCallbacks = function(blobid, pks, blobType, successNotifier, errorNotifier){
	kony.sync.blobManager.binaryNotifierMap[blobid] = [pks, blobType, successNotifier, errorNotifier];
};

/**
 * Method returns the registered Success callback for the given blobid download request.
 * @param blobid - blobid which is under download.
 * @returns {*}
 */
kony.sync.blobManager.getRegisteredSuccessCallback = function(blobid) {
	if(kony.sync.blobManager.binaryNotifierMap.hasOwnProperty(blobid)) {
		return kony.sync.blobManager.binaryNotifierMap[blobid][2];
	} else {
		return null;
	}
};

/**
 * Method returns the registered error callback for the given blobid download request.
 * @param blobid - blobid which is under download.
 * @returns {*}
 */
kony.sync.blobManager.getRegisteredErrorCallback = function(blobid) {
	if(kony.sync.blobManager.binaryNotifierMap.hasOwnProperty(blobid)) {
		return kony.sync.blobManager.binaryNotifierMap[blobid][3];
	} else {
		return null;
	}
};

/**
 * Method returns the registered pk values for the given blobid download request.
 * @param blobid - blobid which is under download.
 * @returns {*}
 */
kony.sync.blobManager.getRegisteredPkTable = function(blobid) {
	if(kony.sync.blobManager.binaryNotifierMap.hasOwnProperty(blobid)) {
		return kony.sync.blobManager.binaryNotifierMap[blobid][0];
	} else {
		return null;
	}
};

kony.sync.blobManager.getRegisteredBlobType = function(blobid) {
	if(kony.sync.blobManager.binaryNotifierMap.hasOwnProperty(blobid)) {
		return kony.sync.blobManager.binaryNotifierMap[blobid][1];
	} else {
		return null;
	}
};

/**
 * Method used to update status of the blob record to completed after completion of donwload.
 * @param blobid - id for which the status has to be updated.
 * @param success - result of operation (true/ false).
 */
kony.sync.blobManager.updateStatusAfterDownload = function(blobid, filePath, success) {

	function single_transaction_callback(tx) {
		sync.log.trace(" kony.sync.blobManager.updateStatusAfterDownload: single_transaction_callback ", blobid);
		var valuesTable = {};
		if(success) {
			valuesTable[kony.sync.blobManager.state] = kony.sync.blobManager.NO_OPERATION;
			valuesTable[kony.sync.blobManager.status] = 100;
		} else {
			valuesTable[kony.sync.blobManager.state] = kony.sync.blobManager.DOWNLOAD_FAILED;
			valuesTable[kony.sync.blobManager.status] = 0;
		}
		valuesTable[kony.sync.blobManager.localPath] = filePath;

		kony.sync.blobManager.updateBlobManager(tx, blobid, valuesTable);
	}

	function single_transaction_success_callback() {
		sync.log.trace("updateStatusAfterDownload -> transaction success");
	}

	function single_transaction_error_callback() {
		sync.log.trace("updateStatusAfterDownload -> transaction failure");
	}

	var connection = kony.sync.getConnectionOnly(kony.sync.syncConfigurationDBName, kony.sync.syncConfigurationDBName);

	if(connection !== null) {
		kony.sync.startTransaction(connection, single_transaction_callback, single_transaction_success_callback,
			single_transaction_error_callback);
	}
};



/**
 * Method invokes download operation on the given record.
 * Method invokes download operation on the given record.
 * @param tx - transaction id
 * @param tableName - parent table name for the blob reocrd
 * @param columnName - column name of the binary field.
 * @param blobType - download response type . (FILE /BASE64).
 * @param pks - pk table which uniquely identifies the record
 * @param successNotifier - success callback for download request.
 * @param errorNotifier - error callback for download request.
 * @returns {null}
 */
kony.sync.blobManager.triggerDownload = function(tx, tableName, columnName, blobType, pks, successNotifier, errorNotifier) {

	var query = kony.sync.qb_createQuery();
	var state = kony.sync.blobManager.DOWNLOAD_ACCEPTED;

	kony.sync.qb_set(query, {
		localPath: "",
		status: 0,
		state: state,
		type: "base64",
		tableName : tableName,
		columnName : columnName,
		lastUpdatedTimeStamp: 'now()'
	});

	kony.sync.qb_insert(query, kony.sync.blobStoreManagerTable);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	resultset = kony.sync.executeSql(tx, sql, params, errorNotifier);

	if (resultset === null || resultset === false)
		return null;

	var blobId = resultset.insertId;
// {pktable : {key1 : value1,...}, response: filepath / base64}
	kony.sync.blobManager.registerCallbacks(blobId,pks, blobType, successNotifier, errorNotifier);
	query = kony.sync.qb_createQuery();
	kony.sync.qb_update(query, tableName);
    var setClause = {};
    var blobMetaFieldKey = kony.sync.binaryMetaColumnPrefix+columnName;
    setClause[blobMetaFieldKey] = blobId;
    kony.sync.qb_set(query, setClause);
    var wcs = [];
    for (var key in pks) {
        var wc = {};
        wc.key = key;
        wc.value = pks[key];
        wcs.push(wc);
    }
    kony.sync.qb_where(query, wcs);
    query_compile = kony.sync.qb_compile(query);
    sql = query_compile[0];
    params = query_compile[1];
    resultset = kony.sync.executeSql(tx, sql, params);
    if(resultset === false) {
    	sync.log.error("Error in  kony.sync.blobManager.triggerDownload ");
    }
	sync.util.notifyOnDemandPolling();
};

/**
 * Method retriggers the download (incase of force-download / failed download.)
 * @param tx - transaction id
 * @param blobid - id which uniquely identifies the blob
 * @param blobType - download response type (FILE/ base64).
 * @param pks - pk table which uniquely identifies the record.
 * @param successNotifier - success callback for download request.
 * @param errorNotifier - error callback for download request.
 */
kony.sync.blobManager.retryDownload = function(tx, blobid, blobType, pks, successNotifier, errorNotifier) {
	//reset the state and status to 0% and DOWNLOAD_ACCEPTED

	var state = kony.sync.blobManager.DOWNLOAD_ACCEPTED;

	var valuesTable = {};
	valuesTable[kony.sync.blobManager.state] = state;
	valuesTable[kony.sync.blobManager.status] = 0;

	kony.sync.blobManager.updateBlobManager(tx, blobid, valuesTable, errorNotifier);
	kony.sync.blobManager.registerCallbacks(blobid, pks, blobType, successNotifier, errorNotifier);

	sync.util.notifyOnDemandPolling();

};



kony.sync.blobManager.getBlobInline = function(tx, blobid, blobType, tableName, columnName, config, pks,
												 successNotifier, errorNotifier) {

	var blobMeta = kony.sync.blobManager.getBlobMetaDetails(tx, blobid, errorNotifier);

	if(blobMeta[kony.sync.blobManager.status] === 100 &&
		blobMeta[kony.sync.blobManager.state] === kony.sync.blobManager.NO_OPERATION) {
		//base64 exists. return back the required details.
		var successResponse = {};
		successResponse.pkTable = pks;

		if (blobType === kony.sync.BlobType.FILE) {
			//return blobMeta[kony.sync.blobManager.localPath];
			successResponse.filePath = blobMeta[kony.sync.blobManager.localPath];
			successNotifier(successResponse);

		} else {
			var base64String = sync.util.getallbase64([blobMeta[kony.sync.blobManager.localPath]]);
			if (base64String[0].length > 0) {
				successResponse.base64 = base64String[0];
				successNotifier(successResponse);
			} else {
				//update the state of the file stating the file doesn't exist.
				var valuesTable = {};
				valuesTable.state = kony.sync.blobManager.FILE_DOESNOT_EXIST;

				kony.sync.blobManager.updateBlobManager(tx, blobid, valuesTable, errorNotifier);

				//throw an error saying file doesn't exist.
				var error = kony.sync.getErrorTable(
					kony.sync.errorCodeBlobFileDoesnotExist,
					kony.sync.getErrorMessage(kony.sync.errorCodeBlobFileDoesnotExist)
				);

				errorNotifier(error);
			}
		}
	} else {
		//invalid state..
		//TODO - what should be done. - clean up?
		var error = kony.sync.getErrorTable(
			kony.sync.errorCodeBlobInvalidState,
			kony.sync.getErrorMessage(kony.sync.errorCodeBlobInvalidState)
		);

		errorNotifier(error);

	}
};
/**
 * Method called when download request is invoked.
 * @param tx - transaction id
 * @param blobid - id of the blob store manager record.
 * @param blobType - response type (FILE /  BASE64).
 * @param tableName - name of the parent table.
 * @param columnName - binary column to which the record refers to.
 * @param config - configuration parameters for download ( forceDownload).
 * @param pks - pk table that uniquely identies the record in parent table.
 * @param successNotifier - success callback for fetch
 * @param errorNotifier - error callback for fetch,
 * @returns {*}
 */
kony.sync.blobManager.getBlobOnDemand = function(tx, blobid, blobType, tableName, columnName, config, pks,
												 successNotifier, errorNotifier) {
	//no blob id. trigger download
	if(kony.sync.isNullOrUndefined(blobid)) {
		kony.sync.blobManager.triggerDownload(tx, tableName, columnName,blobType, pks ,successNotifier, errorNotifier);
	} else {
		//check if the file is available.
		var blobMeta = kony.sync.blobManager.getBlobMetaDetails(tx, blobid, errorNotifier);

		if(blobMeta.hasOwnProperty(kony.sync.blobManager.state) &&
			blobMeta.hasOwnProperty(kony.sync.blobManager.status)) {
			var forceDownload = false;

			if(!kony.sync.isNullOrUndefined(config) && config.hasOwnProperty('forceDownload'))  {
				forceDownload = config.forceDownload;
			}
			//if state is No_operation and status is 100, file exists. read it and return.
			if(blobMeta[kony.sync.blobManager.status] === 100 &&
				blobMeta[kony.sync.blobManager.state] === kony.sync.blobManager.NO_OPERATION) {
				//base64 exists. return back the required details.
				if(!forceDownload) {
					var successResponse = {};
					successResponse.pkTable = pks;
					if (blobType === kony.sync.BlobType.FILE) {
						//return blobMeta[kony.sync.blobManager.localPath];

						successResponse.filePath = blobMeta[kony.sync.blobManager.localPath];
						successNotifier(successResponse);
						return;
					} else {
						var base64String = sync.util.getallbase64([blobMeta[kony.sync.blobManager.localPath]])
						if (base64String[0].length > 0) {
							successResponse.base64 = base64String[0];
							successNotifier(successResponse);
							return;
						} else {
							var valuesTable = {};
							valuesTable.state = kony.sync.blobManager.FILE_DOESNOT_EXIST;

							kony.sync.blobManager.updateBlobManager(tx, blobid, valuesTable, errorNotifier);

							//throw an error saying file doesn't exist.
							var error = kony.sync.getErrorTable(
								kony.sync.errorCodeBlobFileDoesnotExist,
								kony.sync.getErrorMessage(kony.sync.errorCodeBlobFileDoesnotExist)
							);

							errorNotifier(error);
							return;
						}
					}
				} else {
					//retrigger download..
					kony.sync.blobManager.retryDownload(tx, blobid, blobType, pks, successNotifier, errorNotifier);
				}
			}
			//if already download requested on that record, throw an error..
			else if(blobMeta[kony.sync.blobManager.state] === kony.sync.blobManager.DOWNLOAD_ACCEPTED ||
				blobMeta[kony.sync.blobManager.state] === kony.sync.blobManager.DOWNLOAD_IN_PROGRESS) {
				//throw an error download already requested...
				var error = kony.sync.getErrorTable(
					kony.sync.errorCodeDownloadAlreadyInQueue,
					kony.sync.getErrorMessage(kony.sync.errorCodeDownloadAlreadyInQueue)
				);
				errorNotifier(error);
				return;

			} else {
				//retriger download
				kony.sync.blobManager.retryDownload(tx, blobid, blobType, pks,  successNotifier, errorNotifier);
			}
		}
	}
};

/**
 * Method used to read meta info about the record in blobstore manager.
 * @param tx - transaction id.
 * @param blobid - id of the record in blob store manager.
 * @param errorCallback - error callback for unsuccesful transactions.
 * @returns {{}} JSON object with state and status information.
 */
kony.sync.blobManager.getBlobMetaDetails = function(tx, blobid, errorCallback) {
	var wcs = [{
		key : "id",
		value : blobid
	}];

	var query = kony.sync.qb_createQuery();
	kony.sync.qb_from(query, kony.sync.blobStoreManagerTable);

	kony.sync.qb_where(query, wcs);
	kony.sync.qb_select(query, [kony.sync.blobManager.state, kony.sync.blobManager.status,
		kony.sync.blobManager.localPath]);

	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	var response = {};

	resultset = kony.db.executeSql(tx, sql, params, function(err) {
		kony.print("err in fetch " + JSON.stringify(err));
		errorCallback(err);
	});

	if(resultset !== null && resultset !== false) {
		var rowItem = kony.db.sqlResultsetRowItem(tx, resultset, 0);
		response.state = rowItem[kony.sync.blobManager.state];
		response.status = rowItem[kony.sync.blobManager.status];
		response.localPath = rowItem[kony.sync.blobManager.localPath];
	}
	return response;
};

/**
 * This method is used to get the fetch the rows from blob tables and populate the ondemand download request
 * @return
 */
kony.sync.blobManager.getNextOnDemandJob = function(){
	var successcallback = sync.util.processjobs;
	var errorcallback = function(err) {
		kony.print("error callback in getNextOnDemandJob "+JSON.stringify(err));
	}
	sync.log.trace("Entering kony.sync.blobManager.getNextOnDemandJob ");

	var payloadList = [];

	var isError = false;
	var errorInfo = {};

	function single_transaction_success_callback() {
		if(isError) {
			kony.sync.verifyAndCallClosure(errorcallback, errorInfo);
			return;
		}
		sync.log.trace("Entering kony.sync.blobManager.getNextOnDemandJob->single_select_transaction_success");

		if (!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams) && !kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.authTokenKey])) {
			if (!kony.sync.isMbaasEnabled) {
				kony.sync.isMbaasEnabled = true;
			}
			kony.sdk.claimsRefresh(claimsRefreshSuccessCallBack, claimsRefreshFailureCallBack);
		} else {
			kony.sync.verifyAndCallClosure(successcallback, payloadList);
		}
	}

	function claimsRefreshSuccessCallBack() {
		var currentClaimToken = kony.sdk.getCurrentInstance().currentClaimToken;
		if (kony.sync.currentSyncConfigParams[kony.sync.authTokenKey] != currentClaimToken) {
			kony.sync.currentSyncConfigParams[kony.sync.authTokenKey] = currentClaimToken;
		}
		var payloadListSize = payloadList.length;
		var payload = null;
		for(var i=0; i<payloadListSize; i++) {
			payload = payloadList[i];
			if(!kony.sync.isNullOrUndefined(payload) && !kony.sync.isNullOrUndefined(payload.httpheaders)) {
				payload.httpheaders["X-Kony-Authorization"] = currentClaimToken;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, payloadList);
	}

	function claimsRefreshFailureCallBack(res) {
		kony.sync.verifyAndCallClosure(errorcallback, res);
	}

	function single_transaction_error_callback() {
		sync.log.error("Entering kony.sync.blobManager.getNextOnDemandJob->single_select_transaction_failed");
		kony.sync.verifyAndCallClosure(errorcallback);
	}

	function populateOnDemandPayload(tx, rowItemsList) {
		try {
			var rowItemsListLength = rowItemsList.length;
			var binaryMetaColumnName = null;
			var binaryColumnName = null;
			var binaryTableName = null;
			var rowItem = null;
			var query = null;
			var query_compile = null;
			var sql = null;
			var params = null;
			var resultSet = null;
			var resultSetLength = null;
			var whereClause = [];
			var queryOpenBrace = true;
			var blobId = null;
			//Iterating over the rows which have status as 0% and state as DOWNLOAD_ACCEPTED and selecting the binaryrow column which has
			// payload like headers etc etc and inserting into payload list
			for(var j=0; j < rowItemsListLength; j++) {
				rowItem = rowItemsList[j];
				binaryColumnName = rowItem[kony.sync.blobManager.columnName];
				binaryTableName = rowItem[kony.sync.blobManager.tableName];
				query = kony.sync.qb_createQuery();
				var scope = kony.sync.scopes[kony.sync.scopes.syncTableScopeDic[binaryTableName]];
				var columns = kony.sync.createClone( scope.syncTableDic[binaryTableName].Pk_Columns );
				columns.push(binaryColumnName);
				kony.sync.qb_select(query, columns);
				kony.sync.qb_from(query, binaryTableName);
				wcs = [];
				binaryMetaColumnName = kony.sync.binaryMetaColumnPrefix + binaryColumnName;
				blobId = rowItem[kony.sync.blobManager.id];
				kony.table.insert(wcs, {key:binaryMetaColumnName,value:blobId,optype: "EQ"});
				kony.sync.qb_where(query, wcs);
				query_compile = kony.sync.qb_compile(query);
				sql = query_compile[0];
				params = query_compile[1];
				resultSet = kony.sync.executeSql(tx, sql, params);
				if(resultSet === false) {
					isError = true;
					return;
				}
				if(resultSet !== null &&  resultSet.rows.length > 0) {
					resultSetLength = resultSet.rows.length;
					var data = null;
					for(var k=0; k<resultSetLength; k++) {
						data = kony.db.sqlResultsetRowItem(tx, resultSet, k);
						var payload = populateOnDemandParams(tx, binaryTableName, binaryColumnName, data, blobId);
						payloadList.push(payload);
					}
				}
				var mp = {};
				mp["key"] = kony.sync.blobManager.id;
				mp["value"] = rowItem[kony.sync.blobManager.id];
				mp["optype"] = "EQ";
				mp["comptype"] = "OR";
				if(j===0) {
					mp["openbrace"] = true;
				}
				if(j=== (rowItemsListLength-1) ) {
					mp["closebrace"] = true;
				}
				whereClause.push(mp);
			}
			//Update blobstoremanager table with DOWNLOAD_INPROGRESS FOR corresponding ids
			query = kony.sync.qb_createQuery();
			kony.sync.qb_update(query, kony.sync.blobStoreManagerTable);
			var setClause = {};
			setClause[kony.sync.blobManager.state] = kony.sync.blobManager.DOWNLOAD_IN_PROGRESS;
			kony.sync.qb_set(query, setClause);
			kony.sync.qb_where(query, whereClause);
			query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
			params = query_compile[1];
			resultSet = kony.sync.executeSql(tx, sql, params);
			if(resultSet === false) {
				isError = true;
				return;
			}
		}
		catch(err) {
			isError = true;
			errorInfo = err;
		}
	}

	function populateOnDemandParams(tx, tableName, binaryColumnName, data, blobIndex) {
		var job = {};
		var params = {};
		var scopeName = kony.sync.scopes.syncTableScopeDic[tableName];
		params.scopename = scopeName;
		params.blobid = blobIndex;
		params.strategy = kony.sync.scopes[scopeName][kony.sync.syncStrategy];
		params.instanceid = kony.sync.getInstanceID();
		params.clientid = kony.sync.getDeviceID();
		params.appVersion = kony.sync.currentSyncConfigParams.appVersion;
		params.url = kony.sync.getDownloadBinaryURL();
		//This will populate userid, password, appid, sessionid, requestnumber and headers with content-type, authtoken in params.httpheaders
		kony.sync.commonServiceParams(params);
		params.enablebatching = "true";
		/*
		 if (!kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.networkTimeOutKey])) {
		 params.httpconfig = {
		 timeout: kony.sync.currentSyncConfigParams[kony.sync.networkTimeOutKey]
		 };
		 }
		 */
		params.dataMode = "raw";
		params.name = "downloadBianry/PK+EmptyBinaryData";
		if (!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks]) &&
			!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][scopeName])) {
			params[kony.sync.sessionTaskUploadErrorPolicy] = kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][scopeName][kony.sync.sessionTaskUploadErrorPolicy];
		}
		var syncContext = getLastSyncContext(tx, scopeName);
		if(!kony.sync.isNullOrUndefined(syncContext)) {
			var lastsynctime = syncContext[kony.sync.metaTableSyncTimeColumn];
			var upgradeSchemaLastSyncTime = syncContext[kony.sync.metaTableSchemaUpgradeSyncTimeColumn];
			if (kony.sync.schemaUpgradeDownloadPending) {
				params.tickcount = upgradeSchemaLastSyncTime;
				params.uppertickcount = lastsynctime;
				if (!kony.sync.isNullOrUndefined(kony.sync.schemaUpgradeContext)) {
					params.upgradecontext = kony.sync.schemaUpgradeContext;
				}
			} else {
				params.tickcount = lastsynctime;
			}
		}
		params.downloadrequest = getDownloadRequest(tx, syncContext, scopeName, tableName, data);
		job["params"] = params;
		job["httpheaders"] = kony.sync.createClone(params["httpheaders"]);
		job["url"] = kony.sync.getDownloadBinaryURL();
		job["blobid"] = blobIndex;
		job["blobname"]= binaryColumnName;
		delete params["httpheaders"];
		return job;
	}

	function getDownloadRequest(tx, downloadContext, scopename, tableName, binaryColumnData) {
		var resultSet = [];
		var result = {};
		var metaData = {};
		metaData["type"] = tableName;
		result["metadata"] = metaData;
		var scope = kony.sync.scopes[kony.sync.scopes.syncTableScopeDic[tableName]];
		var columns = scope.syncTableDic[tableName].Pk_Columns;
		for(var column in binaryColumnData) {
			result[column] = binaryColumnData[column];
		}
		resultSet.push(result);
		var d = {};
		d["results"] = resultSet;
		d["sync"] = "not implemented";
		d["scopeName"] = scopename;
		d["serverBlob"] = downloadContext[kony.sync.metaTableSyncTimeColumn];
		d["clientid"] = kony.sync.getDeviceID();
		d["moreChangesAvailable"] = false;
		var downloadRequest = {};
		downloadRequest["d"] = d;
		return downloadRequest;
	}

	function getLastSyncContext(tx, scopename) {
		var scope = kony.sync.scopes[scopename];
		var datasource = scope[kony.sync.scopeDataSource];
		var query = kony.sync.qb_createQuery();
		kony.sync.qb_select(query, null);
		kony.sync.qb_from(query, kony.sync.metaTableName);
		kony.sync.qb_where(query, [ { key : kony.sync.metaTableScopeColumn, value : scopename },
			{ key : kony.sync.metaTableFilterValue, value : "no filter"} ]);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		var resultSet = kony.sync.executeSql(tx, sql, params);
		if(resultSet === false) {
			isError = true;
			return;
		}
		var rowItem = null;
		if(resultSet !== null &&  resultSet.rows.length > 0) {
			rowItem = kony.db.sqlResultsetRowItem(tx, resultSet, 0);
		}
		return rowItem;
	}

	function single_transaction_callback(tx) {
		try {
			//Select id, tablename, columnname from blobstoremanager table with status as 0% and state as DOWNLOAD_ACCEPTED
			var query = null;
			var query_compile = null;
			var sql = null;
			var params = null;
			var resultSet = null;
			query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, [kony.sync.blobManager.id, kony.sync.blobManager.tableName, kony.sync.blobManager.columnName]);
			kony.sync.qb_from(query, kony.sync.blobStoreManagerTable);
			var wcs = [];

			kony.table.insert(wcs, {key:kony.sync.blobManager.status,value:0,optype: "EQ", comptype:"AND"});
			kony.table.insert(wcs, {key:kony.sync.blobManager.state,value:kony.sync.blobManager.DOWNLOAD_ACCEPTED,optype:"EQ", comptype:"OR"});
			//TODO: pick latest rows based on timestamp
			kony.sync.qb_where(query, wcs);
			kony.sync.qb_limitOffset(query, kony.sync.blobManager.ONDEMAND_FETCH_LIMIT, kony.sync.blobManager.ONDEMAND_FETCH_OFFSET);
			query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
			params = query_compile[1];
			resultSet = kony.sync.executeSql(tx, sql, params);
			if(resultSet === false) {
				isError = true;
				return;
			}
			var rowItemsList = [];
			var rowItem = null;
			var resultSetLength = null;
			if(resultSet !== null &&  resultSet.rows.length > 0) {
				resultSetLength = resultSet.rows.length;
				for(var i=0; i < resultSetLength; i++) {
					rowItem = kony.db.sqlResultsetRowItem(tx, resultSet, i);
					if(!kony.sync.isNullOrUndefined(rowItem)) {
						rowItemsList.push(rowItem);
					}
				}
				populateOnDemandPayload(tx, rowItemsList);
			}
		}catch(err) {
			sync.log.error("kony.sync.blobManager.getNextOnDemandJob->exception occured "+JSON.stringify(err));
			//errorcallback(err);
			isError = true;
			errorInfo = err;
		}
	}

	var connection = kony.sync.getConnectionOnly(kony.sync.syncConfigurationDBName, kony.sync.syncConfigurationDBName, errorcallback);

	if(connection !== null) {
		kony.sync.startTransaction(connection, single_transaction_callback, single_transaction_success_callback, single_transaction_error_callback);
	}
};
//  **************** End BlobStoreManager.js******************
//  **************** End KonySyncBlobStoreManager.js*******************


//  **************** Start KonySyncBlobUtils.js*******************
if(typeof(kony.sync)=== "undefined"){
    kony.sync = {};
}
if(typeof(sync) === "undefined") {
    sync = {};
}

/**
 * Method returns the download policy of the given column in the table if the type of column is binary
 * else returns null
 * @param tableName - tablename
 * @param columnName - column name
 * @returns {*} -downloadPolicy for binary column, null for non binary columns.
 */
kony.sync.getDownloadPolicy = function(tableName, columnName) {

    var downloadPolicy = null;
    if(!kony.sync.isNullOrUndefined(kony.sync.scopes) && kony.sync.scopes.syncTableScopeDic.hasOwnProperty(tableName)) {
        var scope = kony.sync.scopes[kony.sync.scopes.syncTableScopeDic[tableName]];
        var tableColumns = scope.syncTableDic[tableName].Columns;
        var isColumn = false;
        for (var i = 0; i < tableColumns.length; i++) {
            if (tableColumns[i].Name === columnName && tableColumns[i].type === "binary") {
                isColumn = true;
                if (tableColumns[i].hasOwnProperty("BinaryPolicy")) {
                    downloadPolicy = tableColumns[i].BinaryPolicy;
                } else {
                    downloadPolicy = kony.sync.inline;
                }
                break;
            }
        };
    }
    return downloadPolicy;

};

/**
 * Method checks whether the given column in binary column or not.
 * @param tbname - table to which column belongs to.
 * @param columnName - name of the column
 * @returns {number|Number} - returns -1 if the column is not binary.
 */
kony.sync.isBinaryColumn = function(tbname, columnName) {
    var binaryColumnsOfTable = kony.sync.scopes.syncScopeBlobInfoMap[tbname][kony.sync.columns];

    return binaryColumnsOfTable.indexOf(columnName);
};

/**
 * Method used to find Blobref for the given record.
 * @param tx - transaction id
 * @param sql - sql statement
 * @param params - sql params
 * @param column - column name
 * @param errorNotifier - error callback.
 * @returns {{}} - blobref object containing pk values and blobreference.
 */

kony.sync.getBlobRef = function(tx, tableName, columnName, pks, errorNotifier) {
    var wcs = [];

    for (var key in pks) {
        var wc = {};
        wc.key = key;
        wc.value = pks[key];

        wcs.push(wc);
    }
    var query = kony.sync.qb_createQuery();
    kony.sync.qb_from(query, tableName);
    var blobRefColumn = kony.sync.binaryMetaColumnPrefix + columnName;
    kony.sync.qb_select(query, [blobRefColumn]);
    kony.sync.qb_where(query, wcs);

    var query_compile = kony.sync.qb_compile(query);
    var sql = query_compile[0];
    var params = query_compile[1];

    var blobRef = -1;

    var result = kony.db.executeSql(tx, sql, params, function (err) {
        kony.print("error in transaction call back " + JSON.stringify(err));
        errorNotifier(err);
        return;
    });

    if(result !== null && result !== false) {
        if(result.rows.length > 0) {
            var rowItem = kony.db.sqlResultsetRowItem(tx, result, 0);
            blobRef= rowItem[kony.sync.binaryMetaColumnPrefix+columnName];
        }
    }
    return blobRef;

}

/**
 * Method used to validate pkTable.
 * @param pkColumns - pkColumns related to the table
 * @param pkTable - received pkTable from the user.
 * @returns {*} - updated pkTable after removing non binary keys.
 * returns null incase all the pk keys are not sent.
 */

kony.sync.validatePkTable = function(pkColumns, pkTable) {

    var receivedPkColumns = Object.keys(pkTable);
    //remove non pk columns..
    for(var i = receivedPkColumns.length - 1; i > 0 ; i--) {
        if(pkColumns.indexOf(receivedPkColumns(i)) === -1) {
            delete pkTable[receivedPkColumns[i]];
            receivedPkColumns.splice(i , 1);
        }
    }

    //check if info is received for all pks.
    if(receivedPkColumns.length !== pkColumns.length) {
        //throw an error. info about all pks is mandate.
        return null;
    } else {
        return pkTable;
    }
};
//  **************** End KonySyncBlobUtils.js*******************


//  **************** Start KonySyncChunkingHelper.js*******************
if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}

if(typeof(sync)=== "undefined"){
	sync = {};
}

//Checks whether download response is eligible for chunking or not
kony.sync.eligibleForChunking = function(result){
	sync.log.trace("Entering kony.sync.eligibleForChunking");
	if(!kony.sync.isNull(result.opstatus) && result.opstatus !== 0){
		return false;
	}
	return (!kony.sync.isNull(result.d) && 
		result.d.error === "false" && !kony.sync.isNull(result.d.__sync[kony.sync.payloadIdKey]));
};

//Add chunk info in metatable
kony.sync.startChunking = function(url, serviceParams, result, callback){
	sync.log.trace("Entering kony.sync.startChunking");
	sync.log.info("storing payload info in konysyncchunkmetainfo");
	var isError = false;
	var payloadId = result.d.__sync[kony.sync.payloadIdKey];
	var chunkCount = result.d.__sync[kony.sync.chunkCountKey];
	var hashSum = result.d.__sync[kony.sync.chunkHashSum];
	var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, transactionFailedCallback);
	if(dbconnection!==null){
		kony.db.transaction(dbconnection, transactionCallback, transactionFailedCallback, transactionSuccessCallback);
	}
	
	function transactionCallback(tx){
		sync.log.trace("Entering kony.sync.startChunking->transactionCallback");
		//clear meta data from chunking table
		if(kony.sync.clearChunkMetaData(tx, kony.sync.currentScope[kony.sync.scopeName])===false){
			isError = true;
			return;
		}
		
		//store payload info in konysyncchunkmetainfo
		var values = {};
		values[kony.sync.metaTablePayloadId] = payloadId;
		values[kony.sync.metaTableChunkSize] = kony.sync.getChunkSize();
		values[kony.sync.metaTableChunkAck]  = kony.sync.chunkNotAcknowledged;
		values[kony.sync.metaTableChunkHashSum] = hashSum;
		values[kony.sync.metaTableChunkDiscarded] = kony.sync.chunkNotDiscarded;
		values[kony.sync.metaTableChunkCount] = chunkCount;
		values[kony.sync.metaTableScopeColumn] = kony.sync.currentScope[kony.sync.scopeName];
		
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_set(query, values);
					kony.sync.qb_insert(query, kony.sync.chunkMetaTableName);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		if(kony.sync.executeSql(tx, sql, params)===false){
			isError = true;
		}
	}
	//call callback with framed error
	function transactionFailedCallback(){
		sync.log.trace("Entering kony.sync.startChunking->transactionFailedCallback");
		if(isError){
			sync.log.error("Error occurred while inserting chunk information in metatable");
			callback(kony.sync.frameDownloadError(null, null, 1));
		}
		else{
			var errMsg = "Error occurred while opening transaction to store chunk information in metatable";
			sync.log.error(errMsg);
			callback(kony.sync.frameDownloadError(null, errMsg, 2));
		}
	}
	
	function transactionSuccessCallback(){
		sync.log.trace("Entering kony.sync.startChunking->transactionSuccessCallback");
		kony.sync.downloadChunks(url, serviceParams, payloadId, chunkCount, hashSum, result, false, null, callback);
	}
};

//Starts Chunking
kony.sync.downloadChunks = function(url, serviceParams, payloadId, chunkCount, hashSum, initialData, isResumed, downloadedChunks, callback){
	sync.log.trace("Entering kony.sync.downloadChunks");
	if(kony.sync.isSyncStopped){
		kony.sync.stopSyncSession();
		return;
	}
	var retries = kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey];
	var serverParams = {};
	serviceParams[kony.sync.payloadIdKey] = payloadId;
	serviceParams[kony.sync.chunkCountKey] = chunkCount;
	var noOfParallelCalls = 1;
	//temporarily disabling parallel calls
	/*if(!kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.maxParallelChunksKey])){
		if(kony.sync.currentSyncConfigParams[kony.sync.maxParallelChunksKey] > 0){
			noOfParallelCalls = kony.sync.currentSyncConfigParams[kony.sync.maxParallelChunksKey];
		}
	}*/
	//sync.log.info("Maximum parallel chunks:" + noOfParallelCalls);
	var chunkingFailed = 0;
	var chunkProcessed = 0;
	var chunkErrorMap = {};
	var utf8data = null;
	var corruptedData = false;
	var callNo = 0;
	var infoObj = {};
	var i = null;
	//process first chunk if chunking is not resumed from an earlier point
	if(!isResumed){
		downloadNetworkCallback(initialData, 1);
	}

	/*if(!kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey])){
		//infoObj[kony.sync.numberOfRetriesKey] = kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey];
	}*/
	if(isResumed){
		//find the remaining ids
		
		//create map for all the ids
		var chunkMap = {};
		for(i=1; i<=chunkCount; i++){
			chunkMap[i] = 0; //initially set 0 for all the ids
		}
		for(i in downloadedChunks){
			chunkMap[downloadedChunks[i]] = 1; //set 1 for downloaded ids
			chunkProcessed++; //count processed chunks
		}
		
		i=1;
		for(callNo=1; callNo<=chunkCount; callNo++){
			if(chunkMap[callNo]===0){
				infoObj[kony.sync.chunkNoKey] = callNo;
				serviceParams[kony.sync.chunkNoKey] = callNo;
				kony.sync.callOnChunkStart(chunkCount, payloadId, kony.sync.currentScope[kony.sync.scopeName], callNo, serviceParams);
				sync.log.info("Hitting the service with URL :" + url + " with params:" + JSON.stringify(serviceParams));
				retries = kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey];
				kony.sync.invokeServiceAsync(url, serviceParams, downloadNetworkCallbackStatus, infoObj);
				if(i>=noOfParallelCalls){
					callNo++;
					break;
				}
				i++;
			}
		}
	}
	else{
		for(callNo=2; callNo<=chunkCount; callNo++){
			infoObj[kony.sync.chunkNoKey] = callNo;
			serviceParams[kony.sync.chunkNoKey] = callNo;
			kony.sync.callOnChunkStart(chunkCount, payloadId, kony.sync.currentScope[kony.sync.scopeName], callNo, serviceParams);
			sync.log.info("Hitting the service with URL :" + url + " with params:" + JSON.stringify(serviceParams));
			retries = kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey];
			kony.sync.invokeServiceAsync(url, serviceParams, downloadNetworkCallbackStatus, infoObj);
			if(callNo > noOfParallelCalls){
				callNo++;
				break;
			}
		}
	}

	
	function downloadNetworkCallbackStatus(status, result, info){
		if(status === 400){
			sync.log.trace("Entering kony.sync.downloadChunks->downloadNetworkCallbackStatus");
			sync.log.info("Got Response for Chunk No:" + info[kony.sync.chunkNoKey]);
			if(kony.sync.eligibleForRetry(result.opstatus, retries)){
				retries--;
				kony.sync.retryServiceCall(url, result, info, retries, downloadNetworkCallback, serviceParams);
			}
			else{
				kony.sync.setSessionID(result);
				downloadNetworkCallback(result, info[kony.sync.chunkNoKey]);
			}
		}else if(status === 300){
				downloadNetworkCallback(kony.sync.getNetworkCancelError(),info[kony.sync.chunkNoKey]);
		}
	}
	
	function downloadNetworkCallback(result, info){
		sync.log.trace("Entering kony.sync.downloadChunks->downloadNetworkCallback");
		serverParams[kony.sync.hostName] = kony.sync.getServerDetailsHostName(result);
		serverParams[kony.sync.ipAddress] = kony.sync.getServerDetailsIpAddress(result);
		if(callNo <= chunkCount){
			if(!isResumed){
				if(callNo !== 0){
					infoObj[kony.sync.chunkNoKey] = callNo;
					serviceParams[kony.sync.chunkNoKey] = callNo;
					kony.sync.callOnChunkStart(chunkCount, payloadId, kony.sync.currentScope[kony.sync.scopeName], callNo, serviceParams);
					sync.log.info("Hitting the service with URL :" + url + " with params:", serviceParams);
					retries = kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey];
					kony.sync.invokeServiceAsync(url, serviceParams, downloadNetworkCallbackStatus, infoObj);
					callNo++;
				}
			}
			else{
				for(; callNo<=chunkCount; callNo++){
					if(chunkMap[callNo]===0){
						infoObj[kony.sync.chunkNoKey] = callNo;
						serviceParams[kony.sync.chunkNoKey] = callNo;
						kony.sync.callOnChunkStart(chunkCount, payloadId, kony.sync.currentScope[kony.sync.scopeName], callNo, serviceParams);
						sync.log.info("Hitting the service with URL :" + url + " with params:", serviceParams);
						retries = kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey];
						kony.sync.invokeServiceAsync(url, serviceParams, downloadNetworkCallbackStatus, infoObj);
						if(callNo >= noOfParallelCalls + 1){
							callNo++;
							break;
						}
					}
				}
			}
		}
		var chunkId = info;
		if(kony.sync.isValidJSTable(info)){
			chunkId = info[kony.sync.chunkNoKey];
		}

		if(!kony.sync.isNull(result.opstatus) && result.opstatus !== 0){
			chunkingFailed++;
			sync.log.error("Error occurred while downloading chunks: Code=" + result.opstatus + ", message=" + result.errmsg);
			chunkErrorMap[chunkId] = result.errmsg;
			kony.sync.callOnChunkError(chunkCount, payloadId, kony.sync.currentScope[kony.sync.scopeName], chunkId, chunkCount - chunkProcessed, chunkProcessed, result.opstatus, result.errmsg, serverParams);
			if(allChunksProcessed()){
				handleError();
			}
		}
		else if(result.d.error === "true"){
			chunkingFailed++;
			sync.log.error("Error occurred while downloading chunks: message=" + result.d.msg);
			chunkErrorMap[chunkId] = result.d.msg;
			kony.sync.callOnChunkError(chunkCount, payloadId, kony.sync.currentScope[kony.sync.scopeName], chunkId, chunkCount - chunkProcessed, chunkProcessed, kony.sync.errorCodeUnknownServerError, result.d.msg, serverParams);
			if(allChunksProcessed()){
				handleError();
			}
		}
		else{
			//store in local DB
			kony.sync.storeChunkInDB(payloadId, chunkId, result.d[kony.sync.chunkDataKey], kony.sync.currentScope[kony.sync.scopeName], chunkDataStoredCallback);
			if(allChunksProcessed()){
				handleError();
			}
		}
	}
	
	function allChunksProcessed(){
		return chunkProcessed + chunkingFailed === chunkCount;
	}
	function handleError(){
		sync.log.info("All chunking calls for current batch with total of " + chunkCount + " completed.")
		if(chunkProcessed > 0){
			sync.log.info("Chunks successfully downloaded and stored in DB:" + chunkProcessed);
		}
		//error occurred in one or more chunks
		if(chunkingFailed > 0){
			sync.log.error("Chunks failed either to downloaded or while storing in DB:" + chunkingFailed);
			//frame error
			var framedErrorResponse = kony.sync.frameDownloadError(kony.sync.getErrorMessage(kony.sync.errorCodeChunking), chunkErrorMap, null, kony.sync.errorCodeChunking);
			sync.log.error(kony.sync.getErrorMessage(kony.sync.errorCodeChunking), chunkErrorMap);
			//call download complete callback with error
			callback(framedErrorResponse);
			return false;
		}else{
			return true;
		}		
	}
	
	
	function chunkDataStoredCallback(chunkId, errorMap){
		sync.log.trace("Entering kony.sync.downloadChunks->chunkDataStoredCallback");
		//if error, add to errorMap
		if(!kony.sync.isNull(errorMap)){
			chunkingFailed++;
			chunkErrorMap[chunkId] = errorMap.errorCode;
			sync.log.error("Error occurred while storing chunk " +  chunkId + " in DB");
			kony.sync.callOnChunkError(chunkCount, payloadId, kony.sync.currentScope[kony.sync.scopeName], chunkId, chunkCount - chunkProcessed, chunkProcessed, errorMap.errorCode, errorMap.errorMessage, serverParams, errorMap.errorInfo);
		}
		else{
			chunkProcessed++;
			kony.sync.callOnChunkSuccess(chunkCount, payloadId, kony.sync.currentScope[kony.sync.scopeName], chunkId, chunkCount - chunkProcessed, chunkProcessed, serverParams);
		}
		
		if(allChunksProcessed() && handleError()){		
			//gather all results from chunkMap		
			kony.sync.getChunksFromDB(payloadId, chunkCount, kony.sync.currentScope[kony.sync.scopeName], chunkDataProcessCallback);		
		}
	
	}
	
	function chunkDataProcessCallback(data, isError, errorType){
		sync.log.trace("Entering kony.sync.downloadChunks->chunkDataProcessCallback");
		//error occurred while retrieving info
		if(isError){
			//frame error
			sync.log.error(kony.sync.getErrorMessage(kony.sync.errorCodeChunking), data);
			var framedErrorResponse = null;
			if(errorType===1 || errorType===2){
				framedErrorResponse = kony.sync.frameDownloadError(null, null, errorType);
			}else{
				framedErrorResponse = kony.sync.frameDownloadError(kony.sync.getErrorMessage(kony.sync.errorCodeChunking), data, null, kony.sync.errorCodeChunking);
			}
			//call download complete callback with error
			callback(framedErrorResponse);
		}
		//all chunks downloaded successfully
		else{
			utf8data = data;

			//calculate checksum hash of utf8data;
			var checksum = kony.sync.createHash("sha256", utf8data);
			
			//compare checksum with server sent hashsum;
			if(!kony.string.equalsIgnoreCase(checksum, hashSum)){
				sync.log.error("Received corrupted chunk data for payloadId= " + payloadId + ", clearing erroneous chunks from db.");
				corruptedData = true;
			}
			
			//release checksum
			checksum = null;
			
			//clear the payload from metainfo;
			kony.sync.clearChunkForPayload(payloadId, kony.sync.currentScope[kony.sync.scopeName], corruptedData, chunkDataClearback);
		}
	}
	
	function chunkDataClearback(data, isError){
		sync.log.trace("Entering kony.sync.downloadChunks->chunkDataClearback");
		//error occurred while clearing chunkInfo
		if(isError || corruptedData){
			//create error message
			var errMsg = "Following errors occurred:";
			if(isError){
				errMsg += "Error occurred while clearing chunk information from DB";
			}
			if(corruptedData){
				if(isError){
					errMsg += ", ";
				}
				errMsg += "Received corrupted chunk data for payloadId= " + payloadId;
			}
			errMsg += ".";
			sync.log.error(errMsg);
			
			//frame error
			var framedErrorResponse = kony.sync.frameDownloadError(errMsg, data, null, kony.sync.errorCodeChunking);
			
			//call download complete callback with error
			callback(framedErrorResponse);
		}
		else{
			//convert json string to json object
			var myJsonObject = null;
			try{
				myJsonObject = JSON.parse(utf8data);
			}
			catch(e){
				var errMsg = kony.sync.getErrorMessage(kony.sync.errorCodeParseError,utf8data,e);
				sync.log.error(errMsg);
				myJsonObject = null;
				utf8data = null;
				callback(kony.sync.frameDownloadError(errMsg, e, null, kony.sync.errorCodeParseError));
				return;
			}
			utf8data = null;
			//call the callback with final result			
			callback(myJsonObject);
		}
	}
};

//framing download error
kony.sync.frameDownloadError = function(errorMessage, errorInfo, dbError, errorCode){
	sync.log.trace("Entering kony.sync.frameDownloadError");
	var result = {};
	result.d = {};
	result.d.error = "true";
	if(dbError===1){//statement error
		result.d.opstatus = kony.sync.errorObject.errorCode;
		result.d.msg = kony.sync.errorObject.errorMessage;
		result.d.errorInfo = kony.sync.errorObject.errorInfo;
	}
	else if(dbError===2){//transaction error
		result.d.opstatus = kony.sync.errorCodeTransaction;
		result.d.msg = kony.sync.getErrorMessage(kony.sync.errorCodeTransaction);
		result.d.errorInfo = kony.sync.errorObject.errorInfo;
		sync.log.error(result.d.msg);
	}
	else{
		result.d.msg = errorMessage;
		result.d.errorInfo = errorInfo;
		result.d.opstatus = errorCode;
	}
	return result;
};

//This method will store chunks in DB
kony.sync.storeChunkInDB = function(payloadId, chunkId, chunkData, scopeName, callback){
	sync.log.trace("Entering kony.sync.storeChunkInDB");
	var isError = false;
	var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, transactionFailedCallback);
	if(dbconnection!==null){
		kony.db.transaction(dbconnection, transactionCallback, transactionFailedCallback, transactionSuccessCallback);
	}

	function transactionCallback(tx){
		sync.log.trace("Entering kony.sync.storeChunkInDB->transactionCallback");
		//check for dupicate chunks
		var wcs = [];
		wcs.push({key:kony.sync.metaTableScopeColumn, value:scopeName});
		wcs.push({key:kony.sync.chunkTableChunkId, value:chunkId});
		wcs.push({key:kony.sync.chunkTablePayloadId, value:payloadId});
		
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_where(query, wcs);
					kony.sync.qb_select(query, null);
					kony.sync.qb_from(query, kony.sync.chunkTableName);
		
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		var resultset = kony.sync.executeSql(tx, sql, params);
		if(resultset===false){
			isError = true;
			return;
		}
		
		if(resultset.rows.length > 0){
			//ignore the chunk as it is already stored by some earlier call
			return;
		}
		
		//store chunk into DB
		var values = {};
		values[kony.sync.chunkTableChunkData] = chunkData;
		values[kony.sync.chunkTableChunkId] = chunkId;
		values[kony.sync.chunkTablePayloadId] = payloadId;
		values[kony.sync.metaTableScopeColumn] = scopeName;
		values[kony.sync.chunkTableTimeStamp] = (new Date()).toString();
		query = kony.sync.qb_createQuery();
				kony.sync.qb_set(query, values);
				kony.sync.qb_insert(query, kony.sync.chunkTableName);
		query_compile = kony.sync.qb_compile(query);
		sql = query_compile[0];
		params = query_compile[1];
		if(kony.sync.executeSql(tx, sql, params)===false){
			isError = true;
		}
	}
	
	function transactionFailedCallback(){
		sync.log.trace("Entering kony.sync.storeChunkInDB->transactionFailedCallback");
		callback(chunkId, kony.sync.getTransactionError(isError));
	}
	
	function transactionSuccessCallback(){
		sync.log.trace("Entering kony.sync.storeChunkInDB->transactionSuccessCallback");
		callback(chunkId);
	}
};

//This method will retrieve all chunks from DB
kony.sync.getChunksFromDB = function(payloadId, chunkCount, scopeName, callback){
	sync.log.trace("Entering kony.sync.getChunksFromDB");
	var isError = false;
	var base64 = "";
	var unknownError = "";
	var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, transactionFailedCallback);
	if(dbconnection!==null){
		kony.db.transaction(dbconnection, transactionCallback, transactionFailedCallback, transactionSuccessCallback);
	}
	
	function transactionCallback(tx){
		sync.log.trace("Entering kony.sync.getChunksFromDB->transactionCallback");
		var wcs = [];
		wcs.push({key:kony.sync.metaTableScopeColumn, value:scopeName});
		wcs.push({key:kony.sync.chunkTablePayloadId, value:payloadId});
		
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_where(query, wcs);
					kony.sync.qb_select(query, null);
					kony.sync.qb_orderBy(query, [{key:kony.sync.chunkTableChunkId, sortType:"asc"}]);
					kony.sync.qb_from(query, kony.sync.chunkTableName);
		
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		var resultset = kony.sync.executeSql(tx, sql, params);
		if(resultset===false){
			isError = true;
			return;
		}
		
		if(resultset.rows.length !== chunkCount){
			//should never reach here
			unknownError = "Unknown Error: Chunks in DB(" + resultset.rows.length + ") are not equal to chunkcount(" + chunkCount + ")";
			sync.log.error(unknownError);
			isError = true;
			return;
		}
		
		for(var i=0; i<resultset.rows.length; i++){
			var rowItem = kony.db.sqlResultsetRowItem(tx, resultset, i);
			base64 = base64 + rowItem[kony.sync.chunkTableChunkData];
		}
	}
	
	function transactionFailedCallback(){
		sync.log.trace("Entering kony.sync.getChunksFromDB->transactionFailedCallback");
		callback(null, true, isError===true?1:2);
	}
	
	function transactionSuccessCallback(){
		sync.log.trace("Entering kony.sync.getChunksFromDB->transactionSuccessCallback");
		if(isError){
			callback(unknownError, true);
		}
		else{
			callback(base64, false);
		}
	}
};

//clear chunking info from DB
kony.sync.clearChunkForPayload = function(payloadId, scopeName, chunkError, callback){
	sync.log.trace("Entering kony.sync.clearChunkForPayload");
	var isError = false;
	var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, transactionFailedCallback);
	if(dbconnection!==null){
		kony.db.transaction(dbconnection, transactionCallback, transactionFailedCallback, transactionSuccessCallback);
	}
	function transactionCallback(tx){
		sync.log.trace("Entering kony.sync.clearChunkForPayload->transactionCallback");
		//set complete flag in metainfo table
		var values = {};
		values[kony.sync.metaTableChunkAck] = kony.sync.chunkCompleteButNotAcknowledged;
		
		//if problem occurred while chunking, mark discard flag for next download
		if(chunkError===true){
			values[kony.sync.metaTableChunkDiscarded] = kony.sync.chunkDiscarded;
		}
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_set(query, values);
					kony.sync.qb_update(query, kony.sync.chunkMetaTableName);
					kony.sync.qb_where(query, [{key:kony.sync.metaTableScopeColumn, value:scopeName}]);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		if(kony.sync.executeSql(tx, sql, params)===false){
			isError = true;
			return;
		}
		
		//clearing chunkdata from chunk table
		var wcs = [];
		wcs.push({key:kony.sync.metaTableScopeColumn, value:scopeName});
		wcs.push({key:kony.sync.chunkTablePayloadId, value:payloadId});
		
		query = kony.sync.qb_createQuery();
				kony.sync.qb_where(query, wcs);
				kony.sync.qb_delete(query, kony.sync.chunkTableName);
		
		query_compile = kony.sync.qb_compile(query);
		sql = query_compile[0];
		params = query_compile[1];
		if(kony.sync.executeSql(tx, sql, params)===false){
			isError = true;
			return;
		}
	}
	
	function transactionFailedCallback(){
		sync.log.trace("Entering kony.sync.clearChunkForPayload->transactionFailedCallback");
		var errMsg = "";
		if(isError){
			errMsg = "Error occurred while clearing chunk information from " + kony.sync.chunkTableName;
			callback({"errorCode":kony.sync.errorCodeSQLStatement, "errorMessage":errMsg}, true);
		}
		else{
			errMsg = "Error occurred while opening transaction for clearing chunk information from " + kony.sync.chunkTableName;
			callback({"errorCode":kony.sync.errorCodeTransaction, "errorMessage":errMsg}, true);
		}
		sync.log.error(errMsg);
	}
	
	function transactionSuccessCallback(){
		sync.log.trace("Entering kony.sync.clearChunkForPayload->transactionSuccessCallback");
		callback(null, false);
	}
};

kony.sync.getChunkSize = function(){
	sync.log.trace("Entering kony.sync.getChunkSize");
	if(!kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.chunkSizeKey])){
		return kony.sync.currentSyncConfigParams[kony.sync.chunkSizeKey];
	}	
};

//This API checks whether chunking should be called before download or not
kony.sync.checkForChunkingBeforeDownload = function(serverblob, normalDownloadCallback, downloadNetworkCallback, schemaUpgradeServerblob){
	sync.log.trace("Entering kony.sync.checkForChunkingBeforeDownload");
	var scopeName = kony.sync.currentScope[kony.sync.scopeName];
	var isError = false;
	var chunkingResumed = 0;
	var lastsynctime = serverblob;
	var chunkData = [];
	var chunkMetaData = null;
	var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, transactionFailedCallback);
	if(dbconnection!==null){
		kony.db.transaction(dbconnection, transactionCallback, transactionFailedCallback, transactionSuccessCallback);
	}
	function transactionCallback(tx){
		sync.log.trace("Entering kony.sync.checkForChunkingBeforeDownload->transactionCallback");
		var wcs = [];
		wcs.push({key:kony.sync.metaTableScopeColumn, value:scopeName});
		
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_where(query, wcs);
					kony.sync.qb_select(query, null);
					kony.sync.qb_from(query, kony.sync.chunkMetaTableName);
		
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		var resultset = kony.sync.executeSql(tx, sql, params);
		if(resultset===false){
			isError = true;
			return;
		}
		
		if(resultset.rows.length > 0){
			var rowItem = kony.db.sqlResultsetRowItem(tx, resultset, 0);
			var pendingAck = rowItem[kony.sync.metaTableChunkAck];
			var chunkDiscarded = rowItem[kony.sync.metaTableChunkDiscarded];
			if(pendingAck === 0 && chunkDiscarded === 0){
				chunkingResumed = 1; //resume chunking				
			}
			else{
				chunkingResumed = 2; //just send payloadid for acknowledgement
			}
			chunkMetaData = rowItem; //get meta data
			
			if(chunkingResumed===2 && pendingAck!==kony.sync.chunkCompleteAndWaitingForAck){
				//updating metadata status as sent for acknowledgement
				var values = {};
				values[kony.sync.metaTableChunkAck] = kony.sync.chunkCompleteAndWaitingForAck;
				query = kony.sync.qb_createQuery();
				kony.sync.qb_where(query, wcs);
				kony.sync.qb_set(query, values);
				kony.sync.qb_update(query, kony.sync.chunkMetaTableName);
			
				query_compile = kony.sync.qb_compile(query);
				sql = query_compile[0];
				params = query_compile[1];
				resultset = kony.sync.executeSql(tx, sql, params);
				if(resultset===false){
					isError = true;
					return;
				}
			}
			
			//get chunk ids for that payloadid
			wcs = [];
			wcs.push({key:kony.sync.metaTableScopeColumn, value:scopeName});
			wcs.push({key:kony.sync.chunkTablePayloadId, value:rowItem[kony.sync.metaTablePayloadId]});
			
			query = kony.sync.qb_createQuery();
						kony.sync.qb_select(query, [kony.sync.chunkTableChunkId]);
						kony.sync.qb_where(query, wcs);
						kony.sync.qb_from(query, kony.sync.chunkTableName);
			
			query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
			params = query_compile[1];
			resultset = kony.sync.executeSql(tx, sql, params);
			if(resultset===false){
				isError = true;
				return;
			}
			for(var i=0; i<resultset.rows.length; i++){
				rowItem = kony.db.sqlResultsetRowItem(tx, resultset, i);
				chunkData[i] = rowItem[kony.sync.chunkTableChunkId];
			}
		}
	}
	
	function transactionSuccessCallback(){
		sync.log.trace("Entering kony.sync.checkForChunkingBeforeDownload->transactionSuccessCallback");
		if(chunkingResumed===1){
			//continue chunking from last point
			var params = kony.sync.getChunkingParams(lastsynctime, schemaUpgradeServerblob);
			var hashSum = chunkMetaData[kony.sync.metaTableChunkHashSum];
			var chunkCount = chunkMetaData[kony.sync.metaTableChunkCount];
			var payloadId = chunkMetaData[kony.sync.metaTablePayloadId];
			kony.sync.globalIsDownloadStarted = false;
			kony.sync.downloadChunks(kony.sync.getChunkDownloadURL(), params, payloadId, chunkCount, hashSum, null, true, chunkData, downloadNetworkCallback);
		}
		else if(chunkingResumed===2){
			normalDownloadCallback(chunkMetaData[kony.sync.metaTablePayloadId]);
		}
		else{
			//proceed with normal download
			normalDownloadCallback();
		}
	}
	
	function transactionFailedCallback(){
		sync.log.trace("Entering kony.sync.checkForChunkingBeforeDownload->transactionFailedCallback");
		var errMsg = "";
		if(isError){
			errMsg = "Error occurred while inserting chunk information in metatable";
			downloadNetworkCallback(kony.sync.frameDownloadError(null,errMsg,1));
		}
		else{
			errMsg = "Error occurred while opening transaction to store chunk information in metatable";
			downloadNetworkCallback(kony.sync.frameDownloadError(null,errMsg,2));
		}
		sync.log.error(errMsg);
	}
};

kony.sync.getChunkingParams = function(serverblob, schemaUpgradeServerblob) {
	sync.log.trace("Entering kony.sync.getChunkingParams");
	//create params
    if (kony.sync.isNullOrUndefined(serverblob)) {
        serverblob = "";
    }
	
    var params = {};
    kony.sync.commonServiceParams(params);

    if(kony.sync.schemaUpgradeDownloadPending){
		params.tickcount = schemaUpgradeServerblob;
		params.uppertickcount = serverblob;
		if(!kony.sync.isNullOrUndefined(kony.sync.schemaUpgradeContext)){
			params.upgradecontext = kony.sync.schemaUpgradeContext;
		}
	} else {
		params.tickcount = serverblob;
	}
    params.clientid = kony.sync.getDeviceID();	
	
	if(!kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.networkTimeOutKey])){
		params.httpconfig = {timeout:kony.sync.currentSyncConfigParams[kony.sync.networkTimeOutKey]};
	}	

	return params;
};

//API to abort all pending chunk requests
sync.cancelPendingChunkRequests = function(successcallback, errorcallback){
	sync.log.trace("Entering kony.sync.cancelPendingChunkRequests");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var isError = false;
    var dbname = kony.sync.scopes[0][kony.sync.scopeDataSource];
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, transactionFailedCallback);
	if(dbconnection!==null){
		kony.db.transaction(dbconnection, transactionCallback, transactionFailedCallback, transactionSuccessCallback);
	}
	function transactionCallback(tx){
		sync.log.trace("Entering kony.sync.cancelPendingChunkRequests->transactionCallback");
		//change status in metatable to discarded
		var values = {};
		values[kony.sync.metaTableChunkDiscarded] = kony.sync.chunkDiscarded;
		
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_set(query, values);
					kony.sync.qb_update(query, kony.sync.chunkMetaTableName);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		if(kony.sync.executeSql(tx, sql, params)===false){
			isError = true;
		}
		
		//delete pending chunks from chunk table
		query = kony.sync.qb_createQuery();
				kony.sync.qb_delete(query, kony.sync.chunkTableName);
		
		query_compile = kony.sync.qb_compile(query);
		sql = query_compile[0];
		params = query_compile[1];
		if(kony.sync.executeSql(tx, sql, params)===false){
			isError = true;
			return;
		}

	}
	
	function transactionFailedCallback(){
		sync.log.trace("Entering kony.sync.cancelPendingChunkRequests->transactionFailedCallback");
		kony.sync.callTransactionError(errorcallback, isError);
	}

	function transactionSuccessCallback(){
		sync.log.trace("Entering kony.sync.cancelPendingChunkRequests->transactionSuccessCallback");
		kony.sync.verifyAndCallClosure(successcallback);
	}
};

//This will delete chunk data from metatable after receiving acknowledgement
kony.sync.clearChunkMetaData = function(tx, scopeName){
	sync.log.trace("Entering kony.sync.clearChunkMetaData");
	var wcs = [];
	wcs.push({key:kony.sync.metaTableScopeColumn, value:scopeName});
	wcs.push({key:kony.sync.metaTableChunkAck, value:kony.sync.chunkCompleteAndWaitingForAck});
	var query = kony.sync.qb_createQuery();
			kony.sync.qb_where(query, wcs);
			kony.sync.qb_delete(query, kony.sync.chunkMetaTableName);
	
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	return kony.sync.executeSql(tx, sql, params);
};

kony.sync.callOnChunkStart = function(chunkCount, payloadId, scope, chunkid, chunkRequest){
	sync.log.trace("Entering kony.sync.callOnChunkStart");
	var params = {};
	params[kony.sync.chunkCountKey] = chunkCount;
	params[kony.sync.payloadIdKey] = payloadId;
	params[kony.sync.metaTableScopeColumn] = scope;
	params[kony.sync.chunkTableChunkId] = chunkid;
	params[kony.sync.chunkRequestKey] = chunkRequest;
	
	return kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onChunkStart], params);
};

kony.sync.callOnChunkSuccess = function(chunkCount, payloadId, scope, chunkid, pendingChunks, chunksDownloaded, serverParams){
	sync.log.trace("Entering kony.sync.callOnChunkSuccess");
	var params = {};
	params[kony.sync.chunkCountKey] = chunkCount;
	params[kony.sync.payloadIdKey] = payloadId;
	params[kony.sync.metaTableScopeColumn] = scope;
	params[kony.sync.chunkTableChunkId] = chunkid;
	params[kony.sync.pendingChunksKey] = pendingChunks;
	params[kony.sync.chunksDownloadedKey] = chunksDownloaded;
	params[kony.sync.serverDetails] = serverParams;
	
	kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onChunkSuccess], params);
};

kony.sync.callOnChunkError = function(chunkCount, payloadId, scope, chunkid, pendingChunks, chunksDownloaded, errorCode, errorMsg, serverParams, errorInfo){
	sync.log.trace("Entering kony.sync.callOnChunkError");
	var params = {};
	params[kony.sync.chunkCountKey] = chunkCount;
	params[kony.sync.payloadIdKey] = payloadId;
	params[kony.sync.metaTableScopeColumn] = scope;
	params[kony.sync.chunkTableChunkId] = chunkid;
	params[kony.sync.pendingChunksKey] = pendingChunks;
	params[kony.sync.chunksDownloadedKey] = chunksDownloaded;
	params.errorCode = errorCode;
	params.errorMessage = errorMsg;
	params[kony.sync.serverDetails] = serverParams;
	params.errorInfo = errorInfo;
	kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onChunkError], params);
};
//  **************** End KonySyncChunkingHelper.js*******************


//  **************** Start KonySyncDBOperations.js*******************
if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}
if(typeof(sync)=== "undefined"){
	sync = {};
}

kony.sync.insert = function (tx, tablename, values, insert_callback, markForUpload) {
	sync.log.trace("Entering kony.sync.insert ");
	var scopename = kony.sync.scopes.syncTableScopeDic[tablename];
	if (markForUpload === false){
		values[kony.sync.mainTableChangeTypeColumn] = kony.sync.insertColStatusDI;
	} else {
		values[kony.sync.mainTableChangeTypeColumn] = kony.sync.insertColStatus;
	}
	values[kony.sync.mainTableSyncVersionColumn] = kony.sync.currentSyncScopesState[scopename];
	var scope = kony.sync.scopes[scopename];
	var generatedPK = kony.sync.replaceautogeneratedPK(scopename, scope.syncTableDic[tablename], values, tx, insert_callback);
	if (generatedPK === false) {
		return false;
	}
	//Check if it is original or save the original state.

	if (markForUpload === false) {
		if (kony.sync.addToRollBack(tx, tablename, values, kony.sync.insertColStatusDI, null, insert_callback) === false) {
			return false;
		}
	} else {
		if (kony.sync.addToRollBack(tx, tablename, values, kony.sync.insertColStatus, null, insert_callback) === false) {
			return false;
		}
	}

	if (kony.sync.insertEx(tx, tablename, values, insert_callback) === false) {
		return false;
	}
	var syncorder = kony.sync.getSyncOrder(scopename, tx, insert_callback);
	if (syncorder !== null && syncorder !== false) {
		values[kony.sync.mainTableChangeTypeColumn] = null;
		values[kony.sync.mainTableSyncVersionColumn] = null;

		if (markForUpload === false) {
			values[kony.sync.historyTableChangeTypeColumn] = kony.sync.insertColStatusDI;
		} else {
			values[kony.sync.historyTableChangeTypeColumn] = kony.sync.insertColStatus;
		}
		values[kony.sync.historyTableSyncVersionColumn] = kony.sync.currentSyncScopesState[scopename];
		values[kony.sync.historyTableReplaySequenceColumn] = syncorder + 1;

		if (kony.sync.insertEx(tx, tablename + kony.sync.historyTableName, values, insert_callback) === false) {
			return false;
		}

		if (kony.sync.setSyncOrder(scopename, syncorder + 1, tx, insert_callback) === false) {
			return false;
		}
	} else {
		// not expected to come here
		sync.log.fatal("Invalid sync order in insert function");
	}
	return generatedPK;
};

kony.sync.insertEx = function (tx, tablename, values, errorcallback, rollback) {
	sync.log.trace("Entering kony.sync.insertEx ");
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_set(query, values);
	kony.sync.qb_insert(query, tablename);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	return kony.sync.executeSql(tx, sql, params, errorcallback, rollback);
};

kony.sync.purgeInsertEx = function (tx, tablename, values, rollback) {
	sync.log.trace("Entering kony.sync.purgeInsertEx ");
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_purgeInsert(query, tablename, values);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	return kony.sync.executeSql(tx, sql, params, null, rollback);
};

kony.sync.error_callbackdb = function (error) {
	sync.log.trace("Entering kony.sync.error_callbackdb ");
	sync.log.error("@@@@@@@@@@@@@ -" + error.message + " @@@ " + error.code);
};

kony.sync.update = function (tx, tablename, values, wc, markForUpload) {
	sync.log.trace("Entering kony.sync.update ");
	//Check if it is original or save the original state.

	if (markForUpload === false) {
		if(kony.sync.addToRollBack(tx, tablename, values, kony.sync.updateColStatusDU, wc)===false){
			return false;
		}
	} else {
		if(kony.sync.addToRollBack(tx, tablename, values, kony.sync.updateColStatus, wc)===false){
			return false;
		}
	}

	var scopename = kony.sync.scopes.syncTableScopeDic[tablename];
	if (markForUpload === false) {
		values[kony.sync.mainTableChangeTypeColumn] = kony.sync.updateColStatusDU;
	} else {
		values[kony.sync.mainTableChangeTypeColumn] = kony.sync.updateColStatus;
	}
	values[kony.sync.mainTableSyncVersionColumn] = kony.sync.currentSyncScopesState[scopename];

	var resultSet = kony.sync.updateEx(tx, tablename, values, wc);

	var updateResult = {};
	if(resultSet===false){
		return false;
	}else{
		updateResult[kony.sync.numberOfRowsUpdated] = resultSet.rowsAffected;
	}
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);
				kony.sync.qb_from(query, tablename);
				kony.sync.qb_where(query, wc);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	var syncorder = kony.sync.getSyncOrder(scopename, tx);
	if(syncorder === false){
		return false;
	}
	resultSet = kony.sync.executeSql(tx, sql, params);
	if (resultSet === false) {
		return false;
	}
	var record = kony.db.sqlResultsetRowItem(tx, resultSet, 0);
	if(record === null){
		return false;
	}
	if (!kony.sync.isNullOrUndefined(syncorder)) {
		record[kony.sync.historyTableReplaySequenceColumn] = syncorder + 1;
		if (markForUpload === false) {
			record[kony.sync.historyTableChangeTypeColumn] = kony.sync.updateColStatusDU;
		} else {
			record[kony.sync.historyTableChangeTypeColumn] = kony.sync.updateColStatus;
		}
		record[kony.sync.historyTableSyncVersionColumn] = kony.sync.currentSyncScopesState[scopename];
		if(kony.sync.addUpdateToHistoryTable(tx, tablename + kony.sync.historyTableName, record)===false){
			return false;
		}
		if(kony.sync.setSyncOrder(scopename, syncorder + 1, tx) === false) {
			return false;
		}
	} else {
		// not expected to come here
		sync.log.fatal("Invalid sync order in insert function");
	}
	return updateResult;
};

kony.sync.updateBatch = function (tx, tablename, values, wc, markForUpload, primaryKey) {
	sync.log.trace("Entering kony.sync.updateBatch ");
	//adding original values to rollback tables if exists
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_select(query, null);
	kony.sync.qb_from(query, tablename);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0] + " " + wc;
	var params = query_compile[1];
	var resultSet = kony.sync.executeSql(tx, sql, params, null, null, "Adding original values to rollback tables if exists");
	var i = 0;
	var record = null;
	if (resultSet === false) {
		return false;
	}
	var num_records = resultSet.rows.length;
	for (i = 0; i < num_records; i++) {
		record = kony.db.sqlResultsetRowItem(tx, resultSet, i);
		if (markForUpload === false) {
			record[kony.sync.originalTableChangeTypeColumn] = kony.sync.updateColStatusDU;
		} else {
			record[kony.sync.originalTableChangeTypeColumn] = kony.sync.updateColStatus;
		}
		record[kony.sync.originalTableSyncVersionColumn] = record[kony.sync.originalTableChangeTypeColumn];
		record[kony.sync.mainTableChangeTypeColumn] = null;
		record[kony.sync.mainTableSyncVersionColumn] = null;
		//record[kony.sync.mainTableHashSumColumn] = null;
		kony.sync.insertEx(tx, tablename + kony.sync.originalTableName, record, null, false);
	}
	
	//Get Primary Key from where clause
	query = kony.sync.qb_createQuery();
	kony.sync.qb_select(query, null);
	kony.sync.qb_from(query, tablename);
	query_compile = kony.sync.qb_compile(query);
	sql = query_compile[0] + " " + wc;
	params = query_compile[1];
	resultSet = kony.sync.executeSql(tx, sql, params);
	if (resultSet === false) {
		return false;
	}
	num_records = resultSet.rows.length;
	var pkSet = [];
	for (i = 0; i < num_records; i++) {
		record = kony.db.sqlResultsetRowItem(tx, resultSet, i);
		var pkRecord = [];
		for(var j in primaryKey){
			pkRecord.push({"key":primaryKey[j], "value":record[primaryKey[j]]});
		}
		pkSet.push(pkRecord);
	}	
	//updating main tables
	var scopename = kony.sync.scopes.syncTableScopeDic[tablename];
	if (markForUpload === false) {
		values[kony.sync.mainTableChangeTypeColumn] = kony.sync.updateColStatusDU;
	} else {
		values[kony.sync.mainTableChangeTypeColumn] = kony.sync.updateColStatus;
	}
	values[kony.sync.mainTableSyncVersionColumn] = kony.sync.currentSyncScopesState[scopename];
	// update the flag only if this record is present on server
	resultSet = kony.sync.updateEx(tx, tablename, values, wc, null, true);
	var updateResult = {};
	if(resultSet===false){
		return false;
	}else{
		updateResult[kony.sync.numberOfRowsUpdated] = resultSet.rowsAffected;
		//kony.sync.verifyAndCallClosure(update_callback, {kony.sync.numberOfRowsUpdated:resultSet.rowsAffected});
	}
	var syncorder = kony.sync.getSyncOrder(scopename, tx);
	if(syncorder === false){
		return false;
	}
	for(i in pkSet){
		query = kony.sync.qb_createQuery();
		kony.sync.qb_select(query, null);
		kony.sync.qb_from(query, tablename);
		kony.sync.qb_where(query, pkSet[i]);
		query_compile = kony.sync.qb_compile(query);
		sql = query_compile[0];
		params = query_compile[1];
		resultSet = kony.sync.executeSql(tx, sql, params);
		if (resultSet === false) {
			return false;
		}
		record = kony.db.sqlResultsetRowItem(tx, resultSet, 0);
		syncorder = syncorder + 1;
		record[kony.sync.historyTableReplaySequenceColumn] = syncorder;
		record[kony.sync.historyTableSyncVersionColumn] = kony.sync.currentSyncScopesState[scopename];
		if(kony.sync.addUpdateToHistoryTable(tx, tablename + kony.sync.historyTableName, record)===false){
			return false;
		}		
	}
	if(kony.sync.setSyncOrder(scopename, syncorder, tx)===false){
		return false;
	}
	return updateResult;
};


kony.sync.updateEx = function (tx, tablename, values, wc, update_callback, isBatch) {
	sync.log.trace("Entering kony.sync.updateEx ");
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_set(query, values);
	kony.sync.qb_update(query, tablename);
	if(kony.sync.isNullOrUndefined(isBatch)) {
		kony.sync.qb_where(query, wc);
	}
	//local sqlUpdate = "update "..tablename.." set "..updateStr..wc;
	var query_compile = kony.sync.qb_compile(query);
	var sqlUpdate = "";
	if (isBatch === true) {
		sqlUpdate = query_compile[0] + " " + wc;
	} else {
		sqlUpdate = query_compile[0];
	}
	var params = query_compile[1];

	return kony.sync.executeSql(tx, sqlUpdate, params);

}; 

kony.sync.upsertEx = function (tx, tablename, values, wc, callback) {
	sync.log.trace("Entering kony.sync.upsertEx ");
//#ifdef android
	//Check whether row exists or not
	//OLD Implementation
	if ((kony.sync.isrowexists(tx, tablename, wc, callback))) {
		//Do an update
		kony.sync.serverUpdateCount = kony.sync.serverUpdateCount + 1;
		// update if the user hasn't changed the record
		kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdated] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdated] + 1;
		kony.sync.updateEx(tx, tablename, values, wc);
	} else {
		//Do an Insert
		kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInserted] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInserted] + 1;
		kony.sync.insertEx(tx, tablename, values, callback);
		kony.sync.serverInsertCount = kony.sync.serverInsertCount + 1;
	}
//#else
	//#ifdef tabrcandroid
		//Check whether row exists or not
	//OLD Implementation
	if ((kony.sync.isrowexists(tx, tablename, wc, callback))) {
		//Do an update
		kony.sync.serverUpdateCount = kony.sync.serverUpdateCount + 1;
		// update if the user hasn't changed the record
		kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdated] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdated] + 1;
		kony.sync.updateEx(tx, tablename, values, wc);
	} else {
		//Do an Insert
		kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInserted] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInserted] + 1;
		kony.sync.insertEx(tx, tablename, values, callback);
		kony.sync.serverInsertCount = kony.sync.serverInsertCount + 1;
	}
	//#else	
	var result = kony.sync.purgeInsertEx(tx, tablename, values, callback);
	if (result !== false && result.rowsAffected === 0) {
		kony.sync.serverUpdateCount = kony.sync.serverUpdateCount + 1;
		// update if the user hasn't changed the record
		kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdated] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdated] + 1;
		kony.sync.updateEx(tx, tablename, values, wc);
	} else {
		kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInserted] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInserted] + 1;
		kony.sync.serverInsertCount = kony.sync.serverInsertCount + 1;
	}
	//#endif
//#endif
};

kony.sync.isrowexists = function (tx, tablename, wc, errorCallback) {
	sync.log.trace("Entering kony.sync.isrowexists ");
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_select(query, null);
	kony.sync.qb_from(query, tablename);
	kony.sync.qb_where(query, wc);
	//local sql = "select * from "..tablename..wc;
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	var resultset = kony.sync.executeSql(tx, sql, params, errorCallback);
	if (resultset === false) {
		return false;
	}
	if (resultset.rows.length === 1) {
		return true;
	} else {
		return null; //if row doesn't exists, we should add it to rollback table
	}
};

//Function to delete one(batch)change
kony.sync.remove = function (tx, tablename, wc, isLocal, markForUpload, errorCallback) {
	sync.log.trace("Entering kony.sync.remove ");

	//Check if it is original or save the original state.
	if (isLocal !== true) {
		if (markForUpload === false) {
			if(kony.sync.addToRollBack(tx, tablename, null, kony.sync.deleteColStatusDD, wc, errorCallback) === false) {
				return false;
			}
		} else {
			if(kony.sync.addToRollBack(tx, tablename, null, kony.sync.deleteColStatus, wc, errorCallback) === false) {
				return false;
			}
		}
	}

	//Getting the records with the where clause
	var scopename = kony.sync.scopes.syncTableScopeDic[tablename];
	var scope = kony.sync.scopes[scopename];
	var syncTable = scope.syncTableDic[tablename];
	var record = null;
	
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_select(query, null);
	kony.sync.qb_from(query, tablename);
	kony.sync.qb_where(query, wc);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	var resultSet = kony.sync.executeSql(tx, sql, params, errorCallback);
	if (resultSet === false) {
		return false;
	}
	kony.sync.blobstore_delete(tx, tablename, wc, false);
	var num_records = resultSet.rows.length;
	var rowsDeleted = 0;
	for (var i = 0; i < num_records; i++) {
		//adding changes to history table
		if(isLocal !== true) {
			record = kony.db.sqlResultsetRowItem(tx, resultSet, i);
			var values = [];
			values[kony.sync.historyTableHashSumColumn] = record[kony.sync.mainTableHashSumColumn];
			if(!kony.sync.isNullOrUndefined(syncTable.Columns)){
				for (var j = 0;	j < syncTable.Columns.length; j++) {
					var column = syncTable.Columns[j];
					values[column.Name] = record[column.Name];
				}
			}
			var syncorder = kony.sync.getSyncOrder(scopename, tx, errorCallback);
			if(syncorder === false){
				return false;
			}
			if (syncorder !== null) {
				values[kony.sync.historyTableReplaySequenceColumn] = syncorder + 1;
				if (markForUpload === false) {
					values[kony.sync.historyTableChangeTypeColumn] = kony.sync.deleteColStatusDD;
				} else {
					values[kony.sync.historyTableChangeTypeColumn] = kony.sync.deleteColStatus;
				}
				values[kony.sync.historyTableSyncVersionColumn] = kony.sync.currentSyncScopesState[scopename];
				if(kony.sync.insertEx(tx, tablename + kony.sync.historyTableName, values, null, errorCallback) === false){
					return false;
				}
				if(kony.sync.setSyncOrder(scopename, syncorder + 1, tx, errorCallback) === false) {
					return false;
				}
			} else {
				// not expected to come here
				sync.log.fatal("Invalid sync order in insert function");
			}
		} else {
			//deleting all local changes from history
			record = kony.db.sqlResultsetRowItem(tx, resultSet, i);
			sync.log.debug("Removing Local Changes: ", record);
			query = kony.sync.qb_createQuery();
			kony.sync.qb_delete(query, null);
			kony.sync.qb_from(query, tablename + kony.sync.historyTableName);
			kony.sync.qb_where(query, wc);
			query_compile = kony.sync.qb_compile(query);
			params = query_compile[1];
			sql = query_compile[0];
			if(kony.sync.executeSql(tx, sql, params, errorCallback) === false){
				return false;
			}

			//deleting all local changes from original
			record = kony.db.sqlResultsetRowItem(tx, resultSet, i);
			sync.log.debug("Removing Local Changes from original: ", record);
			query = kony.sync.qb_createQuery();
			kony.sync.qb_delete(query, null);
			kony.sync.qb_from(query, tablename + kony.sync.originalTableName);
			kony.sync.qb_where(query, wc);
			query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
			params = query_compile[1];
			if(kony.sync.executeSql(tx, sql, params, errorCallback) === false){
				return false;
			}
		}
		//deleting from main table
		var resultSet1 = kony.sync.removeEx(tx, tablename, wc, null , errorCallback);
		if(resultSet1===false){
			return false;
		}
		rowsDeleted = rowsDeleted + resultSet1.rowsAffected;
	}
	var deleteResult = {};
	deleteResult[kony.sync.numberOfRowsDeleted] = rowsDeleted;
	return deleteResult;
};

//Function to delete more than one(batch)changes
kony.sync.deleteBatch = function (tx, tablename, wc, isLocal, markForUpload, errorCallback) {
	sync.log.trace("Entering kony.sync.deleteBatch ");

	var scopename = kony.sync.scopes.syncTableScopeDic[tablename];
	var i = null;
	var record = null;
	//adding original values to rollback tables if exists
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_select(query, null);
	kony.sync.qb_from(query, tablename);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0] + " " + wc;
	var params = query_compile[1];
	var resultSet = kony.sync.executeSql(tx, sql, params, errorCallback);
	if (resultSet === false) {
		return false;
	}
	var num_records = resultSet.rows.length;
	if (isLocal === false) {
		for (i = 0; i <= num_records - 1; i++) {
			record = kony.db.sqlResultsetRowItem(tx, resultSet, i);
			record[kony.sync.originalTableChangeTypeColumn] = kony.sync.deleteColStatus;
			record[kony.sync.originalTableSyncVersionColumn] = record[kony.sync.originalTableChangeTypeColumn];
			record[kony.sync.mainTableChangeTypeColumn] = null;
			record[kony.sync.mainTableSyncVersionColumn] = null;
			//record[kony.sync.mainTableHashSumColumn] = null;
			kony.sync.insertEx(tx, tablename + kony.sync.originalTableName, record, null, false);
		}
	}
	query = kony.sync.qb_createQuery();
	kony.sync.qb_select(query, null);
	kony.sync.qb_from(query, tablename);
	query_compile = kony.sync.qb_compile(query);
	sql = query_compile[0] + " " + wc;
	params = query_compile[1];
	var syncorder = kony.sync.getSyncOrder(scopename, tx, errorCallback);
	if(syncorder === false){
		return false;
	}
	resultSet = kony.sync.executeSql(tx, sql, params, errorCallback);
	if(resultSet === false){
		return false;
	}
	num_records = resultSet.rows.length;
	if ((syncorder !== null)) {
		for (i = 0; i < num_records; i++) {
			record = kony.db.sqlResultsetRowItem(tx, resultSet, i);
			//adding change replay to history tables
			if (isLocal === false) {
				syncorder = syncorder + 1;
				record[kony.sync.historyTableReplaySequenceColumn] = syncorder;
				if (markForUpload === false) {
					record[kony.sync.historyTableChangeTypeColumn] = kony.sync.deleteColStatusDD;
				} else {
					record[kony.sync.historyTableChangeTypeColumn] = kony.sync.deleteColStatus;
				}
				record[kony.sync.historyTableSyncVersionColumn] = kony.sync.currentSyncScopesState[scopename];
				if(kony.sync.insertEx(tx, tablename + kony.sync.historyTableName, record, errorCallback)===false){
					return false;
				}
			}
			//deleting local changes from history table
			else {
				sync.log.debug("Removing Local Changes: ", record);
				query = kony.sync.qb_createQuery();
				kony.sync.qb_delete(query, null);
				kony.sync.qb_from(query, tablename + kony.sync.historyTableName);
				query_compile = kony.sync.qb_compile(query);
				sql = query_compile[0] + " " + wc;
				params = query_compile[1];				
				if(kony.sync.executeSql(tx, sql, params, errorCallback)===false){
					return false;
				}
				sync.log.debug("Removing Local Changes from original: ", record);
				query = kony.sync.qb_createQuery();
				kony.sync.qb_delete(query, null);
				kony.sync.qb_from(query, tablename + kony.sync.originalTableName);				
				query_compile = kony.sync.qb_compile(query);
				sql = query_compile[0] + " " + wc;
				params = query_compile[1];
				if(kony.sync.executeSql(tx, sql, params, errorCallback) === false) {
					return false;
				}
			}
		}
		if(kony.sync.setSyncOrder(scopename, syncorder, tx, errorCallback)===false){
			return false;
		}
	} else {
		// not expected to come here
		sync.log.fatal("Invalid sync order in insert function");
	}
	//deleting main tables
	resultSet = kony.sync.removeEx(tx, tablename, wc, true, errorCallback);
	if(resultSet === false){
		return false;
	}
	var deleteResult = {};
	deleteResult[kony.sync.numberOfRowsDeleted] = resultSet.rowsAffected;
	return deleteResult;
};


kony.sync.removeEx = function (tx, tablename, wc, isBatch, errorcallback) {
	sync.log.trace("Entering kony.sync.removeEx ");
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_delete(query, tablename);
	if (kony.sync.isNullOrUndefined(isBatch)) {
		kony.sync.qb_where(query, wc);
	}
	//local sql = "delete from "..tablename.." "..wc;
	var query_compile = kony.sync.qb_compile(query);
	var sql = "";
	if (isBatch === true) {
		sql = query_compile[0] + " " + wc;
	} else {
		sql = query_compile[0];
	}
	var params = query_compile[1];
	return kony.sync.executeSql(tx, sql, params, errorcallback);
};

kony.sync.addToRollBack = function (tx, tablename, values, changetype, wcs, errorCallback) {
	sync.log.trace("Entering kony.sync.addToRollBack ");
	var originalwcs = kony.sync.CreateCopy(wcs);
	var originalvalues = kony.sync.CreateCopy(values);
	var rowExists = null;
	if(changetype === kony.sync.insertColStatus || changetype === kony.sync.insertColStatusDI){
		originalvalues[kony.sync.originalTableChangeTypeColumn] = changetype;
		originalvalues[kony.sync.originalTableSyncVersionColumn] = null;
		originalvalues[kony.sync.mainTableChangeTypeColumn] = null;
		originalvalues[kony.sync.mainTableSyncVersionColumn] = null;
		originalvalues[kony.sync.mainTableHashSumColumn] = null;

		var scope = kony.sync.scopes[kony.sync.scopes.syncTableScopeDic[tablename]];
		var pkColumns = scope.syncTableDic[tablename].Pk_Columns;
		var pkRecord = [];
		for(var j in pkColumns){
			pkRecord.push({"key":pkColumns[j], "value":originalvalues[pkColumns[j]]});
		}
		rowExists = kony.sync.isrowexists(tx, tablename + kony.sync.originalTableName, pkRecord);
		if (rowExists === true) {
			//Original State is already saved, no need to save again
			return true;
		} else if (rowExists === false) {
			return false;
		} else {
			if (kony.sync.insertEx(tx, tablename + kony.sync.originalTableName, originalvalues) === false) {
				return false;
			} else {
				return true;
			}
		}

	}

	rowExists = kony.sync.isrowexists(tx, tablename + kony.sync.originalTableName, wcs);
	if (rowExists === true) {
		//Original State is already saved, no need to save again
		return true;
	} else if (rowExists === false) {
		return false;
	} else if(rowExists === null){
		kony.table.insert(originalwcs, {
			key : kony.sync.mainTableChangeTypeColumn,
			value : "nil",
			comptype : "OR",
			openbrace : true
		});
		kony.table.insert(originalwcs, {
			key : kony.sync.mainTableChangeTypeColumn,
			value : "-1",
			comptype : "OR",
			closebrace : true
		});
		//table.insert(originalwcs,{key = kony.sync.mainTableChangeTypeColumn, value = "-1"})
		var record = kony.sync.getOriginalRow(tx, tablename, originalwcs, errorCallback);
		if (record === false) {
			return false;
		}
		/* This logic is not needed as when row is not already present in rollback table and 
			waiting for acknowledgement,it should not be backed up in original table because 
			rollbacking it would lead to inconsistency
			Note: This case generally occurs in persistent strategy when record waits for acknowledgement
		if (record === null) {
			//means record got changed but pending for acknowledgement
			kony.table.remove(originalwcs);
			kony.table.insert(originalwcs, {
				key : kony.sync.mainTableChangeTypeColumn,
				value : "-1",
				optype : "EQ",
				comptype : "OR",
				openbrace : true
			});
			kony.table.insert(originalwcs, {
				key : kony.sync.mainTableChangeTypeColumn,
				value : changetype,
				optype : "EQ",
				comptype : "OR"
			});
			kony.table.insert(originalwcs, {
				key : kony.sync.mainTableChangeTypeColumn,
				value : "90",
				optype : "EQ",
				comptype : "OR"
			});
			kony.table.insert(originalwcs, {
				key : kony.sync.mainTableChangeTypeColumn,
				value : "91",
				optype : "EQ",
				closebrace : true
			});
			record = kony.sync.getOriginalRow(tx, tablename, originalwcs, errorCallback);
			if (record === false) {
				return false;
			}
		}
		*/
		if (record !== null) {
			//Records not equal to nil means that it is not pending to be uploaded/acknowledged. So original state has to saved.
			record[kony.sync.originalTableChangeTypeColumn] = changetype;
			record[kony.sync.originalTableSyncVersionColumn] = record[kony.sync.mainTableSyncVersionColumn];
			record[kony.sync.mainTableChangeTypeColumn] = null;
			record[kony.sync.mainTableSyncVersionColumn] = null;
			//record[kony.sync.mainTableHashSumColumn] = null;
			record[kony.sync.mainTableHashSumColumn] = record[kony.sync.originalTableHashSumColumn];
			return kony.sync.insertEx(tx, tablename + kony.sync.originalTableName, record);
		}
	}
};

kony.sync.getOriginalRow = function (tx, tablename, wcs, errorcallback) {
	sync.log.trace("Entering kony.sync.getOriginalRow ");
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_select(query, null);
	kony.sync.qb_from(query, tablename);
	kony.sync.qb_where(query, wcs);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	var resultset = kony.sync.executeSql(tx, sql, params, errorcallback);
	if (!resultset) {
		return false;
	}
	if (resultset.rows.length === 1) {
		return kony.db.sqlResultsetRowItem(tx, resultset, 0);
	} else {
		return null;
	}
};

kony.sync.syncDropDatabase = function (dbList, successcallback, errorcallback) {
	sync.log.trace("Entering kony.sync.syncDropDatabase ");
	sync.log.info("Dropping database list: ", dbList);
	var isError = false;

	function single_transaction_success_callback(res) {
		sync.log.trace("Entering single_transaction_success_callback");
		sync.log.debug("Single Select callback result: ", res);
		if (!kony.sync.isNullOrUndefined(dbList) && !kony.sync.isNullOrUndefined(dbList[0]) && !kony.sync.isNullOrUndefined(dbList[0].dbname)){
			dbname = dbList[0].dbname;
			//var connection1 = kony.db.openDatabaseSync(dbname, "1.0", dbname, 5 * 1024 * 1024);
			//kony.db.transaction(connection1, single_transaction_callback, single_transaction_error_callback, single_transaction_success_callback);
			var connection1 = kony.sync.getConnectionOnly(dbname, dbname);
			kony.sync.startTransaction(connection1, single_transaction_callback, single_transaction_success_callback, single_transaction_error_callback);
		} else {
			sync.log.info("Deleting all binary files ");
			if(typeof(sync.util) !== "undefined") {
				sync.util.deleteallbinaryfiles();		
			}	
			sync.log.info("Reinitializing...");
			sync.init(successcallback, errorcallback);
		}
	}

	function single_transaction_callback(tx) {
		sync.log.trace("Entering single_transaction_callback");
		sync.log.info("Dropping database: ", dbList[0].dbname);
		for (var i in dbList[0].tableList) {
			var v = dbList[0].tableList[i];
			if(kony.sync.dropTable(tx, v)===false){
				isError = true;
				return;
			}
		}
		dbList = dbList.slice(1);
	}

	function single_transaction_error_callback(res) {
		sync.log.trace("Entering single_transaction_error_callback");
		sync.log.error("Sync Reset failed ", res);
		//kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getSyncResetFailed());
		kony.sync.isResetInProgress = false;
		kony.sync.callTransactionError(isError, errorcallback);
	}
	var dbname = dbList[0].dbname;
	var connection = kony.sync.getConnectionOnly(dbname, dbname);
	kony.sync.startTransaction(connection, single_transaction_callback, single_transaction_success_callback, single_transaction_error_callback);
};

kony.sync.dropTable = function (tx, tablename) {
	sync.log.trace("Entering kony.sync.dropTable ");
	sync.log.info("Dropping tablename ", tablename);
	var query = null;
	if ((kony.sync.getBackEndDBType() === kony.sync.dbTypeSQLCE)) {
		query = "Drop Table " + tablename;
	} else if ((kony.sync.getBackEndDBType() === kony.sync.dbTypeSQLLite)) {
		query = "Drop Table if exists " + tablename;
	}
	return kony.sync.executeSql(tx, query, null);
};

kony.sync.addUpdateToHistoryTable = function(tx, tablename, values){
	sync.log.trace("Entering kony.sync.addUpdateToHistoryTable ");
	var toUpdate = false;

	if(!kony.sync.trackIntermediateUpdates){	
		//frame primary key
		var scope = kony.sync.scopes[kony.sync.scopes.syncTableScopeDic[tablename]];
		var pkColumns = scope.syncTableDic[tablename].Pk_Columns;
		var wc = [];
		if(!kony.sync.isNullOrUndefined(pkColumns )){
			for (var j = 0;j < pkColumns.length; j++){
				if(!kony.sync.isNullOrUndefined(values[pkColumns[j]])){
					kony.table.insert(wc, {key:pkColumns[j], value:values[pkColumns[j]]});
				}
			}
		}
		//Get the row and check its changetype
		var query = kony.sync.qb_createQuery();
		kony.sync.qb_select(query, null);
        kony.sync.qb_from(query, tablename);
		kony.sync.qb_where(query, wc);
		kony.sync.qb_orderBy(query, [{key:kony.sync.historyTableReplaySequenceColumn, sortType:"desc"}]);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		var resultSet = kony.sync.executeSql(tx, sql, params);
		var lastRecord = null;
		var lastChangeType = null;
		if(resultSet===false){
			return false;
		}
		if(resultSet.rows.length > 0){
			lastRecord = kony.db.sqlResultsetRowItem(tx, resultSet, 0);
			lastChangeType = "" + lastRecord[kony.sync.historyTableChangeTypeColumn];
			if(lastChangeType === kony.sync.updateColStatus || lastChangeType === kony.sync.updateColStatusDU){
				toUpdate = true;
				//update the last row
				query = kony.sync.qb_createQuery();
				kony.sync.qb_set(query, values);
				kony.sync.qb_update(query, tablename);
				kony.table.insert(wc, {key:kony.sync.historyTableReplaySequenceColumn, value:lastRecord[kony.sync.historyTableReplaySequenceColumn]});
				kony.sync.qb_where(query, wc);
				query_compile = kony.sync.qb_compile(query);
				sql = query_compile[0];
				params = query_compile[1];
				return kony.sync.executeSql(tx, sql, params);				
			}
		}
	}
	if(!toUpdate){
		var query1 = kony.sync.qb_createQuery();
		kony.sync.qb_set(query1, values);
		kony.sync.qb_insert(query1, tablename);
		var query_compile1 = kony.sync.qb_compile(query1);
		var sql1 = query_compile1[0];
		var params1 = query_compile1[1];
		return kony.sync.executeSql(tx, sql1, params1);
	}
};
//  **************** End KonySyncDBOperations.js*******************


//  **************** Start KonySyncDownload.js*******************
if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}
if(typeof(sync)=== "undefined"){
	sync = {};
}

kony.sync.syncDownloadChanges = function (sname, dbname, onCompletion){
	sync.log.trace("Entering kony.sync.syncDownloadChanges ");
	kony.sync.onDownloadCompletion = onCompletion;
	kony.sync.resetbatchsessionglobals();
	kony.sync.PersisChangestobeDeleted = []; //Used for upload after delete in persistence strategey 
	sync.log.info("Download started for scope : ", sname);
	kony.sync.currentSyncScopeFilter = null;
	if(kony.sync.isValidJSTable(kony.sync.currentSyncConfigParams[kony.sync.filterParams])){
		var scopeFilter = kony.sync.currentSyncConfigParams[kony.sync.filterParams][kony.sync.currentScope[kony.sync.scopeName]];
		sync.log.info("scope Filter for " + kony.sync.currentScope[kony.sync.scopeName] + " is :" + scopeFilter);
		if (kony.sync.isNullOrUndefined(scopeFilter)) {
			kony.sync.getLastSynctime(sname, dbname, kony.sync.syncDownloadchangesGetLastSynctime);
		} else {
			//current_sync_scopefilter_index = 0;
			//kony.sync.syncDownloadbyFilter(current_sync_scopefilter_index);
			kony.sync.syncDownloadbyFilter();
		}
	} else {
		kony.sync.getLastSynctime(sname, dbname, kony.sync.syncDownloadchangesGetLastSynctime);
	}
};

//kony.sync.syncDownloadbyFilter = function (index) {
kony.sync.syncDownloadbyFilter = function () {
	sync.log.trace("Entering kony.sync.syncDownloadbyFilter ");
	var scopeFilter = kony.sync.currentSyncConfigParams[kony.sync.filterParams][kony.sync.currentScope[kony.sync.scopeName]];
	//if (index < scopeFilter.length) {
		var scopejsonfilter = {
			//"d" : scopeFilter[index]
			"d" : scopeFilter
		};
		var filtervaluejson = JSON.stringify(scopejsonfilter);
		sync.log.debug(filtervaluejson);
		kony.sync.currentSyncScopeFilter = scopeFilter; //scopeFilter[index];
		kony.sync.getLastSynctimeFilter(kony.sync.currentScope[kony.sync.scopeName], filtervaluejson, kony.sync.currentScope[kony.sync.scopeDataSource], kony.sync.syncDownloadchangesGetLastSynctime);
	/*} else {
		kony.sync.globalIsDownloadStarted = true;
		kony.sync.onDownloadCompletion(false, null);
	}*/
};

kony.sync.syncDownloadchangesGetLastSynctime = function(rowItem) {
	sync.log.trace("Entering kony.sync.syncDownloadchangesGetLastSynctime ");
    var lastsynctime = rowItem[0][kony.sync.metaTableSyncTimeColumn];
    sync.log.info("Last Sync Time with Server : " + lastsynctime);     
    var upgradeSchemaLastSyncTime = rowItem[0][kony.sync.metaTableSchemaUpgradeSyncTimeColumn];
    var serverChanges = null;
    var startTime = new Date();
	var isError = false;
	
	if(kony.sync.schemaUpgradeDownloadPending && kony.sync.isSchemaUpgradeTimeStampEmpty(lastsynctime)){
		sync.log.trace("Skipping download for schema upgrade as no data available");
		kony.sync.onDownloadCompletion(false);
		return;
	}
	
    function downloadNextBatch(tx) {
		sync.log.trace("Entering downloadNextBatch");
        var morechanges = serverChanges.d.__sync.moreChangesAvailable;
        var serverblob = serverChanges.d.__sync.serverblob;
		var pendingbatches = serverChanges.d.__sync.pendingBatches;
		kony.sync.currentSyncReturnParams[kony.sync.lastSyncTimestamp] = serverblob;
        if(kony.sync.isApplyChangesSync()){
			if(kony.sync.applyChanges(tx, kony.sync.currentScope, serverChanges)===false){
				isError = true;
				return;
			}
			if(kony.sync.postApplyChanges(tx,serverblob, morechanges, pendingbatches)===false){
				isError = true;
				return;
			}
        }else{
			kony.sync.applyChangesAsync(tx, kony.sync.currentScope, serverChanges, serverblob, morechanges);
        }    
    }

    function downloadCompleted() {
	sync.log.trace("Entering downloadCompleted");		
		if(kony.sync.globalIsDownloadStarted){
		//This means that download has failed and variable is reset;
			return;
		}
		var endTime = new Date();
		var diff = endTime.getTime() - startTime.getTime();
		sync.log.debug("Time Taken for Batch Insertion Download : " + diff);		
		kony.sync.batchInsertionTimer = kony.sync.batchInsertionTimer + diff;	
        var params = {};
		params.pending_batches = kony.sync.tonumber(kony.sync.syncPendingBatchesNo);
        params.serverinsertcount = "Server Insert Count :" + kony.sync.serverInsertCount;
        params.serverupdatecount = "Server Update Count :" + kony.sync.serverUpdateCount;
        params.serverinsertackcount = "Server Insert Ack Count :" + kony.sync.serverInsertAckCount;
        params.serverupdateackcount = "Server Update Ack Count :" + kony.sync.serverUpdateAckCount;
        sync.log.debug("@@@@@@" + params);
        kony.table.insert(kony.sync.currentSyncLog, params);
        var batchcontext = {};
        sync.log.debug(kony.sync.serverInsertCount);
        batchcontext[kony.sync.numberOfRowsDownloaded] = kony.sync.serverInsertCount + kony.sync.serverUpdateCount + kony.sync.serverDeleteCount;
        batchcontext[kony.sync.numberOfRowsInserted] = kony.sync.serverInsertCount;
        batchcontext[kony.sync.numberOfRowsUpdated] = kony.sync.serverUpdateCount;
        batchcontext[kony.sync.numberOfRowsDeleted] = kony.sync.serverDeleteCount;
		batchcontext[kony.sync.numberOfRowsFailedtoUpload] = kony.sync.serverFailedCount;
		batchcontext[kony.sync.failedRowInfo] = kony.sync.uploadSummary;
		batchcontext[kony.sync.objectLevelInfo] = kony.sync.objectLevelInfoMap;

		kony.sync.objectLevelInfoMap = {};
		if ((kony.sync.currentScope[kony.sync.syncStrategy] !== kony.sync.syncStrategy_OTA)) {
			batchcontext[kony.sync.numberOfRowsAcknowledged] = kony.sync.serverInsertAckCount + kony.sync.serverUpdateAckCount + kony.sync.serverDeleteAckCount;
			batchcontext[kony.sync.numberOfRowsInsertedAck] = kony.sync.serverInsertAckCount;
			batchcontext[kony.sync.numberOfRowsUpdatedAck] = kony.sync.serverUpdateAckCount;
			batchcontext[kony.sync.numberOfRowsDeletedAck] = kony.sync.serverDeleteAckCount;
		}
		batchcontext[kony.sync.pendingBatches] = kony.sync.tonumber(kony.sync.syncPendingBatchesNo);
		kony.sync.currentSyncReturnParams[kony.sync.batchContext] = batchcontext;
		kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onBatchProcessingSuccess], kony.sync.currentSyncReturnParams);
		if ((kony.sync.moreChangesAvailable)) {
			kony.sync.syncDownloadChanges(kony.sync.currentScope[kony.sync.scopeName], kony.sync.currentScope[kony.sync.scopeDataSource], kony.sync.onDownloadCompletion);
		} else {
			kony.sync.printScopeLog(kony.sync.currentSyncLog);
			delete kony.sync.currentSyncReturnParams[kony.sync.batchContext];

			//clearing sync order and then deleting records after upload
			if (kony.sync.isUploadErrorPolicyCOE(kony.sync.currentScope)) {
				if(kony.sync.currentScope[kony.sync.syncStrategy] !== kony.sync.syncStrategy_OTA ) {
					removeAfterUpload(0);
				} else {
					kony.sync.updateSyncOrderForScope(removeAfterUpload);
				}
			} else {
				removeAfterUpload(0);
			}
		}
	}
	
	//wrapper for removeafterupload
	function removeAfterUpload(code) {
		sync.log.trace("Entering removeAfterUpload");
		if(code===0){
			kony.sync.deleteRecordsAfterUpload(postDownloadProcessing);
		}else{
			//statement error
			if(code===kony.sync.errorCodeSQLStatement){
				kony.sync.downloadFailed(true);
			}
			//transaction error
			else{
				kony.sync.downloadFailed(false);
			}
		}
	}

	//This function should be called after finishing all post download tasks like removeafterupload
	function postDownloadProcessing(code) {
		sync.log.trace("Entering postDownloadProcessing");
		if(code===0){
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onDownloadSuccess], kony.sync.currentSyncReturnParams);
			/*if (!kony.sync.isNullOrUndefined(kony.sync.currentSyncScopeFilter)) {
				kony.sync.syncDownloadbyFilter(kony.sync.currentSyncScopeFilterIndex + 1);
			} else {*/
				kony.sync.globalIsDownloadStarted = true;
				kony.sync.onDownloadCompletion(false, null);
			//}
		}
		else{
			//statement error
			if(code===kony.sync.errorCodeSQLStatement){
				kony.sync.downloadFailed(true);
			}
			//transaction error
			else{
				kony.sync.downloadFailed(false);
			}
		}
	}

	//Used for upload after delete in persistence strategey , Adding all the merged records in delete queue
	function recsToBeDeletedAfterUploadForPersistentStrategy(serverChanges) {
		var scopename = kony.sync.currentScope[kony.sync.scopeName];
		if(!kony.sync.isNullOrUndefined(serverChanges.d) && !kony.sync.isNullOrUndefined(serverChanges.d.results)){
			for(var i in serverChanges.d.results){
				var tablename = serverChanges.d.results[i].__metadata.type;
				if(kony.sync.checkForDeleteAfterUpload(tablename,scopename) === true
					&& !kony.sync.isNullOrUndefined(serverChanges.d.results[i][kony.sync.mergedWithEIS])
					&& serverChanges.d.results[i][kony.sync.mergedWithEIS] === "1") {
						kony.sync.PersisChangestobeDeleted.push(serverChanges.d.results[i]);
				}
			}
			sync.log.info("Changes to be deleted after upload", kony.sync.PersisChangestobeDeleted);
		}
	}
	function downloadcallback(serverChangesResult) {
		sync.log.trace("Entering downloadcallback");
		var endTime = new Date();
		var diff = endTime.getTime() - startTime.getTime();
		sync.log.debug("Time Taken for Network Batch Download : " + diff);		
		kony.sync.batchDownloadTimer = kony.sync.batchDownloadTimer + diff;	
		serverChanges = serverChangesResult;
		
		sync.log.info("ServerChanges:", serverChanges);
		if(!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.removeAfterUpload])
			&& kony.sync.currentScope[kony.sync.syncStrategy] !== kony.sync.syncStrategy_OTA ) {
				recsToBeDeletedAfterUploadForPersistentStrategy(serverChanges);
		}
		if (!kony.sync.isNullOrUndefined(serverChanges.opstatus) && serverChanges.opstatus !== 0) {
			kony.sync.globalIsDownloadStarted = true;
			if (!kony.sync.isNullOrUndefined(serverChanges.d)) {
				kony.sync.onDownloadCompletion(true, kony.sync.getServerError(serverChanges.d, "download"));
			} else {
				kony.sync.onDownloadCompletion(true, kony.sync.getServerError(serverChanges));
			}
			return;
        }else if(kony.sync.isNullOrUndefined(serverChanges.d)){
			kony.sync.onDownloadCompletion(true, kony.sync.getServerError(serverChanges));
			return;
		}
        kony.sync.currentSyncReturnParams[kony.sync.serverDetails] = {};
        kony.sync.currentSyncReturnParams[kony.sync.serverDetails][kony.sync.hostName] = kony.sync.getServerDetailsHostName(serverChanges);
        kony.sync.currentSyncReturnParams[kony.sync.serverDetails][kony.sync.ipAddress] = kony.sync.getServerDetailsIpAddress(serverChanges);
        if ((serverChanges.d.error === "true")) {
			kony.sync.globalIsDownloadStarted = true;
            var hasResults = serverChanges.d.hasOwnProperty("results");
			if(hasResults && (serverChanges.d["results"].length > 0))   {
                applyDownloadBatchChangesToDBonError();
            } else  {
                kony.sync.onDownloadCompletion(true, kony.sync.getServerError(serverChanges.d, "download"));
            }
            return;
        }
        //If has uploadErrors for persistentSync incase of AbortOnError Sync Strategy
    	if(hasUploadErrors(serverChanges)) {
    		kony.sync.globalIsDownloadStarted = true;
        	var hasResults = serverChanges.d.hasOwnProperty("results");
    		if(hasResults && (serverChanges.d["results"].length > 0)) {
    			applyDownloadBatchChangesToDBonError();
    			//Update Sync Order for failed records
				updateVersionNumberOnPersistentDownload();
    		} else {
				var uploadErrorsInfoMap = getUploadErrorsInfoMap(serverChanges);
				//Update Sync Order for failed records
				updateVersionNumberOnPersistentDownload();
				kony.sync.onDownloadCompletion(true, uploadErrorsInfoMap);
			}
			return;
    	}

		var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, kony.sync.syncFailed);
		if(dbconnection===null){
			return;
		}
		if(kony.sync.isApplyChangesSync()){
			kony.db.transaction(dbconnection, downloadNextBatch, downloadNextBatchFailed, downloadCompleted);
        }else{
			kony.db.transaction(dbconnection, downloadNextBatch, downloadNextBatchFailed, downloadCompleted,{isCommitTransaction:false});
        }
    }

	function hasUploadErrors(serverChanges) {
		if( !kony.sync.isNullOrUndefined(serverChanges) && !kony.sync.isNullOrUndefined(serverChanges.d) && (serverChanges.d.error === "false")
							&& !kony.sync.isNullOrUndefined(serverChanges.d.__sync) && !kony.sync.isNullOrUndefined(serverChanges.d.__sync.UploadErrors)) {
			return true;
		}
		return false;
	}

	function getUploadErrorsInfoMap(serverChanges) {
		var failedRowsInfoMap = {};
		if( kony.sync.isNullOrUndefined(serverChanges) || kony.sync.isNullOrUndefined(serverChanges.d) ||
					kony.sync.isNullOrUndefined(serverChanges.d.__sync) || kony.sync.isNullOrUndefined(serverChanges.d.__sync.UploadErrors)) {
			return failedRowsInfoMap;
		}
		var errors = serverChanges.d.__sync.UploadErrors;
		var failedRowsInfo = [];
		var errorMap = null;   
		var serverDetails = {}; 		
		for(var i=0; i< errors.length; i++) {
			errorMap = 	errors[i];
			for(var key in errorMap) {
				var contextMap = errorMap[key];
				failedRowsInfo.push( {
    				key:contextMap.primaryKeys,
					type:contextMap.type,
					errorMessage:contextMap.errorMessage
				});
			}
		}
		failedRowsInfoMap[kony.sync.failedRowInfo] = failedRowsInfo;
		if (!kony.sync.isNullOrUndefined(serverChanges.d.server)) {
    		serverDetails[kony.sync.hostName] = serverChanges.d.server.hostName;
    		serverDetails[kony.sync.ipAddress] = serverChanges.d.server.ipAddress;
		}
		failedRowsInfoMap[kony.sync.serverDetails] = serverDetails; 
		return failedRowsInfoMap;	
	}

	function updateVersionNumberOnPersistentDownload() {
		sync.log.trace("Entering updateVersionNumberOnPersistentDownload ");
	    var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
	    var scopename = kony.sync.currentScope[kony.sync.scopeName];
	    var sql = null;
	    var params = null;
	    var query = null;
	    var query_compile = null;
	    kony.sync.getConnection(dbname, dbname, transactionCallback, successCallback, failureCallback);
	
	    function transactionCallback(tx) {
	        var versionNo = kony.sync.getseqnumber(tx, scopename);
	        if (!kony.sync.isNullOrUndefined(kony.sync.currentScope.ScopeTables)) {
	            for (var i = 0; i < kony.sync.currentScope.ScopeTables.length; i++) {
	                var syncTable = kony.sync.currentScope.ScopeTables[i];
	                if (kony.sync.isNullOrUndefined(syncTable)) {
	                    continue;
	                }
	                var tbname = syncTable.Name;
	                query = kony.sync.qb_createQuery();
	                kony.sync.qb_select(query, null);
	                kony.sync.qb_from(query, tbname + kony.sync.historyTableName);
	                query_compile = kony.sync.qb_compile(query);
	                sql = query_compile[0];
	                params = query_compile[1];
	                var resultSet = kony.sync.executeSql(tx, sql, params);
	                if (resultSet !== false) {
	                    var num_records = resultSet.rows.length;
	                    if (num_records > 0) {
	                        var versionMap = {};
	                        versionMap[kony.sync.historyTableSyncVersionColumn] = versionNo.versionnumber;
	                        var whereClause = [];
	                        kony.table.insert(whereClause, {
	                            key: kony.sync.historyTableChangeTypeColumn,
	                            value: "9%",
	                            optype: "NOT LIKE"
	                        });
	                        query = kony.sync.qb_createQuery();
	                        kony.sync.qb_update(query, tbname + kony.sync.historyTableName);
	                        kony.sync.qb_set(query, versionMap);
	                        kony.sync.qb_where(query, whereClause);
	                        query_compile = kony.sync.qb_compile(query);
	                        sql = query_compile[0];
	                        params = query_compile[1];
	                        if (kony.sync.executeSql(tx, sql, params) === false) {
	                            return;
	                        }
	                    }
	                } else {
	                    return;
	                }
	            }
	        }
	    }
	
	    function failureCallback() {
	    	sync.log.error(" Failed to update version number for failed rows on persistent download ");
	    }
	
	    function successCallback() {
	    	sync.log.trace(" Updated version number for failed rows on persistent download ");
	    } 
	}		    

    function applyDownloadBatchChangesToDBonError()	{
        var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, kony.sync.syncFailed);
		if(dbconnection===null){
			return;
		}
    	if(kony.sync.globalIsDownloadStarted)	{
            if(kony.sync.isApplyChangesSync()) {
            	if(hasUploadErrors(serverChanges)) {
            		kony.db.transaction(dbconnection, downloadNextBatch, currentBatchDownloadError, kony.sync.onDownloadCompletion(true, getUploadErrorsInfoMap(serverChanges)));
            	}else {
                	kony.db.transaction(dbconnection, downloadNextBatch, currentBatchDownloadError, kony.sync.onDownloadCompletion(true, kony.sync.getServerError(serverChanges.d, "download")));
                }
            } else {
				if(hasUploadErrors(serverChanges)) {
            		kony.db.transaction(dbconnection, downloadNextBatch, currentBatchDownloadError, kony.sync.onDownloadCompletion(true, getUploadErrorsInfoMap(serverChanges)),{isCommitTransaction:false});
            	} else {
					kony.db.transaction(dbconnection, downloadNextBatch, currentBatchDownloadError, kony.sync.onDownloadCompletion(true, kony.sync.getServerError(serverChanges.d, "download")),{isCommitTransaction:false});
				}
            }
        }
    }
    
    function currentBatchDownloadError()	{
        var serverError = null;
        if(!kony.sync.isNullOrUndefined(serverChanges.d))   {
             serverError = kony.sync.getServerError(serverChanges.d, "download");
        }
        var errorTable  = kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null);
        if(serverError === null)   {
            kony.sync.onDownloadCompletion(true, errorTable);
            return;
        }
        if(serverError && serverError.errorMessage && errorTable && errorTable.errorMessage) {
            serverError.errorMessage = serverError.errorMessage + " and " + errorTable.errorMessage;
        }
        kony.sync.onDownloadCompletion(true, serverError);
    }

    function downloadNextBatchFailed(){
		sync.log.trace("Entering downloadNextBatchFailed");
		kony.sync.downloadFailed(isError);
	}
	
	function scopeSettingsCallback(isInitialized) {
		sync.log.trace("Entering scopeSettingsCallback");
		kony.sync.konyDownloadChanges(lastsynctime, null, downloadcallback, isInitialized, upgradeSchemaLastSyncTime);
	}
	kony.sync.isScopeInitialized(kony.sync.currentScope[kony.sync.scopeName], kony.sync.currentScope[kony.sync.scopeDataSource], scopeSettingsCallback);
};

kony.sync.downloadFailed = function (dbError) {
	sync.log.trace("Entering kony.sync.downloadFailed ");
	kony.sync.gSyncFailed = true;
	kony.sync.globalIsDownloadStarted = true;
	//kony.sync.onDownloadCompletion(true, JSON.stringify(connection));
	sync.log.error("Scope Download Failed");
	if (!dbError) {
		kony.sync.onDownloadCompletion(true, kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
	}
	else{
		kony.sync.onDownloadCompletion(true, kony.sync.errorObject);
		kony.sync.errorObject = null;
	}
};


kony.sync.applyChanges = function (tx, currentScope, serverChanges) {
	sync.log.trace("Entering kony.sync.applyChanges ");
	sync.log.info("Applying Changes from Server................... ----------->");
	var results = serverChanges.d.results;
	if (!kony.sync.isNullOrUndefined(results)) {
		return kony.sync.applyChangesToDB({
			"tx" : tx,
			"currentScope" : currentScope,
			"results" : results,
			"startposition" : 0,
			"endposition" : results.length
		});
	}
};

kony.sync.postApplyChanges = function (tx, serverblob, moreChangesAvailable, pendingBatches) {
	sync.log.trace("Entering kony.sync.postApplyChanges ");
	if(kony.sync.clearChunkMetaData(tx, kony.sync.currentScope[kony.sync.scopeName])===false){
		return false;
	}
	if (!kony.sync.isNullOrUndefined(kony.sync.currentSyncScopeFilter)) {
		var scopejsonfilter = {
			"d" : kony.sync.currentSyncScopeFilter
		};
		var filtervaluejson = JSON.stringify(scopejsonfilter);
		if(kony.sync.setLastSyncTimeFilter(tx, kony.sync.currentScope[kony.sync.scopeName], filtervaluejson, null, serverblob)===false){
			return false;
		}
	} else {
		if(kony.sync.setLastSyncTime(tx, kony.sync.currentScope[kony.sync.scopeName], null, serverblob)===false){
			return false;
		}
	}
	//shrink memory execution
	kony.db.executeSql(tx, "PRAGMA shrink_memory");
	if (!kony.sync.isNullOrUndefined(moreChangesAvailable)) {
		var temp = moreChangesAvailable;
		temp = temp + "";
		temp = temp.toLowerCase();
		if ((temp === "true")) {
			//Enable below code if PendingBatches is implemented.
			if (!kony.sync.isNullOrUndefined(pendingBatches)) {
				kony.sync.syncPendingBatchesNo = pendingBatches;
			}
			kony.sync.moreChangesAvailable = true;
		} else {
			kony.sync.moreChangesAvailable = false;
			kony.sync.syncPendingBatchesNo = 0;
		}
	} else {
		kony.sync.moreChangesAvailable = false;
	}
	sync.log.info("more changes available " + kony.sync.moreChangesAvailable);
	if (!kony.sync.moreChangesAvailable) {
		//After Every successful Scope download completion we will check and update the Scope Settings to make that scope Initialized;
		if(kony.sync.updateScopeSettings(tx, kony.sync.currentScope[kony.sync.scopeName])===false){
			return false;
		}
		//After Every successful Scope download completion we will check if this download was for schema upgrade and mark it complete
		if(kony.sync.setSchemaUpgradeDownloadComplete(tx, kony.sync.currentScope[kony.sync.scopeName])===false){
			return false;
		}
	}
};

kony.sync.applyChangesAsync = function (tx, currentScope, serverChanges, serverblob, morechanges) {
	sync.log.trace("Entering kony.sync.applyChangesAsync ");
	sync.log.info("Applying Changes from Server................... ----------->");
	var results = serverChanges.d.results;
	var bbBatchSize = kony.sync.getAsyncDownloadBatchSize();
	var lastbatch = results.length % bbBatchSize;
	var noofloops = (results.length - lastbatch) / bbBatchSize;

	var context = {
		"tx" : tx,
		counter : 0,
		"currentScope" : currentScope,
		"results" : results,
		"noofloops" : noofloops,
		"lastbatch" : lastbatch,
		"serverblob" : serverblob,
		"morechanges" : morechanges
	};
	sync.log.debug("sending context");
	kony.api.executeAsync(kony.sync.applyChangesToDBAsync, context);
};

kony.sync.applyChangesToDBAsync = function (context) {
	sync.log.trace("Entering kony.sync.applyChangesToDBAsync ");
	sync.log.debug("point ******b : ", context);
	if (context.counter >= context.noofloops) {
		if (context.lastbatch > 0) {
			context.startposition = context.counter * kony.sync.getAsyncDownloadBatchSize();
			context.endposition = context.startposition + context.lastbatch;
			kony.sync.applyChangesToDB(context);
			context.counter = context.counter + 1;
			context.lastbatch = 0;
			kony.api.executeAsync(kony.sync.applyChangesToDBAsync, context);
		} else {
			kony.sync.postApplyChanges(context.tx, context.serverblob, context.morechanges);
			kony.db.commitTransaction(context.tx);
		}

	} else {
		context.startposition = context.counter * kony.sync.getAsyncDownloadBatchSize();
		context.endposition = context.startposition + kony.sync.getAsyncDownloadBatchSize();
		kony.sync.applyChangesToDB(context);
		context.counter = context.counter + 1;
		sync.log.debug("point ******c : ", context);
		kony.api.executeAsync(kony.sync.applyChangesToDBAsync, context);
	}
};

kony.sync.updateSyncVerisonNumberForFailedRow = function (tx, tablename, pkKey, pkValue) {
	sync.log.trace("Entering kony.sync.updateSyncVerisonNumberForFailedRow ");
	var versionNo = kony.sync.getseqnumber(tx, kony.sync.currentScope[kony.sync.scopeName]);
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_select(query, null);
	kony.sync.qb_from(query, tablename + kony.sync.historyTableName);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	var resultSet = kony.sync.executeSql(tx, sql, params);
	if (resultSet !== false) {
		if(resultSet.rows.length > 0) {
            var versionMap = {};
            versionMap[kony.sync.historyTableSyncVersionColumn] = versionNo.versionnumber;
            var whereClause = [];
            kony.table.insert(whereClause, {
                key: kony.sync.historyTableChangeTypeColumn,
                value: "9%",
                optype: "NOT LIKE"
            });
            kony.table.insert(whereClause, {
            	key:pkKey,
            	value:pkValue
            });
            query = kony.sync.qb_createQuery();
            kony.sync.qb_update(query, tablename + kony.sync.historyTableName);
            kony.sync.qb_set(query, versionMap);
            kony.sync.qb_where(query, whereClause);
            query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
        	params = query_compile[1];
        	if (kony.sync.executeSql(tx, sql, params) === false) {
            	return;
        	}	                        
		}
	}
}

kony.sync.applyChangesToBlobStoreDB = function(tx, tablename, row, binaryColumns, changeType) {
	var binaryColumnsLength = binaryColumns.length;
	var binaryColumnName = null;
	var blobIndex  = null;
	var konysyncBinaryField = null;
	var query = null;
	var query_compile = null;
	var sql = null;
	var params = null;
	var resultset = null;
	for(var i=0; i<binaryColumnsLength; i++) {
		binaryColumnName = binaryColumns[i];
		konysyncBinaryField = kony.sync.binaryMetaColumnPrefix + binaryColumnName;
		if(!kony.sync.isNullOrUndefined(row[binaryColumnName])) {
			//First try to get the blobref_binaryFieldColumn Value, if it exists then it is update/delete else create
			query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, [konysyncBinaryField]);
			kony.sync.qb_from(query, tablename);     
			var pkColumns = kony.sync.currentScope.syncTableDic[tablename].Pk_Columns;
			var pkwcs = [];
			for (var j = 0; j < pkColumns.length; j++){
				kony.table.insert(pkwcs,{
					key: pkColumns[j],
					value: row[pkColumns[j]],
					optype: "EQ"
				});
			}
			kony.sync.qb_where(query, pkwcs);			           
			query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
			params = query_compile[1];
			resultset = kony.sync.executeSql(tx, sql, params);
			//update the binary value
			//TODO - how to tackle this in case of onDemand.
			if(resultset !== false && resultset.rows.length > 0) {
				var rowItem = kony.db.sqlResultsetRowItem(tx, resultset, 0);
				if (!kony.sync.isNullOrUndefined(rowItem[konysyncBinaryField])) {
					blobIndex = rowItem[konysyncBinaryField];
					if(changeType !== "delete") {
						var isUpdateSuccessful = kony.sync.blobManager.updateBlob(tx, blobIndex,  row[binaryColumnName],
							function(err){
								kony.sync.errorObject = err;
								kony.sync.downloadFailed(false);
								return;
							});
						if(!isUpdateSuccessful) {
							kony.sync.downloadFailed(false);
						}
					}else {
						var isDeleteSuccessful = kony.sync.blobManager.deleteBlob(tx, blobIndex, function(err){
							kony.sync.errorObject = err;
							kony.sync.downloadFailed(false);
							return;
						});
						if(!isDeleteSuccessful) {
							kony.sync.downloadFailed(false);
						}
					}			
				}
			}
			//insert binary value
			else {
				var downloadPolicy = kony.sync.getDownloadPolicy(tablename, binaryColumnName);
				if(downloadPolicy === kony.sync.inline) {
					blobIndex = kony.sync.blobManager.saveBlob(tx, tablename, binaryColumnName, row[binaryColumnName],
						function (err) {
							kony.sync.downloadFailed(false);
						}
					);
				}
			}
			//in case of ondemand download, blobindex will not be disturbed.
			// So insert the url payload as-is.
			if(!kony.sync.isNullOrUndefined(blobIndex)) {
				delete row[binaryColumnName];
				row[konysyncBinaryField] = blobIndex;
			}			
		}
	}
};

kony.sync.applyChangesToDB = function (context) {
	sync.log.trace("Entering kony.sync.applyChangesToDB ");
	var tx = context.tx;
	var results = context.results;
	var startposition = context.startposition;
	var endposition = context.endposition;
	var newVersion = kony.sync.getseqnumber(tx, kony.sync.currentScope.ScopeName);
	var newVersionNo = newVersion.versionnumber;
	var j = null;
	var pk = null;
	var query_compile = null;
	var query = null;
	var sql = null;
	var params = null;
	var resultset = null;
	if(kony.sync.isNullOrUndefined(results)){
		return;
	}	
	for (var i = startposition; i < endposition; i++) {
		var row = results[i];
		var tablename = row.__metadata.type;

		if (kony.sync.isNullOrUndefined(kony.sync.objectLevelInfoMap[tablename])) {
			kony.sync.objectLevelInfoMap[tablename] = {};
			kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsDownloaded] = 0;
			kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInserted] = 0;
			kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdated] = 0;
			kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsDeleted] = 0;
			kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInsertedAck] = 0;
			kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdatedAck] = 0;
			kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsDeletedAck] = 0;
			kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsAcknowledged] = 0;
			kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsFailedtoUpload] = 0;
		} 
		
		if (kony.sync.objectLevelInfoMap[tablename][kony.sync.reconciledKeysKey] == null){
				kony.sync.objectLevelInfoMap[tablename][kony.sync.reconciledKeysKey] = [];
		}
		var changeType = row.__metadata.changeType;
		var values = [];
		var pkColumns = kony.sync.currentScope.syncTableDic[tablename].Pk_Columns;
		var pkwcs = [];
		var pkset = null;
		var pksetwcs = [];
		//var currentversion = kony.sync.getCurrentVersionNumber(tablename);
		var MergedWithEIS = row[kony.sync.mergedWithEIS];
		var versionNumber = row[kony.sync.mainTableSyncVersionColumn];
		versionNumber = kony.sync.tonumber(versionNumber);
		if(MergedWithEIS !== "1" && MergedWithEIS !== "0") {
			if(!kony.sync.isNullOrUndefined(kony.sync.scopes.syncScopeBlobInfoMap[tablename])){
				var binaryDataColumns = kony.sync.scopes.syncScopeBlobInfoMap[tablename][kony.sync.columns];
				kony.sync.applyChangesToBlobStoreDB(tx, tablename, row, binaryDataColumns, changeType);
			}							
		}
		if (kony.sync.isNullOrUndefined(kony.sync.queryStore[tablename + "purgeInsert"])) {
			values = kony.sync.removeprovisioncolumns(row, kony.sync.currentScope.syncTableDic[tablename].Columns, true);
		} else {
			values = kony.sync.removeprovisioncolumns(row, kony.sync.currentScope.syncTableDic[tablename].Columns, false);
		}
		if (MergedWithEIS !== "1" && MergedWithEIS !== "0") {
			if ((changeType === "update")) {
				//do purge logic here.
				var result = null;
			//#ifdef KONYSYNC_ANDROID
				result = kony.sync.purgeInsertEx(tx, tablename, values, false);
				if (result === false)
			//#else
				result = kony.sync.purgeInsertEx(tx, tablename, values, true);
				if (result === false){
					return false;
				}
				if (result !== false && result.rowsAffected === 0)
			//#endif
				{
					var _upgradeContext = kony.sync.schemaUpgradeContext;
					var _upgradeContextJSON = null;
					if(!kony.sync.isNullOrUndefined(_upgradeContext)){
						_upgradeContextJSON = JSON.parse(_upgradeContext);
					}
					//add the null columns update scenario
					if(kony.sync.isNullOrUndefined(_upgradeContextJSON) || kony.sync.isNullOrUndefined(_upgradeContextJSON[tablename]))
						values = kony.sync.removeprovisioncolumns(row, kony.sync.currentScope.syncTableDic[tablename].Columns, true, false);
					else//DSC scenario
						values = kony.sync.removeprovisioncolumns(row, kony.sync.currentScope.syncTableDic[tablename].Columns, true, true);

					if(!kony.sync.isNullOrUndefined(pkColumns)){
						for (j = 0; j < pkColumns.length; j++) {
							pk = pkColumns[j];
							if (!kony.sync.isNullOrUndefined(row[kony.sync.clientPKPrefix + pk])) {
								//pkset = pkset.." "..pk.."='"..row[pk].."'";
								if (kony.sync.isNullOrUndefined(pkset)) {
									pkset = [];
								}
								kony.table.insert(pkwcs, {
									key : pk,
									value : row[kony.sync.clientPKPrefix + pk]
								});
								pkset[pk] = row[pk];
								kony.table.insert(pksetwcs, {
									key : pk,
									value : row[pk]
								});
							} else {
								kony.table.insert(pkwcs, {
									key : pk,
									value : row[pk]
								});
								kony.table.insert(pksetwcs, {
									key : pk,
									value : row[pk]
								});
							}
						}
					}
					kony.table.insert(pkwcs, {
						key : kony.sync.mainTableChangeTypeColumn,
						value : "nil",
						optype : "EQ",
						comptype : "OR",
						openbrace : true
					});
					kony.table.insert(pkwcs, {
						key : kony.sync.mainTableChangeTypeColumn,
						value : -1,
						optype : "EQ",
						comptype : "OR",
						closebrace : true
					});
					/* kony.table.insert(pkwcs, {
					key: kony.sync.mainTableSyncVersionColumn,
					value: currentversion,
					optype : "EQ"
					});*/
					var originalwcs = kony.sync.CreateCopy(pksetwcs);
				    var hasInstanceInHistoryTable = kony.sync.checkForHistoryInstance(tx, tablename, values, originalwcs);
				    if( hasInstanceInHistoryTable === 0 ) {
				    	return false;
				    }
				    
					if(hasInstanceInHistoryTable === false) {
						if (!kony.sync.isNullOrUndefined(pkset)) {
							if(kony.sync.updateEx(tx, tablename, values, pksetwcs)===false){
								return false;
							}
	                	} else {
							if(kony.sync.updateEx(tx, tablename, values, pkwcs)===false){
								return false;
							}
	                	}
                	}

				    kony.sync.serverUpdateCount = kony.sync.serverUpdateCount + 1;
					// update if the user hasn't changed the record
					kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdated] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdated] + 1;
//					if(kony.sync.updateEx(tx, tablename, values, pkwcs)===false){
//						return false;
//					}
				} else {
					kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInserted] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInserted] + 1;
					kony.sync.serverInsertCount = kony.sync.serverInsertCount + 1;
				}
			} 
			else if ((changeType === "delete")) {
				values = kony.sync.removeprovisioncolumns(row, kony.sync.currentScope.syncTableDic[tablename].Columns, true, true);
				// delete the record if it hasn't been changed by the user
				if(!kony.sync.isNullOrUndefined(pkColumns)){
					for (j = 0; j < pkColumns.length; j++) {
						pk = pkColumns[j];
						if (!kony.sync.isNullOrUndefined(row[kony.sync.clientPKPrefix + pk])) {
							//pkwc = pkwc.." "..pk.."='"..row["Client_"..pk].."'";
							//pkset = pkset.." "..pk.."='"..row[pk].."'";
							if (kony.sync.isNullOrUndefined(pkset)) {
								pkset = [];
							}
							kony.table.insert(pkwcs, {
								key : pk,
								value : row[kony.sync.clientPKPrefix + pk]
							});
							pkset[pk] = row[pk];
							kony.table.insert(pksetwcs, {
								key : pk,
								value : row[pk]
							});
						} else {
							kony.table.insert(pkwcs, {
								key : pk,
								value : row[pk]
							});
						}
					}
				}
				kony.table.insert(pkwcs, {
					key : kony.sync.mainTableChangeTypeColumn,
					value : "nil",
					optype : "EQ",
					comptype : "OR",
					openbrace : true
				});
				kony.table.insert(pkwcs, {
					key : kony.sync.mainTableChangeTypeColumn,
					value : -1,
					optype : "EQ",
					closebrace : true
				});
				kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsDeleted] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsDeleted] + 1;
				kony.sync.serverDeleteCount = kony.sync.serverDeleteCount + 1;
				/*WARNING: Undefined method call for kony.sync.deleteEx*/
				if(kony.sync.removeEx(tx, tablename, pkwcs)===false){
					return false;
				}
			}
			kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsDownloaded] = 
					kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInserted] + 
					kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdated] + 
					kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsDeleted];
		} else {
			if(!kony.sync.isNullOrUndefined(kony.sync.scopes.syncScopeBlobInfoMap[tablename])){
				var binaryDataColumns = kony.sync.scopes.syncScopeBlobInfoMap[tablename][kony.sync.columns];
				var binaryColumn = null;
				for(var k=0; k<binaryDataColumns.length; k++) {
					binaryColumn = binaryDataColumns[k]; 
					delete row[binaryColumn]; 
				}
			}			
			var pkTable = {};
			var originalChangeType = row[kony.sync.mainTableChangeTypeColumn];
			if (kony.sync.isNullOrUndefined(originalChangeType)){
				originalChangeType = 1;
			}
			values = kony.sync.removeprovisioncolumns(row, kony.sync.currentScope.syncTableDic[tablename].Columns, true, true);
			//creating a map of reconciled primary keys
			var keyMap = {};
			var isAutoGenPkPresent = false;
			if(!kony.sync.isNullOrUndefined(pkColumns)){
				for (j = 0; j < pkColumns.length; j++) {
					pk = pkColumns[j];
					pkTable[pk] = row[pk]; //creating pk for uploadcontext
					if (!kony.sync.isNullOrUndefined(row[kony.sync.clientPKPrefix + pk])) {
						if (kony.sync.isNullOrUndefined(pkset)) {
							pkset = [];
						}
						kony.table.insert(pkwcs, {
							key : pk,
							value : row[kony.sync.clientPKPrefix + pk]
						});
						pkset[pk] = row[pk];
						kony.table.insert(pksetwcs, {
							key : pk,
							value : row[pk]
						});

						isAutoGenPkPresent = true;
						keyMap[pk] = {newpk:row[pk],oldpk:row[kony.sync.clientPKPrefix + pk]};
					} else {
						kony.table.insert(pkwcs, {
							key : pk,
							value : row[pk]
						});
						kony.table.insert(pksetwcs, {
							key : pk,
							value : row[pk]
						});
					}
				}
			}
			var originalwcs = kony.sync.CreateCopy(pksetwcs);
			if(isAutoGenPkPresent){
				kony.sync.objectLevelInfoMap[tablename][kony.sync.reconciledKeysKey].push(keyMap);
			}

			
			sync.log.debug("Inside MergedWithEis");

			var isError = false;
			var prevErrors = 0;
			if (!kony.sync.isNullOrUndefined(row.__metadata.intermediateErrors)) {
				prevErrors = row.__metadata.intermediateErrors.length;
			}
			//checking for error on continueonerror upload policy
			if (!kony.sync.isNullOrUndefined(row.__metadata.errorMessage)) {
				kony.sync.serverFailedCount = kony.sync.serverFailedCount + 1 + prevErrors;
				kony.sync.uploadSummary.push({
					key : pkTable,
					type : row.__metadata.type,
					errorMessage : row.__metadata.errorMessage,
					errorRootCause : row.__metadata.errorRootCause,
					intermediateErrors : row.__metadata.intermediateErrors
				});
				kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsFailedtoUpload] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsFailedtoUpload] + 1 + prevErrors;
				isError = true;
				if( ( kony.sync.currentScope[kony.sync.syncStrategy] !== kony.sync.syncStrategy_OTA ) && kony.sync.isUploadErrorPolicyCOE(kony.sync.currentScope)) {
					//Increase the version number of the failed row
					kony.sync.updateSyncVerisonNumberForFailedRow(tx, tablename, pk, row[pk]);
				}				
			}
			//checking for previous errors
			else if (prevErrors !== 0) {
				kony.sync.uploadSummary.push({
					key : pkTable,
					type : row.__metadata.type,
					errorMessage : null,
					errorRootCause : null,
					intermediateErrors : row.__metadata.intermediateErrors
				});
				kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsFailedtoUpload] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsFailedtoUpload] + prevErrors;
				kony.sync.serverFailedCount = kony.sync.serverFailedCount + prevErrors;
			}

			var settable = [];

			//remove row from history, original and main(in case of removeafterupload) tables for COE error upload policy if success
			var isRemoved = false;
			isRemoved = kony.sync.clearDataForCOE(tx,kony.sync.currentScope.ScopeName, tablename, pkwcs, pksetwcs, changeType, pkset, row[kony.sync.historyTableReplaySequenceColumn], values, isError);
			if(isRemoved===0){
				return false;
			}
			if (!kony.sync.isNullOrUndefined(pkset)) {
				/*update related tables foreign keys*/
				
				//reconciliation starts here .....
				//row implies record here,i inplies index of the record
				var _isError = kony.sync.reconcileForeignKeyForChildren(tx,pkset,pkwcs,tablename,row,i,endposition,results);
				if(_isError === 0)
					return false;
			}
			if (isError === false) {				
				kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsAcknowledged] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInsertedAck] + kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdatedAck] + kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsDeletedAck];

				//continue if removed to skip updates for same record
				if (isRemoved === true) {
					continue;
				}
				//if no error, change changetype to null in main table
				settable[kony.sync.mainTableChangeTypeColumn] = "nil";
			} else {

				//checking for error on continueonerror upload policy and making the reconciled values consistent in child tables
				if (!kony.sync.isNullOrUndefined(row.__metadata.errorMessage)){
					
					//querying the foreignkey values from from child table and replacing in setclause to maintain reconciled values properly in child table 
					selectClause = [];
					parentRelationshipMap = kony.sync.currentScope.syncTableDic[tablename+kony.sync.parentRelationshipMap];

					//onetomany relationships from parent table
					for(var tname in parentRelationshipMap){
						var relationshipAttributes = parentRelationshipMap[tname];
						var relationshipAttributes_length = relationshipAttributes.length;
						for(var k = 0;k<relationshipAttributes_length;k++){
							relationshipAttribute =relationshipAttributes[k];
							var columnName = relationshipAttribute["ChildObject_Attribute"];
							selectClause.push(columnName);
						}
							
					}

					synctable = kony.sync.currentScope.syncTableDic[tablename];
					ManyToOne = synctable.Relationships.ManyToOne;//manytone relationships
					//manytoone relationships in childtable
					if(!kony.sync.isNullOrUndefined(ManyToOne)){
						ManyToOne_length = ManyToOne.length;
						for(var k = 0;k<ManyToOne_length;k++){
							if(!kony.sync.isNullOrUndefined(ManyToOne[k].RelationshipAttributes))	{
								var relationshipAttributes = ManyToOne[k].RelationshipAttributes;
								for (var j = 0; j < relationshipAttributes.length; j++) {
									var columnName = relationshipAttributes[j].SourceObject_Attribute;
									selectClause.push(columnName);
								};
							}  
						}
					}

					//reverse relationships in childtable
					reverseRelationships = kony.sync.currentScope.reverseRelationships[tablename];
					for(var k in reverseRelationships){
						relationshipAttributes = reverseRelationships[k].RelationshipAttributes;
						for(var j = 0;j<relationshipAttributes.length;j++){
							var columnName = relationshipAttributes[j].SourceObject_Attribute;
							selectClause.push(columnName);
						}
					}

					
					if(selectClause.length != 0){
						query = kony.sync.qb_createQuery();
						kony.sync.qb_select(query,selectClause);
						kony.sync.qb_from(query,tablename);
						kony.sync.qb_where(query,pkwcs);//using the whereClause already generated
						query_compile =kony.sync.qb_compile(query);
						sql = query_compile[0];
						params = query_compile[1];				
						resultset = kony.sync.executeSql(tx, sql,params);//need to handle error callback if required

						//logic to process the resultset
						if(resultset.rows.length >= 1 ){
							var rowItem =kony.db.sqlResultsetRowItem(tx,resultset,0);
							for(var j=0;j<selectClause.length;j++){
								var columnName = selectClause[j];
								values[columnName] =rowItem[columnName]; 
							}
						}

					}
				}

				//updating history table to make relationship data consistent
				var whereClause = kony.sync.CreateCopy(pkwcs);
				//versionMap[kony.sync.historyTableSyncVersionColumn] = versionNo[ "versionnumber"];
				kony.table.insert(whereClause, {
                    key: kony.sync.historyTableReplaySequenceColumn,
                    value: row[kony.sync.historyTableReplaySequenceColumn]
                });
				if(kony.sync.updateEx(tx, tablename + kony.sync.historyTableName, values, whereClause)===false){
					return false;
				}

				//there is possibility that record is deleted by an earlier successful record, so insert it
				if(changeType !== "delete"){
					if (!kony.sync.isNullOrUndefined(pkset)) {
						whereClause = pksetwcs;
					} else {
						whereClause = pkwcs;
					}
					values[kony.sync.mainTableChangeTypeColumn] = originalChangeType;
					values[kony.sync.mainTableSyncVersionColumn] = newVersionNo + 1;

					query = kony.sync.qb_createQuery();
					kony.sync.qb_select(query, null);
					kony.sync.qb_from(query, tablename);
					kony.sync.qb_where(query, whereClause);
					query_compile = kony.sync.qb_compile(query);
					sql = query_compile[0];
					params = query_compile[1];
					resultset = kony.sync.executeSql(tx, sql, params);
					if (resultset !== false) {
						var num_records = resultset.rows.length;
						//updated if not deleted
						if (num_records > 0) {
							kony.sync.updateEx(tx, tablename, values, whereClause);
						} else {
							query = kony.sync.qb_createQuery();
							kony.sync.qb_set(query, values);
							kony.sync.qb_insert(query, tablename);
							query_compile = kony.sync.qb_compile(query);
							sql = query_compile[0];
							params = query_compile[1];
							if(kony.sync.executeSql(tx, sql, params)===false){
								//exit incase of SQL error
								return false;
							}
						}
					}
					else{
						//exit incase of SQL error
						return false;
					}
				}
				continue;
			}

            if (!kony.sync.isNullOrUndefined(pkset)) {
				/* clear dirty flag if not updated again*/
                kony.table.insert(pksetwcs, {
                    key: kony.sync.mainTableSyncVersionColumn,
                    value: versionNumber,
					optype : "LT_EQ",
					openbrace : true,
					comptype:"OR"
                });
				kony.table.insert(pksetwcs, { 
                    key: kony.sync.mainTableSyncVersionColumn,
                    value: "nil",
					closebrace : true
                });
                
                query = kony.sync.qb_createQuery();
                kony.sync.qb_update(query, tablename);
                kony.sync.qb_set(query, settable);
                kony.sync.qb_where(query, pksetwcs);
                query_compile = kony.sync.qb_compile(query);
                sql = query_compile[0];
                params = query_compile[1];
                if(kony.sync.executeSql(tx, sql, params)===false){
					return false;
				}
            } else {
                kony.table.insert(pkwcs, { 
                    key: kony.sync.mainTableSyncVersionColumn,
                    value: versionNumber,
					optype : "LT_EQ",
					openbrace : true,
					comptype :"OR"
                });
				kony.table.insert(pkwcs, { 
                    key: kony.sync.mainTableSyncVersionColumn,
                    value: "nil",
					closebrace : true
                });
                query = kony.sync.qb_createQuery();
                kony.sync.qb_update(query, tablename);
                kony.sync.qb_set(query, settable);
                kony.sync.qb_where(query, pkwcs);
                query_compile = kony.sync.qb_compile(query);
                sql = query_compile[0];
                params = query_compile[1];
                if(kony.sync.executeSql(tx, sql, params)===false){
					return false;
				}
            }
            if (changeType === "update") {
                // clear the dirty flag
				values[kony.sync.mainTableChangeTypeColumn] = "nil";
				values[kony.sync.mainTableSyncVersionColumn] = "nil";
				var hasInstanceInHistoryTable = kony.sync.checkForHistoryInstance(tx, tablename, values, originalwcs);
				if(hasInstanceInHistoryTable === 0){
					return false;
				}
				if(hasInstanceInHistoryTable === false){
					if (!kony.sync.isNullOrUndefined(pkset)) {
						if(kony.sync.updateEx(tx, tablename, values, pksetwcs)===false){
							return false;
						}
	                } else {
						if(kony.sync.updateEx(tx, tablename, values, pkwcs)===false){
							return false;
						}
	                }
                }
			} else  if(changeType === "delete"){
				if(!kony.sync.isNullOrUndefined(pkset)) {
                    kony.table.insert(pksetwcs, {
                        key: kony.sync.mainTableSyncVersionColumn,
                        value: versionNumber
                    });
                    if(kony.sync.removeEx(tx, tablename, pksetwcs)===false){
						return false;
					}
                } else {
                    kony.table.insert(pkwcs, {
                        key: kony.sync.mainTableSyncVersionColumn,
                        value: versionNumber
                    });
                    if(kony.sync.removeEx(tx, tablename, pkwcs)===false){
						return false;
					}
                }
			}
		}
	}
};

kony.sync.reconcileForeignKeyForChildren = function(tx,pksetwcs,pkwcs,tablename,parentRow,currentIndex,endposition,results){
	//populate setClause and whereClause for the child tables
	function populateMetaDataForReconciliation(_pkColumns,_row,_pkset,_pkwcs){
		if(!kony.sync.isNullOrUndefined(_pkColumns)){
			for (var j = 0; j < _pkColumns.length; j++) {
				var pk = _pkColumns[j];
				if (!kony.sync.isNullOrUndefined(_row[kony.sync.clientPKPrefix + pk])) {
					kony.table.insert(_pkwcs, {
						key : pk,
						value : _row[kony.sync.clientPKPrefix + pk]
					});
					_pkset[pk] = _row[pk];
				}
			}
		}					
	}				
	
	//get the childrow 
	var childRowFound = false;
	for(var j = currentIndex+1; j < endposition;j++){
	
		var childPkwcs = [];
		var childPkset = [];

		var childRow = results[j];
		var childMetaData = childRow.__metadata;
		var childTablename = childMetaData.type; 					
		var childPkColumns = kony.sync.currentScope.syncTableDic[childTablename].Pk_Columns;							
		var parentAttributes = [];
		var childAttributes = [];

		//Forward Relationships(OneToMany) reconcilation
		var OneToMany = kony.sync.currentScope.syncTableDic[tablename].Relationships.OneToMany;
		if(!kony.sync.isNullOrUndefined(OneToMany)){
			for(var k in OneToMany) {						
				if(OneToMany[k].TargetObject === childTablename){
					var currentRelation = OneToMany[k];
					//relation found add the SourceObject_Attributes and TargetObject_Attributes to corresponding arrays
					var relationshipAttributes = currentRelation.RelationshipAttributes;
					for(var l = 0;l<relationshipAttributes.length;l++){
						parentAttributes.push(relationshipAttributes[l].SourceObject_Attribute);
						childAttributes.push(relationshipAttributes[l].TargetObject_Attribute);
					}
					break;
				}
			}
		}
		
		//Forward Relationships(OneToOne) reconcilation
		var OneToOne = kony.sync.currentScope.syncTableDic[tablename].Relationships.OneToOne;
		if(!kony.sync.isNullOrUndefined(OneToOne)){
			for(var k in OneToOne) {
				if(OneToOne[k].TargetObject === childTablename){
					var currentRelation = OneToOne[k];
					//relation found add the SourceObject_Attributes and TargetObject_Attributes to corresponding arrays
					var relationshipAttributes = currentRelation.RelationshipAttributes;
					for(var l = 0;l<relationshipAttributes.length;l++){
						parentAttributes.push(relationshipAttributes[l].SourceObject_Attribute);
						childAttributes.push(relationshipAttributes[l].TargetObject_Attribute);
					}
					break;
				}							
			}
		}
		
		//Reverse Relationships(ManyToOne) reconcilation
		var ManyToOne = kony.sync.currentScope.reverseRelationships[tablename];
		if(!kony.sync.isNullOrUndefined(ManyToOne)){
			for(var k in ManyToOne) {
				if(ManyToOne[k].TargetObject === childTablename){
					var currentRelation = ManyToOne[k];
					//relation found add the SourceObject_Attributes and TargetObject_Attributes to corresponding arrays
					var relationshipAttributes = currentRelation.RelationshipAttributes;
					for(var l = 0;l<relationshipAttributes.length;l++){
						parentAttributes.push(relationshipAttributes[l].SourceObject_Attribute);
						childAttributes.push(relationshipAttributes[l].TargetObject_Attribute);
					}
					break;
				}							
			}
		}
		
		if(parentAttributes.length === 0)
			continue;
		else{
			var matchCount = 0;
			//identifying if the record is child of the parent record
			for(var k=0;k<parentAttributes.length;k++){
				var parentAttribute = parentAttributes[k];
				var childAttribute = childAttributes[k];
				//modifying the parent reconciled values in child record's non-reconciled field to make relationship data consistent
				if(childRow[kony.sync.clientPKPrefix + childAttribute] != undefined){
					if(childRow[kony.sync.clientPKPrefix + childAttribute] === parentRow[kony.sync.clientPKPrefix+parentAttribute])
						matchCount++;
					else
						break;
				}
			}
			//childrow found
			if(matchCount === parentAttributes.length){
				childRowFound = true;
				populateMetaDataForReconciliation(childPkColumns,childRow,childPkset,childPkwcs);
				
				//tx,pkset,pkwcs,tablename,parentRow,currentIndex
				kony.sync.reconcileForeignKeyForChildren(tx,childPkset,childPkwcs,childTablename,childRow,j,endposition,results);//childrowindex			
				
				if(kony.sync.reconcileForeignKey(tx, pksetwcs, pkwcs, tablename)===false){
					return false;
				}
				//reconcilation of child rows which are not part of changeset but exist in history table
				//it should be done after because we should not do disturb changeset records in history table
				reconcileChildrenInHistoryTable(tablename,pkwcs,pksetwcs);
				
				//modifying the parent reconciled values in child record's non-reconciled field to make relationship data consistent
				for(var k=0;k<parentAttributes.length;k++){
					var parentAttribute = parentAttributes[k];
					var childAttribute = childAttributes[k];
					if(childRow[kony.sync.clientPKPrefix + childAttribute] != undefined)
						childRow[kony.sync.clientPKPrefix + childAttribute] = parentRow[parentAttribute]; 
				}										
			}										
		}								
	}			
	
	if(childRowFound === false){
		var _isError = reconcileChildrenInHistoryTable(tablename,pkwcs,pksetwcs);
		if(_isError === 0){
			sync.log.error("error in reconciliation of records of history table not in changeset with parent "+tablename +" with setclause "+JSON.stringify(pksetwcs)+" and whereClause "+JSON.stringify(pkwcs));
			return 0;
		}
		if(kony.sync.reconcileForeignKey(tx, pksetwcs, pkwcs, tablename)===false){
			sync.log.error("error in reconciliation of records with parent "+tablename +" with setclause "+JSON.stringify(pksetwcs)+" and whereClause "+JSON.stringify(pkwcs));
			 return 0;
		 }	
	}
	//reconcileChildrenInHistoryTable(tablename,pkwcs,pksetwcs);
	// no need to check if this is a error record because as this call is made by non-error records
	//reconcile records that are not part of server response inside device db ( history table records)
	function  reconcileChildrenInHistoryTable(parentTableName,parentwcs,parentSetClause){
		
		function reconcileUpdateHelper(childTablename,childSetClause,childwcs){
			//update history table 
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_update(query, childTablename + kony.sync.historyTableName);
			kony.sync.qb_set(query, childSetClause);
			kony.sync.qb_where(query, childwcs);
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			if(kony.sync.executeSql(tx, sql, params)===false){
				sync.log.error("reconcilation: error in updating records of "+childTablename + "" + kony.sync.historyTableName+" with whereClause "+ JSON.stringify(childwcs) +" and setclause "+childSetClause);
				return 0;
			}							
			
			//update main table
			kony.sync.qb_update(query, childTablename);
			query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
			params = query_compile[1];
			if (kony.sync.executeSql(tx, sql, params) === false) {
				sync.log.error("reconcilation: error in updating records of "+childTablename +" with whereClause "+ JSON.stringify(childwcs) +" and setclause "+childSetClause);
				return 0;
			}
			
		}
		
		function fetchChildHistoryTableRows(childTablename,childwcs){
			//select the records
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query,null);
			kony.sync.qb_from(query,childTablename + kony.sync.historyTableName);
			kony.sync.qb_where(query, childwcs);
			
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var resultset = kony.sync.executeSql(tx, sql, params);
			return resultset;
		}
		
		//fill the current child whereClause and childSetClause
		function populateChildQueryParams(relationshipAttributes,childwcs,childSetClause,childTablename,parentTableName){
			for (var i = 0; i < relationshipAttributes.length; i++) {                                             
				var parentPk = relationshipAttributes[i].SourceObject_Attribute;
				var childPk = relationshipAttributes[i].TargetObject_Attribute;
				var whereClauseValue = null;
				
				//need to set only the parentSetClause Columns not all the columns in relationshipattributes set
				if(parentSetClause[parentPk] != undefined){
					childSetClause[childPk] = parentSetClause[parentPk];
				}
				for(var j = 0;j< parentwcs.length;j++){
					var currentObject = parentwcs[j];
					if(currentObject.key == parentPk){
						whereClauseValue = currentObject.value;
						break;
					}
				}
				if(whereClauseValue === null){
					sync.log.error("reconcilation:error in forming whereClause for "+childTablename + " having foreign key "+childPk+" with parent table "+parentTableName+" primary key "+parentPk);
					return 0;
				}
				kony.table.insert(childwcs, {
					key : childPk,
					value : whereClauseValue
				});
					
			}							
		}

		//make new whereClause to go recursive
		function populateChildWCSParams(rowItem,childPkColumns,newWhereClause,childTablename){					
			for(var i=0;i<childPkColumns.length;i++){
				var columnName = childPkColumns[i];
				var columnValue = rowItem[columnName];
				if(columnName === undefined){
					sync.log.error("reconcilation:error in creating where clause for "+childTablename + " with childrow "+JSON.stringify(rowItem));
					return 0;
				}
				kony.table.insert(newWhereClause, {
						key : columnName,
						value : columnValue
				});
			}
		}
		
		function checkIfParentColumnsArePrimaryKeys(parentRelationshipAttributes,childPkColumns){
			var columnCount = 0;
			for(var i=0;i<parentRelationshipAttributes.length;i++){
				for(var j =0;j<childPkColumns.length;j++){
					if(parentRelationshipAttributes[i].TargetObject_Attribute === childPkColumns[j]){
						columnCount++;
						break;
					}
				}
			}
			return columnCount;
		}
		//entry here
		function reconcileForRelation(RelationShipSet,parentTableName){
			if(!kony.sync.isNullOrUndefined(RelationShipSet)){
				for(var k in RelationShipSet) {						
					var currentRelation = RelationShipSet[k];
					var childTablename = currentRelation.TargetObject;
					var childwcs = [];// all foreign key columns
					var childSetClause = {};
					
					var parentRelationshipAttributes = currentRelation.RelationshipAttributes;
					var childPkColumns = kony.sync.currentScope.syncTableDic[childTablename].Pk_Columns;
		
					var _isError = populateChildQueryParams(parentRelationshipAttributes,childwcs,childSetClause,childTablename,parentTableName);//child tablename and parent tablename are passed only for error handling
					if(_isError === 0)
						return _isError;
					
					//call child only if parent columns are part of primary key set
					var columnCount = checkIfParentColumnsArePrimaryKeys(parentRelationshipAttributes,childPkColumns);
					if(columnCount === parentRelationshipAttributes.length){
						// newWhereClause to goto parent grand child
						var newWhereClause = [];
						
						//fetch rows from child history table
						var childresultset = fetchChildHistoryTableRows(childTablename,childwcs);
						if(childresultset === false){
							sync.log.error("Reconciliation:error in fetching records from "+ childTablename +" history table with parent "+ parentTableName);
							return 0;
						}
						else{
							for(var m=0;m<childresultset.rows.length;m++){
								var rowItem = kony.db.sqlResultsetRowItem(tx, childresultset,0);											
								var _isError = populateChildWCSParams(rowItem,childPkColumns,newWhereClause,childTablename);
								if(_isError === 0)
									return _isError;
								
								//make recursive call
								_isError = reconcileChildrenInHistoryTable(childTablename,newWhereClause,childSetClause);		
								if(_isError === 0)
									return _isError;
							}
						}																				
					}
					var _isError = reconcileUpdateHelper(childTablename,childSetClause,childwcs);				
					if(_isError === 0)
					   return _isError;
				}
			}							
		}
		//Forward Relationships(OneToMany) reconcilation
		var OneToMany = kony.sync.currentScope.syncTableDic[parentTableName].Relationships.OneToMany;
		var _isError = reconcileForRelation(OneToMany,parentTableName);
		if(_isError === 0)
			return _isError;
		
		//Forward Relationships(OneToOne) reconcilation
		var OneToOne = kony.sync.currentScope.syncTableDic[parentTableName].Relationships.OneToOne;
		var _isError = reconcileForRelation(OneToOne,parentTableName);
		if(_isError === 0)
			return _isError;
		
		//Reverse Relationships(ManyToOne) reconcilation
		var ManyToOne = kony.sync.currentScope.reverseRelationships[parentTableName];
		var _isError = reconcileForRelation(ManyToOne,parentTableName);
		if(_isError === 0)
			return _isError;

	}
}

kony.sync.checkForHistoryInstance = function(tx, tablename, values, whereClause){
	//var sql = "select count(*) from " + tablename + kony.sync.historyTableName + " " + wcs;
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);
				kony.sync.qb_from(query, tablename + kony.sync.historyTableName);
				kony.sync.qb_where(query, whereClause);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	var resultSet = kony.sync.executeSql(tx, sql, params);
	if(resultSet === false){
		return 0;
	}

	if(resultSet.rows.length === 0){
		return false;
	}

	return true;
}

//This function removes successful uploads mostly in case of dummy updates
kony.sync.deleteRecordsAfterUpload = function (callback) {
	sync.log.trace("Entering kony.sync.deleteRecordsAfterUpload ");
	var isError = false;
	
	if ( (kony.sync.OTAChangestobeDeleted.length === 0 && kony.sync.PersisChangestobeDeleted.length === 0 )
		|| kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.removeAfterUpload])) {
		callback(0);
		return;
	}
	//Concatinating both OTA uploadqueue and persistent delete queue
	var results = kony.sync.OTAChangestobeDeleted.concat(kony.sync.PersisChangestobeDeleted);
	var length = results.length;
	var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
	var scopename = kony.sync.currentScope[kony.sync.scopeName];
	kony.sync.getConnection(dbname, dbname, myTransactionCallBack, mySucessCallBack, myErrorCallBack);
	function myTransactionCallBack(tx) {
		sync.log.trace("Entering myTransactionCallBack");
		for (var i = 0; i < length; i++) {
			var row = results[i];
			var tablename = row.__metadata.type;
			//checking for removeafteruploadpolicy
			if (kony.sync.checkForDeleteAfterUpload(tablename, scopename) !== true) {
				continue;
			}

			//skipping if error
			if (!kony.sync.isNullOrUndefined(row.__metadata.errorMessage)){
				continue;
			}	

			var pkColumns = kony.sync.currentScope.syncTableDic[tablename].Pk_Columns;
			var pkwcs = [];
			for (var j = 0; j < pkColumns.length; j++){
				kony.table.insert(pkwcs,{
					key: pkColumns[j],
					value: row[pkColumns[j]],
					optype: "EQ"
				});
			}
			//Get records to be deleted from history table;
			var query = kony.sync.qb_createQuery();
						kony.sync.qb_select(query, null);
						kony.sync.qb_from(query, tablename + kony.sync.historyTableName);
						kony.sync.qb_where(query, pkwcs);
						kony.sync.qb_distinct(query);
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var resultSet = kony.sync.executeSql(tx, sql, params);
			//do not delete from main table if there is some instance in history table
			if(resultSet === false){
				isError = true;
				return;
			}
			if(resultSet.rows.length!==0){
				continue;
			}
			query = kony.sync.qb_createQuery();
					kony.sync.qb_delete(query, tablename);
					kony.sync.qb_where(query, pkwcs);
			query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
			params = query_compile[1];
			if(kony.sync.executeSql(tx, sql, params)===false){
				isError = true;
				return;
			}
		}	
	}
	
	function myErrorCallBack(){
		sync.log.trace("Entering deleteRecordsAfterUpload myErrorCallBack");
		kony.sync.OTAChangestobeDeleted=[];
		kony.sync.PersisChangestobeDeleted = [];
		if(isError){
			callback(kony.sync.errorCodeSQLStatement);
		}
		else{
			callback(kony.sync.errorCodeTransaction);
		}
	}
	
	function mySucessCallBack(){
		sync.log.trace("Entering deleteRecordsAfterUpload mySucessCallBack");
		kony.sync.OTAChangestobeDeleted=[];
		kony.sync.PersisChangestobeDeleted = [];
		callback(0);
	}
};
//  **************** End KonySyncDownload.js*******************


//  **************** Start KonySyncErrors.js*******************
if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}
if(typeof(sync)=== "undefined"){
	sync = {};
}


//error codes
kony.sync.errorCodeInvalidDataType=7001;
kony.sync.errorCodeMandatoryAttribute=7002;
kony.sync.errorCodePrimaryKeyNotSpecified =7003; //Primary Key CategoryID not specified in updating an item in Categories
kony.sync.errorCodeScopeLoading	= 7004;//"Scopes loading failed",
kony.sync.errorCodeSyncReset= 7005;//"Sync Reset failed",
kony.sync.errorCodeRegisterDevice =	7006 ;	//"Register device failed",
kony.sync.errorCodeSessionBreak = 7007;//"Session breaks since user scope failure",
kony.sync.errorCodeSessionInProgress = 7008; //"Session in progress",
kony.sync.errorCodeNoDataWithPrimaryKey = 7009; //No data with specified primary key found in SyncObject Categories
kony.sync.errorCodeTransaction = 7010;//"Transaction failed"
kony.sync.errorCodeDbConnection = 7011; //"Database connection closed"
kony.sync.errorCodeMarkForUpload = 7012; // "ERROR: [KONYSYNC] Record does not exist on server, mark it for upload before updating/deleting it"
kony.sync.errorCodeDeferredUpload = 7013; // "Error during Deferred Upload Transaction"
kony.sync.errorCodeReferentialIntegrity = 7014; //"Error because of referential integrity failure"
kony.sync.errorCodeLengthValidationFailed = 7015;//Length exceeds than specified limit
kony.sync.errorCodeDuplicatePrimaryKey = 7016;
kony.sync.errorCodeInputTableNotDefined = 7017;
kony.sync.errorCodeMaliciousType = 7018;
kony.sync.errorCodeSQLStatement = 7019;
kony.sync.errorCodeUploadFailed = 7020;
kony.sync.errorCodeDownloadFailed = 7021;
kony.sync.errorCodeSyncError = 7022;
kony.sync.errorCodeParseError = 7023;
kony.sync.errorCodeChunking = 7024;
kony.sync.errorCodeNetworkCallCancelled = 7025;
kony.sync.errorCodeMetatableError = 7026;
kony.sync.errorCodeNullValue = 7027;
kony.sync.errorUnknown = 7777;
kony.sync.errorCodeUnknownServerError = 8888;
kony.sync.errorCodeBlobFileNotCreated = 9000;
kony.sync.errorCodeInvalidColumnType = 9001;
kony.sync.errorCodeEmptyOrNullBase64 = 9002;
kony.sync.errorCodeBlobFileDoesnotExist = 9003;
kony.sync.errorCodeBlobInvalidState = 9004;
kony.sync.errorCodeDownloadAlreadyInQueue = 9005;
kony.sync.errorCodeBlobInvalidStateForDelete = 9006;
kony.sync.errorCodeBlobInvalidStateForUpdate = 9007;
kony.sync.errorCodeInvalidPksGiven = 9008;


//Server ErrorCodes
kony.sync.servercodes = {};
kony.sync.servercodes.appVersionNotLatest = "SY3001E";

kony.sync.getSessionInProgressError = function() {
	sync.log.trace("Entering kony.sync.getSessionInProgressError ");
   return kony.sync.getErrorTable(kony.sync.errorCodeSessionInProgress,kony.sync.getErrorMessage(kony.sync.errorCodeSessionInProgress),null);	
};

kony.sync.getScopeLoadingFailed = function() {
	sync.log.trace("Entering kony.sync.getScopeLoadingFailed ");
	return kony.sync.getErrorTable(kony.sync.errorCodeScopeLoading, kony.sync.getErrorMessage(kony.sync.errorCodeScopeLoading),null);
};
kony.sync.getSyncResetFailed = function() {
	sync.log.trace("Entering kony.sync.getSyncResetFailed ");
	return kony.sync.getErrorTable(kony.sync.errorCodeSyncReset,kony.sync.getErrorMessage(kony.sync.errorCodeSyncReset),null);
};
kony.sync.getSyncRegisterationFailed = function() {
	sync.log.trace("Entering kony.sync.getSyncRegisterationFailed ");
    return kony.sync.getErrorTable(kony.sync.errorCodeRegisterDevice,kony.sync.getErrorMessage(kony.sync.errorCodeRegisterDevice),null);
};
kony.sync.getScopeFailed = function() {
	sync.log.trace("Entering kony.sync.getScopeFailed ");
	return kony.sync.getErrorTable(kony.sync.errorCodeSessionBreak,kony.sync.getErrorMessage(kony.sync.errorCodeSessionBreak),null);
};

kony.sync.getServerError = function(ServerReport, moduleType) {
	sync.log.trace("Entering kony.sync.getServerError ");
	var serverDetails = {};
	
    if (!kony.sync.isNullOrUndefined(ServerReport)) {
	
		if(!kony.sync.isNullOrUndefined(ServerReport.server)){
			serverDetails[kony.sync.hostName] = ServerReport.server.hostName;
			serverDetails[kony.sync.ipAddress] = ServerReport.server.ipAddress;
		}
		
		//error occurred at application layer
		if (!kony.sync.isNullOrUndefined(ServerReport.msg )) {
			var errorCode = ServerReport.errcode;
			if (kony.sync.isNullOrUndefined(ServerReport.errcode)) { //should not hit this ideally
				if (moduleType === "upload") {
					errorCode = kony.sync.errorCodeUploadFailed;
				} else if (moduleType === "download") {
					errorCode = kony.sync.errorCodeDownloadFailed;
				} else {
					errorCode = kony.sync.errorCodeUnknownServerError;
				}
			}
			var otherParams = {};
			if(errorCode === kony.sync.servercodes.appVersionNotLatest){
				otherParams.newApplicationVersion = ServerReport.newapplicationversion;
				otherParams.oldApplicationVersion = ServerReport.oldapplicationversion;
			}
			if(kony.sync.isMbaasEnabled && !kony.sync.isNullOrUndefined(ServerReport.mfcode)) {
				otherParams.mfcode = ServerReport.mfcode;
				ServerReport.msg = getAuthErrorMessage(ServerReport.mfcode);
			}
			return kony.sync.getErrorTable(errorCode, ServerReport.msg, ServerReport.stacktrace, serverDetails, otherParams);
        }
		
		//error occurred at network layer
        if (!kony.sync.isNullOrUndefined(ServerReport.errmsg )) {
            return kony.sync.getErrorTable(ServerReport.opstatus, ServerReport.errmsg, null, serverDetails);
        }
    }
    return kony.sync.getErrorTable(kony.sync.errorCodeUnknownServerError, "Unknown Error from the server", ServerReport, serverDetails);
};

kony.sync.getErrorTable = function(errorCode, errorMessage, errorInfo, serverDetails, otherParams) {
	sync.log.trace("Entering kony.sync.getErrorTable ");
	var errorTable = {};
	errorTable.errorCode = errorCode;
	errorTable.errorMessage = errorMessage;
	errorTable.errorInfo = errorInfo;
	errorTable[kony.sync.serverDetails] = serverDetails;
	for(var i in otherParams){
		errorTable[i] = otherParams[i];
	}
	if(!kony.sync.isNullOrUndefined(errorInfo)){
		if(!kony.sync.isNullOrUndefined(errorInfo[kony.sync.errorInfoDatabaseError])){
			if(!kony.sync.isEmptyString(errorInfo[kony.sync.errorInfoDatabaseError])){
				errorTable.errorMessage = errorMessage + ". \n" + "System Error:" + errorInfo[kony.sync.errorInfoDatabaseError].message;
			}
		}
	}
	return errorTable;
};

kony.sync.getErrorMessage = function(errorCode,objectName, attributeName) {
	sync.log.trace("Entering kony.sync.getErrorMessage ");
	var errorMap = {};
	errorMap[kony.sync.errorCodeMandatoryAttribute] = "Mandatory attribute " + attributeName + " is missing for the SyncObject " + objectName + ".", 
	errorMap[kony.sync.errorCodeScopeLoading] = "Scopes loading failed.",
	errorMap[kony.sync.errorCodeSyncReset] = "Sync Reset failed.",
	errorMap[kony.sync.errorCodeRegisterDevice] = "Register device failed.",
	errorMap[kony.sync.errorCodeSessionBreak] = "Session breaks since user scope failure.",
	errorMap[kony.sync.errorCodeSessionInProgress] = "Session in progress.",
	errorMap[kony.sync.errorCodeTransaction] = "Transaction failed.",
	errorMap[kony.sync.errorCodeDbConnection] = "Error occurred while establishing a Database connection.",
	errorMap[kony.sync.errorCodeMarkForUpload] = "Record does not exist on server, mark it for upload before updating/deleting it.",
	errorMap[kony.sync.errorCodeDeferredUpload] = "Error during Deferred Upload Transaction.",
	errorMap[kony.sync.errorCodeNoDataWithPrimaryKey] = "No data with specified primary key found in SyncObject " + objectName + ".",
	errorMap[kony.sync.errorCodeDuplicatePrimaryKey] = "Primary Key " + attributeName +" already exists in table " + objectName + ". Please give different value of primary key.",
	errorMap[kony.sync.errorCodeInputTableNotDefined] = "Input Table not defined",	
	errorMap[kony.sync.errorCodeMaliciousType] = "Malicious value '" + attributeName + "' given for attribute " + objectName + ".",
	errorMap[kony.sync.errorCodeSQLStatement] = "Some error occurred in executing SQL statement",
	errorMap[kony.sync.errorCodeSyncError] = "Error occurred while syncing one or more scopes" ,
	errorMap[kony.sync.errorCodeDownloadFailed] = "Error occurred in Downloading changes from Sever" ,
	errorMap[kony.sync.errorCodeUploadFailed] = "Error occurred in Uploading changes to Server";
	errorMap[kony.sync.errorUnknown] = "The following error occurred while performing " + objectName + " : \"" + attributeName + "\"." + " Possible reasons can be sync.init may not have been invoked."; 
	errorMap[kony.sync.errorCodeParseError] = "Following error occurred while parsing " + JSON.stringify(objectName) + " : \"" + attributeName + "\"";
	errorMap[kony.sync.errorCodeChunking] = "Error occurred while downloading one or more chunks.";
	errorMap[kony.sync.errorCodeMetatableError] = "Meta tables did not get created successfully because of some unknown problem in sync.init, please invoke sync.reset";
	errorMap[kony.sync.errorCodeNullValue] = "Null values passed in input array";
	errorMap[kony.sync.errorCodeBlobFileNotCreated] = "Error occurred when creating a file";
	errorMap[kony.sync.errorCodeInvalidColumnType] = "Expecting an array and got type "+objectName+ "instead for columns";
	errorMap[kony.sync.errorCodeEmptyOrNullBase64] = "Empty or Null value should not be passed for Base64";
	errorMap[kony.sync.errorCodeBlobFileDoesnotExist] = "Request file doesn't exist";
	errorMap[kony.sync.errorCodeBlobInvalidState] = "BlobFile in invalid state. Could not upload.";
	errorMap[kony.sync.errorCodeDownloadAlreadyInQueue] = "Binary download already requested";
	errorMap[kony.sync.errorCodeBlobInvalidStateForDelete] = "Blob cannot be deleted in "+objectName+" state";
	errorMap[kony.sync.errorCodeBlobInvalidStateForUpdate] = "Blob cannot be updated in "+objectName+" state";
	errorMap[kony.sync.errorCodeInvalidPksGiven] = "Received invalid pks for fetch binary";


	if(errorMap[errorCode]===null){
		return "Some unknown client error";
	}	
	else{
		return errorMap[errorCode];
	}	
	
};
kony.sync.getInvalidDataTypeMsg = function(objectName, attributeName, expectedType, actualType){
	sync.log.trace("Entering kony.sync.getInvalidDataTypeMsg ");
	return "Invalid data type for the attribute " + attributeName + " in " + objectName + ".\nExpected:\"" + expectedType + "\"\nActual:\"" + actualType + "\"";

};

kony.sync.getPrimaryKeyNotSpecifiedMsg = function (primaryKey,operation,table) {
	sync.log.trace("Entering kony.sync.getPrimaryKeyNotSpecifiedMsg ");
	return "Primary Key " + primaryKey + " not specified in " + operation + " an item in " + table + ".";
};

kony.sync.getReferetialIntegrityerrMessg = function (sourceAttribute,TargetAttributes,TargetValues){
	sync.log.trace("Entering kony.sync.getReferetialIntegrityerrMessg ");
	//return  "Referential Integrity Constraints Violation: " + TargetAttribute+" = " + TargetValue + " does not exists in " + sourceAttribute + ".";
	var integrityMessage = "";
	for (var i = 0; i < TargetAttributes.length; i++) {
		integrityMessage = integrityMessage + TargetAttributes[i]+" = "+TargetValues[i];
		if(i != TargetAttributes.length-1)	{
			integrityMessage = integrityMessage + " AND ";
		}
	};
	integrityMessage =  integrityMessage + " does not exists in " +sourceAttribute+".";
	//return  "Referential Integrity Constraints Violation: " + TargetAttribute+" = " + TargetValue + " does not exists in " + sourceAttribute + ".";
	return  "Referential Integrity Constraints Violation: " + integrityMessage;
};

kony.sync.getReferetialIntegrityDeleteErrMessg = function (sourceAttribute, TargetAttribute, targetValue, srcValue){
	sync.log.trace("Entering kony.sync.getReferetialIntegrityDeleteErrMessg ");
	return  "Referential Integrity Constraints Violation: " + "Delete dependent records from " + targetValue + " before deleting record(s) in " + srcValue + ".";
};

kony.sync.getValidateLengthErrMsg = function (tablename, colname, expectedLength, actualLength){ 
	sync.log.trace("Entering kony.sync.getValidateLengthErrMsg ");
	return "Length exceeds the limit for the attribute " + colname + " in " + tablename + ".\nExpected:\'" + expectedLength + "\'\nActual:\'" + actualLength + "\'";
};

kony.sync.getSchemaUpgradeNeededError = function(){
	sync.log.trace("Entering kony.sync.getSchemaUpgradeNeededError");
	//TODO:needs to be replaced with actual schema error
	return kony.sync.getErrorTable(kony.sync.errorCodeSessionBreak,kony.sync.getErrorMessage(kony.sync.errorCodeSessionBreak),null);
};

kony.sync.getNetworkCancelError = function(){
	var errCreate = {};
	errCreate.opstatus = 7025;
	errCreate.errmsg = "Error occurred, Network Call Cancelled";
	return errCreate;
}
//  **************** End KonySyncErrors.js*******************


//  **************** Start KonySyncGlobals.js*******************
if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}
if(typeof(sync)=== "undefined"){
	sync = {};
}

//This enables the Print Statements in the Sync Library
kony.sync.syncLibPrint  = true;
kony.sync.downloadNextBatchServerblob = null; //not used
kony.sync.scopes = [];
kony.sync.gMoreChanges = true; //not used
kony.sync.gSyncFailed = false;
kony.sync.gPolicy = 0;
kony.sync.isMbaasEnabled = false;

//Sync Config
kony.sync.currentSyncConfigParams = null;
kony.sync.currentSyncLog = [];

//Sync Call Backs Constants
kony.sync.sessionTasks = "sessiontasks";
kony.sync.sessionTaskDoUpload = "doupload";
kony.sync.sessionTaskDoDownload = "dodownload";
kony.sync.blobStoreManagerTable = "konysyncBLOBSTOREMANAGER";
kony.sync.filterParams = "filterparams";
kony.sync.onSyncStart = "onsyncstart";
kony.sync.onScopeStart = "onscopestart";
kony.sync.onScopeError = "onscopeerror";
kony.sync.onScopeSuccess = "onscopesuccess";
kony.sync.onAuthenticationSuccess = "onauthenticationsuccess";
kony.sync.onUploadStart = "onuploadstart";
kony.sync.onUploadSuccess = "onuploadsuccess";
kony.sync.onUploadBatchStart = "onuploadbatchstart";
kony.sync.onUploadBatchSuccess = "onuploadbatchsuccess";
kony.sync.onDownloadStart = "ondownloadstart";
kony.sync.onDownloadSuccess = "ondownloadsuccess";
kony.sync.onBatchStored = "onbatchstored";
kony.sync.onBatchProcessingStart = "onbatchprocessingstart";
kony.sync.onBatchProcessingSuccess = "onbatchprocessingsuccess";
kony.sync.onSyncSuccess = "onsyncsuccess";
kony.sync.onSyncError = "onsyncerror";
kony.sync.removeAfterUpload="removeafterupload";
kony.sync.passwordHashingAlgo="passwordhashalgo";

//Sync Context Params
kony.sync.objectLevelInfo = "objectlevelinfo";
kony.sync.authenticateURL = "authenticateurl";
kony.sync.uploadURL = "uploadurl";
kony.sync.downloadURL = "downloadurl";
kony.sync.uploadContext = "uploadcontext";
kony.sync.uploadBatchContext = "uploadbatchcontext";
kony.sync.failedRowInfo = "failedrowinfo";
kony.sync.uploadSummary = [];
kony.sync.numberOfRowsUploaded = "rowsuploaded";
kony.sync.numberOfRowsInserted = "rowsinserted";
kony.sync.numberOfRowsUpdated = "rowsupdated";
kony.sync.numberOfRowsDeleted = "rowsdeleted";
kony.sync.numberOfRowsInsertedAck = "ackinsertedrows";
kony.sync.numberOfRowsUpdatedAck = "ackupdatedrows";
kony.sync.numberOfRowsDeletedAck = "ackdeletedrows";
kony.sync.numberOfRowsAcknowledged = "acktotalrows";
kony.sync.numberOfRowsFailedtoUpload = "rowsfailedtoupload";
kony.sync.pendingBatches = "pendingbatches";
kony.sync.numberOfRowsDownloaded = "batchrowsdownloaded";
kony.sync.batchContext = "batchcontext";
kony.sync.lastSyncTimestamp = "lastsynctimestamp";
kony.sync.uploadSequenceNumber = "uploadsequencenumber";
kony.sync.currentScope = "currentscope";
kony.sync.dataSource = "DataSource";
kony.sync.scopeDataSource = "ScopeDatabaseName";
kony.sync.scopeName = "ScopeName";
kony.sync.syncStrategy = "Strategy";
kony.sync.syncStrategy_OTA = "OTA_SYNC";
kony.sync.versionNumber = "1.0";
kony.sync.dbSize = 5 * 1024 * 1024;
//Pending Batchs
kony.sync.syncPendingBatchesNo = 0;
kony.sync.syncStatusColumn = "changetype";
kony.sync.syncConfigurationDBName = "SyncConfig";
kony.sync.syncConfigurationTableName = "SyncConfigTable";
kony.sync.syncConfigurationColumnDeviceIDName = "DeviceID";
kony.sync.syncConfigurationColumnInstanceIDName = "InstanceID";
kony.sync.syncConfigurationColumnVersion = "SyncVersion";
kony.sync.syncConfigurationColumnSchemaUpgradeContext = "schemaupgradecontext";
kony.sync.configVersion = "";
kony.sync.metaTableName = "konysyncMETAINFO";
kony.sync.metaTableScopeColumn = "scopename";
kony.sync.metaTableSyncTimeColumn = "lastserversynccontext";
kony.sync.metaTableUploadSyncTimeColumn = "lastserveruploadsynccontext";
kony.sync.metaTableSchemaUpgradeSyncTimeColumn = "lastschemaupgradesynccontext";
kony.sync.metaTableSyncVersionCloumn = "versionnumber";
kony.sync.metaTableSyncOrderCloumn = "replaysequencenumber";
kony.sync.metaTableLastGeneratedId = "lastgeneratedid";
kony.sync.metaTableFilterValue = "filtervalue";
kony.sync.historyTableName = "_history";
kony.sync.changeTypeColumn = "changetype";
kony.sync.dbConnection = null;
kony.sync.mainTableSyncVersionColumn = "konysyncversionnumber";
kony.sync.mainTableChangeTypeColumn = "konysyncchangetype";
kony.sync.mainTableHashSumColumn = "konysynchashsum";
kony.sync.historyTableSyncVersionColumn = "konysyncversionnumber";
kony.sync.historyTableChangeTypeColumn = "konysyncchangetype";
kony.sync.historyTableReplaySequenceColumn = "konysyncreplaysequence";
kony.sync.historyTableChangeTimeColumn = "konysyncchangetime"; // Not used as of now.
kony.sync.historyTableHashSumColumn = "konysynchashsum";
kony.sync.originalTableName = "_original";
kony.sync.originalTableChangeTypeColumn = "konysyncoriginalchangetype";
kony.sync.originalTableSyncVersionColumn = "konysyncoriginalversionnumber";
kony.sync.originalTableHashSumColumn = "konysynchashsum";
kony.sync.mergedWithEIS = "konysyncMergedWithEIS";
kony.sync.clientPKPrefix = "konysyncClient";
kony.sync.parentRelationshipMap = "_parentrelationships";

//Global SyncSession Configurations
kony.sync.isSessionInProgress = false;
kony.sync.currentScope = null;
kony.sync.deviceId = null;
kony.sync.instanceId = null;
kony.sync.originalDeviceId = null;

//Global changetype columns
kony.sync.insertColStatus = "0";
kony.sync.updateColStatus = "1";
kony.sync.deleteColStatus = "2";

kony.sync.insertColStatusDI = "90";
kony.sync.updateColStatusDU = "91";
kony.sync.deleteColStatusDD = "92";

//storeid_callback_scope = null; Not used.
kony.sync.currentSyncScopesState = [];
kony.sync.isParameter = true;
kony.sync.dbTypeSQLLite = "sqllite";
kony.sync.dbTypeSQLCE = "sqlce";
kony.sync.platformName = null;
kony.sync.hashTypeSHA256 = "SHA256";

kony.sync.pendingAckIndex = 1;
kony.sync.pendingAckResult = {};
kony.sync.pendingAckCount = 0;
kony.sync.pendingUploadIndex = 1;
kony.sync.pendingUploadResult = {};
kony.sync.pendingUploadCount = 0;
kony.sync.deferredUploadIndex = 1;
kony.sync.deferredUploadResult = {};
 kony.sync.deferredUploadCount = 0;

kony.sync.rollbackCurrentScope = null;
kony.sync.onDownloadCompletion = null;
kony.sync.globalIsDownloadStarted = true;
kony.sync.globalIsUploadStarted = true;
kony.sync.globalIsUploadFailed = true;
kony.sync.onUploadCompletion = null;

kony.sync.currentSyncReturnParams = {};
kony.sync.syncTotalBatchInserts = 0;
kony.sync.syncTotalBatchUpdates = 0;
kony.sync.syncTotalBatchDeletes = 0;
kony.sync.syncTotalInserts = 0;
kony.sync.syncTotalUpdates = 0;
kony.sync.syncTotalDeletes = 0;
kony.sync.serverInsertCount = 0;
kony.sync.serverUpdateCount = 0;
kony.sync.serverDeleteCount = 0;
kony.sync.serverInsertAckCount = 0;
kony.sync.serverUpdateAckCount = 0;
kony.sync.serverDeleteAckCount = 0;
kony.sync.serverFailedCount = 0;
kony.sync.objectLevelInfoMap = {};

kony.sync.queryStore = [];
kony.sync.batchDownloadTimer = 0;
kony.sync.batchInsertionTimer = 0;

kony.sync.OTAChangestobeDeleted = [];
kony.sync.PersisChangestobeDeleted = [];
kony.sync.sessionTaskUploadErrorPolicy = "uploaderrorpolicy";
kony.sync.sessionTaskUploadErrorPolicyCOE = "continueonerror";
kony.sync.sessionTaskUploadErrorPolicyAOE = "abortonerror";

//global variable to check whether reset already started or not
kony.sync.isResetInProgress = false;
kony.sync.errorInfoTransactionID = "transactionID";
kony.sync.errorInfoDatabaseError = "dbError";

//global variable to check whether sync for any scope got succeeded or not.
//If sync is not faled for any scope, then only call onsyncsuccess else onsyncerror
kony.sync.isErrorInAnyScope = false;
kony.sync.syncErrorMessage = {};

//This variable will save download request from first batch for subsequent batches
kony.sync.downloadRequest = null;

kony.sync.errorObject = null;
kony.sync.schemaUpgradeErrorObject = null;

kony.sync.enableORMValidations = true;

kony.sync.numberOfRetriesKey = "numberofretryattempts";
kony.sync.onRetry = "onretry";
kony.sync.networkTimeOutKey = "networktimeout";
kony.sync.retryErrorCodes = "retryerrorcodes";
kony.sync.retryWaitKey = "retrywaittime";
//kony.sync.numberOfRetries = 0;
kony.sync.numberOfRetriesMap = {};

kony.sync.maxParallelChunksKey = "maxparallelchunks";
kony.sync.payloadIdKey = "payloadid";
kony.sync.chunkCountKey = "chunkcount";
kony.sync.chunkNoKey = "chunknumber";
kony.sync.chunkDataKey = "chunkdata";
kony.sync.chunkSizeKey = "chunksize";
kony.sync.chunkHashSum = "checksum";

kony.sync.chunkMetaTableName = "konysyncCHUNKMETAINFO";
kony.sync.metaTablePayloadId = "payloadid";
kony.sync.metaTableChunkAck = "chunkacknowledged";
kony.sync.metaTableChunkSize = "chunksize";
kony.sync.metaTableChunkHashSum = "chunkhashsum";
kony.sync.metaTableChunkDiscarded = "chunkdiscarded";
kony.sync.metaTableChunkCount = "chunkcount";

kony.sync.chunkTableName = "konysyncCHUNKDATA";
kony.sync.chunkTableChunkData = "chunkdata";
kony.sync.chunkTableChunkId = "chunkid";
kony.sync.chunkTablePayloadId = "payloadid";
kony.sync.chunkTableTimeStamp = "timestamp";
kony.sync.chunkRequestKey = "chunkrequest";
kony.sync.pendingChunksKey = "pendingchunks";
kony.sync.chunksDownloadedKey = "chunksdownloaded";

kony.sync.onChunkStart = "onchunkstart";
kony.sync.onChunkSuccess = "onchunksuccess";
kony.sync.onChunkError = "onchunkerror";

kony.sync.chunkNotAcknowledged = 0;
kony.sync.chunkCompleteButNotAcknowledged = 1;
kony.sync.chunkCompleteAndWaitingForAck = 2;
kony.sync.chunkDiscarded = 1;
kony.sync.chunkNotDiscarded = 0;

kony.sync.trackIntermediateUpdates = true;

kony.sync.uploadcontextMap = {};

kony.sync.serverDetails = "serverDetails";
kony.sync.hostName = "hostName";
kony.sync.ipAddress = "ipAddress";


/*meta info about konysyncPENDINGUPLOADREQUESTINFO table */
kony.sync.pendingUploadTableName = "konysyncPENDINGUPLOADREQUESTINFO";
kony.sync.pendingUploadTableInsertCount = "insertcount";
kony.sync.pendingUploadTableUpdateCount = "updatecount";
kony.sync.pendingUploadTableDeleteCount = "deletecount";
kony.sync.pendingUploadTableBatchInsertCount = "batchinsertcount";
kony.sync.pendingUploadTableBatchUpdateCount = "batchupdatecount";
kony.sync.pendingUploadTableBatchDeleteCount = "batchdeletecount";
kony.sync.pendingUploadTableObjectLevelInfo = "objectlevelinfo";
kony.sync.pendingUploadTableUploadRequest = "uploadrequest";
kony.sync.pendingUploadTableUploadLimit = "uploadlimit";

kony.sync.deviceDBEncryptionKey = null;
kony.sync.deviceDBEncryptionKeyParam = "devicedbencryptionkey";
kony.sync.onSyncInitSuccessParam = "oninitsuccess";
kony.sync.onSyncInitErrorParam = "oniniterror";
kony.sync.onSyncResetSuccessParam = "onresetsuccess";
kony.sync.onSyncResetErrorParam = "onreseterror";

kony.sync.currentSyncScopeFilter = null;
kony.sync.currentSyncScopeFilterIndex = 1;

kony.sync.uploadClientContext = {};
kony.sync.downloadClientContext = {};

kony.sync.reconciledKeysKey = "reconciledprimarykeys";

kony.sync.schemaUpgradeNeeded = false;
kony.sync.schemaUpgradeContext = null;
kony.sync.schemaUpgradeDownloadPending = false;
kony.sync.omitUpload = false;
kony.sync.omitDownload = false;
kony.sync.onUpgradeQueriesDownloadStartKey = "onupgradescriptsdownloadstart";
kony.sync.onUpgradeQueriesDownloadSuccessKey = "onupgradescriptsdownloadsuccess";
kony.sync.onUpgradeQueriesDownloadErrorKey = "onupgradescriptsdownloaderror";
kony.sync.onUpgradeQueriesExecutionStartKey = "onupgradescriptsexecutionstart";
kony.sync.onUpgradeQueriesExecutionSuccessKey = "onupgradescriptsexecutionsuccess";
kony.sync.onUpgradeQueriesExecutionErrorKey = "onupgradescriptsexecutionerror";
kony.sync.onUpgradeRequiredKey = "onupgraderequired";

//Schema Upgrade Policies
kony.sync.onUpgradeActionAbort = "ABORT"; 
kony.sync.onUpgradeActionContinue = "CONTINUE"; //Not Implemented
kony.sync.onUpgradeActionContinueOnlyUpload = "CONTINUE_ONLY_UPLOAD"; //Not Implemented
kony.sync.onUpgradeActionUploadAbort = "UPLOAD_AND_ABORT"; 
kony.sync.onUpgradeActionUpgrade = "UPGRADE"; 
kony.sync.onUpgradeActionUploadUpgrade = "UPLOAD_AND_UPGRADE"; 

kony.sync.performOnlySchemaUpgrade = false;
kony.sync.onIsUpgradeRequiredSuccessKey = "isupgraderequiredsuccess";
kony.sync.onIsUpgradeRequiredErrorKey = "isupgraderequirederror";
kony.sync.onIsUpgradeRequiredStartKey = "isupgraderequiredstart";
kony.sync.onPerformUpgradeStartKey = "onperformupgradestart";
kony.sync.onPerformUpgradeSuccessKey = "onperformupgradesuccess";
kony.sync.onPerformUpgradeErrorKey = "onperformupgradeerror";
kony.sync.forceUpload = false;
kony.sync.forceUploadUpgrade = false; 

kony.sync.uploadLimit = 0;

kony.sync.deviceIdentifierIOS7Key = "deviceidentifierios7";
kony.sync.isAlertEnabled = true;
kony.sync.invokeServiceFunctionKey = "invokeservicefunction";

kony.sync.authTokenKey = "authtoken";

kony.sync.sessionMap = {};
kony.sync.konySyncSessionID = "konysyncsessionid";
kony.sync.konySyncRequestNumber = "konysyncrequestnumber";

kony.sync.isSyncStopped = false;
kony.sync.onSyncStop = null;
kony.sync.httprequestsession = null;

kony.sync.DDL556to559Update = [];
kony.sync.DDL559to560Update = [];

kony.sync.scopeDict = {};

kony.sync.isAppInBackground = false;
kony.sync.isPhonegap = false;

//upload cache changes
kony.sync.scope = "scope";
kony.sync.offset = "offset";
kony.sync.limit = "limit";
kony.sync.lastSequenceNumber = "lastSeqNo";
kony.sync.batchSize = "batchsize";
kony.sync.changeSet = "changeset";
kony.sync.uploadChangesLimit = "uploadLimit";
kony.sync.lastBatch = "lastBatch";
kony.sync.columns = "binarycolumns";
kony.sync.binaryMetaColumnPrefix = "blobref_";
kony.sync.blob = "binary";

kony.sync.onDemand = "Attachment";
kony.sync.inline = "Inline";
//  **************** End KonySyncGlobals.js*******************


//  **************** Start KonySyncHelper.js*******************
if(typeof(kony.sync) === "undefined"){
	kony.sync = {};
}
if(typeof(sync) === "undefined") {
	sync = {};
}

//This function is used inside sync library to handle prints
kony.sync.syncPrint = function (param){
	sync.log.trace("Entering kony.sync.syncPrint ");
	if (kony.sync.syncLibPrint){
		kony.print(param);
	}
};

/*
--This function formats the sqllite resultset. This is temporary and should be done at platform level.
--function format_row(rowItem)
kony.sync.format_row = function(rowItem)
local rowtemp = {}
if(rowItem ~= nil)then
for key,value in pairs(rowItem) do
value = ""..value;
if(string.isnumeric(value))then
string.replace(value,".0","");
end
rowtemp[key] = string.replace(value, "'", "");
end
if ( value ~= nil ) then
string.replace(value, "'", "");
end
else
return nil;
end
return rowtemp;
end
--*/

kony.sync.getTableInfo = function (tablename) {
	sync.log.trace("Entering kony.sync.getTableInfo ");
	for (var i = 0; i < kony.sync.scopes.length; i++) {
		var scope = kony.sync.scopes[i];
		if(!kony.sync.isNullOrUndefined(scope.syncTableDic[tablename])) {
			return scope.syncTableDic[tablename];
		}
	}
	return null;
};

kony.sync.is_SQL_select = function (sql) {
	sync.log.trace("Entering kony.sync.is_SQL_select ");
	sql = kony.string.trim(sql);
	return kony.string.startsWith(sql, "select", true);
};

kony.sync.dummyerror = function (tid, err) {
	sync.log.trace("Entering kony.sync.dummyerror ");
	if (kony.sync.isNullOrUndefined(err)) {
		sync.log.debug("dummyerror");
	} else {
		sync.log.debug("dummy error --->", err);
	}
};

kony.sync.verifyAndCallClosure = function (closure, params) {
	sync.log.trace("Entering kony.sync.verifyAndCallClosure ");
	if (kony.sync.isValidFunctionType(closure)) {
		return closure(params);
	} else {
		sync.log.warn("Invalid callback type : ", closure);
	}
};

kony.sync.getArrayCount = function (tab) {
	sync.log.trace("Entering kony.sync.getArrayCount ");
	var count = 0;
	if (!kony.sync.isNullOrUndefined(tab)) {
		for (var i in tab) {
			count = count + 1;
		}
	}
	return count;
};

kony.sync.getDeviceID = function () {
	sync.log.trace("Entering kony.sync.getDeviceID");
	if(kony.sync.deviceId !== ""){
		return kony.sync.deviceId;
	}
	//#ifdef KONYSYNC_IOS
		var deviceInfo = kony.os.deviceInfo();
		if(deviceInfo.osversion < 7){
			return deviceInfo.deviceid;
		}else{
			if(kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.deviceIdentifierIOS7Key])){
				return deviceInfo.identifierForVendor;
			}else{
				return kony.sync.currentSyncConfigParams[kony.sync.deviceIdentifierIOS7Key];
			}
		}
	//#else
		return kony.os.deviceInfo().deviceid;
	//#endif
};

kony.sync.getInstanceID = function () {
	sync.log.trace("Entering kony.sync.getInstanceID ");
	return kony.sync.instanceId;
};

kony.sync.getOriginalDeviceID = function () {
	sync.log.trace("Entering kony.sync.getOriginalDeviceID ");
	if (kony.sync.isNullOrUndefined(kony.sync.originalDeviceId)) {
		kony.sync.originalDeviceId = kony.os.deviceInfo().deviceid;
		return kony.os.deviceInfo().deviceid;
	} else {
		return kony.sync.originalDeviceId;
	}
};

kony.sync.removeprovisioncolumns = function (row, columns, isArray, isUpdate) {
	sync.log.trace("Entering kony.sync.removeprovisioncolumns ");
	var length = columns.length;
	var record = [];
	var  i = null;
	if (!isArray) {
		for (i = length - 1; i >= 0; i--) {
			if (!kony.sync.isNullOrUndefined(row[columns[i].Name])){
				record.push(row[columns[i].Name]);
			}	
			else if(isUpdate !== true){
				record.push("NULL");
			}
		}
		if (!kony.sync.isNullOrUndefined(row.konysynchashsum)) {
			record.push(row.konysynchashsum);
		}
		return record;
	} else {
		for (i = length - 1; i >= 0; i--) {
			if (!kony.sync.isNullOrUndefined(row[columns[i].Name])){
				record[columns[i].Name] = row[columns[i].Name];
			}	
			else if(isUpdate !== true){
				record[columns[i].Name] = "NULL";
			}
		}
		if(!kony.sync.isNullOrUndefined(row.konysynchashsum)) {
			record.konysynchashsum = row.konysynchashsum;
		}
		return record;
	}
};

kony.sync.replaceautogeneratedPK = function (sname, synctable, values, tx, errorCallback) {
	sync.log.trace("Entering kony.sync.replaceautogeneratedPK ");
	var id = null;
	var pkTab = {};
	if(!kony.sync.isNullOrUndefined(synctable.Pk_Columns)){
		for (var i = 0; i < synctable.Pk_Columns.length; i++){
			var pk = synctable.Pk_Columns[i];
			if (synctable.ColumnsDic[pk].Autogenerated === "true") {
				id = kony.sync.getLastGeneratedID(sname, tx, errorCallback);
				if (id === false) {
					return false;
				}
				id = id - 1;
				if (synctable.ColumnsDic[pk].type === "string") {
					id = id.toString();
				}
				values[pk] = id;
				pkTab[pk] = id;
				if (!kony.sync.setLastGeneratedID(sname, id, tx, errorCallback)) {
					return false;
				}
			} else {
				pkTab[pk] = values[pk];
			}
		}
	}
	//implemented for composite primary key
	return pkTab;
};

kony.sync.CreateCopy = function (tab) {
	sync.log.trace("Entering kony.sync.CreateCopy ");
	if (kony.sync.isNullOrUndefined(tab)){
		return null;
	}
	var copy = [];
	for (var key in tab) {
		var value = tab[key];
		if (kony.sync.isValidJSTable(value)) {
			copy[key] = kony.sync.CreateCopy(tab[key]);
		} else {
			copy[key] = tab[key];
		}
	}
	return copy;
};

kony.sync.getautogeneratePK = function (sname, synctable) {
	sync.log.trace("Entering kony.sync.getautogeneratePK ");
	var agPKs = [];
	if(!kony.sync.isNullOrUndefined(synctable.Pk_Columns)){
		for (var i = 0; i < synctable.Pk_Columns.length; i++) {
			var pk = synctable.Pk_Columns[i];
			if ((synctable.ColumnsDic[pk].Autogenerated === "true")) {
				kony.table.insert(agPKs, pk);
			}
		}
	}
	return agPKs;
};

kony.sync.getDBNamefromDataSource = function (dsname) {
	sync.log.trace("Entering kony.sync.getDBNamefromDataSource ");

	sync.log.debug("validatint dsname : ",dsname);
	for (var i in konysyncClientSyncConfig.ArrayOfDataSource) {
		var datasource = konysyncClientSyncConfig.ArrayOfDataSource[i];

		sync.log.debug("datasource.type:" + datasource.type + ":datasource.ID:" + datasource.ID);
		if ((datasource.type === "database" && datasource.ID === dsname)) {
			return datasource.Database.DatabaseName;
		}
	}
	return null;
};

kony.sync.getAppId = function () {
	sync.log.trace("Entering kony.sync.getAppId ");
	return kony.sync.currentSyncConfigParams.appid;
};

kony.sync.getBatchSize = function () {
	sync.log.trace("Entering kony.sync.getBatchSize ");
	if(!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams.batchsize)) {
		return kony.sync.currentSyncConfigParams.batchsize;
	}
	if (kony.os.deviceInfo().name === "blackberry") {
		return "50";
	} else {
		return "500";
	}
};

kony.sync.resetsyncsessionglobals = function (opName) {
	sync.log.trace("Entering kony.sync.resetsyncsessionglobals ");
	kony.sync.currentScope = null;
	kony.sync.currentSyncReturnParams = {};
	kony.sync.isSyncStopped = false;
	if(opName==="startSession"){
		kony.sync.currentSyncReturnParams[kony.sync.uploadURL] = kony.sync.getUploadURL();
		kony.sync.currentSyncReturnParams[kony.sync.downloadURL] = kony.sync.getDownloadURL();
	}
	kony.sync.currentSyncLog = [];
};

kony.sync.resetscopesessionglobals = function (CallBack) {
	var isError = false;
	function clearSchemaUpgradeContext(tx){
		//resetting the schemaupgrade flag   once the download of the columns is done in memory and in db
		kony.sync.schemaUpgradeContext = null; 
		var sql = "update " + kony.sync.syncConfigurationTableName + " set " +
		kony.sync.syncConfigurationColumnSchemaUpgradeContext + " = null";
		if (kony.sync.executeSql(tx, sql, null) === false) {
			isError = true;
			return;//error
		}	
		sync.log.info("schemaupgrade context cleared successfully in memory and db");
	}
	function clearSchemaSuccessCallBack(){
		CallBack(true);
	}
	function dbErrorCallBack(errInfo){
		sync.log.error("error in opening db connection " +JSON.stringify(errInfo));
		clearSchemaErrorCallBack(errInfo);
	}
	function clearSchemaErrorCallBack(errInfo){
		sync.log.error("failed to clear schemaupgradeinfo in synconfigtable after dsc " +JSON.stringify(errInfo));
		kony.sync.isErrorInAnyScope = true;
		CallBack(true);
	}

	sync.log.trace("Entering kony.sync.resetscopesessionglobals ");
	kony.sync.syncPendingBatchesNo = 0;
	delete kony.sync.currentSyncReturnParams[kony.sync.batchContext];
	delete kony.sync.currentSyncReturnParams[kony.sync.uploadContext];
	if(kony.sync.currentScope === null) {
		kony.sync.currentScope = kony.sync.scopes[0]; //- Start 1st Scope Sync
		CallBack(false);
	}else{
		sync.log.debug("Scope index: ", kony.sync.currentScope.Index);
		sync.log.debug("Scope count: ", kony.sync.scopes.scopecount);
		if (kony.sync.currentScope.Index === kony.sync.scopes.scopecount - 1) {
			if(!kony.sync.isNullOrUndefined(kony.sync.schemaUpgradeContext)){
				var dbName = kony.sync.currentScope[kony.sync.scopeDataSource];
				var conn = kony.sync.getConnectionOnly(dbName,dbName,dbErrorCallBack);
				if(conn !== null){
					kony.db.transaction(conn, clearSchemaUpgradeContext,clearSchemaErrorCallBack,clearSchemaSuccessCallBack);
				}
			}
			else
				CallBack(true);//Sync Complete
		}
		else{
			kony.sync.currentScope = kony.sync.scopes[kony.sync.currentScope.Index + 1]; //Get Next Scope
			CallBack(false);
		}
	}
	
};

kony.sync.resetuploadsessioglobals = function () {
	sync.log.trace("Entering kony.sync.resetuploadsessioglobals ");
	delete kony.sync.currentSyncReturnParams[kony.sync.uploadContext];
	delete kony.sync.currentSyncReturnParams[kony.sync.lastSyncTimestamp];
	delete kony.sync.currentSyncReturnParams[kony.sync.uploadSequenceNumber];
	//sync_total_inserts = 0;
	kony.sync.syncTotalInserts = 0;
	kony.sync.syncTotalUpdates = 0;
	kony.sync.syncTotalDeletes = 0;
	kony.sync.serverInsertCount = 0;
	kony.sync.serverUpdateCount = 0;
	kony.sync.serverDeleteCount = 0;
	kony.sync.serverInsertAckCount = 0;
	kony.sync.serverUpdateAckCount = 0;
	kony.sync.serverDeleteAckCount = 0;
	kony.sync.serverFailedCount = 0;
	kony.sync.uploadSummary = [];
};

kony.sync.resetbatchsessionglobals = function () {
	sync.log.trace("Entering kony.sync.resetbatchsessionglobals ");
	delete kony.sync.currentSyncReturnParams[kony.sync.batchContext];
	delete kony.sync.currentSyncReturnParams[kony.sync.uploadContext];
	delete kony.sync.currentSyncReturnParams[kony.sync.uploadSequenceNumber];
	kony.sync.serverInsertCount = 0;
	kony.sync.serverUpdateCount = 0;
	kony.sync.serverDeleteCount = 0;
	kony.sync.serverInsertAckCount = 0;
	kony.sync.serverUpdateAckCount = 0;
	kony.sync.serverDeleteAckCount = 0;
	kony.sync.serverFailedCount = 0;
	kony.sync.uploadSummary = [];
	kony.sync.objectLevelInfoMap = {};
};

kony.sync.getSyncTable = function (tablename) {
	sync.log.trace("Entering kony.sync.getSyncTable ");
	var scopename = kony.sync.scopes.syncTableScopeDic[tablename];
	return kony.sync.scopes[scopename].syncTableDic[tablename];
};

kony.sync.getCurrentVersionNumber = function (tbname) {
	sync.log.trace("Entering kony.sync.getCurrentVersionNumber ");
	var scopename = kony.sync.scopes.syncTableScopeDic[tbname];
	return kony.sync.currentSyncScopesState[scopename];
};

kony.sync.getBackEndDBType = function () {
	sync.log.trace("Entering kony.sync.getBackEndDBType ");
	if (kony.sync.platformName === null) {
		kony.sync.platformName = kony.os.deviceInfo().name;
	}
	if (kony.sync.platformName === "winmobile") {
		return kony.sync.dbTypeSQLCE;
	} 
	return kony.sync.dbTypeSQLLite;
};

kony.sync.printScopeLog = function () {
	sync.log.trace("Entering kony.sync.printScopeLog ");
	sync.log.info("Sync complete");
	sync.log.info("----------------------------------------------------");
	for (var i = 0; i < kony.sync.currentSyncLog.length; i++) {
		var batch = kony.sync.currentSyncLog[i];
		sync.log.info("Batch No: ", i);
		sync.log.info("Batch log: ", batch);
	}
	sync.log.info("----------------------------------------------------");
};

//To generate hash
kony.sync.genHash = function (hashType, plaintext) {
	sync.log.trace("Entering kony.sync.genHash ");
	//return same in case of null/undefined plaintext
	if (kony.sync.isNull(plaintext)) {
		return plaintext;
	}
	
	//if hashType is callback, get the value from it
	if(kony.sync.isValidFunctionType(hashType)){
		return hashType(plaintext);
	}
	
	//convert plaintext to string if not already
	plaintext = plaintext.toString();
	
	//apply default value in case of invalid/null/undefined hashtype
	if (kony.sync.isNull(hashType) || kony.string.equalsIgnoreCase(kony.type(hashType), "string")===false) {
		return kony.crypto.createHash("sha256", plaintext);
	}
	//return same if hashtype is none
	else if(kony.string.equalsIgnoreCase(hashType, "none")===true){
		return plaintext;
	}
	//apply the desired hash algo
	else{
		return kony.crypto.createHash(hashType, plaintext);
	}
};

kony.sync.tonumber = function(arg) {
	sync.log.trace("Entering kony.sync.tonumber ");
	if(kony.sync.isNullOrUndefined(arg)) {
        return null;
    }
	
	//duplicating kony.os.toNumber in order to avoid Android platform dependency issues
	if (arguments.length !== 1) {
		throw new Error("Invalid argument to os.toNumber");
	}
	
	if (typeof(arg) === "number") {
		return arg;
	} else if (typeof(arg) === "string") {	
		
		var str = arg.replace(/^\s*/, '').replace(/\s*$/, '');
		if (str === '') {
			return null;
		} else {
			var num = str - 0;
			return (isNaN(num) ? null : num);
		}
	
	} else {
		return null;
	}
};

kony.sync.filterNullsFromSelectResult = function(res){
	sync.log.trace("Entering kony.sync.filterNullsFromSelectResult ");
	if(kony.sync.enableORMValidations){
		var tableToMap = [  ];
		for (var j in res){			
			var u = res[j];
			var rowToMap = {};
			for(var k in u){
				var v = u[k];
				if(!kony.sync.isNull(v)){
					rowToMap[k] = v;
				}
			}
			kony.table.insert(tableToMap, rowToMap);
		}
		return tableToMap;
	}
	else{
		return res;
	}
};
kony.sync.getAsyncDownloadBatchSize = function () {
	sync.log.trace("Entering kony.sync.getAsyncDownloadBatchSize ");
	if(!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams.asyncbatchsize)){
		return kony.sync.currentSyncConfigParams.asyncbatchsize;
	}
	return 50;
};

kony.sync.isApplyChangesSync = function () {
	sync.log.trace("Entering kony.sync.isApplyChangesSync ");
	var returnVal;
	//#ifdef bb
	returnVal = false;
	//#else
	returnVal = true;
	//#endif
	return returnVal;
};

kony.sync.getChangeTypeForUploadTrue = function(type) {
	sync.log.debug("ValueSentForChange: ", type);
	if(typeof(type) === "number"){
		type = type.toString();
	}
	if (type === "90") {
		return "0";
	}
	if (type === "91") {
		return "1";
	}
	if (type === "92") {
		return "2";
	}
	return type;
};

//Checking whether table is defined for delete after upload or not
kony.sync.checkForDeleteAfterUpload = function (tablename, scopename) {
	sync.log.trace("Entering kony.sync.checkForDeleteAfterUpload ");
	var i = null;
	var myTab = kony.sync.currentSyncConfigParams[kony.sync.removeAfterUpload];
		if(kony.sync.isNullOrUndefined(myTab)){
			return false;
		}
		if(!kony.sync.isNullOrUndefined(scopename)){
			if(kony.sync.isNullOrUndefined(myTab[scopename])){
				return false;
			}	
			if (myTab[scopename].length === 0){
				return true;
			}	
			for (i in myTab[scopename]){
				if(myTab[scopename][i] === tablename){
					return true;
				}	
			}
		} else {
			for(i in myTab) {
				for (var j in myTab[i]) {
					if (myTab[i][j] === tablename) {
						return true;
					}
				}
			}
		}
		return false;
};

//checking for false updates
kony.sync.checkForFalseUpdate = function (dbname, tbname, twcs, markForUpload, errorcallback, successcallback) {
	sync.log.trace("Entering kony.sync.checkForFalseUpdate ");
	var uploadstatus = true;
	var isError = false;
	if(markForUpload === false){
		return true;
	} else {
		kony.table.insert(twcs, {
			key : kony.sync.historyTableChangeTypeColumn,
			value : "90",
			optype : "EQ",
			comptype : "AND"
		});
		var query = kony.sync.qb_createQuery();
		kony.sync.qb_select(query, [kony.sync.historyTableChangeTypeColumn]);
		kony.sync.qb_from(query, tbname + "_history");
		kony.sync.qb_where(query, twcs);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback, "check for false update");
		if(connection !== null){
			kony.sync.startTransaction(connection, transaction_callback, update_successcallback, single_transaction_error_callback, "check for false update");
		}
	}
	
	function transaction_callback(tx) {
		sync.log.trace("Entering kony.sync.checkForFalseUpdate transaction_callback");
		var resultSet = kony.sync.executeSql(tx, sql, params, errorcallback);
		if (resultSet !== false) {
			var num_records = resultSet.rows.length;
			if (num_records !== 0) {
				sync.log.error("Record does not exist on server, mark it for upload before updating/deleting it");
				kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeMarkForUpload, kony.sync.getErrorMessage(kony.sync.errorCodeMarkForUpload), null));
				uploadstatus = false;
			} else {
				uploadstatus = true;
			}
		} else {
			//return;
			isError = true;
		}

	}
	function update_successcallback() {
		sync.log.trace("Entering kony.sync.checkForFalseUpdate update_successcallback");
		if (!isError && uploadstatus === true) {
			successcallback();
		}
	}
	
	function single_transaction_error_callback() {
		sync.log.error("Entering kony.sync.checkForFalseUpdate single_transaction_error_callback");
		if (!isError) {
			sync.log.error("Transaction error occurred", "check for false update");
			kony.sync.showTransactionError(errorcallback, "check for false update");
		}else{
			sync.log.error("Transaction error occurred", kony.sync.errorObject);
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
};

kony.sync.checkForFalseUpdateWCS = function (dbname, tbname, twcs, markForUpload, errorcallback, successcallback) {
	sync.log.trace("Entering kony.sync.checkForFalseUpdateWCS ");
	var uploadstatus = true;
	var isError = false;
	if (markForUpload === false) {
		return true;
	}
	if(twcs !== "" && !kony.sync.isNull(twcs)){
			twcs = twcs + " AND " + kony.sync.historyTableChangeTypeColumn + " = 90";
		}
	else{
			twcs = " where " + kony.sync.historyTableChangeTypeColumn + " = 90";
		}
	var sql = "select " + kony.sync.historyTableChangeTypeColumn + " from " + tbname + "_history " + twcs;
	var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback, "check for false update WCS");
	if(connection !== null){
		kony.sync.startTransaction(connection, transaction_callback, update_successcallback, update_failurecallback, "check for false update WCS");
	}
	function transaction_callback(tx) {
		sync.log.trace("Entering kony.sync.checkForFalseUpdateWCS transaction_callback");
		var resultSet = kony.sync.executeSql(tx, sql, null, errorcallback);
		if (resultSet !== false){
			var num_records = resultSet.rows.length;
			if (num_records !== 0){
				sync.log.error("Record does not exist on server, mark it for upload before updating/deleting it");
				kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeMarkForUpload, kony.sync.getErrorMessage(kony.sync.errorCodeMarkForUpload), null));
				uploadstatus = false;
			} else {
				uploadstatus = true;
			}
		} else {
			isError = true;
		}
	}
	function update_successcallback() {
		sync.log.trace("Entering kony.sync.checkForFalseUpdateWCS update_successcallback");
		if (!isError && uploadstatus === true) {
			successcallback();
		}
	}
	function update_failurecallback() {
		sync.log.trace("Entering kony.sync.checkForFalseUpdateWCS update_failurecallback");
		if (!isError && uploadstatus === true){
			sync.log.error("Transaction error occurred : ", "check for false update WCS");
			kony.sync.showTransactionError(errorcallback,"check for false update WCS");
		}else{
			sync.log.error("Transaction error occurred : ", kony.sync.errorObject);
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}	
};

kony.sync.getConnection = function (dbName, displayName, transactionCallBack, successCallBack, errorCallBack) {
	sync.log.trace("Entering kony.sync.getConnection ");
	var connection = kony.sync.getConnectionOnly(dbName, displayName, errorCallBack);
	if(connection!==null){
		kony.db.transaction(connection, transactionCallBack, errorCallBack, successCallBack);
	}
};

//This function starts a transaction given a connection
kony.sync.startTransaction = function (connection, transactionCallBack, successCallBack, errorCallBack) {
	sync.log.trace("Entering kony.sync.startTransaction ");
	kony.db.transaction(connection, transactionCallBack, errorCallBack, successCallBack);
};

kony.sync.showTransactionError = function (errorCallBack, moduleName){
	sync.log.trace("Entering kony.sync.showTransactionError ");
	if(kony.sync.isNullOrUndefined(moduleName)){
		moduleName = "";
	}
	sync.log.fatal(moduleName + ":" + " Db connection is null");
	kony.sync.verifyAndCallClosure(errorCallBack, kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
};

kony.sync.checkIntegrity = function (dbname, rMap, successCallback, errorCallBack) {
	sync.log.trace("Entering kony.sync.checkIntegrity ");
	if(!kony.sync.enableORMValidations){
		kony.sync.verifyAndCallClosure(successCallback);
		return;
	}
	var status = true;
	var isError = false;
	var integrityFailedMap = null;
	var connection = kony.sync.getConnectionOnly(dbname, dbname, errorCallBack, "Checking integrity");
	if(connection !== null){
		kony.sync.startTransaction(connection, integrityTransaction, integritySuccess, integrityFailure, "Checking Referential Integrity Constraints");
	}
	function integrityTransaction(tx) {
		integrityFailedMap = kony.sync.checkIntegrityinTransaction(tx,rMap);
	}
	function integritySuccess() {
		var error = "";
		if (integrityFailedMap === true) {
			kony.sync.verifyAndCallClosure(successCallback);
		}
		else{
			for(var key in integrityFailedMap){
				error = error + integrityFailedMap[key];
			}
			kony.sync.verifyAndCallClosure(errorCallBack, kony.sync.getErrorTable(kony.sync.errorCodeReferentialIntegrity, error));
		}
	}
	function integrityFailure() {
		if (!integrityFailedMap) {
			kony.sync.showTransactionError(errorCallBack,"Checking integrity");
		}else{
			kony.sync.verifyAndCallClosure(errorCallBack, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
};

kony.sync.checkIntegrityinTransaction_old = function (tx, rMap) {
	sync.log.trace("Entering kony.sync.checkIntegrityinTransaction ");
	var integrityFailedMap = {};
	if(!kony.sync.enableORMValidations){
		return true;
	}
	
	for(var obj in rMap){
			for (var key in rMap[obj]) {
				if (kony.sync.isNull(rMap[obj][key].targetAttributeValue)) {
					continue;
				}
				if(integrityFailedMap[rMap[obj][key].foreignKeyAttribute] === false){
					continue;
				}
				if(rMap[obj][key].targetAttributeValue === ""){
					rMap[obj][key].targetAttributeValue = "''";
				}
				var sql = "select * from " + obj + " where " + rMap[obj][key].sourceAttribute[0] + " = " + rMap[obj][key].targetAttributeValue[0] + "";
				var resultSet = kony.sync.executeSql(tx, sql, null);
				if (resultSet !== false) {
					if (resultSet.rows.length === 0) {
						sync.log.error("Referential Integrity Check Failed", kony.sync.getErrorTable(kony.sync.errorCodeReferentialIntegrity, kony.sync.getReferetialIntegrityerrMessg(obj, rMap[obj][key].sourceAttribute, rMap[obj][key].targetAttributeValue)));
                        if(kony.sync.isNullOrUndefined(integrityFailedMap[rMap[obj][key].foreignKeyAttribute])){
							integrityFailedMap[rMap[obj][key].foreignKeyAttribute] = kony.sync.getReferetialIntegrityerrMessg(obj, rMap[obj][key].sourceAttribute, rMap[obj][key].targetAttributeValue);
						}else{
							integrityFailedMap[rMap[obj][key].foreignKeyAttribute] = integrityFailedMap[rMap[obj][key].foreignKeyAttribute] + kony.sync.getReferetialIntegrityerrMessg(obj, rMap[obj][key].sourceAttribute, rMap[obj][key].targetAttributeValue);
						}
					}else {
						integrityFailedMap[rMap[obj][key].foreignKeyAttribute] = false;
					}
				} else {
					return false;
				}
			}
	}
	var logicalBreak = false;
	for(var key in integrityFailedMap){
		if(integrityFailedMap[key] !== false){
			logicalBreak = true;
		}
	}
	return logicalBreak === false?true:integrityFailedMap;
};

kony.sync.checkIntegrityinTransaction = function (tx, rMap) {
	sync.log.trace("Entering kony.sync.checkIntegrityinTransactionFK ");
	var integrityFailedMap = {};
	if(!kony.sync.enableORMValidations){
		return true;
	}
	
	for(var obj in rMap){
			for (var key in rMap[obj]) {
				var relationShipMap = rMap[obj][key];
				var whereClause = " where ";
				for (var i = 0; i < relationShipMap.targetAttributeValue.length; i++) {
					if (kony.sync.isNull(relationShipMap.targetAttributeValue[i])) {
						continue;
					}
					if(integrityFailedMap[relationShipMap.foreignKeyAttribute[i]] === false){
						continue;
					}	
					if(relationShipMap.targetAttributeValue[i] === ""){
						relationShipMap.targetAttributeValue[i] = "''";
					}
					
					whereClause = whereClause + relationShipMap.sourceAttribute[i] + " = " + relationShipMap.targetAttributeValue[i];

					if(i != relationShipMap.targetAttributeValue.length - 1)	{
						whereClause = whereClause + " AND ";
					}
				};

				var sql = "select * from " + obj + whereClause + "";
				var resultSet = kony.sync.executeSql(tx, sql, null);
				if (resultSet !== false) {
					if (resultSet.rows.length === 0) {
						sync.log.error("Referential Integrity Check Failed", kony.sync.getErrorTable(kony.sync.errorCodeReferentialIntegrity, kony.sync.getReferetialIntegrityerrMessg(obj, relationShipMap.sourceAttribute, relationShipMap.targetAttributeValue)));
						integrityFailedMap[relationShipMap.foreignKeyAttribute[0]] = kony.sync.getReferetialIntegrityerrMessg(obj, relationShipMap.sourceAttribute, relationShipMap.targetAttributeValue);
					} 
					else{
						integrityFailedMap[relationShipMap.foreignKeyAttribute[0]] = false;
					}
				} else {
					return false;
				}
			}
	}

	var logicalBreak = false;
	for(var key in integrityFailedMap){
		if(integrityFailedMap[key] !== false){
			logicalBreak = true;
		}
	}
	return logicalBreak === false?true:integrityFailedMap;
};

kony.sync.convertOrderByMapToValuesTable = function (orderByMap) {
	sync.log.trace("Entering kony.sync.convertOrderByMapToValuesTable ");
	var valuesTable = {};
	for (var i in orderByMap) {
		valuesTable[orderByMap[i].key] = orderByMap[i].key;
	}
	return valuesTable;
};

kony.sync.convertToValuesTableOrderByMap = function (orderByMap, valuesTable) {
	sync.log.trace("Entering kony.sync.convertToValuesTableOrderByMap ");
	var orderByMapFiltered = [];
	var j = 0;
	for(var i in orderByMap) {
		if (valuesTable[orderByMap[i].key] === orderByMap[i].key) {
			orderByMapFiltered[j] = orderByMap[i];
			j++;
		}
	}
	return orderByMapFiltered;
};

kony.sync.isValidFunctionType = function (closure) {
	sync.log.trace("Entering kony.sync.isValidFunctionType ");
	return kony.type(closure) === "function";
};

kony.sync.initializeScopeSettings = function (tx) {
	sync.log.trace("Entering kony.sync.initializeScopeSettings ");
	var query = kony.sync.qb_createQuery();
	var json = "{\"scopeSettings\" : {}}";
		kony.sync.qb_set(query, {
			"id" : 1,
			"action" : "",
			"details" : json
		});
	kony.sync.qb_insert(query, "konysyncDIAGNOSTICS");
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	return kony.sync.executeSql(tx, sql, params);
};

kony.sync.updateScopeSettings = function (tx, scopename) {
	sync.log.trace("Entering kony.sync.updateScopeSettings ");
	var resultset = kony.sync.executeSql(tx, "select * from konysyncDIAGNOSTICS");
	if(resultset === false){
		return false;
	}
	var settings = "";
	var rowItem = null;
	if(resultset.rows.length > 0){
		rowItem = kony.db.sqlResultsetRowItem(tx, resultset, 0);
		settings = rowItem.details;
	}else{
		sync.log.error("Updation of Scope Settings Failed");
	}
	var table = JSON.parse(settings);
	if(kony.sync.isNullOrUndefined(table.scopeSettings[scopename])){
		table.scopeSettings[scopename] = {
			"initialize" : true
		};
	}else if(kony.sync.isNullOrUndefined(table.scopeSettings[scopename].initialize)) {
		table.scopeSettings[scopename].initialize = true;
	}
	var query = kony.sync.qb_createQuery();
	var json = JSON.stringify(table);
	kony.sync.qb_set(query, {
		"details" : json
	});
	kony.sync.qb_update(query, "konysyncDIAGNOSTICS");
	kony.sync.qb_where(query, [{
				"key" : "id",
				"value" : 1
			}
		]);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	return kony.sync.executeSql(tx, sql, params);
};

kony.sync.getScopeSettings = function (scopename, dbname, callback, errorcallback) {
	sync.log.trace("Entering kony.sync.getScopeSettings ");
	var settings = null;
	var isError = false;
	function getSettingsTransaction(tx) {
		var resultset = kony.sync.executeSql(tx, "select * from konysyncDIAGNOSTICS");
		var set = "";
		var rowItem = null;
		if (resultset !== false) {
			if (resultset.rows.length > 0) {
				rowItem = kony.db.sqlResultsetRowItem(tx, resultset, 0);
				set = rowItem.details;
			} else {
				sync.log.error("Updation of Scope Settings Failed");
			}
		} else {
			sync.log.error("Updation of Scope Settings Failed");
			isError = true;
			return;
		}
		var table = JSON.parse(set);
		if(!kony.sync.isNullOrUndefined(table.scopeSettings[scopename])) {
			settings = table.scopeSettings[scopename];
		}
	}

	function getSettingsCompleted() {
		callback(settings);
	}

	function getSettingsFailed() {
		kony.sync.callTransactionError(isError, errorcallback);
	}
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, getSettingsFailed, "getScopeSettings");
	if(dbconnection !== null){
		kony.sync.startTransaction(dbconnection, getSettingsTransaction, getSettingsCompleted, getSettingsFailed);
	}
};

kony.sync.isScopeInitialized = function (scopename, dbname, callback) {
	sync.log.trace("Entering kony.sync.isScopeInitialized ");
	function localcallback(settings) {
		if (settings !== null){
			if(settings.initialize === true) {
				callback(true);
			} else {
				callback(false);
			}
		} else {
			callback(false);
		}
	}
	
	function errorCallback(res){
		kony.sync.onDownloadCompletion(true, res);
	}
	var settings = kony.sync.getScopeSettings(scopename, dbname, localcallback, errorCallback);
};

kony.sync.setPragmaSize = function (tx) {
	sync.log.trace("Entering kony.sync.setPragmaSize ");
	return kony.sync.executeSql(tx, "PRAGMA CACHE_SIZE=50");
};

kony.sync.isValidJSTable = function(inputTable) {
	if (kony.sync.isNullOrUndefined(inputTable)) {
		return false;
	}
	return kony.type(inputTable) === "object" || kony.type(inputTable) === "Object" || kony.type(inputTable) === "Array";
};

kony.sync.isNull = function (val) {
	sync.log.trace("Entering kony.sync.isNull ");
	if (kony.sync.isNullOrUndefined(val)){
		return true;
	}	
	val = val + "";
	return (kony.string.equalsIgnoreCase(val, "null"));
};

//returns whether a error upload policy is continueonerror or not
kony.sync.isUploadErrorPolicyCOE = function (currentScope) {
	sync.log.trace("Entering kony.sync.isUploadErrorPolicyCOE ");
	var scopename = currentScope.ScopeName;
	//Added these redundant checks to check for OTA or Persistent Sync. As proper checks 
	//have not made in earlier implementation, we are doing this to avoid any backward compatibility issues.
	if(currentScope[kony.sync.syncStrategy] === kony.sync.syncStrategy_OTA) {
		if (currentScope[kony.sync.syncStrategy] === kony.sync.syncStrategy_OTA &&
			!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks]) && 
			!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][scopename])&&
			kony.string.equalsIgnoreCase(kony.sync.getString(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][scopename][kony.sync.sessionTaskUploadErrorPolicy]), kony.sync.sessionTaskUploadErrorPolicyCOE)){
			return true;
		}
		return false;
	}else {
		if (currentScope[kony.sync.syncStrategy] !== kony.sync.syncStrategy_OTA &&
			!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks]) && 
			!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][scopename])&&
			kony.string.equalsIgnoreCase(kony.sync.getString(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][scopename][kony.sync.sessionTaskUploadErrorPolicy]), kony.sync.sessionTaskUploadErrorPolicyCOE)){
			return true;
		}
		return false;
	}
};

kony.sync.isEmptyString = function (val) {
	sync.log.trace("Entering kony.sync.isEmptyString ");
	if(!kony.sync.isNullOrUndefined(val) && typeof(val)==="string" && val.trim()==="") {
		return true;
	} else {
		return false;
	}
};

kony.sync.isValidNumberType = function (val) {
	sync.log.trace("Entering kony.sync.isValidNumberType ");
	if (kony.string.equalsIgnoreCase(kony.type(val), "number")){
		return true;
	}	
	else if (kony.string.equalsIgnoreCase(kony.type(val), "string") && null !== kony.sync.tonumber(val)){
		return true;
	}	
	else{
		return false;
	}	

};

kony.sync.isValidBooleanType = function (val) {
	sync.log.trace("Entering kony.sync.isValidBooleanType ");
	if (kony.string.equalsIgnoreCase(kony.type(val), "boolean")) {
		return true;
	} else if (kony.string.equalsIgnoreCase(kony.type(val), "string")) {
		if (kony.string.equalsIgnoreCase(val, "false") || kony.string.equalsIgnoreCase(val, "true") || kony.string.equalsIgnoreCase(val, "0") || kony.string.equalsIgnoreCase(val, "1")) {
			return true;
		}
	} else if (kony.string.equalsIgnoreCase(kony.type(val), "number")) {
		if (val === 0 || val === 1) {
			return true;
		}
	}

	return false;
};

kony.sync.isMaliciousType = function (val) {
	sync.log.trace("Entering kony.sync.isMaliciousType ");
	if (kony.sync.isValidNumberType(val) && isNaN(val)){
		return "NaN";
	}	
	if (val === Number.POSITIVE_INFINITY || val === Number.NEGATIVE_INFINITY){
		return "infinity";
	}	
	return false;
};

kony.sync.genMaliciousTypeCheck = function (obj, errorcallback) {
	sync.log.trace("Entering kony.sync.genMaliciousTypeCheck ");
	if(!kony.sync.enableORMValidations){
		return false;
	}
	var errorMessage = null;
	var maliciousType = null;
	if (kony.string.equalsIgnoreCase(kony.type(obj), "object") || kony.string.equalsIgnoreCase(kony.type(obj), "table")) {
		for (var i in obj) {
			maliciousType = kony.sync.isMaliciousType(obj[i]);
			if (maliciousType !== false) {
				errorMessage = kony.sync.getErrorMessage(kony.sync.errorCodeMaliciousType, i, maliciousType);
				sync.log.error("Malicious object detected", kony.sync.getErrorTable(kony.sync.errorCodeMaliciousType, errorMessage));
				kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeMaliciousType, errorMessage));
				return true;
			} else {
				if (obj[i] === undefined){
					obj[i] = "null";
				}	
			}
		}
	} else {
		maliciousType = kony.sync.isMaliciousType(obj);
		if (maliciousType !== false) {
			errorMessage = kony.sync.getErrorMessage(kony.sync.errorCodeMaliciousType, "", maliciousType);
			sync.log.error("Malicious object detected", kony.sync.getErrorTable(kony.sync.errorCodeMaliciousType, errorMessage));
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeMaliciousType, errorMessage));
			return true;
		}
	}
	return false;
};

kony.sync.getBoolean = function (val) {
	sync.log.trace("Entering kony.sync.getBoolean ");
	if (kony.sync.isValidBooleanType(val)) {
		val = val + "";
		if (kony.string.equalsIgnoreCase(val, "true") || kony.string.equalsIgnoreCase(val, "1") || val === 1) {
			return true;
		} else {
			return false;
		}
	} else {
		return val;
	}
};

kony.sync.getString = function (val) {
	sync.log.trace("Entering kony.sync.getString ");
	if (kony.sync.isNull(val)) {
		return "";
	}
	return val.toString();
};

kony.sync.getUploadStatus = function (markForUpload) {
	sync.log.trace("Entering kony.sync.getUploadStatus ");
	if (markForUpload === false || markForUpload === "false") {
		return false;
	} else {
		return true;
	}
};

kony.sync.getDBName = function () {
	sync.log.trace("Entering kony.sync.getDBName ");
	var syncscopes = konysyncClientSyncConfig.ArrayOfSyncScope;
	if(syncscopes === null){
		return null;
	}
	for (var i = 0; i < syncscopes.length; i++) {
		var scope = syncscopes[i];
		//This logic needs to be changed when we have separate DB for each scope
		if (scope[kony.sync.scopeDataSource] !== null) {
			return scope[kony.sync.scopeDataSource];
		}
	}
	return null;
};

kony.sync.mergeTable = function (toObj, frmObj) {
	sync.log.trace("Entering kony.sync.mergeTable ");
	if (!kony.sync.isValidJSTable(frmObj)) {
		return toObj;
	}
	if (!kony.sync.isValidJSTable(toObj)) {
		return frmObj;
	}

	for (var k in frmObj) {
		toObj[k] = frmObj[k];
	}

	return toObj;
};

kony.sync.pkNotFoundErrCallback = function(errorcallback, objName){
	sync.log.trace("Entering kony.sync.pkNotFoundErrCallback ");
	sync.log.error("No data with specified primary key found in SyncObject " + objName + ".");
	errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeNoDataWithPrimaryKey, kony.sync.getErrorMessage(kony.sync.errorCodeNoDataWithPrimaryKey, objName)));
};

kony.sync.skyEventObserver = function (event, args, eventFinishCallback, errorcallback, isCascade) {
	sync.log.trace("Entering kony.sync.skyEventObserver ");
	if (event !== "START") {
		if (event === "ERROR") {
			if (!kony.sync.isNull(args)) {
				if (isCascade) {
					sky.rollbackTransaction(kony.sky.skyEmptyFunction);
				}
				var errorCode = args.ERRORCODE;
				var errorMsg = args.ERRORDESC;
				kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(errorCode, errorMsg));
			}
		}
		if (event === "FINISH") {
			kony.sync.verifyAndCallClosure(eventFinishCallback, args);
		}
	}
};

kony.sync.removeCascadeHelper_old = function (tx, srcAttribute, targetAttribute, tbname, wcs, targetObjectRemoveCascade, targetObjectName, isCascade, errorcallback, markForUpload, pkRecord, isLocal) {
	sync.log.trace("Entering kony.sync.removeCascadeHelper_old ");
	var wcsCascade = null;
	if (pkRecord === null) {
		var sqlTarget = "select " + srcAttribute + " from " + tbname + wcs;
		var resultSet = kony.sync.executeSql(tx, sqlTarget, null);
		if (resultSet === false) {
			return false;
		}
		var num_records = resultSet.rows.length;
		if (num_records === 0) {
			return true;
		}
		if (isCascade) {
			sync.log.debug("No of Records to be deleted in " + targetObjectName + " for cascade delete=" + num_records);
		}
		for (var i = 0; i <= num_records - 1; i++) {
			var record = kony.db.sqlResultsetRowItem(tx, resultSet, i);
			wcsCascade = " where " + targetAttribute + " = '" + record[srcAttribute] + "'";
			if (targetObjectRemoveCascade(tx, wcsCascade, errorcallback, markForUpload, isCascade, tbname, isLocal) === false) {
				return false;
			}
		}
	} else {
		wcsCascade = " where " + targetAttribute + " = '" + pkRecord[srcAttribute] + "'";
		return targetObjectRemoveCascade(tx, wcsCascade, errorcallback, markForUpload, isCascade, tbname, isLocal);
	}
	return true;
};

kony.sync.removeCascadeHelper = function (tx,srcAttributes,targetAttributes, tbname, wcs, targetObjectRemoveCascade, targetObjectName, isCascade, errorcallback, markForUpload, pkRecord, isLocal) {
	sync.log.trace("Entering kony.sync.removeCascadeHelper ");
	var wcsCascade = null;
	if (pkRecord === null) {
		var sqlTarget = "select ";
		var sourceAttribute = "";
		for (var i = 0; i < srcAttributes.length; i++) {
				sourceAttribute =  sourceAttribute + srcAttributes[i];
				if(i != srcAttributes.length - 1)	{
					sourceAttribute = sourceAttribute + ","
				}
		};
		sqlTarget = sqlTarget + sourceAttribute + " from " + tbname + wcs;

		var resultSet = kony.sync.executeSql(tx, sqlTarget, null);
		if (resultSet === false) {
			return false;
		}
		var num_records = resultSet.rows.length;
		if (num_records === 0) {
			return true;
		}
		if (isCascade) {
			sync.log.debug("No of Records to be deleted in " + targetObjectName + " for cascade delete=" + num_records);
		}
			wcsCascade = " where ";
			for (var i = 0; i <= num_records - 1; i++) {
				var record = kony.db.sqlResultsetRowItem(tx, resultSet, i);
				var srcAttributesLen = srcAttributes.length;
				for (var j = 0; j < srcAttributesLen ; ++j) {
					wcsCascade = wcsCascade + targetAttributes[j] + " = '" + record[srcAttributes[j]] + "'"
					if(j != srcAttributesLen - 1)	{
						wcsCascade  =  wcsCascade + " and "
					}
				}
				if(i != num_records - 1)	{
						wcsCascade  =  wcsCascade + " or " ;
				}
			}
			if (targetObjectRemoveCascade(tx, wcsCascade, errorcallback, markForUpload, isCascade, tbname, isLocal) === false) {
				return false;
			}
	}
	else {
			wcsCascade = " where ";
			var srcAttributesLen = srcAttributes.length;
			for (var j = 0; j < srcAttributesLen ; j++) {
					wcsCascade = wcsCascade + targetAttributes[j] + " = '" + pkRecord[srcAttributes[j]] + "'"
					if(j != srcAttributesLen - 1)	{
						wcsCascade  =  wcsCascade + " and "
					}
			}
		return targetObjectRemoveCascade(tx, wcsCascade, errorcallback, markForUpload, isCascade, tbname, isLocal);
	}
	return true;
};

kony.sync.rollbackTransaction = function (tx) {
	sync.log.trace("Entering kony.sync.rollbackTransaction ");
	function dummyError() {
		//rollback the transaction
		return true;
	}
	//dummy statement
	kony.db.executeSql(tx, "dummy", null, dummyError);
};

//Wrapper for kony.db.executeSql
kony.sync.executeSql = function (tx, sql, params, errorCallback, rollback, opMsg) {
	sync.log.trace("Entering kony.sync.executeSql ");
	kony.sync.errorObject = null;
	if (!kony.sync.isNullOrUndefined(opMsg)) {
		sync.log.debug(opMsg);
	}
	sync.log.debug("SQL Query : ", sql);
	sync.log.debug("SQL Params : ", params);
	var result = kony.db.executeSql(tx, sql, params, localErrorCallback);
	if (result === null) {
		sync.log.error("Query execution failed: " + sql + " with params : ",params);
		return false;
	} else {
		sync.log.debug("Query execution success: "+ sql + " with params : ",params);
		sync.log.debug("Result of query execution is: ", result);
		return result;
	}
	function localErrorCallback(tx, res) {
		var errorInfo = {};
		errorInfo[kony.sync.errorInfoTransactionID] = tx;
		errorInfo[kony.sync.errorInfoDatabaseError] = res;
		sync.log.error("SQLite Error : ", res);
		kony.sync.errorObject = kony.sync.getErrorTable(kony.sync.errorCodeSQLStatement, kony.sync.getErrorMessage(kony.sync.errorCodeSQLStatement), errorInfo);
	//	kony.sync.verifyAndCallClosure(errorCallback, kony.sync.getErrorTable(kony.sync.errorCodeSQLStatement, kony.sync.getErrorMessage(kony.sync.errorCodeSQLStatement), errorInfo));
		if (rollback === false) {
			return false;
		} else {
			return true;
		}
	}
};

kony.sync.callTransactionError = function(isError, errorcallback){
	sync.log.trace("Entering kony.sync.callTransactionError ");
	kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getTransactionError(isError));
};

kony.sync.validateWhereClause = function(wcs){
	sync.log.trace("Entering kony.sync.validateWhereClause ");
	if(!kony.sync.enableORMValidations){
		return wcs;
	}
	if(kony.sync.isNull(wcs)){
		return "";
	}
	wcs = kony.sync.getString(wcs);
	wcs = kony.string.trim(wcs);
	var twcs = kony.string.lower(wcs);
	
	if(twcs !== ""){
		// check if the where clause starts with a reserved keyword, else append "where" keyword
		if(!kony.sync.startsWithKeyword(twcs)){
			wcs = " where " +  wcs;
		}
	}
	return wcs;
};

//check whether the given data contains the key 
kony.sync.contains = function(data, key){
	sync.log.trace("Entering kony.sync.contains ");
	//currently implementing for array only
	for(var i in data){
		if(data[i]===key){
			return true;
		}
	}
	return false;
};

kony.sync.createHash = function(hash, plaintext){
	sync.log.trace("Entering kony.sync.createHash ");
    return kony.crypto.createHash(hash, plaintext);
};

kony.sync.getChunkDownloadURL = function(){
	sync.log.trace("Entering kony.sync.getChunkDownloadURL ");
    var server = kony.sync.getServerURL();
    return server + "downloadchunk";
};

kony.sync.getUploadBatchSize = function(){
	sync.log.trace("Entering kony.sync.getUploadBatchSize ");
    if (kony.sync.isValidNumberType(kony.sync.currentSyncConfigParams.uploadbatchsize)) {
        return kony.sync.tonumber(kony.sync.currentSyncConfigParams.uploadbatchsize);
    }
	return 50; //default batch size
};
kony.sync.isValidJSTable = function (inputTable){
	if (kony.sync.isNullOrUndefined(inputTable)) {
		return false;
	}
	if (kony.type(inputTable) === "object" || kony.type(inputTable) === "Array") {
		return true;
	} else {
		return false;
	}
};

kony.sync.deleteMapKey = function(map, key){
	sync.log.trace("Entering kony.sync.deleteMapKey ");
	if(!kony.sync.isNull(map) && !kony.sync.isNull(key)){
		delete map[key];
	}
};

kony.sync.getServerDetailsHostName = function(response){
	sync.log.trace("Entering kony.sync.getServerDetailsHostName ");
	if(!kony.sync.isNullOrUndefined(response) && !kony.sync.isNullOrUndefined(response.d) && !kony.sync.isNullOrUndefined(response.d.server)){
		return response.d.server.hostName;
	}else{
		return null;
	}
};

kony.sync.getServerDetailsIpAddress = function(response){
	sync.log.trace("Entering kony.sync.getServerDetailsIpAddress ");
	if(!kony.sync.isNullOrUndefined(response) && !kony.sync.isNullOrUndefined(response.d) && !kony.sync.isNullOrUndefined(response.d.server)){
		return response.d.server.ipAddress;
	}else{
		return null;
	}
};

kony.sync.addServerDetails = function(returnParams, serverResponse){
	if(!kony.sync.isNullOrUndefined(returnParams)){
		returnParams[kony.sync.serverDetails] = {};
		returnParams[kony.sync.serverDetails][kony.sync.hostName] = kony.sync.getServerDetailsHostName(serverResponse);
        returnParams[kony.sync.serverDetails][kony.sync.ipAddress] = kony.sync.getServerDetailsIpAddress(serverResponse);
	}
};

//This function gets connection
kony.sync.getConnectionOnly = function(dbName, displayName, errorCallback, moduleName) {
	sync.log.trace("Entering kony.sync.getConnectionOnly ");
	var estimatedDBSize = 5 * 1024 * 1024;
	var connection = null;
	var version = "1.0";
	var exceptionObject = null;
	function makeEncryptedConnection(){
		if(kony.sync.deviceDBEncryptionKey===null){
			connection = kony.db.openDatabaseSync(dbName, version, displayName, estimatedDBSize);
		}	
		else{
			sync.log.info("Opening encrypted connection", kony.sync.deviceDBEncryptionKey);
			connection = kony.db.openDatabaseSync(dbName, version, displayName, estimatedDBSize, kony.sync.deviceDBEncryptionKey);
		}
	}
	try{
	//#ifdef KONYSYNC_ENCRYPTION_AVAILABLE
		makeEncryptedConnection();
	//#else
		connection = kony.db.openDatabaseSync(dbName, version, displayName, estimatedDBSize);
	//#endif
	}catch(e){
		connection = null;
		exceptionObject = e;
	}
	if(connection === null){
		if(kony.sync.isNullOrUndefined(moduleName)){
			moduleName = "";
		}else{
			moduleName += ": ";
		}
		sync.log.fatal(moduleName + "Error in getting connection");
		kony.sync.verifyAndCallClosure(errorCallback, kony.sync.getErrorTable(kony.sync.errorCodeDbConnection, kony.sync.getErrorMessage(kony.sync.errorCodeDbConnection), exceptionObject));
	}
	return connection;
};

kony.sync.createDBEncryptionKey = function(passPhrase){
	sync.log.trace("Entering kony.sync.createDBEncryptionKey ");
	if(kony.sync.deviceDBEncryptionKey===null && passPhrase!==null && passPhrase!==undefined && !kony.sync.isEmptyString(passPhrase)){
		//#ifdef KONYSYNC_IOS
			kony.sync.deviceDBEncryptionKey = ["PRAGMA key = '" + passPhrase + "'"];
		//#endif
		//#ifdef KONYSYNC_ANDROID
			kony.sync.deviceDBEncryptionKey = passPhrase;
		//#endif
		//#ifdef KONYSYNC_WINDOWS
			kony.sync.deviceDBEncryptionKey = passPhrase;
		//#endif
	}
};

kony.sync.isValidFunctionType = function (closure) {
	sync.log.trace("Entering kony.sync.isValidFunctionType ");
	return kony.type(closure) === "function";
};

kony.sync.getTransactionError = function(isError){
	sync.log.trace("Entering kony.sync.getTransactionError ");
	if (!isError) {
		sync.log.error("Transaction error occurred : ", kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
		return kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null);
	}
	else{
		sync.log.error("Statement error occurred : ", kony.sync.errorObject);
		return kony.sync.errorObject;
	}
};

kony.sync.isNullOrUndefined = function(val){
	if(val === null || val === undefined){
		return true;
	}else{
		return false;
	}
};

kony.sync.formOrderByClause = function(tablename, map){
	sync.log.trace("Entering kony.sync.formOrderByClause function");
	if(map !== null && map !== undefined){
		var scope = kony.sync.scopes[kony.sync.scopes.syncTableScopeDic[tablename]];
		var columns = scope.syncTableDic[tablename].ColumnsDic;
		for (var k=0;k < map.length; k++){
			var v = map[k];
			if(!kony.sync.isValidJSTable(v)){
				sync.log.warn("Ignoring the orderby entry " + v + " as it is not a valid js object");
				delete map[k];
				continue;
			}
			if(kony.sync.isNull(columns[v.key])){
				sync.log.warn("Ignoring the orderby entry " + v.key + " for the SyncObject " + tablename + ". "  + v.key + " is not defined as an attribute in SyncConfiguration.");
				delete map[k];
			}
		}	
		//var valuestable = kony.sync.convertOrderByMapToValuesTable(map);
		//return kony.sync.convertToValuesTableOrderByMap(map,valuestable);
		return map;
	}
};


//function to check if where clause starts with a SQLite reserved keyword
kony.sync.startsWithKeyword = function (wcs) {
	var keywordTable = ["where ", "limit ", "group ", "order ", "join "];
	for(var i = 0 ; i < keywordTable.length ; i++) {	
		if(kony.string.startsWith(wcs, keywordTable[i])){
			return true;
		}
	}
	return false;
};

kony.sync.getChannelName = function(){
	var returnVal = "";
	//#ifdef KONYSYNC_MOBILE
		returnVal = "mobile";
	//#endif
	//#ifdef KONYSYNC_TAB
		returnVal = "tablet";
	//#endif
	//#ifdef KONYSYNC_DESKTOP
		returnVal = "desktop";
	//#endif
	return returnVal;
};


kony.sync.getPlatformName = function(){
	var returnVal = "";
	//#ifdef KONYSYNC_IOS
		returnVal = "ios";
	//#endif
	//#ifdef KONYSYNC_WINDOWS
		returnVal = "windows";
	//#endif
	//#ifdef KONYSYNC_ANDROID
		returnVal = "android";
	//#endif
	//#ifdef KONYSYNC_J2ME
		returnVal = "j2me";
	//#endif
	//#ifdef KONYSYNC_BB
		returnVal = "blackberry";
	//#endif
	return returnVal;
};
//  **************** End KonySyncHelper.js*******************


//  **************** Start KonySyncInit.js*******************
if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}

if(typeof(sync)=== "undefined"){
	sync = {};
}

if(typeof(kony.sync.blobManager) === "undefined") {
	kony.sync.blobManager = {};
}

//Initializes the DB with Generated Scope
sync.init = function(on_sync_init_success, on_sync_init_error) {
	if(kony.sync.isValidJSTable(on_sync_init_success)===true){
		//new style, user called as sync.init(config)
		on_sync_init_error = on_sync_init_success[kony.sync.onSyncInitErrorParam];
		kony.sync.createDBEncryptionKey(on_sync_init_success[kony.sync.deviceDBEncryptionKeyParam]);
		on_sync_init_success = on_sync_init_success[kony.sync.onSyncInitSuccessParam];
	}
    // Create the database from xml. It also contains the provisioning commands
    var syncscopes = konysyncClientSyncConfig.ArrayOfSyncScope;
    kony.sync.syncConfigurationDBName = konysyncClientSyncConfig.AppID;
	var isError = false;
	var dbExists = false;
    
	function loadDatabase() {
		sync.log.trace("Entering loadDatabase");
        var createDB = false;
        syncscopes.syncTableScopeDic = [];
        syncscopes.syncScopeBlobInfoMap = {};
        var currentscope = null;
        var currenttemptable = null;
        sync.log.info("loading DB");

        function dbValidationCompleted() {
			sync.log.trace("Entering dbValidationCompleted");
            loadSyncScope(0);
        }

        function loadDatabaseTransaction(tx) {
			sync.log.trace("Entering loadDatabaseTransaction");
            // this is to be uncommented when we have db for each scope
            //for i, ddl in ipairs ( DDLCommands[currentscope[kony.sync.scopeName]] ) do 
            var DDLCommands = null;
           if ((kony.sync.getBackEndDBType() === kony.sync.dbTypeSQLCE)) {
                DDLCommands = konysyncSQLCEDDLCommands;
            } else {
                DDLCommands = konysyncSQLLiteDDLCommands;
            }
            if(!kony.sync.isNullOrUndefined(DDLCommands)){
				for (var i = 0; i < DDLCommands.length; i++) {
					var ddl = DDLCommands[i];
					sync.log.debug("ddl :" + ddl);
					if(kony.sync.executeSql(tx, ddl)===false){
						isError = true;
						return;
					}
				}
			}
			if(kony.sync.initializeScopeSettings(tx)===false){
				isError = true;
				return;
			}
			if(kony.sync.setPragmaSize(tx)===false){
				isError = true;
				return;
			}
        }
		
        function dbexistsErrorCallback() {
			sync.log.trace("Entering dbexistsErrorCallback");
            //Create DB
            createDB = true;
            sync.log.info("creating DB");
			var conn = kony.sync.getConnectionOnly(currentscope[kony.sync.scopeDataSource], currentscope[kony.sync.scopeDataSource], on_sync_init_error);
			if(conn!==null){
				kony.sync.startTransaction(conn, loadDatabaseTransaction, dbValidationCompleted, initTransactionError);
			}
        }

        function dbexistsSuccessCallback() {
			sync.log.trace("Entering dbexistsSuccessCallback");
            loadSyncScope(0);
        }
		
		//for a given table getting the reverseRelationships information
		//for a child table getting the  relationship data from a parent where child is targetobject
        function getParentRelationships(currentscope,synctable){
        	parentRelationshipMap = {};
        	scopeTables = currentscope.ScopeTables;
        	if(!kony.sync.isNullOrUndefined(scope.ScopeTables)){
        		tables_length = scopeTables.length;
	        	for(var i=0;i<tables_length;i++){
	        		var currentTable = scopeTables[i];
	        		var RelationshipAttributes = [];
	        		if(!kony.sync.isNullOrUndefined(currentTable.Relationships.OneToMany)){
	        			relationships_OneToMany = currentTable.Relationships.OneToMany;
	        			OneToMany_length = relationships_OneToMany.length;
	        			for(var j=0;j<OneToMany_length;j++){
			        		//var attributeMap = {};
			        		currentRelationShip = relationships_OneToMany[j];
	        				if(currentRelationShip.TargetObject === synctable.Name){
	        					relationshipAttributes = currentRelationShip.RelationshipAttributes;
	        					relationshipAttributes_length = relationshipAttributes.length;
	        					for(var k = 0 ;k<relationshipAttributes_length;k++){
	        						attributes ={} 
		        					attributes["ParentObject_Attribute"] = relationshipAttributes[k].SourceObject_Attribute;
		        					attributes["ChildObject_Attribute"] = relationshipAttributes[k].TargetObject_Attribute;
		        					RelationshipAttributes.push(attributes)
	        					}
	        				}
	        			}
	        		}
					if(RelationshipAttributes.length != 0){	
						parentRelationshipMap[currentTable.Name] = RelationshipAttributes;
					}
	        	}
        	}
        	return parentRelationshipMap;
        }
		var j = 0;
		kony.sync.scopeDict = {};
		if(!kony.sync.isNullOrUndefined(syncscopes)){
			for (var i = 0; i < syncscopes.length; i++) {
				var scope = syncscopes[i];
				kony.sync.scopeDict[syncscopes[i].ScopeName] = scope;
				currentscope = scope;
				syncscopes[i] = scope;
				scope.Index = i;
				scope.syncTableDic = [];
				scope.reverseRelationships = {};
				// create helper dictionaries
				if(!kony.sync.isNullOrUndefined(scope.ScopeTables)){
					for (var k = 0;	k < scope.ScopeTables.length; k++) {
						var syncTable = scope.ScopeTables[k];
						scope.syncTableDic[syncTable.Name] = syncTable;
						scope.syncTableDic[syncTable.Name + kony.sync.historyTableName] = syncTable;
						scope.syncTableDic[syncTable.Name + kony.sync.parentRelationshipMap] = getParentRelationships(scope,syncTable);
						//reverse relationship mapping
						if(!kony.sync.isNullOrUndefined(syncTable.Relationships.ManyToOne)){
							for (j = 0; j < syncTable.Relationships.ManyToOne.length; j++) {
								var rTable = syncTable.Relationships.ManyToOne[j].TargetObject;
								if(kony.sync.isNullOrUndefined(scope.reverseRelationships[rTable])){
									scope.reverseRelationships[rTable] = [];
								}
								if(!kony.sync.isNullOrUndefined(syncTable.Relationships.ManyToOne[j].RelationshipAttributes))	{
									var relationshipAttributes = syncTable.Relationships.ManyToOne[j].RelationshipAttributes;
									var attributeMap = {};
									attributeMap.RelationshipAttributes = [];
									attributeMap.TargetObject = syncTable.Name;
									for (var iter = 0; iter < relationshipAttributes.length; iter++) {
										var attributes = {};
										attributes["SourceObject_Attribute"] = relationshipAttributes[iter].TargetObject_Attribute;
										attributes["TargetObject_Attribute"] = relationshipAttributes[iter].SourceObject_Attribute;
										attributeMap.RelationshipAttributes.push(attributes);
									};
                                    scope.reverseRelationships[rTable].push(attributeMap);
								}  
								else	
								{
									scope.reverseRelationships[rTable].push({	SourceObject_Attribute: syncTable.Relationships.ManyToOne[j].TargetObject_Attribute, 
																		TargetObject: syncTable.Name, 
																		TargetObject_Attribute: syncTable.Relationships.ManyToOne[j].SourceObject_Attribute
																	});
								}
								
							}												
						}
						syncscopes.syncTableScopeDic[syncTable.Name] = scope.ScopeName;
						syncscopes.syncTableScopeDic[syncTable.Name + kony.sync.historyTableName] = scope.ScopeName;
						syncTable.ColumnsDic = [];
						if(!kony.sync.isNullOrUndefined(syncTable.Columns)){
							for (j = 0; j < syncTable.Columns.length; j++) {
								var syncColumn = syncTable.Columns[j];
								syncTable.ColumnsDic[syncColumn.Name] = syncColumn;
								if(syncColumn.type === kony.sync.blob) {
									if(kony.sync.isNullOrUndefined(syncscopes.syncScopeBlobInfoMap[syncTable.Name])) {
										syncscopes.syncScopeBlobInfoMap[syncTable.Name] = {};
										syncscopes.syncScopeBlobInfoMap[syncTable.Name][kony.sync.columns] = [];
									}
									syncscopes.syncScopeBlobInfoMap[syncTable.Name][kony.sync.columns].push(syncColumn.Name);
								}
							}
						}
						currenttemptable = syncTable.Name;
					}
				}
				//Note This change will be undone once we have 1 DB for each scope.
				
				sync.log.info("*************" + "\n",scope);
				sync.log.info("\n" + "*************");
			}
		}
        kony.sync.scopes = syncscopes;
        kony.sync.scopes.scopecount = syncscopes.length;
        /*removing check for existence of 1st table as 1st table may change for dynamic schema changes
		kony.sync.single_execute_sql(currentscope[kony.sync.scopeDataSource], sqlcheckfordb + " LIMIT 1", null, dbexistsSuccessCallback, dbexistsErrorCallback);*/
		if(dbExists){
			dbexistsSuccessCallback();
		}else{
			dbexistsErrorCallback();
		}
    }
 
	//Check If DB is created or not		
    function loadSyncScope(scopeindex) {
		sync.log.trace("Entering loadSyncScope");
		var addmetainfo = false;
        var scope = kony.sync.scopes[scopeindex];
        //Add scopes to MetaInfo table if not created and Initialize kony.sync.currentSyncScopesState table.	
        function loadSyncScopeTransaction(tx) {
			sync.log.trace("Entering loadSyncScopeTransaction");
			var query = null;
			var query_compile = null;
			var sql = null;
			var params = null;
			// check whether scope exists in metainfo after schema upgrade
			sql = "select * from " + kony.sync.metaTableName + " where scopename = '" + scope.ScopeName + "'";
			var resultSet = kony.sync.executeSql(tx, sql, null);
			if(resultSet===false){
				isError = true;
				return;
			}
			if(resultSet.rows.length === 0){
				//the scope does not exist in the metainfo table and so has to be added
				addmetainfo = true;
			}			
			
            if (addmetainfo) {
               query = kony.sync.qb_createQuery();
                kony.sync.qb_set(query, {
                    id: "" + scopeindex,
                    filtervalue: "no filter",
                    scopename: scope.ScopeName,
                    versionnumber: 0,
                    lastserversynccontext: "",
					lastserveruploadsynccontext: "",
                    replaysequencenumber: 0,
                    lastgeneratedid: -1
                });
                
                kony.sync.qb_insert(query, kony.sync.metaTableName);
                //local sql = "insert into "..kony.sync.metaTableName.." (id,scopename,versionnumber,lastserversynccontext,replaysequencenumber,lastgeneratedid) values ('"..id.."','"..scope.ScopeName.."','0','','0','-1')"
				query_compile = kony.sync.qb_compile(query);
                sql = query_compile[0];
                params = query_compile[1];
                if(kony.sync.executeSql(tx, sql, params)===false){
					isError = true;
				}
                kony.sync.currentSyncScopesState[scope.ScopeName] = 0;
            } else {
				query = kony.sync.qb_createQuery();                
                kony.sync.qb_select(query, [kony.sync.metaTableSyncVersionCloumn]);                
                kony.sync.qb_from(query, kony.sync.metaTableName);                
                kony.sync.qb_where(query, [{
                    key: kony.sync.metaTableScopeColumn,
                    value: scope.ScopeName
                }]);
                //local sql = "select "..kony.sync.metaTableSyncVersionCloumn.." from "..kony.sync.metaTableName.." where "..kony.sync.metaTableScopeColumn.."='"..scope.ScopeName.."'";
				query_compile = kony.sync.qb_compile(query);
                sql = query_compile[0];
                params = query_compile[1];
                var resultset = kony.sync.executeSql(tx, sql, params);
                if(resultset !== false && resultset.rows.length > 0){
					var rowItem = kony.db.sqlResultsetRowItem(tx, resultset, 0);
					if (!kony.sync.isNullOrUndefined(rowItem[kony.sync.metaTableSyncVersionCloumn])) {
						kony.sync.currentSyncScopesState[scope.ScopeName] = rowItem[kony.sync.metaTableSyncVersionCloumn];
					} else {
						kony.sync.isResetInProgress = false;
						isError = true;
					}
				}
				else {
					kony.sync.isResetInProgress = false;
					isError = true;
				}
            }
			//Check for Sync Version 5.5.6
			if(kony.sync.checkForUpdate556to559Schema(tx) === false){
				isError = true;
			}
			//Check for Sync Version 5.5.9
			if(kony.sync.checkForUpdate559to560Schema(tx) === false){
				isError = true;
			}
        }

        function loadSyncScopeSuccess() {
			sync.log.trace("Entering loadSyncScopeSuccess");
			//schema changed
			if(kony.sync.configVersion !== konysyncClientSyncConfig.Version){
				kony.sync.schemaUpgradeNeeded = true;
				//kony.sync.verifyAndCallClosure(on_sync_init_error, kony.sync.getSchemaUpgradeNeededError());
				//return;
			}
			if(isError === true){
				kony.sync.verifyAndCallClosure(on_sync_init_error, kony.sync.getScopeLoadingFailed());
			}
            if (scopeindex !== kony.sync.scopes.length - 1) {
                loadSyncScope(scopeindex + 1);
            } else {
				checkForStaleScope(checkForStaleScopeCallback);	
            }
        }
		
		function checkForStaleScopeCallback(){
			kony.sync.isResetInProgress = false;
			kony.sync.syncInitialized = true;
			//init the onDemand polling thread
			//TODO - returns function handler.
			if(typeof(sync.util) !== "undefined") {
				 sync.util.onDemandThreadInit(
					kony.sync.blobManager.getNextOnDemandJob,
					kony.sync.blobManager.onDemandUniversalSuccessCallback,
					kony.sync.blobManager.onDemandUniversalErrorCallback);

			}
			//TODO : handling error in thread init.
			//init the binaryNotifier map
			kony.sync.blobManager.binaryNotifierMap = {};

			kony.sync.verifyAndCallClosure(on_sync_init_success);
		}
		
		function checkForStaleScope(callback){
			var connection = kony.sync.getConnectionOnly(kony.sync.scopes[0][kony.sync.scopeDataSource], kony.sync.scopes[0][kony.sync.scopeDataSource], on_sync_init_error);
			if(connection!==null){
				kony.sync.startTransaction(connection, transactionCallback, transactionSuccessCallback, initTransactionError);
			}
			
			function transactionCallback(tx){
				//Create ScopeMap
				var scopeNames = "";
				for(var i=0;i<kony.sync.scopes.length;i++){
					if(i!==0){
						scopeNames +=",";
					}
					scopeNames +=  "'" + kony.sync.scopes[i].ScopeName + "'";
				}
				var sql = "delete from " + kony.sync.metaTableName + " where " + kony.sync.metaTableScopeColumn + " not in (" + scopeNames + ")";
				
				if(kony.sync.executeSql(tx, sql, null)===false){
					isError = true;
				}
			}
			
			function transactionSuccessCallback(){
				callback();
			}
		
		}
		var scopename = scope.ScopeName;
        syncscopes[scopename] = scope;
        var connection = kony.sync.getConnectionOnly(scope[kony.sync.scopeDataSource], scope[kony.sync.scopeDataSource], on_sync_init_error);
		if(connection!==null){
			kony.sync.startTransaction(connection, loadSyncScopeTransaction, loadSyncScopeSuccess, initTransactionError);
		}
    }

    function generateClientDeviceID() {
		sync.log.trace("Entering generateClientDeviceID");
        function createTable() {
			sync.log.trace("Entering createTable");
            var sqltable = "create table " + kony.sync.syncConfigurationTableName + " (" + 
							kony.sync.syncConfigurationColumnDeviceIDName + " nvarchar(4000)," + 
							kony.sync.syncConfigurationColumnInstanceIDName + " nvarchar(4000)," +
							kony.sync.syncConfigurationColumnVersion + " nvarchar(4000)," +
							kony.sync.syncConfigurationColumnSchemaUpgradeContext + " nvarchar(4000))";
            kony.sync.single_execute_sql(kony.sync.syncConfigurationDBName, sqltable, null, createDeviceID, on_sync_init_error);
        }

        function createDeviceID() {
			sync.log.trace("Entering createDeviceID");
            kony.sync.deviceId = "";
            kony.sync.instanceId = "";
            var settable = [];
            settable[kony.sync.syncConfigurationColumnDeviceIDName] = kony.sync.deviceId;
            settable[kony.sync.syncConfigurationColumnInstanceIDName] = kony.sync.instanceId;
			kony.sync.configVersion = konysyncClientSyncConfig.Version;
			settable[kony.sync.syncConfigurationColumnVersion] = kony.sync.configVersion;
			var query = kony.sync.qb_createQuery();
            kony.sync.qb_set(query, settable);            
            kony.sync.qb_insert(query, kony.sync.syncConfigurationTableName);
            var query_compile = kony.sync.qb_compile(query);
            var sqlinsert = query_compile[0];
            var params = query_compile[1];
            kony.sync.single_execute_sql(kony.sync.syncConfigurationDBName, sqlinsert, params, loadDatabase, on_sync_init_error);
        }

        function setDeviceID(configRow) {
			dbExists = true;
			sync.log.trace("Entering setDeviceID");
            kony.sync.deviceId = configRow[kony.sync.syncConfigurationColumnDeviceIDName];
            kony.sync.instanceId = configRow[kony.sync.syncConfigurationColumnInstanceIDName];
			kony.sync.configVersion = configRow[kony.sync.syncConfigurationColumnVersion];
            loadDatabase();
        }
		var query = kony.sync.qb_createQuery();
        
        kony.sync.qb_select(query, null);
        
        kony.sync.qb_from(query, kony.sync.syncConfigurationTableName);
        kony.sync.single_execute_sql(kony.sync.syncConfigurationDBName, "select * from " + kony.sync.syncConfigurationTableName+" LIMIT 1", null, setDeviceID, createTable);
    }
    
	function initTransactionError(){
		sync.log.trace("Entering initTransactionError");
		kony.sync.callTransactionError(isError, on_sync_init_error);
	}
	generateClientDeviceID();
};

sync.reset = function(successcallback, errorcallback) {
	if(kony.sync.isResetInProgress){
		sync.log.warn("Reset already in progress...");
		return;
	}
	if(kony.sync.isValidJSTable(successcallback)===true){
		//new style, user called as sync.reset(config)
		errorcallback = successcallback[kony.sync.onSyncResetErrorParam];
		kony.sync.createDBEncryptionKey(successcallback[kony.sync.deviceDBEncryptionKeyParam]);
		successcallback = successcallback[kony.sync.onSyncResetSuccessParam];
	}
	kony.sync.isResetInProgress = true;
	kony.sync.schemaUpgradeNeeded = false;
	kony.sync.syncConfigurationDBName = konysyncClientSyncConfig.AppID;
    var dbList = [];    
    kony.table.insert(dbList, {
        dbname: kony.sync.syncConfigurationDBName,
        tableList: [kony.sync.syncConfigurationTableName, kony.sync.chunkMetaTableName, kony.sync.chunkTableName, kony.sync.metaTableName, kony.sync.pendingUploadTableName, "konysyncDIAGNOSTICS", "konysyncBLOBSTOREMANAGER"]
    });
	if(konysyncClientSyncConfig.ArrayOfSyncScope !== null && konysyncClientSyncConfig.ArrayOfSyncScope !== undefined){
		for (var i = 0; i < konysyncClientSyncConfig.ArrayOfSyncScope.length; i++) {
			var v = konysyncClientSyncConfig.ArrayOfSyncScope[i];
			var tab = [];
			for (var k in v.ScopeTables) {
				var w = v.ScopeTables[k];
				kony.table.insert(tab, w.Name);
				kony.table.insert(tab, w.Name + kony.sync.historyTableName);
				kony.table.insert(tab, w.Name + kony.sync.originalTableName);
			}
			/*if ((i === 1)) {
				kony.table.insert(tab, kony.sync.metaTableName);
				kony.table.insert(tab, "konysyncDIAGNOSTICS");
			}*/
			kony.table.insert(dbList, {
				dbname: v.ScopeDatabaseName,
				tableList: tab
			});
		}
    }
    kony.sync.syncDropDatabase(dbList, successcallback, errorcallback);
};

sync.rollbackPendingLocalChanges = function(successcallback, errorcallback) {
    if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
    kony.sync.rollbackCurrentScope = null;
	kony.sync.konySyncRollBackPendingChanges(null, null, null, successcallback, errorcallback, true, 0);
	
};

sync.getPendingAcknowledgement = function(successcallback, errorcallback) {
    if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
    kony.sync.pendingAckIndex = 0;
    kony.sync.pendingAckResult = {};
    var currentScope = kony.sync.scopes[0];
    var dbname = currentScope[kony.sync.scopeDataSource];
    var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
    kony.sync.pendingAckCount = 0;
	var isError = false;

    function konysyncPendingAck_transaction(tx) {
		sync.log.trace("Entering konysyncPendingAck_transaction");
        function single_transaction_callback_local(sql, params, tbname) {
			sync.log.trace("Entering single_transaction_callback_local");
            var resultSet = kony.sync.executeSql(tx, sql, params);
			if(resultSet===false){
				isError = true;
				return false;
			}
            var tableData = [];
            var num_records = resultSet.rows.length;
            for (var j = 0; j <= num_records - 1; j++) {
                var record = kony.db.sqlResultsetRowItem(tx, resultSet, j);
                kony.table.insert(tableData, record);
            }
            if ((num_records > 0)) {
                kony.sync.pendingAckCount = kony.sync.pendingAckCount + num_records;
                //table.insert(kony.sync.pendingAckResult,tableData);
                kony.sync.pendingAckResult[tbname] = {};
                kony.sync.pendingAckResult[tbname].count = num_records;
                kony.sync.pendingAckResult[tbname].data = tableData;
            }
        }
        if(!kony.sync.isNullOrUndefined(currentScope.ScopeTables)){
			for (var i = 0; i < currentScope.ScopeTables.length; i++) {
				var syncTable = currentScope.ScopeTables[i];
				var tbname = syncTable.Name;
				var currentversion = kony.sync.getCurrentVersionNumber(tbname);
				var sql = "select * from " + tbname + " WHERE " + kony.sync.mainTableChangeTypeColumn + " is not null AND " + kony.sync.mainTableChangeTypeColumn + " <> -1 AND " + kony.sync.mainTableSyncVersionColumn + " <> " + currentversion + " AND " + kony.sync.mainTableChangeTypeColumn + " NOT LIKE '9%'";
				if(single_transaction_callback_local(sql, null, tbname)===false){
					return;
				}
			}
		}
    }

    function konysyncPendingAck_transactionSucessCallback() {
		sync.log.trace("Entering konysyncPendingAck_transactionSucessCallback");
        sync.log.info("Get Pending Acknowledgement Count = ", kony.sync.pendingAckCount);
        sync.log.info("Get Pending Acknowledgement = ", kony.sync.pendingAckResult);
        if ((kony.sync.pendingAckIndex === kony.sync.scopes.scopecount - 1)) {
            var konysyncPendingAckDic = {};
            konysyncPendingAckDic.totalCount = kony.sync.pendingAckCount;
            konysyncPendingAckDic.totalData = kony.sync.pendingAckResult;
			kony.sync.verifyAndCallClosure(successcallback, konysyncPendingAckDic);
        } else {
            kony.sync.pendingAckIndex = kony.sync.pendingAckIndex + 1;
            currentScope = kony.sync.scopes[kony.sync.pendingAckIndex];
            dbname = currentScope[kony.sync.scopeDataSource];
			dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
			if (dbconnection !== null){
				kony.sync.startTransaction(dbconnection, konysyncPendingAck_transaction, konysyncPendingAck_transactionSucessCallback, konysyncPendingAck_transactionErrorCallback, "Get Pending Acknowledgement");
			}
        }
    }
	
	function konysyncPendingAck_transactionErrorCallback() {
		sync.log.trace("Entering konysyncPendingAck_transactionErrorCallback");
		kony.sync.callTransactionError(isError, errorcallback);
	}
	if(dbconnection!==null){
		kony.sync.startTransaction(dbconnection, konysyncPendingAck_transaction, konysyncPendingAck_transactionSucessCallback, konysyncPendingAck_transactionErrorCallback, "Get Pending Acknowledgement");
	}	
};

sync.getPendingUpload = function(successcallback, errorcallback) {
    if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
    kony.sync.pendingUploadIndex = 0;
    kony.sync.pendingUploadResult = {};
    var currentScope = kony.sync.scopes[0];
    var dbname = currentScope[kony.sync.scopeDataSource];
    var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
    kony.sync.pendingUploadCount = 0;
	var isError = false;
	
    function konysyncPendingUpload_transaction(tx) {
		sync.log.trace("Entering konysyncPendingUpload_transaction");
        function single_transaction_callback_local(sql, params, tbname) {
			sync.log.trace("Entering single_transaction_callback_local");
            var resultSet = kony.sync.executeSql(tx, sql, params);
			if(resultSet===false){
				isError = false;
				return false;
			}
            var tableData = [];
            var num_records = resultSet.rows.length;
            for (var j = 0; j <= num_records - 1; j++) {
                var record = kony.db.sqlResultsetRowItem(tx, resultSet, j);
                kony.table.insert(tableData, record);
            }
            if ((num_records > 0)) {
                kony.sync.pendingUploadCount = kony.sync.pendingUploadCount + num_records;
                kony.sync.pendingUploadResult[tbname] = {};
                kony.sync.pendingUploadResult[tbname].count = num_records;
                kony.sync.pendingUploadResult[tbname].data = tableData;
            }
        }
		if(!kony.sync.isNullOrUndefined(currentScope.ScopeTables)){
			for (var i = 0; i < currentScope.ScopeTables.length; i++) {
				var syncTable = currentScope.ScopeTables[i];
				var tbname = syncTable.Name;
				var currentversion = kony.sync.getCurrentVersionNumber(tbname);
				var sql = "select * from " + tbname + " WHERE " + kony.sync.mainTableChangeTypeColumn + " is not null AND " + kony.sync.mainTableChangeTypeColumn + " <> -1 AND " + kony.sync.mainTableSyncVersionColumn + " = " + currentversion + " AND " + kony.sync.mainTableChangeTypeColumn + " NOT LIKE '9%'";
				if(single_transaction_callback_local(sql, null, tbname)===false){
					return;
				}
			}
		}
    }

    function konysyncPendingUpload_transactionSucessCallback() {
		sync.log.trace("Entering konysyncPendingUpload_transactionSucessCallback");
		sync.log.info("Pending Uploads Count = ", kony.sync.pendingUploadCount);
        
        sync.log.info("Pending Uploads = ", kony.sync.pendingUploadResult);
        if ((kony.sync.pendingUploadIndex === kony.sync.scopes.scopecount - 1)) {
			var konysyncPendingUploadDic = {};
			konysyncPendingUploadDic.totalCount = kony.sync.pendingUploadCount;
			konysyncPendingUploadDic.totalData = kony.sync.pendingUploadResult;
			kony.sync.verifyAndCallClosure(successcallback, konysyncPendingUploadDic);
        } else {
            kony.sync.pendingUploadIndex = kony.sync.pendingUploadIndex + 1;
            currentScope = kony.sync.scopes[kony.sync.pendingUploadIndex];
            dbname = currentScope[kony.sync.scopeDataSource];
			dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
			if(dbconnection !== null){
				kony.sync.startTransaction(dbconnection, konysyncPendingUpload_transaction, konysyncPendingUpload_transactionSucessCallback, transactionErrorCallback, "Get Pending Upload");
			}
        }
    }
	
	function transactionErrorCallback() {
		sync.log.trace("Entering transactionErrorCallback");
		kony.sync.callTransactionError(isError, errorcallback);
	}
	if(dbconnection !== null){
		kony.sync.startTransaction(dbconnection, konysyncPendingUpload_transaction, konysyncPendingUpload_transactionSucessCallback, transactionErrorCallback, "Get Pending Upload");
	}
};

sync.getDeferredUpload = function(successcallback, errorcallback) {
    if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
    kony.sync.deferredUploadIndex = 0;
    kony.sync.deferredUploadResult = {};
    var currentScope = kony.sync.scopes[0];
    var dbname = currentScope[kony.sync.scopeDataSource];
    var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
    kony.sync.deferredUploadCount = 0;
	var isError = false;
	
    function konysyncDeferredUpload_transaction(tx) {
		sync.log.trace("Entering konysyncDeferredUpload_transaction");
        function single_transaction_callback_local(sql, params, tbname) {
			sync.log.trace("Entering single_transaction_callback_local");
            var resultSet = kony.sync.executeSql(tx, sql, params);
			if(resultSet===false){
				isError = true;
				return false;
			}
            var tableData = [];
            var num_records = resultSet.rows.length;
            for (var j = 0; j <= num_records - 1; j++) {
                var record = kony.db.sqlResultsetRowItem(tx, resultSet, j);
                kony.table.insert(tableData, record);
            }
            if ((num_records > 0)) {
                kony.sync.deferredUploadCount = kony.sync.deferredUploadCount + num_records;
                kony.sync.deferredUploadResult[tbname] = {};
                kony.sync.deferredUploadResult[tbname].count = num_records;
                kony.sync.deferredUploadResult[tbname].data = tableData;
            }
        }
		if(!kony.sync.isNullOrUndefined(currentScope.ScopeTables)){
			for (var i = 0; i < currentScope.ScopeTables.length; i++) {
				var syncTable = currentScope.ScopeTables[i];
				var tbname = syncTable.Name;
				var sql = "select * from " + tbname + " WHERE " + kony.sync.mainTableChangeTypeColumn + " is not null AND " + kony.sync.mainTableChangeTypeColumn + " <> -1 AND " + kony.sync.mainTableChangeTypeColumn + " LIKE '9%'";
				if(single_transaction_callback_local(sql, null, tbname)===false){
					return;
				}	
			}
		}
    }

    function konysyncDeferredUpload_transactionSucessCallback() {
		sync.log.trace("Entering konysyncDeferredUpload_transactionSucessCallback");
        sync.log.info("Deferred Uploads Count = ", kony.sync.deferredUploadCount);
        
        sync.log.info("Deferred Uploads = ", kony.sync.deferredUploadResult);
        if ((kony.sync.deferredUploadIndex === kony.sync.scopes.scopecount - 1)) {
			var konysyncDeferredUploadDic = {};
			konysyncDeferredUploadDic.totalCount = kony.sync.deferredUploadCount;
			konysyncDeferredUploadDic.totalData = kony.sync.deferredUploadResult;
			kony.sync.verifyAndCallClosure(successcallback, konysyncDeferredUploadDic);
        } else {
            kony.sync.deferredUploadIndex = kony.sync.deferredUploadIndex + 1;
            currentScope = kony.sync.scopes[kony.sync.deferredUploadIndex];
            dbname = currentScope[kony.sync.scopeDataSource];
			dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
			if (dbconnection !== null){
				kony.sync.startTransaction(dbconnection, konysyncDeferredUpload_transaction, konysyncDeferredUpload_transactionSucessCallback, transactionErrorCallback, "Get Deferred Upload");
			}	
        }
    }
	
	function transactionErrorCallback() {
		sync.log.trace("Entering transactionErrorCallback");
		kony.sync.callTransactionError(isError, errorcallback);
	}
	if (dbconnection !== null){
		kony.sync.startTransaction(dbconnection, konysyncDeferredUpload_transaction, konysyncDeferredUpload_transactionSucessCallback, transactionErrorCallback, "Get Deferred Upload");
	}
};

sync.getAllPendingUploadInstances = function(retrieveOnlyCount, successcallback, errorcallback) {
	sync.log.trace("Entering sync.getAllPendingUploadInstances");
    if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var pendingUploadResult = {};
	pendingUploadResult.totalCount = 0;
    var dbname = kony.sync.scopes[0][kony.sync.scopeDataSource];
    var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection !== null){
        kony.db.transaction(dbconnection, pendingUploadTransaction, pendingUploadTransactionErrorCallback, pendingUploadTransactionSucessCallback);
    }
	var isError = false;
	function pendingUploadTransaction(tx){
		sync.log.trace("Entering sync.getAllPendingUploadInstances->pendingUploadTransaction");
		for(var i=0; i < kony.sync.scopes.length; i++){	
			var currentScope = kony.sync.scopes[i];
			var scopeName = currentScope[kony.sync.scopeName];
			pendingUploadResult[scopeName] = {};
			pendingUploadResult[scopeName].count = 0;
			/*get syncversion from metatable*/
			var syncversion = 0;
			var query = kony.sync.qb_createQuery() ;
			kony.sync.qb_select(query, [kony.sync.metaTableSyncVersionCloumn]);
			kony.sync.qb_from(query, kony.sync.metaTableName);
			kony.sync.qb_where(query, [{
				key: kony.sync.metaTableScopeColumn,
				value: scopeName
			}, {
				key: kony.sync.metaTableFilterValue,
				value: "no filter"
			}]);
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var resultset = kony.sync.executeSql(tx, sql, params);
			if(resultset===false){
				isError = true;
				return;
			}
			var row = kony.db.sqlResultsetRowItem(tx, resultset, 0);
			syncversion = row[kony.sync.metaTableSyncVersionCloumn];
			
			for (var j = 0; !kony.sync.isNull(currentScope.ScopeTables) && j < currentScope.ScopeTables.length; j++) {
				var syncTable = currentScope.ScopeTables[j];
				//not using query builder to speedup time
				if(retrieveOnlyCount!==true){
					sql = "select * from  " + syncTable.Name + kony.sync.historyTableName + " where " + kony.sync.historyTableChangeTypeColumn + " NOT LIKE '9%' AND " +
						kony.sync.historyTableSyncVersionColumn + " = " + syncversion;
				}
				else{
					sql = "select count(*) from  " + syncTable.Name + kony.sync.historyTableName + " where " + kony.sync.historyTableChangeTypeColumn + " NOT LIKE '9%' AND " +
						kony.sync.historyTableSyncVersionColumn + " = " + syncversion;
				}
				resultset = kony.sync.executeSql(tx, sql, null);
				if(resultset === false){
					isError = true;
					return;
				}
				pendingUploadResult[scopeName][syncTable.Name] = {};
				if(retrieveOnlyCount!==true){
					pendingUploadResult[scopeName][syncTable.Name].count = resultset.rows.length;
					pendingUploadResult[scopeName][syncTable.Name].data = [];
					for (var k = 0; k < resultset.rows.length; k++) {
						pendingUploadResult[scopeName][syncTable.Name].data[k] = kony.db.sqlResultsetRowItem(tx, resultset, k);
					}
				}
				else{
					var rowCount = kony.db.sqlResultsetRowItem(tx, resultset, 0);
					pendingUploadResult[scopeName][syncTable.Name].count = rowCount["count(*)"];
				}
				pendingUploadResult[scopeName].count += pendingUploadResult[scopeName][syncTable.Name].count;
				pendingUploadResult.totalCount += pendingUploadResult[scopeName][syncTable.Name].count;
			}
		}	
	}
	
	function pendingUploadTransactionErrorCallback(){
		sync.log.trace("Entering sync.getAllPendingUploadInstances->pendingUploadTransactionErrorCallback");
		kony.sync.verifyAndCallClosure(errorcallback);
	}
	function pendingUploadTransactionSucessCallback(){
		sync.log.trace("Entering sync.getAllPendingUploadInstances->pendingUploadTransactionSucessCallback");
		sync.log.info("getAllPendingUploadInstances success", pendingUploadResult);
		kony.sync.verifyAndCallClosure(successcallback, pendingUploadResult);
	}
};

kony.sync.checkForUpdate556to559Schema = function(tx){
	var sql = "select count(*) from " + kony.sync.chunkTableName;
	var resultSet = kony.sync.executeSql(tx, sql, null,null,false);
	if(resultSet === false){
		//Alter scripts for 5.5.6 to 5.5.9 DB Update 
		kony.sync.DDL556to559Update = [
		"ALTER TABLE " + kony.sync.metaTableName + " ADD COLUMN " + kony.sync.metaTableUploadSyncTimeColumn + " nvarchar(1000)",
		"CREATE TABLE " + kony.sync.pendingUploadTableName + " (" + kony.sync.metaTableScopeColumn + " nvarchar(100) not null," + kony.sync.pendingUploadTableUploadRequest + " text," + kony.sync.objectLevelInfo + " text," + kony.sync.pendingUploadTableInsertCount + " int," + kony.sync.pendingUploadTableUpdateCount + " int," + kony.sync.pendingUploadTableDeleteCount + " int," + kony.sync.pendingUploadTableBatchInsertCount + " int," + kony.sync.pendingUploadTableBatchUpdateCount + " int," + kony.sync.pendingUploadTableBatchDeleteCount + " int," + kony.sync.pendingUploadTableUploadLimit + " int,primary key (" + kony.sync.metaTableScopeColumn + "))",
		"CREATE TABLE " + kony.sync.chunkTableName + " (" + kony.sync.chunkTableChunkId + " int not null," + kony.sync.chunkTablePayloadId + " nvarchar(50) not null," + kony.sync.metaTableScopeColumn + " nvarchar(100) not null," + kony.sync.chunkTableChunkData + " text," + kony.sync.chunkTableTimeStamp + " nvarchar(50),primary key (" + kony.sync.chunkTableChunkId + ", " + kony.sync.chunkTablePayloadId + ", " + kony.sync.metaTableScopeColumn + "))",
		"CREATE TABLE " + kony.sync.chunkMetaTableName + " (" + kony.sync.chunkTablePayloadId + " nvarchar(50) not null," + kony.sync.metaTableScopeColumn + " nvarchar(100) not null," + kony.sync.metaTableChunkAck + " int," + kony.sync.metaTableChunkSize + " int," + kony.sync.metaTableChunkCount + " int," + kony.sync.metaTableChunkHashSum + " nvarchar(35)," + kony.sync.metaTableChunkDiscarded + " int,primary key (" + kony.sync.chunkTablePayloadId + ", "+ kony.sync.metaTableScopeColumn + "))"
		];
	}
	return kony.sync.executeQueriesInTransaction(tx, kony.sync.DDL556to559Update);
};

kony.sync.checkForUpdate559to560Schema = function(tx){
	var sql = "select count(" + kony.sync.metaTableSchemaUpgradeSyncTimeColumn + ") from " + kony.sync.metaTableName;
	var resultSet = kony.sync.executeSql(tx, sql, null,null,false);
	if(resultSet === false){
		//Alter scripts for 5.5.9 to 5.6.0 DB Update 
		kony.sync.configVersion = konysyncClientSyncConfig.Version;
		kony.sync.DDL559to560Update = [
		"ALTER TABLE " + kony.sync.syncConfigurationTableName + " ADD COLUMN " + kony.sync.syncConfigurationColumnSchemaUpgradeContext + " nvarchar(4000)",
		"ALTER TABLE " + kony.sync.syncConfigurationTableName + " ADD COLUMN " + kony.sync.syncConfigurationColumnVersion + " nvarchar(4000)",
		"ALTER TABLE " + kony.sync.metaTableName + " ADD COLUMN " + kony.sync.metaTableSchemaUpgradeSyncTimeColumn + " nvarchar(1000)",
		"UPDATE " + kony.sync.syncConfigurationTableName + " SET " + kony.sync.syncConfigurationColumnVersion + " = '" + konysyncClientSyncConfig.Version + "' where rowid = 1"
		];
	}
	return kony.sync.executeQueriesInTransaction(tx, kony.sync.DDL559to560Update);
};
//  **************** End KonySyncInit.js*******************


//  **************** Start KonySyncLogger.js*******************
if (typeof(kony.sync) === "undefined") {
	kony.sync = {};
}

if (typeof(kony.sync.log) === "undefined") {
	kony.sync.log = {};
}
if(typeof(sync) === "undefined") {
	sync = {};
}
sync.log = {};

//TRACE(6) > DEBUG(5) > INFO(4) > WARN(3) > ERROR(2) > FATAL(1) > NONE(0)
kony.sync.log.NONE = {
	value : 0,
	name : "none",
	code : "NONE"
};
kony.sync.log.FATAL = {
	value : 1,
	name : "fatal",
	code : "FATAL"
};
kony.sync.log.ERROR = {
	value : 2,
	name : "error",
	code : "ERROR"
};
kony.sync.log.WARN = {
	value : 3,
	name : "warn",
	code : "WARN"
};
kony.sync.log.INFO = {
	value : 4,
	name : "info",
	code : "INFO"
};
kony.sync.log.DEBUG = {
	value : 5,
	name : "debug",
	code : "DEBUG"
};	
kony.sync.log.TRACE = {
	value : 6,
	name : "trace",
	code : "TRACE"
}; 

//Global to maintain current loglevel
kony.sync.currentLogLevel = kony.sync.log.ERROR;



sync.log.trace = function (msg, params) {
	kony.sync.logger(kony.sync.log.TRACE, msg, params);
};

sync.log.debug = function (msg, params) {
	kony.sync.logger(kony.sync.log.DEBUG, msg, params);
};

sync.log.info = function (msg, params) {
	kony.sync.logger(kony.sync.log.INFO, msg, params);
};

sync.log.warn = function (msg, params) {
	kony.sync.logger(kony.sync.log.WARN, msg, params);
};

sync.log.error = function (msg, params) {
	kony.sync.logger(kony.sync.log.ERROR, msg, params);
};

sync.log.fatal = function (msg, params) {
	kony.sync.logger(kony.sync.log.FATAL, msg, params);
};



kony.sync.logger = function (logLevel, msg, params) {
	if (logLevel.value <= kony.sync.currentLogLevel.value) {
		params = (typeof(params) === "undefined") ? "" : params;

		//Stringify object
		if (kony.sync.isValidJSTable(params)) {
			params = JSON.stringify(params, null, " ");
		}

		var date = new Date().toLocaleDateString();
		var time = new Date().toLocaleTimeString();
		var level = logLevel.code;

		var formattedMessage = "[KonySync][" + level + "][" + date + "][" + time + "] : " + msg + " " + params;
		kony.print(formattedMessage);
	}
};

sync.log.isDebugEnabled = function () {
	return kony.sync.currentLogLevel.value >= kony.sync.log.DEBUG.value;
};

sync.log.isTraceEnabled = function () {
	return kony.sync.currentLogLevel.value >= kony.sync.log.TRACE.value;
};

sync.log.isInfoEnabled = function () {
	return kony.sync.currentLogLevel.value >= kony.sync.log.INFO.value;
};

sync.log.isWarnEnabled = function () {
	return kony.sync.currentLogLevel.value >= kony.sync.log.WARN.value;
};

sync.log.isFatalEnabled = function () {
	return kony.sync.currentLogLevel.value >= kony.sync.log.FATAL.value;
};

sync.log.isErrorEnabled = function () {
	return kony.sync.currentLogLevel.value >= kony.sync.log.ERROR.value;
};

sync.log.isNoneEnabled = function () {
	return kony.sync.currentLogLevel.value === kony.sync.log.NONE.value;
};

sync.log.setLogLevel = function (level, logSuccessCallback, logFailureCallback) {
	switch (level) {
	case kony.sync.log.NONE:
		kony.sync.currentLogLevel = kony.sync.log.NONE;
		break;
	case kony.sync.log.TRACE:
		kony.sync.currentLogLevel = kony.sync.log.TRACE;
		break;
	case kony.sync.log.INFO:
		kony.sync.currentLogLevel = kony.sync.log.INFO;
		break;
	case kony.sync.log.WARN:
		kony.sync.currentLogLevel = kony.sync.log.WARN;
		break;
	case kony.sync.log.ERROR:
		kony.sync.currentLogLevel = kony.sync.log.ERROR;
		break;
	case kony.sync.log.FATAL:
		kony.sync.currentLogLevel = kony.sync.log.FATAL;
		break;
	case kony.sync.log.DEBUG:
		kony.sync.currentLogLevel = kony.sync.log.DEBUG;
		break;
	default :
		sync.log.error("Failed in setting log level "+ level);
		kony.sync.verifyAndCallClosure(logFailureCallback, "Failed in setting log level " + level);
		return;
	}
	sync.log.info("Log Level successfully set to " + kony.sync.currentLogLevel.name);
	kony.sync.verifyAndCallClosure(logSuccessCallback, "Log Level successfully set to " + kony.sync.currentLogLevel.name);
};

sync.log.getCurrentLogLevel = function () {
	return kony.sync.currentLogLevel;
};
//  **************** End KonySyncLogger.js*******************


//  **************** Start KonySyncMetadata.js*******************
if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}
if(typeof(sync)=== "undefined"){
	sync = {};
}

// gets the time when dbname was last syced
kony.sync.getLastSynctime = function (scopename, dbname, scallback) {
	sync.log.trace("Entering kony.sync.getLastSynctime");
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_select(query, null);
	kony.sync.qb_from(query, kony.sync.metaTableName);
	kony.sync.qb_where(query, [{
				key : kony.sync.metaTableScopeColumn,
				value : scopename
			}, {
				key : kony.sync.metaTableFilterValue,
				value : "no filter"
			}
		]);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	kony.sync.single_select_execute(dbname, sql, params, scallback, errorCallback);
	
	function errorCallback(res){
		sync.log.error("error occurred while getting timestamp since last sync", res);
		kony.sync.onDownloadCompletion(true, res);
	}
};

// gets the time when dbname was last syced
kony.sync.getLastSynctimeForUpload = function (scopename, dbname, scallback){
	sync.log.trace("Entering kony.sync.getLastSynctimeForUpload ");
	function callback(rows) {
		var lastSyncTime = -1;
		var result = "";
		for (var i = 0; i < rows.length; i++) {
			var v = rows[i];
			if (v[kony.sync.metaTableSyncTimeColumn] !== "") {
				var str = v[kony.sync.metaTableSyncTimeColumn];
				var temp = kony.sync.tonumber(str.split(",")[1]);
				if ((lastSyncTime === -1)) {
					lastSyncTime = temp;
					result = str;
				} else if ((temp < lastSyncTime)) {
					lastSyncTime = temp;
					result = str;
				}
			}
			sync.log.info("Last TimeStamp since Upload :", lastSyncTime);
		}
		var resulttable = [];
		if ((lastSyncTime === -1)) {
			resulttable[kony.sync.metaTableSyncTimeColumn] = "";
			scallback([resulttable]);
		} else {
			resulttable[kony.sync.metaTableSyncTimeColumn] = result;
			scallback([resulttable]);
		}
	}
	var query = kony.sync.qb_createQuery();

	kony.sync.qb_select(query, [kony.sync.metaTableSyncTimeColumn]);

	kony.sync.qb_from(query, kony.sync.metaTableName);

	kony.sync.qb_where(query, [{
				key : kony.sync.metaTableScopeColumn,
				value : scopename
			}
		]);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	kony.sync.single_select_execute(dbname, sql, params, callback, errorCallback);
	
	function errorCallback(res){
		sync.log.error("error occurred while getting timestamp since last upload", res);
		kony.sync.onUploadCompletion(true, res);
	}
};

// gets the time when dbname was last synced
kony.sync.getLastSynctimeFilter1 = function (scopename, filter, dbname, scallback) {
	sync.log.trace("Entering kony.sync.getLastSynctimeFilter ");
	function isDataPresent(result) {
		sync.log.info("last sync time in filter :", result);
		function getscopeindex(resultcount) {
			function calscallback() {
				var table = {};
				table[kony.sync.metaTableSyncTimeColumn] = "";
				scallback([table]);
			}
			var query = kony.sync.qb_createQuery();

			kony.sync.qb_set(query, {
				id : resultcount.length + 1,
				filtervalue : filter,
				scopename : scopename,
				versionnumber : 0,
				lastserversynccontext : "",
				replaysequencenumber : 0,
				lastgeneratedid : -1
			});

			kony.sync.qb_insert(query, kony.sync.metaTableName);
			var query_compile2 = kony.sync.qb_compile(query);
			var sql2 = query_compile2[0];
			var params2 = query_compile2[1];

			kony.sync.single_select_execute(dbname, sql2, params2, calscallback, errorCallback);
		}
		if (result.length === 1) {
			scallback(result);
		} else {
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, kony.sync.metaTableName);
			var query_compile3 = kony.sync.qb_compile(query);
			var sql3 = query_compile3[0];
			var params3 = query_compile3[1];

			kony.sync.single_select_execute(dbname, sql3, params3, getscopeindex, errorCallback);
		}
	}
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_select(query, [kony.sync.metaTableSyncTimeColumn]);
	kony.sync.qb_from(query, kony.sync.metaTableName);
	kony.sync.qb_where(query, [{
				key : kony.sync.metaTableScopeColumn,
				value : scopename
			}, {
				key : kony.sync.metaTableFilterValue,
				value : filter
			}
		]);
	var query_compile1 = kony.sync.qb_compile(query);
	var sql1 = query_compile1[0];
	var params1 = query_compile1[1];
	kony.sync.single_select_execute(dbname, sql1, params1, isDataPresent, errorCallback);
	
	function errorCallback(res){
		sync.log.error("error occurred while getting time-stamp since last upload for filter", res);
		kony.sync.onDownloadCompletion(true, res);
	}
};

/* gets the time when scopename with filter was last synced */
kony.sync.getLastSynctimeFilter = function (scopename, filter, dbname, callback) {
	sync.log.trace("Entering kony.sync.getLastSynctimeFilter ");
	var connection = kony.sync.getConnectionOnly(dbname, dbname, transactionErrorCallback);
	var isError = false;
	var result = [];
	if(connection!==null){
		kony.db.transaction(connection, transactionCallback, transactionErrorCallback, transactionSuccessCallback);
	}
	
	function transactionCallback(tx){
		sync.log.trace("Entering kony.sync.getLastSynctimeFilter->transactionCallback");
		//search for row with filter
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_select(query, [kony.sync.metaTableSyncTimeColumn]);
					kony.sync.qb_from(query, kony.sync.metaTableName);
					kony.sync.qb_where(query, [{
								key : kony.sync.metaTableScopeColumn,
								value : scopename
							}, {
								key : kony.sync.metaTableFilterValue,
								value : filter
							}
						]);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		var resultSet = kony.sync.executeSql(tx, sql, params);
		if (resultSet === false) {
			isError = true;
			return;
		}
		if(resultSet.rows.length >= 1){
			result[0] = kony.db.sqlResultsetRowItem(tx, resultSet, 0);
		}
		else{ //if not found, insert it
			//get the count of rows in metainfo
			resultSet = kony.sync.executeSql(tx, "select * from " + kony.sync.metaTableName, null);
			if (resultSet === false) {
				isError = true;
				return;
			}
			
			//insert the filter
			query = kony.sync.qb_createQuery();
					kony.sync.qb_set(query, {
						id : resultSet.rows.length + 1,
						filtervalue : filter,
						scopename : scopename,
						versionnumber : 0,
						lastserversynccontext : "",
						lastserveruploadsynccontext : "",
						replaysequencenumber : 0,
						lastgeneratedid : -1
					});
					kony.sync.qb_insert(query, kony.sync.metaTableName);
			query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
			params = query_compile[1];
			resultSet = kony.sync.executeSql(tx, sql, params);
			if (resultSet === false) {
				isError = true;
				return;
			}
			var table = {};
			table[kony.sync.metaTableSyncTimeColumn] = "";
			result[0] = table;
		}
	}
	
	function transactionSuccessCallback(){
		sync.log.trace("Entering kony.sync.getLastSynctimeFilter->transactionSuccessCallback");
		callback(result);
	}
	
	function transactionErrorCallback(){
		sync.log.trace("Entering kony.sync.getLastSynctimeFilter->transactionErrorCallback");
		kony.sync.onDownloadCompletion(true, kony.sync.getTransactionError(isError));
	}

};

// Update the meta tables with last sync time
kony.sync.setLastSyncTime = function (tx, scopename, time, tickcount) {
	sync.log.trace("Entering kony.sync.setLastSyncTime ");
	var settable = [];
	if(kony.sync.schemaUpgradeDownloadPending){
		settable[kony.sync.metaTableSchemaUpgradeSyncTimeColumn] = tickcount;
	}else{
		settable[kony.sync.metaTableSyncTimeColumn] = tickcount;
	}
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_update(query, kony.sync.metaTableName);
	kony.sync.qb_set(query, settable);
	kony.sync.qb_where(query, [{
				key : kony.sync.metaTableScopeColumn,
				value : scopename
			}, {
				key : kony.sync.metaTableFilterValue,
				value : "no filter"
			}
		]);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	return kony.sync.executeSql(tx, sql, params);
};

// Update the meta tables with last sync time
kony.sync.setLastSyncTimeFilter = function (tx, scopename, filter, time, tickcount) {
	sync.log.trace("Entering kony.sync.setLastSyncTimeFilter ");
	var settable = [];
	if(kony.sync.schemaUpgradeDownloadPending){
		settable[kony.sync.metaTableSchemaUpgradeSyncTimeColumn] = tickcount;
	}else{
		settable[kony.sync.metaTableSyncTimeColumn] = tickcount;
	}
	//settable[kony.sync.metaTableFilterValue] = filter;
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_update(query, kony.sync.metaTableName);
	kony.sync.qb_set(query, settable);
	kony.sync.qb_where(query, [{
				key : kony.sync.metaTableScopeColumn,
				value : scopename
			}, {
				key : kony.sync.metaTableFilterValue,
				value : filter
			}
		]);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	return kony.sync.executeSql(tx, sql, params);
};
//function getseqnumber (connection,scopename)
kony.sync.getseqnumber = function (connection, scopename) {
	sync.log.trace("Entering kony.sync.getseqnumber ");
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_select(query, [kony.sync.metaTableSyncVersionCloumn]);
	kony.sync.qb_from(query, kony.sync.metaTableName);
	kony.sync.qb_where(query, [{
				key : kony.sync.metaTableScopeColumn,
				value : scopename
			}
		]);
	//local sql = "select "..kony.sync.metaTableSyncVersionCloumn.." from "..kony.sync.metaTableName.." where "..kony.sync.metaTableScopeColumn.." = '"..scopename.."'";
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	var resultset = kony.sync.executeSql(connection, sql, params);
	if (resultset === false){
		return false;
	}	
	var rowItem = kony.db.sqlResultsetRowItem(connection, resultset, 0);
	return rowItem;
};

kony.sync.setSeqnumber = function(scopename, dsname, uploaded, callback) {
	sync.log.trace("Entering kony.sync.setSeqnumber ");
	var isStatementError = false;
	function transactionCallback(tx){
		var settable = [];
		settable[kony.sync.metaTableSyncVersionCloumn] = uploaded;
		var query = kony.sync.qb_createQuery();
		kony.sync.qb_update(query, kony.sync.metaTableName);
		kony.sync.qb_set(query, settable);
		kony.sync.qb_where(query, [{
			key: kony.sync.metaTableScopeColumn,
			value: scopename
		}]);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		if(kony.sync.executeSql(tx, sql, params)===false){
			isStatementError = true;
		}
	}
	function transactionSuccessCallback(){
		sync.log.trace("Entering kony.sync.setSeqnumber->transactionSuccessCallback");
		callback();
	}
	
	function transactionErrorCallback(){
		sync.log.trace("Entering kony.sync.setSeqnumber->transactionErrorCallback");
		sync.log.error("Error occurred while setting sequence number");
		if (!isStatementError) {
			kony.sync.syncUploadFailed(kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
		}
		else{
			kony.sync.syncUploadFailed(kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	var connection = kony.sync.getConnectionOnly(dsname, dsname, transactionErrorCallback);
	if(connection!==null){
		kony.db.transaction(connection, transactionCallback, transactionErrorCallback, transactionSuccessCallback);
	}
};

kony.sync.getSyncOrder = function (scopename, tx) {
	sync.log.trace("Entering kony.sync.getSyncOrder ");
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_select(query, null);
	kony.sync.qb_from(query, kony.sync.metaTableName);

	kony.sync.qb_where(query, [{
				key : kony.sync.metaTableScopeColumn,
				value : scopename
			}
		]);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	var resultset = kony.sync.executeSql(tx, sql, params);
	if (resultset !== false) {
		var rowItem = kony.db.sqlResultsetRowItem(tx, resultset, 0);
		sync.log.debug("sync order value" + rowItem);
		if(!kony.sync.isNullOrUndefined(rowItem[kony.sync.metaTableSyncOrderCloumn])) {
			return kony.sync.tonumber(rowItem[kony.sync.metaTableSyncOrderCloumn]);
		} else {
			return null;
		}
	} else {
		return false;
	}
};

kony.sync.clearSyncHistory = function (dbname, tablename) {
	sync.log.trace("Entering kony.sync.clearSyncHistory ");
	var sql = "delete from " + tablename + kony.sync.historyTableName;
	var wcs = " where konysyncchangetype NOT LIKE '9%'";
	var testsql = sql + wcs;

	kony.sync.single_execute_sql(dbname, testsql, null, null);
};

kony.sync.clearSyncOriginal = function (dbname, tbname) {
	sync.log.trace("Entering kony.sync.clearSyncOriginal ");
	var sql = "delete from " + tbname + kony.sync.originalTableName;

	kony.sync.single_execute_sql(dbname, sql, null, null);
};

kony.sync.clearDataForCOE = function(tx, scopename, tablename, wcs, newwcs, changeType, pkset, seqNo, values, isError){
	sync.log.trace("Entering kony.sync.clearDataForCOE ");
	if (kony.sync.isNullOrUndefined(pkset) && isError) {
		return false;
	}
	var whereClause = kony.sync.CreateCopy(wcs);
	var query = null;
	var query_compile = null;
	var sql = null;
	var params = null;
	//hashSum also needs to be updated to avoid conflicts.
	var hashSum = values[kony.sync.historyTableHashSumColumn];
	//in case I got client pk from server
	if (!kony.sync.isNullOrUndefined(pkset)) {

	//update original table pk with new pk from server
		query = kony.sync.qb_createQuery();
		kony.sync.qb_update(query, tablename + kony.sync.originalTableName);
		kony.sync.qb_set(query, pkset);
		kony.sync.qb_where(query, whereClause);
		query_compile = kony.sync.qb_compile(query);
		sql = query_compile[0];
		params = query_compile[1];
		if(kony.sync.executeSql(tx, sql, params)===false){
			return 0;
		}
		
		//update main table pk with new pk from server
		query = kony.sync.qb_createQuery();
				kony.sync.qb_update(query, tablename);
				kony.sync.qb_set(query, pkset);
				kony.sync.qb_where(query, whereClause);
		query_compile = kony.sync.qb_compile(query);
		sql = query_compile[0];
		params = query_compile[1];
		if(kony.sync.executeSql(tx, sql, params) === false){
			return 0;
		}
		
		//update history table pk with new pk from server
		pkset[kony.sync.historyTableHashSumColumn] = hashSum;
		query = kony.sync.qb_createQuery();
					kony.sync.qb_update(query, tablename + kony.sync.historyTableName);
					kony.sync.qb_set(query, pkset);
					kony.sync.qb_where(query, whereClause);
		query_compile = kony.sync.qb_compile(query);
		sql = query_compile[0];
		params = query_compile[1];
		if(kony.sync.executeSql(tx, sql, params) === false){
			return 0;
		}
		if(isError){
			return false;
		}
		
		kony.sync.serverInsertAckCount = kony.sync.serverInsertAckCount + 1;
		kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInsertedAck]=kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsInsertedAck]+1;
		
		whereClause = kony.sync.CreateCopy(newwcs);
	} else if (changeType === "update") {
		//update history table hashSum for pending records
		if(!kony.sync.isNullOrUndefined(hashSum)){
			var updateSet = {};
			updateSet[kony.sync.historyTableHashSumColumn] = hashSum;
			query = kony.sync.qb_createQuery();
						kony.sync.qb_update(query, tablename+kony.sync.historyTableName);
						kony.sync.qb_set(query, updateSet);
						kony.sync.qb_where(query, whereClause);
			query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
			params = query_compile[1];
			if(kony.sync.executeSql(tx, sql, params) === false){
				return 0;
			}
		}
		/*TODO: non-autogenerated insert ack is currently considered as update ack*/
		kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdatedAck] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsUpdatedAck] + 1;
		kony.sync.serverUpdateAckCount = kony.sync.serverUpdateAckCount + 1;
	} else if (changeType === "delete") {
		kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsDeletedAck] = kony.sync.objectLevelInfoMap[tablename][kony.sync.numberOfRowsDeletedAck] + 1;
		kony.sync.serverDeleteAckCount = kony.sync.serverDeleteAckCount + 1;
	}
	
	if(kony.sync.clearHistoryTable(tx, tablename, whereClause, seqNo)===false){
		return 0;
	}	
	return kony.sync.clearMainTableForRemoveAfterUpload(tx, scopename, tablename, whereClause);
	
};

kony.sync.clearMainTableForRemoveAfterUpload = function (tx, scopename, tablename, wcs) {
	sync.log.trace("Entering kony.sync.clearMainTableForRemoveAfterUpload ");
	var whereClause = kony.sync.CreateCopy(wcs);
	var removeAfterUpload = kony.sync.checkForDeleteAfterUpload(tablename,scopename);
	//Get records to be deleted from history table;
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);
				kony.sync.qb_from(query, tablename + kony.sync.historyTableName);
				kony.sync.qb_where(query, whereClause);
				kony.sync.qb_distinct(query);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	var resultSet = kony.sync.executeSql(tx, sql, params);
	if(resultSet === false){
		return 0;
	}
	//don't remove from main and original tables if there is pending records in history table
	if(resultSet.rows.length!==0){
		return false;
	}
	
	//remove from original table
	if(kony.sync.clearOriginalTable(tx,tablename,wcs)===false){
		return 0;
	}
	
	if(removeAfterUpload){
		if(kony.sync.isNullOrUndefined(whereClause)){
			whereClause = [];
		}
		query = kony.sync.qb_createQuery();
                kony.sync.qb_delete(query, tablename);
                kony.sync.qb_where(query, wcs);
		query_compile = kony.sync.qb_compile(query);
		sql = query_compile[0];
		params = query_compile[1];
	
		if(kony.sync.executeSql(tx, sql, params)===false){
			return 0;
		}
		return true;
	} else {
		return false;
	}
};

kony.sync.clearHistoryTable = function (tx, tablename, wcs, seqNo) {
	sync.log.trace("Entering kony.sync.clearHistoryTable ");
	var whereClause = kony.sync.CreateCopy(wcs);
	if(kony.sync.isNullOrUndefined(whereClause)){
			whereClause = [];
	}
	if (!kony.sync.isNullOrUndefined(seqNo)) {
		kony.table.insert(whereClause, {
			key : kony.sync.historyTableReplaySequenceColumn,
			value : seqNo,
			optype : "LT_EQ"
		});
	}
	kony.table.insert(whereClause, {
		key : kony.sync.historyTableChangeTypeColumn,
		value : "9%",
		optype : "NOT LIKE"
	});
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_delete(query, tablename + kony.sync.historyTableName);
	kony.sync.qb_where(query, whereClause);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	return kony.sync.executeSql(tx, sql, params);
};

kony.sync.getRecordsTobeDeletedFromHistoryTable = function(tx, tablename, seqNo){
	sync.log.trace("Entering kony.sync.getRecordsTobeDeletedFromHistoryTable ");
	var whereClause = [];
	var records = false;
	kony.table.insert(whereClause,{
		key: kony.sync.historyTableReplaySequenceColumn,
		value: seqNo,
		optype: "LT_EQ"
	});
	//Get PK columns
	var pkColumns = kony.sync.currentScope.syncTableDic[tablename].Pk_Columns;

	//Get records to be deleted from history table;
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, pkColumns);
				kony.sync.qb_from(query, tablename + kony.sync.historyTableName);
				kony.sync.qb_where(query, whereClause);
				kony.sync.qb_distinct(query);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	var resultSet = kony.sync.executeSql(tx, sql, params);
	if(resultSet !== false){
		records = [];
		var i = 0;
		for(;i<resultSet.rows.length;i++){
			records.push(kony.db.sqlResultsetRowItem(tx, resultSet, i));
		}
		return records;
	}
	else{
		return false;
	}
};
kony.sync.clearOriginalTable = function(tx, tablename, wcs, seqNo){
	sync.log.trace("Entering kony.sync.clearOriginalTable ");
	var whereClause = kony.sync.CreateCopy(wcs);
	var query = null;
	var query_compile = null;
	var sql = null;
	var params = null;
	if(!kony.sync.isNull(seqNo)){
		whereClause = [];
		kony.table.insert(whereClause,{
			key: kony.sync.historyTableReplaySequenceColumn,
			value: seqNo,
			optype: "LT_EQ"
		});
		//Get PK columns
		var pkColumns = kony.sync.currentScope.syncTableDic[tablename].Pk_Columns;
	
		//Get records to be deleted from history table;
		query = kony.sync.qb_createQuery();
					kony.sync.qb_select(query, pkColumns);
					kony.sync.qb_from(query, tablename + kony.sync.historyTableName);
					kony.sync.qb_where(query, whereClause);
					kony.sync.qb_distinct(query);
		query_compile = kony.sync.qb_compile(query);
		sql = query_compile[0];
		params = query_compile[1];
		var resultSet = kony.sync.executeSql(tx, sql, params);
		if(resultSet === false){
			return false;
		}
		var rowItem = null;
		var i = 0;
		var j = 0;
		var originaltbname = tablename + kony.sync.originalTableName;
		for(;i<resultSet.rows.length;i++){
			rowItem = kony.db.sqlResultsetRowItem(tx, resultSet, i);
			whereClause = [];
			for (j = 0; j < pkColumns.length; j++) {
				kony.table.insert(whereClause,{
					key: pkColumns[j],
					value: rowItem[pkColumns[j]],
					optype: "EQ"
				});
			}
			query = kony.sync.qb_createQuery();
					kony.sync.qb_delete(query, originaltbname);
					kony.sync.qb_where(query, whereClause);
			query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
			params = query_compile[1];
			if(kony.sync.executeSql(tx, sql, params)===false){
				return false;
			}
		}
		return true;		
	}
	else{
		query = kony.sync.qb_createQuery();
					kony.sync.qb_delete(query, tablename + kony.sync.originalTableName);
					if(!kony.sync.isNull(whereClause)){
						kony.sync.qb_where(query, whereClause);
					}
		query_compile = kony.sync.qb_compile(query);
		sql = query_compile[0];
		params = query_compile[1];
		return kony.sync.executeSql(tx, sql, params);
	}
};

//calls resets sync order for a scope if all the history tables are empty
kony.sync.updateSyncOrderForScope = function (callback) {
	sync.log.trace("Entering kony.sync.updateSyncOrderForScope ");
	var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
	var scopename = kony.sync.currentScope[kony.sync.scopeName];
	var isError = false;
	var sql = null;
	var params = null;
	var query = null;
	var query_compile = null;
	kony.sync.getConnection(dbname, dbname, myTransactionCallBack, clear_success, clear_fail);
	function myTransactionCallBack(tx) {
		var recordcount = 0;
		var versionNo = kony.sync.getseqnumber(tx, scopename);
		if(!kony.sync.isNullOrUndefined(kony.sync.currentScope.ScopeTables)){
			for (var i = 0; i < kony.sync.currentScope.ScopeTables.length; i++) {
				var syncTable = kony.sync.currentScope.ScopeTables[i];
				if (kony.sync.isNullOrUndefined(syncTable)){
					continue;
				}
				var tbname = syncTable.Name;
				query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);
				kony.sync.qb_from(query, tbname + kony.sync.historyTableName);
				query_compile = kony.sync.qb_compile(query);
				sql = query_compile[0];
				params = query_compile[1];
				var resultSet = kony.sync.executeSql(tx, sql, params);
				if (resultSet !== false) {
					var num_records = resultSet.rows.length;
					recordcount = recordcount + num_records;
					if (num_records > 0) {
						var versionMap = {};
						versionMap[kony.sync.historyTableSyncVersionColumn] = versionNo.versionnumber;
						var whereClause = [];
						kony.table.insert(whereClause, {
							key : kony.sync.historyTableChangeTypeColumn,
							value : "9%",
							optype : "NOT LIKE"
						});
						query = kony.sync.qb_createQuery();
						kony.sync.qb_update(query, tbname + kony.sync.historyTableName);
						kony.sync.qb_set(query, versionMap);
						kony.sync.qb_where(query, whereClause);
						query_compile = kony.sync.qb_compile(query);
						sql = query_compile[0];
						params = query_compile[1];
						if(kony.sync.executeSql(tx, sql, params)===false){
							isError = true;
							return;
						}
					}
				}
				else{
					isError = true;
					return;
				}

			}
		}
		if (recordcount === 0) {
			if(kony.sync.updateSyncOrder(tx, scopename)===false){
				isError = true;
				return;
			}
		}
	}
	function clear_fail() {
		//kony.sync.downloadFailed(isError);
		if(isError){
			callback(kony.sync.errorCodeSQLStatement);
		}
		else{
			callback(kony.sync.errorCodeTransaction);
		}
	}
	function clear_success() {
		if (callback != null){
			callback(0);
		}
	}
};

//resets sync order for a scope
kony.sync.updateSyncOrder = function (tx, scopename) {
	sync.log.trace("Entering kony.sync.updateSyncOrder ");
	var settable = {};
	settable[kony.sync.metaTableSyncOrderCloumn] = 0;
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_update(query, kony.sync.metaTableName);
	kony.sync.qb_set(query, settable);
	kony.sync.qb_where(query, [{
				key : kony.sync.metaTableScopeColumn,
				value : scopename
			}
		]);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	return kony.sync.executeSql(tx, sql, params);
};

kony.sync.clearSyncOrder = function(dbname, limit, serverblob, deleteLastUploadRequest, callback) {
	sync.log.trace("Entering kony.sync.clearSyncOrder ");
	var recordcount = 0;
	var isError = false;
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, clear_fail);
	if (dbconnection !== null){
        kony.db.transaction(dbconnection, clear_transaction, clear_fail, clear_success);
    }
	
	function clear_transaction(tx){
		var resultSet = null;
		var query_compile = null;
		var sql = null;
		var params = null;
		//updating sync version for all records going in next batch
		if(kony.sync.updateSyncOrderForUploadBatching(tx, limit)===false){
			isError = true;
			return;
		}
		//updating upload timestamp
		if(kony.sync.setLastSyncUploadContext(tx, kony.sync.currentScope[kony.sync.scopeName], serverblob)===false){
			isError = true;
			return;
		}
		
		//delete last upload request
		if(kony.sync.deleteLastUploadRequest(tx, kony.sync.currentScope[kony.sync.scopeName])===false){
			isError = true;
			return;
		}

		//Just returning from here, as this is getting handled in clearDataForCOE function, below code is redundant
		return;

		if(kony.sync.isUploadErrorPolicyCOE(kony.sync.currentScope)){
			return;
		}
		if(!kony.sync.isNullOrUndefined(kony.sync.currentScope.ScopeTables)){
			for (var i = 0; i < kony.sync.currentScope.ScopeTables.length; i++) {
				var syncTable = kony.sync.currentScope.ScopeTables[i];
				if(kony.sync.isNullOrUndefined(syncTable)){
					continue;
				}	
				var tbname = syncTable.Name;
				
				//get whether table is marked for removeAfterUpload
				var removeAfterUpload = kony.sync.checkForDeleteAfterUpload(tbname, kony.sync.currentScope[kony.sync.scopeName]);
				
				//get Records To be deleted From History Table
				var records = kony.sync.getRecordsTobeDeletedFromHistoryTable(tx, tbname, limit);
				if(records===false){
					isError = true;
					return;
				}
				
				//clearing history table
				if(kony.sync.clearHistoryTable(tx, tbname, null, limit)===false){
					isError = true;
					return;
				}
				
				var pkColumns = kony.sync.currentScope.syncTableDic[tbname].Pk_Columns;
				for(var k in records){
					//preparing where clause
					var whereClause = [];
					for (var j = 0; j < pkColumns.length; j++){
						kony.table.insert(whereClause,{
							key: pkColumns[j],
							value: records[k][pkColumns[j]],
							optype: "EQ"
						});
					}

					var query = kony.sync.qb_createQuery();
								kony.sync.qb_select(query, null);
								kony.sync.qb_from(query, tbname + kony.sync.historyTableName);
								kony.sync.qb_where(query, whereClause);
					query_compile = kony.sync.qb_compile(query);
					sql = query_compile[0];
					params = query_compile[1];
					resultSet = kony.sync.executeSql(tx, sql, params);
					if(resultSet===false){
						isError = true;
						return;
					}
					//delete records from original and main tables if there is  no pending record in history table
					if(resultSet.rows.length===0){
						query = kony.sync.qb_createQuery();
								kony.sync.qb_delete(query, tbname + kony.sync.originalTableName);
								kony.sync.qb_where(query, whereClause);
						query_compile = kony.sync.qb_compile(query);
						sql = query_compile[0];
						params = query_compile[1];
						if(kony.sync.executeSql(tx, sql, params)===false){
							isError = true;
							return;
						}
						//remove value if table is marked for removeAfterUpload
						if(removeAfterUpload){
							query = kony.sync.qb_createQuery();
								kony.sync.qb_delete(query, tbname);
								kony.sync.qb_where(query, whereClause);
							query_compile = kony.sync.qb_compile(query);
							sql = query_compile[0];
							params = query_compile[1];
							if(kony.sync.executeSql(tx, sql, params)===false){
								isError = true;
								return;
							}
						}
					}
				}
				//currently disabling removeafterupload for P scope
				//kony.sync.clearMainTableForRemoveAfterUpload(tx, scopename, tbname, null);

				//couting deferred uploads
				sql = "select * from " + tbname + kony.sync.historyTableName;
				resultSet = kony.sync.executeSql(tx, sql, null);
				if(resultSet===false){
					isError = true;
					return;
				}
				var num_records = resultSet.rows.length;
				recordcount = recordcount + num_records;
			}
		}
		if (recordcount === 0) {
			if(kony.sync.updateSyncOrder(tx, kony.sync.currentScope[kony.sync.scopeName])===false){
				isError = true;
			}
		}
	}
			
	function clear_success(){
		sync.log.trace("Entering kony.sync.clearsyncorder->clear_success");
		callback();
	}
	function clear_fail(){
		sync.log.trace("Entering kony.sync.clearsyncorder->clear_fail");
		if (!isError){
			kony.sync.syncUploadFailed(kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
		}
		else{
			kony.sync.syncUploadFailed(kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
};

kony.sync.setSyncOrder = function (scopename, syncorder, tx, errorCallback) {
	sync.log.trace("Entering kony.sync.setSyncOrder ");
	var settable = [];
	settable[kony.sync.metaTableSyncOrderCloumn] = syncorder;
	var query = kony.sync.qb_createQuery();

	kony.sync.qb_update(query, kony.sync.metaTableName);

	kony.sync.qb_set(query, settable);

	kony.sync.qb_where(query, [{
				key : kony.sync.metaTableScopeColumn,
				value : scopename
			}
		]);
	//local sql = "update ".. kony.sync.metaTableName.." set "..kony.sync.metaTableSyncOrderCloumn.."="..syncorder .." where "..kony.sync.metaTableScopeColumn.." = '".. scopename .."'";
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	sync.log.debug("setting sync order", sql);
	return kony.sync.executeSql(tx, sql, params, errorCallback);
};

kony.sync.getLastGeneratedID = function (scopename, tx, errorCallback) {
	sync.log.trace("Entering kony.sync.getLastGeneratedID ");
	var query = kony.sync.qb_createQuery();

	kony.sync.qb_select(query, [kony.sync.metaTableLastGeneratedId]);

	kony.sync.qb_from(query, kony.sync.metaTableName);

	kony.sync.qb_where(query, [{
				key : kony.sync.metaTableScopeColumn,
				value : scopename
			}
		]);
	//local sql = "select "..kony.sync.metaTableLastGeneratedId.." from "..kony.sync.metaTableName.." where "..kony.sync.metaTableScopeColumn.." = '"..scopename.."'";
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	sync.log.debug("getting lastgeneratedid", sql);
	var resultset = kony.sync.executeSql(tx, sql, params, errorCallback);
	if (resultset === false) {
		return false;
	}
	sync.log.debug("result", resultset);
	var rowItem = kony.db.sqlResultsetRowItem(tx, resultset, 0);
	sync.log.debug("rowItem", rowItem);
	if (!kony.sync.isNullOrUndefined(rowItem[kony.sync.metaTableLastGeneratedId])) {
		return rowItem[kony.sync.metaTableLastGeneratedId];
	} else {
		//It should never come here
		sync.log.fatal("Last Generated ID is null");
		return false;
	}
};

kony.sync.setLastGeneratedID = function (scopename, lastgeneratedid, tx, errorCallback) {
	sync.log.trace("Entering kony.sync.setLastGeneratedID ");
	var settable = [];
	settable[kony.sync.metaTableLastGeneratedId] = lastgeneratedid;
	var query = kony.sync.qb_createQuery();

	kony.sync.qb_update(query, kony.sync.metaTableName);

	kony.sync.qb_set(query, settable);

	kony.sync.qb_where(query, [{
				key : kony.sync.metaTableScopeColumn,
				value : scopename
			}
		]);
	//local sql = "update ".. kony.sync.metaTableName.." set "..kony.sync.metaTableLastGeneratedId.."="..lastgeneratedid .." where "..kony.sync.metaTableScopeColumn.." = '".. scopename .."'";
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	sync.log.debug("setting sync order", sql);
	return kony.sync.executeSql(tx, sql, params, errorCallback);
};
//  **************** End KonySyncMetadata.js*******************


//  **************** Start KonySyncORMAPI.js*******************
if (typeof(kony.sync) === "undefined") {
	kony.sync = {};
}
if (typeof(sync) === "undefined") {
	sync = {};
}
kony.sync.updateByPK = function (tbname, dbname, relationshipMap, pks, valuestable, successcallback, errorcallback, markForUpload, wcs) {
	sync.log.trace("Entering kony.sync.updateByPK -> main function");
	var isSuccess = true;
	var pkNotFound = false;
	var isRefIntegrityError = false;
	var updateResult = null;
	var errObject = null;
	
	var twcs = [];
	twcs = kony.sync.CreateCopy(wcs);
	function single_execute_sql_transaction(tx) {
		sync.log.trace("Entering kony.sync.updateByPK -> single_execute_sql_transaction ");
		var record = "";
		if(kony.sync.enableORMValidations){
			record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
			if(record===false){
				isSuccess = false;
				return;
			}
		}
		if (null !== record || !kony.sync.enableORMValidations) {
			errObject = kony.sync.checkIntegrityinTransaction(tx, relationshipMap);
			if (errObject === false) {
				isSuccess = false;
				return;
			} else if (errObject !== true) {
				isSuccess = false;
				isRefIntegrityError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			} else {
				var blobStoreIndices = kony.sync.blobstore_update(tx, tbname, valuestable, wcs, false);
				var konysyncBinaryColumn = null;
				for(var column in blobStoreIndices) {
					konysyncBinaryColumn = kony.sync.binaryMetaColumnPrefix + column;
					delete valuestable[column];
					valuestable[konysyncBinaryColumn] = blobStoreIndices[column];
				}				
				updateResult = kony.sync.update(tx, tbname, valuestable, wcs, markForUpload, errorcallback);
				if (updateResult === false) {
					isSuccess = false;
				}
			}
		} else {
			pkNotFound = true;
		}
	}

	function single_transactionErrorCallback() {
		sync.log.error("Entering kony.sync.updatebyPK->single_transactionErrorCallback ");
		if (isSuccess){
			kony.sync.showTransactionError(errorcallback);
		} else if(isRefIntegrityError === true){
			kony.sync.verifyAndCallClosure(errorcallback, errObject);
		} else {
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}

	function single_execute_sql_transactionSucessCallback() {
		sync.log.trace("Entering kony.sync.updateByPK->single_execute_sql_transactionSucessCallback -> isSuccess -> " + isSuccess);
		if(pkNotFound === true || isSuccess === false){
			kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
			return;
		} else {
			kony.sync.verifyAndCallClosure(successcallback, {
				rowsupdated : 1
			});
		}
	}
	try {

		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if (dbconnection !== null) {
			kony.sync.startTransaction(dbconnection, single_execute_sql_transaction, single_execute_sql_transactionSucessCallback, single_transactionErrorCallback, "Single Execute");
		}
	} catch (e) {
		sync.log.error("Unknown error occurred during update", e);
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorUnknown, kony.sync.getErrorMessage(kony.sync.errorUnknown, "Rollback", e), null));
	}
};

kony.sync.checkForFalseUpdateInTransaction = function (tx, dbname, tbname, twcs, markForUpload, errorcallback) {
	sync.log.trace("Entering kony.sync.checkForFalseUpdate ");
	if (kony.sync.getUploadStatus(markForUpload)){
		return true;
	} else {
		kony.table.insert(twcs, {
			key : kony.sync.historyTableChangeTypeColumn,
			value : "90",
			optype : "EQ",
			comptype : "AND"
		});
		var query = kony.sync.qb_createQuery();
		kony.sync.qb_select(query, [kony.sync.historyTableChangeTypeColumn]);
		kony.sync.qb_from(query, tbname + "_history");
		kony.sync.qb_where(query, twcs);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];

		var resultSet = kony.sync.executeSql(tx, sql, params, errorcallback);
		if ((resultSet !== false)) {
			var num_records = resultSet.rows.length;
			if (num_records !== 0) {
				sync.log.error("Record does not exist on server, mark it for upload before updating/deleting it");
				return kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeMarkForUpload, kony.sync.getErrorMessage(kony.sync.errorCodeMarkForUpload), null));
			}
		} else {
			return false;
		}
		return true;
	}
};

//  **************** End KonySyncORMAPI.js*******************


//  **************** Start konySyncQueryBuilder.js*******************
//-------------------------Sample Query Table for reference----------------------------
//sqlquery={
//	["schemaname"] = "",
//	["tablename"]= "",
//	["operationtype"] = "" { Insert, Select, Update, Delete, Custom },
//	["orderbyclause"]="",
//	["topclause"]="",
//  ["isPurge"]=true/false This condition will make insert statement to insert ignore.
//	["purgeValues"] = "";
//	multiple conditions
//	["conditions"]={
//		{
//			["key"]=""
//			["value"]=""
//			["optype"]="" { EQ, NOT_EQ, GT, GT_EQ, LT, LT_EQ, LIKE, JOIN }	 
//			["comptype"]="" { AND, OR }
//			["binary"]="" {true,false}
//		},
//		{
//			["key"]=""
//			["value"]=""
//			["optype"]=""
//			["value"]=""
//		}
//	},
//	["fields"]={
//		"c1","c2","c3"		
//	},
//	["colvals"]={
//		{
//			["key"]="cname"
//			["value"]="vname"
//		},
//		{
//			["key"]="cname"
//			["value"]="vname"
//		}
//	}
//}
//function qb_createQuery()

if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}
if(typeof(sync) === "undefined") {
	sync = {};
}
kony.sync.qb_createQuery = function() {
	sync.log.trace("Entering kony.sync.qb_createQuery ");
    return {
        topclause: "",
		distinctclause: "",
        orderbyclause: "",
        colvals: [],
        conditions: [],
        paramindex: 0
    };
};

kony.sync.qb_where = function(query, conditions) {
	sync.log.trace("Entering kony.sync.qb_where ");
	if(kony.sync.isNullOrUndefined(conditions)){
		return;
	}
	for (var i = 0; i < conditions.length; i++) {
        var cond = conditions[i];
        var condition = [];
        if (kony.sync.isNullOrUndefined(cond.optype)) {
            cond.optype = "EQ";
        }
        if (kony.sync.isNullOrUndefined(cond.comptype)) {
            cond.comptype = "AND";
        }
        condition.key = cond.key;
        condition.optype = cond.optype;
        condition.value = cond.value;
        condition.comptype = cond.comptype;
		condition.openbrace = cond.openbrace;
		condition.closebrace = cond.closebrace;
        kony.table.insert(query.conditions, condition);
    }
};

kony.sync.qb_insert = function(query, tablename) {
	sync.log.trace("Entering kony.sync.qb_insert ");
    query.operationtype = "insert";
    query.tablename = tablename;
};

kony.sync.qb_purgeInsert = function(query, tablename, values){
	sync.log.trace("Entering kony.sync.qb_purgeInsert ");
    query.operationtype = "insert";
    query.tablename = tablename;
	query.isPurge = true;
	if(kony.sync.isNullOrUndefined(kony.sync.queryStore[tablename+"purgeInsert"])){
		kony.sync.qb_set(query, values);
	}else{
		query.purgeValues = values;
	}
};

kony.sync.qb_delete = function(query, tablename) {
	sync.log.trace("Entering kony.sync.qb_delete ");
    query.operationtype = "delete";
    query.tablename = tablename;
};

kony.sync.qb_update = function(query, tablename) {
	sync.log.trace("Entering kony.sync.qb_update ");
    query.operationtype = "update";
    query.tablename = tablename;
};

kony.sync.qb_select = function(query, fields) {
	sync.log.trace("Entering kony.sync.qb_select ");
    query.operationtype = "select";
    query.fields = fields;
};

kony.sync.qb_from = function(query, tablename) {
	sync.log.trace("Entering kony.sync.qb_from ");
    query.tablename = tablename;
};

kony.sync.qb_set = function(query, tabcolval) {
	sync.log.trace("Entering kony.sync.qb_set ");
    for (var key in tabcolval) {
        var value = tabcolval[key];
        if(!kony.sync.isNullOrUndefined(value)) {
            var colval = [];
            colval.key = key;
            colval.value = value;
            kony.table.insert(query.colvals, colval);
        }
    }
};

kony.sync.qb_top = function(query, topno) {
	sync.log.trace("Entering kony.sync.qb_top ");
    query.topclause = " Top " + topno + " ";
};

kony.sync.qb_orderBy = function(query,orderByMap) {
	sync.log.trace("Entering kony.sync.qb_orderBy ");
	var orderByClause = "";
	if(!kony.sync.isNullOrUndefined(orderByMap)){
		orderByClause = " order by ";
		var j=0;
		for(var i in orderByMap){
			if(j===0) {
				orderByClause = orderByClause+ " \"" + orderByMap[i].key +"\"";
				j++;
			}
			else {
				orderByClause = orderByClause+",\""+ orderByMap[i].key + "\"";
			}
			if(orderByMap[i].sortType === "desc"){
				orderByClause = orderByClause + " desc";
			}	
		}
	}
	query.orderbyclause = orderByClause;
};

kony.sync.qb_distinct = function(query) {
    query.distinctclause = " distinct ";
};

kony.sync.qb_orderby1 = function(query, colname, isasec) {
	sync.log.trace("Entering kony.sync.qb_orderby1 ");
    if ((isasec)) {
        query.orderbyclause = " order by \"" + colname +  "\"";
    } else {
        query.orderbyclause = " order by \"" + colname + "\" desc ";
    }
};

kony.sync.qb_createParam = function(pkey, query, pval, params) {
	sync.log.trace("Entering kony.sync.qb_createParam ");
    if ((kony.sync.getBackEndDBType() === kony.sync.dbTypeSQLLite)) {
        kony.table.insert(params, pval);
        return "?";
    } else if ((kony.sync.getBackEndDBType() === kony.sync.dbTypeSQLCE)) {
        query.paramindex = query.paramindex + 1;
        var param = "@" + pkey + query.paramindex;
        params[param] = pval;
        return param;
    }
};

kony.sync.qb_getupdatedfields = function(query) {
	sync.log.trace("Entering kony.sync.qb_getupdatedfields ");
    var updateStr = "";
    for (var i=0; i < query.colvals; i++) {
        var v = query.colvals[i];
        if(i === 0){
            updateStr = " set ";
        }
        if(v.value === "nil") {
            updateStr = updateStr + " \"" + v.key + "\"=" + "null";
        } else {
            updateStr = updateStr + " \"" + v.key + "\"=" + "'" + v.value + "'";
        }
        if (i < query.colvals.length-1) {
            updateStr = updateStr + ",";
        }
    }
    return updateStr;
};

kony.sync.qb_getparamupdatedfields = function(query) {
	sync.log.trace("Entering kony.sync.qb_getparamupdatedfields ");
    var updateStr = "";
    var params = [];
    for (var i=0; i<query.colvals.length; i++) {
        var v = query.colvals[i];
        if(i === 0){
            updateStr = " set ";
        }
        if ((v.value === "nil")) {
            updateStr = updateStr + " \"" + v.key + "\"=" + "null";
        } else {
            var param = kony.sync.qb_createParam(v.key, query, v.value, params);
            updateStr = updateStr + " \"" + v.key + "\"=" + param;
        }
        if (i < query.colvals.length - 1) {
            updateStr = updateStr + ",";
        }
    }
    return [updateStr, params];
};

kony.sync.qb_getfieldstring = function(query) {
	sync.log.trace("Entering kony.sync.qb_getfieldstring ");
    var retstr = "";
    if (!kony.sync.isNullOrUndefined(query.fields)) {
        for (var i = 0; i< query.fields.length; i++) {
            var field = query.fields[i];
            retstr = retstr + field;
            if(query.fields.length - 1 !== i) {                
                retstr = retstr + ",";
            }
        }
        return retstr;
    } else {
        return "*";
    }
};

kony.sync.qb_getoperatorString = function(optype, isnull) {
	sync.log.trace("Entering kony.sync.qb_getoperatorString ");
    if ((optype === "EQ")) {
        if ((isnull)) {
            return " is ";
        } else {
            return " = ";
        }
    } else if ((optype === "NOT_EQ")) {
        if ((isnull)) {
            return " is not ";
        } else {
            if ((kony.sync.getBackEndDBType() === kony.sync.dbTypeSQLCE)) {
                return " !== ";
            } else if ((kony.sync.getBackEndDBType() === kony.sync.dbTypeSQLLite)) {
                return " <> ";
            }
        }
    } else if ((optype === "GT")) {
        return " > ";
    } else if ((optype === "GT_EQ")) {
        return " >= ";
    } else if ((optype === "LT")) {
        return " < ";
    } else if ((optype === "LT_EQ")) {
        return " <= ";
    } else if ((optype === "LIKE")) {
        return " LIKE ";
    }  else if ((optype === "NOT LIKE")) {
        return " NOT LIKE ";
    } else {
        return "";
    }
    return "MARS";
};

kony.sync.qb_getcompstring = function(comptype) {
	sync.log.trace("Entering kony.sync.qb_getcompstring ");
    if ((comptype === "AND")) {
        return " AND ";
    } else if ((comptype === "OR")) {
        return " OR ";
    } else {
        return "";
    }
};

kony.sync.qb_getwhereclause = function(query) {
	sync.log.trace("Entering kony.sync.qb_getwhereclause ");
    var retstr = "";
    if (!kony.sync.isNullOrUndefined(query.conditions)) {
        for (var i = 0; i < query.conditions.length; i++) {
            var condition = query.conditions[i];
            if (i === 0) {
                retstr = " WHERE ";
            }
            var conditionString = "";
            if ((condition.value === "nil")) {
               conditionString = "\"" + condition.key + "\" " + kony.sync.qb_getoperatorString(condition.optype, true) + "null";
            } else {
               conditionString = "\"" + condition.key + "\" " + kony.sync.qb_getoperatorString(condition.optype, false) + "'" + condition.value + "' ";
            }
			if(condition.openbrace === true){
				conditionString = " ( " + conditionString;
			}
			if(condition.closebrace === true){
				conditionString = conditionString + ")";
			}
            retstr = retstr + conditionString;
            if (i !== query.conditions.length - 1) {
               retstr = retstr + kony.sync.qb_getcompstring(condition.comptype);
            }
        }
    }
    return retstr;
};

kony.sync.qb_getparamwhereclause = function(query) {
	sync.log.trace("Entering kony.sync.qb_getparamwhereclause ");
    var retstr = "";
    var params = [];
    if (!kony.sync.isNullOrUndefined(query.conditions)) {
        for (var i = 0; i < query.conditions.length; i++) {
            var condition = query.conditions[i];
            if (i === 0) {
                retstr = " WHERE ";
            }
            var conditionString = "";
            if ((condition.value === "nil")) {
               conditionString = condition.key + kony.sync.qb_getoperatorString(condition.optype, true) + "null";
            } else {
               var param = kony.sync.qb_createParam(condition.key, query, condition.value, params);
               conditionString = condition.key + kony.sync.qb_getoperatorString(condition.optype, false) + param;
            }
			if(condition.openbrace === true){
				conditionString = " ( " + conditionString;
			}
			if(condition.closebrace === true){
				conditionString = conditionString + ")";
			}
            retstr = retstr + conditionString;
            if (i !== query.conditions.length - 1) {
               retstr = retstr + kony.sync.qb_getcompstring(condition.comptype);
            }
        }
    }
    return [retstr, params];
};

kony.sync.qb_getinsertcolums = function(query) {
	sync.log.trace("Entering kony.sync.qb_getinsertcolums ");
    var retstr = "(";
    var numCols = query.colvals.length;
    var count = 0;
    if(numCols === 0) {
        return "";
    }
	if(!kony.sync.isNullOrUndefined(query.colvals)){
		for (var i = 0; i < query.colvals.length; i++) {
			var colval = query.colvals[i];
			count = count + 1;
			retstr = retstr + "\"" + colval.key + "\"";
			if ((count !== numCols)) {
				retstr = retstr + ",";
			}
		}
	}
    retstr = retstr + ")";
    return retstr;
};

kony.sync.qb_getinsertvalues = function(query) {
	sync.log.trace("Entering kony.sync.qb_getinsertvalues ");
    var retstr = "(";
    var numCols = query.colvals.length;
    if (numCols === 0) {
        return "";
    }
	if(!kony.sync.isNullOrUndefined(query.colvals)){
		for (var i = 0; i < query.colvals.length; i++) {
			var colval = query.colvals[i];
			var value = "";
			if ((colval === "nil")) {
				value = "NULL";
			} else {
				value = "'" + colval.value + "'";
			}
			retstr = retstr + value;
			if ((i !== numCols)) {
				retstr = retstr + ",";
			}
		}
	}
    retstr = retstr + ")";
    return retstr;
};

kony.sync.qb_getparaminsertvalues = function(query) {
	sync.log.trace("Entering kony.sync.qb_getparaminsertvalues ");
    var retstr = "(";
    var params = [];
    var numCols = query.colvals.length;
    if (numCols === 0) {
        return "";
    }
	if(!kony.sync.isNullOrUndefined(query.colvals)){
		for (var i = 0;  i < query.colvals.length; i++) {
			var colval = query.colvals[i];
			var value = "";
			if ((colval === "nil")) {
				value = "NULL";
			} else {
				var param = kony.sync.qb_createParam(colval.key, query, colval.value, params);
				value = param;
			}
			retstr = retstr + value;
			if (i !== numCols - 1) {
				retstr = retstr + ",";
			}
		}
	}
    retstr = retstr + ")";
    return [retstr, params];
};

kony.sync.qb_gettablename = function(query) {
	sync.log.trace("Entering kony.sync.qb_gettablename ");
    return query.tablename;
};

//lmit and offset  for select
kony.sync.qb_limitOffset = function(query, limit, offset){
	if(!kony.sync.isNullOrUndefined(limit)){
		if(kony.sync.isNullOrUndefined(offset)){
			offset = 0;
		}
		if ((kony.sync.getBackEndDBType() === kony.sync.dbTypeSQLLite)) {
			query.limit = limit;
			query.offset = offset;
		}
	}
};

kony.sync.qb_compile = function(query) {
	sync.log.trace("Entering kony.sync.qb_compile ");
	var params = null;
	var sql = null;
	var wctable = null;
	var wc = null;
	var ret = null;
    if ((kony.sync.isParameter)) {
        ret = "";
		if ((query.operationtype === "insert")) {           
			var insertstring =  "insert into ";
            if(query.isPurge === true){
				if(!kony.sync.isNullOrUndefined(kony.sync.queryStore[query.tablename+"purgeInsert"])){
					return [kony.sync.queryStore[query.tablename+"purgeInsert"], query.purgeValues];
				}
            //#ifdef android
				insertstring = "insert into ";
			//#else
				//#ifdef tabrcandroid
				insertstring = "insert into ";
				//#else
				insertstring = "insert or ignore into ";
				//#endif
			//#endif
            }
			var itable = kony.sync.qb_getparaminsertvalues(query);
            var iv = itable[0];
            params = itable[1];
            sql = insertstring + "\"" + kony.sync.qb_gettablename(query) + "\"" + kony.sync.qb_getinsertcolums(query) + " values " + iv;
			if(query.isPurge === true){
				kony.sync.queryStore[query.tablename+"purgeInsert"] = sql;
			}
            return [sql, params];
        }else if ((query.operationtype === "select")) {
            wctable = kony.sync.qb_getparamwhereclause(query);
            wc = wctable[0];
            params = wctable[1];
            sql = "select " + query.distinctclause + query.topclause + kony.sync.qb_getfieldstring(query) + " from \"" + kony.sync.qb_gettablename(query) + "\"" + wc + query.orderbyclause;
			if(!kony.sync.isNullOrUndefined(query.limit)){
				sql += " limit " + query.limit + " offset " + query.offset;
			}
            return [sql, params];
        } else if ((query.operationtype === "update")) {
            wctable = kony.sync.qb_getparamwhereclause(query);
            wc = wctable[0];
            var wparams = wctable[1];
			var uftable = kony.sync.qb_getparamupdatedfields(query);
            var uf = uftable[0];
            var uparams = uftable[1];
			sql = "Update \"" + kony.sync.qb_gettablename(query) + "\" " + uf + " " + wc;
            for (var i = 0; i < wparams.length; i++) {
					uparams.push(wparams[i]);
			}
            params = uparams;
            //kony.sync.syncPrint("update sql : " + sql);
            
            //kony.sync.syncPrint("update params : " + params);
            return [sql, params];
        } else if ((query.operationtype === "delete")) {
			wctable = kony.sync.qb_getparamwhereclause(query);
			wc = wctable[0];
            params = wctable[1];
			sql = "delete from \"" + kony.sync.qb_gettablename(query) + "\" " + wc;
            return [sql, params];
        }
    } else {
        ret = "";
        if ((query.operationtype === "select")) {
            sql = "select " + query.distinctclause + query.topclause + kony.sync.qb_getfieldstring(query) + 
			" from \"" + kony.sync.qb_gettablename(query) + "\"" + kony.sync.qb_getwhereclause(query) + query.orderbyclause;
            return sql;
        } else if ((query.operationtype === "update")) {
           return "Update \"" + kony.sync.qb_gettablename(query) + 
			"\" " + kony.sync.qb_getupdatedfields(query) + 
			" " + kony.sync.qb_getwhereclause(query);
        } else if ((query.operationtype === "insert")) {
			return "insert into \"" + kony.sync.qb_gettablename(query) + "\"" +
			kony.sync.qb_getinsertcolums(query) + " values " + kony.sync.qb_getinsertvalues(query);
        } else if ((query.operationtype === "delete")) {
			return "delete from \"" + kony.sync.qb_gettablename(query) + "\" " + kony.sync.qb_getwhereclause(query);
        }
    }
};
//  **************** End konySyncQueryBuilder.js*******************


//  **************** Start konySyncQueryProvider.js*******************
if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}
if(typeof(sync) === "undefined") {
	sync = {};
}

kony.sync.single_execute_sql = function (dsname, sqlstatement, params, result_successcallback, result_errorcallback) {
	sync.log.trace("Entering kony.sync.single_execute_sql-> main function");
	var single_execute_sql_result = null;
	var dbname = dsname;
	var isError = false;
	function single_execute_sql_transaction(tx) {
		sync.log.trace("Entering single_execute_sql_transaction");
		var resultset = kony.sync.executeSql(tx, sqlstatement, params, result_errorcallback);
		if (resultset !== false) {
			if (resultset.rows.length > 0) {
				single_execute_sql_result = kony.db.sqlResultsetRowItem(tx, resultset, 0);
			}
		} else {
			isError = true;
		}
	}
	function single_execute_sql_transactionSucessCallback() {
		sync.log.trace("Entering kony.sync.single_execute_sql->single_execute_sql_transactionSucessCallback");
		if (!isError) {
			kony.sync.verifyAndCallClosure(result_successcallback, single_execute_sql_result);
		}
	}

	function single_execute_sql_transactionErrorCallback() {
		sync.log.error("Entering kony.sync.single_execute_sql->single_execute_sql_transactionErrorCallback");
		if (!isError) {
			kony.sync.verifyAndCallClosure(result_errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
		}
		else{
			kony.sync.verifyAndCallClosure(result_errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}

	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname,result_errorcallback);
	if(dbconnection!==null){
		kony.sync.startTransaction(dbconnection, single_execute_sql_transaction, single_execute_sql_transactionSucessCallback, single_execute_sql_transactionErrorCallback, "Single Execute");
	}
};

kony.sync.single_select_execute = function (dsname, sql, params, success_callback, error_callback) {
	sync.log.trace("Entering kony.sync.single_select_execute ");
	var callback_result = [];
	var dbname = dsname;
	var isError = false;

	function single_transaction_success_callback() {
		sync.log.trace("Entering kony.sync.single_select_execute->single_transaction_success_callback");
		if (!isError) {
			kony.sync.verifyAndCallClosure(success_callback, callback_result);
		}
	}

	function single_transaction_error_callback() {
		sync.log.error("Entering kony.sync.single_select_execute->single_transaction_error_callback");
		if (!isError) {
			kony.sync.showTransactionError(error_callback);
		}else{
			sync.log.error("Entering kony.sync.single_select_execute->single_transaction_error_callback :", kony.sync.errorObject);
			kony.sync.verifyAndCallClosure(error_callback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}

	function single_transaction_callback(tx) {
		sync.log.trace("Entering kony.sync.single_select_execute->single_transaction_callback");
		var resultSet = kony.sync.executeSql(tx, sql, params, error_callback);
		if (resultSet !== false) {
			if ((kony.sync.is_SQL_select(sql))) {
				var num_records = resultSet.rows.length;
				sync.log.debug("Single Select no of records:", num_records);
				for (var i = 0; i <= num_records - 1; i++) {
					var record = kony.db.sqlResultsetRowItem(tx, resultSet, i);
					kony.table.insert(callback_result, record);
				}
			}
		} else {
			isError = true;
		}
	}

	var connection = kony.sync.getConnectionOnly(dbname, dbname, error_callback);
	if(connection !== null){
		kony.sync.startTransaction(connection, single_transaction_callback, single_transaction_success_callback, single_transaction_error_callback);
	}
};


kony.sync.single_binary_select_ondemand_execute = function(dsname, tbname, columnName, pks, config,
														   blobType, successCallback, errorCallback){

	var response = {};

	function single_transaction_success_callback() {
		sync.log.trace("Entering kony.sync.single_select_execute_binary_onDemand->single_select_binary_transaction_success");
	}

	function single_transaction_error_callback() {
		sync.log.error("Entering kony.sync.single_select_execute_binary_onDemand->single_select_binary_transaction_failed");

	}

	function single_transaction_callback(tx) {
		var scopename = kony.sync.scopes.syncTableScopeDic[tbname];
		var scope = kony.sync.scopes[scopename];
		var pkColumns = scope.syncTableDic[tbname].Pk_Columns;

		//validate whether we get all pks in the pk table.
		pks = kony.sync.validatePkTable(pkColumns, pks);

		if(!kony.sync.isNullOrUndefined(pks)) {

			var blobRef = kony.sync.getBlobRef(tx, tbname, columnName, pks ,errorCallback);
			if(!kony.sync.isNullOrUndefined(blobRef)) {
				if (blobRef === -1) {
					//no record exists..
					response.pkTable = pks;
					if(blobType === kony.sync.BlobType.BASE64) {
						response.base64 = null;
					} else {
						response.filePath = null;
					}
					successCallback(response);

				} else if(blobRef === "NULL") {
					//trigger download..
					kony.sync.blobManager.getBlobOnDemand(tx, null, blobType, tbname,
						columnName, config, pks, successCallback, errorCallback);
				}
				else {
					//fetch from blob store manager.
					kony.sync.blobManager.getBlobOnDemand(tx, blobRef, blobType, tbname,
						columnName, config, pks, successCallback, errorCallback);
				}
			} 
		} else {
			//error invalid pks.
			kony.print("Invalid pk table..");
			var error = {};
			errorCallback(error);
		}

	}

	if(kony.sync.isBinaryColumn(tbname, columnName) !== -1) {
		var connection = kony.sync.getConnectionOnly(dsname, dsname, errorCallback);
		if(connection !== null){
			kony.sync.startTransaction(connection, single_transaction_callback, single_transaction_success_callback, single_transaction_error_callback);
		}
	} else {
		//not a binary column. return empty object.
		successCallback(response);
	}
};

kony.sync.single_binary_select_inline_execute = function(dsname, tbname, columnName, pks, config, blobType,
														 successCallback, errorCallback) {
	var response = {};

	function single_transaction_success_callback() {
		sync.log.trace("Entering kony.sync.single_select_execute_binary_onDemand->single_select_binary_transaction_success");
	}

	function single_transaction_error_callback() {
		sync.log.error("Entering kony.sync.single_select_execute_binary_onDemand->single_select_binary_transaction_failed");

	}

	function single_transaction_callback(tx) {
		var scopename = kony.sync.scopes.syncTableScopeDic[tbname];
		var scope = kony.sync.scopes[scopename];
		var pkColumns = scope.syncTableDic[tbname].Pk_Columns;

		//validate whether we get all pks in the pk table.
		pks = kony.sync.validatePkTable(pkColumns, pks);

		if(!kony.sync.isNullOrUndefined(pks)) {
			var blobRef = kony.sync.getBlobRef(tx, tbname, columnName, pks, errorCallback);
			if(!kony.sync.isNullOrUndefined(blobRef)) {
				if (blobRef === -1) {
					//No record exists with given pks.
					response.pkTable = pks;
					if(blobType === kony.sync.BlobType.BASE64) {
						response.base64 = null;
					} else {
						response.filePath = null;
					}
					successCallback(response);

				} else {
					//fetch from blob store manager.
					kony.sync.blobManager.getBlobInline(tx, blobRef, blobType, tbname,
						columnName, config, pks, successCallback, errorCallback);
				}
			} else {
				//blob doesn't exist for given record.
				response.pkTable = pks;
				if(blobType === kony.sync.BlobType.BASE64) {
					response.base64 = null;
				} else {
					response.filePath = null;
				}
				successCallback(response);
			}
		} else {
			//error invalid pks.
			var error = kony.sync.getErrorTable(
				kony.sync.errorCodeInvalidPksGiven,
				kony.sync.getErrorMessage(kony.sync.errorCodeInvalidPksGiven)
			);
			errorCallback(error);
		}

	}

	if(kony.sync.isBinaryColumn(tbname, columnName) !== -1) {
		var connection = kony.sync.getConnectionOnly(dsname, dsname, errorCallback);
		if(connection !== null){
			kony.sync.startTransaction(connection, single_transaction_callback, single_transaction_success_callback, single_transaction_error_callback);
		}
	} else {
		//not a binary column. return empty object.
		successCallback(response);
	}
};

kony.sync.single_binary_select_base64_execute = function(dsname, tbname, columnName, pks, config,
														 successCallback, errorCallback){
	sync.log.trace("Entering kony.sync.single_binary_select_base64_execute-> main function");
	if(kony.sync.isValidFunctionType(successCallback) && kony.sync.isValidFunctionType(errorCallback)) {
		if(columnName === undefined || typeof(columnName) !== "string") {
			//TODO: create an appropriate error object
			var err = {};
			errorCallback(err);
			return;
		}
		var downloadPolicy = kony.sync.getDownloadPolicy(tbname, columnName);
		if(!kony.sync.isNullOrUndefined(downloadPolicy)) {
			if(downloadPolicy === "Attachment") {
				kony.sync.single_binary_select_ondemand_execute(dsname, tbname, columnName, pks,
					config, kony.sync.BlobType.BASE64, successCallback, errorCallback);
			} else {
				//call inline base64 fetch.
				kony.sync.single_binary_select_inline_execute(dsname, tbname, columnName, pks,
					config, kony.sync.BlobType.BASE64, successCallback, errorCallback);
			}
		} else {
			//TODO: create an appropriate error object - invalid column.
			var err = {};
			errorCallback(err);
			return;
		}
	} else {
		//invalid callbacks. return
		return;
	}
};

kony.sync.single_binary_select_file_execute = function(dsname, tbname, columnName, pks, config,
													   successCallback, errorCallback){
	sync.log.trace("Entering kony.sync.single_binary_select_base64_execute-> main function");
	if(kony.sync.isValidFunctionType(successCallback) && kony.sync.isValidFunctionType(errorCallback)) {
		if(columnName === undefined || typeof(columnName) !== "string") {
			//TODO: create an appropriate error object
			var err = {};
			errorCallback(err);
			return;
		}
		var downloadPolicy = kony.sync.getDownloadPolicy(tbname, columnName);
		if(!kony.sync.isNullOrUndefined(downloadPolicy)) {
			if(downloadPolicy === "Attachment") {
				kony.sync.single_binary_select_ondemand_execute(dsname, tbname, columnName, pks,
					config, kony.sync.BlobType.FILE, successCallback, errorCallback);
			} else {
				//call inline base64 fetch.
				kony.sync.single_binary_select_inline_execute(dsname, tbname, columnName, pks,
					config, kony.sync.BlobType.FILE, successCallback, errorCallback);
			}
		} else {
			//TODO: create an appropriate error object -- invalid column.
			var err = {};
			errorCallback(err);
		}
	}
};


kony.sync.single_insert_execute = function (dsname, tbname, values, success_callback, error_callback, markForUpload) {
	sync.log.trace("Entering kony.sync.single_insert_execute-> main function");
	var callback_result = [];
	var dbname = dsname;
	var isSuccess = true;

	function single_transaction_success_callback() {
		sync.log.trace("Entering kony.sync.single_insert_execute->single_transaction_success_callback");
		if (isSuccess) {
			kony.sync.verifyAndCallClosure(success_callback, callback_result);
		}
	}

	function single_transaction_failure_callback() {
		sync.log.error("Entering kony.sync.single_insert_execute->single_transaction_failure_callback");
		if (isSuccess) {
			kony.sync.showTransactionError(error_callback);
		}else{
			sync.log.error("Entering kony.sync.single_insert_execute->single_transaction_failure_callback : ", kony.sync.errorObject);
			kony.sync.verifyAndCallClosure(error_callback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}


	function single_transaction_callback(tx) {
		sync.log.trace("Entering kony.sync.single_insert_execute->single_transaction_callback");
		//CallBack_result contains AutoGenerated PK in hash ({id = value})
		var blobStoreIndices = kony.sync.blobstore_insert(tx, tbname, values, error_callback);
		var konysyncBinaryColumn = null;
		for(var column in blobStoreIndices) {
			konysyncBinaryColumn = kony.sync.binaryMetaColumnPrefix + column;
			delete values[column];
			values[konysyncBinaryColumn] = blobStoreIndices[column];
		}
		callback_result = kony.sync.insert(tx, tbname, values, error_callback, markForUpload);
		if (callback_result === false) {
			isSuccess = false;
		}
	}

	var connection = kony.sync.getConnectionOnly(dbname, dbname, error_callback);
	if(connection !== null){
		kony.sync.startTransaction(connection, single_transaction_callback, single_transaction_success_callback, single_transaction_failure_callback);
	}
};

kony.sync.single_update_execute = function (dsname, tbname, values, wc, success_callback, error_callback, isBatch, markForUpload, primaryKey) {
	sync.log.trace("Entering kony.sync.single_update_execute ");
	var callback_result = {};
	var dbname = dsname;
	var isError = false;

	function single_transaction_success_callback() {
		sync.log.trace("Entering kony.sync.single_update_execute->single_transaction_success_callback ");
		kony.sync.verifyAndCallClosure(success_callback, callback_result);
	}

	function single_transaction_error_callback() {
		sync.log.error("Entering kony.sync.single_update_execute->single_transaction_error_callback");
		if (!isError) {
			kony.sync.showTransactionError(error_callback, "Single Update Execute");
		}else{
			sync.log.error("Entering kony.sync.single_update_execute->single_transaction_error_callback :", kony.sync.errorObject);
			kony.sync.verifyAndCallClosure(error_callback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}

	function single_transaction_callback(tx){
		sync.log.trace("Entering kony.sync.single_update_execute->single_transaction_callback");
		var blobStoreIndices = kony.sync.blobstore_update(tx, tbname, values, wc, isBatch);
		if(!kony.sync.isNullOrUndefined(blobStoreIndices)) {
			var konysyncBinaryColumn;
			for (var column in blobStoreIndices) {
				konysyncBinaryColumn = kony.sync.binaryMetaColumnPrefix + column;
				delete values[column];
				values[konysyncBinaryColumn] = blobStoreIndices[column];
			}
			if (isBatch === true) {
				callback_result = kony.sync.updateBatch(tx, tbname, values, wc, markForUpload, primaryKey);
			} else {
				callback_result = kony.sync.update(tx, tbname, values, wc, markForUpload);
			}
		}
		if(callback_result===false){
			isError = true;
		}
	}

	var connection = kony.sync.getConnectionOnly(dbname, dbname, error_callback, "Single Update Execute");
	if(connection !== null){
		kony.sync.startTransaction(connection, single_transaction_callback, single_transaction_success_callback, single_transaction_error_callback, "Single Update Execute");
	}
};

kony.sync.single_delete_execute = function (dsname, tbname, wc, success_callback, error_callback, isBatch, isLocal, markForUpload) {
	sync.log.trace("Entering kony.sync.single_delete_execute-> main function");
	var callback_result = [];
	var dbname = dsname;
	var isError = false;

	function single_transaction_success_callback() {
		sync.log.trace("Entering kony.sync.single_delete_execute->single_transaction_success_callback ");
		kony.sync.verifyAndCallClosure(success_callback, callback_result);
	}

	function single_transaction_callback(tx) {
		sync.log.trace("Entering kony.sync.single_delete_execute->single_transaction_callback");
		var isBlobDeleted = kony.sync.blobstore_delete(tx, tbname, wc, isBatch);
		if(isBlobDeleted) {
			if (isBatch === true) {
				callback_result = kony.sync.deleteBatch(tx, tbname, wc, isLocal, markForUpload, error_callback);
			} else {
				callback_result = kony.sync.remove(tx, tbname, wc, isLocal, markForUpload, error_callback);
			}
		}
		if(callback_result===false){
			isError = true;
		}
	}

	function single_transaction_error_callback() {
		sync.log.error("Entering kony.sync.single_delete_execute->single_transaction_error_callback");
		if (!isError) {
			kony.sync.showTransactionError(error_callback, "Single Update Execute");
		}else{
			sync.log.error("Entering kony.sync.single_delete_execute->single_transaction_error_callback :", kony.sync.errorObject);
			kony.sync.verifyAndCallClosure(error_callback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}

	var connection = kony.sync.getConnectionOnly(dbname, dbname, error_callback, "Single Delete Execute");
	if(connection !== null){
		kony.sync.startTransaction(connection, single_transaction_callback, single_transaction_success_callback, single_transaction_error_callback, "Single Delete Execute");
	}
};

kony.sync.massInsert = function (dsname, tbname, valuesArray, successCallback, errorCallback, markForUpload) {
	sync.log.trace("Entering kony.sync.massInsert-> main function");
	var callbackResult = [];
	var dbname = dsname;

	function massInsertTransactionSuccessCallback() {
		sync.log.trace("Entering kony.sync.massInsert->massInsertTransactionSuccessCallback");
		kony.sync.verifyAndCallClosure(successCallback, callbackResult);
	}

	function massInsertTransactionErrorCallback() {
		sync.log.error("Entering kony.sync.massInsert->massInsertTransactionErrorCallback");
		kony.sync.verifyAndCallClosure(errorCallback, kony.sync.errorObject);

	}

	function massInsertTransactionCallback(tx) {
		sync.log.trace("Entering kony.sync.massInsert->massInsertTransactionCallback");
		//CallBack_result contains AutoGenerated PK in hash ({id = value})
		for (var i in valuesArray) {
			callbackResult.push(kony.sync.insert(tx, tbname, valuesArray[i], null, markForUpload));
		}
	}

	var connection = kony.sync.getConnectionOnly(dbname, dbname);
	kony.sync.startTransaction(connection, massInsertTransactionCallback, massInsertTransactionSuccessCallback, massInsertTransactionErrorCallback);
};

kony.sync.massUpdate = function(dbname, tbname, inputArray, successCallback, errorCallback, markForUpload, primaryKey) {
	sync.log.trace("Entering  kony.sync.massUpdate");
	var callbackResultTemp;
	var callbackResult = 0;
	var isError = false;
	var connection = kony.sync.getConnectionOnly(dbname, dbname, errorCallback);
	if(connection !== null){
		kony.sync.startTransaction(connection, transactioncallback, transactionSuccessCallback, transactionErrorCallback);
	}

	function transactionSuccessCallback() {
		sync.log.trace("Entering kony.sync.massUpdate-> transactionSuccessCallback");
		if(!isError){
			kony.sync.verifyAndCallClosure(successCallback, {rowsUpdated:callbackResult});
		}
	}

	function transactioncallback(tx) {
		sync.log.trace("Entering kony.sync.massUpdate-> transactioncallback");
		for(var i in inputArray){
			callbackResultTemp = kony.sync.updateBatch(tx, tbname, inputArray[i].changeSet, inputArray[i].whereClause, markForUpload, primaryKey);
			if(callbackResultTemp === false){
				isError = true;
				return;
			}
			callbackResult += callbackResultTemp.rowsupdated;
		}
	}

	function transactionErrorCallback() {
		if (!isError) {
			kony.sync.showTransactionError(errorCallback, "Sync Mass Update");
		}else{
			sync.log.error("Entering kony.sync.massUpdate->transactionErrorCallback :", kony.sync.errorObject);
			kony.sync.verifyAndCallClosure(errorCallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
};

/*This method will open a transaction and then executes the array of queries*/
kony.sync.executeQueries = function(queries, callback){
	sync.log.trace("Entering kony.sync.executeQueries");
	if(kony.sync.isNullOrUndefined(queries)){
		kony.sync.verifyAndCallClosure(callback, true);
		return;
	}
	var dbname = kony.sync.scopes[0][kony.sync.scopeDataSource];
	var connection = kony.sync.getConnectionOnly(dbname, dbname);
	var isError = false;
	if(connection !== null){
		kony.sync.startTransaction(connection, transactioncallback, transactionSuccessCallback, transactionErrorCallback);
	}

	function transactioncallback(tx){
		for(var i=0; i<queries.length; i++){
			if(kony.sync.executeSql(tx, queries[i], null)===false){
				isError = true;
				return;
			}
		}
	}

	function transactionSuccessCallback(){
		kony.sync.verifyAndCallClosure(callback, false);
	}

	function transactionErrorCallback(){
		kony.sync.verifyAndCallClosure(callback, true, kony.sync.getTransactionError(isError));
	}
};

/*This method will execute the array of queries provided the transaction is already open*/
kony.sync.executeQueriesInTransaction = function(tx, queries){
	sync.log.trace("Entering kony.sync.executeQueriesInTransaction");
	if(kony.sync.isNullOrUndefined(queries)){
		return true;
	}

	for(var i=0; i<queries.length; i++){
		if(kony.sync.executeSql(tx, queries[i], null)===false){
			return false;
		}
	}

	return true;
};

//this API is for developers who want to execute custom sql SELECT queries
sync.executeSelectQuery = function (query, successcallback, errorcallback) {
	sync.log.trace("Entering sync.executeSelectQuery -> main function");
	var dbname = kony.sync.scopes[0][kony.sync.scopeDataSource];
	var connection = kony.sync.getConnectionOnly(dbname, dbname);
	var resultItems = [];
	var isError = false;

	if (connection !== null) {
		kony.sync.startTransaction(connection, executeSelectQueryTransactionCallback, executeSelectQuerySuccessCallback, executeSelectQueryErrorCallback);
	}

	function executeSelectQueryTransactionCallback(tx) {
		sync.log.trace("Entering sync.executeSelectQuery -> transaction callback");
		var resultSet = kony.sync.executeSql(tx, query, null);
		if (resultSet === false) {
			isError = true;
			return;
		}
		for (var i = 0; i < resultSet.rows.length; i++) {
			resultItems[i] = kony.db.sqlResultsetRowItem(tx, resultSet, i);
		}
	}

	function executeSelectQuerySuccessCallback() {
		sync.log.trace("Entering sync.executeSelectQuery -> success callback");
		kony.sync.verifyAndCallClosure(successcallback, resultItems);
	}

	function executeSelectQueryErrorCallback() {
		sync.log.trace("Entering sync.executeSelectQuery -> error callback");
		kony.sync.callTransactionError(isError, errorcallback);
	}
};
//  **************** End konySyncQueryProvider.js*******************
//  **************** End konySyncQueryProvider.js*******************


//  **************** Start KonySyncReset.js*******************
if (typeof(kony.sync) === "undefined") {
	kony.sync = {};
}
if(typeof(sync) === "undefined") {
	sync = {};
}

kony.sync.scopeReset = function (scopename, successcallback, failurecallback) {
	sync.log.trace("Entering kony.sync.scopeReset->main function");
	var currentScope = kony.sync.scopes[scopename];

	var dbname = kony.sync.getDBName();
	var isStatementError = false;
	var exceptionMessage = null;

	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, failurecallback);
	if(dbconnection!==null){
		kony.sync.startTransaction(dbconnection, ScopeResetTransaction, ScopeResetSuccess, ScopeResetFailure);
	}

	function ScopeResetTransaction(tx) {
		sync.log.trace("Entering kony.sync.scopeReset->transaction function");
		try{
			if(!kony.sync.isNullOrUndefined(currentScope.ScopeTables)){
				for (var i = 0; i < currentScope.ScopeTables.length; i++) {
					var syncTable = currentScope.ScopeTables[i];
					var tbname = syncTable.Name;
					if (!kony.sync.deleteTable(tx, tbname)) {
						isStatementError = true;
						break;
					}
				}
			}
		}
		catch(e){
			exceptionMessage = e;
			throw("");
		}
		
		if (!kony.sync.resetMetaTableForScope(tx, scopename)) {
			isStatementError = true;
		}

	}

	function ScopeResetSuccess() {
		sync.log.trace("Entering kony.sync.scopeReset->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, "Scope Reset Successful");
	}

	function ScopeResetFailure() {
		sync.log.error("Entering kony.sync.scopeReset->failure callback function");
		if (isStatementError) {
			kony.sync.verifyAndCallClosure(failurecallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		} else {
			if(exceptionMessage !== null){
				kony.sync.verifyAndCallClosure(failurecallback, kony.sync.getErrorTable(kony.sync.errorUnknown, kony.sync.getErrorMessage(kony.sync.errorUnknown,"Scope Reset",exceptionMessage),null));
			}
			else{
				kony.sync.showTransactionError(failurecallback, "Scope Reset");
			}
			
		}
	}
};

kony.sync.deleteTable = function (tx, tbname) {
	sync.log.trace("Entering kony.sync.deleteTable function");
	if (kony.sync.deleteTableHelper(tx, tbname + kony.sync.historyTableName) === false) {
		return false;
	}
	if (kony.sync.deleteTableHelper(tx, tbname + kony.sync.originalTableName) === false) {
		return false;
	}

	if (kony.sync.deleteTableHelper(tx, tbname) === false) {
		return false;
	}

	return true;
};

kony.sync.deleteTableHelper = function (tx, tbname) {
	sync.log.trace("Entering kony.sync.deleteTableHelper function");
	var query = kony.sync.qb_createQuery();
	kony.sync.qb_delete(query, tbname);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	return kony.sync.executeSql(tx, sql, params);
};

kony.sync.resetMetaTableForScope = function (tx, scopeName) {
	sync.log.trace("Entering kony.sync.resetMetaTableForScope function");
	var query = kony.sync.qb_createQuery();
	var wcs = [];
	kony.sync.qb_set(query, {
		versionnumber : 0,
		lastserversynccontext : "",
		replaysequencenumber : 0,
		lastgeneratedid : -1
	});

	kony.table.insert(wcs, {
		key : kony.sync.metaTableScopeColumn,
		value : scopeName,
		optype : "EQ"
	});

	kony.sync.qb_where(query, wcs);
	kony.sync.qb_update(query, kony.sync.metaTableName);
	//local sql = "insert into "..kony.sync.metaTableName.." (id,scopename,versionnumber,lastserversynccontext,replaysequencenumber,lastgeneratedid) values ('"..id.."','"..scope.ScopeName.."','0','','0','-1')"
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	return kony.sync.executeSql(tx, sql, params);
};
//  **************** End KonySyncReset.js*******************


//  **************** Start KonySyncRetryHelper.js*******************
if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}
if(typeof(sync)=== "undefined"){
	sync = {};
}

//Repetitively calls a service until number of attempts
kony.sync.retryServiceCall = function(url, result, infoObj, retryCount, callback, params){
	sync.log.trace("Entering kony.sync.retryServiceCall");
	sync.log.error("Error while hitting " + url + " : ", result);
	sync.log.info("Retrying[" + retryCount + " retries left] ....");
	if(kony.sync.isSyncStopped){
		kony.sync.stopSyncSession();
		return;
	}
	var params1 = kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onRetry], {"request":params, "errorResponse":result, "retryCount":(kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey]-retryCount)});
	if(!kony.sync.isNull(params1)){
		params = params1;
	}
	var retryWait = 1; //default retry time is 1 second
	if (!kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.retryWaitKey])) {
		retryWait = kony.sync.tonumber(kony.sync.currentSyncConfigParams[kony.sync.retryWaitKey]);
	}
	if(!kony.sync.isAppInBackground){ 
		kony.timer.schedule("syncRetryTimer", retryTimerCallback, retryWait, false);
	}else{
		retryTimerCallback();
	}
	
	function downloadNetworkCallbackStatus(status, callResult, info){
		if(status === 400){
			sync.log.trace("Entering kony.sync.retryServiceCall->downloadNetworkCallbackStatus");
			if(retryCount > 0 && kony.sync.checkForRetryErrorCodes(callResult.opstatus)){
				retryCount--;
				kony.sync.retryServiceCall(url, callResult, info, retryCount, callback, params);
			}
			else{
				callback(callResult, info, retryCount);
			}
		}else if(status === 300){
				callback(kony.sync.getNetworkCancelError(),info,retryCount);
		}
	}
	
	function retryTimerCallback() {
		sync.log.trace("Entering kony.sync.retryServiceCall->retryTimerCallback");
		kony.sync.invokeServiceAsync(url, params, downloadNetworkCallbackStatus, infoObj);
	}
};

//Checks whether an error code is eligible for retry or not
kony.sync.checkForRetryErrorCodes = function(key){
	sync.log.trace("Entering kony.sync.checkForRetryErrorCodes");
	//#ifdef KONYSYNC_IOS
			var deviceInfo = kony.os.deviceInfo();
			if(deviceInfo.osversion < 7){
				if(!kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.retryErrorCodes])){
					return kony.sync.contains(kony.sync.currentSyncConfigParams[kony.sync.retryErrorCodes], key);
				}
				else{
					return kony.sync.contains([1000, 1013, 1014, 1015], key);
				}
			}else{
				return key === 1012;
			}
	//#else
	if(!kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.retryErrorCodes])){
		return kony.sync.contains(kony.sync.currentSyncConfigParams[kony.sync.retryErrorCodes], key);
	}
	else{
		return kony.sync.contains([1000, 1013, 1014, 1015], key);
	}
	//#endif
};

kony.sync.eligibleForRetry = function(opstatus, info){
	sync.log.trace("Entering kony.sync.eligibleForRetry");
	return !kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey]) &&
			info > 0 && kony.sync.checkForRetryErrorCodes(opstatus);			
};
//  **************** End KonySyncRetryHelper.js*******************


//  **************** Start KonySyncRollBack.js*******************
if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}
if(typeof(sync) === "undefined") {
	sync = {};
}

kony.sync.konySyncRollBackPendingChanges = function(tbname, dbname, wcs, successcallback, errorcallback, isGlobal, count) {
	sync.log.trace("Entering kony.sync.konySyncRollBackPendingChanges-> main function");
	var isSuccess = true;
	var totalRows = 0;
	var pkNotFound = false;
	var isStatementError = false;
    function single_execute_sql_transaction(tx) {
		sync.log.trace("Entering kony.sync.konySyncRollBackPendingChanges->single_execute_sql_transaction ");
        if (isGlobal === true) {
			totalRows = kony.sync.konySyncRollBackGlobal(tx, errorcallback);
			isSuccess = totalRows===false?false:true;
        } else if (!kony.sync.isNullOrUndefined(wcs)) {
            totalRows = kony.sync.konySyncRollBackRow(tx, tbname, wcs, errorcallback);
			if(totalRows===null){
				pkNotFound = true;
				isSuccess = false;
			}
			else if(totalRows===false){
				isStatementError = true;
				isSuccess = false;
			}
			else{
				isSuccess = true; 
				totalRows = 1;
			}
        } else {        
            totalRows = kony.sync.konySyncRollBackTable(tx, tbname, errorcallback);
			isSuccess = totalRows===false?false:true;
        }
    }

	function single_transactionErrorCallback(){
		sync.log.error("Entering kony.sync.konySyncRollBackPendingChanges->single_transactionErrorCallback ");
		if(isSuccess){
			kony.sync.showTransactionError(errorcallback);
		}else{
			sync.log.error("Entering kony.sync.konySyncRollBackPendingChanges->single_transactionErrorCallback : ", kony.sync.errorObject);
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
    function single_execute_sql_transactionSucessCallback() {
		sync.log.trace("Entering kony.sync.konySyncRollBackPendingChanges->single_execute_sql_transactionSucessCallback ");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(errorcallback);
			return;
		}
		
        if (isGlobal === true) {
			if(kony.sync.isNull(count)){
				count = 0;
			}
			count+=totalRows;
            if (kony.sync.rollbackCurrentScope.Index === kony.sync.scopes.scopecount - 1) {
               kony.sync.verifyAndCallClosure(successcallback,{rowsrolledback:count});
            } else {
                kony.sync.rollbackCurrentScope = kony.sync.scopes[kony.sync.rollbackCurrentScope.Index + 1];
                kony.sync.konySyncRollBackPendingChanges(null, null, null, successcallback, errorcallback, true, count);
            }
        } else {
				kony.sync.verifyAndCallClosure(successcallback,{rowsrolledback:totalRows});
		}
	}
    try{
		if (isGlobal === true) {
			if (kony.sync.isNullOrUndefined(kony.sync.rollbackCurrentScope)) {
				kony.sync.rollbackCurrentScope = kony.sync.scopes[0];				
				sync.log.info("RollBacking Global with Scope name : " + kony.sync.rollbackCurrentScope[kony.sync.scopeName] + " and with DBName : " + kony.sync.rollbackCurrentScope[kony.sync.scopeDataSource]);
			}
			dbname = kony.sync.rollbackCurrentScope[kony.sync.scopeDataSource];
		}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection !== null){
			kony.sync.startTransaction(dbconnection, single_execute_sql_transaction, single_execute_sql_transactionSucessCallback, single_transactionErrorCallback, "Single Execute");
		}
	}
	catch(e) {
		sync.log.error("Unknown error occurred during rollback", e);
		kony.sync.verifyAndCallClosure(errorcallback,kony.sync.getErrorTable(kony.sync.errorUnknown, kony.sync.getErrorMessage(kony.sync.errorUnknown,"Rollback",e),null));
	}
};

kony.sync.konySyncRollBackTable = function(tx, tbname, errorcallback) {
	sync.log.trace("Entering kony.sync.konySyncRollBackTable");
    var query = kony.sync.qb_createQuery();
    kony.sync.qb_select(query, null);
    kony.sync.qb_from(query, tbname + kony.sync.originalTableName);
    var query_compile = kony.sync.qb_compile(query);
    var sql = query_compile[0];
    var params = query_compile[1];
    var resultset = kony.sync.executeSql(tx, sql, params, errorcallback);
	if(resultset === false){
		return false;
	}
    var num_records = resultset.rows.length;
    sync.log.debug("Number of records to rollback in " + tbname + "=" + num_records);
    for (var i = 0; i <= num_records - 1; i++) {
        var record = kony.db.sqlResultsetRowItem(tx, resultset, i);
		var tableinfo = kony.sync.getTableInfo(tbname);
        var wcs = [];
		if(!kony.sync.isNullOrUndefined(tableinfo.Pk_Columns)){
			for (var j = 0; j < tableinfo.Pk_Columns.length; j++) {
				var pk = tableinfo.Pk_Columns[j];
				var wc = [];
				wc.key = pk;
				wc.value = record[pk];
				kony.table.insert(wcs, wc);
			}
		}
        sync.log.debug("Rollbacking Record with Primary Key :", wcs);
        if(!kony.sync.konysyncRollBackOriginal(tx, tbname, record, wcs, errorcallback)){
			return false;
		}
    }
	return num_records;
};

kony.sync.konySyncRollBackGlobal = function(tx) {
	sync.log.trace("Entering kony.sync.konySyncRollBackGlobal");
	var noOfScopes = kony.sync.scopes.length;
	for(var i=0; i<noOfScopes; i++) {
		var scope = kony.sync.scopes[i];
		var totalRows = 0;
		if(!kony.sync.isNullOrUndefined(scope.ScopeTables)){
			for (var j = 0; j < scope.ScopeTables.length; j++) {
				var syncTable = scope.ScopeTables[j];
				sync.log.debug("Rollbacking Table :" + syncTable.Name);
				var rows = kony.sync.konySyncRollBackTable(tx, syncTable.Name);
				if(rows===false){
					return false;
				}
				else{
					totalRows += rows;
				}
			}
		}
	}
	return totalRows;
};

kony.sync.konySyncRollBackRow = function(tx, tbname, wcs, errorcallback) {
	sync.log.trace("Entering kony.sync.konySyncRollBackRow");
    var record = kony.sync.getOriginalRow(tx, tbname + kony.sync.originalTableName, wcs, errorcallback);
     if (null !== record && false !== record) {
         return kony.sync.konysyncRollBackOriginal(tx, tbname, record, wcs);
    }else{
		return record;
	}
};

kony.sync.konysyncRollBackOriginal = function(tx, tbname, values, wcs, errorcallback) {
	sync.log.trace("Entering kony.sync.konysyncRollBackOriginal");
    var originalchangetype = values[kony.sync.originalTableChangeTypeColumn] + "";
    if (kony.sync.isrowexists(tx, tbname, wcs)) {
        if ((originalchangetype === kony.sync.insertColStatus)||(originalchangetype === kony.sync.insertColStatusDI)) {
            //Delete inserted Row.
            if(!kony.sync.removeEx(tx, tbname, wcs, null, errorcallback)){
				return false;
			}
        } else if ((originalchangetype === kony.sync.updateColStatus)||(originalchangetype === kony.sync.updateColStatusDU)) {
            //Revert to original values.
            values[kony.sync.mainTableChangeTypeColumn] = "-1";
            values[kony.sync.mainTableSyncVersionColumn] = values[kony.sync.originalTableSyncVersionColumn];
            values[kony.sync.originalTableChangeTypeColumn] = null;
            values[kony.sync.originalTableSyncVersionColumn] = null;
            if(!kony.sync.updateEx(tx, tbname, values, wcs, errorcallback)){
				return false;
			}
        } else if ((originalchangetype === kony.sync.deleteColStatus)||(originalchangetype === kony.sync.deleteColStatusDD)) {
            //delete the row which has been inserted/updated with old values.
            if(!kony.sync.removeEx(tx, tbname, wcs, null, errorcallback)){
				return false;
			}
            //Insert the row which has been deleted with old values.
            values[kony.sync.mainTableChangeTypeColumn] = "-1";
            values[kony.sync.mainTableSyncVersionColumn] = values[kony.sync.originalTableSyncVersionColumn];
            values[kony.sync.mainTableHashSumColumn] = values[kony.sync.originalTableHashSumColumn];
			values[kony.sync.originalTableChangeTypeColumn] = null;
            values[kony.sync.originalTableSyncVersionColumn] = null;
            if(!kony.sync.insertEx(tx, tbname, values, wcs, errorcallback)){
				return false;
			}
        }
    } else {
        /*if ((originalchangetype === kony.sync.insertColStatus)) {
            //Need not handle this case. Because inserted record has been deleted. So, it is already rollbacked.
        } else*/
		if((originalchangetype === kony.sync.updateColStatus)||(originalchangetype === kony.sync.updateColStatusDU)) {
            //Insert the row which has been updated and deleted with old values.
            values[kony.sync.mainTableChangeTypeColumn] = "-1";
            values[kony.sync.mainTableSyncVersionColumn] = values[kony.sync.originalTableSyncVersionColumn];
            values[kony.sync.originalTableChangeTypeColumn] = null;
            values[kony.sync.originalTableSyncVersionColumn] = null;
            //kony.sync.insertEx(tx, tbname, values);
			if(!kony.sync.insertEx(tx, tbname, values, null, errorcallback)){
				return false;
			}
        } else if ((originalchangetype === kony.sync.deleteColStatus)||(originalchangetype === kony.sync.deleteColStatusDD)) {
            //Insert the row which has been deleted with old values.
            values[kony.sync.mainTableChangeTypeColumn] = "-1";
            values[kony.sync.mainTableSyncVersionColumn] = values[kony.sync.originalTableSyncVersionColumn];
            values[kony.sync.originalTableChangeTypeColumn] = null;
            values[kony.sync.originalTableSyncVersionColumn] = null;
			if(!kony.sync.insertEx(tx, tbname, values, null, errorcallback)){
				return false;
			}
        }
    }
    if(!kony.sync.konySyncRollBackDeleteRow(tx, tbname, wcs,errorcallback)){
		return false;
	}
	return true;
};

kony.sync.konySyncRollBackDeleteRow = function(tx, tbname, wcs,errorcallback) {
	sync.log.trace("Entering kony.sync.konySyncRollBackDeleteRow");
    sync.log.debug("Deleting States in Original Tables with Primary Key : ", wcs);
    if(kony.sync.removeEx(tx, tbname + kony.sync.originalTableName, wcs, errorcallback)===false){
		return false;
	}
    if(kony.sync.removeEx(tx, tbname + kony.sync.historyTableName, wcs, errorcallback)===false){
		return false;
	}
	return true;
};
//  **************** End KonySyncRollBack.js*******************


//  **************** Start KonySyncSchemaUpgrade.js*******************
/* This methods calls upgrade schema service and executes the scripts" */
kony.sync.upgradeSchema = function (callback) {
	sync.log.trace("Entering kony.sync.upgradeSchema ");
	sync.log.info("Calling upgradeSchema service...");

	var contextParams = {};
	contextParams.oldApplicationVersion = kony.sync.configVersion;
	contextParams.newApplicationVersion = konysyncClientSyncConfig.Version;
	var schemaUpgrade = kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUpgradeRequiredKey], contextParams);
	if(schemaUpgrade === kony.sync.onUpgradeActionUploadUpgrade){
		kony.sync.omitDownload = true;
		kony.sync.forceUploadUpgrade = true;
		kony.sync.currentScope = null;
		kony.sync.schemaUpgradeErrorObject = upgradeRequiredCallback;
		kony.sync.syncStartSession();
	}else{ //(schemaUpgrade === kony.sync.onUpgradeActionUpgrade) //default policy
		upgradeRequiredCallback();
	} 
	
	function upgradeRequiredCallback(){
		kony.sync.callSchemaUpgradeService(schemaUpgradeCallback);
	}
	
	function schemaUpgradeCallback(serverResponse) {
		if (!kony.sync.isNullOrUndefined(serverResponse.opstatus) && serverResponse.opstatus !== 0) {
			sync.log.error("Schema Upgrade Response : ", serverResponse);
			if (!kony.sync.isNullOrUndefined(serverResponse.d)) {
				kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUpgradeQueriesDownloadErrorKey], kony.sync.getServerError(
						serverResponse.d));
				kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError], kony.sync.getServerError(
						serverResponse.d));
			} else {
				kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUpgradeQueriesDownloadErrorKey], kony.sync.getServerError(serverResponse));
				kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError], kony.sync.getServerError(serverResponse));
			}
			kony.sync.isSessionInProgress = false;
			return;
		}
		else if(kony.sync.isNullOrUndefined(serverResponse.d)){
			kony.sync.isSessionInProgress = false;
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUpgradeQueriesDownloadErrorKey], kony.sync.getServerError(serverResponse));
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError], kony.sync.getServerError(serverResponse));
			return;
		}
		if (serverResponse.d.error === "true") {
			sync.log.error("Schema Upgrade Response : ", serverResponse);
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUpgradeQueriesDownloadErrorKey], kony.sync.getServerError(
					serverResponse.d));
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError], kony.sync.getServerError(
					serverResponse.d));

			kony.sync.isSessionInProgress = false;
			return;
		}
		
		kony.sync.addServerDetails(kony.sync.currentSyncReturnParams, serverResponse);
		if(serverResponse.d.upgradeavailable === "false"){
			callback(false);
			return;
		}

		//fetch alter scripts
		var queries = [];
		if(!kony.sync.isNullOrUndefined(serverResponse.d.script)){
			for (var i = 0; i < serverResponse.d.script.length; i++) {
				queries.push(serverResponse.d.script[i].sql);
			}
			kony.sync.schemaUpgradeContext = serverResponse.d.upgradecontext;
		}
		
		kony.sync.currentSyncReturnParams.upgradeScripts = queries;
		kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUpgradeQueriesDownloadSuccessKey], kony.sync.currentSyncReturnParams);
		delete kony.sync.currentSyncReturnParams.upgradeScripts;
		
		var myQueries = null;
		myQueries = kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUpgradeQueriesExecutionStartKey], {
				upgradeScripts : queries
			});
		if (!kony.sync.isNullOrUndefined(myQueries)) {
			queries = myQueries;
		}
		kony.sync.executeUpdateSchemaQueries(queries, kony.sync.schemaUpgradeContext, executeQueriesCallback, serverResponse.d.newapplicationversion);
	}

	function executeQueriesCallback(isError, errorInfo) {
		if (isError) {
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUpgradeQueriesExecutionErrorKey], errorInfo);
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError], errorInfo);
		} else {
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUpgradeQueriesExecutionSuccessKey]);
			kony.sync.schemaUpgradeNeeded = false; //do not call schema upgrade service again
			kony.sync.omitUpload = true; //only download
			kony.sync.schemaUpgradeDownloadPending = true;
			kony.sync.resetsyncsessionglobals();
			callback(true);
		}

	}
};

/*This method will be called in case of server notifies schema upgrade*/
kony.sync.onSchemaUpgradeErrorFromServer = function (msg) {
/*	var contextParams = {};
	contextParams.oldVersion = msg.oldApplicationVersion;
	contextParams.newVersion = msg.newApplicationVersion;
	contextParams.isMandatory = msg.mandatoryupgrade;*/
	var schemaUpgrade = kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUpgradeRequiredKey], msg);
	
	if(schemaUpgrade === kony.sync.onUpgradeActionUploadAbort){
		//Upload and then Abort Sync Process
		kony.sync.omitDownload = true;
		kony.sync.forceUpload = true;
		kony.sync.resetsyncsessionglobals();
		kony.sync.schemaUpgradeErrorObject = msg;
		kony.sync.syncStartSession();
	}else{ //(schemaUpgrade === kony.sync.onUpgradeActionAbort) --default policy
		//Abort Sync Process
		kony.sync.validateScopeSession(true, msg);
	} /*else if (schemaUpgrade === kony.sync.onUpgradeActionContinue) {
		//Upgrade first and then continue with normal Sync Process
		//kony.sync.upgradeSchema(kony.sync.syncStartSession);
	} else if (schemaUpgrade === kony.sync.onUpgradeActionContinueOnlyUpload) {
		//Upload first, then upgrade and then continue with normal Sync Process
		kony.sync.omitDownload = true;
		kony.sync.schemaUpgradeNeeded = true;
		kony.sync.validateScopeSession();
	}*/
};

/*This method will execute upgrade scripts, syncconfig table with upgradecontext
and metainfo table with 0,0"*/
kony.sync.executeUpdateSchemaQueries = function (queries, upgradeContext, callback, appVersion) {
	sync.log.trace("Entering kony.sync.executeUpdateSchemaQueries");
	if (kony.sync.isNullOrUndefined(queries)) {
		kony.sync.verifyAndCallClosure(callback, true);
		return;
	}
	var dbname = kony.sync.scopes[0][kony.sync.scopeDataSource];
	var connection = kony.sync.getConnectionOnly(dbname, dbname);
	var isError = false;
	if (connection !== null) {
		kony.sync.startTransaction(connection, transactioncallback, transactionSuccessCallback, transactionErrorCallback);
	}

	function transactioncallback(tx) {
		/*Execute alter scripts*/
		if (kony.sync.executeQueriesInTransaction(tx, queries) === false) {
			isError = true;
			return;
		}

		/*update syncconfig table with upgradecontext*/
		var sql = "update " + kony.sync.syncConfigurationTableName + " set " +
			kony.sync.syncConfigurationColumnSchemaUpgradeContext + " = '" + upgradeContext + "'";
		if (kony.sync.executeSql(tx, sql, null) === false) {
			isError = true;
			return;
		}

		/*upgrade schemaupgradesynccontext in metatable to "0,0" to indicate that download for new columns is pending*/
		sql = "update " + kony.sync.metaTableName + " set " + kony.sync.metaTableSchemaUpgradeSyncTimeColumn + " = '0,0' where " + kony.sync.metaTableSyncTimeColumn + " <> '' and " + kony.sync.metaTableSyncTimeColumn + " is not null" ;
		if (kony.sync.executeSql(tx, sql, null) === false) {
			isError = true;
			return;
		}
	}

	function transactionSuccessCallback() {
		kony.sync.configVersion = appVersion;
		kony.sync.currentSyncConfigParams.appVersion = kony.sync.configVersion;
		callback(false);
	}

	function transactionErrorCallback() {
		callback(true, kony.sync.getTransactionError(isError));
	}
};

/*This function marks download of data after schema upgrade complete for that particular scope*/
kony.sync.setSchemaUpgradeDownloadComplete = function (tx, scopename) {
	if (kony.sync.schemaUpgradeDownloadPending) {
		var sql = "update " + kony.sync.metaTableName + " set " + kony.sync.metaTableSchemaUpgradeSyncTimeColumn + " = '' where " + kony.sync.metaTableScopeColumn + " = '" + scopename + "'";
		if (kony.sync.executeSql(tx, sql, null) === false) {
			return false;
		}
	}
	return true;
};

/*This method checks if download for schema upgrade is pending for any of the scopes*/
kony.sync.isDownloadPendingForSchemaUpgrade = function (callback) {
	sync.log.trace("Entering kony.sync.isDownloadPendingForSchemaUpgrade");
	var dbname = kony.sync.scopes[0][kony.sync.scopeDataSource];
	var connection = kony.sync.getConnectionOnly(dbname, dbname);
	var isError = false;
	var pendingDownload = false;
	if (connection !== null) {
		kony.sync.startTransaction(connection, transactioncallback, transactionSuccessCallback, transactionErrorCallback);
	}

	function transactioncallback(tx) {
		var sql = "select count(*) from " + kony.sync.metaTableName + " where " + kony.sync.metaTableSchemaUpgradeSyncTimeColumn + " = '0,0'";
		var resultset = kony.sync.executeSql(tx, sql, null);
		if (resultset === false) {
			isError = true;
			return;
		}

		var rowCount = kony.db.sqlResultsetRowItem(tx, resultset, 0);
		if (rowCount["count(*)"] > 0) {
			pendingDownload = true;
		}

		sql = "select * from " + kony.sync.syncConfigurationTableName;
		resultset = kony.sync.executeSql(tx, sql, null);
		if (resultset === false) {
			isError = true;
			return;
		}
		var rowitem = kony.db.sqlResultsetRowItem(tx, resultset, 0);
		kony.sync.schemaUpgradeContext = rowitem[kony.sync.syncConfigurationColumnSchemaUpgradeContext];
		kony.sync.configVersion = rowitem[kony.sync.syncConfigurationColumnVersion];
	}

	function transactionSuccessCallback() {
		callback(false, null, pendingDownload);
	}

	function transactionErrorCallback() {
		kony.sync.verifyAndCallClosure(callback, true, kony.sync.getTransactionError(isError));
	}
};

sync.performUpgrade = function (config) {
	sync.log.trace("Entering kony.sync.performUpgrade");
	if (kony.sync.validateSyncConfigParams("performUpgrade", config) === false) {
		return;
	}
	kony.sync.verifyAndCallClosure(config[kony.sync.onPerformUpgradeStartKey]);
	config[kony.sync.onSyncError] = config[kony.sync.onPerformUpgradeErrorKey];
	config[kony.sync.onSyncSuccess] = config[kony.sync.onPerformUpgradeSuccessKey];

	if (kony.sync.preProcessSyncConfig("performUpgrade", config, config[kony.sync.onSyncError]) === false) {
		return;
	}
	kony.sync.isDownloadPendingForSchemaUpgrade(isDownloadPendingForSchemaUpgradeCallback);
	function isDownloadPendingForSchemaUpgradeCallback(isError, errorObject, pending) {
		if (isError) {
			kony.sync.isSessionInProgress = false; // closing the session
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onSyncError], errorObject);
		} else {
			kony.sync.performOnlySchemaUpgrade = true;
			if (pending) {
				kony.sync.omitUpload = true; //only download
				kony.sync.schemaUpgradeDownloadPending = true;
				kony.sync.syncStartSession(); //download pending for already done schema upgrade
			} else {
				kony.sync.upgradeSchema(upgradeSchemaCallback); //download the scripts and upgrade
			}
		}
	}
	
	function upgradeSchemaCallback(upgrade){
		if(upgrade){
			kony.sync.syncStartSession(); //download initial data for new columns
		}else{
			kony.sync.isSessionInProgress = false; // closing the session
			kony.sync.currentSyncReturnParams.upgradeRequired = false;
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onPerformUpgradeSuccessKey], kony.sync.currentSyncReturnParams);
			delete kony.sync.currentSyncReturnParams.upgradeRequired;
		}
	}
};

sync.isUpgradeRequired = function (config) {
	sync.log.trace("Entering kony.sync.isUpgradeRequired");
	if (kony.sync.validateSyncConfigParams("isUpgradeRequired", config) === false) {
		return;
	}
	if (kony.sync.preProcessSyncConfig("isUpgradeRequired", config, config[kony.sync.onIsUpgradeRequiredErrorKey], false) === false) {
		return;
	}
	kony.sync.areSyncConfigVersionDifferent(areSyncConfigVersionDifferentCallback);
	function areSyncConfigVersionDifferentCallback(isError, errorObject, isDifferent) {
		if (isError) {
			kony.sync.verifyAndCallClosure(config[kony.sync.onIsUpgradeRequiredErrorKey], errorObject);
		} else {
			if (isDifferent) {
				kony.sync.verifyAndCallClosure(config[kony.sync.onIsUpgradeRequiredSuccessKey], {
					upgradeRequired : true
				});
			} else {
				config[kony.sync.onUpgradeQueriesDownloadStartKey] = config[kony.sync.onIsUpgradeRequiredStartKey];
				kony.sync.callSchemaUpgradeService(schemaUpgradeCallback, false);
			}
		}
	}
	
	function schemaUpgradeCallback(serverResponse) {
		if (!kony.sync.isNullOrUndefined(serverResponse.opstatus) && serverResponse.opstatus !== 0) {
			sync.log.error("Schema Upgrade Response : ", serverResponse);
			if (!kony.sync.isNullOrUndefined(serverResponse.d)) {
				kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onIsUpgradeRequiredErrorKey], kony.sync.getServerError(
						serverResponse.d));
			} else {
				kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onIsUpgradeRequiredErrorKey], kony.sync.getServerError(serverResponse));
			}
			return;
		}
		else if(kony.sync.isNullOrUndefined(serverResponse.d)){
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onIsUpgradeRequiredErrorKey], kony.sync.getServerError(serverResponse));
			return;
		}
		if (serverResponse.d.error === "true") {
			sync.log.error("Schema Upgrade Response : ", serverResponse);
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onIsUpgradeRequiredErrorKey], kony.sync.getServerError(
					serverResponse.d));
			return;
		}
		var returnParams = {};
		kony.sync.addServerDetails(returnParams, serverResponse);
		returnParams.upgradeRequired = serverResponse.d.upgradeavailable === "true" ? true : false;
		kony.sync.verifyAndCallClosure(config[kony.sync.onIsUpgradeRequiredSuccessKey], returnParams);
	}

};

kony.sync.areSyncConfigVersionDifferent = function (callback) {
	var dbname = kony.sync.scopes[0][kony.sync.scopeDataSource];
	var connection = kony.sync.getConnectionOnly(dbname, dbname);
	var isError = false;
	var isDifferent = false;
	if (connection !== null) {
		kony.sync.startTransaction(connection, transactioncallback, transactionSuccessCallback, transactionErrorCallback);
	}

	function transactioncallback(tx) {
		var sql = "select * from " + kony.sync.syncConfigurationTableName;
		var resultset = kony.sync.executeSql(tx, sql, null);
		if (resultset === false) {
			isError = true;
			return;
		}
		var dbSyncConfigVersion = kony.db.sqlResultsetRowItem(tx, resultset, 0)[kony.sync.syncConfigurationColumnVersion];
		if (dbSyncConfigVersion !== konysyncClientSyncConfig.Version) {
			isDifferent = true;
		}
	}

	function transactionSuccessCallback() {
		callback(false, null, isDifferent);
	}

	function transactionErrorCallback() {
		callback(true, kony.sync.getTransactionError(isError));
	}
};

kony.sync.isSchemaUpgradeTimeStampEmpty = function(val){
	if(val==="" || val==="0,0" || kony.sync.isNullOrUndefined(val)){
		return true;
	}else{
		return false;
	}
};
//  **************** End KonySyncSchemaUpgrade.js*******************


//  **************** Start konySyncServiceProvider.js*******************
if (typeof(kony.sync) === "undefined") {
	kony.sync = {};
}
if (typeof(sync) === "undefined") {
	sync = {};
}

kony.sync.konyDownloadChanges = function(serverblob, scope, downloadNetworkCallback, isInitialized, schemaUpgradeServerblob) {
	sync.log.trace("Entering kony.sync.konyDownloadChanges ");
	if (kony.sync.isSyncStopped) {
		kony.sync.stopSyncSession();
		return;
	}
	var retries = kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey];

	function downloadNetworkCallbackStatus(status, result) {
		if (status === 400) {
			sync.log.trace("Entering kony.sync.konyDownloadChanges->downloadNetworkCallbackStatus");
			if (kony.sync.eligibleForRetry(result.opstatus, retries)) {
				retries--;
				kony.sync.retryServiceCall(kony.sync.getDownloadURL(), result, null, retries, checkForChunking, params);
			} else {
				if (kony.sync.eligibleForChunking(result)) {
					kony.sync.startChunking(kony.sync.getChunkDownloadURL(), params, result, downloadNetworkCallback);
				} else {
					kony.sync.setSessionID(result);
					downloadNetworkCallback(result);
				}
			}
		} else if (status === 300) {
			downloadNetworkCallback(kony.sync.getNetworkCancelError());
		}
	}

	function checkForChunking(result, info, retry) {
		sync.log.trace("Entering kony.sync.konyDownloadChanges->checkForChunking");
		retries = retry;
		downloadNetworkCallbackStatus(400, result, info);
	}

	if (kony.sync.isNullOrUndefined(serverblob)) {
		serverblob = "";
	}

	var params = {};

	//check for pending chunks
	kony.sync.checkForChunkingBeforeDownload(serverblob, normaldownloadCallback, downloadNetworkCallback, schemaUpgradeServerblob);

	function normaldownloadCallback(payloadId) {
		sync.log.trace("Entering kony.sync.konyDownloadChanges->normaldownloadCallback");
		var jsonContext = null;
		if (!kony.sync.isNullOrUndefined(kony.sync.currentSyncScopeFilter)) {
			var scopejsonfilter = {
				"d": {
					Filters: kony.sync.currentSyncScopeFilter
				}
			};
			jsonContext = JSON.stringify(scopejsonfilter);
		}
		if (isInitialized === false) {
			kony.sync.downloadClientContext.InitialSync = "true";
		} else {
			delete kony.sync.downloadClientContext.InitialSync;
		}
		params.clientcontext = kony.sync.downloadClientContext;
		kony.sync.commonServiceParams(params);
		params.context = jsonContext;
		params.enablebatching = "true";
		params.batchsize = kony.sync.getBatchSize();
		if (kony.sync.schemaUpgradeDownloadPending) {
			params.tickcount = schemaUpgradeServerblob;
			params.uppertickcount = serverblob;
			if (!kony.sync.isNullOrUndefined(kony.sync.schemaUpgradeContext)) {
				params.upgradecontext = kony.sync.schemaUpgradeContext;
			}
		} else {
			params.tickcount = serverblob;
		}
		params.scopename = kony.sync.currentScope[kony.sync.scopeName];
		params.strategy = kony.sync.currentScope[kony.sync.syncStrategy];
		params.instanceid = kony.sync.getInstanceID();
		params.clientid = kony.sync.getDeviceID();
		params.appVersion = kony.sync.currentSyncConfigParams.appVersion;
		params[kony.sync.chunkSizeKey] = kony.sync.getChunkSize();

		//include payloadid if it is not null
		if (!kony.sync.isNull(payloadId)) {
			params.deletechunkpayloadid = payloadId;
		}

		if (!kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.networkTimeOutKey])) {
			params.httpconfig = {
				timeout: kony.sync.currentSyncConfigParams[kony.sync.networkTimeOutKey]
			};
		}

		if (!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks]) &&
			!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][kony.sync.currentScope[kony.sync.scopeName]])) {
			params[kony.sync.sessionTaskUploadErrorPolicy] = kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][kony.sync.currentScope[kony.sync.scopeName]][kony.sync.sessionTaskUploadErrorPolicy];
		}

		var paramsToSend = null;
		var currentSyncReturnParamsTemp = kony.sync.currentSyncReturnParams;
		currentSyncReturnParamsTemp.downloadRequest = params;
		kony.sync.deleteMapKey(currentSyncReturnParamsTemp, kony.sync.serverDetails);
		if (kony.sync.globalIsDownloadStarted) {
			paramsToSend = kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onDownloadStart], currentSyncReturnParamsTemp);
			kony.sync.globalIsDownloadStarted = false;
			if (!kony.sync.isNullOrUndefined(paramsToSend)) {
				params = paramsToSend;
				kony.sync.downloadClientContext = params.clientcontext;
			}
		}
		currentSyncReturnParamsTemp.downloadRequest = params;
		kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onBatchProcessingStart], kony.sync.currentSyncReturnParams);
		if (paramsToSend != null) {
			params = paramsToSend;
			kony.sync.downloadClientContext = params.clientcontext;
		}

		currentSyncReturnParamsTemp = null;
		paramsToSend = null;
		params.clientcontext = JSON.stringify(kony.sync.downloadClientContext);

		sync.log.info("Hitting the service with URL " + kony.sync.getDownloadURL(), params);
		kony.sync.invokeServiceAsync(kony.sync.getDownloadURL(), params, downloadNetworkCallbackStatus, null);
	}
};

kony.sync.konyUploadChanges = function(changes, uploadNetworkcallback, lastBatch, lastjson) {
	sync.log.trace("Entering kony.sync.konyUploadChanges");
	if (kony.sync.isSyncStopped) {
		kony.sync.stopSyncSession();
		return;
	}
	var results1 = [];
	var retries = kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey];
	var jsonLua = null;
	var json = null;

	function uploadNetworkCallbackStatus(status, result, info) {
		if (status === 400) {
			sync.log.trace("Entering kony.sync.konyUploadChanges->uploadNetworkCallbackStatus");
			if (kony.sync.eligibleForRetry(result.opstatus, retries)) {
				retries--;
				kony.sync.retryServiceCall(kony.sync.getUploadURL(), result, info, retries, retryCallback, params);
			} else {
				kony.sync.setSessionID(result);
				uploadNetworkcallback(result, json);
				results1 = null;
				jsonLua = null;
			}
		} else if (status === 300) {
			uploadNetworkcallback(kony.sync.getNetworkCancelError(), json);
		}
	}

	function retryCallback(result, info, retry) {
		sync.log.trace("Entering kony.sync.konyUploadChanges->retryCallback");
		retries = retry;
		uploadNetworkCallbackStatus(400, result);
	}

	if (lastjson === null) {
		if (!kony.sync.isNullOrUndefined(changes.tables)) {
			for (var i = 0; i < changes.tables.length; i++) {
				var tableChange = changes.tables[i];
				var tableName = tableChange.tableName;
				if (!kony.sync.isNullOrUndefined(tableChange.changes)) {
					for (var j = 0; j < tableChange.changes.length; j++) {
						var rowChange = tableChange.changes[j];
						if (kony.sync.isNullOrUndefined(rowChange.syncConflict)) {
							rowChange.syncConflict = "";
						}
						var result = {
							metadata: {
								type: tableName,
								uri: changes.uri,
								changetype: rowChange.changeType,
								syncConflict: rowChange.syncConflict
							}
						};
						if (!kony.sync.isNullOrUndefined(rowChange.fields)) {
							var fcount = kony.sync.getArrayCount(rowChange.fields);
							for (var k = 0; k < fcount; k++) {
								if (rowChange.fields[k] !== "ServerId" && rowChange.fields[k] !== "UpdateId") {
									result[rowChange.fields[k]] = rowChange.values[k];
								}
							}
						}
						results1.push(result);
					}
				}
			}
		}
		var moreChangesAvailable = null;
		if (lastBatch === true) {
			moreChangesAvailable = false;
		} else {
			moreChangesAvailable = true;
		}
		jsonLua = {
			d: {
				results: results1,
				sync: "not implemented",
				scopeName: changes.scopeName,
				serverBlob: changes.serverblob,
				clientid: changes.clientid,
				SequenceNumber: changes.SequenceNumber,
				moreChangesAvailable: moreChangesAvailable
			}
		};
		json = JSON.stringify(jsonLua);
	} else {
		json = lastjson;
	}

	var params = {};
	kony.sync.commonServiceParams(params);
	params.UploadRequest = json;
	params.scopename = kony.sync.currentScope[kony.sync.scopeName];
	params.strategy = kony.sync.currentScope[kony.sync.syncStrategy];
	params.instanceid = kony.sync.getInstanceID();
	params.clientid = kony.sync.getDeviceID();
	params.appVersion = kony.sync.currentSyncConfigParams.appVersion;
	if (kony.sync.forceUpload || kony.sync.forceUploadUpgrade) {
		params.usehistoryconfig = "true";
	}
	if (!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks]) &&
		!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][kony.sync.currentScope[kony.sync.scopeName]])) {
		params[kony.sync.sessionTaskUploadErrorPolicy] = kony.sync.currentSyncConfigParams[kony.sync.sessionTasks][kony.sync.currentScope[kony.sync.scopeName]][kony.sync.sessionTaskUploadErrorPolicy];
	}

	if (!kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.networkTimeOutKey])) {
		params.httpconfig = {
			timeout: kony.sync.currentSyncConfigParams[kony.sync.networkTimeOutKey]
		};
	}

	params.clientcontext = kony.sync.uploadClientContext;
	var paramsToSend = null;
	var currentSyncReturnParamsTemp = kony.sync.currentSyncReturnParams;
	currentSyncReturnParamsTemp.uploadRequest = params;
	kony.sync.deleteMapKey(currentSyncReturnParamsTemp, kony.sync.serverDetails);
	if (kony.sync.isUploadStarted) {
		paramsToSend = kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUploadStart], currentSyncReturnParamsTemp);
		if (paramsToSend != null) {
			params = paramsToSend;
			kony.sync.uploadClientContext = params.clientcontext;
		}
		kony.sync.isUploadStarted = false;
	}

	currentSyncReturnParamsTemp.uploadRequest = params;
	paramsToSend = kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUploadBatchStart], currentSyncReturnParamsTemp);
	if (!kony.sync.isNullOrUndefined(paramsToSend)) {
		params = paramsToSend;
		kony.sync.uploadClientContext = params.clientcontext;
	}
	params.clientcontext = JSON.stringify(kony.sync.uploadClientContext);
	currentSyncReturnParamsTemp = null;
	paramsToSend = null;

	sync.log.info("Hitting the service with URL : " + kony.sync.getUploadURL(), params);
	kony.sync.invokeServiceAsync(kony.sync.getUploadURL(), params, uploadNetworkCallbackStatus, null);
};

kony.sync.konyRegisterDevice = function(registerDeviceCallback) {
	sync.log.trace("Entering kony.sync.konyRegisterDevice");
	if (kony.sync.isSyncStopped) {
		kony.sync.stopSyncSession();
		return;
	}
	var retries = kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey];

	function registerDeviceCallbackStatus(status, result) {
		if (status === 400) {
			sync.log.trace("Entering kony.sync.konyRegisterDevice->registerDeviceCallbackStatus");
			if (kony.sync.eligibleForRetry(result.opstatus, retries)) {
				retries--;
				kony.sync.retryServiceCall(kony.sync.getRegisterDeviceURL(), result, null, retries, retryCallback, params);
			} else {
				kony.sync.setSessionID(result);
				registerDeviceCallback(result);
			}
		} else if (status === 300) {
			registerDeviceCallback(kony.sync.getNetworkCancelError());
		}
	}

	function retryCallback(result, info, retry) {
		sync.log.trace("Entering kony.sync.konyRegisterDevice->retryCallback");
		retries = retry;
		registerDeviceCallbackStatus(400, result, info);
	}
	var params = {};
	kony.sync.commonServiceParams(params);
	params.os = kony.os.deviceInfo().name;
	params.model = kony.os.deviceInfo().model;
	params.version = kony.os.deviceInfo().version + "";
	params.deviceID = kony.sync.getDeviceID();
	params.userAgent = kony.os.userAgent();
	params.channel = kony.sync.getChannelName();
	params.platform = kony.sync.getPlatformName();
	if (!kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.networkTimeOutKey])) {
		params.httpconfig = {
			timeout: kony.sync.currentSyncConfigParams[kony.sync.networkTimeOutKey]
		};
	}

	sync.log.info("Hitting the service with URL :" + kony.sync.getRegisterDeviceURL(), params);

	kony.sync.invokeServiceAsync(kony.sync.getRegisterDeviceURL(), params, registerDeviceCallbackStatus, null);
};

kony.sync.callSchemaUpgradeService = function(schemaUpgradeCallback, scriptsRequired) {
	sync.log.trace("Entering kony.sync.callSchemaUpgradeService");
	if (kony.sync.isSyncStopped) {
		kony.sync.stopSyncSession();
		return;
	}
	var retries = kony.sync.currentSyncConfigParams[kony.sync.numberOfRetriesKey];

	function schemaUpgradeServiceStatus(status, result) {
		if (status === 400) {
			sync.log.trace("Entering kony.sync.callSchemaUpgradeService->schemaUpgradeServiceStatus");
			if (kony.sync.eligibleForRetry(result.opstatus, retries)) {
				retries--;
				kony.sync.retryServiceCall(kony.sync.getSchemaUpgradeURL(), result, null, retries, retryCallback, params);
			} else {
				kony.sync.setSessionID(result);
				schemaUpgradeCallback(result);
			}
		}
	}

	function retryCallback(result, info, retry) {
		sync.log.trace("Entering kony.sync.callSchemaUpgradeService->retryCallback");
		retries = retry;
		schemaUpgradeServiceStatus(400, result, info);
	}
	var params = {};
	kony.sync.commonServiceParams(params);
	params.clientid = kony.sync.getDeviceID();
	params.appversion = konysyncClientSyncConfig.Version;
	params.dbversion = kony.sync.configVersion;
	params.scriptsrequired = (scriptsRequired === false) ? "false" : "true";
	var paramsToSend = null;
	paramsToSend = kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUpgradeQueriesDownloadStartKey], params);
	if (!kony.sync.isNullOrUndefined(paramsToSend)) {
		params = paramsToSend;
	}

	if (!kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.networkTimeOutKey])) {
		params.httpconfig = {
			timeout: kony.sync.currentSyncConfigParams[kony.sync.networkTimeOutKey]
		};
	}

	sync.log.info("Hitting the service with URL :" + kony.sync.getSchemaUpgradeURL(), params);

	kony.sync.invokeServiceAsync(kony.sync.getSchemaUpgradeURL(), params, schemaUpgradeServiceStatus, null);
};

kony.sync.getServerURL = function() {
	sync.log.trace("Entering kony.sync.getServerURL ");
	if (!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams.serverurl)) {
		return kony.sync.currentSyncConfigParams.serverurl;
	}
	var server = "";
	if (kony.sync.currentSyncConfigParams.issecure === true) {
		server = "https://" + kony.sync.currentSyncConfigParams.serverhost;
	} else {
		server = "http://" + kony.sync.currentSyncConfigParams.serverhost;
	}
	if (kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams.serverport)) {
		server = server + ":80";
	} else if (kony.sync.currentSyncConfigParams.serverport !== "") {
		server = server + ":" + kony.sync.currentSyncConfigParams.serverport;
	}
	if (!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.authTokenKey])) {
		return server + "/syncservice/api/v1/" + kony.sync.getAppId() + "/";
	} else {
		return server + "/syncservice/resources/";
	}
};

kony.sync.getUploadURL = function() {
	sync.log.trace("Entering kony.sync.getUploadURL ");
	var server = kony.sync.getServerURL();
	if (!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams.uploadwebcontext)) {
		return server + kony.sync.currentSyncConfigParams.uploadwebcontext;
	}
	return server + "upload";
};

kony.sync.getDownloadURL = function() {
	sync.log.trace("Entering kony.sync.getDownloadURL ");
	var server = kony.sync.getServerURL();
	if (!kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams.downloadwebcontext)) {
		return server + kony.sync.currentSyncConfigParams.downloadwebcontext;
	}
	return server + "download";
};

kony.sync.getRegisterDeviceURL = function() {
	sync.log.trace("Entering kony.sync.getRegisterDeviceURL ");
	var server = kony.sync.getServerURL();
	return server + "registerdevice";
};

kony.sync.getSchemaUpgradeURL = function() {
	sync.log.trace("Entering kony.sync.getSchemaUpgradeURL ");
	var server = kony.sync.getServerURL();
	return server + "upgrade";
};


kony.sync.httprequest = null;
kony.sync.httprequestsinglesession = false;
//IF user passes his own function instead of using kony.net.invokeServiceAsync
//this is how it would be called.
kony.sync.invokeServiceAsync = function(url, params, callback, context) {
	if (kony.sync.isMbaasEnabled) {
		kony.sdk.claimsRefresh(claimsRefreshSuccessCallBack, claimsRefreshFailureCallBack);

		function claimsRefreshSuccessCallBack() {
			if (params && params.httpheaders) {
				var currentClaimToken = kony.sdk.getCurrentInstance().currentClaimToken;
				if (kony.sync.currentSyncConfigParams[kony.sync.authTokenKey] != currentClaimToken) {
					kony.sync.currentSyncConfigParams[kony.sync.authTokenKey] = currentClaimToken;
				}
				params.httpheaders["X-Kony-Authorization"] = currentClaimToken;
				invokeServiceAsyncHelper(url, params, callback, context);
			}
		}

		function claimsRefreshFailureCallBack(res) {
			callback(400, res, context);
		}
	} else {
		invokeServiceAsyncHelper(url, params, callback, context);
	}

	function invokeServiceAsyncHelper(url, params, callback, context) {
			if (kony.sync.isNull(kony.sync.currentSyncConfigParams[kony.sync.invokeServiceFunctionKey])) {
				//#ifdef KONYSYNC_IOS
				var deviceInfo = kony.os.deviceInfo();
				var timeoutValue = 0;
				var paramsHttpheaders = null;
				if (kony.sync.isPhonegap || deviceInfo.osversion < 7) {
					kony.net.invokeServiceAsync(url, params, callback, context);
				} else {
					var paramsTable = new kony.net.FormData();
					for (var key in params) {
						if (!kony.sync.isNull(params[key])) {
							if (key === "httpheaders") {
								paramsHttpheaders = params[key];
								continue;
							}
							if (key === "httpconfig") {
								timeoutValue = kony.sync.tonumber(params[key]["timeout"]);
								continue;
							}
							paramsTable.append((key), (params[key]));
						}
					}

					function createNewHttpRequest(sessionid, paramsHttpheaders, localRequestCallback, url, timeoutValue) {
						var httprequest = null;
						httprequest = (sessionid === null) ? new kony.net.HttpRequest() : new kony.net.HttpRequest(sessionid);
						httprequest.backgroundTransfer = true;
						httprequest.onReadyStateChange = localRequestCallback;
						httprequest.open(constants.HTTP_METHOD_POST, url);
						//
						if (timeoutValue !== 0) {
							httprequest.timeout = timeoutValue * 1000;
						}
						//
						if (paramsHttpheaders !== null) {
							for (var key in paramsHttpheaders) {
								httprequest.setRequestHeader(key, paramsHttpheaders[key]);
							}
						}
						if (paramsHttpheaders === null || typeof(paramsHttpheaders["Content-Type"]) === 'undefined') {
							httprequest.setRequestHeader("Content-Type", "application/json");
						}
						return httprequest;
					};
					var httprequest = kony.sync.httprequest;
					if (null === httprequest) {
						httprequest = createNewHttpRequest(null, paramsHttpheaders, localRequestCallback, url, timeoutValue);
						kony.sync.httprequest = httprequest;
						kony.sync.httprequestsession = httprequest.getSession();
					} else if (false === kony.sync.httprequestsinglesession) {
						if (kony.sync.httprequestsession) {
							httprequest = createNewHttpRequest(kony.sync.httprequestsession, paramsHttpheaders, localRequestCallback, url, timeoutValue);
							kony.sync.httprequest = httprequest;
							kony.sync.httprequestsinglesession = true;
						}
					} else {
						httprequest.abort();
						httprequest.onReadyStateChange = localRequestCallback;
						httprequest.open(constants.HTTP_METHOD_POST, url);
					}
					httprequest.send(paramsTable);
				}
				//#else
				kony.net.invokeServiceAsync(url, params, callback, context);
				//#endif
			} else {
				kony.sync.currentSyncConfigParams[kony.sync.invokeServiceFunctionKey](url, params, callback, context);
			}

			function localRequestCallback(httprequest) {
				if (httprequest.readyState === 4 && httprequest.status === 200) {
					callback(400, httprequest.response, context);
				} else if (httprequest.readyState === 4) {
					httprequest.response = {
						'opstatus': 1012
					};
					callback(400, httprequest.response, context);
				}
			}
		} //end of invokeServiceAsyncHelper
};

kony.sync.commonServiceParams = function(params) {
	sync.log.trace("Entering kony.sync.commonServiceParams ");
	var httpheaders = {};
	if (kony.sync.isNullOrUndefined(kony.sync.currentSyncConfigParams[kony.sync.authTokenKey])) {
		params.userid = kony.sync.currentSyncConfigParams.userid;
		params.password = kony.sync.genHash(kony.sync.currentSyncConfigParams[kony.sync.passwordHashingAlgo], kony.sync.currentSyncConfigParams.password);
		params.AppID = kony.sync.getAppId();
	} else {
		if (!kony.sync.isMbaasEnabled) {
			kony.sync.isMbaasEnabled = true;
		}
		httpheaders["X-Kony-Authorization"] = kony.sync.currentSyncConfigParams[kony.sync.authTokenKey];
	}
	if (!kony.sync.isNullOrUndefined(kony.sync.sessionMap[kony.sync.konySyncSessionID]) &&
			!kony.sync.isNullOrUndefined(kony.sync.sessionMap[kony.sync.konySyncRequestNumber])) {
		params.konysyncsessionid = kony.sync.sessionMap[kony.sync.konySyncSessionID];
		params.konysyncrequestnumber = kony.sync.sessionMap[kony.sync.konySyncRequestNumber];
	}	
	httpheaders["Content-Type"] = "application/json";
	params.httpheaders = httpheaders;
};

kony.sync.setSessionID = function(response) {
	if (!kony.sync.isNullOrUndefined(response.d) && !kony.sync.isNullOrUndefined(response.d.__session)) {
		kony.sync.sessionMap[kony.sync.konySyncSessionID] = response.d.__session.id;
		kony.sync.sessionMap[kony.sync.konySyncRequestNumber] = response.d.__session.requestnumber;
	}
};

kony.sync.resetSessionVars = function() {
	kony.sync.sessionMap = {};
};

kony.sync.getDownloadBinaryURL = function() {
	sync.log.trace("Entering kony.sync.getDownloadURL ");
	var server = kony.sync.getServerURL();
	return server + "downloadBinary";
};
//  **************** End konySyncServiceProvider.js*******************


//  **************** Start KonySyncSkyLib.js*******************
//#ifdef bb10
sky = null;
//#endif
kony.sky = {};
//Sky Constants
kony.sky.EventStart = "START";
kony.sky.EventFinish = "FINISH";
kony.sky.EventError = "ERROR";

kony.sky.ConfigParamServer = "SERVER";
kony.sky.ConfigParamPort = "PORT";
kony.sky.ConfigParamProfile = "PROFILE";
kony.sky.ConfigParamUsewifi = "USEWIFI";
kony.sky.ConfigParamUser = "USER";
kony.sky.ConfigParamPasswd = "PASSWORD";
kony.sky.BBPlatform = "blackberry";
kony.sky.TrueStr = "TRUE";
kony.sky.BBPlatformName = "blackberry";
kony.sky.ConfigParamConnMode = "CONNECTIONMODE";

kony.sky.startSkyCallback = "onSkyStart";
kony.sky.startIdentifyCallback = "onIndentifyStart";
kony.sky.successIdentifyCallback = "onIndentifySuccess";
kony.sky.errorIdentifyCallback = "onIndentifyError";
kony.sky.errorSkyCallback = "onSkyError";
kony.sky.startSessionCallback = "onSessionStart";
kony.sky.successSessionCallback = "onSessionSuccess";
kony.sky.errorSessionCallback = "onSessionError";
kony.sky.successSkyCallback = "onSkySuccess";

kony.sky.errorCode = "errorCode";
kony.sky.errorMessage = "errorMessage";
//provision callback methods
kony.sky.startProvisionCallback = "onProvisionStart";
kony.sky.successProvisionCallback = "onProvisionSuccess";
kony.sky.errorProvisionCallback = "onProvisionError";
//reset callback methods
kony.sky.startResetCallback = "onResetStart";
kony.sky.successResetCallback = "onResetSuccess";
kony.sky.errorResetCallback = "onResetError";
//stop callback methods
kony.sky.startStopCallback = "onStopStart";
kony.sky.successStopCallback = "onStopSuccess";
kony.sky.errorStopCallback = "onStopError";

//dataobject upload callback methods
kony.sky.startUploadCallback = "onUploadStart";
kony.sky.successUploadCallback = "onUploadSuccess";
kony.sky.errorUploadCallback = "onUploadError";
//transaction
kony.sky.startTransactionCallback = "onStartTransaction";
kony.sky.successTransactionCallback = "onSuccessTransaction";

kony.sky.parentTableInfo = "parentTable";

kony.sky.provisionSkySync = function(config){
    sync.log.trace("Entering kony.sky.provisionSkySync ");
	//#ifdef bb10
	kony.sky.initializeSkyNamespace();
	//#endif
	var isProvisioned = sky.isProvisioned();
	sync.log.info("SkySync engine provisioned status : ", isProvisioned);
	if(config[kony.sky.ConfigParamServer] === null || config[kony.sky.ConfigParamServer] === "" || config[kony.sky.ConfigParamPort] === null || config[kony.sky.ConfigParamPort] === "" || config[kony.sky.ConfigParamProfile] === null || config[kony.sky.ConfigParamProfile] === "") { 
		var params = {};
		params[kony.sky.errorCode] = "7101";
		params[kony.sky.errorMessage] = kony.sky.errorMessageForCode(params[kony.sky.errorCode]);
		kony.sync.verifyAndCallClosure(config[kony.sky.errorProvisionCallback],params);
		return;
	}
	if(!isProvisioned){		
		var inputParam = {};			
		inputParam[kony.sky.ConfigParamServer] =config[kony.sky.ConfigParamServer];
		inputParam[kony.sky.ConfigParamPort] = config[kony.sky.ConfigParamPort];
		inputParam[kony.sky.ConfigParamProfile] = config[kony.sky.ConfigParamProfile];
		if(!kony.sync.isNull(config[kony.sky.ConfigParamPasswd])){
			inputParam[kony.sky.ConfigParamPasswd] = config[kony.sky.ConfigParamPasswd];
		}
		if(!kony.sync.isNull(config[kony.sky.ConfigParamUser])){
			inputParam[kony.sky.ConfigParamUser] = config[kony.sky.ConfigParamUser];
		}
		if(!kony.sync.isNull(config[kony.sky.ConfigParamUsewifi])){
			inputParam[kony.sky.ConfigParamUsewifi] = config[kony.sky.ConfigParamUsewifi];
		}
		if(!kony.sync.isNull(config[kony.sky.ConfigParamConnMode])){
			inputParam[kony.sky.ConfigParamConnMode] = config[kony.sky.ConfigParamConnMode];
		}
		sky.provision(inputParam, provisionSkySyncCallback);
	}else{		
		kony.sync.verifyAndCallClosure(config[kony.sky.successProvisionCallback],null);
	}
	function provisionSkySyncCallback( event, args ){	
		if((event !== kony.sky.EventStart)){
			if((event === kony.sky.EventError)){
				if((args !== null)){
					var params = {};
					params[kony.sky.errorCode] = args.ERRORCODE;
					params[kony.sky.errorMessage] = args.ERRORDESC;
					kony.sync.verifyAndCallClosure(config[kony.sky.errorProvisionCallback],params);
				}
			}
			if((event === kony.sky.EventFinish)){				
				kony.sync.verifyAndCallClosure(config[kony.sky.successProvisionCallback],null);	
			}						
		}else{
			kony.sync.verifyAndCallClosure(config[kony.sky.startProvisionCallback],null);
		}
	}	
};

kony.sky.startSkySyncSession = function(config){
	sync.log.trace("Entering kony.sky.startSkySyncSession ");
	var isIdentified = sky.isIdentified();
	if(config[kony.sky.ConfigParamUser] === null || config[kony.sky.ConfigParamPasswd] === null) { 
		var params = {};
		params[kony.sky.errorCode] = "7101";
		params[kony.sky.errorMessage] = kony.sky.errorMessageForCode(params[kony.sky.errorCode]);
		kony.sync.verifyAndCallClosure(config[kony.sky.errorSkyCallback],params);
		return;
	}
	kony.sync.verifyAndCallClosure(config[kony.sky.startSkyCallback ],null);
	if(!isIdentified){
		var identifyParams = {};
		identifyParams[kony.sky.ConfigParamUser] = config[kony.sky.ConfigParamUser];
		identifyParams[kony.sky.ConfigParamPasswd] = config[kony.sky.ConfigParamPasswd];
		if(!kony.sync.isNull(config[kony.sky.ConfigParamUsewifi])){
			identifyParams[kony.sky.ConfigParamUsewifi] = config[kony.sky.ConfigParamUsewifi];
		}
		if(!kony.sync.isNull(config[kony.sky.ConfigParamConnMode])){
			identifyParams[kony.sky.ConfigParamConnMode] = config[kony.sky.ConfigParamConnMode];
		}		
		sky.identify(identifyParams,false,identifySkySyncCallback);
	}else{		
		identifySkySyncCallback(kony.sky.EventFinish, [  ]);
	}
	function identifySkySyncCallback( event, args ){
		if(event !== kony.sky.EventStart){
			if(event === kony.sky.EventError){
				if((args !== null)){
					var params = {};
					params[kony.sky.errorCode] = args.ERRORCODE;
					params[kony.sky.errorMessage] = args.ERRORDESC;
					kony.sync.verifyAndCallClosure(config[kony.sky.errorIdentifyCallback],params);
				}
			}	
			if(event === kony.sky.EventFinish){
				kony.sync.verifyAndCallClosure(config[kony.sky.successIdentifyCallback],null);
				startSkySync();
			}
		}
		else{			
			kony.sync.verifyAndCallClosure(config[kony.sky.startIdentifyCallback],null);
		}
	}
	function startSkySync(  ){
		sync.log.trace("Entering startSkySync ");
		var isStarted = sky.isStarted();
		sync.log.info("SkySync server status : ", isStarted);
		kony.sync.verifyAndCallClosure(config[kony.sky.startSessionCallback],null);
		if((!isStarted)){			
			sky.start(startSkySyncCallback);
		}else{
			startSkySyncCallback(kony.sky.EventFinish, [  ]);
		}
	}

	function startSkySyncCallback( event, args ){
		if(event !== kony.sky.EventStart){			
			if(event === kony.sky.EventError){
				if((args !== null)){
					var params = {};
					params[kony.sky.errorCode] = args.ERRORCODE;
					params[kony.sky.errorMessage] = args.ERRORDESC;
					kony.sync.verifyAndCallClosure(config[kony.sky.errorSessionCallback],params);
				}
			}	
			if(event === kony.sky.EventFinish){	
				sync.log.info("SkySync server started Successful");
				kony.sync.verifyAndCallClosure(config[kony.sky.successSessionCallback],null);
				kony.sync.verifyAndCallClosure(config[kony.sky.successSkyCallback],null);
			}
		}
	}	
};

kony.sky.skyEmptyFunction = function(){
	sync.log.trace("Entering kony.sky.skyEmptyFunction ");
};

kony.sky.getSkyGuiID = function(){
	sync.log.trace("Entering kony.sky.getSkyGuiID ");
	var serviceId = sky.getParameter("SERVERID");
	var currendate = kony.os.date("mm/dd/yyyy");
	var currtime = kony.sky.replaceColon(kony.os.time());
	var datevalue = currendate.split ("/");
	var resultDate = datevalue[2] + datevalue[0] + datevalue[1] + currtime;
	var GUID = serviceId + "-" + resultDate;
	return GUID;
};

 kony.sky.replaceColon = function(currtime){
	sync.log.trace("Entering kony.sky.replaceColon ");
	if(kony.string.containsChars(currtime,[":"])){
		currtime = currtime.replace (":", "");
		currtime = kony.sky.replaceColon(currtime);
	}
	return currtime;
};


kony.sky.generatePKTable = function(pk){
	sync.log.trace("Entering kony.sky.generatePKTable ");
	var i = 0;
	var pks = [];
	for (var j in pk){
		var v = pk[j];
		if(!kony.sync.isNull(v.key)){		
			pks[i] = v.key + " = " + v.value;
		}
		else{
			pks[i] = j + " = " + v;
		}
		i = i + 1;
	}
	return pks;
};

kony.sky.buildConditionSet = function(srchByTargetAttribute, targetKey){
	sync.log.trace("Entering kony.sky.buildConditionSet ");
	var conditionSet = [];
	conditionSet[ 0 ] = srchByTargetAttribute + " = " + targetKey;
	return conditionSet;
};

kony.sky.beginTransaction = function(config){
	sync.log.trace("Entering kony.sky.beginTransaction ");
		sky.beginTransaction(config[kony.sky.successTransactionCallback]);
};

kony.sky.commitTransaction = function(config){
	sync.log.trace("Entering kony.sky.commitTransaction ");
		sky.commitTransaction(config[kony.sky.successTransactionCallback]);
};

kony.sky.rollbackTransaction = function(config){
	sync.log.trace("Entering kony.sky.rollbackTransaction ");
		sky.rollbackTransaction(config[kony.sky.successTransactionCallback]);
};

kony.sky.resetSkyEngine = function(config){	
	sync.log.trace("Entering kony.sky.resetSkyEngine ");
	function resetCallback( event, args ){	
		if((event !== kony.sky.EventStart)){
			if((event === kony.sky.EventError)){
				if((args !== null)){
					var params = {};
					params[kony.sky.errorCode] = args.ERRORCODE;
					params[kony.sky.errorMessage] = args.ERRORDESC;
					kony.sync.verifyAndCallClosure(config[kony.sky.errorResetCallback],params);
				}
			}
			if((event === kony.sky.EventFinish)){				
				kony.sync.verifyAndCallClosure(config[kony.sky.successResetCallback],null);	
			}						
		}else{
			kony.sync.verifyAndCallClosure(config[kony.sky.startResetCallback],null);
		}
	}
	sky.reset(resetCallback);
};

kony.sky.stopSkyEngine = function(config){	
	sync.log.trace("Entering kony.sky.stopSkyEngine ");
	function stopCallback( event, args ){	
		if((event !== kony.sky.EventStart)){
			if((event === kony.sky.EventError)){
				if((args !== null)){
					var params = {};
					params[kony.sky.errorCode] = args.ERRORCODE;
					params[kony.sky.errorMessage] = args.ERRORDESC;
					kony.sync.verifyAndCallClosure(config[kony.sky.errorStopCallback],params);
				}
			}
			if((event === kony.sky.EventFinish)){			
				if(sky.isStarted()){
					sky.stop(stopCallback);
				}else{
					kony.sync.verifyAndCallClosure(config[kony.sky.successStopCallback],null);	
				}
			}						
		}else{
			kony.sync.verifyAndCallClosure(config[kony.sky.startStopCallback],null);
		}
	}
	if(sky.isStarted()){
		sky.stop(stopCallback);
	}else{
		kony.sync.verifyAndCallClosure(config[kony.sky.successStopCallback],null);
	}

};

kony.sky.errorMessageForCode = function( errorCode ){
	sync.log.trace("Entering kony.sky.errorMessageForCode ");
	var statusMsgTable = {};
	statusMsgTable["-1002"] = "ERROR_ALREADY_IDENTIFIED";
	statusMsgTable["-1003"] = "ERROR_ALREADY_PROVISIONED";
	statusMsgTable["-1004"] = "ERROR_BAD_CONDITION_SET";
	statusMsgTable["-1005"] = "ERROR_BLACKLISTED";
	statusMsgTable["-1006"] = "ERROR_CONFIGURATION";
	statusMsgTable["-1007"] = "ERROR_DATA_OBJECT_NOT_FOUND";
	statusMsgTable["-1008"] = "ERROR_DUPLICATE_ITEM";	
	statusMsgTable["-1009"] = "ERROR_ENCRYPTION_HANDSHAKE";
	statusMsgTable["-1010"] = "ERROR_ENCRYPTION_MISMATCH";
	statusMsgTable["-1001"] = "ERROR_GENERAL_FAILURE";
	statusMsgTable["-1011"] = "ERROR_HOST_IF_SETUP_ERROR";
	statusMsgTable["-1012"] = "ERROR_HOST_NOT_AVAILABLE";
	statusMsgTable["-1013"] = "ERROR_IDENTITY_FAILURE";
	statusMsgTable["-1014"] = "ERROR_INVALID_PARAMETER";
	statusMsgTable["-1015"] = "ERROR_IS_STARTED";
	statusMsgTable["-1016"] = "ERROR_MEAP_IS_DISABLED";
	statusMsgTable["-1017"] = "ERROR_NO_CONFIGURATION";
	statusMsgTable["-1018"] = "ERROR_NO_INSTANCES_SELECTED";
	statusMsgTable["-1019"] = "ERROR_NOT_IDENTIFIED";
	statusMsgTable["-1020"] = "ERROR_NOT_PROVISIONED";
	statusMsgTable["-1021"] = "ERROR_NOT_RUNNING";
	statusMsgTable["-1022"] = "ERROR_PROFILE_DEACTIVATED";
	statusMsgTable["-1023"] = "ERROR_PROFILE_NOT_FOUND";
	statusMsgTable["-1024"] = "ERROR_RETRY";
	statusMsgTable["-1025"] = "ERROR_TABLE_NOT_FOUND";
	statusMsgTable["-1026"] = "ERROR_UNCAUGHT_EXCEPTION";
	statusMsgTable["-1027"] = "ERROR_USER_NOT_FOUND";
	statusMsgTable["7101"] = "MISSING ATTRIBUTES FOR SKY";	
	var errMsg = "";
	if(statusMsgTable[errorCode] === null) {
		errMsg =  "Some unknown error";
	}else{
		errMsg =  statusMsgTable[errorCode];
	}
	return errMsg;	
};

	
kony.sky.buildSkyOrderByMap = function(orderByMap){
	sync.log.trace("Entering kony.sky.buildSkyOrderByMap ");
	var i = 0;
	var ordering = [];
	for ( var j in orderByMap ){
		var v = orderByMap[j];	
		var sortType =  v.sortType;
		var orderBy = (v.key).toString() ;
		if(sortType === "desc"){
			orderBy = orderBy +" D*";
		}else{
			orderBy = orderBy + " *";
		}
		ordering[ i ] = orderBy ;
		i = i + 1;
	}
	return ordering;
};
//#ifdef bb10
kony.sky.initializeSkyNamespace = function(){
	if (sky === null) {
        sky = new SkySync.ffi();
     }
};
//#endif
//#ifdef android
kony.sky.initializeSkySync = function(){
	sky.initializeSkySync();
};
//#endif
//#ifdef tabrcandroid
kony.sky.initializeSkySync = function(){	
	sky.initializeSkySync();	
};
//#endif
skySync = {
	init : kony.sky.provisionSkySync,
	startSession : kony.sky.startSkySyncSession,
	reset : kony.sky.resetSkyEngine,
	stop : kony.sky.stopSkyEngine,
	beginTransaction : kony.sky.beginTransaction,
	rollbackTransaction :kony.sky.rollbackTransaction,
	commitTransaction : kony.sky.commitTransaction,
	//#ifdef KONYSYNC_BB10
	initializeSkyNamespace : kony.sky.initializeSkyNamespace
	//#endif
	//#ifdef KONYSYNC_ANDROID
	initializeSkySync : kony.sky.initializeSkySync
	//#endif
//	quiesce : kony.sky.quiesce,
	//unquiesce : kony.sky.unquiesce
};
//  **************** End KonySyncSkyLib.js*******************


//  **************** Start KonySyncUpload.js*******************
if(typeof(kony.sync)=== "undefined"){
	kony.sync = {};
}
if(typeof(sync) === "undefined") {
	sync = {};
}

kony.sync.syncUploadChanges = function(sname, dsname, onCompletion) {
	sync.log.trace("Entering kony.sync.syncUploadChanges ");
    kony.sync.onUploadCompletion = onCompletion;
    kony.sync.resetuploadsessioglobals();
	kony.sync.objectLevelInfoMap = {};
	kony.sync.OTAChangestobeDeleted = [];
	kony.sync.uploadcontextMap = {};
    kony.sync.getLastSyncUploadContext(sname, dsname, kony.sync.syncUploadChangesForBatch);
};

kony.sync.createClone = function(obj) {
	var copy;
    if (null == obj || "object" != typeof obj) 
    	return obj;
	
	if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = kony.sync.createClone(obj[i]);
        }
        return copy;
    }
	
	if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = kony.sync.createClone(obj[attr]);
        }
        return copy;
    }
}

kony.sync.syncUploadChangesForBatch = function(rowItem, previousUpload, limit) {
	sync.log.trace("Entering kony.sync.syncUploadChangesForBatch");
	var batchSize = kony.sync.getUploadBatchSize();
	var offset = 0;
    var serverblob1 = rowItem[kony.sync.metaTableUploadSyncTimeColumn];
	var lastSeqNo = rowItem[kony.sync.metaTableSyncOrderCloumn];
	//previousUpload = "";//temporary -- to be removed while handling duplicate row issue
    sync.log.info("Current Scope Server Time Stamp", serverblob1);
    kony.sync.currentSyncReturnParams[kony.sync.lastSyncTimestamp] = serverblob1;
    kony.sync.currentSyncReturnParams[kony.sync.uploadSequenceNumber] = kony.sync.currentSyncScopesState[kony.sync.currentScope.ScopeName];
    var firstBatch = false;
	var lastBatch = false;
	var isError = false;
	var changeset = {
        clientid: kony.sync.getDeviceID(),
        SequenceNumber: kony.sync.currentSyncScopesState[kony.sync.currentScope.ScopeName],
        serverblob: serverblob1,
        scopeName: kony.sync.currentScope[kony.sync.scopeName],
        uri: kony.sync.currentScope[kony.sync.scopeDataSource],
		totalChanges: 0,
        tables: []
    };
	
	function updateSyncOrderForDeferredRows(tx, limit) {
		sync.log.trace("Entering kony.sync.updateSyncOrderForDeferredRows");
		
		if(kony.sync.isNullOrUndefined(kony.sync.currentScope.ScopeTables)){
			return true;
		}
		for (var i = 0; i < kony.sync.currentScope.ScopeTables.length; i++) {
			var syncTable = kony.sync.currentScope.ScopeTables[i];
			if(kony.sync.isNullOrUndefined(syncTable)){
				continue;
			}
			var tablename = syncTable.Name;
			var settable = [];
			settable[kony.sync.historyTableSyncVersionColumn] = kony.sync.currentSyncScopesState[kony.sync.currentScope.ScopeName];
			var query = kony.sync.qb_createQuery();
						kony.sync.qb_update(query, tablename+kony.sync.historyTableName);
						kony.sync.qb_set(query, settable);
						kony.sync.qb_where(query, [{key:kony.sync.historyTableReplaySequenceColumn,value:limit, optype: "LT"}]);
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			if(kony.sync.executeSql(tx, sql, params)===false){
				return false;
			}			
		}
		return true;
	}

    function uploadAllTransaction(tx){
		sync.log.trace("Entering kony.sync.syncUploadChangesForBatch->uploadAllTransaction");
		//get offset for the 1st batch
		if(kony.sync.isNull(limit) || previousUpload === "*"){
			if( (previousUpload == "*") && !kony.sync.isNull(limit)) {
				if(updateSyncOrderForDeferredRows(tx, limit) === false) {
					isError = true;
				}
			}
			offset = kony.sync.getSmallestSequenceNumber(tx);
			if(offset===false){
				isError = true;
				return;
			}
			if(previousUpload !== "*"){
				firstBatch = true; //If not resuming after sending duplicate row
			}else{
				previousUpload = "";
			}
		}
		//otherwise increase it by limit + 1
		else{
			offset = limit + 1;
		}
		
		limit = offset + batchSize - 1; 
		var uploadCache = {};		
		if(offset !== -1){
			kony.sync.syncTotalBatchInserts = 0;
			kony.sync.syncTotalBatchUpdates = 0;
			kony.sync.syncTotalBatchDeletes = 0;

			var scopeName = kony.sync.currentScope[kony.sync.scopeName];
			var changeSetCopy = kony.sync.createClone(changeset);
			uploadCache[kony.sync.scope] = scopeName;
			uploadCache[kony.sync.offset] = offset;
			uploadCache[kony.sync.limit] = limit;
			uploadCache[kony.sync.changeSet] = JSON.stringify(changeSetCopy);
			uploadCache[kony.sync.lastSequenceNumber] = lastSeqNo;
			uploadCache[kony.sync.batchSize] = batchSize;

			//updating the offset in case of kony.sync.getBatchChanges is not able to get records in 1st attempt
			limit = kony.sync.getBatchChanges(tx, kony.sync.currentScope, offset, limit, changeset, lastSeqNo, batchSize);
			if(limit===false){
				isError = true;
				return;
			}
			kony.sync.syncTotalInserts += kony.sync.syncTotalBatchInserts;
			kony.sync.syncTotalUpdates += kony.sync.syncTotalBatchUpdates;
			kony.sync.syncTotalDeletes += kony.sync.syncTotalBatchDeletes;
		}
		
		if(limit >= lastSeqNo){
			lastBatch = true;
		}
		if(offset !== -1){
			uploadCache[kony.sync.lastBatch] = lastBatch;
			uploadCache[kony.sync.uploadChangesLimit] = kony.sync.uploadLimit;
			cacheLastUploadRequest(tx, uploadCache);
		}	

    }

    function cacheLastUploadRequest(tx, uploadCache) {
		if(changeset.totalChanges > 0) {
			var scopeName = kony.sync.currentScope[kony.sync.scopeName]
			var lastRequest = kony.sync.checkForPendingUpload(tx, scopeName);
			if(lastRequest != "") {
				return;
			}
			var contextInfo = {};
	        contextInfo[kony.sync.metaTableScopeColumn] = scopeName;
	        contextInfo[kony.sync.pendingUploadTableInsertCount] = kony.sync.syncTotalInserts;
	        contextInfo[kony.sync.pendingUploadTableUpdateCount] = kony.sync.syncTotalUpdates;
	        contextInfo[kony.sync.pendingUploadTableDeleteCount] = kony.sync.syncTotalDeletes;
	        contextInfo[kony.sync.pendingUploadTableBatchInsertCount] = kony.sync.syncTotalBatchInserts;
	        contextInfo[kony.sync.pendingUploadTableBatchUpdateCount] = kony.sync.syncTotalBatchUpdates;
	        contextInfo[kony.sync.pendingUploadTableBatchDeleteCount] = kony.sync.syncTotalBatchDeletes;
	        contextInfo[kony.sync.pendingUploadTableObjectLevelInfo] = JSON.stringify(kony.sync.objectLevelInfoMap);
	        contextInfo[kony.sync.pendingUploadTableUploadRequest] = JSON.stringify(uploadCache);
			contextInfo[kony.sync.pendingUploadTableUploadLimit] = kony.sync.uploadLimit;
	        var query = kony.sync.qb_createQuery();
	        kony.sync.qb_insert(query, kony.sync.pendingUploadTableName);
	        kony.sync.qb_set(query, contextInfo);
	        var query_compile = kony.sync.qb_compile(query);
	        var sql = query_compile[0];
	        var params = query_compile[1];
	        var resultSet = kony.sync.executeSql(tx, sql, params);
	        if (resultSet === false) {
	            isError = true;
	        }
        }    	
    }    

    function uploadTransactionSuccess(){
		sync.log.trace("Entering kony.sync.syncUploadChangesForBatch->uploadTransactionSuccess");
		if(changeset.totalChanges > 0 || previousUpload !== ""){
			if(firstBatch){
				//kony.sync.deleteMapKey(kony.sync.currentSyncReturnParams, kony.sync.serverDetails);
				//kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUploadStart], kony.sync.currentSyncReturnParams);
				kony.sync.isUploadStarted = true;
			}
			//kony.sync.konyUploadChanges(changeset, uploadAllTransactionSuccess, lastBatch);
			if(previousUpload===""){
				kony.sync.konyUploadChanges(changeset, uploadAllTransactionSuccess, lastBatch, null);
			}
			else{
				kony.sync.konyUploadChanges(null, uploadAllTransactionSuccess, null, changeset);
			}
		}
		else{
			if(firstBatch){ //nothing to upload, hence skip it
				kony.sync.uploadCompleted();
			}
			else{ //upload batch processing finished
				kony.sync.currentSyncReturnParams[kony.sync.uploadContext] = kony.sync.uploadcontextMap;
				kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUploadSuccess], kony.sync.currentSyncReturnParams);
				kony.sync.currentSyncReturnParams[kony.sync.uploadContext] = {};
				kony.sync.uploadcontextMap = {};
				kony.sync.onUploadCompletion(false, null);
			}
		}
	}
	function transactionErrorCallback(){
		sync.log.trace("Entering kony.sync.syncUploadChangesForBatch->transactionErrorCallback");
		if (!isError){
			kony.sync.syncUploadFailed(kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
		}
		else{
			kony.sync.syncUploadFailed(kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
    function uploadAllTransactionSuccess(otaServerChanges, oldJson) {
        sync.log.trace("Entering kony.sync.syncUploadChangesForBatch->uploadAllTransactionSuccess");
        sync.log.info("Upload response:", otaServerChanges);
        if (!kony.sync.isNullOrUndefined(otaServerChanges.opstatus) && otaServerChanges.opstatus !== 0){
			if (!kony.sync.isNullOrUndefined(otaServerChanges.d)) {
				kony.sync.deleteLastUploadRequestWithNewTransaction(deleteLastUploadRequestCallback);
			} else {
				addLastUploadRequestCallback();
			}
            return;
        }
		else if(kony.sync.isNullOrUndefined(otaServerChanges.d)){
			kony.sync.onUploadCompletion(true, kony.sync.getServerError(otaServerChanges));
			return;
		}
		function addLastUploadRequestCallback(){
			sync.log.trace("Entering kony.sync.syncUploadChangesForBatch->addLastUploadRequestCallback");
			kony.sync.onUploadCompletion(true, kony.sync.getServerError(otaServerChanges));
		}
        if (otaServerChanges.d.error === "false"){
			if(!kony.sync.isNullOrUndefined(otaServerChanges.d.__sync) && !kony.sync.isNullOrUndefined(otaServerChanges.d.__sync.serverblob)) {
				rowItem[kony.sync.metaTableUploadSyncTimeColumn] = otaServerChanges.d.__sync.serverblob;
			}
			kony.sync.currentSyncReturnParams[kony.sync.serverDetails] = {};
			kony.sync.currentSyncReturnParams[kony.sync.serverDetails][kony.sync.hostName] = kony.sync.getServerDetailsHostName(otaServerChanges);
			kony.sync.currentSyncReturnParams[kony.sync.serverDetails][kony.sync.ipAddress] = kony.sync.getServerDetailsIpAddress(otaServerChanges);
			kony.sync.clearSyncOrder(kony.sync.currentScope[kony.sync.scopeDataSource], limit, rowItem[kony.sync.metaTableUploadSyncTimeColumn], true, clearSyncOrderCallback);
			
        } else {
			kony.sync.deleteLastUploadRequestWithNewTransaction(deleteLastUploadRequestCallback);
            return;
        }
		
		function deleteLastUploadRequestCallback(){
			kony.sync.onUploadCompletion(true,kony.sync.getServerError(otaServerChanges.d)); 
		}
		
		function clearSyncOrderCallback(){
			sync.log.trace("Entering kony.sync.syncUploadChangesForBatch->clearSyncOrderCallback");
			if (kony.sync.currentScope[kony.sync.syncStrategy] !== kony.sync.syncStrategy_OTA) {
				setSeqNoWrapper();
			} else {
				kony.sync.setOTAUploadResponse(otaServerChanges, setSeqNoWrapper);
			}
		}
				
		function setSeqNoWrapper(){			
			sync.log.trace("Entering kony.sync.syncUploadChangesForBatch->setSeqNoWrapper");
			kony.sync.currentSyncScopesState[kony.sync.currentScope.ScopeName] = kony.sync.currentSyncScopesState[kony.sync.currentScope.ScopeName] + 1;
			kony.sync.setSeqnumber(kony.sync.currentScope.ScopeName, kony.sync.currentScope[kony.sync.scopeDataSource], kony.sync.currentSyncScopesState[kony.sync.currentScope.ScopeName], setSeqNoCallback);
		}
		
		function setSeqNoCallback(){
			sync.log.trace("Entering kony.sync.syncUploadChangesForBatch->setSeqNoCallback");
			kony.sync.uploadcontextMap[kony.sync.numberOfRowsUploaded] = kony.sync.syncTotalInserts + kony.sync.syncTotalUpdates + kony.sync.syncTotalDeletes;
			kony.sync.uploadcontextMap[kony.sync.numberOfRowsInserted] = kony.sync.syncTotalInserts;
			kony.sync.uploadcontextMap[kony.sync.numberOfRowsUpdated] = kony.sync.syncTotalUpdates;
			kony.sync.uploadcontextMap[kony.sync.numberOfRowsDeleted] = kony.sync.syncTotalDeletes;
			
			var uploadBatchContextMap = {};
			uploadBatchContextMap[kony.sync.numberOfRowsUploaded] = kony.sync.syncTotalBatchInserts + kony.sync.syncTotalBatchUpdates + kony.sync.syncTotalBatchDeletes;
			uploadBatchContextMap[kony.sync.numberOfRowsInserted] = kony.sync.syncTotalBatchInserts;
			uploadBatchContextMap[kony.sync.numberOfRowsUpdated] = kony.sync.syncTotalBatchUpdates;
			uploadBatchContextMap[kony.sync.numberOfRowsDeleted] = kony.sync.syncTotalBatchDeletes; 
			uploadBatchContextMap[kony.sync.serverDetails] = {};
			uploadBatchContextMap[kony.sync.serverDetails][kony.sync.hostName] = kony.sync.getServerDetailsHostName(otaServerChanges);
			uploadBatchContextMap[kony.sync.serverDetails][kony.sync.ipAddress] = kony.sync.getServerDetailsIpAddress(otaServerChanges);
			
			if (kony.sync.currentScope[kony.sync.syncStrategy] === kony.sync.syncStrategy_OTA) {
				kony.sync.uploadcontextMap[kony.sync.objectLevelInfo] = kony.sync.objectLevelInfoMap;
				kony.sync.uploadcontextMap[kony.sync.numberOfRowsAcknowledged] = kony.sync.serverInsertAckCount + kony.sync.serverUpdateAckCount + kony.sync.serverDeleteAckCount;
				kony.sync.uploadcontextMap[kony.sync.numberOfRowsInsertedAck] = kony.sync.serverInsertAckCount;
				kony.sync.uploadcontextMap[kony.sync.numberOfRowsUpdatedAck] = kony.sync.serverUpdateAckCount;
				kony.sync.uploadcontextMap[kony.sync.numberOfRowsDeletedAck] = kony.sync.serverDeleteAckCount;
				kony.sync.uploadcontextMap[kony.sync.failedRowInfo] = kony.sync.uploadSummary;
				kony.sync.uploadcontextMap[kony.sync.numberOfRowsFailedtoUpload] = kony.sync.serverFailedCount;
			}
			var uploadBatchParams = {};
			uploadBatchParams[kony.sync.uploadContext] = kony.sync.uploadcontextMap;
			uploadBatchParams[kony.sync.uploadBatchContext] = uploadBatchContextMap;
			kony.sync.verifyAndCallClosure(kony.sync.currentSyncConfigParams[kony.sync.onUploadBatchSuccess], uploadBatchParams);
			//clearing variables before calling 2nd batch
			otaServerChanges = null;
			uploadBatchParams = null;
			uploadBatchContextMap = null;
			changeset = null;
			firstBatch = null;
			lastBatch = null;
			batchSize = null;
			offset = null;
			serverblob1 = null;
			
			//call upload batching recursively
			kony.sync.syncUploadChangesForBatch(rowItem, previousUpload!==""?"*":"", limit);
		}
	}
    if(previousUpload === "" || previousUpload === "*"){
		var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
		var connection = kony.sync.getConnectionOnly(dbname, dbname, kony.sync.syncUploadFailed);
		if(connection!==null){
			kony.db.transaction(connection, uploadAllTransaction, transactionErrorCallback, uploadTransactionSuccess);
		}
	}
	else{
		changeset = previousUpload[kony.sync.pendingUploadTableUploadRequest];
		try{
			kony.sync.objectLevelInfoMap = JSON.parse(previousUpload[kony.sync.pendingUploadTableObjectLevelInfo]);
		}
		catch(e){
			sync.log.error("Error occurred while re-framing last persisted upload request:" + e);
			kony.sync.onUploadCompletion(true, kony.sync.getErrorTable(kony.sync.errorCodeParseError, kony.sync.getErrorMessage(kony.sync.errorCodeParseError,previousUpload[kony.sync.pendingUploadTableObjectLevelInfo], e)));
			return;
		}
		changeset = previousUpload[kony.sync.pendingUploadTableUploadRequest];
		kony.sync.syncTotalInserts = previousUpload[kony.sync.pendingUploadTableInsertCount];
		kony.sync.syncTotalUpdates = previousUpload[kony.sync.pendingUploadTableUpdateCount];
		kony.sync.syncTotalDeletes = previousUpload[kony.sync.pendingUploadTableDeleteCount];
		kony.sync.syncTotalBatchInserts = previousUpload[kony.sync.pendingUploadTableBatchInsertCount];
		kony.sync.syncTotalBatchUpdates = previousUpload[kony.sync.pendingUploadTableBatchUpdateCount];
		kony.sync.syncTotalBatchDeletes = previousUpload[kony.sync.pendingUploadTableBatchDeleteCount];
		limit = previousUpload[kony.sync.pendingUploadTableUploadLimit];
		firstBatch = true;
		uploadTransactionSuccess();
	}
};

kony.sync.setOTAUploadResponse = function (serverChanges, callback) {
	sync.log.trace("Entering kony.sync.setOTAUploadResponse");
	var isError = false;
	if(!kony.sync.isNullOrUndefined(serverChanges.d) && !kony.sync.isNullOrUndefined(serverChanges.d.results)){
		for(var i in serverChanges.d.results){
			kony.sync.OTAChangestobeDeleted.push(serverChanges.d.results[i]);
		}
	}
	function setOTAUploadResponseTransaction(tx) {
		sync.log.trace("Entering kony.sync.setOTAUploadResponse->setOTAUploadResponseTransaction");
		isError = kony.sync.applyChanges(tx, kony.sync.currentScope, serverChanges, kony.sync.gPolicy);
    }

    function setOTAUploadResponseTransactionSuccess() {
		sync.log.trace("Entering kony.sync.setOTAUploadResponse->setOTAUploadResponseTransactionSuccess");
		callback();
	}
	function setOTAUploadResponseTransactionFailure() {
		sync.log.trace("Entering kony.sync.setOTAUploadResponse->setOTAUploadResponseTransactionFailure");
		if (!isError) {
			kony.sync.syncUploadFailed(kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
		} else {
			kony.sync.syncUploadFailed(kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
    var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
    var connection = kony.sync.getConnectionOnly(dbname, dbname, kony.sync.syncUploadFailed);
    if(connection!==null){
		kony.db.transaction(connection, setOTAUploadResponseTransaction, setOTAUploadResponseTransactionFailure, setOTAUploadResponseTransactionSuccess);
	}
};

kony.sync.syncUploadFailed = function(connection) {
	sync.log.trace("Entering kony.sync.syncUploadFailed");
    kony.sync.onUploadCompletion(true,JSON.stringify(connection));
    sync.log.error("Upload Failed",connection);
};


//To get smallest sequence number from all history tables of a scope
kony.sync.getSmallestSequenceNumber = function(tx){
	sync.log.trace("Entering kony.sync.getSmallestSequenceNumber");
	if(kony.sync.isNullOrUndefined(kony.sync.currentScope.ScopeTables)){
		return -1;
	}
	var seqNo = -1; //initialize sequence number
	for (var i = 0; i < kony.sync.currentScope.ScopeTables.length; i++){
		var syncTable = kony.sync.currentScope.ScopeTables[i];
		//not using query builder to speedup sync time
		var sql = "select min(" + kony.sync.historyTableReplaySequenceColumn + ") from " + 
				syncTable.Name + kony.sync.historyTableName + " where " + 
				kony.sync.historyTableChangeTypeColumn + " NOT LIKE '9%' AND " +
				kony.sync.historyTableSyncVersionColumn + " = " + kony.sync.currentSyncScopesState[kony.sync.currentScope.ScopeName];
		var resultset = kony.sync.executeSql(tx, sql, null);
		if(resultset === false){
			return false; //error occurred while executing query
		}
		var rowItem = kony.db.sqlResultsetRowItem(tx, resultset, 0);
		var seqNoFromTable = kony.sync.tonumber(rowItem["min(" + kony.sync.historyTableReplaySequenceColumn + ")"]);
		seqNo = (seqNo === -1 || seqNoFromTable < seqNo) && seqNoFromTable !== null ? seqNoFromTable : seqNo;
	}
	return seqNo;	
};

kony.sync.getBatchChanges = function(tx, scope, offset, limit, changeset, lastSeqNo, batchSize) {
	sync.log.trace("Entering kony.sync.getBatchChanges");
	var tc = null;
	var continueGettingChanges = true;
	kony.sync.uploadLimit = 0;
	var tempUploadLimit;
	do{
		for(var i = 0; !kony.sync.isNull(kony.sync.currentScope.ScopeTables) && i < kony.sync.currentScope.ScopeTables.length; i++){
			var syncTable = kony.sync.currentScope.ScopeTables[i];
			if(kony.sync.isNullOrUndefined(kony.sync.objectLevelInfoMap[syncTable.Name])){ 
				kony.sync.objectLevelInfoMap[syncTable.Name] = {};
				kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsUploaded] = 0;
				kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsInserted] = 0;
				kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsUpdated] = 0;
				kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsDeleted] = 0;
				
				if ((kony.sync.currentScope[kony.sync.syncStrategy] === kony.sync.syncStrategy_OTA)) {
					kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsInsertedAck] = 0;
					kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsUpdatedAck]= 0;
					kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsDeletedAck] = 0;
					kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsAcknowledged] = 0;
					kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsFailedtoUpload] = 0;
				}
				
			}	
		
			tc = null;
			if(kony.sync.isNullOrUndefined(changeset.tables[i])) {
				tc = {
					tableName: syncTable.Name,
					changes: []
				};
				changeset.tables[i] = tc;
			} else {
				tc = changeset.tables[i];
			}
			var fields = [];
			if(!kony.sync.isNullOrUndefined(kony.sync.currentScope.ScopeTables[i].Columns)){
				for (var j = 0; j < kony.sync.currentScope.ScopeTables[i].Columns.length; j++) {
					var col = kony.sync.currentScope.ScopeTables[i].Columns[j];
					kony.table.insert(fields, col.Name);
				}
			}

			kony.table.insert(fields, kony.sync.historyTableChangeTypeColumn);
			kony.table.insert(fields, kony.sync.historyTableReplaySequenceColumn);
			kony.table.insert(fields, kony.sync.historyTableSyncVersionColumn);
			kony.table.insert(fields, kony.sync.historyTableHashSumColumn);
			
			//not using query builder to speedup sync time
			var sql = "select * from " + syncTable.Name + kony.sync.historyTableName + " where " + 
					kony.sync.historyTableChangeTypeColumn + " NOT LIKE '9%' AND " +
					kony.sync.historyTableSyncVersionColumn + " = " + kony.sync.currentSyncScopesState[kony.sync.currentScope.ScopeName] +
					" AND " + kony.sync.historyTableReplaySequenceColumn + " between " + offset + " AND " + limit;

			var resultset = kony.sync.executeSql(tx, sql, null);
			if(resultset===false){
				return false;
			}
			prepareChangeSet(tx, resultset);
			sync.log.info("changes for " + syncTable.Name + ":", changeset.tables[i].changes);
			
			sql = "select max(" + kony.sync.historyTableReplaySequenceColumn + ") from " + syncTable.Name + kony.sync.historyTableName + " where " + 
					kony.sync.historyTableChangeTypeColumn + " NOT LIKE '9%' AND " +
					kony.sync.historyTableSyncVersionColumn + " = " + kony.sync.currentSyncScopesState[kony.sync.currentScope.ScopeName] +
					" AND " + kony.sync.historyTableReplaySequenceColumn + " between " + offset + " AND " + limit;

			resultset = kony.sync.executeSql(tx, sql, null);
			if(resultset===false){
				return false;
			}
			tempUploadLimit = kony.db.sqlResultsetRowItem(tx, resultset, 0)["max(" + kony.sync.historyTableReplaySequenceColumn + ")"];
			if(tempUploadLimit !== null && tempUploadLimit > kony.sync.uploadLimit){
				kony.sync.uploadLimit = tempUploadLimit;
			}
			if(changeset.totalChanges === batchSize){
				break; //got all changes
			}
		}
		if(changeset.totalChanges < batchSize && limit < lastSeqNo){
			offset = limit + 1;
			limit += batchSize - changeset.totalChanges;
		}
		else{
			continueGettingChanges = false;
		}
	}while(continueGettingChanges);
	
	function prepareChangeSet(tx, resultset){
		sync.log.trace("Entering kony.sync.getBatchChanges->prepareChangeSet");
		var len = resultset.rows.length;
		for (var k = 0; k < len; k++) {
			var row = kony.db.sqlResultsetRowItem(tx, resultset, k);
			if(!kony.sync.isNullOrUndefined(kony.sync.scopes.syncScopeBlobInfoMap[syncTable.Name])) {
				populateBinaryData(tx, row);
			}			
			var changeType = row[kony.sync.historyTableChangeTypeColumn] + "";
			var rc = {
				fields: [],
				values: []
			};
			if (changeType === kony.sync.insertColStatus) {
				rc.changeType = "insert";
				kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsInserted]=kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsInserted]+1;
				kony.sync.syncTotalBatchInserts += 1;
			} else if (changeType === kony.sync.updateColStatus) {
				rc.changeType = "update";
				kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsUpdated]=kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsUpdated]+1;
				kony.sync.syncTotalBatchUpdates += 1;
			} else if (changeType === kony.sync.deleteColStatus) {
				rc.changeType = "delete";
				kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsDeleted]=kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsDeleted]+1;
				kony.sync.syncTotalBatchDeletes += 1;
			}
			
			if(!kony.sync.isNullOrUndefined(syncTable.Columns)){
				for (var x = 0; x < syncTable.Columns.length; x++) {
					var column = syncTable.Columns[x];
					if(kony.sync.isNullOrUndefined(row[column.Name]) && (column.Name.indexOf(kony.sync.binaryMetaColumnPrefix) !== 0)){
						kony.table.insert(rc.fields, column.Name);
						kony.table.insert(rc.values, "null");
					}
				}
			}
			for(var key in row){
				if (key !== kony.sync.syncStatusColumn){
					kony.table.insert(rc.fields, key);
					kony.table.insert(rc.values, row[key]);
				}
			}
			kony.table.insert(tc.changes, rc);
		}
		changeset.totalChanges = changeset.totalChanges + len;

		kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsUploaded] = 
			kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsInserted] + 
			kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsUpdated] + 
			kony.sync.objectLevelInfoMap[syncTable.Name][kony.sync.numberOfRowsDeleted];
	}
	function populateBinaryData(tx, row) {
		var binaryColumns = kony.sync.scopes.syncScopeBlobInfoMap[syncTable.Name][kony.sync.columns];
		var binaryColumnName = null;
		var binaryMetaFieldKey = null;
		for(var i=0; i<binaryColumns.length; i++) {
			binaryColumnName = binaryColumns[i];
			var downloadPolicy = kony.sync.getDownloadPolicy(syncTable.Name, binaryColumnName);

			//Add the columns with inline downloadpolicy.
			if(downloadPolicy === kony.sync.inline) {
				binaryMetaFieldKey = kony.sync.binaryMetaColumnPrefix + binaryColumnName;
				var blobIndex = row[binaryMetaFieldKey];
				//If the record has any binary data..
				if (!kony.sync.isNullOrUndefined(blobIndex)) {
					//get the state of the blob. if is in stable, then only push.
					var blobMeta = kony.sync.blobManager.getBlobMetaDetails(tx, blobIndex, function(err){
						kony.sync.syncUploadFailed(kony.sync.getErrorTable(kony.sync.errorCodeTransaction,
							kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
					});
					if(blobMeta[kony.sync.blobManager.state] === kony.sync.blobManager.NO_OPERATION &&
						blobMeta[kony.sync.blobManager.status] === 100) {
						//file exists. upload.
						var base64String = sync.util.getallbase64([blobMeta[kony.sync.blobManager.localPath]]);
						if(base64String[0].length > 0){
							row[binaryColumnName] = base64String[0];
						} else {
							//FILE Doesn't exist.
							//TODO - throw an error..file doesn't exist.
							var valuesTable = {};
							valuesTable.state = kony.sync.blobManager.FILE_DOESNOT_EXIST;
							var resultset = kony.sync.blobManager.updateBlobManager(tx, blobIndex, valuesTable, function(err){
								kony.sync.syncUploadFailed(kony.sync.getErrorTable(kony.sync.errorCodeTransaction,
									kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
							});
							if(resultset !== null && resultset !== false) {
								kony.sync.syncUploadFailed(kony.sync.getErrorTable(kony.sync.errorCodeBlobFileDoesnotExist,
									kony.sync.getErrorMessage(kony.sync.errorCodeBlobFileDoesnotExist), null));
							}
						}
					} else {
						//file is in invalid state.
						//TODO-throw error..blob in invalid state..
						kony.sync.syncUploadFailed(kony.sync.getErrorTable(kony.sync.errorCodeBlobInvalidState,
							kony.sync.getErrorMessage(kony.sync.errorCodeBlobInvalidState), null));
					}
				}
			} else {
				//onDemand - do not send data related to the ondemand binary column.
				delete row[binaryColumnName];
			}
			//delete the blobref column.
			delete row[binaryMetaFieldKey];
		}

		function errorCallback(error) {
			sync.log.trace(" error occured while fetching blob ");
		}			
	}	
	sync.log.info("Total number of changes to be uploaded = ", changeset.totalChanges);
	return limit;
};

//This will update syncorder for Pending uploads
kony.sync.updateSyncOrderForUploadBatching = function(tx, limit){
	sync.log.trace("Entering kony.sync.updateSyncOrderForUploadBatching");
	if(kony.sync.isNullOrUndefined(kony.sync.currentScope.ScopeTables)){
		return true;
	}
	for (var i = 0; i < kony.sync.currentScope.ScopeTables.length; i++) {
		var syncTable = kony.sync.currentScope.ScopeTables[i];
		if(kony.sync.isNullOrUndefined(syncTable)){
			continue;
		}
		var tablename = syncTable.Name;
		var settable = [];
		settable[kony.sync.historyTableSyncVersionColumn] = kony.sync.currentSyncScopesState[kony.sync.currentScope.ScopeName] + 1;
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_update(query, tablename+kony.sync.historyTableName);
					kony.sync.qb_set(query, settable);
					kony.sync.qb_where(query, [{key:kony.sync.historyTableReplaySequenceColumn,value:limit, optype: "GT"}]);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		if(kony.sync.executeSql(tx, sql, params)===false){
			return false;
		}
	}
	return true;
};

//This method reconciles Foreign key relationships in case of autogenerated pk
kony.sync.reconcileForeignKey = function(tx, setClause, whereClause, tablename){
	sync.log.trace("Entering kony.sync.reconcileForeignKey");
	//Forward Relationships(OneToMany) reconcilation
	var OTM = kony.sync.currentScope.syncTableDic[tablename].Relationships.OneToMany;
	if(kony.sync.reconcileForeignKeyForRelationShip(tx, setClause, whereClause, tablename, OTM)===false){
		return false;
	}
	
	//Forward Relationships(OneToOne) reconcilation
	var OTO = kony.sync.currentScope.syncTableDic[tablename].Relationships.OneToOne;
	if(kony.sync.reconcileForeignKeyForRelationShip(tx, setClause, whereClause, tablename, OTO)===false){
		return false;
	}
	
	//Reverse Relationships(ManyToOne) reconcilation
	var MTO = kony.sync.currentScope.reverseRelationships[tablename];
	return kony.sync.reconcileForeignKeyForRelationShip(tx, setClause, whereClause, tablename, MTO);
};

kony.sync.reconcileForeignKeyForRelationShip = function(tx, setClause, whereClause, tablename, relationshipSet){
	sync.log.trace("Entering kony.sync.reconcileForeignKeyForRelationShip");
	if(!kony.sync.isNullOrUndefined(relationshipSet)){
		for(var i in relationshipSet) {
			sync.log.info("Reconciling relationships for object " + tablename + " with relationship ", relationshipSet[i]);

			var setC = {};
			var tbname = relationshipSet[i].TargetObject;
			var wcs = [];
			if(!kony.sync.isNullOrUndefined(relationshipSet[i].RelationshipAttributes))
			{
				var relationshipAttributes = relationshipSet[i].RelationshipAttributes;
				for (var j = 0; j < relationshipAttributes.length; j++) {
					if(!kony.sync.isNullOrUndefined(setClause[relationshipAttributes[j].SourceObject_Attribute])) {
						setC[relationshipAttributes[j].TargetObject_Attribute] = setClause[relationshipAttributes[j].SourceObject_Attribute];
					}
				}

				for(var j in whereClause){
					for(var k=0;k<relationshipAttributes.length;k++){
						if(whereClause[j].key === relationshipAttributes[k].SourceObject_Attribute){
							wcs.push({key:relationshipAttributes[k].TargetObject_Attribute, value:whereClause[j].value});
						}
					}
				}

			} else if(!kony.sync.isNullOrUndefined(setClause[relationshipSet[i].SourceObject_Attribute])){
				setC = {};
				setC[relationshipSet[i].TargetObject_Attribute] = setClause[relationshipSet[i].SourceObject_Attribute];
				tbname = relationshipSet[i].TargetObject;
				wcs = [];
				for(var j in whereClause){
					if(whereClause[j].key === relationshipSet[i].SourceObject_Attribute){
						wcs[0] = {key:relationshipSet[i].TargetObject_Attribute, value:whereClause[j].value};
						break;
					}
				}
				
			}
			//update main foreign table 
			var query = kony.sync.qb_createQuery();
            kony.sync.qb_update(query, tbname);
            kony.sync.qb_set(query, setC);
            kony.sync.qb_where(query, wcs);
            var query_compile = kony.sync.qb_compile(query);
            var sql = query_compile[0];
            var params = query_compile[1];
            if(kony.sync.executeSql(tx, sql, params)===false){
				return false;
			}
				
			//update history foreign table
			kony.sync.qb_update(query, tbname + kony.sync.historyTableName);
            query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
            params = query_compile[1];
			if(kony.sync.executeSql(tx, sql, params)===false){
				return false;
			}
				
			//update original foreign table
			kony.sync.qb_update(query, tbname + kony.sync.originalTableName);
            query_compile = kony.sync.qb_compile(query);
			sql = query_compile[0];
            params = query_compile[1];
			if(kony.sync.executeSql(tx, sql, params)===false){
				return false;
			}
		}
	}
};

kony.sync.checkForPendingUpload = function(tx, scopename){
	sync.log.trace("Entering kony.sync.checkForPendingUpload");
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);
				kony.sync.qb_from(query, kony.sync.pendingUploadTableName);
				kony.sync.qb_where(query, [{
					key: kony.sync.metaTableScopeColumn,
					value: scopename
				}]);
	var	query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	var resultSet = kony.sync.executeSql(tx, sql, params);
	if(resultSet===false){
		return false;
	}
	if(resultSet.rows.length === 0){
		return "";
	}
	else{
		return kony.db.sqlResultsetRowItem(tx, resultSet, 0);
	}	
};

kony.sync.getUploadRequest = function (changes, lastBatch) {
	var totalChanges = [];
    if (!kony.sync.isNullOrUndefined(changes.tables)) {
        for (var i = 0; i < changes.tables.length; i++) {
            var tableChange = changes.tables[i];
            var tableName = tableChange.tableName;
            if (!kony.sync.isNullOrUndefined(tableChange.changes)) {
                for (var j = 0; j < tableChange.changes.length; j++) {
                    var rowChange = tableChange.changes[j];
                    if (kony.sync.isNullOrUndefined(rowChange.syncConflict)) {
                        rowChange.syncConflict = "";
                    }
                    var result = {
                        metadata: {
                            type: tableName,
                            uri: changes.uri,
                            changetype: rowChange.changeType,
                            syncConflict: rowChange.syncConflict
                        }
                    };
                    if (!kony.sync.isNullOrUndefined(rowChange.fields)) {
                        var fcount = kony.sync.getArrayCount(rowChange.fields);
                        for (var k = 0; k < fcount; k++) {
                            if (rowChange.fields[k] !== "ServerId" && rowChange.fields[k] !== "UpdateId") {
                                result[rowChange.fields[k]] = rowChange.values[k];
                            }
                        }
                    }
                    totalChanges.push(result);
                }
            }
        }
    }
    
    var moreChangesAvailable = null;
    if (lastBatch === true) {
        moreChangesAvailable = false;
    } else {
        moreChangesAvailable = true;
    }
    var jsonLua = {
        d: {
            results: totalChanges,
            sync: "not implemented",
            scopeName: changes.scopeName,
            serverBlob: changes.serverblob,
            clientid: changes.clientid,
            SequenceNumber: changes.SequenceNumber,
            moreChangesAvailable: moreChangesAvailable
        }
    };
    return JSON.stringify(jsonLua);
}

kony.sync.getLastSyncUploadContext = function(scopename, dbname, scallback){
	sync.log.trace("Entering kony.sync.getLastSyncUploadContext");
	var uploadContext = null;
	var pendingUploads = null;
	var isError = false;
	function transactionCallback(tx){
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_select(query, null);
					kony.sync.qb_from(query, kony.sync.metaTableName);
					kony.sync.qb_where(query, [{
						key: kony.sync.metaTableScopeColumn,
						value: scopename
					},{
						key: kony.sync.metaTableFilterValue,
						value: "no filter"
					}]);
		var	query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		var resultSet = kony.sync.executeSql(tx, sql, params);
		if(resultSet===false){
			isError = true;
			return;
		}
		pendingUploads = kony.sync.checkForPendingUpload(tx, scopename);
		if(pendingUploads===false){
			return;
		}

		if(pendingUploads) {
			if(pendingUploads.uploadrequest) {
				var uploadrequest = JSON.parse(pendingUploads.uploadrequest);
				var scopeName = uploadrequest[kony.sync.scope];
				var cachedCurrentScope = kony.sync.scopes[scopeName];
				var cachedOffset = uploadrequest[kony.sync.offset];
				var cachedLimit = uploadrequest[kony.sync.limit];
				var cachedLastSeqNo = uploadrequest[kony.sync.lastSequenceNumber];
				var cachedBatchSize = uploadrequest[kony.sync.batchSize];
				var cacheChangeSet = JSON.parse(uploadrequest[kony.sync.changeSet]);
				var cacheUploadLimit = uploadrequest[kony.sync.uploadChangesLimit];				
				kony.sync.getBatchChanges(tx, cachedCurrentScope, cachedOffset, cacheUploadLimit, cacheChangeSet, cachedLastSeqNo, cachedBatchSize);
				var cacheLastBatch = uploadrequest[kony.sync.lastBatch];
				pendingUploads[kony.sync.pendingUploadTableUploadRequest] = kony.sync.getUploadRequest(cacheChangeSet, cacheLastBatch);
			}			
		}		
		
		if(resultSet.rows.length === 0){
			return "";
		}
		else{
			uploadContext =  kony.db.sqlResultsetRowItem(tx, resultSet, 0);
		}	
	}
	
	function transactionSuccessCallback(){
		scallback(uploadContext, pendingUploads);
	}
	
	function transactionErrorCallback(){
		sync.log.trace("Entering kony.sync.setOTAUploadResponse->setOTAUploadResponseTransactionFailure");
		if (!isError){
			kony.sync.syncUploadFailed(kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
		}
		else{
			kony.sync.syncUploadFailed(kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	var connection = kony.sync.getConnectionOnly(dbname, dbname, transactionErrorCallback);
	if(connection!==null){
		kony.db.transaction(connection, transactionCallback, transactionErrorCallback, transactionSuccessCallback);
	}
};

kony.sync.setLastSyncUploadContext = function(tx, scopename, serverblob) {
	sync.log.trace("Entering kony.sync.setLastSyncUploadContext");
    var settable = [];
    settable[kony.sync.metaTableUploadSyncTimeColumn] = serverblob;
    var query = kony.sync.qb_createQuery();
    kony.sync.qb_update(query, kony.sync.metaTableName);
    kony.sync.qb_set(query, settable);
    kony.sync.qb_where(query, [{
        key: kony.sync.metaTableScopeColumn,
        value: scopename
    }, {
        key: kony.sync.metaTableFilterValue,
        value: "no filter"
    }]);
    var query_compile = kony.sync.qb_compile(query);
    var sql = query_compile[0];
    var params = query_compile[1];
    if(kony.sync.executeSql(tx, sql, params)===false){
		return false;
	}
};

kony.sync.addLastUploadRequest = function (json, scopename, limit, callback){
	sync.log.trace("Entering kony.sync.addLastUploadRequest");
	var isError = false;
	function transactionCallback(tx){
		//check whether failed upload request is already logged
		var lastRequest = kony.sync.checkForPendingUpload(tx, scopename);
		
		//return if query failed, should go to error callback
		if(lastRequest===false){
			return;
		}
		
		//return if request already logged, should go to success callback
		if(lastRequest!==""){
			return;
		}
		
		var settable = {};
		settable[kony.sync.metaTableScopeColumn] = scopename;
		settable[kony.sync.pendingUploadTableInsertCount] = kony.sync.syncTotalInserts;
		settable[kony.sync.pendingUploadTableUpdateCount] = kony.sync.syncTotalUpdates;
		settable[kony.sync.pendingUploadTableDeleteCount] = kony.sync.syncTotalDeletes;
		settable[kony.sync.pendingUploadTableBatchInsertCount] = kony.sync.syncTotalBatchInserts;
		settable[kony.sync.pendingUploadTableBatchUpdateCount] = kony.sync.syncTotalBatchUpdates;
		settable[kony.sync.pendingUploadTableBatchDeleteCount] = kony.sync.syncTotalBatchDeletes;
		settable[kony.sync.pendingUploadTableObjectLevelInfo] = JSON.stringify(kony.sync.objectLevelInfoMap);
		settable[kony.sync.pendingUploadTableUploadRequest] = json;
		settable[kony.sync.pendingUploadTableUploadLimit] = limit;
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_insert(query, kony.sync.pendingUploadTableName);
					kony.sync.qb_set(query, settable);
		var	query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		var resultSet = kony.sync.executeSql(tx, sql, params);
		if(resultSet===false){
			isError = true;
		}
	}
	
	function transactionSuccessCallback(){
		sync.log.trace("Entering kony.sync.addLastUploadRequest->transactionSuccessCallback");
		callback(true);
	}
	
	function transactionErrorCallback(){
		sync.log.trace("Entering kony.sync.addLastUploadRequest->transactionErrorCallback");
		if (!isError){
			kony.sync.syncUploadFailed(kony.sync.getErrorTable(kony.sync.errorCodeTransaction,
				kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
		}
		else{
			kony.sync.syncUploadFailed(kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
	var connection = kony.sync.getConnectionOnly(dbname, dbname, transactionErrorCallback);
	if(connection!==null){
		kony.db.transaction(connection, transactionCallback, transactionErrorCallback, transactionSuccessCallback);
	}
};

kony.sync.deleteLastUploadRequest = function (tx, scopename){
	sync.log.trace("Entering kony.sync.deleteLastUploadRequest");
	var query = kony.sync.qb_createQuery();
			kony.sync.qb_delete(query, kony.sync.pendingUploadTableName);
			kony.sync.qb_where(query, [{key:kony.sync.metaTableScopeColumn, value:scopename}]);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	if(kony.sync.executeSql(tx, sql, params)===false){
		return false;
	}
	return true;
};

kony.sync.deleteLastUploadRequestWithNewTransaction = function (callback){
	sync.log.trace("Entering kony.sync.deleteLastUploadRequestWithNewTransaction");
	var isError = false;
	function transactionCallback(tx){		
		if(kony.sync.deleteLastUploadRequest(tx, kony.sync.currentScope[kony.sync.scopeName])===false){
			isError = true;
		}
	}
	
	function transactionSuccessCallback(){
		sync.log.trace("Entering kony.sync.deleteLastUploadRequestWithNewTransaction->transactionSuccessCallback");
		callback(true);
	}
	
	function transactionErrorCallback(){
		sync.log.trace("Entering kony.sync.deleteLastUploadRequestWithNewTransaction->transactionErrorCallback");
		if (!isError){
			kony.sync.syncUploadFailed(kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
		}
		else{
			kony.sync.syncUploadFailed(kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	var dbname = kony.sync.currentScope[kony.sync.scopeDataSource];
	var connection = kony.sync.getConnectionOnly(dbname, dbname, transactionErrorCallback);
	if(connection!==null){
		kony.db.transaction(connection, transactionCallback, transactionErrorCallback, transactionSuccessCallback);
	}
};
//  **************** End KonySyncUpload.js*******************


//  **************** Start KonySyncValidations.js*******************
if (typeof(kony.sync) === "undefined") {
	kony.sync = {};
}
kony.sync.attributeValidation = function(valuestable, tablename, errorcallback, isInsert){
	sync.log.trace("kony.sync.attributeValidation ", valuestable);
	if(!kony.sync.enableORMValidations){
		return true;
	}
	if(valuestable != null){
		var scope = kony.sync.scopes[kony.sync.scopes.syncTableScopeDic[tablename]];
		var columns = scope.syncTableDic[tablename].ColumnsDic;
		kony.sync.filterAttributes(valuestable, columns, tablename, isInsert);
		var expectedType = null;
		var expectedLength = null;
		var jsType = null;
		for(var key in columns){
			expectedType = columns[key].type;
			expectedLength = columns[key].Length;
			jsType = kony.sync.getJSType(expectedType);
			//Type validation
			sync.log.debug("kony.sync.attributeValidation:Starting Type Validations");
			if(jsType === "number" || jsType === "boolean"){
				if(!kony.sync.isEmptyString(valuestable[key])){
					if(!kony.sync.isNull(valuestable[key]) && jsType === "number" && !kony.sync.isValidNumberType(valuestable[key])){
						sync.log.error("Invalid data type for the attribute " + key + " in " + tablename + ".\nExpected:\"" + expectedType + "\"\nActual:\"" + kony.type(valuestable[key]) + "\"");
						errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeInvalidDataType,kony.sync.getInvalidDataTypeMsg(tablename, key, expectedType, kony.type(valuestable[key]))));
						return false;
					}
					if(!kony.sync.isNull(valuestable[key]) && jsType === "boolean" && !kony.sync.isValidBooleanType(valuestable[key])){
						sync.log.error("Invalid data type for the attribute " + key + " in " + tablename + ".\nExpected:\"" + expectedType + "\"\nActual:\"" + kony.type(valuestable[key]) + "\"");
						errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeInvalidDataType,kony.sync.getInvalidDataTypeMsg(tablename, key, expectedType, kony.type(valuestable[key]))));
						return false;
					}
				}else {	
					valuestable[key] = "null";
				}
			}
			sync.log.debug("kony.sync.attributeValidation:Type Validations done");
			//Malicious type validation
			sync.log.debug("kony.sync.attributeValidation:Starting Malicious Validations");
			if(jsType === "number" || typeof(valuestable[key]) === "number"){
				var maliciousType=kony.sync.isMaliciousType(valuestable[key]);
				if(maliciousType!== false){
					var errorMessage = kony.sync.getErrorMessage(kony.sync.errorCodeMaliciousType, key, maliciousType);
					sync.log.error("Malicious object detected", kony.sync.getErrorTable(kony.sync.errorCodeMaliciousType, errorMessage));
					kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeMaliciousType, errorMessage));
					return false;
				}
			}
			sync.log.debug("kony.sync.attributeValidation:Malicious Validations done");
			//Length Validation
			sync.log.debug("kony.sync.attributeValidation:Starting Length Validations");
			if(jsType === "string"){
				if(kony.sync.validateLength(tablename, key, valuestable[key], expectedLength, errorcallback)===false){
					return false;
				}
			}
			sync.log.debug("kony.sync.attributeValidation:Length Validations done");
			//Mandatory Attribute Validation
			sync.log.debug("kony.sync.attributeValidation:Starting Mandatory Attribute Validations");
			// if(columns[key].IsNullable === false && !(columns[key].Autogenerated === "true") && !(isInsert===false && columns[key].IsPrimaryKey===true)){
				// if(kony.sync.validateMandatoryColumns(tablename, key, valuestable[key], errorcallback)===false){
						// return false;
				// }
			// }
			if(isInsert){
				//check all mandatory attributes
				if(columns[key].IsNullable === false){
					if(columns[key].Autogenerated !== "true"){
						if(kony.sync.validateMandatoryColumns(tablename, key, valuestable[key], errorcallback)===false){
							return false;
						}
					}
				}
			}
			else{
				//check mandatory attributes only if they are defined
				if(columns[key].IsNullable === false){
					if(columns[key].Autogenerated !== "true"){
						if(typeof(valuestable[key])!=="undefined"){
							if(kony.sync.validateMandatoryColumns(tablename, key, valuestable[key], errorcallback)===false){
								return false;
							}
						}
					}
				}
			}
			
			sync.log.debug("kony.sync.attributeValidation:Mandatory Attribute Validations done");
		}
	}
	
	return true;
};


kony.sync.filterAttributes = function(valuestable, attributeTable, tablename, isInsert){
	for (var k in valuestable){
		if(kony.sync.isNull(attributeTable[k])){
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject " + tablename + ". "  + k + " is not defined as an attribute in SyncConfiguration.");
			delete valuestable[k];
		}else if(attributeTable[k].IsPrimaryKey){
			if(isInsert === false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject  " + tablename + ". Primary Key should not be the part of the attributes to be updated in the local device database.");
				delete valuestable[k];
			}else if(attributeTable[k].Autogenerated === "true"){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject " + tablename + ". Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
				delete valuestable[k];
			}
		}
	}
};

kony.sync.getJSType = function(myType){
		myType = myType.toLowerCase();
		var stringTypes = {
			"string" : true,
			"character" : true,
			"java.lang.String" : true,
			"char" : true
		};
		var numberTypes = {
			"int" : true,
			"double" : true,
			"float" : true,
			"long" : true,
			"short" : true,
			"integer" : true,
			"big_decimal" : true,
			"byte" : true,
			"big_integer" : true
		};
		var booleanTypes = {
			"boolean" : true,
			"yes_no" : true
		};
		if(stringTypes[myType] === true) {
			return "string";
		}
		if (numberTypes[myType] === true) {
			return "number";
		}
		if (booleanTypes[myType] === true) {
			return "boolean";
		}
		return null;
};

kony.sync.validateLength = function (tablename, colname, colvalue, length, errorcallback) {
	sync.log.trace("Entering kony.sync.validateLength ");
	if (!kony.sync.isNull(colvalue) && kony.string.equalsIgnoreCase(kony.type(colvalue), "string") && kony.string.len(colvalue) > length) {
		sync.log.error("Length exceeds the limit for the attribute " + colname + " in " + tablename + ".\nExpected:\'" + length + "\'\nActual:\'" + kony.string.len(colvalue) + "\'");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeLengthValidationFailed, kony.sync.getValidateLengthErrMsg(tablename, colname, length, kony.string.len(colvalue))));
		return false;
	}
	return true;
};

kony.sync.validateMandatoryColumns = function(tablename, colname, colvalue, errorcallback){
	sync.log.trace("Entering Address.validateNullInsert function");
	if(kony.sync.isNull(colvalue)){
		sync.log.error("Mandatory attribute " + colname + " is missing for the SyncObject" + tablename + ".");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, tablename, colname)));
		return false;
	}
	return true;
};


kony.sync.isSyncInitialized = function (errorcallback) {
	sync.log.trace("Entering kony.sync.isSyncInitialized");
	if (!kony.sync.syncInitialized) {
		sync.log.error("Please initialize sync by calling sync.init");
		kony.sync.alert("Please initialize sync by calling sync.init");
		kony.sync.verifyAndCallClosure(errorcallback, {});
		return false;
	}
	return true;
};

kony.sync.validateInput = function (input, objectName, ormType, errorcallback) {
	sync.log.trace("Entering kony.sync.validateInput");
	if (ormType === "create") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 1)) {
			if (!kony.sync.validatePrimaryKeyField(objectName, ormType, input[0], errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "updateByPk") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 2)) {
			if (!kony.sync.validatePrimaryKeyField(objectName, ormType, input[0], errorcallback)) {
				return false;
			}
			if (!kony.sync.validateInputField(objectName, ormType, input[1], "object", errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "update") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 2)) {
			if (!kony.sync.validateInputField(objectName, ormType, input[0], "string", errorcallback)) {
				return false;
			}
			if (!kony.sync.validateInputField(objectName, ormType, input[1], "object", errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "getCount") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 1)) {
			if (!kony.sync.validateInputField(objectName, ormType, input[0], "string", errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "createAll") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 1)) {
			if (!kony.sync.validateInputField(objectName, ormType, input[0], "object", errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "updateAll") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 1)) {
			if (!kony.sync.validateInputField(objectName, ormType, input[0], "object", errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "deleteByPK") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 1)) {
			if (!kony.sync.validatePrimaryKeyField(objectName, ormType, input[0], errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "remove") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 1)) {
			if (!kony.sync.validateInputField(objectName, ormType, input[0], "string", errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "removeDeviceInstanceByPK") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 1)) {
			if (!kony.sync.validatePrimaryKeyField(objectName, ormType, input[0], errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "getAllDetailsByPK") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 1)) {
			if (!kony.sync.validatePrimaryKeyField(objectName, ormType, input[0], errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "find") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 1)) {
			if (!kony.sync.validateInputField(objectName, ormType, input[0], "string", errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "markForUploadbyPK") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 1)) {
			if (!kony.sync.validatePrimaryKeyField(objectName, ormType, input[0], errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "markForUpload") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 1)) {
			if (!kony.sync.validateInputField(objectName, ormType, input[0], "string", errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "rollbackPendingLocalChangesByPK") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 1)) {
			if (!kony.sync.validatePrimaryKeyField(objectName, ormType, input[0], errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}else if (ormType === "relationship") {
		if (kony.sync.validateArgumentLength(objectName, ormType, input.length, 1)) {
			if (!kony.sync.validatePrimaryKeyField(objectName, ormType, input[0], errorcallback)) {
				return false;
			}
		} else {
			return false;
		}
	}
	return true;
};


kony.sync.validatePrimaryKeyField = function(objName, opType, inputAttribute, errorcallback) {
	sync.log.trace("Entering kony.sync.validatePrimaryKeyField");
	if (kony.sync.isNullOrUndefined(inputAttribute)) {
		kony.sync.verifyAndCallClosure(errorcallback, "Argument type mismatch found for operation:" + objName + ".  Expected 'integer, string or object ' Actual null or undefined '");
		kony.sync.alert("Argument type mismatch found for operation:" + objName + ".  Expected 'integer, string or object' Actual 'null or undefined'");	
		return false;
	}
	var actualType = typeof(inputAttribute);
	if(!(actualType === "number" || actualType === "string" || actualType === "object")){
		kony.sync.verifyAndCallClosure(errorcallback, "Argument type mismatch found for Primary Key in operation:" + objName + ".  Expected 'integer, string or object' Actual '" + actualType + "'");
		kony.sync.alert("Argument type mismatch found for operation:" + objName + ".  Expected 'integer, string or object' Actual '" + actualType + "'");		
		return false;
	}
	return true;
};


kony.sync.validateInputField = function (objName, opType, inputAttribute, expectedType, errorcallback) {
	sync.log.trace("Entering kony.sync.validateInputField");
	if (kony.sync.isNullOrUndefined(inputAttribute)) {
		kony.sync.verifyAndCallClosure(errorcallback, "Argument type mismatch found for operation:" + objName + ".  Expected '" + expectedType + "' Actual 'null or undefined '");
		kony.sync.alert("Argument type mismatch found for operation:" + objName + ".  Expected '" + expectedType + "' Actual 'null or undefined'");
		return false;
	}
	var actualType = typeof(inputAttribute);
	if (actualType !== expectedType) {
		kony.sync.verifyAndCallClosure(errorcallback, "Argument type mismatch found for operation:" + objName + ".  Expected '" + expectedType + "' Actual '" + actualType + "'");
		kony.sync.alert("Argument type mismatch found for operation:" + objName + ".  Expected '" + expectedType + "' Actual '" + actualType + "'");
		return false;
	}
	return true;
};

kony.sync.validateArgumentLength = function (objName, ormType, actualLength, expectedLength) {
	sync.log.trace("Entering kony.sync.validateArgumentLength");
	if (actualLength < expectedLength) {
		kony.sync.alert("Insufficient number of arguments passed for operation: " + objName);
		return false;
	}
	return true;
};

kony.sync.alert = function(msg){
	if(kony.sync.isAlertEnabled){
		alert(msg);
	}
	else{
		kony.print(msg);
	}
};
//  **************** End KonySyncValidations.js*******************


