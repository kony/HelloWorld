/*
  * kony-sdk-ide Version SDK-GA-7.0.0
  */
        
/**
 * Kony namespace
 * @namespace kony
 */
if (typeof(kony) === "undefined") {
	kony = {};
}

/**
 * Constructor for creating the kony client instance.
 * @class
 * @classdesc kony Class
 * @memberof kony
 */
kony.sdk = function() {
	this.mainRef = {};
	var clientParams = {};
	this.tokens = {};
	this.currentClaimToken = null;
	this.currentBackEndToken = null;
	var userId = "";
	var sessionId = "";

	if (kony.internal && kony.internal.sdk && kony.internal.sdk.Services) {
		this.internalSdkObject = new kony.internal.sdk.Services();
	}

	var localDataStore = new konyDataStore();
	this.getDataStore = function() {
		return localDataStore;
	}
	this.setDataStore = function(dataStore) {
		localDataStore = dataStore;
	}

	this.getUserId = function() {
		return userId;
	}
	this.setCurrentUserId = function(newUserID) {
		userId = newUserID;
	}
	this.getSessionId = function() {
		return sessionId;
	}
	this.setSessionId = function(newSessionId) {
		sessionId = newSessionId;
	}
	this.setClientParams = function(clientParamsMap) {
		clientParams = clientParamsMap;
	}

	this.getClientParams = function() {
		return clientParams;
	}
}

kony.mbaas = kony.sdk;
kony.sdk.isDebugEnabled = true;
kony.sdk.isInitialized = false;
kony.sdk.currentInstance = null;
kony.sdk.isLicenseUrlAvailable = true;
kony.sdk.constants = kony.sdk.constants || {};
kony.sdk.version = "SDK-GA-7.0.0";
kony.sdk.logger = new konyLogger();
kony.sdk.syncService = null;
kony.sdk.nativestore = kony.sdk.nativestore || new konyDataStore();
kony.sdk.getDefaultInstance = function() {
	return kony.sdk.currentInstance;
};

 // This is to be deprecated with getDefaultInstance
kony.sdk.getCurrentInstance = function() {
	return kony.sdk.currentInstance;
};

kony.sdk.claimsRefresh = function(callback, failureCallback) {
	var konyRef = kony.sdk.getCurrentInstance();
	var logger = new konyLogger();
	var networkProvider = new konyNetworkProvider();
	var loginWithAnonymousProvider = function(successCallback, failureCallback) {
		var identityObject = konyRef.getIdentityService("$anonymousProvider");
		identityObject.login(null,
			function(res) {
				successCallback();
			},
			function(res) {
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getAuthErrObj(res));
			});
	};

	if (konyRef.currentClaimToken === null) {
		logger.log("claims Token is Unavialable");
		if (konyRef.isAnonymousProvider) {
			loginWithAnonymousProvider(callback, failureCallback);
		} else {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getNullClaimsTokenErrObj());
		}
	} else if (konyRef.claimTokenExpiry && new Date().getTime() > konyRef.claimTokenExpiry) {
		if (konyRef.isAnonymousProvider) {
			loginWithAnonymousProvider(callback, failureCallback);		
		} else {
			logger.log("claims token has expired. fetching new token..")
			var _serviceUrl = stripTrailingCharacter(konyRef.rec.url, "/");
			var _url = _serviceUrl + "/claims";
			logger.log("service url is " + _url);
			if (konyRef.currentRefreshToken === null) {
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getNullRefreshTokenErrObj());
			} else {
				networkProvider.post(_url, {}, {
						"Authorization": konyRef.currentRefreshToken,
						"Content-Type": "application/x-www-form-urlencoded"
					}, function(tokens) {
					    logger.log("refresh success..acquiring new tokens");
					    kony.sdk.processClaimsSuccessResponse(tokens,konyRef,true,callback);  
					},
					function(data) {
					     logger.log("failed to acquire refresh token");
						 kony.sdk.processClaimsErrorResponse(data,konyRef,true,failureCallback);  
					});
			}
		}
	} else {
		callback();
	}
};

kony.sdk.processClaimsSuccessResponse=function(data,konyRef,isAsync,callBack){
    data = kony.sdk.formatSuccessResponse(data);
	konyRef.currentClaimToken = data.claims_token.value;
	konyRef.claimTokenExpiry = data.claims_token.exp;
	konyRef.currentRefreshToken = data.refresh_token;
	if(!isAsync){
	   return { "message" :"success"};
    }
    else if(callBack){
       callBack();
    }
}
kony.sdk.processClaimsErrorResponse=function(data,konyRef,isAsync,callBack){
	/*reset the claims token*/
	konyRef.currentClaimToken = null;
	konyRef.claimTokenExpiry = null;
	konyRef.currentRefreshToken = null;
	//setting the anonymous provider as true to access the public protected urls without any issue
	konyRef.isAnonymousProvider = true;
	if(!isAsync){
		return kony.sdk.error.getAuthErrObj(data);
	}
	else if(callBack){
	    kony.sdk.verifyAndCallClosure(callBack, kony.sdk.error.getAuthErrObj(data));
	}
}
kony.sdk.prototype.setIntegrationServiceEndpoint = function(serviceName, endPoint) {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before this, else your changes will be overridden when init is called");
	}
	var konyRef = kony.sdk.getCurrentInstance();
	if (!konyRef.integsvc) {
		throw new Exception(Errors.INTEGRATION_FAILURE, "no valid integration services available");
	}
	if (!konyRef.integsvc[serviceName]) {
		throw new Exception(Errors.INTEGRATION_FAILURE, "no valid integration services available for " + serviceName);
	}
	konyRef.integsvc[serviceName] = endPoint;
};

kony.sdk.prototype.setObjectServiceEndpoint = function(serviceName, endPoint) {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before this, else your changes will be overridden when init is called");
	}
	var konyRef = kony.sdk.getCurrentInstance();
	if (!konyRef.objectsvc) {
		throw new Exception(Errors.OBJECT_FAILURE, "no valid Object services available");
	}
	if (!konyRef.objectsvc[serviceName]) {
		throw new Exception(Errors.OBJECT_FAILURE, "no valid Object services available for " + serviceName);
	}
	konyRef.objectsvc[serviceName] = endPoint;
};

kony.sdk.prototype.setAuthServiceEndpoint = function(providerName, endPoint) {

	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before this, else your changes will be overridden when init is called");
	}

	var konyRef = kony.sdk.getCurrentInstance();

	if (!konyRef.login) {
		throw new Exception(Errors.AUTH_FAILURE, "no valid authentication services available");
	}

	var i = 0;
	for (i = 0; i < konyRef.login.length; i++) {
		var rec = konyRef.login[i];
		if (rec.prov.toUpperCase() === providerName.toUpperCase()) {
			break;
		}
	}

	if (i === konyRef.login.length) {
		throw new Exception(Errors.AUTH_FAILURE, "no valid authentication services available for " + providerName);
	}

	konyRef.login[i].url = endPoint;
};

kony.sdk.prototype.setSyncServiceEndpoint = function(endPoint) {

	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before this, else your changes will be overridden when init is called");
	}

	var konyRef = kony.sdk.getCurrentInstance();

	if (!konyRef.sync) {
		throw new Exception(Errors.SYNC_FAILURE, "no valid sync services available");
	}

	//assuming only one sync service per app
	konyRef.sync.url = endPoint;
}

kony.sdk.prototype.setReportingServiceEndPoint = function(serviceType, endPoint) {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before this, else your changes will be overridden when init is called");
	}

	var konyRef = kony.sdk.getCurrentInstance();
	if (!serviceType) {
		throw new Exception(Errors.METRICS_FAILURE, serviceType + " is not a valid reporting service");
	}
	serviceType = serviceType.toLowerCase();
	if (serviceType === "custom") {
		konyRef.customReportingURL = endPoint;
	} else if (serviceType === "session") {
		konyRef.sessionReportingURL = endPoint;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, serviceType + " is not a valid reporting service");
	}
}

kony.sdk.prototype.setMessagingServiceEndPoint = function(endPoint) {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before this, else your changes will be overridden when init is called");
	}

	var konyRef = kony.sdk.getCurrentInstance();

	if (!konyRef.messagingsvc) {
		throw new Exception(Errors.MESSAGING_FAILURE, "no valid reporting services available");
	}

	konyRef.messagingsvc.url = endPoint;
}

/**
 * Init success callback method.
 * @callback initSuccessCallback
 * @param {json} mainRef - Application Configuration
 */

/**
 * Init failure callback method.
 * @callback initFailureCallback
 */

/**
 * Initialization method for the kony SDK.
 * This method will fetch the app configuration from the kony server and stores in memory.
 * This method has to be invoked before invoking any other SDK methods.
 * @param {string} appKey - Appkey of the kony application
 * @param {string} appSecret - App Secret of the kony application
 * @param {string} serviceUrl - URL of the kony Server
 * @param {initSuccessCallback} successCallback  - Callback method on success
 * @param {initFailureCallback} failureCallback - Callback method on failure
 */
kony.sdk.prototype.init = function(appKey, appSecret, serviceUrl, successCallback, failureCallback) {
	var logger = new konyLogger();
	if (!(appKey && appSecret && serviceUrl)) {
		logger.log("### init:: Invalid credentials passed");
		kony.sdk.verifyAndCallClosure(failureCallback, "Invalid initialization parameters passed. Please check appKey, appSecret and ServiceUrl parameters");
		return;
	}
	var networkProvider = new konyNetworkProvider();
	serviceUrl = serviceUrl.trim();
	this.mainRef.serviceUrl = serviceUrl;
	var konyRef = this;

	logger.log("### init:: calling GET on appConfig to retrieve servicedoc");

	networkProvider.post(
		serviceUrl,
		null, {
			"X-Kony-App-Key": appKey,
			"X-Kony-App-Secret": appSecret,
			"X-HTTP-Method-Override": "GET"
		},
		function(data) {
			data = kony.sdk.formatSuccessResponse(data);
			logger.log("### init::_doInit fetched servicedoc successfuly");
			logger.log("### init:: retrieved data from service doc");
			logger.log(data);
			konyRef.mainRef.config = data;
			konyRef.servicedoc = data;
			konyRef.mainRef.appId = data.appId;
			var processServiceDocResult = konyRef.initWithServiceDoc(appKey, appSecret, data);
			if (processServiceDocResult === true) {
				logger.log("### init::_doInit processing service document successful");
				var svcDataStr = JSON.stringify(data);
				logger.log("### init::_doInit saving done. Calling success callback");
				kony.sdk.initiateSession(konyRef);
				var identityObject = kony.sdk.getCurrentInstance().getIdentityService("$anonymousProvider");
				identityObject.login(null,
					function(res) {
						kony.sdk.verifyAndCallClosure(successCallback, konyRef.mainRef);
					},
					function(res) {
						kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getAuthErrObj(res));
					});
			} else {
				logger.log("### init::_doInit processing servicedoc failed. Calling failure callback");
				kony.sdk.verifyAndCallClosure(failureCallback, JSON.stringify(processServiceDocResult));
			}
		},
		function(data) {
			logger.log("### init::_doInit fetching service document from Server failed" + data);
			logger.log("### init::_doInit calling failure callback");
			kony.sdk.isInitialized = false;
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getAuthErrObj(data));
		});
};


kony.sdk.prototype.initWithServiceDoc = function(appKey, appSecret, serviceDoc) {
	konyRef = this;
	kony.sdk.currentInstance = this;
	if (serviceDoc instanceof kony.sdk.serviceDoc) {
		var servConfig = serviceDoc.toJSON();
		processServiceDocMap(servConfig);
	} else {
		return processServiceDocMap(serviceDoc);
	}
	
	
	function processServiceDocMap(servConfig) {
		var logger = new konyLogger();


		for (var item in servConfig) {
			if (kony.sdk.isEmptyObject(servConfig[item])) {
				delete servConfig[item];
			}
		}

		logger.log("### init::_doInit::_processServiceDoc" + JSON.stringify(servConfig));
		try {
			konyRef.mainRef.appKey = appKey;
			konyRef.mainRef.appSecret = appSecret;
			konyRef.mainRef.appId = servConfig.appId;

			/* if (!servConfig.baseId) {
				throw new Exception(Errors.INIT_FAILURE, "invalid baseId " + servConfig.baseId);
			} */
			konyRef.mainRef.baseId = servConfig.baseId;

			/* if (!servConfig.name) {
				throw new Exception(Errors.INIT_FAILURE, "invalid name " + servConfig.name);
			} */
			konyRef.mainRef.name = servConfig.name;

			if (servConfig.login) {
				konyRef.login = servConfig.login;
			} else {
				konyRef.login = [];
			}

			var url = servConfig.selflink;
			if (url) {
				var lastPos = url.indexOf("/appconfig");
				if (lastPos != -1) {
					url = url.slice(0, lastPos);
				} else {
					throw new Exception(Errors.INIT_FAILURE, "invalid self link");
				}
				var anonymousLoginProvider = {};
				anonymousLoginProvider.type = "anonymous";
				anonymousLoginProvider.url = url;
				anonymousLoginProvider.prov = "$anonymousProvider";
				konyRef.login.push(anonymousLoginProvider);
			}

			if (typeof(servConfig.integsvc) !== 'undefined') {
				logger.log("### init::_doInit::_processServiceDoc parsing Integration services");
				konyRef.integsvc = servConfig.integsvc;
				logger.log("### init::_doInit::konyRef integration Services" + JSON.stringify(konyRef.integsvc));
			}
			if (typeof(servConfig.services_meta) === 'object') {
				kony.sdk.util.populateIndividualServiceLists(servConfig,konyRef);
			}
			if (typeof(servConfig.messagingsvc) !== 'undefined') {
				logger.log("### init::_doInit::_processServiceDoc parsing Messaging services");
				konyRef.messagingsvc = servConfig.messagingsvc;
			}

			if (typeof(servConfig.sync) !== 'undefined') {
				konyRef.sync = servConfig.sync;
			}
			if(kony.sdk.isLicenseUrlAvailable) {
				if (servConfig.reportingsvc && servConfig.reportingsvc.custom && servConfig.reportingsvc.session) {
					konyRef.customReportingURL = servConfig.reportingsvc.custom;
					konyRef.sessionReportingURL = servConfig.reportingsvc.session;
				} else {
					throw new Exception(Errors.INIT_FAILURE, "invalid url for reporting service");
				}
			}

			if (konyRef.internalSdkObject) {
				konyRef.internalSdkObject.initWithServiceDoc(appKey, appSecret, servConfig);
				if (konyRef.internalSdkObject.setClientParams) {
					konyRef.internalSdkObject.setClientParams(konyRef.getClientParams());
				}
				logger.log("### init::internal sdk object initialized");
			}
			logger.log("### init::_doInit::_processServiceDoc parsing service document done");
			kony.sdk.isInitialized = true;
			konyRef.setCurrentUserId("");
			if (konyRef.metricsServiceObject && konyRef.metricsServiceObject.setUserId) {
				konyRef.metricsServiceObject.setUserId("");
			}
			if(kony.setUserID){
				kony.setUserID("");
			}
			if (kony.sdk.metric) {
					kony.sdk.metric.flushEvents();
		    }
			return true;
		} catch (err) {
			logger.log("### init::_doInit::_processServiceDoc failed with an exception: " + err);
			return ("processing the ServiceDoc failed with an exception: " + JSON.stringify(err));
		}

	}
};

kony.sdk.prototype.sessionChangeHandler = function(changes) {

	var konyRef = kony.sdk.getCurrentInstance();
	var sessionId = null;
	var userId = null;
	if (changes["sessionId"] != undefined) {
		sessionId = changes["sessionId"];
		konyRef.setSessionId(sessionId);
		if (konyRef.metricsServiceObject && konyRef.metricsServiceObject.setSessionId) {
			konyRef.metricsServiceObject.setSessionId(sessionId);
		}
	}
	if (changes["userId"] != undefined) {
		userId = changes["userId"];
		konyRef.setCurrentUserId(userId);
		if (konyRef.metricsServiceObject && konyRef.metricsServiceObject.setUserId) {
			konyRef.metricsServiceObject.setUserId(userId);
		}
	}
	// if (konyRef.internalSdkObject) {
	// 	//TODO implement across native sdk's ios/andriod
	// 	//konyRef.internalSdkObject.sessionChangeHandler(changes);
	// 	if(sessionId) {
	// 		konyRef.internalSdkObject.setSessionId(sessionId);
	// 	}
	// 	if(userId) {
	// 		konyRef.internalSdkObject.setUserId(userId);
	// 	}
	// }
};


if (typeof(kony.sdk) === "undefined") {
	kony.sdk = {};
}

if (typeof(kony.sdk.error) === "undefined") {
	kony.sdk.error = {};
}

kony.sdk.error.getAuthErrObj = function(errResponse) {
	if (errResponse && errResponse.httpresponse) {
		delete errResponse.httpresponse;
	}
	if (errResponse && (errResponse.opstatus == 1013 || errResponse.opstatus == 1011)) {
		errResponse["message"] = errResponse["errmsg"];
		delete errResponse.errmsg;
	}
	try {
		var mfcode = errResponse["mfcode"];
		var message = errResponse["message"];
		var details = errResponse["details"];
		if (mfcode) {
			return kony.sdk.error.getMFcodeErrObj(mfcode, message, details, "");
		}
		return errResponse;
	} catch (err) {
		return errResponse;
	}
}

kony.sdk.error.getNullClaimsTokenErrObj = function() {
	var errorObj = {};
	//TODO move error code and constants in to constants.
	errorObj.opstatus = kony.sdk.errorcodes.cliams_token_null
	errorObj.message = kony.sdk.errormessages.cliams_token_null
	errorObj.details = {};
	errorObj.mfcode = "";
	return errorObj;
}

kony.sdk.error.getNullRefreshTokenErrObj = function() {
	var errorObj = {};
	//TODO move error code and constants in to constants.
	errorObj.opstatus = kony.sdk.errorcodes.invalid_session_or_token_expiry
	errorObj.message = kony.sdk.errormessages.invalid_session_or_token_expiry
	errorObj.details = {};
	errorObj.mfcode = "";
	return errorObj;
}

kony.sdk.error.getIntegrationErrObj = function(errResponse) {
	try {
		var mfcode = errResponse["mfcode"];
		var message = errResponse["errmsg"];
		var details = errResponse["mferrmsg"];
		var service = errResponse["service"];
		if (!service) {
			service = "";
		}
		if (!details) {
			details = "";
		}
		var errorMessagePrefixForIntegration = "";
		if (service) {
			errorMessagePrefixForIntegration = "Integration Service Request Failed for " + service + ":";
		} else {
			errorMessagePrefixForIntegration = "Integration Service Request Failed:";
		}
		if (mfcode) {
			return kony.sdk.error.getMFcodeErrObj(mfcode, message, details, errorMessagePrefixForIntegration);
		}
		return errResponse;
	} catch (err) {
		return errResponse;
	}
}

kony.sdk.error.getMFcodeErrObj = function(mfcode, message, details, errMessagePrefix) {
	var errorObj = {};
	errorObj.details = {};
	if (details) {
		errorObj.details = details;
	}
	errorObj.mfcode = mfcode;
	if (mfcode === "Auth-4") {
		if (!message) {
			message = kony.sdk.errormessages.invalid_user_credentials
		}
		errorObj.opstatus = kony.sdk.errorcodes.invalid_user_credentials
		errorObj.message = errMessagePrefix + message;

	} else if (mfcode === "Auth-9") {
		if (!message) {
			message = kony.sdk.errormessages.invalid_app_credentials
		}
		errorObj.opstatus = kony.sdk.errorcodes.invalid_app_credentials
		errorObj.message = errMessagePrefix + message;
	} else if (mfcode === "Auth-3") {
		if (!message) {
			message = kony.sdk.errormessages.invalid_user_app_credentials
		}
		errorObj.opstatus = kony.sdk.errorcodes.invalid_user_app_credentials
		errorObj.message = errMessagePrefix + message;
	} else if ((mfcode === "Auth-5") || (mfcode === "Auth-6") || (mfcode === "Gateway-31") || (mfcode === "Gateway-33") || (mfcode === "Gateway-35") || (mfcode === "Gateway-36") || (mfcode === "Auth-46") || (mfcode === "Auth-55")) {
		errorObj.opstatus = kony.sdk.errorcodes.invalid_session_or_token_expiry
		errorObj.message = errMessagePrefix + kony.sdk.errormessages.invalid_session_or_token_expiry
	} else if (mfcode === "Auth-7" || mfcode === "Auth-27") {
		if (!message) {
			message = errMessagePrefix + kony.sdk.errormessages.invalid_user_app_services
		}
		errorObj.opstatus = kony.sdk.errorcodes.invalid_user_app_services
		errorObj.message = message;
	} else {
		errorObj.opstatus = kony.sdk.errorcodes.default_code
		errorObj.message = errMessagePrefix + kony.sdk.errormessages.default_message
	}
	return errorObj;
}

function getAuthErrorMessage(mfcode) {
	if (mfcode === "Auth-4") {
		return kony.sdk.errormessages.invalid_user_credentials
	} else if (mfcode === "Auth-9") {
		return kony.sdk.errormessages.invalid_app_credentials
	} else if (mfcode === "Auth-3") {
		return kony.sdk.errormessages.invalid_user_app_credentials
	} else if ((mfcode === "Auth-5") || (mfcode === "Auth-6") || (mfcode === "Gateway-31") || (mfcode === "Gateway-33") || (mfcode === "Gateway-35") || (mfcode === "Gateway-36") || (mfcode === "Auth-46") || (mfcode === "Auth-55")) {
		return kony.sdk.errormessages.invalid_session_or_token_expiry
	} else if (mfcode === "Auth-7" || mfcode === "Auth-27") {
		return kony.sdk.errormessages.invalid_user_app_services
	} else {
		return mfcode + ":" + kony.sdk.errormessages.default_message
	}
}

kony.sdk.error.getObjectServiceErrObj = function(errResponse) {
	try {
		var mfcode = errResponse["mfcode"];
		var message = errResponse["errmsg"];
		var details = errResponse["mferrmsg"];
		var service = errResponse["service"];
		if (!service) {
			service = "";
		}
		if (!details) {
			details = "";
		}
		var errorMessagePrefixForIntegration = "";
		if (service) {
			errorMessagePrefixForIntegration = "Object Service Request Failed for " + service + ":";
		} else {
			errorMessagePrefixForIntegration = "Object Service Request Failed:";
		}
		
		if (mfcode) {
			return kony.sdk.error.getMFcodeErrObj(mfcode, message, details, errorMessagePrefixForIntegration);
		}
		return errResponse;
	} catch (err) {
		return errResponse;
	}
}

kony.sdk.error.getClientErrObj = function(errCode,errMsg){
	var errObj = new Object();
	errObj.opstatus = kony.sdk.errorcodes.clientvalidation_error_opstatus;
	errObj.errmsg = errMsg;
	errObj.errcode = errCode;
	return errObj;
}
if (typeof(kony.sdk) === "undefined") {
	kony.sdk = {};
}

if (typeof(kony.sdk.errorcodes) === "undefined") {
	kony.sdk.errorcodes = {};
}

if (typeof(kony.sdk.errormessages) === "undefined") {
	kony.sdk.errormessages = {};
}

kony.sdk.errorcodes.invalid_user_credentials = 101;
kony.sdk.errormessages.invalid_user_credentials = "Invalid User Credentials.";

kony.sdk.errorcodes.invalid_app_credentials = 102;
kony.sdk.errormessages.invalid_app_credentials = "Invalid App Credentials.";

kony.sdk.errorcodes.invalid_user_app_credentials = 103;
kony.sdk.errormessages.invalid_user_app_credentials = "Invalid User/App Credentials.";

kony.sdk.errorcodes.invalid_session_or_token_expiry = 104;
kony.sdk.errormessages.invalid_session_or_token_expiry = "Session/Token got invalidated in the backend.Please login.";

kony.sdk.errorcodes.invalid_user_app_services = 105;
kony.sdk.errormessages.invalid_user_app_services = "Invalid provider in appServices.";

kony.sdk.errorcodes.cliams_token_null = 106;
kony.sdk.errormessages.cliams_token_null = "Claims Token is Unavialable";

kony.sdk.errorcodes.default_code = 100;
kony.sdk.errormessages.default_message = "UnhandledMFcode";

kony.sdk.errorcodes.unknown_error_code = 1000;
kony.sdk.errormessages.unknown_error_message = "An unknown error has occured";

kony.sdk.errorcodes.connectivity_error_code = 1011;
kony.sdk.errormessages.connectivity_error_message = "An error occurred while making the request. Please check device connectivity, server url and request parameters";

kony.sdk.errorcodes.invalid_json_code = 1013;
kony.sdk.errormessages.invalid_json_message = "Invalid Json response was returned";

kony.sdk.errorcodes.request_timed_out_code = 1014;
kony.sdk.errormessages.request_timed_out_message = "Request to server has timed out";

kony.sdk.errorcodes.offline_auth_failed = 1015;
kony.sdk.errormessages.offline_auth_failed = "Offline Authentication failed, User should atleast login once when network connectivity is available."

kony.sdk.errorcodes.servicedoc_unavailable= 1016;
kony.sdk.errormessages.servicedoc_unavailable = "MBAAS app is not initialized properly. Service document is unavailable.";

kony.sdk.errorcodes.clientvalidation_error_opstatus = 112233;

//Object Service Error Messages
kony.sdk.errorcodes.invalid_dataobject_instance = 90001;
kony.sdk.errormessages.invalid_dataobject_instance = "Provided dataobject is invalid and should be instance of kony.sdk.dto.DataObject";

kony.sdk.errorcodes.primarykey_unavailable = 90002;
kony.sdk.errormessages.primarykey_unavailable = "Primary Keys missing, Operation Failed";

kony.sdk.errorcodes.null_or_undefined = 90003;
kony.sdk.errormessages.null_or_undefined = " cannot be null or undefined";

kony.sdk.errorcodes.transaction_failed = 90004;
kony.sdk.errormessages.transaction_failed = "Some error occurred, Operation Failed";

kony.sdk.errorcodes.norecords_to_delete = 90005;
kony.sdk.errormessages.norecords_to_delete = "No records deleted with the specified criteria";

kony.sdk.errorcodes.invalid_queryparams_instance = 90006;
kony.sdk.errormessages.invalid_queryparams_instance = "Provided queryParams is invalid and should be a json object";

kony.sdk.errorcodes.invalid_object = 90008;
kony.sdk.errormessages.invalid_object = "Invalid object name, Operation Failed.";
/**
 * Method to create the Identity service instance with the provided provider name.
 * @param {string} providerName - Name of the provider
 * @returns {IdentityService} Identity service instance
 */

 kony.sdk.offline = kony.sdk.offline || {};
 
kony.sdk.prototype.getIdentityService = function(providerName) {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	var logger = new konyLogger();
	var provider = null;
	if (providerName) {
		if (this.login != null) {
			for (var i = 0; i < this.login.length; i++) {
				var rec = this.login[i];
				if ((rec.alias && rec.alias.toUpperCase() === providerName.toUpperCase()) || (rec.prov.toUpperCase() === providerName.toUpperCase())) {
					provider = new IdentityService(this, rec);
					break;
				}

			}
			if (provider === null) {
				throw new Exception(Errors.AUTH_FAILURE, "Invalid providerName");
			}
			//TODO: what if the providerName is not passed by the user? 
			logger.log("### auth:: returning authService for providerName = " + provider.getProviderName());
			return provider;
		}
	} else {
		throw new Exception(Errors.AUTH_FAILURE, "Invalid providerName");
	}
};
/**
 * Should not be called by the developer.
 * @class
 * @classdesc Identity service instance for handling login/logout calls.
 */
function IdentityService(konyRef, rec) {
	var logger = new konyLogger();
	var networkProvider = new konyNetworkProvider();
	var serviceObj = rec;
	konyRef.rec = rec;
	var mainRef = konyRef.mainRef;
	var user_attributes={};
	var isLoggedin = false;
	if (serviceObj === undefined || serviceObj.prov == undefined || serviceObj.type == undefined) {
		throw new Exception(Errors.INIT_FAILURE, "Invalid service url and service type");
	}

	var _type = serviceObj.type;
	var _serviceUrl = stripTrailingCharacter(serviceObj.url, "/");;
	var _providerName = serviceObj.prov;

	logger.log("### AuthService:: initialized for provider " + _providerName + " with type " + _type);

	var dsKey = _serviceUrl + "::" + _providerName + "::" + _type + "::RAW";

	function resetAllCurrentTokens(konyRef, _providerName) {
		kony.sdk.resetCacheKeys(konyRef, _providerName);
	}

	/**
	 * Login success callback method.
	 * @callback loginSuccessCallback
	 * @param {string} claimsToken - Claims token value
	 */

	/**
	 * Login failure callback method.
	 * @callback loginFailureCallback
	 * @param {json} error - Error information
	 */
	/**
	 * Login with the given credentials asynchronously and executes the given callback.
	 * @param {object} options - User name and password
	 * @param {loginSuccessCallback} successCallback  - Callback method on success
	 * @param {loginFailureCallback} failureCallback - Callback method on failure
	 */
	this.login = function(options, successCallback, failureCallback) {
		
		konyRef.isAnonymousProvider = false;
		logger.log("### AuthService::login Invoked login for provider " + _providerName + " of type " + _type);
		if (typeof(options) == 'undefined') {
			throw new Exception(Errors.AUTH_FAILURE, "Missing required number of arguments to login function");
		}
		if(options && options["loginOptions"])
			kony.sdk.offline.isOfflineEnabled = options["loginOptions"]["isOfflineEnabled"] || false;
		else
			kony.sdk.offline.isOfflineEnabled = false;
			
		function invokeAjaxCall(url, params, headers) {

			if (!headers) {
				headers = {};
			}
			headers["X-Kony-App-Key"] = mainRef.appKey;
			headers["X-Kony-App-Secret"] = mainRef.appSecret;
			headers["X-Kony-SDK-Type"] = kony.sdk.getSdkType();
			headers["X-Kony-SDK-Version"] = kony.sdk.version;
			headers["X-Kony-Platform-Type"] = kony.sdk.getPlatformName();
			headers["Accept"] = "application/json";

			var endPointUrl = null;
			if (_type === "anonymous") {
				endPointUrl = _serviceUrl + url;
			} else {
				endPointUrl = _serviceUrl + url + "?provider=" + _providerName;
				params["provider"] = _providerName;
			}
			//Save the user entered form data to a temporary store and only if login is successful, we store the value in this to proper credentials store. 
			if (kony.sdk.getSdkType() === "js" && (_type === "basic" || (options && options["userid"] && options["password"])) && kony.sdk.offline.isOfflineEnabled === true ) {
				kony.sdk.offline.saveTempUserCredentials(options, true);
				
				if(!kony.sdk.isNetworkAvailable()){
					kony.sdk.offline.loginOffline(function(data1){
						logger.log("successfully authenticated offline");
						processLoginSuccessResponse(data1,konyRef,true,successCallback);
					},function(error){
						logger.log("offline authentication also failed");
						resetAllCurrentTokens(konyRef, _providerName);
						if(failureCallback){
							failureCallback(kony.sdk.error.getAuthErrObj(error));
						}
					});
					return;
				}
			}
			networkProvider.post(endPointUrl, params, headers,
				function(data) {
					processLoginSuccessResponse(data,konyRef,true,successCallback)
				},
				function(data) {
					processLoginErrorResponse(data,konyRef,true,failureCallback) 
				});
		}

		if (_type === "anonymous") {
			konyRef.isAnonymousProvider = true;
			logger.log("### AuthService::login Adapter type is anonymous ");
			invokeAjaxCall("/login", {}, {
				"Content-Type": "application/x-www-form-urlencoded"
			});
		} else if (_type == "basic") {
			var mandatory_fields = ["userid", "password"];
			if (serviceObj.mandatory_fields && kony.sdk.isArray(serviceObj.mandatory_fields)) {
				mandatory_fields = serviceObj.mandatory_fields;
			}
			for (var i = 0; i < mandatory_fields.length; ++i) {
				if (kony.sdk.isNullOrUndefined(options[mandatory_fields[i]])) {
					throw new Exception(Errors.AUTH_FAILURE, " Require " + mandatory_fields[i]);
				}
			}
			var payload = {};
			var encryptedStorage = {};
			for (var option in options) {
				payload[option] = options[option];
			}
			payload["provider"] = _providerName;

			logger.log("### AuthService::login Adapter type is basic ");
			invokeAjaxCall("/login", payload, {
				"Content-Type": "application/x-www-form-urlencoded"
			});
		} else {
			if (options.userid && options.password) {
				var payload = {};
				for(var option in options){
					payload[option] = options[option];
				}
				payload["provider"] = _providerName;
				invokeAjaxCall("/login",payload);
			} else {
				logger.log("### AuthService::login Adapter type is " + _type);
				OAuthHandler(_serviceUrl, _providerName, invokeAjaxCall, _type);
			}
		}
	};
    

    var processLoginSuccessResponse = function(data,konyRef,isAsync,callBack){
        data = kony.sdk.formatSuccessResponse(data);
		logger.log("### AuthService::login successful. Retrieved Data:: ");
		konyRef.tokens[_providerName] = data;
		logger.log("### AuthService::login extracted token. Calling success callback");
		konyRef.currentClaimToken = data.claims_token.value;
		konyRef.currentBackEndToken = data.provider_token;
		konyRef.claimTokenExpiry = data.claims_token.exp;
		konyRef.currentRefreshToken = data.refresh_token;
		
		if (_type !== "anonymous") {
			isLoggedin = true;
		}
		
		if (data.profile && data.profile!=undefined && data.profile.user_attributes!=undefined) {
			user_attributes = data.profile.user_attributes;
		}		
		if (!konyRef.getUserId() && data.profile && data.profile.userid) {
			konyRef.setCurrentUserId(data.profile.userid);
			if (konyRef.metricsServiceObject && konyRef.metricsServiceObject.setUserId) {
				konyRef.metricsServiceObject.setUserId(data.profile.userid);
			}
			if(kony.setUserID){
				kony.setUserID(data.profile.userid);
			}
		}
		logger.log("userid is " + konyRef.getUserId());

		//We store the user credentials and the success auth response only on successful online login.
		if (_type === "basic"){
			if(kony.sdk.getSdkType() === "js" && kony.sdk.offline.isOfflineEnabled === true && kony.sdk.isNetworkAvailable()) {
				kony.sdk.offline.updateSuccessUserCredentials();
				kony.sdk.offline.saveUserAuthInformation(data);
			}
			else if(kony.sdk.getSdkType() === "js" && kony.sdk.offline.isOfflineEnabled === false){
				kony.sdk.offline.removeUserCredentials();
				kony.sdk.offline.removeUserAuthInformation();
			}
		}

		if(!isAsync){
			return {};
		}
		else if(callBack){
			kony.sdk.verifyAndCallClosure(callBack, {});
		}
    }

    var processLoginErrorResponse = function(data,konyRef,isAsync,callBack){
    	logger.log("### AuthService::login login failure. retrieved data:: ");
		logger.log(data);
		logger.log("### AuthService::login Calling failure callback");

		/*resetting all the token in case of error */
		resetAllCurrentTokens(konyRef, _providerName);
		if(!isAsync){
			return kony.sdk.error.getAuthErrObj(data);
		}
		else if(callBack){
			callBack(kony.sdk.error.getAuthErrObj(data));
		}
    }
    
	/**
	 * Login anonymous with the given credentials synchronously and executes the given callback.
	 * @param {object} options - User name and password
	 */
    this.anonymousLoginSync = function(options) {

		konyRef.isAnonymousProvider = false;
		logger.log("### AuthService::login Invoked login for provider " + _providerName + " of type " + _type);
		if (typeof(options) == 'undefined') {
			throw new Exception(Errors.AUTH_FAILURE, "Missing required number of arguments to login function");
		}

		function invokeAjaxCall(url, params, headers) {

			if (!headers) {
				headers = {};
			}
			headers["X-Kony-App-Key"] = mainRef.appKey;
			headers["X-Kony-App-Secret"] = mainRef.appSecret;
			headers["Accept"] = "application/json";

			var endPointUrl = null;
			if (_type === "anonymous") {
				endPointUrl = _serviceUrl + url;
			} else {
				endPointUrl = _serviceUrl + url + "?provider=" + _providerName;
				params["provider"] = _providerName;
			}

			var data = networkProvider.postSync(endPointUrl, params, headers);
			if(data.opstatus == 0){
               return processLoginSuccessResponse(data,konyRef,false);
			}
			else{
			   return processLoginErrorResponse(data,konyRef,false);
			}
		}
        konyRef.isAnonymousProvider = true;
		logger.log("### AuthService::login Adapter type is anonymous ");
		return invokeAjaxCall("/login", {}, {
			"Content-Type": "application/x-www-form-urlencoded"
		}); 
	};
	/**
	 * Logout success callback method.
	 * @callback logoutSuccessCallback
	 */

	/**
	 * Logout failure callback method.
	 * @callback logoutFailureCallback
	 */
	/**
	 * Logout and executes the given callback.
	 * @param {logoutSuccessCallback} successCallback  - Callback method on success
	 * @param {logoutFailureCallback} failureCallback - Callback method on failure
	 */
	this.logout = function(successCallback, failureCallback) {
		function logoutHandler() {
			_logout(successCallback, failureCallback);
		}
		kony.sdk.claimsRefresh(logoutHandler, failureCallback);
	};

	function _logout(successCallback, failureCallback) {
		logger.log("### AuthService::logout invoked on provider " + _providerName + " of type " + _type);
		var claimsTokenValue = null;
		if (konyRef.tokens[_providerName]) {
			claimsTokenValue = konyRef.tokens[_providerName]["claims_token"]["value"];
			delete konyRef.tokens[_providerName];
		}

		networkProvider.post(_serviceUrl + "/logout", {}, {
				"Authorization": claimsTokenValue,
				"Accept" : "*/*"
			},
			function(data) {
				logger.log("AuthService::logout successfully logged out. Calling success callback");
				isLoggedin = false;
                resetAllCurrentTokens(konyRef, _providerName);
				kony.sdk.verifyAndCallClosure(successCallback, {});
			},
			function(err) {
					logger.log("### AuthService::logout logged out Failed. Calling failure callback");
					kony.sdk.verifyAndCallClosure(failureCallback,kony.sdk.error.getAuthErrObj(err));
			});
	};
	/**
	 * Fetch backend token callback method.
	 * @callback fetchBackendTokenSuccessCallback
	 * @param {string} providerToken - Provider token value
	 */

	/**
	 * Fetch backend token callback method.
	 * @callback fetchBackendTokenFailureCallback
	 * @param {json} error - Error information
	 */
	/**
	 * Fetch the backend datasource token.
	 * @param {boolean} fromserver - Flag to force fetch from server only.
	 * @param {object} options - Options
	 * @param {fetchBackendTokenSuccessCallback} successCallback  - Callback method on success
	 * @param {fetchBackendTokenFailureCallback} failureCallback - Callback method on failure
	 */
	this.getBackendToken = function(fromserver, options, successCallback, failureCallback) {
		logger.log("### AuthService::getBackendToken called for provider " + _providerName + " of type " + _type);
		if (fromserver != undefined && fromserver === true) {
			logger.log("### AuthService::getBackendToken fromserver is enabled. Trying to login");
			_claimsRefresh(null,
				function(token) {
					konyRef.tokens[_providerName] = token;
					konyRef.currentBackEndToken = token.provider_token;
					kony.sdk.verifyAndCallClosure(successCallback, token.provider_token);
				},
				failureCallback);
		} else {
			if (konyRef.tokens[_providerName]) {
				var val = konyRef.tokens[_providerName];
				var _exp = val.provider_token.exp;
				logger.log("token expiry time: " + _exp);
				logger.log("Current time: " + (new Date().getTime()));
				if (_exp && _exp < (new Date().getTime())) {
					logger.log("### AuthService::getBackendToken Token expired. Fetching refresh from claims api");
					_claimsRefresh(null,
						function(token) {
							konyRef.tokens[_providerName] = token.claims_token.value;
							logger.log("### AuthService::getBackendToken fetching refresh successfull. Calling success callback");
							konyRef.currentBackEndToken = token.provider_token;
							kony.sdk.verifyAndCallClosure(successCallback, token.provider_token);
						},
						function(error) {
							logger.log("### AuthService::getBackendToken fetching refresh failed. Calling failure callback");
							konyRef.tokens[_providerName] = null;
							konyRef.currentBackEndToken = null;
							kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getAuthErrObj(error));
						});
				} else {
					logger.log("### AuthService::getBackendToken present token is valid/doesn't have expiry time. Calling success callback");
					konyRef.currentBackEndToken = val.provider_token;
					kony.sdk.verifyAndCallClosure(successCallback, val.provider_token);
				}
			} else {
				logger.log("### AuthService::getBackendToken failed for find info for key " + dsKey + "in database. calling failure callback");
				kony.sdk.verifyAndCallClosure(failureCallback, null);
			}
		}
	};
	/**
	 * Get profile callback method.
	 * @callback getProfileSuccessCallback
	 * @param {object} profile - Profile object
	 */

	/**
	 * Get profile callback method.
	 * @callback getProfileFailureCallback
	 */
	/**
	 * Get profile.
	 * @param {boolean} fromserver - Flag to force fetch from server only.
	 * @param {getProfileSuccessCallback} successCallback  - Callback method on success
	 * @param {getProfileFailureCallback} failureCallback - Callback method on failure
	 */
	this.getProfile = function(fromserver, successCallback, failureCallback) {
		if (fromserver && fromserver == true) {
			profileRefresh(
				function(token) {
					konyRef.tokens[_providerName] = token;
					kony.sdk.verifyAndCallClosure(successCallback, token.profile);
				},
				failureCallback)
		} else {
			if (konyRef.tokens[_providerName]) {
				var val = konyRef.tokens[_providerName]
				kony.sdk.verifyAndCallClosure(successCallback, val.profile);
			} else {
				kony.sdk.verifyAndCallClosure(failureCallback, null);
			}
		}
	};
	/**
	 * Get the provider name.
	 * @returns {string} Provider name.
	 */
	this.getProviderName = function() {
		return _providerName;
	};
	/**
	 * Get the provider type.
	 * @returns {string} Provider type.
	 */
	this.getProviderType = function() {
		return _type;
	};

	/**
	 * Get the generic session data type.
	 * @returns {string} session data.
	 */
	this.getUserData = function(successCallback, failureCallback) {
		var userDataUrl = _serviceUrl + "/session/user_data";
		getSessionData(userDataUrl, successCallback, failureCallback);
	};

	/**
	 * Get the user attributes returned by a provider
	 * @returns {string} user attributes.
	 */
	this.getUserAttributes = function(successCallback, failureCallback) {
		if(isLoggedin == false){
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getNullClaimsTokenErrObj());
		}
		else if(user_attributes && Object.keys(user_attributes).length === 0){
			var userAttributesUrl = _serviceUrl + "/session/user_attributes?provider=" + _providerName;
			getSessionData(userAttributesUrl, function(res){
				user_attributes = res;
				kony.sdk.verifyAndCallClosure(successCallback,user_attributes);
			}, failureCallback);
		}else{
			if (konyRef.currentClaimToken === null) {
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getNullClaimsTokenErrObj());
			}else{ 
				kony.sdk.verifyAndCallClosure(successCallback,user_attributes );
			}
		}
	};

	/**
	 * Get the security attributes returned by a provider
	 * @returns {string} security attributes.
	 */
	this.getSecurityAttributes = function(successCallback, failureCallback) {
		var securityAttributesUrl = _serviceUrl + "/session/security_attributes?provider=" + _providerName;
		getSessionData(securityAttributesUrl, successCallback, failureCallback);
	};

	/**
		utility method to get session data
		@private
	*/
	var getSessionData = function(sessionAttributesEndPointUrl, successCallback, failureCallback) {
		if (konyRef.currentClaimToken === null) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getNullClaimsTokenErrObj());
		}
		else{
			networkProvider.post(sessionAttributesEndPointUrl, {}, {
					"Authorization": konyRef.currentClaimToken,
					"X-HTTP-Method-Override": "GET"
				},
				function(data) {
				    data = kony.sdk.formatSuccessResponse(data);
					kony.sdk.verifyAndCallClosure(successCallback, data);
				},
				function(err) {
					kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getAuthErrObj(err));
				});
		}
	};



	/**
	 * Method to refresh the claims token.
	 * @private
	 */
	var _claimsRefresh = function(options, success, failure) {
		logger.log("### AuthService::_claimsRefresh fetching claims from server for provider " + _providerName);
		var value = konyRef.tokens[_providerName];
		var refreshToken = null;
		if (value) {
			refreshToken = value.refresh_token;
		}
		if(kony.sdk.getSdkType() === "js" && kony.sdk.offline.isOfflineEnabled && kony.sdk.offline.isOfflineEnabled == true && !kony.sdk.isNetworkAvailable()){
			return kony.sdk.offline.getClaimsToken();
		}
		var _url = _serviceUrl + "/claims";
		if (options && options.requestParams != null) {
			_url = _url + "?"
			for (var i in options.requestParams) {
				if (options.requestParams.hasOwnProperty(i) && typeof(i) !== 'function') {
					_url = _url + (i + "=" + options.requestParams[i] + "&");
				}
			}
			_url = stripTrailingCharacter(_url, "&");
		}
		if (refreshToken) {
			logger.log("### AuthService::_claimsRefresh making POST request to claims endpoint");
			networkProvider.post(_url, {}, {
					"Authorization": refreshToken,
					"Content-Type": "application/x-www-form-urlencoded"
				},
				function(data) {
					data = kony.sdk.formatSuccessResponse(data);
					logger.log("### AuthService::_claimsRefresh Fetching claims succcessfull");
					konyRef.tokens[_providerName] = data;
					logger.log("### AuthService::_claimsRefresh saved locally. Calling success callback");
					kony.sdk.verifyAndCallClosure(success, data);
				},
				function(xhr, status, err) {
					logger.log("### AuthService::_claimsRefresh fetching claims failed. Calling failure callback");
					kony.sdk.verifyAndCallClosure(failure, kony.sdk.error.getAuthErrObj(err));
				});
		} else {
			logger.log("### AuthService::_claimsRefresh no refreshtoken found. calling failure callback");
			kony.sdk.verifyAndCallClosure(failure, kony.sdk.error.getNullRefreshTokenErrObj());
		}
	};

	var profileRefresh = function(success, failure) {
		logger.log("### AuthService::profileRefresh fetching profile from server for provider " + _providerName);
		var value = konyRef.tokens[_providerName];
		var refreshToken = null;
		if (value) {
			refreshToken = value.refresh_token;
		}
		if(kony.sdk.getSdkType() === "js" && kony.sdk.offline.isOfflineEnabled && kony.sdk.offline.isOfflineEnabled == true && !kony.sdk.isNetworkAvailable()){
			return kony.sdk.offline.getClaimsToken();
		}
		var _url = _serviceUrl + "/profile?provider=" + _providerName;
		if (refreshToken) {
			logger.log("### AuthService::profileRefresh making POST request to profile endpoint");
			networkProvider.post(_url, {}, {
					"Authorization": refreshToken,
					"Content-Type": "application/x-www-form-urlencoded",
					"X-HTTP-Method-Override": "GET"
				},
				function(data) {
					data = kony.sdk.formatSuccessResponse(data);
					logger.log("### AuthService::profileRefresh Fetching profile succcessfull, Calling success callback");
					kony.sdk.verifyAndCallClosure(success, data);
				},
				function(xhr, status, err) {
					logger.log("### AuthService::profileRefresh fetching profile failed. Calling failure callback");
					kony.sdk.verifyAndCallClosure(failure, kony.sdk.error.getAuthErrObj(err));
				});
		} else {
			logger.log("### AuthService::profileRefresh no refreshtoken found. calling failure callback");
			kony.sdk.verifyAndCallClosure(failure, kony.sdk.error.getNullRefreshTokenErrObj());
		}
	};
};

kony.sdk.prototype.registerObjectService = function(objectServiceType, objectServiceClass) {
	kony.sdk.registeredobjsvcs = kony.sdk.registeredobjsvcs || {};
	kony.sdk.registeredobjsvcs[objectServiceType] = objectServiceClass;
};

/**
 * Method to create the object service instance with the provided service name.
 * @param {string} serviceName - Name of the service
 * @param {map} options - Map of key values like {"access":"offline"/"online"/"registered Object Service Name"}
 * @returns {@link kony.sdk.OnlineObjectService / @link kony.sdk.OfflineObjectService} Object service instance
 * @throws Exception if the serviceName or access is invalid.
 */
kony.sdk.prototype.getObjectService = function(serviceName, options) {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}

	var access;
	if (options != undefined && options != null) {
		access = options["access"];
	}

	var logger = new konyLogger();

	if (this.objectsvc != null) {
		if (this.objectsvc[serviceName] != null) {
			logger.log("### getObjectService::found Object service" + this.objectsvc[serviceName]);
			if(access == undefined || access == null || access.toLowerCase() == "online") {
				return new kony.sdk.OnlineObjectService(this, serviceName);
			} else if(access.toLowerCase() == "offline") {
				return new kony.sdk.OfflineObjectService(this, serviceName);
			} else {
				kony.sdk.registeredobjsvcs = kony.sdk.registeredobjsvcs || {};
				//verifying if the servicetype available in registeredservices if available initialize and return
				if (kony.sdk.registeredobjsvcs[access] != null && kony.sdk.registeredobjsvcs[access] != undefined) {
					return new kony.sdk.registeredobjsvcs[access](this, serviceName);
				} else {
					throw new Exception(Errors.OBJECT_FAILURE, "Invalid access value:"+access);
				}
			}
		}

	}

	throw new Exception(Errors.OBJECT_FAILURE, "Invalid serviceName:"+serviceName);

};

kony.sdk.IObjectService = function(konyRef, serviceName) {
	this.konyRef = konyRef;
	this.serviceName = serviceName;
	this.create = function(options, successCallback, failureCallback) {
		throw "This method is not implemented.";
	};

	this.fetch = function(options, successCallback, failureCallback) {
		throw "This method is not implemented.";
	};

	this.update = function(options, successCallback, failureCallback) {
		throw "This method is not implemented.";
	};

	this.deleteRecord = function(options, successCallback, failureCallback) {
		throw "This method is not implemented.";
	};

	this.getMetadataOfAllObjects = function(options, successCallback, failureCallback) {
		throw "This method is not implemented.";
	};

	this.getMetadataOfObject = function(objectName, options, successCallback, failureCallback) {
		throw "This method is not implemented.";
	};
};

/**
 * Method which returns the offline ObjectService object
 * @param konyRef
 * @param serviceName
 * @constructor
 */
kony.sdk.OfflineObjectService = function(konyRef, serviceName) {
	this.konyRef = konyRef;
	this.serviceName = serviceName;
	var logger = new konyLogger();

	/**
	 * This method is used to create a record on the object
     * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject)}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.create = function(options, successCallback, failureCallback) {
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
        }

		var dataObject = options["dataObject"];
		this.getMetadataOfObject(dataObject.getObjectName(),{},createHandler,failureCallback);

		function createHandler(objMetadata){
			_invokeOfflineCreate(dataObject, successCallback, failureCallback);
        }
	};

	/**
	 * This method is used to fetch records from the object
     * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject)}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.fetch = function(options, successCallback, failureCallback) {
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		var dataObject = options["dataObject"];
		this.getMetadataOfObject(dataObject.getObjectName(),{},fetchHandler,failureCallback);

		function fetchHandler(objMetadata) {
			var query = null;
			if (!(dataObject.getSelectQueryObject() == null || dataObject.getSelectQueryObject() == undefined)) {
				var selectQueryObj = dataObject.getSelectQueryObject();
				query = selectQueryObj.toString();
			} else {
				query = "select * from " + dataObject.getObjectName();
			}
			var dbName = kony.sdk.util.getSyncDbName();

			kony.sync.single_select_execute(dbName, query, null,
					selectSuccessCallback, selectErrorCallback);
			function selectSuccessCallback(response) {
				logger.log("### OfflineObjectService::fetch::selectSuccessCallback Response:" + JSON.stringify(response));
				var responseJSONArray = [];
				if (response !== null) {
					if(!(dataObject.getSelectQueryObject() == null || dataObject.getSelectQueryObject() == undefined)){
						for ( var i in response) {
							var responseObject = response[i];
							var responseJSONObject = {};
							if (selectQueryObj.getColumns().length !== 0) {
								for ( var j = 0; j < selectQueryObj.getColumns().length; j++) {
									var eachColumn = selectQueryObj.getColumns()[j];
									var columnName = eachColumn.getName();
									responseJSONObject[columnName] = responseObject[columnName];
								}
							}
							responseJSONArray.push(responseJSONObject);
						}
					}else{
						responseJSONArray = response;
					}
				}
				var responseObj = {};
				responseObj["records"] = responseJSONArray;
				kony.sdk.verifyAndCallClosure(successCallback, responseObj);

			}

			function selectErrorCallback(error) {
				logger.log("### OfflineObjectService::fetch::selectErrorCallback Error:" + JSON.stringify(error));
				kony.sdk.verifyAndCallClosure(failureCallback, error);
			}
		}
	};

	/**
	 * This method is used to update a record in the object
     * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject)}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.update = function(options, successCallback, failureCallback) {
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		var dataObject = options["dataObject"];
		this.getMetadataOfObject(dataObject.getObjectName(),{},updateHandler,failureCallback);

		function updateHandler(objMetadata) {
			_invokeOfflineUpdate(dataObject, updateSuccessCallback, updateFailureCallback);

			function updateSuccessCallback(response) {
				kony.sdk.verifyAndCallClosure(successCallback, response);
			}

			function updateFailureCallback(error) {
				if(error != null && error != undefined) {
					//if the errorcode is equivalent to transaction failed then giving some generic error message to the client.
					if(error["errorCode"] == 7010) {
						kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.transaction_failed,kony.sdk.errormessages.transaction_failed));
						return;
					}
				}
				kony.sdk.verifyAndCallClosure(failureCallback, error);
			}
        }
	};

	/**
	 * This method is used to delete a record in the object
     * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject)}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.deleteRecord = function(options, successCallback, failureCallback) {
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		var dataObject = options["dataObject"];
		this.getMetadataOfObject(dataObject.getObjectName(),{},deleteHandler,failureCallback);

		function deleteHandler(objMetadata) {
			_invokeOfflineDelete(dataObject, deleteSuccessCallback, deleteFailureCallback);

			function deleteSuccessCallback(response) {
				//verifying delete response contains deleted records count as 0
				if(response != null && response != undefined) {
					if(response["rowsdeleted"] == 0) {
						kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.norecords_to_delete,kony.sdk.errormessages.norecords_to_delete));
						return;
					}
				}
				kony.sdk.verifyAndCallClosure(successCallback, response);
			}

			function deleteFailureCallback(error) {
				kony.sdk.verifyAndCallClosure(failureCallback, error);
			}
		}
	};

	/**
	 * This method is used to retrieve metadata of all objects
	 * @param options
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getMetadataOfAllObjects = function(options, successCallback, failureCallback) {
		var getFromServer = false;
		if (options && options["getFromServer"] != undefined) {
			getFromServer = options["getFromServer"];
		}

		var objectsMetadata = null;
		//if the user opt to get metadata from server no need to fetch the metadata from cache
		if(getFromServer == false) {
			objectsMetadata = kony.sdk.ObjectServiceUtil.getCachedMetadata(serviceName);
		}
		if (getFromServer == true || objectsMetadata == null || objectsMetadata == undefined) {
			var tmpOptions = {"access":"online"};
			//getting online objectservice to get metadata
			var tmpOnlineObjSer = kony.sdk.getCurrentInstance().getObjectService(this.serviceName,tmpOptions);
			tmpOnlineObjSer.getMetadataOfAllObjects({"getFromServer":true}, successHandler, errorHandler);
		} else {
			logger.log("### OfflineObjectService::getMetadataOfAllObjects Success Response:" + JSON.stringify(objectsMetadata));
			successHandler(objectsMetadata);
		}
		function successHandler(objectsMetadata) {
			logger.log("### OfflineObjectService::getMetadataOfAllObjects::successHandler Response:" + JSON.stringify(objectsMetadata));
			kony.sdk.verifyAndCallClosure(successCallback, objectsMetadata);
		}

		function errorHandler(error) {
			logger.log("### OfflineObjectService::getMetadataOfAllObjects::errorHandler Error:" + JSON.stringify(error));
			kony.sdk.verifyAndCallClosure(failureCallback, error);
		}
	};

	/**
	 * This method is used to retrive metadata of a specific object
	 * @param objectName
	 * @param options
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getMetadataOfObject = function(objectName, options, successCallback, failureCallback) {
		var getFromServer = false;
		if (options && options["getFromServer"] != undefined) {
			getFromServer = options["getFromServer"];
		}

		var objectMetadata = null;
		//if the user opt to get metadata from server no need to fetch the metadata from cache
		if(getFromServer == false) {
			objectMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, objectName);
		}

		if (getFromServer == true || objectMetadata == null || objectMetadata == undefined) {
			var tmpOptions = {"access":"online"};
			//getting online objectservice to get metadata Of all Objects to avoid multiple calls in offline scenario
			var tmpOnlineObjSer = kony.sdk.getCurrentInstance().getObjectService(this.serviceName,tmpOptions);
			tmpOnlineObjSer.getMetadataOfAllObjects({"getFromServer":true}, successHandler, errorHandler);
		} else {
			logger.log("### OfflineObjectService::getMetadataOfObject Success Response" + JSON.stringify(objectMetadata));
			kony.sdk.verifyAndCallClosure(successCallback, objectMetadata);
		}

		function successHandler(objectsMetadata) {
			var tmpObjMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, objectName);
			if (!(tmpObjMetadata == null || tmpObjMetadata == undefined || tmpObjMetadata == {})) {
				logger.log("### OfflineObjectService::getMetadataOfObject::successHandler Response:" + JSON.stringify(tmpObjMetadata));
				kony.sdk.verifyAndCallClosure(successCallback, tmpObjMetadata);
			} else {
				kony.sdk.verifyAndCallClosure(errorHandler, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_object, kony.sdk.errormessages.invalid_object));
			}
		}

		function errorHandler(error) {
			logger.log("### OfflineObjectService::getMetadataOfObject::errorHandler Error:" + JSON.stringify(error));
			kony.sdk.verifyAndCallClosure(failureCallback, error);
		}
	};

	/**
	 * This method is used to execute an sql query
	 * @param queryStr
	 * @param successCallback
	 * @param failureCallback
	 */
	this.executeSelectQuery = function(queryStr, successCallback, failureCallback) {

		kony.sync.single_select_execute(kony.sdk.util.getSyncDbName(),queryStr,null,selctSuccess, selectError);
		function selctSuccess(response) {
            logger.log("### OfflineObjectService::executeSelectQuery::selectSuccess Response:" + JSON.stringify(response));
			kony.sdk.verifyAndCallClosure(successCallback, response);
		}

		function selectError(error) {
            logger.log("### OfflineObjectService::executeSelectQuery::selectError Error:" + JSON.stringify(error));
			kony.sdk.verifyAndCallClosure(failureCallback, error);
		}
	};

	/**
	 * Helps to get the binary content of the specified column on the Object
     * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject), "responsetype":"base64string/filepath(Default)", "binaryAttrName":columnName}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getBinaryContent = function(options, successCallback, failureCallback) {

		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		var dataObject = options["dataObject"];
        if(!(dataObject instanceof kony.sdk.dto.DataObject)) {
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
            return;
        }

		var getBase64 = options["responsetype"] === "base64string" ? true : false;
		var binaryColName = options["binaryAttrName"];
		if(binaryColName == null || binaryColName == undefined) {
			logger.log("### OfflineObjectService::getBinaryContent Error: Please provide column name to fetch binary content");
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj("90000","Please provide column name to fetch binary content"));
			return;
		}

		this.getMetadataOfObject(dataObject.getObjectName(),{},getBinaryDataHandler,failureCallback);
		function getBinaryDataHandler(objMetadata) {
			var dbName = kony.sdk.util.getSyncDbName();
			var objName = dataObject.getObjectName();
			var columnValues = kony.sdk.util.populateColumnValues(dataObject.getRecord(),null);
			var colMeta = kony.sdk.util.getMetadataOfColumn(objMetadata, binaryColName);
			if(colMeta == null) {
				logger.log("### OfflineObjectService::getBinaryContent Error: Invalid binary attribute name.");
                kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj("90000","Invalid binary attribute name."));
				return;
			}
			if(colMeta["datatype"] != kony.sdk.constants["binary"]) {
				logger.log("### OfflineObjectService::getBinaryContent Error: Datatype is not binary for the specified binary attribute name");
                kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj("90000","Datatype is not binary for the specified binary attribute name"));
				return;
			}
			var pkTable = kony.sdk.util.getPkTableForBinary(objMetadata, columnValues, failureCallback);

			if(getBase64 == true) {
				kony.sync.single_binary_select_base64_execute(dbName, objName, binaryColName, pkTable, null,
						selectSuccessCallback, selectErrorCallback);
			} else {
				kony.sync.single_binary_select_file_execute(dbName, objName, binaryColName, pkTable, null,
						selectSuccessCallback, selectErrorCallback);
			}

			function selectSuccessCallback(response) {
				logger.log("### OfflineObjectService::getBinaryContent::selectSuccessCallback Response" + JSON.stringify(response));
                var resultKey = (getBase64 == true) ? "base64" : "filePath";
                var result = response[resultKey];
                kony.sdk.verifyAndCallClosure(successCallback, result);
			}

			function selectErrorCallback(error) {
				logger.log("### OfflineObjectService::getBinaryContent::selectErrorCallback Error:" + JSON.stringify(error));
				_invokeOfflineErrorCallback(failureCallback, error);
				//kony.sdk.verifyAndCallClosure(failureCallback, error);
			}
		}
	};

	function _invokeOfflineErrorCallback(failureCallback, errorObject) {
		//call the failureCallback after adding opstatus to the errorObject.
		var errorCode, errorMessage;
		if(errorObject) {
			errorCode = (errorObject.hasOwnProperty("errorCode")) ? errorObject["errorCode"] : kony.sdk.errorcodes.transaction_failed;
			errorMessage = (errorObject.hasOwnProperty("errorMessage")) ? errorObject["errorMessage"] : kony.sdk.errormessages.transaction_failed;
		} else {
			errorCode = kony.sdk.errorcodes.transaction_failed;
			errorMessage = kony.sdk.errormessages.transaction_failed;
		}
		kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(errorCode, errorMessage));

	}
    function _invokeOfflineCreate(dataObject, successCallback, failureCallback) {
		var dbname = kony.sdk.util.getSyncDbName();
		kony.sync.single_insert_execute(dbname, dataObject.getObjectName(), dataObject.getRecord(),
			successCallback, function(err){
				_invokeOfflineErrorCallback(failureCallback, err);
			}, true);
	}

    function _invokeOfflineUpdate(dataObject, successCallback, failureCallback) {
		var objectName = dataObject.getObjectName();
		var columnValues = dataObject.getRecord();
		var objMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, objectName);
		var pkTable = {};
		var whereClause = [];
		if (objMetadata.primaryKey != null && objMetadata.primaryKey != undefined) {
			for (var indx = 0; indx < objMetadata.primaryKey.length; indx++) {
				var pKey = objMetadata.primaryKey[indx];
				var pKeyValue = columnValues[pKey];
				if(pKeyValue == null || pKeyValue == undefined || pKeyValue == "") {
					//TODO change to error object
					logger.log("### OfflineObjectService::_invokeOfflineUpdate Error: Primarykey details missing so unable to update");
                    kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
					return;
				}

				pkTable.pKey = {
					"key": pKey,
					"value": pKeyValue
				};
				var condition = {};
				condition.key = pKey;
				condition.value = pKeyValue;
				whereClause.push(condition);
			}
		} else {
			//TODO change to error object
			logger.log("### OfflineObjectService::_invokeOfflineUpdate Error: Primarykey details missing so unable to update");
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
			return;
		}

		var dbName = kony.sdk.util.getSyncDbName();
		kony.sync.single_update_execute(dbName, objectName, columnValues, whereClause, successCallback,
			function(err){
				_invokeOfflineErrorCallback(failureCallback, err);
			}, false, true, null);
	}

	function _invokeOfflineDelete(dataObject, successCallback, failureCallback) {
		var isError = false;
		var markForUpload = false;
		var tbname = dataObject.getObjectName();
		var errMsg = null;
		var wcs = [];
		var objMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, dataObject.getObjectName());
		var dbName = kony.sdk.util.getSyncDbName();
		var srcAttributes = kony.sdk.util.getPrimarykeysFromMetadata(objMetadata);
		if (srcAttributes != null && srcAttributes != undefined) {
			var pkLen = Object.keys(srcAttributes).length;
			for (var indx = 0; indx < pkLen; indx++) {
				var pKey = Object.keys(srcAttributes)[indx];
				var pKeyValue = dataObject.getRecord()[pKey];
				if (pKeyValue == null || pKeyValue == undefined|| pKeyValue == "") {
					//TODO
					//throw error
					kony.sdk.logger.log("### _invokeOfflineDelete:: Error Primarykey details missing so unable to delete");
                    kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
					return;
				}
				var whereClause = [];
				whereClause.key = pKey;
				whereClause.value = pKeyValue;
				kony.table.insert(wcs, whereClause);
			}
		} else {
			//TODO
			//throw error
			kony.sdk.logger.log("### _invokeOfflineDelete:: Error Primarykey details missing so unable to delete");
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
			return;
		}

		kony.sync.single_delete_execute(dbName, tbname, wcs, successCallback,
			function(err){
				_invokeOfflineErrorCallback(failureCallback,err);
			}, false, false, true);
	}
};

/**
 * Method which returns the online ObjectService object
 * @param konyRef
 * @param serviceName
 * @constructor
 */
kony.sdk.OnlineObjectService = function(konyRef, serviceName) {
	this.konyRef = konyRef;
	this.serviceName = serviceName;
	this.dataUrl = null;
	this.binaryUrl = null;
	this.operationsUrl = null;
	this.metadataUrl = null;
	this.version = null;
	var logger = new konyLogger();
	var currentObject = this;

	/**
	 * This method is used to create a record on the object
     * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject),"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.create = function(options, successCallback, failureCallback) {
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
			}
		}

		var tmpDataUrl = this.getDataUrl();
		var objName = options["dataObject"].objectName;
		kony.sdk.claimsRefresh(createOperationHandler, failureCallback);

		function createOperationHandler() {
			currentObject.getMetadataOfObject(objName,{},function(result){
				_create(options, tmpDataUrl, successCallback, failureCallback);
			},function(error){
				logger.log("### OnlineObjectService::create Error:" + JSON.stringify(error));
				kony.sdk.verifyAndCallClosure(failureCallback,error);
			});
		}
	};

	/**
	 * This method is used to fetch a record on the object
     * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject),"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.fetch = function(options, successCallback, failureCallback) {
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
			}
		}

		var tmpDataUrl = this.getDataUrl();
		var objName = options["dataObject"].objectName;
		kony.sdk.claimsRefresh(fetchOperationHandler, failureCallback);

		function fetchOperationHandler() {
			currentObject.getMetadataOfObject(objName,{},function(result){
				_fetch(options, tmpDataUrl, successCallback, failureCallback);
			},function(error){
				logger.log("### OnlineObjectService::fetch Error:" + JSON.stringify(error));
				kony.sdk.verifyAndCallClosure(failureCallback,error);
			});
		}

	};

	/**
	 * This method is used to update a record on the object
     * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject),"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.update = function(options, successCallback, failureCallback) {
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
			}
		}

		var tmpDataUrl = this.getDataUrl();
		var objName = options["dataObject"].objectName;
		kony.sdk.claimsRefresh(updateOperationHandler, failureCallback);

		function updateOperationHandler() {
			currentObject.getMetadataOfObject(objName,{},function(result){
				_update(options, tmpDataUrl, successCallback, failureCallback);
			},function(error){
				logger.log("### OnlineObjectService::update Error:" + JSON.stringify(error));
				kony.sdk.verifyAndCallClosure(failureCallback,error);
			});
		}
	};

	/**
	 * This method is used to partial update a record on the object
     * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject),"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.partialUpdate = function(options, successCallback, failureCallback) {
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
			}
		}

		var tmpDataUrl = this.getDataUrl();
		var objName = options["dataObject"].objectName;
		kony.sdk.claimsRefresh(partialUpdateOperationHandler, failureCallback);

		function partialUpdateOperationHandler() {
			currentObject.getMetadataOfObject(objName,{},function(result){
				_partialUpdate(options, tmpDataUrl, successCallback, failureCallback);
			},function(error){
				logger.log("### OnlineObjectService::partialUpdate Error:" + JSON.stringify(error));
				kony.sdk.verifyAndCallClosure(failureCallback,error);
			});
		}
	};

	/**
	 * This method is used to delete a record on the object
     * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject),"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.deleteRecord = function(options, successCallback, failureCallback) {

		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
			}
		}

		var tmpDataUrl = this.getDataUrl();
		var objName = options["dataObject"].objectName;
		kony.sdk.claimsRefresh(deleteOperationHandler, failureCallback);

		function deleteOperationHandler() {
			currentObject.getMetadataOfObject(objName,{},function(result){
				_deleteRecord(options, tmpDataUrl, successCallback, failureCallback);
			},function(error){
				logger.log("### OnlineObjectService::delete Error:" + JSON.stringify(error));
				kony.sdk.verifyAndCallClosure(failureCallback,error);
			});
		}
	};

	this.customVerb = function(verbName, options, successCallback, failureCallback){

		if(verbName == null || verbName == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"verbName" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
			}
		}

		var tmpDataUrl = this.getOperationsUrl();
		var objName = options["dataObject"].objectName;
		kony.sdk.claimsRefresh(customVerbHandler, failureCallback);

		function customVerbHandler() {
			currentObject.getMetadataOfObject(objName,{},function(result){
				_customverb(verbName,options, tmpDataUrl, successCallback, failureCallback);
			},function(error){
				logger.log("### OnlineObjectService::customverb Error:" + JSON.stringify(error));
				kony.sdk.verifyAndCallClosure(failureCallback,error);
			});
		}
	};

	/**
	 * This method is used to retrive metadata of all objects
	 * @param {map} options - includes {"getFromServer":boolean,"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getMetadataOfAllObjects = function(options, successCallback, failureCallback) {
		var tmpMetadataUrl = this.getMetadataUrl();

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
			}
		}

		function getMetadataOfAllObjectsOperationHandler() {
			_getMetadataOfAllObjects(options, tmpMetadataUrl, successCallback, failureCallback);
		}

		kony.sdk.claimsRefresh(getMetadataOfAllObjectsOperationHandler, failureCallback);
	};

	/**
	 * This method is used to retrive metadata of a specific object
	 * @param objectName
	 * @param {map} options - includes {"getFromServer":boolean,"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getMetadataOfObject = function(objectName, options, successCallback, failureCallback) {
		var tmpMetadataUrl = this.getMetadataUrl();

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
			}
		}

		function getMetadataOfObjectOperationHandler() {
			_getMetadataOfObject(objectName, options, tmpMetadataUrl, successCallback, failureCallback);
		}

		kony.sdk.claimsRefresh(getMetadataOfObjectOperationHandler, failureCallback);
	};

	this.getDataUrl = function() {
		if (this.dataUrl == null) {
			this.dataUrl = stripTrailingCharacter(konyRef.objectsvc[serviceName]["url"] + "/objects/", "/");
		}
		return this.dataUrl;
	};

	this.getBinaryUrl = function() {
		if (this.binaryUrl == null) {
			this.binaryUrl = stripTrailingCharacter(konyRef.objectsvc[serviceName]["url"] + "/binary/", "/");
		}
		return this.binaryUrl;
	};

	this.getOperationsUrl = function() {
		if (this.operationsUrl == null) {
			this.operationsUrl = stripTrailingCharacter(konyRef.objectsvc[serviceName]["url"] + "/operations/", "/");
		}
		return this.operationsUrl;
	};

	this.getMetadataUrl = function() {
		if (this.metadataUrl == null) {
			this.metadataUrl = stripTrailingCharacter(konyRef.objectsvc[serviceName]["metadata_url"], "/");
		}
		return this.metadataUrl;
	};

	this.getVersion = function() {
		if (this.version == null) {
			this.version = konyRef.objectsvc[serviceName]["version"];
		}
		return this.version;
	};

	/**
	 * Helps to get the binary content of the specified column on the Object
	 * @param {map} options - includes {"dataObject":{@link kony.sdk.dto.DataObject}, "binaryAttrName":columnName}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getBinaryContent = function(options, successCallback, failureCallback) {

        if(options == null || options == undefined){
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined, "options" + kony.sdk.errormessages.null_or_undefined));
            return;
        }

		var tmpDataUrl = this.getBinaryUrl();
		var dataObject = options["dataObject"];
        if(!(dataObject instanceof kony.sdk.dto.DataObject)) {
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
            return;
        }

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
			}
		}

		var objName = dataObject.getObjectName();
		var binaryColName = options["binaryAttrName"];
		if (binaryColName == null || binaryColName == undefined) {
			logger.log("### OnlineObjectService::getBinaryContent Error: Please provide column name to fetch binary content");
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj("90000","Please provide column name to fetch binary content"));
			return;
		}
		function getBinaryContentOperationHandler() {
			currentObject.getMetadataOfObject(objName, {}, function (response) {
				_getBinaryContent(options, tmpDataUrl, successCallback, failureCallback);
			}, function (error) {
				logger.log("### OnlineObjectService::getBinaryContent Error:" + JSON.stringify(error));
				kony.sdk.verifyAndCallClosure(failureCallback, error);
			});
		}

		kony.sdk.claimsRefresh(getBinaryContentOperationHandler, failureCallback);
	};

	/**
	 * Helps to create the binary content of the specified column on the Object
	 * @param {map} options - includes {"dataObject": {@link kony.sdk.dto.DataObject}, "binaryAttrName":columnName}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.createBinaryContent = function(options, successCallback, failureCallback) {
		var tmpDataUrl = this.getBinaryUrl();

		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		var dataObject = options["dataObject"];
        if(!(dataObject instanceof kony.sdk.dto.DataObject)) {
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
            return;
        }

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
			}
		}

		var objName = dataObject.getObjectName();
		var binaryColName = options["binaryAttrName"];
		if (binaryColName == null || binaryColName == undefined) {
			logger.log("### OnlineObjectService::createBinaryContent Error: Please provide column name to create binary content");
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj("900000","Please provide column name to create binary content"));
			return;
		}
		function createBinaryContentOperationHandler() {
			currentObject.getMetadataOfObject(objName, {}, function (response) {
				_createBinaryContent(options, tmpDataUrl, successCallback, failureCallback);
			}, function (error) {
				logger.log("### OnlineObjectService::createBinaryContent Error:" + JSON.stringify(error));
				kony.sdk.verifyAndCallClosure(failureCallback, error);
			});
		}

		kony.sdk.claimsRefresh(createBinaryContentOperationHandler, failureCallback);
	};

	/**
	 * Helps to update the binary content of the specified column on the Object
	 * @param {map} options - includes {"dataObject": {@link kony.sdk.dto.DataObject}, "binaryAttrName":columnName}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.updateBinaryContent = function(options, successCallback, failureCallback) {
		var tmpDataUrl = this.getBinaryUrl();

		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined, "options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		var dataObject = options["dataObject"];
        if(!(dataObject instanceof kony.sdk.dto.DataObject)) {
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
            return;
        }

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
			}
		}

		var objName = dataObject.getObjectName();
		var binaryColName = options["binaryAttrName"];
		if (binaryColName == null || binaryColName == undefined) {
			logger.log("### OnlineObjectService::updateBinaryContent Error: Please provide column name to create binary content");
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj("90000","Please provide column name to create binary content"));
			return;
		}
		function updateBinaryContentOperationHandler() {
			currentObject.getMetadataOfObject(objName, {}, function (response) {
				_updateBinaryContent(options, tmpDataUrl, successCallback, failureCallback);
			}, function (error) {
				logger.log("### OnlineObjectService::updateBinaryContent Error:" + JSON.stringify(error));
				kony.sdk.verifyAndCallClosure(failureCallback, error);
			});
		}

		kony.sdk.claimsRefresh(updateBinaryContentOperationHandler, failureCallback);
	};

	function _getBinaryContent(options, tmpDataUrl, successCallback, failureCallback) {

		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var binaryColName = options["binaryAttrName"];
		var objName = dataObject.getObjectName();
		var queryParams = options["queryParams"];
		var url =  tmpDataUrl + "/" + objName;
		var objMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, objName);
		if (objMetadata.primaryKey != undefined && objMetadata.primaryKey != null ) {
			var pkCount = objMetadata.primaryKey.length;
			if (pkCount != 1) {
                kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
				return;
			}
			//reading primarykey and framing filter clause
			var pkey = objMetadata.primaryKey[0];
			if(dataObject.getRecord()[pkey] == undefined || dataObject.getRecord()[pkey] == null){
				logger.log("### OnlineObjectService::_getBinaryContent Error: Please provide primary key details to get Binary content.");
                kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
				return;
			}
			url = url + "?" + pkey + "=" + dataObject.getRecord()[pkey];
			//passing binary column name to server
			if(binaryColName != null && binaryColName != undefined) {
				url = url + "&fieldName=" + binaryColName;
			}
			if(queryParams != undefined && queryParams != null){
				url = url + "&" + kony.sdk.util.objectToQueryParams(queryParams);
			}

		} else {
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
		}
		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}
		headers["Accept"] = "application/json";
		headers["Content-Type"] = "application/json";
		headers["X-Kony-API-Version"] = currentObject.getVersion();

		invokeObjectOperation(url, dataObject.getObjectName(), headers,null, kony.sdk.constants.HTTP_METHOD_GET,invokeSuccessCallback,invokeFailureCallback);
		function invokeSuccessCallback(response){
			logger.log("### OnlineObjectService::_getBinaryContent::invokeSuccessCallback Response:" + JSON.stringify(response));
			kony.sdk.verifyAndCallClosure(successCallback,response["data"]);
		}

		function invokeFailureCallback(error){
			logger.log("### OnlineObjectService::_getBinaryContent::invokeFailureCallback Error:" + JSON.stringify(error));
			kony.sdk.verifyAndCallClosure(failureCallback,error);
		}
	};

	function _createBinaryContent(options, tmpDataUrl, successCallback, failureCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var binaryColName = options["binaryAttrName"];
		var objName = dataObject.getObjectName();
		var queryParams = options["queryParams"];
		var url =  tmpDataUrl + "/" + objName;
		var objMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, objName);
		var jsonPayload = {};
		var pkey;
		if (objMetadata.primaryKey != undefined && objMetadata.primaryKey != null ) {
			var pkCount = objMetadata.primaryKey.length;
			if (pkCount != 1) {
                kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
				return;
			}
			//reading primarykey and framing filter clause
			pkey = objMetadata.primaryKey[0];
			if(dataObject.getRecord()[pkey] == undefined || dataObject.getRecord()[pkey] == null){
				logger.log("### OnlineObjectService::_createBinaryContent Error: Please provide primary key details to create Binary content.");
                kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
				return;
			}
			jsonPayload[pkey] = dataObject.getRecord()[pkey];
			jsonPayload["data"] = dataObject.getRecord()[binaryColName];
			jsonPayload["fieldName"] = binaryColName;
		} else {
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
		}
		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}
		headers["Accept"] = "application/json";
		headers["Content-Type"] = "application/json";
		headers["X-Kony-API-Version"] = currentObject.getVersion();

		var formData = new kony.sdk.getFormData(jsonPayload);

		if(queryParams != undefined && queryParams != null) {
			kony.sdk.updateFormData(formData, "queryparams", queryParams);
		}

		invokeObjectOperation(url, dataObject.getObjectName(), headers, formData, null,invokeSuccessCallback,invokeFailureCallback);
		function invokeSuccessCallback(response){
			logger.log("### OnlineObjectService::_createBinaryContent::invokeSuccessCallback Response:" + JSON.stringify(response));
			kony.sdk.verifyAndCallClosure(successCallback,response[pkey]);
		}

		function invokeFailureCallback(error){
			logger.log("### OnlineObjectService::_createBinaryContent::invokeFailureCallback Error:" + JSON.stringify(error));
			kony.sdk.verifyAndCallClosure(failureCallback,error);
		}
	};

	function _updateBinaryContent(options, tmpDataUrl, successCallback, failureCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var binaryColName = options["binaryAttrName"];
		var objName = dataObject.getObjectName();
		var queryParams = options["queryParams"];
		var url =  tmpDataUrl + "/" + objName;
		var objMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, objName);
		var jsonPayload = {};
		var pkey;
		if (objMetadata.primaryKey != undefined && objMetadata.primaryKey != null ) {
			var pkCount = objMetadata.primaryKey.length;
			if (pkCount != 1) {
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
				return;
			}
			//reading primarykey and framing filter clause
			pkey = objMetadata.primaryKey[0];
			if(dataObject.getRecord()[pkey] == undefined || dataObject.getRecord()[pkey] == null){
				logger.log("### OnlineObjectService::_updateBinaryContent Error: Please provide primary key details to create Binary content.");
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
				return;
			}
			jsonPayload[pkey] = dataObject.getRecord()[pkey];
			jsonPayload["data"] = dataObject.getRecord()[binaryColName];
			jsonPayload["fieldName"] = binaryColName;
		} else {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
		}
		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}
		headers["Accept"] = "application/json";
		headers["Content-Type"] = "application/json";
		headers["X-Kony-API-Version"] = currentObject.getVersion();
		headers["X-HTTP-Method-Override"] = "PUT";

		var formData = new kony.sdk.getFormData(jsonPayload);

		if(queryParams != undefined && queryParams != null) {
			kony.sdk.updateFormData(formData, "queryparams", queryParams);
		}

		invokeObjectOperation(url, dataObject.getObjectName(), headers, formData, null,invokeSuccessCallback,invokeFailureCallback);
		function invokeSuccessCallback(response){
			logger.log("### OnlineObjectService::_updateBinaryContent::invokeSuccessCallback Response:" + JSON.stringify(response));
			kony.sdk.verifyAndCallClosure(successCallback,response[pkey]);
		}

		function invokeFailureCallback(error){
			logger.log("### OnlineObjectService::_updateBinaryContent::invokeFailureCallback Error:" + JSON.stringify(error));
			kony.sdk.verifyAndCallClosure(failureCallback,error);
		}
	};

	function _create(options, tmpDataUrl, successCallback, failureCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var url =  tmpDataUrl + "/" + dataObject.objectName;
        var record = dataObject.getRecord();
		var queryParams = options["queryParams"];
        if(record == null || record == undefined){
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"record " + kony.sdk.errormessages.null_or_undefined));
        }

		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}
		headers["Accept"] = "application/json";
		headers["Content-Type"] = "application/json";
		headers["X-Kony-API-Version"] = currentObject.getVersion();
		var formData = new kony.sdk.getFormData(record, null);

		if(queryParams != undefined && queryParams != null) {
			kony.sdk.updateFormData(formData, "queryparams", queryParams);
		}

		invokeObjectOperation(url, dataObject.objectName, headers,formData,null,invokeSuccessCallback,invokeFailureCallback);
		function invokeSuccessCallback(response){
			logger.log("### OnlineObjectService::_create::invokeSuccessCallback Response:"+ JSON.stringify(response));
			kony.sdk.verifyAndCallClosure(successCallback,response);
		}

		function invokeFailureCallback(error){
			logger.log("### OnlineObjectService::_create::invokeFailureCallback Error:" + JSON.stringify(error));
			kony.sdk.verifyAndCallClosure(failureCallback, error)
		}
	}

	function _fetch(options, tmpDataUrl, successCallback, serviceErrorCallback) {
		var dataObject = options["dataObject"];
		var odataqueryStr = dataObject.getOdataUrl();
		var headers = options["headers"];
		var queryParams = options["queryParams"];
		var url =  tmpDataUrl + "/" + dataObject.objectName;
		if(odataqueryStr != undefined && odataqueryStr != null){
			url = url + "?" + odataqueryStr;
			if(queryParams != undefined && queryParams != null){
				url = url + "&" + kony.sdk.util.objectToQueryParams(queryParams);
			}
		}else if(queryParams != undefined && queryParams != null){
			url = url + "?" + kony.sdk.util.objectToQueryParams(queryParams);
		}

		if (!headers) {
			//if headers not sent by the deveolper				
			headers = {};
		}
		headers["Accept"] = "application/json";
		headers["Content-Type"] = "application/json";
		headers["X-Kony-API-Version"] = currentObject.getVersion();

		invokeObjectOperation(url, dataObject.objectName, headers,null, kony.sdk.constants.HTTP_METHOD_GET,invokeSuccessCallback,invokeFailureCallback);
		function invokeSuccessCallback(response){
			logger.log("### OnlineObjectService::_fetch::invokeSuccessCallback Response:" + JSON.stringify(response));
			kony.sdk.verifyAndCallClosure(successCallback,response);
		}

		function invokeFailureCallback(error){
			logger.log("### OnlineObjectService::_fetch::invokeFailureCallback Error:" + JSON.stringify(error));
			kony.sdk.verifyAndCallClosure(serviceErrorCallback,error);
		}
	}

	function _update(options, tmpDataUrl, updateServiceCallback, serviceErrorCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var url =  tmpDataUrl + "/" + dataObject.objectName;
		var queryParams = options["queryParams"];
		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}
		headers["Accept"] = "application/json";
		headers["Content-Type"] = "application/json";
		headers["X-HTTP-Method-Override"] = "PUT";
		headers["X-Kony-API-Version"] = currentObject.getVersion();
		var formData = new kony.sdk.getFormData(dataObject.getRecord(), null);

		if(queryParams != undefined && queryParams != null) {
			kony.sdk.updateFormData(formData, "queryparams", queryParams);
		}

		invokeObjectOperation(url, dataObject.objectName, headers,formData,null,invokeSuccessCallback,invokeFailureCallback);
		function invokeSuccessCallback(response){
			logger.log("### OnlineObjectService::_update::invokeSuccessCallback Response:" + JSON.stringify(response));
			kony.sdk.verifyAndCallClosure(updateServiceCallback,response);
		}

		function invokeFailureCallback(error){
			logger.log("### OnlineObjectService::_update::invokeFailureCallback Error:" + JSON.stringify(error));
			kony.sdk.verifyAndCallClosure(serviceErrorCallback,error);
		}
	}

	function _partialUpdate(options, tmpDataUrl, partialUpdateServiceCallback, serviceErrorCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var url =  tmpDataUrl + "/" + dataObject.objectName;
		var queryParams = options["queryParams"];

		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}
		headers["Accept"] = "application/json";
		headers["Content-Type"] = "application/json";
		headers["X-HTTP-Method-Override"] = "PATCH";
		headers["X-Kony-API-Version"] = currentObject.getVersion();
		var formData = new kony.sdk.getFormData(dataObject.getRecord(), null);

		if(queryParams != undefined && queryParams != null) {
			kony.sdk.updateFormData(formData, "queryparams", queryParams);
		}

		invokeObjectOperation(url, dataObject.objectName, headers,formData,null,invokeSuccessCallback,invokeFailureCallback);
		function invokeSuccessCallback(response){
			logger.log("### OnlineObjectService::_partialUpdate::invokeSuccessCallback Success Response:" + JSON.stringify(response));
			kony.sdk.verifyAndCallClosure(partialUpdateServiceCallback,response);
		}

		function invokeFailureCallback(error){
			logger.log("### OnlineObjectService::_partialUpdate::invokeFailureCallback Error:" + JSON.stringify(error));
			kony.sdk.verifyAndCallClosure(serviceErrorCallback,error);
		}
	}

	function _deleteRecord(options, tmpDataUrl, deleteSuccessCallback, serviceErrorCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var objMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName,dataObject.objectName);
		var url =  tmpDataUrl + "/" + dataObject.objectName;
		var queryParams = options["queryParams"];
		var odataUrl = "";
		if (objMetadata.primaryKey != undefined && objMetadata.primaryKey != null ) {
			var pkCount = objMetadata.primaryKey.length;
			for(var i=0;i<pkCount;i++) {
				//reading primarykey and framing filter clause
				var pkey = objMetadata.primaryKey[i];
				if(dataObject.getRecord()[pkey] == undefined || dataObject.getRecord()[pkey] == null){
					logger.log("### OnlineObjectService::_delete Error: Please provide all primary keys to process the request");
                    kony.sdk.verifyAndCallClosure(serviceErrorCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
					return;
				}
				if (i == 0) {
					odataUrl = "?$filter=" + pkey + " eq '" + dataObject.getRecord()[pkey] + "'";
				} else {
					//appending the condition incase of composite primary key
					odataUrl = odataUrl + " and " + pkey + " eq '" + dataObject.getRecord()[pkey] + "'";
				}
			}
		}

		url = url + odataUrl;

		if(queryParams != undefined && queryParams != null) {
			if (odataUrl && odataUrl.length != 0) {
				url = url + "&" + kony.sdk.util.objectToQueryParams(queryParams);
			} else {
				url = url + "?" + kony.sdk.util.objectToQueryParams(queryParams);
			}
		}

		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}
		headers["Accept"] = "application/json";
		headers["Content-Type"] = "application/json";
		headers["X-HTTP-Method-Override"] = "DELETE";
		headers["X-Kony-API-Version"] = currentObject.getVersion();

		invokeObjectOperation(url, dataObject.objectName, headers,null, kony.sdk.constants.HTTP_METHOD_GET,invokeSuccessCallback,invokeFailureCallback);
		function invokeSuccessCallback(response){
			logger.log("### OnlineObjectService::_delete::invokeSuccessCallback Response:" + JSON.stringify(response));
			kony.sdk.verifyAndCallClosure(deleteSuccessCallback,response);
		}

		function invokeFailureCallback(error){
			logger.log("### OnlineObjectService::_delete::invokeFailureCallback Error:" + JSON.stringify(error));
			kony.sdk.verifyAndCallClosure(serviceErrorCallback,error);
		}
	}

	function _customverb(verbName, options, tmpDataUrl, customVerbServiceCallback, serviceErrorCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var url =  tmpDataUrl + "/" + dataObject.objectName + "/" + verbName;
		var queryParams = options["queryParams"];
		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}
		headers["Accept"] = "application/json";
		headers["Content-Type"] = "application/json";
		headers["X-Kony-API-Version"] = currentObject.getVersion();
		var formData = new kony.sdk.getFormData(dataObject.getRecord(), null);

		if(queryParams != undefined && queryParams != null) {
			kony.sdk.updateFormData(formData, "queryparams", queryParams);
		}

		invokeObjectOperation(url, dataObject.objectName, headers,formData,null,invokeSuccessCallback,invokeFailureCallback);
		function invokeSuccessCallback(response){
			logger.log("### OnlineObjectService::_customverb::invokeSuccessCallback Success Response:" + JSON.stringify(response));
			kony.sdk.verifyAndCallClosure(customVerbServiceCallback,response);
		}

		function invokeFailureCallback(error){
			logger.log("### OnlineObjectService::_customverb::invokeFailureCallback Error:" + JSON.stringify(error));
			kony.sdk.verifyAndCallClosure(serviceErrorCallback,error);
		}
	}

	function _getMetadataOfAllObjects(options, tmpMetadataUrl, fetchSuccessCallback, serviceErrorCallback) {
		//if the getFromServer flag is true then get metadata from server even though its available in cache
		var getFromServer = false;
		if(options != null && options != undefined) {
			getFromServer = options["getFromServer"];
		}
		var tmpMetadata = kony.sdk.ObjectServiceUtil.getCachedMetadata(serviceName);
		if (getFromServer != true && tmpMetadata != null && tmpMetadata != undefined) {
			logger.log("### OnlineObjectService::_getMetadataOfAllObjects from KonyStore:" + JSON.stringify(tmpMetadata));
			kony.sdk.verifyAndCallClosure(fetchSuccessCallback, tmpMetadata);
		} else {
			var queryParams = options["queryParams"];
			var headers = options["headers"];
			if (!headers) {
				headers = {};
			}
			headers["Accept"] = "application/json";
			headers["Content-Type"] = "application/json";
			headers["X-Kony-API-Version"] = currentObject.getVersion();
			var url = tmpMetadataUrl;
			/*if(lastFetchTime !== undefined && lastFetchTime !== null){
			 url = url + "?$lastfetchtime="+ lastFetchTime;
			 }*/

			if(queryParams != undefined && queryParams != null){
				url = url + "?" + kony.sdk.util.objectToQueryParams(queryParams);
			}

			//TODO serviceid framing
			invokeObjectOperation(url, "metadata", headers, null, kony.sdk.constants.HTTP_METHOD_GET, invokeSuccessCallback, invokeFailureCallback);


			function invokeSuccessCallback(result) {
				logger.log("### OnlineObjectService::_getMetadataOfAllObjects::invokeSuccessCallback Response:" + JSON.stringify(result));
				var tableArray = result["Metadata"]["tables"];

				kony.sdk.ObjectServiceUtil.cacheMetadata(serviceName, tableArray);
				var tmpMetadata = kony.sdk.ObjectServiceUtil.getCachedMetadata(serviceName);
				kony.sdk.verifyAndCallClosure(fetchSuccessCallback, tmpMetadata);
			}

			function invokeFailureCallback(error){
				logger.log("### OnlineObjectService::_getMetadataOfAllObjects::invokeFailureCallback Error:" + JSON.stringify(error));
				kony.sdk.verifyAndCallClosure(serviceErrorCallback,error);
			}
		}
	}

	function _getMetadataOfObject(objectName, options, tmpMetadataUrl, entitySuccessCallback, serviceErrorCallback) {
		//if the getFromServer flag is true then get metadata from server even though its available in cache
		var getFromServer = false;
		if(options != null && options != undefined) {
			getFromServer = options["getFromServer"];
		}
		var headers = options["headers"];
		var tmpObjMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName,objectName);
		if (getFromServer != true && tmpObjMetadata != null && tmpObjMetadata != undefined) {
			logger.log("### OnlineObjectService::_getMetadataOfObject from KonyStore:" + JSON.stringify(tmpObjMetadata));
			kony.sdk.verifyAndCallClosure(entitySuccessCallback, tmpObjMetadata);
		} else {
			var queryParams = options["queryParams"];
			if (!headers) {
				//if headers not sent by the deveolper
				headers = {};
			}
			headers["Accept"] = "application/json";
			headers["Content-Type"] = "application/json";
			headers["X-Kony-API-Version"] = currentObject.getVersion();
			var url =  tmpMetadataUrl + "/"+ objectName;

			if(queryParams != undefined && queryParams != null){
				url = url + "?" + kony.sdk.util.objectToQueryParams(queryParams);
			}

			invokeObjectOperation(url, objectName, headers,null, kony.sdk.constants.HTTP_METHOD_GET,invokeSuccessCallback,invokeFailureCallback);


			function invokeSuccessCallback(result) {
				logger.log("### OnlineObjectService::_getMetadataOfObject::invokeSuccessCallback Response:" + JSON.stringify(result));
				var table = result["Metadata"]["table"];
				kony.sdk.ObjectServiceUtil.cacheObjectMetadata(serviceName,table);
				var tmpObjMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName,objectName);
				kony.sdk.verifyAndCallClosure(entitySuccessCallback, tmpObjMetadata);
			}

			function invokeFailureCallback(error){
				logger.log("### OnlineObjectService::_getMetadataOfObject::invokeFailureCallback Error:" + JSON.stringify(error));
				kony.sdk.verifyAndCallClosure(serviceErrorCallback,error);
			}
		}
	}
};

//Method is used to send http request for ObjectService operations
function invokeObjectOperation(url, svcid, headers, formData, httpMethod, successCallback, failureCallback) {
	var requestData = {};
	var logger = new konyLogger();
	var networkProvider = new konyNetworkProvider();
	var reportingData = kony.sdk.getPayload(konyRef);
	var sessionId = null;
	if (kony.ds) {
		sessionId = kony.ds.read("konyUUID");
	}

	if(sessionId){
	  reportingData.rsid = sessionId[0];
	}
    if (!reportingData.rsid) {
		logger.log("### invokeObjectOperation:: rsid is either empty,null or undefined");
	}
	if(!httpMethod) {
		//default http method is post
		httpMethod = "POST";
	}
	//sending metrics for post calls
	/*if (httpMethod === "POST") {
		if (formData == null || formData == undefined) {
			formData = new kony.net.FormData();
		}
		if (kony.sdk.metric) {
			if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
				kony.sdk.metric.readFromDS();
			}
			kony.sdk.metric.pushEventsToBufferArray();
			if (kony.sdk.metric.reportEventBufferBackupArray && kony.sdk.metric.reportEventBufferBackupArray.length > 0) {
				formData.append("events", JSON.stringify(kony.sdk.metric.reportEventBufferBackupArray));
			}
		}

		//TODO serviceid definition
		if (svcid) {
			reportingData.svcid = svcid;
		}
		formData.append("konyreportingparams", JSON.stringify(reportingData));
	}*/

	var defaultHeaders = {
		//	"Content-Type": "application/x-www-form-urlencoded",
		"X-Kony-Authorization": konyRef.currentClaimToken
	};

	if(reportingData != null && reportingData != undefined) {
		try {
			defaultHeaders["X-Kony-ReportingParams"] = encodeURI(JSON.stringify(reportingData))
		}catch(error) {
			logger.log("### invokeObjectOperation::error while parsing metrics payload" + error);
		}
	}
	// if the user has defined his own headers, use them
	if (headers) {
		for (var header in headers) {
			defaultHeaders[header] = headers[header];
		}
	}
	function networksuccess(res) {
		if (kony.sdk.metric) {
			kony.sdk.metric.clearBufferEvents();
		}
		kony.sdk.verifyAndCallClosure(successCallback, res);
	}

	function networkerror(xhr, status, err) {
		if (xhr && !(status && err)) {
			err = xhr;
		}
		if (kony.sdk.metric) {
			if (kony.sdk.metric.errorCodeMap[xhr.opstatus]) {
				kony.sdk.metric.saveInDS();
			}
		}
		if(err["mfcode"]){
			var konyRef = kony.sdk.getCurrentInstance();
			//clear the cache if the error code related to session/token expiry
			if (kony.sdk.isSessionOrTokenExpired(err["mfcode"])) {
				kony.sdk.resetCacheKeys(konyRef);
			}
		}
		kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getObjectServiceErrObj(err));
	}

	//encode url for object services operations as they will contain odata query in the url
	url = encodeURI(url);

	if (httpMethod === "GET") {
		networkProvider.get(url, null, defaultHeaders, networksuccess, networkerror, "formdata");
	} else {
		networkProvider.post(url, formData, defaultHeaders,	networksuccess,	networkerror, "formdata");
	}
}
kony.sdk.util = kony.sdk.util || {};
kony.sdk.ObjectServiceUtil = kony.sdk.ObjectServiceUtil || {};
kony.sdk.dto = kony.sdk.dto || {};
kony.sdk.constants["picklist"] = "picklist";
kony.sdk.constants["reference"] = "reference";
kony.sdk.constants["picklistmultiselect"] = "picklistmultiselect";
kony.sdk.constants["extendedfield"] = "extendedfield";
kony.sdk.constants["objectMetadataMap"] = {};//Does not contain relationshipList of the object, relationshipList of an object will be added when getMetadataOfObject for that object is called.
kony.sdk.constants["HTTP_METHOD_GET"] = "GET";
kony.sdk.constants["HTTP_METHOD_POST"] = "POST";
kony.sdk.constants["binary"] = "binary";

kony.sdk.constants.DateTimeType = {
    TODAY: "TODAY",
    YESTERDAY: "YESTERDAY",
    TOMORROW: "TOMORROW",
    CURRENTWEEK: "CURRENTWEEK",
    LASTWEEK: "LASTWEEK",
    NEXTWEEK: "NEXTWEEK",
    CURRENTMONTH: "CURRENTMONTH",
    LASTMONTH: "LASTMONTH",
    NEXTMONTH: "NEXTMONTH"
};

kony.sdk.constants.Aggregation = {
    NONE: "",
    COUNT: "COUNT",
    SUM: "SUM",
    MAX: "MAX",
    MIN: "MIN",
    AVG: "AVG"
};

kony.sdk.constants.OrderType = {
    ASCENDING: "ASC",
    DESCENDING: "DESC"
};

kony.sdk.constants.MatchType = {
    EQUALS: {
        value: "=",
        name: "EQUALS"
    },
    GREATER: {
        value: ">",
        name: "GREATER"
    },
    GREATEREQUAL: {
        value: ">=",
        name: "GREATEREQUAL"
    },
    LESS: {
        value: "<",
        name: "LESS"
    },
    LESSEQUAL: {
        value: "<=",
        name: "LESSEQUAL"
    },
    STARTSWITH: {
        value: "LIKE",
        name: "STARTSWITH"
    },
    CONTAINS: {
        value: "LIKE",
        name: "CONTAINS"
    },
    LIKE: {
        value: "LIKE",
        name: "LIKE"
    },
    ENDSWITH: {
        value: "LIKE",
        name: "ENDSWITH"
    },
    NOTEQUAL: {
        value: "<>",
        name: "NOTEQUAL"
    },
    ISNULL: {
        value: "IS NULL",
        name: "ISNULL"
    },
    ISNOTNULL: {
        value: "IS NOT NULL",
        name: "ISNOTNULL"
    }
};

kony.sdk.constants.JoinType = {
    INNER: "INNER",
    LEFT: "LEFT",
    RIGHT: "RIGHT"

};

kony.sdk.constants.Operator = {
    AND: "AND",
    OR: "OR"
};

/**
 * This is a utility function used to check whether the two strings provided
 * would match with each other.
 * @param string1
 * @param string2
 * @return boolean
 */
kony.sdk.util.matchIgnoreCase = function (string1, string2) {
    if (string1 === null || string2 === null || string1 === undefined
        || string2 === undefined) {
        return false;
    }
    return (string1.toUpperCase() === string2.toUpperCase());
};

kony.sdk.util.isNull = function (val) {
    if (val === null || val === undefined)
        return true;
    val = val + "";
    return (kony.sdk.util.matchIgnoreCase(val, "null"));
};

kony.sdk.util.isValidNumberType = function (val) {
    if (kony.sdk.util.matchIgnoreCase(typeof val, "number"))
        return true;
    else if (kony.sdk.util.matchIgnoreCase(typeof val, "string")
        && null != kony.sdk.util.toNumber(val))
        return true;
    else
        return false;

};

kony.sdk.util.toNumber = function (arg) {
    if (arguments.length != 1) {
        throw new Error("Invalid argument to kony.sdk.util.toNumber");
    }
    if (typeof (arg) === "number") {
        return arg;
    } else if (typeof (arg) === "string") {
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

kony.sdk.util.validateCriteriaObject = function (criteria) {
    if (criteria !== null && criteria !== undefined) {
        return (criteria instanceof kony.sdk.dto.Criteria || criteria instanceof kony.sdk.dto.Match
        || criteria instanceof kony.sdk.dto.Between
        || criteria instanceof kony.sdk.dto.LogicGroup || criteria instanceof kony.sdk.dto.And
        || criteria instanceof kony.sdk.dto.Or || criteria instanceof kony.sdk.dto.Not
        || criteria instanceof kony.sdk.dto.Expression
        || criteria instanceof kony.sdk.dto.InCriteria || criteria instanceof kony.sdk.dto.Exists
        || criteria instanceof kony.sdk.dto.Join);
    } else {
        return false;
    }
};

kony.sdk.ObjectServiceUtil.cacheMetadata = function (serviceName, objects) {
    if (objects !== undefined && objects !== null) {
        kony.sdk.nativestore.removeItem(serviceName);
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            //clearing the existing metadata of service and updating it with the latest metadata
            kony.sdk.ObjectServiceUtil.cacheObjectMetadata(serviceName, object);
        }
    }
};

kony.sdk.ObjectServiceUtil.cacheObjectMetadata = function (serviceName, object) {
    if (object !== undefined && object !== null) {
        //getting metadata of servicename
        var metadataOfAllObjs = kony.sdk.nativestore.getItem(serviceName);
        var jsonObject = JSON.parse('{}');
        //if metadata available get it
        if (metadataOfAllObjs !== null && metadataOfAllObjs !== undefined && metadataOfAllObjs !== "{}") {
            jsonObject = JSON.parse(metadataOfAllObjs);
        }
        //adding metadata of object to the existing metadata
        jsonObject[object.name] = object;
        var jsonStr = JSON.stringify(jsonObject);
        kony.sdk.nativestore.setItem(serviceName, jsonStr);
    }
};

kony.sdk.ObjectServiceUtil.getCachedMetadata = function (serviceName) {
	
	var appMetadata = kony.sdk.util.getPackagedMetadata();
	if(appMetadata != null && appMetadata != undefined){
		if(serviceName != undefined && serviceName != null)
			return appMetadata[serviceName];
	}
	else{
		//reading metadata from the store
		var jsonObject = null;
		var metadataOfAllObjs = kony.sdk.nativestore.getItem(serviceName);
		if (metadataOfAllObjs !== null && metadataOfAllObjs !== undefined && metadataOfAllObjs !== "{}") {
			jsonObject = JSON.parse(metadataOfAllObjs);
		}
		return jsonObject;
	}
	return null;
};

kony.sdk.ObjectServiceUtil.getCachedObjectMetadata = function (serviceName, objectName) {
    var objectMetadata;
    if (objectName !== undefined && objectName !== null) {
        var metadataOfAllObjs = kony.sdk.ObjectServiceUtil.getCachedMetadata(serviceName);
        var jsonObject = null;
        if (metadataOfAllObjs !== null && metadataOfAllObjs !== undefined && metadataOfAllObjs !== "{}") {
            jsonObject = metadataOfAllObjs;
            //getting the object's metadata from the stored metadata
            objectMetadata = jsonObject[objectName];
        }
    }
    return objectMetadata;
};

// This function is responsible for checking if the array contains the object based on object's name property.
// returns the array element if the object matches
kony.sdk.util.getExtendedFieldsFromArray = function (array, object) {
    if (array instanceof Array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] instanceof kony.sdk.dto.FieldMetadata && object instanceof kony.sdk.dto.Column) {
                if (kony.sdk.util.matchIgnoreCase(array[i].name, object.getName()) && kony.sdk.util.matchIgnoreCase(array[i].type, "extendedfield")) {
                    return array[i];
                }
            }
        }
        return null;
    }
};

/**
 * An object used to perform CRUD operations on objects
 * @param objectName
 * @param record
 * @constructor
 */
kony.sdk.dto.DataObject = function (objectName, record) {
    this.objectName = objectName;
    if (record != null && record != undefined) {
        this.record = record;
    } else {
        this.record = {};
    }

    this.odataUrl = null;
    this.selectQueryObject = null;

    /**
     * This function is used to add fields and their values to the dataobject
     * @param fieldName
     * @param value
     */
    this.addField = function (fieldName, value) {
        this.record[fieldName] = value;
    };

    /**
     * This function is used to set a map of records to the dataobject
     * @param fieldValuesMap
     */
    this.setRecord = function (fieldValuesMap) {
        this.record = fieldValuesMap;
    };

    /**
     * This function is used to get the map of records present in the DataObject
     * @returns {JSON} record
     */
    this.getRecord = function () {
        return this.record;
    };

    /**
     * This function is used to add a child Dataobject into the data object
     * @param  childDataObject {@link kony.sdk.dto.DataObject}
     */
    this.addChildDataObject = function (childDataObject) {
        if (this.record[childDataObject.objectName] == null || this.record[childDataObject.objectName] == undefined) {
            this.record[childDataObject.objectName] = [];
        }
        this.record[childDataObject.objectName].push(childDataObject.getRecord());
    };

    /**
     * This function is used to set the odata url to query
     * @param odataUrl
     */
    this.setOdataUrl = function (odataUrl) {
        this.odataUrl = odataUrl;
    };

    /**
     * This function is used to get the odata url to query
     * @returns {null}
     */
    this.getOdataUrl = function () {
        return this.odataUrl;
    };

    /**
     * This function is used to set a SelectQueryObject {@link kony.sdk.dto.SelectQuery}
     * @param selectQueryObject {@link kony.sdk.dto.SelectQuery}
     */
    this.setSelectQueryObject = function (selectQueryObject) {
        this.selectQueryObject = selectQueryObject;
    };

    /**
     * This function is used to get a SelectQueryObject {@link kony.sdk.dto.SelectQuery}
     * @returns selectQueryObject {@link kony.sdk.dto.SelectQuery}
     */
    this.getSelectQueryObject = function () {
        return this.selectQueryObject;
    };

    /**
     * This function is used to get the object name
     * @returns objectName {string}
     */
    this.getObjectName = function () {
        return this.objectName;
    };
};

/**
 * This Object represent picklist values
 * @constructor
 */
kony.sdk.dto.PickList = function () {

    this.id = null;
    this.active = null;
    this.label = null;
    this.value = null;
    this.validFor = null;
    this.defaultValue = null;
    this.fieldMappingId = null;

    this.setId = function (id) {
        this.id = id;
    }
    this.getId = function () {
        return this.id;
    }
    this.setActive = function (active) {
        this.active = active;
    }
    this.isActive = function () {
        return this.active;
    }
    this.setLabel = function (label) {
        this.label = label;
    }
    this.getLabel = function () {
        return this.label;
    }
    this.setValue = function (value) {
        this.value = value;
    }
    this.getValue = function () {
        return this.value;
    }
    this.setValidFor = function (validFor) {
        this.validFor = validFor;
    }
    this.getValidFor = function () {
        return this.validFor;
    }
    this.setDefaultValue = function (defaultValue) {
        this.defaultValue = defaultValue;
    }
    this.getDefaultValue = function () {
        return this.defaultValue;
    }
    this.setFieldMappingId = function (fieldMappingId) {
        this.fieldMappingId = fieldMappingId;
    }
    this.getFieldMappingId = function () {
        return this.fieldMappingId;
    }
}

/**
 * The structure of Object Metadata obtained from server
 * @constructor
 */
kony.sdk.dto.ObjectMetadata = function () {
    //variables to store metadata of the object.
    this.custom;
    this.customizable;
    this.displayName;
    this.entityTypeID;
    this.columns;
    this.junction;
    this.name;
    this.primaryKey;
    this.relationshipList;
    this.sourceEntityName;
    this.updateable;
    this.uniqueKeys;
}

/**
 * The structure of Field Metadata obtained from server
 * @constructor
 */
kony.sdk.dto.FieldMetadata = function () {
    this.auditColumn;
    this.createable;
    this.custom;
    this.customizable;
    this.type;
    this.defaultValue;
    this.displayName;
    this.fieldMappingId;
    this.hasIndex;
    this.name;
    this.nameField;
    this.nullable;
    this.primaryKey;
    this.sourceFieldName;
    this.table;
    this.updateable;

    // array of picklistValueDto objects to hold the pick list values. This will be populated only when the data type is of picklist type
    this.pickListValues;
}

/**
 * The structure of Object Relationship in metadata obtained from server
 * @constructor
 */
kony.sdk.dto.ObjectRelationship = function () {
    this.entityName;
    this.entityPageTemplateId;
    this.id;
    this.junctionTableName;
    this.operationType;
    this.relatedEntity;
    this.relationshipFields;
    this.relationshipName;
    this.relationshipType;
    this.custom;
}

/**
 * The Object used to define select query object, in order to fetch data
 * @param serviceName
 * @param tableObj {@link kony.sdk.dto.Table}
 * @constructor
 */
kony.sdk.dto.SelectQuery = function (serviceName, tableObj) {
    this.tables = [];
    this.columnList = [];
    this.criteriaList = [];
    this.isDistinct = false;
    this.orderList = [];
    this.joinList = [];
    this.groupList = [];
    this.limit = null;
    this.skip = null;
    this.oDataURL = null;
    if (tableObj instanceof kony.sdk.dto.Table) {
        this.tables.push(tableObj);
    }
    /**
     * This function is used to set Limit value
     * @param val
     */
    this.setLimit = function (val) {
        this.limit = val;
    };

    /**
     * This function is used to set Skip value
     * @param val
     */
    this.setSkip = function (val) {
        this.skip = val;
    };

    /**
     * This function is used to get the Limit Value
     * @returns {integer} limit
     */
    this.getLimit = function () {
        return this.limit;
    };

    /**
     * This function is used to get the Skip Value
     * @returns {integer} skip
     */
    this.getSkip = function () {
        return this.skip;
    };

    /**
     * This function is used to add a column object into the select query
     * @param columnObj {@Link kony.sdk.dto.Column}
     * @returns {Array}
     */
    this.addColumn = function (columnObj) {
        if (columnObj instanceof kony.sdk.dto.Column) {
            this.columnList.push(columnObj);
            return this.columnList;
        }
    };

    /**
     * This function is used to add a criteria object to the select query
     * @param criteriaObj
     * @returns {Array}
     */
    this.addCriteria = function (criteriaObj) {
        if (kony.sdk.util.validateCriteriaObject(criteriaObj)) {
            this.criteriaList.push(criteriaObj);
            return this.criteriaList;
        }
    };

    /**
     * This function is used to add a group object to select query
     * @param groupObj
     */
    this.addGroup = function (groupObj) {
        if (groupObj instanceof kony.sdk.dto.Group) {
            this.groupList.push(groupObj);
            for (var i = 0; i < this.tables.length; i++) {
                if (this.tables[i].getName().toUpperCase() === groupObj
                        .getColumn().getTable().getName().toUpperCase()) {
                    return;
                }
            }
            this.tables.push(groupObj.getColumn().getTable());
        }
    };

    /**
     * This function is used to add a join object
     * @param joinObj
     */
    this.addJoin = function (joinObj) {
        if (joinObj instanceof kony.sdk.dto.Join) {
            this.joinList.push(joinObj);
            for (var i = 0; i < this.tables.length; i++) {
                if (this.tables[i].getName().toUpperCase() === joinObj
                        .getTable().getName().toUpperCase()) {

                    if (this.tables[i].getAlias() != null
                        || joinObj.getTable().getAlias() != null
                        || this.tables[i].getAlias() != undefined
                        || joinObj.getTable().getAlias() != undefined) {
                        if (this.tables[i].getAlias().toUpperCase() === joinObj
                                .getTable().getAlias().toUpperCase()) {
                            return;
                        } else {
                            this.tables.push(joinObj.getTable());
                            return;
                        }
                    } else {
                        return;
                    }
                }
            }
            this.tables.push(joinObj.getTable());
        }
    };

    /**
     * This function is used to add order object to a select query
     * @param orderObj
     */
    this.addOrder = function (orderObj) {
        var currentobject = this;
        if (orderObj instanceof kony.sdk.dto.Order) {
            this.orderList.push(arguments[0]);
            for (var i = 0; i < this.tables.length; i++) {
                if (this.tables[i].getName().toUpperCase() === arguments[0]
                        .getColumn().getTable().getName().toUpperCase()) {
                    return;
                }
            }
            this.tables.push(orderObj.getColumn().getTable());
        }
    };

    /**
     * This function is used to return tables in select query
     * @returns {Array} Tables
     */
    this.getTables = function () {
        return this.tables;
    };

    /**
     * This function is used to get isDistinct flag
     * @returns {boolean}
     */
    this.getDistinct = function () {
        return this.isDistinct;
    };

    /**
     * This function is used to return columns in select query
     * @returns {Array} Columns
     */
    this.getColumns = function () {
        return this.columnList;
    };

    /**
     * This function is used to get criteria objects in the select query
     * @returns {Array} Criterias
     */
    this.getCriterias = function () {
        return this.criteriaList;
    };

    /**
     * This function is used to get the group objects in the select query
     * @returns {Array} GroupObjs
     */
    this.getGroups = function () {
        return this.groupList;
    };

    /**
     * This function is used to get the Join objects in the select query
     * @returns {Array} Joins
     */
    this.getJoins = function () {
        return this.joinList;
    };

    /**
     * This function is used to get the Order Objects in the select query
     * @returns {Array} OrderObjs
     */
    this.getOrders = function () {
        return this.orderList;
    };

    /**
     * This function is used to remove columnobject set in select query
     * @param columnObj {@link kony.sdk.dto.Column}
     */
    this.removeColumn = function (columnObj) {
        if (columnObj instanceof kony.sdk.dto.Column) {
            this.columnList.splice(this.columnList.indexOf(columnObj), 1);
        }
    };

    /**
     * This function is used to remove criteriaObject from select query
     * @param criteriaObj
     */
    this.removeCriteria = function (criteriaObj) {
        if (criteriaObj instanceof Criteria) {
            this.criteriaList.splice(this.criteriaList.indexOf(criteriaObj), 1);
        }
    };

    /**
     * This function is used to remove group set from select query
     * @param groupObj
     */
    this.removeGroup = function (groupObj) {
        if (groupObj instanceof kony.sdk.dto.Group) {
            this.groupList.splice(this.groupList.indexOf(groupObj), 1);
        }
    };

    /**
     * This function is used to remove Join set in select query
     * @param joinObj
     */
    this.removeJoin = function (joinObj) {
        if (joinObj instanceof kony.sdk.dto.Criteria) {
            this.joinList.splice(this.joinList.indexOf(joinObj), 1);
        }
    };

    /**
     * This function is used to remove OrderObj set in SelectQuery
     * @param orderObj
     */
    this.removeOrder = function (orderObj) {
        if (orderObj instanceof kony.sdk.dto.Order) {
            this.orderList.splice(this.orderList.indexOf(orderObj), 1);
        }
    };

    /**
     * This function is used to set isDistinct
     * @param isDistinct
     */
    this.setDistinct = function (isDistinct) {
        this.isDistinct = isDistinct;
    };

    /**
     * This function is used to get the select query in the form of a string
     * @returns {string}
     */
    this.toString = function () {
        var selectQueryDto = this;
        var query = "";
        query = query + "SELECT ";
        if (this.getDistinct() == true || this.getDistinct() == "true") {
            query = query + " DISTINCT ";
        }

        // Fetch the metadata for the base table and see if there are any extended fields associated with it
        // If there are any, create a join between the base table and the corresponding parent table and fetch it

        var columns = this.columnList;
        var extendedFields = [];
        var columnsArr = [];
        var extendedJoins = [];
        var baseTable = this.getTables()[0];
        var objectMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, baseTable.getName());

        if (columns.length !== 0) {
            var field = null;
            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                field = kony.sdk.util.getExtendedFieldsFromArray(objectMetadata.columns, columns[colIndex]);
                if (field !== null && field !== undefined) {
                    selectQueryDto.columnList[colIndex].dataType = field.type;
                    selectQueryDto.columnList[colIndex].parentFieldName = field.parentFieldName;
                    extendedFields.push(field);
                    field = null;
                } else {
                    columnsArr.push(columns[colIndex]);
                }
            }
        } else {
            var col = null;
            var field = null;
            for (var colIndex = 0; colIndex < objectMetadata.columns.length; colIndex++) {
                field = objectMetadata.columns[colIndex];
                col = new kony.sdk.dto.Column(baseTable, field.name);
                col.dataType = field.type;
                col.parentFieldName = field.parentFieldName;
                selectQueryDto.columnList.push(col);
                if (field !== null && field !== undefined && kony.sdk.util.matchIgnoreCase(field.type, "extendedfield")) {
                    extendedFields.push(field);
                    field = null;
                } else {
                    columnsArr.push(columns[colIndex]);
                }
            }
        }

        var columnStr = selectQueryDto.appendListToQuery(columnsArr, ", ", 0);

        if (columnStr !== null && columnStr !== "") {
            query = query + columnStr;
        }
        //TODO have to modify the code based on latest metadata
        if (extendedFields !== null && extendedFields !== undefined && extendedFields.length !== 0) {
            var join = null;
            var table = null;
            var srcCol = null;
            var destCol = null;
            var joinType = kony.sdk.constants.JoinType.LEFT;
            var col = null;
            var colList = [];
            var extendedTablesAdded = {};
            for (var extIndex = 0; extIndex < extendedFields.length; extIndex++) {

                if (extendedTablesAdded !== null && extendedTablesAdded.hasOwnProperty(extendedFields[extIndex].parentTableName)) {
                    extendedTablesAdded["" + extendedFields[extIndex].parentTableName] = ++extendedTablesAdded["" + extendedFields[extIndex].parentTableName];
                } else {
                    extendedTablesAdded["" + extendedFields[extIndex].parentTableName] = 0;
                }
                table = new kony.sdk.dto.Table(extendedFields[extIndex].parentTableName);
                // Now add all extended field columns to the query
                col = new kony.sdk.dto.Column(table, extendedFields[extIndex].parentFieldName);

                colList.push(col);
                // Need to fetch the source table's primary key name from the metadata. For now hard coding it to 'id'
                //TODO
                srcCol = new kony.sdk.dto.Column(baseTable, extendedFields[extIndex].foreignKeyFieldName);
                destCol = new kony.sdk.dto.Column(table, extendedFields[extIndex].referencedField || "id");

                join = new kony.sdk.dto.Join(table, srcCol, destCol, joinType);
                if (join !== null && join !== undefined && extendedTablesAdded["" + extendedFields[extIndex].parentTableName] === 0) {
                    extendedJoins.push(join);
                }
            }
            var extColStr = "";
            for (var i = 0; i < colList.length; i++) {
                extColStr = extColStr + colList[i].toString();
                if (i < colList.length - 1) {
                    extColStr = extColStr + ",";
                }
            }

            if (extColStr !== null && extColStr !== "") {
                query = query + "," + extColStr;
            }
            if (extendedJoins !== null && extendedJoins !== undefined) {
                for (var joinIndex = 0; joinIndex < extendedJoins.length; joinIndex++) {
                    selectQueryDto.addJoin(extendedJoins[joinIndex]);
                }
            }
        }
        query = query + " FROM ";
        query = query + selectQueryDto.getTables()[0].toString();

        if (selectQueryDto.getJoins().length !== 0) {
            var joinStr = selectQueryDto.appendListToQuery(selectQueryDto.joinList, " ", -1);
            query = query + joinStr;
        }
        if (!(selectQueryDto.criteriaList.length == 0)) {
            query = query + " WHERE ";
            query = query
                + selectQueryDto.appendListToQuery(selectQueryDto.criteriaList, " AND ", -1);
        }
        if (!(selectQueryDto.groupList.length == 0)) {
            query = query + " GROUP BY ";
            query = query + selectQueryDto.appendListToQuery(selectQueryDto.groupList, ", ", -1);
        }
        if (!(selectQueryDto.orderList.length == 0)) {
            query = query + " ORDER BY ";
            query = query + selectQueryDto.appendListToQuery(selectQueryDto.orderList, " ,", -1);
        }
        if (selectQueryDto.limit !== null && selectQueryDto.limit !== undefined
            && kony.sdk.util.isValidNumberType(selectQueryDto.limit) && selectQueryDto.limit !== 0) {
            query = query + " LIMIT " + selectQueryDto.limit;
        }
        if (selectQueryDto.skip !== null && selectQueryDto.skip !== undefined
            && kony.sdk.util.isValidNumberType(selectQueryDto.skip) && selectQueryDto.skip !== 0) {
            query = query + " OFFSET " + selectQueryDto.skip;
        }
        return query;
    };

    this.appendListToQuery = function (objectList, seperator, mode) {
        var listBuffer = "";
        for (var i = 0; i < objectList.length; i++) {
            var obj = objectList[i];
            if (mode > -1) {
                if (obj !== null) {
                    if (obj instanceof kony.sdk.dto.Column) {
                        listBuffer = listBuffer.concat(obj.toString());
                    } else {
                        listBuffer = listBuffer.concat(obj.toString());
                    }
                }
            } else if (obj !== null && obj !== undefined) {
                listBuffer = listBuffer.concat(obj.toString());
            }
            if (i < objectList.length - 1) {
                listBuffer = listBuffer.concat(seperator);
            }
        }
        return listBuffer;
    };
};

/**
 * This object is used to define a record object used in Offline CRUD
 * @constructor
 */
kony.sdk.dto.RecordObject = function () {
    this.tableName = "";
    this.columnValues = {};
    this.childRecords = [];
};

/**
 * This function is the Table constructor.
 * @param tableName
 * @param tableAlias
 * @param junctionType
 * @constructor
 */
kony.sdk.dto.Table = function (tableName, tableAlias, junctionType) {
    this.name = tableName;
    this.alias = tableAlias;
    this.isjunction = junctionType;

    this.getAlias = function () {
        return this.alias;
    };
    /**
     * This function is used to set alias.
     *
     * @param alias
     */
    this.setAlias = function (alias) {
        this.alias = alias;
    };
    this.getName = function () {
        return this.name;
    };
    /**
     * This function is used to set name.
     *
     * @param name
     */
    this.setName = function (name) {
        this.name = name;
    };
    /**
     * This function is used to check object equality.
     *
     * @param obj
     * @return Boolean
     */
    this.equals = function (obj) {
        var areObjectsEqual = false;
        if (obj === null || obj === undefined) {
            areObjectsEqual = false;
        } else if (typeof (this) === typeof (obj)) {
            areObjectsEqual = true;

            if (this.hasAlias() && obj.hasAlias()) {
                areObjectsEqual = this.getAlias() === obj.getAlias();
            } else {
                areObjectsEqual = this.getName() === obj.getName();
            }
        } else {
            areObjectsEqual = false;
        }
        return areObjectsEqual;
    };
    this.getColumn = function (columnName) {
        return new kony.sdk.dto.Column(this, columnName);
    };
    /**
     * This function is used to check if alias is present or not.
     *
     * @return Boolean
     */
    this.hasAlias = function () {
        return (this.alias !== null && this.alias !== undefined);
    };
    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        return this.getName() + (this.hasAlias() ? " " + this.getAlias() : "");
    };
    /**
     * This function is used to return if the table is a junction table.
     *
     * @return boolean
     */
    this.isJunction = function () {
        return (this.isjunction && this.isjunction == true);
    };
    /**
     * This function is used to set the type of table junction/non-junction table.
     *
     * @param junctionType
     */
    this.setJunction = function (junctionType) {
        this.isjunction = junctionType;
    };
};

/**
 * This function is a Column constructor
 * @param tableObj {@link kony.sdk.dto.Table}
 * @param colName
 * @constructor
 */
kony.sdk.dto.Column = function (tableObj, colName) {
    if (tableObj instanceof kony.sdk.dto.Table) {
        this.aggregation = null;
        this.alias = null;
        this.dataType = null;
        this.name = null;
        this.table = null;

        if (colName !== undefined && colName !== null
            && typeof (colName) === "string") {
            this.name = colName;
        } else {
            //TODO
            //throw error

            kony.sdk.logger.log("### kony.sdk.dto.Column:: Error: colName is undefined");
        }
        this.table = tableObj;
    } else {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.Column:: Error: tableObj is not an instance of kony.sdk.dto.Table");
    }

    this.getAggregation = function () {
        return this.aggregation;
    };
    this.setAggregation = function (aggregation) {
        this.aggregation = aggregation;
    };
    this.getAlias = function () {
        return this.alias;
    };
    this.setAlias = function (alias) {
        this.alias = alias;
    };
    this.getDataType = function () {
        return this.dataType;
    };
    this.setDataType = function (dataType) {
        this.dataType = dataType;
    };
    this.isComputedField = function () {
        return this.fieldComputed;
    };
    this.setComputedField = function (fieldComputed) {
        this.fieldComputed = fieldComputed;
    };
    this.getName = function () {
        return this.name;
    };
    this.setName = function (name) {
        if (name !== undefined && name !== null && typeof (name) === "string") {
            this.name = name;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Column::setName:: Error: name is undefined");
        }
    };
    this.getTable = function () {
        return this.table;
    };
    this.setTable = function (table) {
        if (table instanceof kony.sdk.dto.Table) {
            this.table = table;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Column:: Error: setTable is undefined");
        }
    };
    this.toStringByMode = function (mode) {
        var tableName = (this.getTable().getAlias() !== null && this.getTable()
            .getAlias() !== undefined) ? this.getTable().getAlias() : this
            .getTable().getName();
        var constructedColumn = null;
        var constructDataType = null;
        var constructAlias = null;
        var constructAggregation = null;

        switch (mode) {
            case 0:
                if (this.getDataType() !== null && this.getDataType() !== undefined) {
                    if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "Integer")) {
                        constructDataType = "CAST (" + tableName + "."
                            + this.getName() + " AS INTEGER)";
                    } else if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "Numeric")) {
                        constructDataType = "CAST (" + tableName + "."
                            + this.getName() + " AS NUMERIC)";

                    } else if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "Date")) {

                        constructDataType = "date(" + tableName + "."
                            + this.getName() + ")";

                    } else {
                        constructDataType = tableName + "." + this.getName();
                    }
                } else {
                    constructDataType = tableName + "." + this.getName();
                }
                constructAlias = (this.getAlias() !== null
                && this.getAlias() !== undefined && this.getAlias() !== "") ? " AS "
                + this.getAlias()
                    : "";
                constructAggregation = (this.getAggregation() === kony.sdk.constants.Aggregation.NONE || (this
                    .getAggregation() === null || this.getAggregation() === undefined)) ? constructDataType
                    : (this.isComputedField() ? this.getAggregation() : this.getAggregation() + "(" + constructDataType + ")" );
                constructedColumn = constructAggregation + constructAlias;
                break;
            case 1:
                if (this.getDataType() !== null && this.getDataType() !== undefined) {
                    if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "STRING"))
                        this.setDataType("text");
                }
                constructDataType = (this.getDataType() !== null && this
                    .getDataType() !== undefined) ? "CAST (" + tableName + "."
                + this.getName() + " AS " + this.getDataType() + ")"
                    : tableName + "." + this.getName();
                constructAggregation = (this.getAggregation() === kony.sdk.constants.Aggregation.NONE || (this
                    .getAggregation() === null || this.getAggregation() === undefined)) ? constructDataType
                    : (this.isComputedField() ? this.getAggregation() : this.getAggregation() + "(" + constructDataType + ")" );
                constructedColumn = constructAggregation;
                break;
            case 2:
                constructedColumn = this.getName();
                break;
            case 3:
                constructedColumn = this.getName();
                break;
            default:
                if (this.getDataType() !== null && this.getDataType() !== undefined) {
                    if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "STRING"))
                        this.setDataType("text");
                }
                constructDataType = (this.getDataType() !== null && this
                    .getDataType() !== undefined) ? "CAST (" + tableName + "."
                + this.getName() + " AS " + this.getDataType() + ")"
                    : tableName + "." + this.getName();
                constructAlias = (this.getAlias() !== null && this.getAlias() !== undefined) ? " AS "
                + this.getAlias()
                    : "";
                constructAggregation = (this.getAggregation() === kony.sdk.constants.Aggregation.NONE || (this
                    .getAggregation() === null || this.getAggregation() === undefined)) ? constructDataType
                    : (this.isComputedField() ? this.getAggregation() : this.getAggregation() + "(" + constructDataType + ")" );
                constructedColumn = constructAggregation + constructAlias;
                break;
        }
        return constructedColumn;
    };
    this.toString = function () {
        // To be removed later from here
        if (this.getDataType() !== null && this.getDataType() !== undefined) {
            if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "STRING"))
                dataType = "text";
        }
        var tableName = (this.getTable().getAlias() !== null
        && this.getTable().getAlias() !== undefined && this.getTable()
            .getAlias() !== "") ? this.getTable().getAlias() : this
            .getTable().getName();
        var constructedColumn = null;
        var constructDataType = null;
        var constructAggregation = null;
        if (this.getDataType() !== null && this.getDataType() !== undefined) {
            if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "Integer")) {
                constructDataType = "CAST (" + tableName + "." + this.getName()
                    + " AS INTEGER)";
            } else if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "Numeric")) {
                constructDataType = "CAST (" + tableName + "." + this.getName()
                    + " AS NUMERIC)";
            } else if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "Date")) {
                constructDataType = "date(" + tableName + "." + this.getName()
                    + ")";
            } else {
                if (!this.isComputedField())
                    constructDataType = tableName + "." + this.getName();
            }
        } else {
            if (!this.isComputedField())
                constructDataType = tableName + "." + this.getName();
        }
        var constructAlias = (this.getAlias() !== null
        && this.getAlias() !== undefined && this.getAlias() !== "") ? " AS "
        + this.getAlias()
            : "";
        constructAggregation = (this.getAggregation() === kony.sdk.constants.Aggregation.NONE || (this
            .getAggregation() === null || this.getAggregation() === undefined)) ? constructDataType
            : (this.isComputedField() ? this.getAggregation() : this.getAggregation() + "(" + constructDataType + ")" );

        constructedColumn = constructAggregation + constructAlias;
        return constructedColumn;
    };

    this.toStringByTablePrefix = function (includeTablePrefix) {
        if (includeTablePrefix) {
            return this.toString();
        } else {
            return this.getName();
        }
    }
};

/**
 * This Object represents a groupby clause in select query
 * @param columnObj {@link kony.sdk.dto.Column}
 * @constructor
 */
kony.sdk.dto.Group = function (columnObj) {
    if (columnObj instanceof kony.sdk.dto.Column) {
        this.column = columnObj;
    }

    this.getColumn = function () {
        return this.column;
    };
    this.setColumn = function (column) {
        if (column instanceof kony.sdk.dto.Column) {
            this.column = column;
        }
    };
    this.toString = function () {
        var tableName = (this.column.getTable().getAlias() !== null && this.column
            .getTable().getAlias() !== undefined) ? this.column.getTable()
            .getAlias() : this.column.getTable().getName();
        return tableName + "." + this.column.getName();
    };
};

/**
 * This Object represents JOINS used in kony.sdk.dto.SelectQuery
 * @constructor
 */
kony.sdk.dto.Join = function () {
    this.criteria;
    this.table;
    this.joinType;
    var currentObject = this;

    if (arguments.length === 3) {
        getJoinByTableCriteriaAndJoinType(arguments[0],
            arguments[1], arguments[2]);
    } else if (arguments.length === 4) {
        getJoinByDestTableAndSrcColumnAndDestColumnAndJoinType(
            arguments[0], arguments[1], arguments[2],
            arguments[3]);
    }

    /**
     * This function is the Join constructor which has 3 arguments.
     *
     * @param table
     * @param criteria
     * @param joinType
     */
    function getJoinByTableCriteriaAndJoinType(table, criteria,
                                               joinType) {

        if (table instanceof kony.sdk.dto.Table
            && kony.sdk.util.validateCriteriaObject(criteria)
            && joinType !== null
            && joinType !== undefined
            && (joinType === kony.sdk.constants.JoinType.INNER || joinType === kony.sdk.constants.JoinType.LEFT)) {
            currentObject.table = table;
            currentObject.joinType = joinType;
            currentObject.criteria = criteria;
            return currentObject;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Join::getJoinByTableCriteriaAndJoinType:: Error: Validation error at getJoinByTableCriteriaAndJoinType");
        }
    }

    /**
     * This function is the Join constructor which has 4 arguments.
     *
     * @param destTable
     * @param srcColumn
     * @param destColumn
     * @param joinTypeObj
     */
    function getJoinByDestTableAndSrcColumnAndDestColumnAndJoinType(destTable, srcColumn, destColumn, joinTypeObj) {
        if (destTable instanceof kony.sdk.dto.Table
            && srcColumn instanceof kony.sdk.dto.Column
            && destColumn instanceof kony.sdk.dto.Column
            && joinTypeObj !== null
            && joinTypeObj !== undefined
            && joinTypeObj !== ''
            && (joinTypeObj === kony.sdk.constants.JoinType.INNER || joinTypeObj === kony.sdk.constants.JoinType.LEFT)) {
            currentObject.table = destTable;
            currentObject.joinType = joinTypeObj;
            var criteria = new kony.sdk.dto.Match(srcColumn, kony.sdk.constants.MatchType.EQUALS,
                destColumn);
            currentObject.criteria = criteria;
            return currentObject;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Join::getJoinByDestTableAndSrcColumnAndDestColumnAndJoinType:: Error: Validation error at getJoinByDestTableAndSrcColumnAndDestColumnAndJoinType");
        }
    }

    this.getCriteria = function () {
        return this.criteria;
    };

    this.setCriteria = function (criteria) {
        if (kony.sdk.util.validateCriteriaObject(criteria)) {
            this.criteria = criteria;
        }
    };
    this.getTable = function () {
        return this.table;
    };

    this.setTable = function (table) {
        if (table instanceof kony.sdk.dto.Table) {
            this.table = table;
        }
    };
    this.getJoinType = function () {
        return this.joinType;
    };

    this.setJoinType = function (joinType) {
        if (joinType !== null) {
            this.joinType = joinType;
        }
    };

    this.initCriteria = function (srcColumn, destColumn) {

        if ((srcColumn instanceof kony.sdk.dto.Column)
            && (destColumn instanceof kony.sdk.dto.Column)) {
            var criteria = new kony.sdk.dto.Match(srcColumn, kony.sdk.constants.MatchType.EQUALS,
                destColumn);
            this.setCriteria(criteria);
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Join::initCriteria:: Error: srcColumn or destColumn is not an isntanceof kony.sdk.dto.Column");
        }
    };

    this.toString = function () {
        var returnString = null;
        var temp = null;
        var join;
        if (kony.sdk.constants.JoinType.INNER == this.getJoinType()) {
            join = "INNER";
        } else if (kony.sdk.constants.JoinType.LEFT == this.getJoinType()) {
            join = "LEFT";
        } else if (kony.sdk.constants.JoinType.RIGHT == this.getJoinType()) {
            join = "RIGHT";
        }
        returnString = " " + join + " JOIN "
            + this.getTable().toString() + " ON ";
        temp = this.getCriteria().toString();
        returnString = returnString + temp;
        return returnString;
    };
};

/**
 * This function is the Order constructor.
 * @param columnObj
 * @param orderTypeObj
 */
kony.sdk.dto.Order = function (columnObj, orderTypeObj) {
    if ((columnObj instanceof kony.sdk.dto.Column)
        && (orderTypeObj == kony.sdk.constants.OrderType.ASCENDING || orderTypeObj == kony.sdk.constants.OrderType.DESCENDING)) {
        this.column = columnObj;
        this.type = orderTypeObj;
        return this;
    } else {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.Order:: Error: Validation error")
    }

    this.getColumn = function () {
        return this.column;
    };

    /**
     * This function is used to set column.
     *
     * @param column
     */
    this.setColumn = function (column) {
        if (column instanceof kony.sdk.dto.Column) {
            this.column = column;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Order::setColumn: Error: column is not an instance of kony.sdk.dto.Column");
        }

    };
    this.getType = function () {
        return this.type;
    };

    /**
     * This function is used to set type.
     *
     * @param type
     */
    this.setType = function (type) {
        this.type = type;
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        return this.column.toString() + " " + (this.type);
    };
};

/**
 * This function is used to check the range of values of columnObj
 * @param columnObj {@link kony.sdk.dto.Column}
 * @param colRange
 * @constructor
 */
kony.sdk.dto.Between = function (columnObj, colRange) {
    this.column;
    this.range;

    if (columnObj instanceof kony.sdk.dto.Column
        && (colRange instanceof kony.sdk.dto.DateRange
        || colRange instanceof kony.sdk.dto.StringRange
        || colRange instanceof kony.sdk.dto.IntegerRange || colRange instanceof kony.sdk.dto.FloatRange)) {
        this.column = columnObj;
        this.range = colRange;
    } else {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.Between:: Error: Vaildation error");
    }


    this.quote = function (str) {
        if (kony.sdk.util.isNull(str)) {
            return "null";
        }
        // var str1 = new String(str);
        var strBuf = [];
        strBuf.push('\'');
        for (var index = 0; index < str.length; index++) {
            var charItem = str.charAt(index);
            if (charItem == '\\' || charItem == '\"'
                || charItem == '\'') {
                // strBuf.concat('\\');
                strBuf.push('\\');
            }
            strBuf.push(charItem);
        }
        strBuf.push('\'');
        return strBuf.join("");
    };

    this.setColumn = function (column) {
        if (column instanceof kony.sdk.dto.Column) {
            this.column = column;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Between::setColumn: Error:column is not an instance of kony.sdk.dto.Column");
        }
    };

    this.setRange = function (range) {
        if (range instanceof kony.sdk.dto.DateRange || range instanceof kony.sdk.dto.StringRange
            || range instanceof kony.sdk.dto.IntegerRange
            || range instanceof kony.sdk.dto.FloatRange) {
            this.range = range;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Between::setRange: Error: Validation Error");
        }
    };
    this.getColumn = function () {
        return this.column;
    };
    this.getRange = function () {
        return this.range;
    };
    this.toString = function () {
        var returnStr = "";
        returnStr = this.getColumn().toString() + " Between "
            + this.getRange().toString();
        return returnStr;
    };
};

/**
 * This function is the DateRange constructor.
 * @param startDate
 * @param endDate
 */
kony.sdk.dto.DateRange = function () {
    this.end;
    this.start;
    if (arguments.length === 2) {
        var startDate = arguments[0];
        var endDate = arguments[1];
        if (startDate instanceof Date && endDate instanceof Date) {
            this.start = startDate;
            this.end = endDate;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.DataRange:: Error: startDate or endDate is not an instance of Date");
        }
    } else if (arguments.length === 1) {
        var dateType = arguments[0];
        if (kony.sdk.util.validateDateTypeInput(dateType)) {
            var range = kony.sdk.util.getDateRange(dateType);
            if (range.length !== 2 || range[0] === 0 || range[1] === 0) {
                //TODO
                //throw error
                kony.sdk.logger.log("### kony.sdk.dto.DateRange:: Error: Validation Error");
            } else {
                this.start = range[0];
                this.end = range[1];
            }
        }
    }

    this.getEnd = function () {
        return this.end;
    };

    /**
     * This function is used to set End value.
     *
     * @param end
     */
    this.setEnd = function (end) {
        if (end instanceof Date) {
            var month = end.getMonth() + 1;
            var date = end.getDate();
            var hr = end.getHours();
            var min = end.getMinutes();
            var sec = end.getSeconds();
            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }
            if (hr < 10) {
                hr = "0" + hr;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            var endDate = end.getFullYear() + "-" + month + "-" + date + " "
                + hr + ":" + min + ":" + sec;
            this.end = endDate;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.DateRange::setEnd:: Error: end is not an instance of Date");
        }
    };

    this.getStart = function () {
        return this.start;
    };

    /**
     * This function is used to set start value.
     *
     * @param start
     */
    this.setStart = function (start) {
        if (start instanceof Date) {
            var month = start.getMonth() + 1;
            var date = start.getDate();
            var hr = start.getHours();
            var min = start.getMinutes();
            var sec = start.getSeconds();
            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }
            if (hr < 10) {
                hr = "0" + hr;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            var startDate = start.getFullYear() + "-" + month + "-" + date
                + " " + hr + ":" + min + ":" + sec;
            this.start = startDate;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.DateRange::setStart:: Error: start is not an instance of Date");
        }
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        var returnString = null;
        returnString = "'" + this.start + "'" + " AND " + "'" + this.end + "'";
        return returnString;
    };
};

/**
 * This function is the DecimalRange constructor.
 * @param startDecimal
 * @param endDecimal
 */
kony.sdk.dto.DecimalRange = function (startDecimal, endDecimal) {
    if ((endDecimal !== null && endDecimal !== undefined && typeof endDecimal === 'number')
        && (startDecimal !== null && startDecimal !== undefined && typeof startDecimal === 'number')) {
        this.end = endDecimal;
        this.start = startDecimal;
    } else {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.DecimalRange:: Error: Validation Error");
    }


    this.getEnd = function () {
        return this.end;
    };

    /**
     * This function is used to set End value.
     *
     * @param end
     */
    this.setEnd = function (end) {
        if (end !== null && end !== undefined && typeof end === 'number') {
            this.end = end;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.DecimalRange::setEnd:: Error: Validation Error");
        }
    };

    this.getStart = function () {
        return this.start;
    };

    /**
     * This function is used to set start value.
     *
     * @param start
     */
    this.setStart = function (start) {
        if (start !== null && start !== undefined && typeof start === 'number') {
            this.start = start;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.DecimalRange::setStart:: Error: Validation Error");
        }
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        var returnString = null;
        returnString = this.start + " AND " + this.end;
        return returnString;
    };
};

/**
 * This function is the FloatRange constructor.
 * @param startFloat
 * @param endFloat
 */
kony.sdk.dto.FloatRange = function (startFloat, endFloat) {
    this.end = endFloat;
    this.start = startFloat;

    this.getEnd = function () {
        return this.end;
    };

    /**
     * This function is used to set End value.
     *
     * @param end
     */
    this.setEnd = function (end) {
        if (end !== null && end !== undefined && typeof end === 'number') {
            this.end = end;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.FloatRange::setEnd:: Error: Validation Error");
        }
    };

    this.getStart = function () {
        return this.start;
    };

    /**
     * This function is used to set start value.
     *
     * @param start
     */
    this.setStart = function (start) {
        if (start !== null && start !== undefined && typeof start === 'number') {
            this.start = start;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.FloatRange::setStart:: Error: Validation Error");
        }
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        var returnString = null;
        returnString = this.start + " AND " + this.end;
        return returnString;
    };
};

/**
 * This function is the IntegerRange constructor.
 * @param startInt
 * @param endInt
 */
kony.sdk.dto.IntegerRange = function (startInt, endInt) {
    if ((endInt !== null && endInt !== undefined && typeof endInt === 'number')
        && (startInt !== null && startInt !== undefined && typeof startInt === 'number')) {
        this.end = endInt;
        this.start = startInt;

    } else {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.IntegerRange:: Error: Validation Error");
    }


    this.getEnd = function () {
        return this.end;
    };

    /**
     * This function is used to set End value.
     *
     * @param end
     */
    this.setEnd = function (end) {
        if (end !== null && end !== undefined && typeof end === 'number') {
            this.end = end;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.IntegerRange::setEnd:: Error: Validation Error");
        }
    };

    this.getStart = function () {
        return this.start;
    };

    /**
     * This function is used to set start value.
     *
     * @param start
     */
    this.setStart = function (start) {
        if (start !== null && start !== undefined && typeof start === 'number') {
            this.start = start;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.IntegerRange::setStart:: Error: Validation Error");
        }
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        var returnString = null;
        returnString = this.start.toFixed() + " AND " + this.end.toFixed();
        return returnString;
    };
};

/**
 * This function is the StringRange constructor.
 * @param startString
 * @param endString
 */
kony.sdk.dto.StringRange = function (startString, endString) {
    if ((endString !== null && endString !== undefined && typeof endString === 'string')
        && (startString !== null && startString !== undefined && typeof startString === 'string')) {
        this.end = endString;
        this.start = startString;
    } else {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.StringRange:: Error: Validation Error");
    }


    this.getEnd = function () {
        return this.end;
    };

    /**
     * This function is used to set End value.
     *
     * @param end
     */
    this.setEnd = function (end) {
        if (end !== null && end !== undefined && typeof end === 'string') {
            this.end = end;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.StringRange::setEnd:: Error: Validation Error");
        }
    };

    this.getStart = function () {
        return this.start;
    };

    /**
     * This function is used to set start value.
     *
     * @param start
     */
    this.setStart = function (start) {
        if (start !== null && start !== undefined && typeof start === 'string') {
            this.start = start;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.StringRange::setStart:: Error: Validation Error");
        }
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        var returnString = null;
        var crit = new kony.sdk.dto.Criteria();
        returnString = crit.quote(this.start) + " AND " + crit.quote(this.end);
        return returnString;
    };
};

/**
 * This function helps in preparing And {@link kony.sdk.dto.And} and Or {@Link kony.sdk.dto.Or} clauses
 * @param operatorLg
 * @param leftOp
 * @param rightOp
 * @constructor
 */
kony.sdk.dto.LogicGroup = function (operatorLg, leftOp, rightOp) {
    this.left = leftOp;
    this.operator = operatorLg;
    this.right = rightOp;


    /**
     * This function is used to initialize LogicGroup.
     *
     * @param operator
     * @param left
     * @param right
     */
    this.initializeLogicGroup = function (operator, left, right) {
        this.left = left;
        this.operator = operator;
        this.right = right;
    };

    this.getLeft = function () {
        return this.left;
    };

    /**
     * This function is used to set left.
     *
     * @param val
     */
    this.setLeft = function (val) {
        this.val = val;
    };
    this.getOperator = function () {
        return this.operator;
    };

    /**
     * This function is used to set Operator.
     *
     * @param val
     */
    this.setOperator = function (val) {
        this.operator = val;
    };
    this.getRight = function () {
        return this.right;
    };

    /**
     * This function is used to set Right.
     *
     * @param val
     */
    this.setRight = function (val) {
        this.right = val;
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        var leftOperator = (this.getLeft() !== null && this.getLeft !== undefined) ? this
            .getLeft().toString()
            : "";
        var rightOperator = (this.getRight() !== null && this
            .getRight() !== undefined) ? this.getRight().toString()
            : "";
        return "(" + leftOperator + " " + this.getOperator() + " "
            + rightOperator + ")";
    };
};

/**
 * This function is the And constructor.
 *
 * @param left
 * @param right
 */
kony.sdk.dto.And = function (left, right) {
    if (arguments.length !== 2) {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.And:: Error: invalid number of arguments, expected are left and right");
    }
    if ((right !== null && left !== null && right !== undefined
        && left !== undefined
        && kony.sdk.util.validateCriteriaObject(left) && kony.sdk.util.validateCriteriaObject(right))) {
        kony.sdk.dto.LogicGroup.call(this, 'AND', left, right);
    } else {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.And:: Error: Validation Error");
    }


    this.initializeAnd = function (left, right) {
        kony.sdk.dto.LogicGroup.call(this, 'AND', left, right);
    };
};

/**
 * This function is the Or constructor.
 *
 * @param left
 * @param right
 */
kony.sdk.dto.Or = function (left, right) {
    if (arguments.length !== 2) {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.Or:: Error: invalid number of arguments, expected are left and right");
    }
    if ((right !== null && left !== null && right !== undefined
        && left !== undefined
        && kony.sdk.util.validateCriteriaObject(left) && kony.sdk.util.validateCriteriaObject(right))) {
        kony.sdk.dto.LogicGroup.call(this, 'OR', left, right);
    } else {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.Or:: Error: Validation Error");
    }

    this.initializeOr = function (left, right) {
        kony.sdk.dto.LogicGroup.call(this, 'OR', left, right);
    };
};

/**
 * This function is the Not constructor.
 *
 * @param right
 */
kony.sdk.dto.Not = function (right) {
    if (arguments.length !== 1) {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.Not:: Error: invalid number of arguments, expected right");
    }
    if (right !== null && right !== undefined
        && kony.sdk.util.validateCriteriaObject(right)) {
        kony.sdk.dto.LogicGroup.call(this, 'NOT', null, right);
    } else {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.Not:: Error: Validation Error");
    }


    this.initializeNot = function (right) {
        kony.sdk.dto.LogicGroup.call(this, 'NOT', null, right);
    };
};

/**
 * This function is a constructor for Expression Object
 * @constructor
 */
kony.sdk.dto.Expression = function () {
    this.term;
    this.operator;
    this.expression;
    var currentExpObj = this;
    if (arguments.length === 1) {
        if (kony.sdk.util.validateCriteriaObject(arguments[0])) {
            setTerm(arguments[0]);
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Expression:: Error: Validation Error");
        }
    } else if (arguments.length === 2) {
        initExpression(arguments[0], arguments[1]);
    } else if (arguments.length === 3) {
        initExpressionByExpression(arguments[0], arguments[1],
            arguments[2]);
    } else {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.Expression:: Error: invalid number of arguments, atleast 'term' is expected");
    }

    /**
     * Recursively generates a Expression from a given list of
     * criteria and an infix operator to join each criteria with the
     * next in the list. Operator AND or Operator OR that joins each
     * criteria term with the next in the list.
     *
     * @param criterias
     *            the list of criteria terms from which the
     *            constructor generates the new criteria expression.
     * @param operator
     *            the infix operator
     */
    function initExpression(criterias, operator) {
        if (operator === kony.sdk.constants.Operator.OR) {
            setOperator(kony.sdk.constants.Operator.OR);
        } else if (operator === kony.sdk.constants.Operator.AND) {
            setOperator(kony.sdk.constants.Operator.AND);
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Expression::initExpression:: Error: Invalid Operator");
        }
        if (criterias !== null && criterias !== undefined
            && criterias instanceof Array
            && criterias.length > 0) {
            if (kony.sdk.util.validateCriteriaObject(criterias[0])) {
                setTerm(criterias[0]);
            }
            if (criterias.length > 1) {
                var tmpOperator = operator;
                criterias.shift();
                setExpression(new kony.sdk.dto.Expression(criterias, tmpOperator));
            }
        } else {
            if (kony.sdk.util.validateCriteriaObject(criterias)) {
                setTerm(criterias);
                // return currentExpObj;
            } else {
                //TODO
                //throw error
                kony.sdk.logger.log("### kony.sdk.dto.Expression::initExpression:: Error: Validation Error");
            }
        }
    }

    function setExpression(expression) {
        if (expression instanceof kony.sdk.dto.Expression) {
            currentExpObj.expression = expression;
            // return currentExpObj;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Expression::setExpression:: Error: expression not an instance of kony.sdk.do.Expression");
        }
    }

    function setTerm(term) {
        if (kony.sdk.util.validateCriteriaObject(term)) {
            currentExpObj.term = term;
            // return currentExpObj;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Expression::setTerm:: Error: Validation Error");
        }
    }

    /**
     * Initializes a Expression with an initial criteria term, an
     * operator, and a another trailing criteria expression.
     *
     * @param criterias
     *            the starting criteria to assign to the new
     *            criteria expression.
     * @param operator
     *            the infix operator
     * @param expression
     *            the trailing expression to assign to the new
     *            criteria expression.
     */
    function initExpressionByExpression(criterias, operator,
                                        expression) {
        if (operator === kony.sdk.constants.Operator.OR) {
            initExpression(criterias, kony.sdk.constants.Operator.OR);
        } else if (operator === kony.sdk.constants.Operator.AND) {
            initExpression(criterias, kony.sdk.constants.Operator.AND);
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Expression::initExpressionByExpression:: Error: Invalid Operator");
        }

        setExpression(expression);
        // return currentExpObj;
    }

    function setOperator(operator) {
        currentExpObj.operator = operator;
    }


    this.getTerm = function () {
        return this.term;
    };
    this.getOperator = function () {
        return this.operator;
    };
    this.getExpression = function () {
        return this.expression;
    };
    this.toString = function () {
        var returnString = null;
        if ((this.getTerm() === null || this.getTerm() === undefined)
            && (this.getExpression() === null || this.getExpression() === undefined)) {
            returnString = "";
        } else if (this.getExpression() === null
            || this.getExpression() === undefined) {
            returnString = this.getTerm().toString();
        } else if (this.getOperator() === kony.sdk.constants.Operator.AND) {
            returnString = (new kony.sdk.dto.And(this.getTerm(), this
                .getExpression())).toString();
        } else if (this.getOperator() === kony.sdk.constants.Operator.OR) {
            returnString = (new kony.sdk.dto.Or(this.getTerm(), this.getExpression()))
                .toString();
        }
        return returnString;
    }

};

/**
 * This function is a constructor for InCriteria Object
 * @constructor
 */
kony.sdk.dto.InCriteria = function () {
    this.column;
    this.values;
    var currentInCriteriaObj = this;

    if (arguments.length === 2) {
        getInCriteriaByColumnAndCollection(arguments[0],
            arguments[1]);
    } else if (arguments.length === 3) {
        getInCriteriaByTableAndCollection(arguments[0],
            arguments[1], arguments[2]);
    } else {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.InCriteria:: Error: invalid number of arguments, atleast column,values are expected");
    }

    /**
     * This function is the InCriteria constructor which has 3
     * arguments.
     *
     * @param table
     * @param columnname
     * @param values
     */
    function getInCriteriaByTableAndCollection(table, columnname,
                                               values) {
        if (table instanceof kony.sdk.dto.Table) {
            currentInCriteriaObj.column = new kony.sdk.dto.Column(table, columnname);
            currentInCriteriaObj.values = values;

            return currentInCriteriaObj;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.InCriteria::getInCriteriaByTableAndCollection:: Error: table is not an instance of kony.sdk.dto.Table");
        }
    }

    /**
     * This function is the InCriteria constructor which has 2
     * arguments.
     *
     * @param column
     * @param values
     */
    function getInCriteriaByColumnAndCollection(column, values) {
        if (column instanceof kony.sdk.dto.Column && values instanceof Array
            && values.length > 0) {
            currentInCriteriaObj.column = column;
            currentInCriteriaObj.values = values;

            return currentInCriteriaObj;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.InCriteria::getInCriteriaByColumnAndCollection:: Error: Validation Error");

        }
    }


    this.getColumnForTable = function (table, columnName) {
        if (table instanceof kony.sdk.dto.Table) {
            var column = new kony.sdk.dto.Column(table, columnName);
            return column;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.InCriteria::getColumnForTable:: Error: table not an instance of kony.sdk.dto.Table");
        }
    };
    this.getColumn = function () {
        return this.column;
    };
    this.setColumn = function (column) {
        if (column instanceof kony.sdk.dto.Column) {
            this.column = column;
        }
    };
    this.setValues = function (valuesCollection) {
        this.values = valuesCollection;

    };
    this.getValues = function () {
        return this.values;
    };

    this.toString = function () {
        var result = "";
        result = this.column.toString() + " IN (";
        if (this.values !== null && this.values !== undefined
            && this.values.length > 0) {
            for (var index = 0; index < this.values.length; index++) {
                var value;
                var criteria = new kony.sdk.dto.Criteria();
                if (typeof (this.values[index]) === "string") {
                    value = criteria.quote(this.values[index]);
                } else {
                    value = this.values[index];
                }
                result = result + value;
                if (index !== (this.values.length - 1)) {
                    result = result + ", ";
                }
            }
        }
        /*
         * else if (this.subSelect !== null && this.subSelect !==
         * undefined) { result = result + this.subSelect; }
         */
        result = result + ")";
        return result;
    };
};

/**
 * This function is used to in set Exists param in select query
 * @param subSelectQuery {@link kony.sdk.dto.SelectQuery}
 * @constructor
 */
kony.sdk.dto.Exists = function (subSelectQuery) {
    if (subSelectQuery instanceof kony.sdk.dto.SelectQuery) {
        this.subSelect = subSelectQuery;
    } else {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.Exists:: Error: subSelectQuery is not an instance of kony.sdk.dto.SelectQuery");
    }

    this.getSubSelect = function () {
        return this.subSelect;
    };
    this.setSubSelect = function (subSelect) {

        if (subSelect instanceof kony.sdk.dto.SelectQuery) {
            this.subSelect = subSelect;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Exists::subSelectQuery:: Error: subSelectQuery is not an instance of kony.sdk.dto.SelectQuery");
        }
    };
    this.toString = function () {
        return "EXISTS ( " + this.subSelect.toString() + " )";
    };
};

/**
 * This is Interface to define where clauses
 * @constructor
 */
kony.sdk.dto.Criteria = function () {

    this.quote = function (str) {

        if (str === null || str === undefined) {
            return "null";
        }
        // var str1 = new String(str);
        var strBuf = [];
        strBuf.push('\'');
        for (var index = 0; index < str.length; index++) {
            var charItem = str.charAt(index);
            if (charItem == '\\' || charItem == '\"' || charItem == '\'') {
                // strBuf.concat('\\');
                strBuf.push('\\');
            }
            strBuf.push(charItem);
        }
        strBuf.push('\'');
        return strBuf.join("");
    };
};

/**
 * This function is used to define where clause
 * @constructor
 */
kony.sdk.dto.Match = function () {
    this.column;
    this.matchType;
    this.value;
    var currentMatchObj = this;

    if (arguments.length === 3) {
        initMatchByColumn(arguments[0], arguments[1], arguments[2]);
    } else if (arguments.length === 4) {
        initMatchByTableAndColName(arguments[0], arguments[1],
            arguments[2], arguments[3]);
    } else {
        //TODO
        //throw error
        kony.sdk.logger.log("### kony.sdk.dto.Match:: Error: Invalid number of arguments, atleast columnObj,matchType,value is required")
    }

    /**
     * This function is the Match constructor which has 3 arguments.
     *
     * @param columnObj
     * @param matchType
     * @param value
     */
    function initMatchByColumn(columnObj, matchType, value) {
        if (columnObj instanceof kony.sdk.dto.Column) {
            currentMatchObj.column = columnObj;
            if (matchType !== kony.sdk.constants.MatchType.EQUALS
                && matchType !== kony.sdk.constants.MatchType.GREATER
                && matchType !== kony.sdk.constants.MatchType.GREATEREQUAL
                && matchType !== kony.sdk.constants.MatchType.LESS
                && matchType !== kony.sdk.constants.MatchType.LESSEQUAL
                && matchType !== kony.sdk.constants.MatchType.STARTSWITH
                && matchType !== kony.sdk.constants.MatchType.CONTAINS
                && matchType !== kony.sdk.constants.MatchType.LIKE
                && matchType !== kony.sdk.constants.MatchType.ENDSWITH
                && matchType !== kony.sdk.constants.MatchType.NOTEQUAL
                && matchType !== kony.sdk.constants.MatchType.ISNULL
                && matchType !== kony.sdk.constants.MatchType.ISNOTNULL) {

                //TODO
                //throw error
                kony.sdk.logger.log("### kony.sdk.dto.Match::initMatchByColumn:: Error: Invalid MatchType");
            } else {
                if (matchType !== kony.sdk.constants.MatchType.ISNULL
                    && matchType !== kony.sdk.constants.MatchType.ISNOTNULL) {
                    // check if the value is passed or not except
                    // for NULL and NOT NULL cases.
                    if (value !== null && value !== undefined) {
                        if (value instanceof Array
                            && value.length <= 0) {
                            //TODO
                            //throw error
                            kony.sdk.logger.log("### kony.sdk.dto.Match::initMatchByColumn:: Error: value is undefined ,null or empty object");
                        }
                        currentMatchObj.value = value;
                    } else {
                        //TODO
                        //throw error
                        kony.sdk.logger.log("### kony.sdk.dto.Match::initMatchByColumn:: Error: Invalid MatchType");
                    }
                }
                currentMatchObj.matchType = matchType;
                return currentMatchObj;
            }
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Match::initMatchByColumn:: Error: columnObj is not an instance of kony.sdk.dto.Column");
        }
    }

    /**
     * This function is the Match constructor which has 4 arguments.
     *
     * @param tableObj
     * @param columnName
     * @param matchType
     * @param value
     */
    function initMatchByTableAndColName(tableObj, columnName, matchType, value) {
        // check for validity of tableObj
        if (tableObj instanceof kony.sdk.dto.Table) {
            // columnName should not empty or null or undefined.
            if (columnName !== null && columnName !== undefined
                && typeof (columnName) === 'string'
                && columnName.trim().length > 0) {
                currentMatchObj.column = tableObj
                    .getColumn(columnName);
                if (matchType !== kony.sdk.constants.MatchType.EQUALS
                    && matchType !== kony.sdk.constants.MatchType.GREATER
                    && matchType !== kony.sdk.constants.MatchType.GREATEREQUAL
                    && matchType !== kony.sdk.constants.MatchType.LESS
                    && matchType !== kony.sdk.constants.MatchType.LESSEQUAL
                    && matchType !== kony.sdk.constants.MatchType.STARTSWITH
                    && matchType !== kony.sdk.constants.MatchType.CONTAINS
                    && matchType !== kony.sdk.constants.MatchType.LIKE
                    && matchType !== kony.sdk.constants.MatchType.ENDSWITH
                    && matchType !== kony.sdk.constants.MatchType.NOTEQUAL
                    && matchType !== kony.sdk.constants.MatchType.ISNULL
                    && matchType !== kony.sdk.constants.MatchType.ISNOTNULL) {

                    //TODO
                    //throw error
                    kony.sdk.logger.log("### kony.sdk.dto.Match::initMatchByTableAndColName:: Error: Invalid MatchType");
                } else {
                    if (matchType !== kony.sdk.constants.MatchType.ISNULL
                        && matchType !== kony.sdk.constants.MatchType.ISNOTNULL) {
                        // check if the value is passed or not
                        // except for NULL and NOT NULL cases.
                        if (value !== null && value !== undefined) {
                            currentMatchObj.value = value;
                        } else {
                            //TODO
                            //throw error
                            kony.sdk.logger.log("### kony.sdk.dto.Match::initMatchByTableAndColName:: Error: value is undefined ,null or empty object");
                        }
                    }
                    currentMatchObj.matchType = matchType;
                }
                return currentMatchObj;
            } else {
                //TODO
                //throw error
                kony.sdk.logger.log("### kony.sdk.dto.Match::initMatchByTableAndColName:: Error: Invalid MatchType");
            }
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Match:: Error: columnObj is not an instance of kony.sdk.dto.Column");
        }
    }

    this.getColumn = function () {
        if (this.column !== null && this.column !== undefined) {
            return this.column;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Match::getColumn:: Error: column is null or undefined");
        }
    };

    this.getMatchType = function () {
        if (this.matchType !== null && this.matchType !== undefined) {
            return this.matchType;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Match::getMatchType:: Error: matchType is null or undefined");
        }
    };

    /**
     * This function is used to set match type.
     *
     * @param matchType
     */
    this.setMatchType = function (matchType) {
        this.matchType = matchType;
    };

    this.getValue = function () {
        return this.value;
    };

    /*
     * quote=function(value){ return "'"+value+"'"; }
     */

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        if (this.matchType !== null && this.matchType !== undefined
            && this.column !== null && this.column !== undefined) {
            var constructedMatch = null;
            var constructedValue = null;
            var type = this.matchType;
            var val = this.matchType.name;

            if (this.value instanceof Date) {
                var dateStr = "";
                var month = this.getValue().getMonth() + 1;
                var date = this.getValue().getDate();

                if (month < 10) {
                    month = "0" + month;
                }

                if (date < 10) {
                    date = "0" + date;
                }
                dateStr = this.getValue().getFullYear() + "-" + month
                    + "-" + date;
                constructedMatch = "date(substr("
                    + this.getColumn().toString() + ",0,11)) "
                    + this.getMatchType().value + "'" + dateStr
                    + "'";
                return constructedMatch;
            }
            if (typeof (this.getValue()) === 'boolean') {
                if (this.getValue() === true) {
                    return "(" + this.getColumn().toString()
                        + " = 'true' OR "
                        + this.getColumn().toString() + " = 1)";
                } else if (this.getValue() === false) {
                    return "(" + this.getColumn().toString()
                        + " = 'false' OR "
                        + this.getColumn().toString() + " = 0)";
                } else {
                    this.value = "'" + this.value + "'";
                }
            }

            constructedMatch = this.getColumn().toString() + " "
                + this.getMatchType().value + " ";
            if (typeof (this.getValue()) === 'string') {
                constructedValue = kony.sdk.util.replaceAll(this.getValue(),
                    "'", "");
                if (kony.sdk.util.matchIgnoreCase(type.name, "STARTSWITH")) {
                    constructedValue = constructedValue + "%";
                } else if (kony.sdk.util.matchIgnoreCase(type.name, "CONTAINS")) {
                    constructedValue = "%" + constructedValue + "%";
                } else if (kony.sdk.util.matchIgnoreCase(type.name, "ENDSWITH")) {
                    constructedValue = "%" + constructedValue;
                } else if (kony.sdk.util.matchIgnoreCase(type.name, "ISNULL")) {
                    return "(lower(" + this.getColumn().toString()
                        + ") = 'null' OR "
                        + this.getColumn().toString() + " IS NULL)";
                } else if (kony.sdk.util.matchIgnoreCase(type.name, "ISNOTNULL")) {
                    return "(lower(" + this.getColumn().toString()
                        + ") != 'null' OR "
                        + this.getColumn().toString()
                        + " IS NOT NULL)";
                }
                constructedValue = new kony.sdk.dto.Criteria().quote(constructedValue);
            } else {
                if (kony.sdk.util.matchIgnoreCase(type.name, "ISNULL")) {
                    return "(lower(" + this.getColumn().toString()
                        + ") = 'null' OR "
                        + this.getColumn().toString() + " IS NULL)";
                } else if (kony.sdk.util.matchIgnoreCase(type.name, "ISNOTNULL")) {
                    return "(lower(" + this.getColumn().toString()
                        + ") != 'null' OR "
                        + this.getColumn().toString()
                        + " IS NOT NULL)";
                }
                constructedValue = this.getValue().toString();
            }
            if (!(kony.sdk.util.matchIgnoreCase(type.name, "ISNULL") || kony.sdk.util.matchIgnoreCase(type.name, "ISNOTNULL"))) {
                constructedMatch = constructedMatch + constructedValue;
            }
            return constructedMatch;
        } else {
            //TODO
            //throw error
            kony.sdk.logger.log("### kony.sdk.dto.Match::toString:: Error: matchType is undefined");
        }
    }

};

kony.sdk.util.getSyncDbName = function () {
    return kony.sync.getDBName();
};


kony.sdk.util.getPrimarykeysFromMetadata = function (objMetadata) {
    var tmpSrcAttributes = null;
    if (objMetadata.primaryKey != null && objMetadata.primaryKey != undefined && objMetadata.primaryKey.length > 0) {
        tmpSrcAttributes = {};
        var pkLen = objMetadata.primaryKey.length;
        for (var indx = 0; indx < pkLen; indx++) {
            var pKey = objMetadata.primaryKey[indx];
            //adding primarykey column names in srcattributes which will be useful while deleting children
            tmpSrcAttributes[pKey] = pKey;
        }
    }
    return tmpSrcAttributes;
};


/**
 * This is a replaceAll utility function
 * @param string
 * @param toReplace
 * @param replaceWith
 * @return String temp
 */
kony.sdk.util.replaceAll = function (string, toReplace, replaceWith) {
    var temp = string;
    var index = temp.indexOf(toReplace);
    while (index != -1) {
        temp = temp.replace(toReplace, replaceWith);
        index = temp.indexOf(toReplace);
    }
    return temp;
};

kony.sdk.util.validateDateTypeInput = function (dateType) {
    return (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.TODAY)
    || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.TOMORROW)
    || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.YESTERDAY)
    || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.CURRENTWEEK)
    || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.NEXTWEEK)
    || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.LASTWEEK)
    || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.CURRENTMONTH)
    || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.NEXTMONTH)
    || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.LASTMONTH));
};

kony.sdk.util.getDateRange = function (dateType) {
    var result = [];
    var currentDate = new Date();
    var formattedDate = new Date(currentDate.getFullYear(), currentDate
        .getMonth(), currentDate.getDate(), currentDate.getHours(),
        currentDate.getMinutes(), currentDate.getSeconds(), currentDate
            .getMilliseconds());
    var start;
    var end;
    if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.TODAY)) {
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 23, 59, 59);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 0, 0, 0);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.TOMORROW)) {
        formattedDate.setDate(formattedDate.getDate() + 1);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 23, 59, 59);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 0, 0, 0);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.YESTERDAY)) {
        formattedDate.setDate(formattedDate.getDate() - 1);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 23, 59, 59);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 0, 0, 0);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.CURRENTWEEK)) {
        var firstDayofWeek = formattedDate.getDate() - formattedDate.getDay();
        var lastDayofWeek = firstDayofWeek + 6;
        formattedDate.setDate(firstDayofWeek);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 0, 0, 0);
        formattedDate.setDate(lastDayofWeek);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 23, 59, 59);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.LASTWEEK)) {
        formattedDate.setDate(formattedDate.getDate() - 7);
        var firstDayofWeek = formattedDate.getDate() - formattedDate.getDay();
        var lastDayofWeek = firstDayofWeek + 6;
        formattedDate.setDate(firstDayofWeek);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 0, 0, 0);
        formattedDate.setDate(lastDayofWeek);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 23, 59, 59);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.NEXTWEEK)) {
        formattedDate.setDate(formattedDate.getDate() + 7);
        var firstDayofWeek = formattedDate.getDate() - formattedDate.getDay();
        var lastDayofWeek = firstDayofWeek + 6;
        formattedDate.setDate(firstDayofWeek);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 0, 0, 0);
        formattedDate.setDate(lastDayofWeek);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 23, 59, 59);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.CURRENTMONTH)) {
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            1, 0, 0, 0);
        end = new Date(formattedDate.getFullYear(),
            formattedDate.getMonth() + 1, 0, 23, 59, 59);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.LASTMONTH)) {
        start = new Date(formattedDate.getFullYear(),
            formattedDate.getMonth() - 1, 1, 0, 0, 0, 0);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            0, 23, 59, 59, 999);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.NEXTMONTH)) {
        start = new Date(formattedDate.getFullYear(),
            formattedDate.getMonth() + 1, 1, 0, 0, 0, 0);
        end = new Date(formattedDate.getFullYear(),
            formattedDate.getMonth() + 2, 0, 23, 59, 59, 999);
    } else {
        start = 0;
        end = 0;
    }
    result.push(start);
    result.push(end);
    return result;
};

//Helps to prepare the primary condition to get binary data
kony.sdk.util.getPkTableForBinary = function (objMetadata, columnValues, failureCallback) {
    var pkTable = {};
    var whereClause = [];
    if (objMetadata.primaryKey != null && objMetadata.primaryKey != undefined) {
        for (var indx = 0; indx < objMetadata.primaryKey.length; indx++) {
            var pKey = objMetadata.primaryKey[indx];
            var pKeyValue = columnValues[pKey];
            if (pKeyValue == null || pKeyValue == undefined) {
                //TODO change to error object
                kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
                return;
            }
            pkTable[pKey] = pKeyValue;
        }
        return pkTable;
    } else {
        //TODO change to error object
        kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
    }
};

//Helps to provide the Metadata of column in a Object
kony.sdk.util.getMetadataOfColumn = function (objMetadata, colName) {
    if (objMetadata != null && objMetadata != undefined) {
        var columns = objMetadata["columns"];
        if (columns != null && columns != undefined) {
            for (var indx in columns) {
                var colMeta = columns[indx];
                if (colMeta["name"] == colName) {
                    return colMeta;
                }
            }
        }
    }
    return null;
};

//Helps in generating kony.sdk.dto.RecordObject from a given complex record
kony.sdk.util.populateColumnValues = function (record, childRecords) {
    var columnValues = {};
    var recordsLength = Object.keys(record).length;
    for (var index = 0; index < recordsLength; index++) {
        var colName = Object.keys(record)[index];
        var colVal = record[colName];
        if (colVal instanceof Array) {
            for (var tempIndex = 0; tempIndex < colVal.length; tempIndex++) {
                var tempRecord = new kony.sdk.dto.RecordObject();
                tempRecord.tableName = colName;
                tempRecord.columnValues = kony.sdk.util.populateColumnValues(record[colName][tempIndex], tempRecord.childRecords);
                childRecords.push(tempRecord);
            }
        } else {
            columnValues[colName] = colVal;
        }
    }
    return columnValues;
};

//Helps in getting the relationship data of an entity from a given relationship list
kony.sdk.util.getRelationOfEntity = function (relationshipList, entityName) {
    var i = 0;
    for (; i < relationshipList.length; i++) {
        //considering only OneToMany relationships as it will have parent and child hierarchy
        if (relationshipList[i] != null && relationshipList[i]["relationshipType"] == "OneToMany" && relationshipList[i].relatedEntity.localeCompare(entityName) == 0) {
            return relationshipList[i];
        }
    }
    return null;
};

//Helps in finding if a given column name is a primary key
kony.sdk.util.isPrimaryKey = function (primaryKeyList, columnValue) {
    for (var i = 0; i < primaryKeyList.length; i++) {
        if (primaryKeyList[i] == columnValue)
            return true;
    }
    return false;
};

kony.sdk.util.objectToQueryParams  = function(valueObject){
    var queryParams = "";
    var objCount = Object.keys(valueObject).length;
    for(var i=0; i<objCount; i++){
        var tempKey = Object.keys(valueObject)[i]
        if(queryParams.length == 0)
            queryParams = tempKey + "=" + valueObject[tempKey];
        else
            queryParams = queryParams + "&" + tempKey + "=" + valueObject[tempKey];
    }

    return queryParams;
};

  kony.sdk.util.getPackagedMetadata = function(){
	if(kony.sdk.APP_META === undefined || kony.sdk.APP_META === null){
		kony.sdk.APP_META = {};
	}
      return kony.sdk.APP_META["objectsvc_meta"];
  };
  
  /**
	User needs to call this API to prepackage the metadata of the app. The data needs to be passed as json object or a stringified version of json object
  */
  kony.sdk.util.setPackagedMetadata = function(metadataJson){
	try{
		if(typeof metadataJson == "object"){
			kony.sdk.APP_META = metadataJson;
		}
		else if(typeof metadataJson == "string"){
			var parsedMetadata = JSON.parse(metadataJson);
			kony.sdk.APP_META = parsedMetadata;
		}
	}catch(error) {
		logger.log("### kony.sdk.setPackagedMetadata::error while validating the input packaged metadata" + error);
	}
  };

stripTrailingCharacter = function(str, character) {
	if (str.substr(str.length - 1) == character) {
		return str.substr(0, str.length - 1);
	}
	return str;
};

var Constants = {
	APP_KEY_HEADER: "X-Kony-App-Key",
	APP_SECRET_HEADER: "X-Kony-App-Secret",
	AUTHORIZATION_HEADER: "Authorization"
};

var Errors = {
	INIT_FAILURE: "INIT_FAILURE",
	DATA_STORE_EXCEPTION: "DATASTORE_FAILURE",
	AUTH_FAILURE: "AUTH_FAILURE",
	INTEGRATION_FAILURE: "INTEGRATION_FAILURE",
	MESSAGING_FAILURE: "MESSAGING_FAILURE",
	SYNC_FAILURE: "SYNC_FAILURE",
	METRICS_FAILURE: "METRICS_FAILURE",
	MISC_FAILURE: "MISCELLANEOUS_FAILURE",
	OBJECT_FAILURE: "OBJECT_FAILURE"
};
kony.sdk.prototype.enableDebug = function() {
	kony.sdk.isDebugEnabled = true;
}

kony.sdk.prototype.disableDebug = function() {
	kony.sdk.isDebugEnabled = false;
}

function Exception(name, message) {
	var logger = new konyLogger();
	logger.log("Exception --> " + name + ": " + message);
	return {
		code: name,
		message: message
	};
};

kony.sdk.verifyAndCallClosure = function(closure, params) {
	if (typeof(closure) === 'function') {
		closure(params);
	} else {
		var logger = new konyLogger();
		logger.log("invalid callback");
	}
}

kony.sdk.formatCurrentDate = function(inputDateString) {
	var dateObj = new Date(inputDateString);
	var year = dateObj.getUTCFullYear();
	var month = kony.sdk.formatDateComponent(dateObj.getUTCMonth() + 1);
	var date = kony.sdk.formatDateComponent(dateObj.getUTCDate());
	var hours = kony.sdk.formatDateComponent(dateObj.getUTCHours());
	var minutes = kony.sdk.formatDateComponent(dateObj.getUTCMinutes());
	var seconds = kony.sdk.formatDateComponent(dateObj.getUTCSeconds());
	var dateSeparator = "-"
	var timeSeparator = ":"
	var dateString = year + dateSeparator + month + dateSeparator + date + " " + hours + timeSeparator + minutes + timeSeparator + seconds;
	return dateString;
}

kony.sdk.formatDateComponent = function(dateComponent) {
	if (dateComponent < 10) {
		dateComponent = "0" + dateComponent;
	}
	return dateComponent;
}

kony.sdk.isNullOrUndefined = function(val) {
	if (val === null || val === undefined) {
		return true;
	} else {
		return false;
	}
};

kony.sdk.constants.reportingType = {
		session: "session",
		custom: "custom"
	};

kony.sdk.isEmptyObject = function(obj) {
	for (var prop in obj) {
		return false;
	}
	return true;
};


kony.sdk.isArray = function(data) {
	if (data && Object.prototype.toString.call(data) === '[object Array]') {
		return true;
	}
	return false;
}


kony.sdk.formatSuccessResponse = function(data)
{
	if(data && data.httpresponse)
	{
		delete data.httpresponse;
	}
	return data;
}

kony.sdk.isJson = function(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

//private method to identify whether session/token expired or not based on error code
kony.sdk.isSessionOrTokenExpired = function(mfcode) {
	if (mfcode && (mfcode === "Auth-5" || mfcode === "Auth-6" || mfcode === "Gateway-31" || mfcode === "Gateway-33" || mfcode === "Gateway-35" || mfcode === "Gateway-36" || mfcode === "Auth-46" || mfcode === "Auth-55")) {
		return true;
	}
	return false;
}

//private method to clear cache
kony.sdk.resetCacheKeys = function(konyRef, _providerName) {
	try {
		if (konyRef) {
			konyRef.currentClaimToken = null;
			konyRef.currentBackEndToken = null;
			konyRef.claimTokenExpiry = null;
			konyRef.currentRefreshToken = null;
			//setting the anonymous provider as true to access the public protected urls without any issue
			konyRef.isAnonymousProvider = true;
			if (_providerName) {
				if (konyRef.tokens.hasOwnProperty(_providerName)) {
					konyRef.tokens[_providerName] = null;
				}
			}
		}
	} catch(e) {
		var logger = new konyLogger();
		logger.log("Error while clearing the cache..");
	}
}

kony.sdk.util.populateIndividualServiceLists = function(serviceConfig,objectToPopulate){
	var svcMeta = serviceConfig["services_meta"];
	if(objectToPopulate["objectsvc"] == undefined || objectToPopulate["objectsvc"] == null) {
		objectToPopulate["objectsvc"] = {};
	}
	if(svcMeta){
		for(svc in svcMeta){
			var svcObj = svcMeta[svc];
			if(svcObj && svcObj["type"] === "objectsvc"){
				objectToPopulate["objectsvc"][svc]=svcObj;
			}
			else if(svcObj && svcObj["type"] === "integsvc"){
				objectToPopulate["integsvc"][svc]=svcObj;
			}
		}
	}
}
kony.sdk.serviceDoc = function() {
	var appId = "";
	var baseId = "";
	var services_meta = {};
	var name = "";
	var selflink = "";
	var login = null;
	var integsvc = {};
	var reportingsvc = {};
	var messagingsvc = {};
	var sync = {};
	var objectsvc = {};

	this.toJSON = function() {
		servConfig = {};
		servConfig.appId = this.getAppId();
		servConfig.baseId = this.getBaseId();
		servConfig.name = this.getAppName();
		servConfig.selflink = this.getSelfLink();
		servConfig.services_meta = this.getServicesMeta();
		servConfig.login = this.getAuthServices();
		servConfig.integsvc = this.getIntegrationServices();
		servConfig.messagingsvc = this.getMessagingServices();
		servConfig.sync = this.getSyncServices();
		servConfig.reportingsvc = this.getReportingServices();
		servConfig.objectsvc = this.getObjectServices();
		kony.sdk.util.populateIndividualServiceLists(this,servConfig);
		return servConfig;
	}

	this.setAppId = function(appIdStr) {
		appId = appIdStr;
	};

	this.getAppId = function() {
		return appId;
	};

	this.setBaseId = function(baseIdStr) {
		baseId = baseIdStr;
	};

	this.getBaseId = function() {
		return baseId;
	};

	this.setAppName = function(appName) {
		name = appName;
	};

	this.getAppName = function() {
		return name;
	};

	this.setSelfLink = function(selfLinkStr) {
		selflink = selfLinkStr;
	};

	this.getSelfLink = function() {
		return selflink;
	};

	function setEndPoints(providerType, providerValues) {
		for (var provider in providerValues) {
			providerType[provider] = providerValues[provider];
		}
	}

	this.setAuthService = function(loginProvider) {
		if(login === null){
			login = [];
		}
		login.push(loginProvider);
	};

	//what will this return? name?
	this.getAuthServiceByName = function(authServiceProvider) {
		if(login === null){
			return null;
		}
		for (var i in login) {
			var provider = login[i];
			if (provider.prov == authServiceProvider) {
				return provider;
			}
		}
	};

	this.getAuthServices = function() {
		return login;
	};

	this.setIntegrationService = function(providerName, endPointUrl) {
		integsvc[providerName] = endPointUrl;
	};

	this.getIntegrationServiceByName = function(integrationServiceProviderName) {
		return integsvc[integrationServiceProviderName];
	};

	this.getIntegrationServices = function() {
		return integsvc;
	};

	this.setObjectService = function(providerName, endPointUrl) {
		objectsvc[providerName] = endPointUrl;
	};

	this.getObjectServiceByName = function(objectServiceProviderName) {
		return objectsvc[objectServiceProviderName];
	};

	this.getObjectServices = function() {
		return objectsvc;
	};

	this.getServicesMeta = function() {
		return services_meta;
	};

	this.setReportingService = function(reportingType, url) {
		if (reportingType == kony.sdk.constants.reportingType.session || reportingType == kony.sdk.constants.reportingType.custom) {
			reportingsvc[reportingType] = url;
		} else {
			throw new Exception(Errors.INIT_FAILURE, "invalid reporting type " + reportingType);
		}
	}

	this.getReportingServiceByType = function(reportingServiceProviderType) {
		return reportingsvc[reportingServiceProviderType];
	};

	this.getReportingServices = function() {
		return reportingsvc;
	};

	this.setMessagingService = function(appId, url) {
		messagingsvc[appId] = url;
	};

	this.getMessagingServiceByName = function(messagingServiceProviderName) {
		return messagingsvc[messagingServiceProviderName];
	};

	this.getMessagingServices = function() {
		return messagingsvc;
	}

	this.setSyncService = function(syncServiceProvider) {
		sync = syncServiceProvider;
	};

	this.getSyncServices = function() {
		return sync;
	};

};

if (typeof(kony.sdk.metric) === "undefined") {
	kony.sdk.metric = {};
}

kony.sdk.metric.eventFlowTag = "";
kony.sdk.metric.eventConfig = {
	"confType": "BUFFER",
	"eventBufferAutoFlushCount": kony.sdk.metric.eventBufferAutoFlushValue,
	"eventBufferMaxCount": kony.sdk.metric.eventBufferMaxValue
};
kony.sdk.metric.eventBufferMaxValue = 1000;
kony.sdk.metric.eventBufferAutoFlushValue = 15;
kony.sdk.metric.characterLengthLimit = 256;
kony.sdk.metric.reportEventBufferArray = [];
kony.sdk.metric.reportEventBufferBackupArray = [];
kony.sdk.metric.retrievedDS = false;
kony.sdk.metric.eventBufferCount = 0;
kony.sdk.metric.eventTypeMap = {
	"formentry": "FormEntry",
	"touch": "Touch",
	"servicecall": "ServiceCall",
	"gesture": "Gesture",
	"orientation": "Orientation",
	"custom": "Custom"
};
kony.sdk.metric.errorCodeMap = {
	"1000": true,
	"1011": true,
	"1012": true,
	"1014": true,
	"1015": true,
	"1016": true
};

kony.sdk.metric.setEventFlowTag = function(flowTag) {
	if (kony.sdk.isNullOrUndefined(flowTag)) {
		throw new Exception(Errors.METRICS_FAILURE, "Invalid value for event flow tag");
	} else if (flowTag.length <= kony.sdk.metric.characterLengthLimit) {
		kony.sdk.metric.eventFlowTag = flowTag;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
	}
};

kony.sdk.metric.clearEventFlowTag = function() {
	kony.sdk.metric.eventFlowTag = "";
};

kony.sdk.metric.getEventFlowTag = function() {
	return kony.sdk.metric.eventFlowTag;
};

kony.sdk.metric.setEventConfig = function(confType, eventBufferAutoFlushCount, eventBufferMaxCount) {
	if (kony.sdk.isNullOrUndefined(confType)) {
		throw new Exception(Errors.METRICS_FAILURE, "Config Type can not be null");
	} else {
		confType = confType.toUpperCase();
	}
	if (confType === "BUFFER") {
		kony.sdk.metric.eventConfig["confType"] = confType;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "Invalid value for config type");
	}
	if (!kony.sdk.isNullOrUndefined(eventBufferMaxCount) && typeof(eventBufferMaxCount) === "number" && eventBufferMaxCount > 0) {
		kony.sdk.metric.eventConfig["eventBufferMaxCount"] = eventBufferMaxCount;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "eventBufferMaxCount has to be a Number and greater than 0");
	}
	if (!kony.sdk.isNullOrUndefined(eventBufferAutoFlushCount) && typeof(eventBufferAutoFlushCount) === "number" && eventBufferAutoFlushCount > 0 && eventBufferAutoFlushCount <= eventBufferMaxCount) {
		kony.sdk.metric.eventConfig["eventBufferAutoFlushCount"] = eventBufferAutoFlushCount;
	} else if (eventBufferAutoFlushCount >= eventBufferMaxCount) {
		kony.sdk.metric.eventConfig["eventBufferMaxCount"] = 1000;
		throw new Exception(Errors.METRICS_FAILURE, "eventBufferAutoFlushCount can not be greater than eventBufferMaxCount");
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "eventBufferAutoFlushCount has to be a Number and greater than 0");
	}
};

kony.sdk.metric.reportEvent = function(evttype, evtSubType, formID, widgetID, flowTag) {
	if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
		kony.sdk.metric.readFromDS();
	}
	kony.sdk.metric.eventBufferCount = kony.sdk.metric.reportEventBufferBackupArray.length + kony.sdk.metric.reportEventBufferArray.length;

	if (kony.sdk.metric.eventBufferCount === kony.sdk.metric.eventConfig["eventBufferMaxCount"]) {
		throw new Exception(Errors.DATA_STORE_EXCEPTION, "Reached maximum limit to store events");
		return;
	}
	var reportEventMap = {};
	reportEventMap.ts = kony.sdk.formatCurrentDate(new Date());
	evttype = evttype.toLowerCase();
	if (kony.sdk.isNullOrUndefined(kony.sdk.metric.eventTypeMap[evttype])) {
		throw new Exception(Errors.METRICS_FAILURE, "Invalid value for event type");
		return;
	} else {
		reportEventMap["evttype"] = kony.sdk.metric.eventTypeMap[evttype];
	}
	if (kony.sdk.isNullOrUndefined(evtSubType)) {
		reportEventMap["evtSubType"] = "";
	} else if (evtSubType.length <= kony.sdk.metric.characterLengthLimit) {
		reportEventMap["evtSubType"] = evtSubType;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
		return;
	}
	if (kony.sdk.isNullOrUndefined(formID)) {
		reportEventMap["formID"] = kony.application.getCurrentForm().id;
	} else if (formID.length <= kony.sdk.metric.characterLengthLimit) {
		reportEventMap["formID"] = formID;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
		return;
	}
	if (kony.sdk.isNullOrUndefined(widgetID)) {
		reportEventMap["widgetID"] = "";
	} else if (widgetID.length <= kony.sdk.metric.characterLengthLimit) {
		reportEventMap["widgetID"] = widgetID;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
		return;
	}
	if (kony.sdk.isNullOrUndefined(flowTag)) {
		reportEventMap["flowTag"] = kony.sdk.metric.getEventFlowTag();
	} else if (flowTag.length <= kony.sdk.metric.characterLengthLimit) {
		reportEventMap["flowTag"] = flowTag;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
		return;
	}
	reportEventMap.SID = kony.ds.read("konyUUID")[0];
	kony.sdk.metric.reportEventBufferArray.push(reportEventMap);

	if (kony.sdk.metric.reportEventBufferArray.length % kony.sdk.metric.eventConfig["eventBufferAutoFlushCount"] === 0) {
		kony.sdk.metric.flushEvents();
	}
};

kony.sdk.metric.flushEvents = function() {
	var logger = new konyLogger();
	if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
		kony.sdk.metric.readFromDS();
	}
	if (kony.sdk.metric.reportEventBufferBackupArray.length === 0 && kony.sdk.metric.reportEventBufferArray.length === 0) {
		logger.log("There are no events to flush");
		return;
	}
	var payload = kony.sdk.getPayload(kony.sdk.getCurrentInstance());
	var params = {};
	if (kony.sdk.metric.reportEventBufferArray.length !== 0) {
		kony.sdk.metric.pushEventsToBufferArray();
	}
	var headers = {
		"Content-Type": "application/x-www-form-urlencoded"
	};
	params.httpheaders = headers;
	payload.events = kony.sdk.metric.reportEventBufferBackupArray;
	payload.svcid = "SendEvents";
	payload.rsid = kony.sdk.metric.reportEventBufferBackupArray[0].SID;
	params.konyreportingparams = JSON.stringify(payload);
	kony.net.invokeServiceAsync(kony.sdk.currentInstance.customReportingURL, params, flushCallback);

	function flushCallback(status, response) {
		if (status === 400) {
			if (response.opstatus === 0) {
				kony.sdk.metric.clearBufferEvents();
			} else if (kony.sdk.metric.errorCodeMap[response.opstatus]) {
				kony.sdk.metric.saveInDS();
			} else {
				kony.sdk.metric.clearBufferEvents();
			}
		} else if (status === 300) {
			kony.sdk.metric.saveInDS();
		}
	}
};

/*Stores event data in Data Store on failure of service Call*/
kony.sdk.metric.saveInDS = function() {
	var eventsToSave = [];
	eventsToSave.push(JSON.stringify(kony.sdk.metric.reportEventBufferBackupArray));
	kony.ds.save(eventsToSave, "konyMetricsBuffer");
	kony.sdk.metric.reportEventBufferBackupArray = [];
};

/*Clearing events sent to server */
kony.sdk.metric.clearBufferEvents = function() {
	kony.sdk.metric.reportEventBufferBackupArray = [];
	kony.ds.remove("konyMetricsBuffer");
};

/*Reading any pending events from Data Store */
kony.sdk.metric.readFromDS = function() {
	var eventsFromDS = kony.ds.read("konyMetricsBuffer");
	if (eventsFromDS !== null) {
		var pushToArray = [];
		pushToArray.push(JSON.parse(eventsFromDS[0]));
		kony.sdk.metric.reportEventBufferBackupArray.push.apply(kony.sdk.metric.reportEventBufferBackupArray, pushToArray);
	}
};

/*Pushes events received from user to BufferBackupArray which will be flushed to server */
kony.sdk.metric.pushEventsToBufferArray = function() {
	kony.sdk.metric.reportEventBufferBackupArray.push.apply(kony.sdk.metric.reportEventBufferBackupArray, kony.sdk.metric.reportEventBufferArray);
	kony.sdk.metric.reportEventBufferArray = [];
};

kony.sdk.metric.getEventsInBuffer = function() {
	var eventsFromDS = kony.ds.read("konyMetricsBuffer");
	var eventsToReturn = [];
	if (!kony.sdk.isNullOrUndefined(eventsFromDS)) {
		eventsToReturn.push(JSON.parse(eventsFromDS[0]));
	}
	if (kony.sdk.metric.reportEventBufferArray.length !== 0) {
		eventsToReturn.push.apply(eventsToReturn, kony.sdk.metric.reportEventBufferArray);
	}
	if (eventsToReturn.length !== 0) {
		return eventsToReturn;
	} else {
		return null;
	}
};
/**
 * Method to create the integration service instance with the provided service name.
 * @param {string} serviceName - Name of the service
 * @returns {IntegrationService} Integration service instance
 */
kony.sdk.prototype.getIntegrationService = function(serviceName) {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	var konyRef = kony.sdk.getCurrentInstance();
	if (!this.currentClaimToken && !konyRef.isAnonymousProvider) {
		throw new Exception(Errors.AUTH_FAILURE, "Please call login in Identity Service before invoking this service");
	}
	var logger = new konyLogger();
	var integrationService = null;
	if (this.integsvc != null) {
		if (this.integsvc[serviceName] != null) {
			logger.log("found integration service" + this.integsvc[serviceName]);
			return new IntegrationService(this, serviceName);
		}

	}

	throw new Exception(Errors.INTEGRATION_FAILURE, "Invalid serviceName");

};
/**
 * Should not be called by the developer.
 * @class
 * @classdesc Integration service instance for invoking the integration services.
 */
function IntegrationService(konyRef, serviceName) {
	var logger = new konyLogger();
	var dataStore = new konyDataStore();
	var svcObj = konyRef.integsvc[serviceName];
	var homeUrl = "";
	if(typeof(svcObj) === "object"){
		homeUrl = svcObj["url"];
	}
	else{
		homeUrl = svcObj;
	}
	var networkProvider = new konyNetworkProvider();
	if (homeUrl == undefined || serviceName == undefined) {
		throw new Exception(Errors.INIT_FAILURE, "Invalid homeUrl and serviceName");
	}
	homeUrl = stripTrailingCharacter(homeUrl, "/");

	this.getUrl = function() {
		return homeUrl;
	};
	
	
	/**
	 * Integration service success callback method.
	 * @callback integrationSuccessCallback
	 * @param {json} response - Integration service response
	 */

	/**
	 * Integration service failure callback method.
	 * @callback integrationFailureCallback
	 * @param {json} error - Error information
	 */
	/**
	 * invoke the specified operation
	 * @param {string} operationName - Name of the operation
	 * @param {object} headers - Input headers for the operation
	 * @param {object} data - Input data for the operation
	 * @param {integrationSuccessCallback} successCallback  - Callback method on success
	 * @param {integrationFailureCallback} failureCallback - Callback method on failure
	 */
	this.invokeOperation = function(operationName, headers, data, successCallback, failureCallback) {
		function invokeOperationHandler() {
			_invokeOperation(operationName, headers, data, successCallback, failureCallback);
		}
		kony.sdk.claimsRefresh(invokeOperationHandler, failureCallback);
	};

	function _invokeOperation(operationName, headers, data, successCallback, failureCallback) {
		var requestData = {};
		var logger = new konyLogger();
		var reportingData = kony.sdk.getPayload(konyRef);
		var sessionId = kony.ds.read("konyUUID");
		if(sessionId){
		  reportingData.rsid = sessionId[0];
		}
		if(!reportingData.rsid)
		{
			logger.log("rsid is either empty,null or undefined");
		}
		if (kony.sdk.metric) {
			if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
				kony.sdk.metric.readFromDS();
			}
			kony.sdk.metric.pushEventsToBufferArray();
			requestData.events = kony.sdk.metric.reportEventBufferBackupArray;
		}
		for (var key in data) {
			requestData[key] = data[key];
		}
		reportingData.svcid = operationName;
		var token;
		for (var i in konyRef.tokens) {
			if (konyRef.tokens.hasOwnProperty(i) && typeof(i) !== 'function') {
				token = konyRef.tokens[i];
				break;
			}
		}

		requestData["konyreportingparams"] = JSON.stringify(reportingData);
		var defaultHeaders = {
			"Content-Type": "application/x-www-form-urlencoded",
			"X-Kony-Authorization": konyRef.currentClaimToken
		}
		if(typeof(svcObj) === 'object' &&  svcObj.version){
			defaultHeaders["X-Kony-API-Version"] = svcObj.version;
		}

		// if the user has defined his own headers, use them
		if (headers) {
			for (var header in headers) {
				defaultHeaders[header] = headers[header];
			}
		}

		networkProvider.post(homeUrl + "/" + operationName,
			requestData, defaultHeaders,
			function(res) {
				if (kony.sdk.metric) {
					kony.sdk.metric.clearBufferEvents();
				}
				kony.sdk.verifyAndCallClosure(successCallback, res);
			},
			function(xhr, status, err) {
				kony.sdk.processIntegrationErrorResponse(xhr,true,failureCallback);
			});
	};

	kony.sdk.processIntegrationErrorResponse = function(err,isAsync,callBack){
		if (kony.sdk.metric) {
			if (kony.sdk.metric.errorCodeMap[err.opstatus]) {
				kony.sdk.metric.saveInDS();
			}
		}
		if(err["mfcode"]){
			var konyRef = kony.sdk.getCurrentInstance();
			//clear the cache if the error code related to session/token expiry
			if (kony.sdk.isSessionOrTokenExpired(err["mfcode"])) {
				kony.sdk.resetCacheKeys(konyRef);
			}
		}
		if(!isAsync){
            return kony.sdk.error.getIntegrationErrObj(err);
		}
		else if(callBack){
		  kony.sdk.verifyAndCallClosure(callBack, kony.sdk.error.getIntegrationErrObj(err));
		}
	}

	//This is an internal api to invoke an service synchronously
   	this.invokeOperationSync = function(operationName, headers, data) {
		var res=null;
		res = kony.sdk.claimsRefreshSync();
		if(res && res.message && res.message == "success")
		{
			return _invokeOperationSync(operationName, headers, data);
		}
		else{
			return res;
		}
	};

	function _invokeOperationSync(operationName, headers, data) {
		var requestData = {};
		var logger = new konyLogger();
		var konyRef = kony.sdk.getCurrentInstance();
		var reportingData = kony.sdk.getPayload(konyRef);
		var sessionId = kony.ds.read("konyUUID");
		if(sessionId){
		  reportingData.rsid = sessionId[0];
		}
		if(!reportingData.rsid)
		{
			logger.log("rsid is either empty,null or undefined");
		}
		if (kony.sdk.metric) {
			if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
				kony.sdk.metric.readFromDS();
			}
			kony.sdk.metric.pushEventsToBufferArray();
			requestData.events = kony.sdk.metric.reportEventBufferBackupArray;
		}
		for (var key in data) {
			requestData[key] = data[key];
		}
		reportingData.svcid = operationName;
		var token;
		for (var i in konyRef.tokens) {
			if (konyRef.tokens.hasOwnProperty(i) && typeof(i) !== 'function') {
				token = konyRef.tokens[i];
				break;
			}
		}

		requestData["konyreportingparams"] = JSON.stringify(reportingData);
		var defaultHeaders = {
			"Content-Type": "application/x-www-form-urlencoded",
			"X-Kony-Authorization": konyRef.currentClaimToken
		}
		
		if(typeof(svcObj) === 'object' &&  svcObj.version){
			defaultHeaders["X-Kony-API-Version"] = svcObj.version;
		}
		// if the user has defined his own headers, use them
		if (headers) {
			for (var header in headers) {
				defaultHeaders[header] = headers[header];
			}
		}
        var res = null;
		res = networkProvider.postSync(homeUrl + "/" + operationName,
			requestData, defaultHeaders);
		if(res.opstatus == 0){
			if (kony.sdk.metric) {
					kony.sdk.metric.clearBufferEvents();
				}
			return res;
		}
		else{
			return kony.sdk.processIntegrationErrorResponse(res,false);
		}
	};
};

kony.sdk.claimsRefreshSync = function() {
	var konyRef = kony.sdk.getCurrentInstance();
	var logger = new konyLogger();
	var networkProvider = new konyNetworkProvider();
	var loginWithAnonymousProvider = function() {
		var identityObject = konyRef.getIdentityService("$anonymousProvider");
		var res = identityObject.anonymousLoginSync(null);
		if(res && JSON.stringify(res) == "{}")
		{
			return {"message" : "success"};
		}
		else{
			return kony.sdk.error.getAuthErrObj(res);
		}
	};

	if (konyRef.currentClaimToken === null) {
		logger.log("claims Token is Unavialable");
		if (konyRef.isAnonymousProvider) {
			return loginWithAnonymousProvider();
		} else {
			return kony.sdk.error.getNullClaimsTokenErrObj();
		}
	} else if (konyRef.claimTokenExpiry && new Date().getTime() > konyRef.claimTokenExpiry) {
		if (konyRef.isAnonymousProvider) {
			return loginWithAnonymousProvider();		
		} else {
			logger.log("claims token has expired. fetching new token..")
			var _serviceUrl = stripTrailingCharacter(konyRef.rec.url, "/");
			var _url = _serviceUrl + "/claims";
			logger.log("service url is " + _url);
			if (konyRef.currentRefreshToken === null) {
				return kony.sdk.error.getNullRefreshTokenErrObj();
			} else {
		         var data = networkProvider.postSync(_url, {}, {
							"Authorization": konyRef.currentRefreshToken,
							"Content-Type": "application/x-www-form-urlencoded"
							});
		         if(data.opstatus == 0){
		            logger.log("refresh success..acquiring new tokens");
		         	return kony.sdk.processClaimsSuccessResponse(data,konyRef,false); 
	             }
		         else{
		            logger.log("failed to acquire refresh token");
                    return kony.sdk.processClaimsErrorResponse(data,konyRef,false); 
		         }
			}
		}
	} else {
		return { "message" :"success"};
	}
};
/**
 * Method to create the messaging service instance.
 * @returns {MessagingService} Messaging service instance
 */
kony.sdk.prototype.getMessagingService = function() {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	return new MessagingService(this);
}

/**
 * Should not be called by the developer.
 * @class
 * @classdesc Messaging service instance for invoking the Messaging services.
 *@param reference to kony object
 */
function MessagingService(konyRef) {

	var homeUrl = konyRef.messagingsvc.url;
	var KSID;
	var appId = konyRef.messagingsvc.appId;
	var logger = new konyLogger();
	var networkProvider = new konyNetworkProvider();
	var dsKey = homeUrl + ":KMS:AppId";

	this.getUrl = function() {
		return homeUrl;
	};

	this.setKSID = function(ksid) {
		konyRef.getDataStore().setItem(dsKey, ksid);
		KSID = ksid;
	};

	this.getKSID = function() {
		if (!KSID) {
			KSID = konyRef.getDataStore().getItem(dsKey);
		}
		return KSID;
	};

	this.setKmsAppId = function(id) {
		appId = id;
	};

	this.getKmsAppId = function() {
		return appId;
	};
	
	var registerForMessagingService = function(osType, deviceId, pnsToken, email, authToken, successCallback, failureCallback) {
		var uri = homeUrl + "/subscribers";
		var subscribeParamsJson = {
				"sid": pnsToken,
				"appId": appId,
				"ufid": email,
				"osType": osType,
				"deviceId": deviceId
			}
		if(authToken!=undefined && authToken != null)
			subscribeParamsJson["authToken"] = authToken;
		jsonParam = {
			"subscriptionService": {
				"subscribe": subscribeParamsJson
			}
		};
		logger.log(JSON.stringify(jsonParam));
		var headers = {
			"Content-Type": "application/json"
		};
		var payload = {
			postdata: JSON.stringify(jsonParam)
		};
		networkProvider.post(uri,
			payload,
			headers,
			function(data) {
				KSID = data.id;
				konyRef.getDataStore().setItem(dsKey, KSID);
				logger.log("Device registered to KMS with KSID:" + KSID);
				kony.sdk.verifyAndCallClosure(successCallback, data);
			},
			function(data, status, error) {

				logger.log("ERROR: Failed to register device for KMS");
				var errorObj = {};
				errorObj.data = data;
				errorObj.status = status;
				errorObj.error = error;
				kony.sdk.verifyAndCallClosure(failureCallback, errorObj);
			});
	}
	/**
	 * register success callback method.
	 * @callback registerSuccessCallback
	 * @param {json} response - register response
	 */

	/**
	 * Register service failure callback method.
	 * @callback registerFailureCallback
	 * @param {json} error - Error information
	 */
	/**
	 * register to messaging service
	 * @param {string} osType - Type of the operating system
	 * @param {string} deviceId - Device Id
	 * @param {string} pnsToken - Token value
	 * @param {registerSuccessCallback} successCallback - Callback method on success
	 * @param {registerFailureCallback} failureCallback - Callback method on failure
	 */
	this.register = function(osType, deviceId, pnsToken, email, successCallback, failureCallback) {
		if (typeof(pnsToken) === 'undefined' || pnsToken === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid pnsToken/sId. Please check your messaging provider");
		}
		if (typeof(osType) === 'undefined' || osType === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid osType.");
		}
		if (typeof(deviceId) === 'undefined' || deviceId === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid deviceId.");
		}
		if (typeof(email) === 'undefined' || email === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid email.");
		}
		registerForMessagingService(osType, deviceId, pnsToken, email, null,function(data){
			kony.sdk.verifyAndCallClosure(successCallback, data)
		}, function(errorObj){
			kony.sdk.verifyAndCallClosure(failureCallback, errorObj);
		});
	};
	/**
	 * register success callback method.
	 * @callback registerSuccessCallback
	 * @param {json} response - register response
	 */

	/**
	 * Register service failure callback method.
	 * @callback registerFailureCallback
	 * @param {json} error - Error information
	 */
	/**
	 * register to messaging service
	 * @param {string} osType - Type of the operating system
	 * @param {string} deviceId - Device Id
	 * @param {string} authToken - Authorization Token
	 * @param {string} pnsToken - Token value
	 * @param {registerSuccessCallback} successCallback - Callback method on success
	 * @param {registerFailureCallback} failureCallback - Callback method on failure
	 */
	this.registerWithAuthToken = function(osType, deviceId, pnsToken, email, authToken, successCallback, failureCallback) {
		if (typeof(pnsToken) === 'undefined' || pnsToken === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid pnsToken/sId. Please check your messaging provider");
		}
		if (typeof(osType) === 'undefined' || osType === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid osType.");
		}
		if (typeof(deviceId) === 'undefined' || deviceId === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid deviceId.");
		}
		if (typeof(email) === 'undefined' || email === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid email.");
		}
		if (typeof(authToken) === 'undefined' || authToken === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid authToken.");
		}
		registerForMessagingService(osType, deviceId, pnsToken, email, authToken,function(data){
			kony.sdk.verifyAndCallClosure(successCallback, data)
		}, function(errorObj){
			kony.sdk.verifyAndCallClosure(failureCallback, errorObj);
		});
	};
	/**
	 * unregister success callback method.
	 * @callback unregisterSuccessCallback
	 */

	/**
	 * unregister service failure callback method.
	 * @callback unregisterFailureCallback
	 */
	/**
	 * unregister to messaging service
	 * @param {unregisterSuccessCallback} successCallback - Callback method on success
	 * @param {unregisterFailureCallback} failureCallback - Callback method on failure
	 */
	this.unregister = function(successCallback, failureCallback) {
		this.unregisterWithAuthToken(null,successCallback, failureCallback);
	};
	
	/**
	 * unregister to messaging service
	 * @param {unregisterSuccessCallback} successCallback - Callback method on success
	 * @param {unregisterFailureCallback} failureCallback - Callback method on failure
	 */
	this.unregisterWithAuthToken = function(authToken, successCallback, failureCallback) {
		var uri = homeUrl + "/subscribers"
		var sub = {
			"ksid": this.getKSID()
		};
		if(authToken != undefined && authToken != null){
			sub["authToken"] = authToken;
		}
		var inp = {
			"subscriptionService": {
				"unsubscribe": sub
			}
		};
		var headers = {
			"Content-Type": "application/json"
		};
		var payload = {
			postdata: JSON.stringify(inp)
		}
		logger.log("unsubscribe uri:" + uri);
		
		konyRef.getDataStore().removeItem(dsKey);
		networkProvider.post(uri,
			payload,
			headers,
			function(data) {
				kony.sdk.verifyAndCallClosure(successCallback, data);
			},
			function(data, status, error) {

				logger.log("ERROR: Failed to unregister device for KMS");
				var errorObj = {};
				errorObj.data = data;
				errorObj.status = status;
				errorObj.error = error;
				kony.sdk.verifyAndCallClosure(failureCallback, errorObj);
			});
	};
	/**
	 * Fetch all messages success callback method.
	 * @callback fetchAllMessagesSuccessCallback
	 * @param {json} response - Fetch all messages response
	 */

	/**
	 * Fetch all messages service failure callback method.
	 * @callback fetchAllMessagesFailureCallback
	 * @param {json} error - Error information
	 */
	/**
	 * Fetch all messages
	 * @param {fetchAllMessagesSuccessCallback} successCallback - Callback method on success
	 * @param {fetchAllMessagesFailureCallback} failureCallback - Callback method on failure
	 */
	this.fetchAllMessages = function(startIndex, pageSize, successCallback, failureCallback) {
		var uri = homeUrl + "/messages/fetch";

		var data = {
			"ksid": this.getKSID(),
			"startElement": startIndex,
			"elementsPerPage": pageSize
		};
		var headers = {
			"Content-Type": "application/json"
		};
		var payload = {
			postdata: JSON.stringify(data)
		};

		networkProvider.post(uri, payload, headers, successCallback, failureCallback);
	};
	/**
	 * Update location service success callback method.
	 * @callback updateLocationSuccessCallback
	 * @param {json} response - Update location response
	 */
	this.updateGeoLocation = function(latitude, longitude, locationName, successCallback, failureCallback) {
		this.updateGeoLocationWithAuthToken(latitude, longitude, locationName, null, successCallback, failureCallback);
	}
	/**
	 * Update location service failure callback method.
	 * @callback updateLocationFailureCallback
	 * @param {json} error - Error information
	 */
	/**
	 * Update the location
	 * @param {string} latitude - Latitude value
	 * @param {string} longitude - Longitude value
	 * @param {string} locationName - Location name
	 * @param {updateLocationSuccessCallback} successCallback - Callback method on success
	 * @param {updateLocationFailureCallback} failureCallback - Callback method on failure
	 */
	this.updateGeoLocationWithAuthToken = function(latitude, longitude, locationName, authToken, successCallback, failureCallback) {
		if (typeof(latitude) === 'undefined' || latitude === null) {
			throw new Exception(MESSAGING_FAILURE, "invalid latitude paramter value");
		}
		if (typeof(longitude) === 'undefined' || longitude === null) {
			throw new Exception(MESSAGING_FAILURE, "invalid longitude paramter value");
		}
		if (typeof(locationName) === 'undefined' || locationName === null) {
			throw new Exception(MESSAGING_FAILURE, "invalid locationName paramter value");
		}

		var uri = homeUrl + "/location";
		var data = {
			"ksid": this.getKSID(),
			"latitude": latitude,
			"locname": locationName,
			"longitude": longitude
		};
		if(authToken != null && authToken != undefined){
			data["authToken"] = authToken;
		}
		var headers = {
			"Content-Type": "application/json"
		};

		var payload = {
			postdata: JSON.stringify(data)
		};
		logger.log("updateLocation payload: " + JSON.stringify(payload));
		networkProvider.post(uri, payload, headers, successCallback, failureCallback);
	};
	/**
	 * Mark meesage as read service success callback method.
	 * @callback markReadSuccessCallback
	 * @param {json} response - Mark meesage as read service response
	 */
	/**
	 * Mark meesage as read service failure callback method.
	 * @callback markReadFailureCallback
	 * @param {json} error - Error information
	 */
	/**
	 * Mark the message as read for a given message id
	 * @param {string} messageId - Message id
	 * @param {markReadSuccessCallback} successCallback - Callback method on success
	 * @param {markReadFailureCallback} failureCallback - Callback method on failure
	 */
	this.markMessageRead = function(fetchId, successCallback, failureCallback) {
		if (typeof(fetchId) === 'undefined' || fetchId === null) {
			throw new Exception(MESSAGING_FAILURE, "invalid fetchId paramter value");
		}
		var headers = {};
		headers["X-HTTP-Method-Override"] = "get";
		headers["Content-Type"] = "application/json";
		var uri = homeUrl + "/messages/open/" + fetchId;
		networkProvider.post(uri, null, headers, successCallback, failureCallback);

	};
	/**
	 * Message content service success callback method.
	 * @callback messageContentSuccessCallback
	 * @param {json} response - Message content service response
	 */
	/**
	 * Message content service failure callback method.
	 * @callback messageContentFailureCallback
	 * @param {json} error - Error information
	 */
	/**
	 * Fetches the message conetent for a given message id
	 * @param {string} messageId - Message id
	 * @param {messageContentSuccessCallback} successCallback - Callback method on success
	 * @param {messageContentFailureCallback} failureCallback - Callback method on failure
	 */
	this.fetchMessageContent = function(fetchId, successCallback, failureCallback) {
		if (typeof(fetchId) === 'undefined' || fetchId === null) {
			throw new Exception(MESSAGING_FAILURE, "invalid fetchId paramter value");
		}
		var uri = homeUrl + "/messages/content/" + fetchId;
		networkProvider.post(uri, null, null, successCallback, failureCallback);
	};
};
/**
 * Method to create the Metrics service instance with the provided service name.
 * @returns {MetricsService} Metrics service instance
 */
kony.sdk.prototype.getMetricsService = function() {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	if(!kony.sdk.isLicenseUrlAvailable) {
		throw new Exception(Errors.METRICS_FAILURE, "metrics is not enabled");
	}

	//var metricsServiceObject = null;
	if (this.metricsServiceObject) {
		return this.metricsServiceObject;
	}

	if (this.internalSdkObject) {
		//framework implementation
		this.metricsServiceObject = this.internalSdkObject.getMetricsService();
	} else {
		//sdk local implementation
		this.metricsServiceObject = new MetricsService(this);
	}
	return this.metricsServiceObject;
};

/**
 * Should not be called by the developer.
 * @class
 * @classdesc Metrics service instance for invoking the Metrics services.
 */
function MetricsService(konyRef) {
	var logger = new konyLogger();
	var url = konyRef.customReportingURL;
	if (typeof(url) === 'undefined') {
		throw new Exception(Errors.METRICS_FAILURE, "reporting url is undefined");
		return;
	}
	var networkProvider = new konyNetworkProvider();


	/**
	 * invoke the getUserId operation
	 */

	this.getUserId = function(userId) {
		return konyRef.getUserId();
	}

	//start of event api
	var eventFlowTag = "";
	var eventBufferMaxValue = 1000;
	var eventBufferAutoFlushValue = 15;
	var characterLengthLimit = 256;
	var eventConfig = {
		"confType": "BUFFER",
		"eventBufferAutoFlushCount": eventBufferAutoFlushValue,
		"eventBufferMaxCount": eventBufferMaxValue
	};
	var reportEventBufferArray = [];
	var reportEventBufferBackupArray = [];
	var retrievedDS = false;
	var eventBufferCount = 0;
	var eventTypeMap = {
		"formentry": "FormEntry",
		"formexit": "FormExit",
		"touch": "Touch",
		"servicerequest": "ServiceRequest",
		"serviceresponse": "ServiceResponse",
		"gesture": "Gesture",
		"orientation": "Orientation",
		"error": "Error",
		"exception": "Exception",
		"crash": "Crash",
		"custom": "Custom",
		"servicecall": "ServiceCall"
	};
	var errorCodeMap = {
		"1000": true,
		"1011": true,
		"1012": true,
		"1014": true,
		"1015": true,
		"1016": true
	};
	var currentSessionId = "";
	/**
	 * This method will take the a String to set a Flow Tag for the reported events.
	 * @param {string} flowTag - sets flow tag for reporting the events.
	 */
	this.setFlowTag = function(flowTag) {
		if (kony.sdk.isNullOrUndefined(flowTag)) {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid value for event flow tag");
		} else if (flowTag.length <= characterLengthLimit) {
			eventFlowTag = flowTag;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + characterLengthLimit + " characters");
		}
	};

	/**
	 * This method will clear the flow tag set by the user previously.
	 */
	this.clearFlowTag = function() {
		eventFlowTag = "";
	};

	/**
	 * This method will return the a String to set a Flow Tag for the reported events.
	 * @return {string} flowTag - flow tag set by the user for reporting the events.
	 */
	this.getFlowTag = function() {
		return eventFlowTag;
	};

	/**
	 * This method will take the required values to set the event Configuration values.
	 * @param {string} confType - sets the Current Configuration Type
	 * 					possible values BUFFER or INSTANT.
	 * @param {number} eventBufferAutoFlushCount - event buffer count to auto flush the events
	 * 								possible values any positive integer
	 * 								Default value 15
	 * @param {number} eventBufferMaxCount - Maximum event buffer count to store the events
	 * 								possible values any positive integer
	 * 								Default value 1000
	 */
	this.setEventConfig = function(confType, eventBufferAutoFlushCount, eventBufferMaxCount) {
		if (kony.sdk.isNullOrUndefined(confType)) {
			throw new Exception(Errors.METRICS_FAILURE, "Config Type can not be null");
		} else {
			confType = confType.toUpperCase();
		}
		if (confType === "BUFFER") {
			eventConfig["confType"] = confType;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid value for config type");
		}
		if (!kony.sdk.isNullOrUndefined(eventBufferMaxCount) && typeof(eventBufferMaxCount) === "number" && eventBufferMaxCount > 0) {
			eventConfig["eventBufferMaxCount"] = eventBufferMaxCount;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "eventBufferMaxCount has to be a Number and greater than 0");
		}
		if (!kony.sdk.isNullOrUndefined(eventBufferAutoFlushCount) && typeof(eventBufferAutoFlushCount) === "number" && eventBufferAutoFlushCount > 0 && eventBufferAutoFlushCount <= eventBufferMaxCount) {
			eventConfig["eventBufferAutoFlushCount"] = eventBufferAutoFlushCount;
		} else if (eventBufferAutoFlushCount >= eventBufferMaxCount) {
			eventConfig["eventBufferMaxCount"] = 1000;
			throw new Exception(Errors.METRICS_FAILURE, "eventBufferAutoFlushCount can not be greater than eventBufferMaxCount");
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "eventBufferAutoFlushCount has to be a Number and greater than 0");
		}
	};

	/**
	 * This method takes the event details from the developer and schedule it for sending to server as per Configuration values set by the developer.
	 * @param {string} evttype - Event Type for the reported event.
	 * @param {string} evtSubType - string literal for eventSubType(max 256 Chars)
	 * @param {string} formID -   string literal for formID(max 256 Chars)
	 * @param {string} widgetID - string literal for widgetID(max 256 Chars)
	 * @param {string} flowTag - string literal to override flow tag (max 256 Chars)
	 * @param {string} metaData - string to describe metaData
	 * @throws Exception
	 */

	this.sendEvent = function(evttype, evtSubType, formID, widgetID, flowTag, metaData) {
		if (reportEventBufferBackupArray.length === 0) {
			this.readFromDS();
		}
		eventBufferCount = reportEventBufferBackupArray.length + reportEventBufferArray.length;

		if (eventBufferCount === eventConfig["eventBufferMaxCount"]) {
			throw new Exception(Errors.DATA_STORE_EXCEPTION, "Reached maximum limit to store events");
			return;
		}
		var reportEventMap = {};
		reportEventMap.ts = kony.sdk.formatCurrentDate(new Date());
		evttype = evttype.toLowerCase();
		if (kony.sdk.isNullOrUndefined(eventTypeMap[evttype])) {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid value for event type");
			return;
		} else {
			reportEventMap["evttype"] = eventTypeMap[evttype];
		}
		if (kony.sdk.isNullOrUndefined(evtSubType)) {
			reportEventMap["evtSubType"] = "";
		} else if (evtSubType.length <= characterLengthLimit) {
			reportEventMap["evtSubType"] = evtSubType;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + characterLengthLimit + " characters");
			return;
		}
		if (kony.sdk.isNullOrUndefined(formID)) {
			reportEventMap["formID"] = kony.application.getCurrentForm().id;
		} else if (formID.length <= characterLengthLimit) {
			reportEventMap["formID"] = formID;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + characterLengthLimit + " characters");
			return;
		}
		if (kony.sdk.isNullOrUndefined(widgetID)) {
			reportEventMap["widgetID"] = "";
		} else if (widgetID.length <= characterLengthLimit) {
			reportEventMap["widgetID"] = widgetID;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + characterLengthLimit + " characters");
			return;
		}
		if (kony.sdk.isNullOrUndefined(flowTag)) {
			reportEventMap["flowTag"] = this.getFlowTag();
		} else if (flowTag.length <= characterLengthLimit) {
			reportEventMap["flowTag"] = flowTag;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + characterLengthLimit + " characters");
			return;
		}
		reportEventMap.SID = currentSessionId;
		reportEventMap.metaData = metaData;
		//checking each event data is a proper json or not
		// if (!kony.sdk.isJson(reportEventMap)) {
		// 	throw new Exception(Errors.METRICS_FAILURE, "Invalid json string passed for events data");
		// }

		reportEventBufferArray.push(reportEventMap);

		if (reportEventBufferArray.length % eventConfig["eventBufferAutoFlushCount"] === 0) {
			this.flushEvents();
		}
	};

	/**
	 * This method will send the buffered events to the server at once.
	 */

	this.flushEvents = function() {
		var logger = new konyLogger();
		var ref = this;
		if (reportEventBufferBackupArray.length === 0) {
			ref.readFromDS();
		}
		if (reportEventBufferBackupArray.length === 0 && reportEventBufferArray.length === 0) {
			logger.log("There are no events to flush");
			return;
		}
		var payload = kony.sdk.getPayload(kony.sdk.getCurrentInstance());
		var params = {};
		if (reportEventBufferArray.length !== 0) {
			ref.pushEventsToBufferArray();
		}
		var headers = {
			"Content-Type": "application/x-www-form-urlencoded"
		};
		params.httpheaders = headers;
		payload.events = reportEventBufferBackupArray;
		payload.svcid = "SendEvents";
		payload.rsid = reportEventBufferBackupArray[0].SID;
		params.konyreportingparams = JSON.stringify(payload);
		kony.net.invokeServiceAsync(kony.sdk.currentInstance.customReportingURL, params, flushCallback);

		function flushCallback(status, response) {
			if (status === 400) {
				if (response.opstatus === 0) {
					ref.clearBufferEvents();
				} else if (errorCodeMap[response.opstatus]) {
					ref.saveInDS();
				} else {
					ref.clearBufferEvents();
				}
			} else if (status === 300) {
				ref.saveInDS();
			}
		}
	};

	/*Stores event data in Data Store on failure of service Call*/
	this.saveInDS = function() {
		var eventsToSave = [];
		eventsToSave.push(JSON.stringify(reportEventBufferBackupArray));
		kony.ds.save(eventsToSave, "konyMetricsBuffer");
		reportEventBufferBackupArray = [];
	};

	/*Clearing events sent to server */
	this.clearBufferEvents = function() {
		reportEventBufferBackupArray = [];
		kony.ds.remove("konyMetricsBuffer");
	};

	/*Reading any pending events from Data Store */
	this.readFromDS = function() {
		var eventsFromDS = kony.ds.read("konyMetricsBuffer");
		if (eventsFromDS !== null) {
			var pushToArray = [];
			pushToArray.push(JSON.parse(eventsFromDS[0]));
			reportEventBufferBackupArray.push.apply(reportEventBufferBackupArray, pushToArray);
		}
	};

	/*Pushes events received from user to BufferBackupArray which will be flushed to server */
	this.pushEventsToBufferArray = function() {
		reportEventBufferBackupArray.push.apply(reportEventBufferBackupArray, reportEventBufferArray);
		reportEventBufferArray = [];
	};

	/**
	 * This method will return the a List of the buffered events.
	 * @return {object} events - list of events stored in buffer.
	 */

	this.getEventsInBuffer = function() {
		var eventsFromDS = kony.ds.read("konyMetricsBuffer");
		var eventsToReturn = [];
		if (!kony.sdk.isNullOrUndefined(eventsFromDS)) {
			eventsToReturn.push(JSON.parse(eventsFromDS[0]));
		}
		if (reportEventBufferArray.length !== 0) {
			eventsToReturn.push.apply(eventsToReturn, reportEventBufferArray);
		}
		if (eventsToReturn.length !== 0) {
			return eventsToReturn;
		} else {
			return null;
		}
	};

	/**
	 * invoke the sendCustomMetrics operation
	 * @param {string} reportingGroupID - reporting Group ID
	 * @param {object} metrics - metrics being reported
	 */
	this.sendCustomMetrics = function(reportingGroupID, metrics) {
		if (typeof(metrics) !== "object") {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid type for metrics data.");
			return;
		}
		var sessionID = currentSessionId;
		var reportData = konyRef.getDataStore().getItem("konyCustomReportData");
		if (!reportData) {
			reportData = new Array();
		} else {
			reportData = JSON.parse(reportData);
		}

		konyRef.getDataStore().removeItem("konyCustomReportData");

		var currentData = {};
		currentData.ts = kony.sdk.formatCurrentDate(new Date().toString());
		currentData.fid = reportingGroupID;
		currentData.metrics = metrics;
		currentData.rsid = sessionID;
		reportData.push(currentData);
		//nyRef.getDataStore().setItem("konyCustomReportData",JSON.stringify(reportData));
		var payload = kony.sdk.getPayload(konyRef);
		if (kony.sdk.metric) {
			if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
				kony.sdk.metric.readFromDS();
			}
			kony.sdk.metric.pushEventsToBufferArray();
			payload.events = kony.sdk.metric.reportEventBufferBackupArray;
		}
		payload.reportData = reportData;
		payload.rsid = sessionID;
		payload.svcid = "CaptureKonyCustomMetrics";
		// if (!kony.sdk.isJson(payload)) {
		// 	throw new Exception(Errors.METRICS_FAILURE, "Invalid json string passed for custom metrics");
		// }
		var newData = {};
		newData["konyreportingparams"] = JSON.stringify(payload);

		networkProvider.post(url, newData, {
				"Content-Type": "application/x-www-form-urlencoded"
			}, function(res) {
				//successcallback
				//konyRef.getDataStore().removeItem("konyCustomReportData");
				if (kony.sdk.metric) {
					kony.sdk.metric.clearBufferEvents();
				}
				logger.log("metric data successfully sent" + JSON.stringify(res));
			},
			function(res) {

				var storeData = konyRef.getDataStore().getItem("konyCustomReportData");
				if (!storeData) {
					storeData = new Array();
				} else {
					storeData = JSON.parse(storeData);
				}
				if (kony.sdk.metric) {
					if (kony.sdk.metric.errorCodeMap[res.opstatus]) {
						kony.sdk.metric.saveInDS();
					}
				}
				storeData.push(reportData);
				konyRef.getDataStore().setItem("konyCustomReportData", JSON.stringify(storeData));

				logger.log("Unable to send metric report" + JSON.stringify(res));
			}, true);
	};

	/**
	 * This method takes the event details from the developer and schedule it for sending to server as per Configuration values set by the developer.
	 * @param {string} errorCode - errorCode of the reported error. Can be empty if not applicable
	 * @param {string} errorType -   errorType of the reported error. Can be empty if not applicable
	 * @param {string} errorMessage - errorMessage of the reported error. Can be empty if not applicable
	 * @param {json} errorDetails - errorDetails of the reported error as a json string that can have key-value pairs for the following
					keys errfile, errmethod, errline, errstacktrace, formID, widgetID, flowTag.
	 * @throws Exception
	 */

	this.reportError = function(errorCode, errorType, errorMessage, errorDetails) {
		var metaData = {};
		metaData.errorcode = errorCode ? errorCode : "";
		metaData.errmsg = errorMessage ? errorMessage : "";
		if (errorDetails && kony.sdk.isJson(errorDetails)) {
			metaData.errfile = errorDetails.errfile ? errorDetails.errfile : "";
			metaData.errmethod = errorDetails.errmethod ? errorDetails.errmethod : "";
			metaData.errline = errorDetails.errline ? errorDetails.errline : "";
			metaData.errstacktrace = errorDetails.errstacktrace ? errorDetails.errstacktrace : "";
			metaData.errcustommsg = errorDetails.errcustommsg ? errorDetails.errcustommsg : "";
			var formID = errorDetails.formID ? errorDetails.formID : "";
			var widgetID = errorDetails.widgetID ? errorDetails.widgetID : "";
			var flowTag = errorDetails.flowTag ? errorDetails.flowTag : "";
			var evtSubType = errorType ? errorType : "";
			this.sendEvent("Error", evtSubType, formID, widgetID, flowTag, metaData);
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid json string passed for error details.");
		}
	};


	/**
	 * This method takes the event details from the developer and schedule it for sending to server as per Configuration values set by the developer.
	 * @param {string} exceptionCode - Code for the reported exception. Can be empty if not applicable
	 * @param {string} exceptionType -   Type of the reported exception. Can be empty if not applicable
	 * @param {string} exceptionMessage - Message of the reported exception. Can be empty if not applicable
	 * @param {json}   exceptionDetails - Details of the reported exception as a JSON string that can have key-value pairs for the
					following keys exceptioncode, exceptionfile, exceptionmethod, exceptionline,
					exceptionstacktrace, formID, widgetID, flowTag.
	 * @throws Exception
	 */

	this.reportHandledException = function(exceptionCode, exceptionType, exceptionMessage, exceptionDetails) {
		var metaData = {};
		metaData.exceptioncode = exceptionCode ? exceptionCode : "";
		metaData.exceptionmsg = exceptionMessage ? exceptionMessage : "";
		if (exceptionDetails && kony.sdk.isJson(exceptionDetails)) {
			metaData.errfile = exceptionDetails.errfile ? exceptionDetails.errfile : "";
			metaData.errmethod = exceptionDetails.errmethod ? exceptionDetails.errmethod : "";
			metaData.errline = exceptionDetails.errline ? exceptionDetails.errline : "";
			metaData.errstacktrace = exceptionDetails.errstacktrace ? exceptionDetails.errstacktrace : "";
			metaData.errcustommsg = exceptionDetails.errcustommsg ? exceptionDetails.errcustommsg : "";
			var formID = exceptionDetails.formID ? exceptionDetails.formID : "";
			var widgetID = exceptionDetails.widgetID ? exceptionDetails.widgetID : "";
			var flowTag = exceptionDetails.flowTag ? exceptionDetails.flowTag : "";
			var evtSubType = exceptionType ? exceptionType : "";
			this.sendEvent("Exception", evtSubType, formID, widgetID, flowTag, metaData);
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid json string passed for exception details.");
		}
	};

	/**
	 * sets the current sessionId
	 * @param {string} sessionId
	 */

	this.setSessionId = function(sessionId) {
		if (sessionId) {
			currentSessionId = sessionId;
		}
	}

	/**
	 * get the current sessionID
	 *
	 */


	this.getSessionId = function() {
		return currentSessionId;
	}

	/**
	 * stub method used for event tracking
	 *
	 */
	this.setEventTracking = function(eventTypes) {
		// Stub.  This is implemented in native->js binding
	}
}


//stub method
kony.sdk.initiateSession = function() {
	return;
}
/**
 * Method to create the Reporting service instance with the provided service name.
 * @returns {ReportingService} Reporting service instance
 */
kony.sdk.prototype.getReportingService = function() {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	return new ReportingService(this);
};
/**
 * Should not be called by the developer.
 * @class
 * @classdesc Reporting service instance for invoking the reporting services.
 */
function ReportingService(konyRef) {
	var logger = new konyLogger();
	var url = konyRef.customReportingURL;
	if (typeof(url) === 'undefined') {
		throw new Exception(Errors.METRICS_FAILURE, "reporting url is undefined");
		return;
	}
	var networkProvider = new konyNetworkProvider();
	/**
	 * invoke the setUserId operation
	 * @param {string} userId - userId specified by user
	 */

	this.setUserId = function(userId) {
		konyRef.setCurrentUserId(userId);
	}

	/**
	 * invoke the getUserId operation
	 */

	this.getUserId = function(userId) {
		return konyRef.getUserId();
	}

	/**
	 * invoke the report operation
	 * @param {string} reportingGroupID - reporting Group ID
	 * @param {object} metrics - metrics being reported
	 */
	this.report = function(reportingGroupID, metrics) {
		if (typeof(metrics) !== "object") {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid type for metrics data.");
			return;
		}
		var sessionID = kony.ds.read("konyUUID");
		var reportData = konyRef.getDataStore().getItem("konyCustomReportData");
		if (!reportData) {
			reportData = new Array();
		} else {
			reportData = JSON.parse(reportData);
		}

		konyRef.getDataStore().removeItem("konyCustomReportData");

		var currentData = {};
		currentData.ts = kony.sdk.formatCurrentDate(new Date().toString());
		currentData.fid = reportingGroupID;
		currentData.metrics = metrics;
		currentData.rsid = sessionID;
		reportData.push(currentData);
		//nyRef.getDataStore().setItem("konyCustomReportData",JSON.stringify(reportData));
		var payload = kony.sdk.getPayload(konyRef);
		if (kony.sdk.metric) {
			if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
				kony.sdk.metric.readFromDS();
			}
			kony.sdk.metric.pushEventsToBufferArray();
			payload.events = kony.sdk.metric.reportEventBufferBackupArray;
		}
		payload.reportData = reportData;
		payload.rsid = sessionID;
		payload.svcid = "CaptureKonyCustomMetrics";
		// if (!kony.sdk.isJson(payload)) {
		// 	throw new Exception(Errors.METRICS_FAILURE, "Invalid json string passed for custom metrics");
		// }
		var newData = {};
		newData["konyreportingparams"] = JSON.stringify(payload);

		networkProvider.post(url, newData, {
				"Content-Type": "application/x-www-form-urlencoded"
			}, function(res) {
				//successcallback
				//konyRef.getDataStore().removeItem("konyCustomReportData");
				if (kony.sdk.metric) {
					kony.sdk.metric.clearBufferEvents();
				}
				logger.log("metric data successfully sent" + JSON.stringify(res));
			},
			function(res) {

				var storeData = konyRef.getDataStore().getItem("konyCustomReportData");
				if (!storeData) {
					storeData = new Array();
				} else {
					storeData = JSON.parse(storeData);
				}
				if (kony.sdk.metric) {
					if (kony.sdk.metric.errorCodeMap[res.opstatus]) {
						kony.sdk.metric.saveInDS();
					}
				}
				storeData.push(reportData);
				konyRef.getDataStore().setItem("konyCustomReportData", JSON.stringify(storeData));

				logger.log("Unable to send metric report" + JSON.stringify(res));
			}, true);
	}

}


//stub method
kony.sdk.initiateSession = function() {
	return;
}
/**
 * Method to create the sync service instance.
 * @returns {SyncService} sync service instance
 */
kony.sdk.prototype.getSyncService = function() {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	return new konySdkSyncService(this);

}

function konySdkSyncService(konyRef) {
	var SyncProvider = konyRef.sync;
	if(kony.sdk.isNullOrUndefined(kony.sdk.syncService)){
		kony.sdk.syncService = sync;
	}
	var syncServiceHandler = kony.sdk.syncService;
	
	if (!SyncProvider) {
		throw new Exception(Errors.SYNC_FAILURE, "invalid sync provider in serviceDoc");
	}
	//mapping the sync logger to mbaassyncservice logger
	this.log = syncServiceHandler.log;
	
	//generic apis
	this.init = function(initSuccess, initFailure) {
		syncServiceHandler.init(initSuccess, initFailure);
	}

	this.reset = function(resetSuccess, resetFailure) {
		syncServiceHandler.reset(resetSuccess, resetFailure);
	}

	this.cancelPendingChunkRequests = function(successCallback, errorCallback) {
		syncServiceHandler.cancelPendingChunkRequests(successCallback, errorCallback);
	}

	this.stopSession = function(successCallback) {
		syncServiceHandler.stopSession(successCallback);
	}

	this.rollbackPendingLocalChanges = function(successCallback, errorCallback) {
		syncServiceHandler.rollbackPendingLocalChanges(successCallback, errorCallback);
	}

	this.getPendingAcknowledgement = function(successCallback, errorCallback) {
		syncServiceHandler.getPendingAcknowledgement(successCallback, errorCallback);
	}

	this.getPendingUpload = function(successCallback, errorCallback) {
		syncServiceHandler.getPendingUpload(successCallback, errorCallback);
	}

	this.getDeferredUpload = function(successCallback, errorCallback) {
		syncServiceHandler.getDeferredUpload(successCallback, errorCallback);
	}

	this.getAllPendingUploadInstances = function(retrieveOnlyCount, successcallback, errorcallback) {
		syncServiceHandler.getAllPendingUploadInstances(retrieveOnlyCount, successcallback, errorcallback);
	}

	this.executeSelectQuery = function(query, successcallback, errorcallback) {
		syncServiceHandler.executeSelectQuery(query, successcallback, errorcallback);
	}

	//adding the binary apis
	this.getFailedBinaryRecords = function(isDownload, tablename, columnname, successCallback, errorCallback) {
		syncServiceHandler.getFailedBinaryRecords(isDownload, tablename, columnname, successCallback, errorCallback);
	};

	this.getStatusForBinary = function(tbname, columnName, pks, successCallback, errorCallback) {
		syncServiceHandler.getStatusForBinary(tbname, columnName, pks, successCallback, errorCallback);
	}

	this.getBinaryBase64 = function(tbname, columnName, pks, config, successCallback, errorCallback) {
		syncServiceHandler.getBinaryBase64(tbname, columnName, pks, config, successCallback, errorCallback);
	}

	this.getBinaryFilepath = function(tbname, columnName, pks, config, successCallback, errorCallback) {
		syncServiceHandler.getBinaryFilePath(tbname, columnName, pks, config, successCallback, errorCallback);
	}

	var syncServiceAppid = SyncProvider["appId"];
	var syncServiceUrl = SyncProvider["url"] + "/";

	function genericErrorCallback(res) {
			var logger = new konyLogger();
			logger.log("error occurred in refreshing claims token.. Please call login again " + JSON.stringify(res));
		}
		//modified api
	this.startSession = function(config) {
		var errorCallback;
		if (config.onsyncerror) {
			errorCallback = config.onsyncerror;
		} else {
			errorCallback = genericErrorCallback;
		}
		kony.sdk.claimsRefresh(sdkStartSession, errorCallback);

		function sdkStartSession() {
			config = processConfig(config);
			syncServiceHandler.startSession(config);
		}
	}

	this.performUpgrade = function(config) {
		var errorCallback;
		if (config.onperformupgradeerror) {
			errorCallback = config.onperformupgradeerror;
		} else {
			errorCallback = genericErrorCallback;
		}
		kony.sdk.claimsRefresh(sdkPerformUpgrade, errorCallback);

		function sdkPerformUpgrade() {
			config = processConfig(config);
			syncServiceHandler.performUpgrade(config);
		}
	}

	this.isUpgradeRequired = function(config) {
		var errorCallback;
		if (config.isupgraderequirederror) {
			errorCallback = config.isupgraderequirederror;
		} else {
			errorCallback = genericErrorCallback;
		}
		kony.sdk.claimsRefresh(sdkIsUpgradeRequired, errorCallback);

		function sdkIsUpgradeRequired() {
			config = processConfig(config);
			syncServiceHandler.isUpgradeRequired(config);
		}

	}

	function processConfig(config) {
		var tempConfig = config;
		tempConfig.serverurl = syncServiceUrl;
		tempConfig.appid = syncServiceAppid;
		tempConfig.authtoken = konyRef.currentClaimToken;
		return tempConfig;
	}
}

function OAuthHandler(serviceUrl, providerName, callback, type) {
	var urlType = "/" + type + "/";
	if (typeof(XMLHttpRequest) !== 'undefined') {
		var _window = window;
		var _popup = null;
		var _listener = function (event) {
			var _contents = event.data;
			_popup.close();
			_detachEvent();
			try {
				var headers = {};
				if (type == "oauth2" || type == "saml") {
					headers["Content-Type"] = "application/x-www-form-urlencoded"
				}
				callback(urlType + "token", {
					code: _contents
				}, headers);
			} catch (err) {
				logger.log("exception ::" + err);
				failureCallback();
			}
		};
		var _attachEvent = function () {
			if (_window.addEventListener) {
				_window.addEventListener('message', _listener, false);
			} else if (_window.attachEvent) {
				_window.attachEvent('message', _listener);
			} else {
				throw new Exception(Errors.INIT_FAILURE, "environment doesn't support event attaching");
			}
		};

		var _detachEvent = function () {
			if (_window.detachEvent) {
				_window.detachEvent('message', _listener);
			} else if (_window.removeEventListener) {
				_window.removeEventListener('message', _listener);
			} else {
				throw new Exception(Errors.INIT_FAILURE, "environment doesn't support attaching an event");
			}
		};
		_attachEvent();
		var _popup = _window.open(serviceUrl + urlType + "login?provider=" + providerName);
	}
	else {
		var popBasic = {
			id: "popUp",
			skin: null,
			isModal: false,
			transparencyBehindThePopup: 80
		};
		var popLayout = {
			containerWeight: 100,
			padding: [5, 5, 5, 5],
			"paddingInPixel": true
		};
		var popPSP = {};
		//to do.. this is a workaround for android browser issue.. need to refactor this code
		var browserSF = new kony.ui.Browser({
			"id": "browserSF",
			"text": "Browser",
			"isVisible": true,
			"detectTelNumber": true,
			"screenLevelWidget": false,
			"enableZoom": false
		}, {
			"margin": [0, 0, 0, 0],
			"marginInPixel": true,
			"paddingInPixel": true,
			"containerWeight": 100
		}, {});

		var prevForm = kony.application.getCurrentForm();
		var popUp = new kony.ui.Form(popBasic, popLayout, popPSP);
		popUp.add(browserSF);
		popUp.show();

		var urlConf = {
			URL: serviceUrl + urlType + "login?provider=" + providerName,
			requestMethod: constants.BROWSER_REQUEST_METHOD_GET
		};
		browserSF.requestURLConfig = urlConf;
		browserSF.handleRequest = handleRequestCallback;

		function handleRequestCallback(browserWidget, params) {

			var originalUrl = params["originalURL"];
			if (typeof(params.queryParams) !== "undefined" && typeof(params.queryParams.code) !== "undefined") {
				var prevFormPostShow = prevForm.postShow;
				prevForm.postShow = postShowOverride;
				function postShowOverride() {
					popUp.destroy();
					if (prevFormPostShow) {
						prevFormPostShow();
					}
					prevForm.postShow = prevFormPostShow;
				}

				prevForm.show();
				var headers = {};
				if (type == "oauth2" || type == "saml") {
					headers["Content-Type"] = "application/x-www-form-urlencoded"
				}
				// make request for tokens
				kony.timer.schedule("oauth2callbacktimer", function (url, callback, code, headers) {
					return function () {
						callback(url, {code: code}, headers);
					}
				}(urlType + "token", callback, decodeURIComponent(params.queryParams.code), headers), 1, false);
			}
			return false;
		}
	}
}

if(kony.sdk){
	kony.sdk.offline = {};
}
//defined constants related to offline authentication.
kony.sdk.offline.isOfflineEnabled = false;
kony.sdk.constants.iterations = 1024;
kony.sdk.constants.keyLength = 256;
/**
 *	This Utility API to be used for the user to be able to login offline into the application.
 */
kony.sdk.offline.loginOffline = function(successCallback,errorCallback){
	var logger = new konyLogger();
	//retrieving the temporarily stored encrypted username.
	var tempUserIdBase64 = kony.store.getItem("tempUserCredentials");

	if(tempUserIdBase64 != null && tempUserIdBase64 != undefined){
		var storedBase64 = kony.store.getItem("userCredentials");

		if(tempUserIdBase64 == storedBase64 ){
			var authResponseStr = kony.store.getItem("authResponse");
			if(authResponseStr)
				successCallback(JSON.parse(authResponseStr));
			else{
				errorCallback(kony.sdk.error.getMFcodeErrObj(kony.sdk.errorcodes.offline_auth_failed,kony.sdk.errormessages.offline_auth_failed));
			}
		}
		else{
			errorCallback(kony.sdk.error.getMFcodeErrObj(kony.sdk.errorcodes.offline_auth_failed,kony.sdk.errormessages.offline_auth_failed))
		}
	}
}
/**
 *	This API is to be used to store the user login success response to the device and read it in the offline auth success scenario.
 */
kony.sdk.offline.saveUserAuthInformation = function(authResponse){
	var logger = new konyLogger();
	kony.store.setItem("authResponse",JSON.stringify(authResponse));
	logger.log("saved auth info from the login success response");

}

/**
 *	This api saves the temporary user credentials to the device store.  This is to be called only if the app is offline auth enabled.
 */
kony.sdk.offline.saveTempUserCredentials = function(options){
	var logger = new konyLogger();
	var op = {"algo":"SHA256","userid":options["userid"],"password":options["password"],"iterations":kony.sdk.constants.iterations,"keyLength":kony.sdk.constants.keyLength};
	var key = kony.sdk.offline.getKey(op);
	var encrypteduserid = kony.crypto.encrypt("aes", key, options["userid"], {});

	var base64userid = kony.convertToBase64(encrypteduserid);

	kony.store.setItem("tempUserCredentials",base64userid);
}
/**
 *	This Util method reads the temporarily stored user credentials and updates the actual store of user credentials. This should be called on successful onlnine login.
 */
kony.sdk.offline.updateSuccessUserCredentials=function(){
	var tempUserObj = kony.store.getItem("tempUserCredentials");
	if(tempUserObj != null && tempUserObj != undefined)
		kony.store.setItem("userCredentials",tempUserObj);
	kony.store.removeItem("tempUserCredentials");
}

/**
 * 	This API generates the PBKDF2 key by reading the options passed as argument.
 */
kony.sdk.offline.getKey = function(options){
	var userid = options["userid"];
	var password = options["password"];
	var salt = userid+password;
	var iterations = options["iterations"];
	var klen = options["keyLength"];
	var key = kony.crypto.createPBKDF2Key(options["algo"], options["password"], salt ,iterations, klen);
	return key;
}
/**
 *	This Utility API is to enable the developer read the claims token when the device is in offline mode.
 */
kony.sdk.offline.getClaimsToken = function(){

	var userAuthInfoStr = kony.store.getItem("userAuthInformation");
	var userAuthInfo = JSON.parse(userAuthInfoStr);
	return userAuthInfo.claims_token;

}
/**
 *	This API removes the user credentials from the device store.
 */
kony.sdk.offline.removeUserCredentials = function(){
	kony.store.removeItem("userCredentials");
	kony.store.removeItem("tempUserCredentials");
}

/**
 *	Removes the user auth information from device store.
 */
kony.sdk.offline.removeUserAuthInformation = function(){
	kony.store.removeItem("userAuthInformation");
}
var KNYMobileFabric = null;
var KNYMetricsService = null;
kony.setupsdks = function(initConfig, successCallBack, errorCallBack) {

  // var KNYMobileFabric = null;
  // var KNYMetricsService = null;

  var getServiceDocNonMFApp = function(initConfig) {
    var serviceDoc = new kony.sdk.serviceDoc();

    serviceDoc.setAppId(initConfig.appConfig.appId);
    serviceDoc.setBaseId(initConfig.appConfig.appId);
    serviceDoc.setAppName(initConfig.appConfig.appName);

    serviceDoc.setReportingService(kony.sdk.constants.reportingType.session, getLicenseUrl(initConfig.appConfig));
    serviceDoc.setReportingService(kony.sdk.constants.reportingType.custom, getMetricsUrl(initConfig.appConfig));

    return serviceDoc.toJSON();
  };

  var getLicenseUrl = function(appConfig) {
    var url = "";
    if (appConfig.isturlbase) {
      url = appConfig.isturlbase + "/IST";
    } else if (appConfig.secureurl) {
      url = getFromServerUrl(appConfig.secureurl, "IST");
    } else if (appConfig.url) {
      url = getFromServerUrl(appConfig.url, "IST");
    }
    return url;
  }

  var getMetricsUrl = function(appConfig) {
    var url = "";
    if (appConfig.isturlbase) {
      url = appConfig.isturlbase + "/CMS";
    } else if (appConfig.secureurl) {
      url = getFromServerUrl(appConfig.secureurl, "CMS");
    } else if (appConfig.url) {
      url = getFromServerUrl(appConfig.url, "CMS");
    }
    return url;
  }

  var getFromServerUrl = function(url, path) {
    // ServerURL for non-mf has /mwservlet appended after the context path.
    // We need to remove it to get the base server url
    //url = url.replace(/mwservlet\/*$/i, "");
    //return url + path;
    var newUrl = "";
    var exactSubString = url.match(/mwservlet/i);
    if (exactSubString) {
      var exactSubStringLength = "mwservlet".length;
      var lastSubStringIndex = url.lastIndexOf(exactSubString);
      var subString = url.slice(0, lastSubStringIndex);
      var index = (lastSubStringIndex + exactSubStringLength);
      var subString2 = url.slice(index, url.length);
      var has = /[a-zA-Z0-9]/.test(subString2);
      if (!has) {
        newUrl = subString;
      } else {
        newUrl = url;
      }
    } else {
      newUrl = url;
    }
    return newUrl + path;
  };

  var konyAPMSuccessCallBack = function(metricsObject, initConfig) {
    kony.print("Initializing event tracking");
    KNYMetricsService = metricsObject;
    if(KNYMetricsService) {
      KNYMetricsService.setEventTracking(initConfig.eventTypes);
    }

  };

  var initKNYMobileFabric = function(initConfig) {
    KNYMobileFabric = new kony.sdk();
    clientParams = {};
    clientParams.aid = appConfig.appId;
    clientParams.aname = appConfig.appName;
    KNYMobileFabric.setClientParams(clientParams);
  }

  var sdkInit = function(initConfig, successcallback, failurecallback) {
    var isInvalidConfig = false;
    var networkProvider = new konyNetworkProvider();
	
    var refreshServiceDoc = function(){
      var networkProvider = new konyNetworkProvider();
      networkProvider.post(initConfig.serviceUrl,null, {
                                "X-Kony-App-Key": initConfig.appKey,
                                "X-Kony-App-Secret": initConfig.appSecret,
                                "X-HTTP-Method-Override": "GET"
          },
          function (data) {
              kony.store.setItem("serviceDoc", JSON.stringify(data));
          },
          function (data) {
              kony.sdk.logger.log("Refresh of serviceDoc failed:" + data);
          });
    }
    if (KNYMobileFabric == null) {
      initKNYMobileFabric(initConfig);
    }
    if (initConfig && initConfig.appConfig && (getLicenseUrl(initConfig.appConfig) === "")) {
        if(kony.license && kony.license.setIsLicenseUrlAvailable) {
          kony.license.setIsLicenseUrlAvailable(false);
          kony.sdk.isLicenseUrlAvailable = false;
        }
    }
    if (kony.sdk.isLicenseUrlAvailable && kony.license && kony.license.createSession) {
        kony.license.createSession();
    }
    if(!initConfig.isMFApp){

      initWithServiceDocHelper(initConfig,successcallback,failurecallback,getServiceDocNonMFApp(initConfig));
    }
    else
    {
      if(!initConfig.appConfig.svcDocRefresh){
           if(initConfig.appConfig.svcDoc){
               initWithServiceDocHelper(initConfig,successcallback,failurecallback,initConfig.appConfig.svcDoc);
           }
           else{
               isInvalidConfig = true;
           }
      }
      if(isInvalidConfig || initConfig.appConfig.svcDocRefresh){
           var cachedServiceDoc = kony.store.getItem("serviceDoc");
           if(cachedServiceDoc) {
               try {
                   cachedServiceDoc = JSON.parse(cachedServiceDoc);
               }
               catch (err) {
                   cachedServiceDoc = "";
                   kony.sdk.logger.log("cached service doc corrupted:"+err);
               }
           }
           if(initConfig.appConfig.svcDocRefreshTimeSecs && !isInvalidConfig){
                if(cachedServiceDoc || initConfig.appConfig.svcDoc){
                    var offlineServiceDoc = cachedServiceDoc ? cachedServiceDoc : initConfig.appConfig.svcDoc;
                    initWithServiceDocHelper(initConfig, successcallback, failurecallback, offlineServiceDoc);
                    kony.timer.schedule("serviceDocTimer", refreshServiceDoc, initConfig.appConfig.svcDocRefreshTimeSecs, true);
                }
                else{
                    networkProvider.post(initConfig.serviceUrl, null, {
                        "X-Kony-App-Key": initConfig.appKey,
                        "X-Kony-App-Secret": initConfig.appSecret,
                        "X-HTTP-Method-Override": "GET"
                    }, function(res){
                        res = kony.sdk.formatSuccessResponse(res);
                        initWithServiceDocHelper(initConfig, successcallback, failurecallback, res);
                        kony.store.setItem("serviceDoc", JSON.stringify(res));
                    },function(res){
                        failurecallback(res);
                    });
                }
           }
           else{
              networkProvider.post(initConfig.serviceUrl,null, {
                    "X-Kony-App-Key": initConfig.appKey,
                    "X-Kony-App-Secret": initConfig.appSecret,
                    "X-HTTP-Method-Override": "GET"
              },function(res){
                  res = kony.sdk.formatSuccessResponse(res);
                  initWithServiceDocHelper(initConfig,successcallback,failurecallback,res);
                  kony.store.setItem("serviceDoc",JSON.stringify(res));
              },function(res) {
                  if(cachedServiceDoc || initConfig.appConfig.svcDoc){
                    var offlineServiceDoc = cachedServiceDoc ? cachedServiceDoc : initConfig.appConfig.svcDoc;
                    initWithServiceDocHelper(initConfig, successcallback, failurecallback, offlineServiceDoc);
                  }
                  else{
                  failurecallback(res);
                  }
              });
           }
      }

    }
   
  };

  var initWithServiceDocHelper = function(initConfig,successcallback, failurecallback,serviceDoc) {
    try {
		if(initConfig != null && initConfig != undefined && initConfig["appMetadata"] != undefined && initConfig["appMetadata"] != null){
			kony.sdk.util.setPackagedMetadata(initConfig["appMetadata"]);
		}
      KNYMobileFabric.initWithServiceDoc(initConfig.appKey,initConfig.appSecret,serviceDoc);
      var MetricsService = null;
      if (kony.sdk.isLicenseUrlAvailable) {
        MetricsService = KNYMobileFabric.getMetricsService();
        if (kony.license && kony.license.registerChangeListener) {
          kony.license.registerChangeListener(KNYMobileFabric.sessionChangeHandler);
        }
      }
      if(initConfig.isMFApp){    
         konyRef.isAnonymousProvider = true ;
      }
      if (successcallback){
         successcallback(MetricsService, initConfig);
      }
    } 
    catch (error) {
      if (failurecallback)
        failurecallback(error);
    }
  }

  /*
   * isMFApp -- boolean to indicate app is being built for MFapp as backend or plain Konyserver
   * appConfig -- set to appConfig of startup.js
   *
   * --MF Parameters--
   * serviceUrl -- mf appconfig url  
   * appKey -- set to App Key for MF app scenario
   * appSecret -- set to App Secret for MF app scenario
   *
   * -- For APM --
   * eventTypes -- This should be set to comma separated values chosen in the IDE for events chosen for automatic tracking
   *
   * Examples
   * var sdkInitConfigForMF = { 
   *    "isMFApp": true,
        "appConfig" : appconfig,

        "appKey" :"<appkey fetched from MF>",
        "appSecret":"<appsecret fetched from MF>",
        "serviceUrl" : "<appconfig url of the form https://100000013.auth.sit2-konycloud.com/appconfig>",
        "eventTypes" :   ["FormEntry","FormExit","Touch","ServiceRequest","ServiceResponse","Gesture","Orientation","Error","Crash"]
        }
   * var sdkInitConfigForNonMF = {
        "isMFApp": false,
        "appConfig" : appconfig

        "eventTypes" :   ["FormEntry","FormExit","Touch","ServiceRequest","ServiceResponse","Gesture","Orientation","Error","Crash"]
        }               
   */

  sdkInit(initConfig,
    function(metricsObject, initConfig) {
      kony.print("sdk initialization done");
      konyAPMSuccessCallBack(metricsObject, initConfig);
      if (successCallBack)
        successCallBack(KNYMobileFabric);
    },
    function(errorObj) {
      kony.print("Error in setup" + errorObj ? errorObj.toString() : "");
      if (errorCallBack)
        errorCallBack(errorObj);
    });

};
kony.sdk.util = kony.sdk.util || {};
	function konyLogger() {
		this.log = function(text) {
			if (kony.sdk.isDebugEnabled) {
				kony.print(text);
			}
		}
	}
	/**
	 * Flag used to override the network availability api for automation testing.
	 * @type {boolean}
	 */
	overrideNetworkFlag = false;
	/**
	*	Utility Method for the application to check the network availability.
	*/
	kony.sdk.isNetworkAvailable = function(){
		//Check the network flag if set for testing. This would mandate the application to be offline if device has network connectivity.
		if(overrideNetworkFlag !== undefined && overrideNetworkFlag !== null && overrideNetworkFlag && overrideNetworkFlag === true)
			return false;
		
		return kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY);
	}
	/**
	*	Utility method to set the network flag for offline testing.
	*/
	kony.sdk.overrideNetworkFlag = function(){
		overrideNetworkFlag = true;
	}
	/**
	*	Utility method to reset the network flag set for offline testing.
	*/
	kony.sdk.resetNetworkFlag = function(){
		overrideNetworkFlag = false;
		overrideNetworkFlag = undefined;
	}
	/*
	function konyNetworkProvider() {
		//var logger = new konyLogger();
		this.post = function (url, params, headers, successCallback, failureCallback, includeReportingParams) {

			function networkCallbackStatus(status, result) {
				if (status === 400) {
					logger.log("Response:" + JSON.stringify(result));
					if (result.opstatus !== null && result.opstatus !== undefined && result.opstatus !== 0) {
						failureCallback(result);
					} else {
						successCallback(result);
					}
				}
			}
			if (headers === undefined || headers === null) {
				headers = {}
			} 
			if (headers["Content-Type"] === null || headers["Content-Type"] === undefined) {
				//headers["Content-Type"] = "application/json"; //setting to default header
				//headers["Content-Type"] = "application/x-www-form-urlencoded"; //setting to default header
			}
			// headers = JSON.stringify(headers);

			if (params === undefined || params === null) {
				params = {};
			}
			
			if(typeof(headers) !== 'undefined' && headers !== null){
				params.httpheaders = headers;
			}
			
			var sprop = "konyreportingparams";

		  if (includeReportingParams) {

			if (params[sprop]) {
				//This means is this is a reporting service. The license.js will cleanup this variable.
				// To ensure that our values are nto overridden we take a back up of the same.
				params.konysdktemparams = params[sprop];
				if (Object.defineProperty) {
					Object.defineProperty(params, sprop, {
						get : function () {
							return this.konysdktemparams;
						},
						set : function (value) {}
					});
				} else {
					params.__defineGetter__(sprop, function () {
						return this.konysdktemparams;
					});
					params.__defineSetter__(sprop, function (value) {});
				}
			}
		  } else {
			if (Object.defineProperty) {
				Object.defineProperty(params, sprop, {
					get : function () {},
					set : function () {}
				});
			} else {
				params.__defineGetter__(sprop, function () {});
				params.__defineSetter__(sprop, function () {});
			}
		  }
			
	//#ifdef desktopweb
			//To be removed:hack for desktopweb case
		   if(url.indexOf("?") == -1)
				  url = url + "?/CMS";
			else
				  url = url + "&/CMS";
	//#endif
			logger.log("Hitting " + url + " with params " + JSON.stringify(params));
			kony.net.invokeServiceAsync(url, params, networkCallbackStatus, null);
		};
	};
	*/
function konyNetworkProvider() {
	this.post = function(url, params, headers, successCallback, failureCallback, konyContentType) {
		if (typeof(XMLHttpRequest) !== 'undefined') {
			konyXMLHttpRequestWrapper(url, params, headers, "POST", konyContentType, successCallback, failureCallback);
		} else {
			konyNetHttpRequest(url, params, headers, "POST", konyContentType, successCallback, failureCallback);
		}
	};
    //postSync will only work for Richclients like Android,IOS
	this.postSync = function(url,param,headers){
	  return konyNetHttpRequestSync(url,param,headers);
	};
	this.get = function(url, params, headers, successCallback, failureCallback, konyContentType) {
		if (typeof(XMLHttpRequest) !== 'undefined') {
			konyXMLHttpRequestWrapper(url, params, headers, "GET", konyContentType, successCallback, failureCallback);
		} else {
			konyNetHttpRequest(url, params, headers, "GET", konyContentType, successCallback, failureCallback);
		}
	}
};

function konyXMLHttpRequestWrapper(url, params, headers, httpMethod, konyContentType, successCallback, failureCallback) {
	var logger = new konyLogger();
	if (typeof(window) === 'undefined') {
		logger.log("window is not defined.");
		return;
	}
	var userAgent = window.navigator.userAgent;
	var IE = userAgent.indexOf("MSIE ");
	if (IE != -1 && typeof(xdomain) === "undefined") {

		function callback(xdomain) {
			logger.log("xdomain is " + xdomain);
			xdomain.debug = true;
			var slaves = kony.sdk.getXdomainSlaves();
			xdomain.slaves(slaves);
			konyXMLHttpRequest(url, params, headers, httpMethod, konyContentType, successCallback, failureCallback);
		}
		xdomain_init(callback);

	} else {
		konyXMLHttpRequest(url, params, headers, httpMethod, konyContentType, successCallback, failureCallback);
	}
};

function konyNetHttpRequest(url, params, headers, httpMethod, konyContentType, successCallback, failureCallback) {
	var logger = new konyLogger();
	var paramsTable = null;
	var httpRequest = new kony.net.HttpRequest();
	var isInvalidJSON = false;
	//if httpmethod is not provided falling back to POST
	if (!httpMethod) {
		httpMethod = constants.HTTP_METHOD_POST;
	}
	
	
	httpRequest.open(httpMethod, url);

	function localRequestCallback(result) {
		var readyState = Number(httpRequest.readyState.toString());
		var status = Number(httpRequest.status.toString());
		if (readyState === 4) {
			var response = null;
			if (result && result.response) {
				response = result.response;
			} else if (httpRequest.response) {
				response = httpRequest.response;
			}
			if (response && typeof(response) === 'string') {
				if(kony.sdk.isJson(response)){
					response = JSON.parse(response);
				}
				else{
					isInvalidJSON = true;
				}
			}
			if(response && !(isInvalidJSON)){
				response.httpresponse = {};
				response.httpresponse.headers = httpRequest.getAllResponseHeaders();
				response.httpresponse.url = url;
				response.httpresponse.responsecode = status;
			}
            if(isInvalidJSON || (!response &&  status == 200 )){
               var errorMessage={};
                    errorMessage.httpresponse = {};
                    errorMessage["opstatus"]=kony.sdk.errorcodes.invalid_json_code;
                    errorMessage["errmsg"]= kony.sdk.errormessages.invalid_json_message;
                    errorMessage["errcode"]=kony.sdk.errorcodes.invalid_json_code;
                    errorMessage["httpStatusCode"] = status;
                    errorMessage.httpresponse["response"]= response;
                    errorMessage.httpresponse.headers = httpRequest.getAllResponseHeaders();
				    errorMessage.httpresponse.url = url;
				    errorMessage.httpresponse.responsecode = status;
                  
               failureCallback(errorMessage);
            }
   			else if (status === 200) { 
				if (!response.opstatus) {
					response.opstatus = 0;
				}
				if (response.opstatus === 0) {
					successCallback(response);
				} else {
					failureCallback(response);
				}

			} else {
				var resultTable = {};
				if (response) {
					resultTable = response;
					resultTable.httpStatusCode = httpRequest.status.toString();
				} else {
					resultTable["opstatus"] = kony.sdk.errorcodes.connectivity_error_code;
					resultTable["errcode"] = kony.sdk.errorcodes.connectivity_error_code;
					resultTable["errmsg"] = kony.sdk.errormessages.connectivity_error_message;

                }
				failureCallback(resultTable);				
			}

		}
	}
	if (konyContentType == undefined || konyContentType == null || konyContentType != 'formdata') {
		//preparing params for other than object services
		var firstKey = true;
		for (var key in params) {
			if (firstKey) {
				paramsTable = new kony.net.FormData();
				firstKey = false;
			}
		    if (typeof(params[key])!= "undefined") {
			    if(typeof(params[key]) !== "string"){
			    	params[key] = JSON.stringify(params[key]);
			    }
			    paramsTable.append((key), (params[key]));
		    }
		}
	} else if (konyContentType == "formdata"){
		//for specific requests like object services we will send formdata through form encoding machanism.
		if (params) {
			//for object services we are getting kony.net.FormData so using the same.
			paramsTable = params;
		}
	}
	if (headers) {
		for (var key in headers) {
			httpRequest.setRequestHeader(key, headers[key]);
		}
	} else {
		httpRequest.setRequestHeader("Content-Type", "application/json");
	}
	httpRequest.onReadyStateChange = localRequestCallback;
	if (paramsTable) {
		httpRequest.send(paramsTable);
	} else {
		httpRequest.send();
	}
}

function konyNetHttpRequestSync(url, params, headers) {
	var logger = new konyLogger();
	var paramsTable = null;
	var httpRequest = new kony.net.HttpRequest();
	var isInvalidJSON = false;
	httpRequest.open(constants.HTTP_METHOD_POST, url,false);
    var firstKey = true;
	for (var key in params) {
		if (firstKey) {
			paramsTable = new kony.net.FormData();
			firstKey = false;
		}
		if (typeof(params[key])!= "undefined") {
			if(typeof(params[key]) !== "string"){
			    params[key] = JSON.stringify(params[key]);
			}
			paramsTable.append((key), (params[key]));
		}
	}

	if (headers) {
		for (var key in headers) {
			httpRequest.setRequestHeader(key, headers[key]);
		}
	} else {
		httpRequest.setRequestHeader("Content-Type", "application/json");
	}
	//httpRequest.onReadyStateChange = localRequestCallback;
	httpRequest.send(paramsTable);
	var response = null;
	var status = Number(httpRequest.status.toString());
	if (httpRequest.response) {
		response = httpRequest.response;
	}
	if (response && typeof(response) === 'string') {
		if(kony.sdk.isJson(response)){
			response = JSON.parse(response);
		}
		else{
			isInvalidJSON = true;
		}
	}
	if(response && !(isInvalidJSON)){
		response.httpresponse = {};
		response.httpresponse.headers = httpRequest.getAllResponseHeaders();
		response.httpresponse.url = url;
		response.httpresponse.responsecode = status;
	}
    if(isInvalidJSON || (!response &&  status == 200 )){
       var errorMessage={};
            errorMessage.httpresponse = {};
            errorMessage["opstatus"]=kony.sdk.errorcodes.invalid_json_code;
            errorMessage["errmsg"]= kony.sdk.errormessages.invalid_json_message;
            errorMessage["errcode"]=kony.sdk.errorcodes.invalid_json_code;
            errorMessage["httpStatusCode"] = status;
            errorMessage.httpresponse["response"]= response;
            errorMessage.httpresponse.headers = httpRequest.getAllResponseHeaders();
		    errorMessage.httpresponse.url = url;
		    errorMessage.httpresponse.responsecode = status;
          
       return errorMessage;
    }
		else if (status === 200) { 
		if (!response.opstatus) {
			response.opstatus = 0;
		}
		return response;
	} else {
		var resultTable = {};
		if (response) {
			resultTable = response;
			resultTable.httpStatusCode = httpRequest.status.toString();
		} else {
			resultTable["opstatus"] = kony.sdk.errorcodes.connectivity_error_code;
			resultTable["errcode"] = kony.sdk.errorcodes.connectivity_error_code;
			resultTable["errmsg"] = kony.sdk.errormessages.connectivity_error_message;

        }
		return resultTable;			
	}
}


function konyXMLHttpRequest(url, params, headers, httpMethod, konyContentType, successCallback, errorCallback) {
	var logger = new konyLogger();

	var paramsTable = "";
	var firstVal = true;
	var resultTable = {};
	var httpRequest = new XMLHttpRequest();
	if (typeof(errorCallback) === 'undefined') {
		errorCallback = successCallback;
	}
	if (!params) {
		params = "";
	}

	
	//if httpmethod is not provided falling back to POST
	if (!httpMethod) {
		httpMethod = constants.HTTP_METHOD_POST;
	}

	httpRequest.onerror = function(res) {
		resultTable["opstatus"] = kony.sdk.errorcodes.connectivity_error_code;
		resultTable["errcode"] = kony.sdk.errorcodes.connectivity_error_code;
	    resultTable["errmsg"] = kony.sdk.errormessages.connectivity_error_message;
	    errorCallback(resultTable);
	};

	httpRequest.onload = function (res) {
		var isInvalidJSON=false;
		if(res && res.target){
			if(res.target.response !== ""){
					if(kony.sdk.isJson(res.target.response)){
						resultTable = JSON.parse(res.target.response);
	                }
					else{
						isInvalidJSON=true;
					}
				}
			if(isInvalidJSON || (res.target.status==200 && !res.target.response))
			{
				resultTable={};
	            resultTable.httpresponse = {};
	            resultTable["opstatus"]= kony.sdk.errorcodes.invalid_json_code;
	            resultTable["errmsg"]= kony.sdk.errormessages.invalid_json_message;
	            resultTable["errcode"]= kony.sdk.errorcodes.invalid_json_code;
	            resultTable["httpStatusCode"] = res.target.status;
	            resultTable.httpresponse["response"]= res.target.response;
	            resultTable.httpresponse.headers = res.target.getAllResponseHeaders(); 
			    resultTable.httpresponse.responsecode =res.target.status;
			    resultTable.httpresponse.url= url;
	            errorCallback(resultTable);
			}
			else if(res.target.status === 200){
	            resultTable.httpresponse = {};
				resultTable.httpresponse.headers = res.target.getAllResponseHeaders(); 
			    resultTable.httpresponse.responsecode =res.target.status;
			    resultTable.httpresponse.url= url;
				if(!resultTable.opstatus){
					resultTable.opstatus = 0;
				}
				if (resultTable["opstatus"] === 0) {
					successCallback(resultTable);
				} else {
					errorCallback(resultTable);
				}
				
			}
			else {
				if(res.target.response){
				     resultTable["httpStatusCode"] = res.target.status;
				     resultTable.httpresponse = {};
				     resultTable.httpresponse.headers = res.target.getAllResponseHeaders(); 
			         resultTable.httpresponse.responsecode =res.target.status;
			         resultTable.httpresponse.url= url;
				     errorCallback(resultTable);
			    }
			    else
			    {
			    	resultTable["opstatus"] = kony.sdk.errorcodes.connectivity_error_code;
					resultTable["errcode"] = kony.sdk.errorcodes.connectivity_error_code;
					resultTable["errmsg"] = kony.sdk.errormessages.connectivity_error_message;
			        errorCallback(resultTable);
			    }
			}
	    }
	    else{
	    	resultTable["opstatus"] = kony.sdk.errorcodes.unknown_error_code;
			resultTable["errcode"] = kony.sdk.errorcodes.unknown_error_code;
			resultTable["errmsg"] = kony.sdk.errormessages.unknown_error_message;
			errorCallback(resultTable);
	    }
	};

	httpRequest.ontimeout = function(res) {
		resultTable["opstatus"] = kony.sdk.errorcodes.connectivity_error_code;
		resultTable["errcode"] = kony.sdk.errorcodes.connectivity_error_code;
		resultTable["errmsg"] = kony.sdk.errormessages.connectivity_error_message;
	    errorCallback(resultTable);
	}
	httpRequest.open(httpMethod, url, true);
	if (typeof(headers) !== 'undefined' && headers !== null) {
		if (typeof(headers["Content-Type"]) === 'undefined') {
			headers["Content-Type"] = "application/json";
		}
		for (var header in headers) {
			httpRequest.setRequestHeader(header, headers[header]);
		}
	}

	if (params && params.httpconfig && params.httpconfig.timeout) {

		httpRequest.timeout = params.httpconfig.timeout * 1000;

	}
	if (konyContentType == undefined || konyContentType == null || konyContentType != 'formdata') {
		//preparing params for other than object services
		if (headers["Content-Type"] === "application/x-www-form-urlencoded" || headers["Content-Type"] === "application/json") {
			var paramsTable = "";
			var firstVal = true;
			for (var key in params) {
				if (!firstVal) {
					paramsTable += "&";
				}
				firstVal = false;
				if (params[key]) {
					if(typeof(params[key]) === "object")
					{
	                    paramsTable = paramsTable + key + "=" + encodeURIComponent(JSON.stringify(params[key]));
					}
					else
					{
						paramsTable = paramsTable + key + "=" + encodeURIComponent(params[key]);
					}
				}
			}
			params = paramsTable;
		} else if (typeof(params) !== "string") {
			params = JSON.stringify(params);
		}
	} else if (konyContentType == "formdata"){
		//for specific requests like object services we will get formdata object
		//for object services we are getting kony.net.FormData as params so using the same.
	}
	try {
		if (params) {
			httpRequest.send(params);
		} else {
			httpRequest.send();
		}

	} catch (e) {
		var logger = new konyLogger();
		logger.log("catch -> error occurred " + JSON.stringify(e));
	}

}

function konyDataStore() {
	var logger = new konyLogger();
	this.setItem = function(key, value) {
		logger.log("Setting item:" + value + " with key:" + key);
		if (typeof(key) !== "string") {
			throw new Exception(Errors.DATA_STORE_EXCEPTION, "Invalid Key");
		} else {
			try {
				key = key.replace(/\//gi, "");
				kony.store.setItem(key, value);
			} catch (e) {
				logger.log("Failed to set item in dtastore:" + e);
			}
		}
	};

	this.getItem = function(key) {
		logger.log("Getting item for key:" + key);
		if (typeof(key) !== "string") {
			throw new Exception(Errors.DATA_STORE_EXCEPTION);
		} else {
			key = key.replace(/\//gi, "");
			var value = kony.store.getItem(key);
			if (value === null || value === undefined) {
				logger.log("No value found with key:" + key);
				return null;
			} else {
				return value;
			}
		}
	};

	this.removeItem = function(key) {
		logger.log("Removing item for key:" + key);
		if (typeof(key) !== "string") {
			throw new Exception(Error.DATA_STORE_EXCEPTION);
		} else {
			key = key.replace(/\//gi, "");
			kony.store.removeItem(key); //If no item with that key exists, the method does not perform any action. Thus no need to check for key availablity.
		}
	};

	this.destroy = function() {
		logger.log("Destroying data store for this app");
		kony.store.clear();
	};

	this.getAllItems = function() {
		logger.log("Getting all item from data store");
		var items = {};
		var len = kony.store.length(); //get key length
		for (var i = 0; i < len; i++) {
			var key = kony.store.key(i); //get ith key
			var value = kony.store.getItem(key); //get value
			items[key] = value; //prepare itemset
		}
		return items;
	}
};

//#ifdef iphone
//#define KONYSYNC_IOS
//#endif
//#ifdef bb
//#define KONYSYNC_BB
//#endif
//#ifdef bb10
//#define KONYSYNC_BB10
//#endif
//#ifdef spabb
//#define KONYSYNC_BB
//#endif
//#ifdef spabbnth
//#define KONYSYNC_BB
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
//#ifdef spaip
//#define KONYSYNC_IOS
//#endif
//#ifdef spaipad
//#define KONYSYNC_IOS
//#endif
//#ifdef spaan
//#define KONYSYNC_ANDROID
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
//#ifdef spawinphone8
//#define KONYSYNC_WINDOWS
//#endif
//#ifdef spawindows
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
//#ifdef spaip
//#define KONYSYNC_MOBILE
//#endif
//#ifdef spaan
//#define KONYSYNC_MOBILE
//#endif
//#ifdef spabb
//#define KONYSYNC_MOBILE
//#endif
//#ifdef spawindows
//#define KONYSYNC_MOBILE
//#endif
//#ifdef spabbnth
//#define KONYSYNC_MOBILE
//#endif
//#ifdef spawinphone8
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

kony.sdk.getSdkType = function() {
	return "js";
}

kony.sdk.getPayload = function(konyRef) {
	var payload = {};
	payload.os = kony.os.deviceInfo().version + "";
    payload.dm = kony.os.deviceInfo().model;
    payload.did = kony.sdk.getDeviceId(kony.os.deviceInfo().name);
    payload.ua = kony.os.userAgent();
	var clientParams = konyRef.getClientParams();
	payload.aid =  clientParams.aid ? clientParams.aid : konyRef.mainRef.baseId;
	payload.aname = clientParams.aname ? clientParams.aname : konyRef.mainRef.name;
	payload.chnl = kony.sdk.getChannelType();
	payload.plat = kony.sdk.getPlatformName();
	if(payload.plat === "ios"  && kony.os.deviceInfo().name !== "thinclient") {
		payload.did = getDeviceIdForIOSPlatform();
	}
	if(payload.plat === "ios" && payload.dm.toLowerCase().indexOf("ipod") != -1){
		payload.chnl = "ipod";
	}
	payload.aver = appConfig.appVersion;
	payload.atype = kony.sdk.getAType();
	payload.stype = "b2c";
	payload.kuid = konyRef.getUserId();
    payload.mfaid = konyRef.mainRef.appId;
    payload.mfbaseid = konyRef.mainRef.baseId;
    payload.mfaname = konyRef.mainRef.name;
    payload.sdkversion = kony.sdk.version;
    payload.sdktype = kony.sdk.getSdkType();
	if (kony.application.getCurrentForm()) {
		var fid = kony.application.getCurrentForm().id;
		if (fid) {
			payload.fid = fid;
		}
	}
	return payload;
}

kony.sdk.getDeviceId = function(name) {
    if (name === "thinclient") {
        var deviceID = kony.ds.read("deviceID");
        if (!deviceID) {
            deviceID = kony.license.generateUUID().toString();
            kony.ds.save(deviceID, "deviceID");
        }
        return deviceID;
    } else {
        return kony.os.deviceInfo().deviceid;
    }

}
kony.sdk.getChannelType = function() {
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

kony.sdk.getPlatformName = function() {
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

kony.mbaas.invokeMbaasServiceFromKonyStudio = function(url, inputParam, serviceID, operationID, callBack) {
	var currentInstance = kony.sdk.getCurrentInstance();
	if (!currentInstance) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	var integrationService = currentInstance.getIntegrationService(serviceID);

	var headers = null;
	if (inputParam && inputParam["httpheaders"]) {
		headers = inputParam["httpheaders"];
		delete inputParam["httpheaders"];
	}

	integrationService.invokeOperation(operationID, headers, inputParam, function(res) {
		if (typeof(callBack) === 'function') {
			callBack(400, res);
		}

	}, function(res) {
		if (typeof(callBack) === 'function') {
			callBack(400, res);
		}
	});
}
kony.mbaas.invokeMbaasServiceFromKonyStudioSync = function(url,inputParam, serviceID, operationID) {
	var currentInstance = kony.sdk.getCurrentInstance();
	if (!currentInstance) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	var integrationService = currentInstance.getIntegrationService(serviceID);

	var headers = null;
	if (inputParam && inputParam["httpheaders"]) {
		headers = inputParam["httpheaders"];
		delete inputParam["httpheaders"];
	}

	return integrationService.invokeOperationSync(operationID, headers, inputParam);
}
kony.mbaas.invokeMbaasServiceFromKonyStudioAsync = function(url,inputParam, serviceID, operationID,callBack) {
	kony.mbaas.invokeMbaasServiceFromKonyStudio(url,inputParam, serviceID, operationID,callBack);
}
kony.sdk.XdomainSlaves = {};

kony.sdk.XdomainLibPath = null;

kony.sdk.getXdomainSlaves = function() {
	function isEmptyObject(obj) {
		for (var name in obj) {
			return false;
		}
		return true;
	}
	if (isEmptyObject(kony.sdk.XdomainSlaves)) {
		throw new Exception(Errors.MISC_FAILURE, "No XdomainSlaves defined. Please use the kony.sdk.setXdomainSlaves({'http://authtenant.konycloud.com':'xdomain'}) to set the Xdomain slaves");
	}
	return kony.sdk.XdomainSlaves;
};

kony.sdk.setXdomainSlaves = function(slaveEndPointMap) {
	if (!slaveEndPointMap) {
		throw new Exception(Errors.MISC_FAILURE, "Invalid slave end points");
	}
	for (var key in slaveEndPointMap) {
		kony.sdk.XdomainSlaves[key] = slaveEndPointMap[key];
	}
}

kony.sdk.getXdomainLibPath = function() {
	return kony.sdk.XdomainLibPath;
}

kony.sdk.setXdomainLibPath = function(path) {
	if (!path) {
		throw new Exception(Errors.MISC_FAILURE, "Invalid path");
	}
	kony.sdk.XdomainLibPath = path;
}

function xdomain_init(callback) {
	var logger = new konyLogger();

	jQuery.getScript(kony.sdk.getXdomainLibPath()).done(function() {
		if (typeof(xdomain) !== 'undefined') {
			logger.log("xdomain Script loading done");
			callback(xdomain);
		} else {
			throw new Exception(Errors.MISC_FAILURE, "not able to fetch xdomain library from " + kony.sdk.getXdomainLibPath());
		}

	}).fail(function() {
		//TODO: handle failure case
		throw new Exception(Errors.MISC_FAILURE, "xdomain library load failed from " + kony.sdk.getXdomainLibPath());
	});
}

function getDeviceIdForIOSPlatform() {
	if(kony.os.deviceInfo().osversion >= 6.0) {
		return kony.os.deviceInfo().identifierForVendor;
	}
	return kony.os.deviceInfo().customdeviceid;
}

//Helps to prepare the input wrapped into kony.net.FormData
kony.sdk.getFormData = function(payload) {
	var formData = new kony.net.FormData();
	formData.append("jsondata", JSON.stringify(payload));

	return formData;
}

//Helps to update prepare the input wrapped into kony.net.FormData
kony.sdk.updateFormData = function(formData, key, value) {
	formData.append(key, JSON.stringify(value));
	return formData;
}

//Helps to get the atype for Spa and DesktopWeb applications it would be "spa" for remaining it would be "native"
kony.sdk.getAType = function() {
	var returnVal = "native";
	//#ifdef spaip
	returnVal = "spa";
	//#endif
	//#ifdef spaan
	returnVal = "spa";
	//#endif
	//#ifdef spabb
	returnVal = "spa";
	//#endif
	//#ifdef spawindows
	returnVal = "spa";
	//#endif
	//#ifdef spabbnth
	returnVal = "spa";
	//#endif
	//#ifdef spawinphone8
	returnVal = "spa";
	//#endif
	//#ifdef spaipad
	returnVal = "spa";
	//#endif
	//#ifdef spatabandroid
	returnVal = "spa";
	//#endif
	//#ifdef spaplaybook
	returnVal = "spa";
	//#endif
	//#ifdef spatabwindows
	returnVal = "spa";
	//#endif
	//#ifdef desktopweb
	returnVal = "spa";
	//#endif
	return returnVal;
};
