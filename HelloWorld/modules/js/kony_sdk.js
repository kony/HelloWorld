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
kony.sdk = function () {
	this.mainRef = {};
	this.tokens = {};
	this.currentClaimToken = null;
	this.currentBackEndToken = null;
	var localDataStore = new konyDataStore();
	this.getDataStore = function(){
		return localDataStore;
	}
	this.setDataStore = function(dataStore){
		localDataStore = dataStore; 
	}
	var userId = "";
	this.getUserId = function(){
		return userId;
	}
	this.setUserId = function(userID){
		userId = userID;
	}
}

kony.mbaas = kony.sdk;
kony.sdk.isDebugEnabled = true;
kony.sdk.isInitialized = false;
kony.sdk.currentInstance = null;


kony.sdk.getCurrentInstance = function(){
	return kony.sdk.currentInstance;
};

kony.sdk.claimsRefresh = function(callback, failureCallback){
	var konyRef = kony.sdk.getCurrentInstance();
	var logger = new konyLogger();
	var networkProvider = new konyNetworkProvider(); 
	if (konyRef.claimTokenExpiry && new Date().getTime() > konyRef.claimTokenExpiry) {
		logger.log("claims token has expired. fetching new token..")
		var _serviceUrl = stripTrailingCharacter(konyRef.rec.url, "/");
		var _url = _serviceUrl + "/claims";
		logger.log("service url is " + _url);
		networkProvider.post(_url, {}, {
			"Authorization" : konyRef.currentRefreshToken
		}, function (tokens) {
			logger.log("refresh success..acquiring new tokens");
			konyRef.currentClaimToken = tokens.claims_token.value;
			konyRef.claimTokenExpiry = tokens.claims_token.exp;
			konyRef.currentRefreshToken = tokens.refresh_token;
			callback();
		},
			function (data) {
			logger.log("failed to acquire refresh token");
			kony.sdk.verifyAndCallClosure(failureCallback, data);
		});
	} else {
		callback();
	}
};


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
kony.sdk.prototype.init = function (appKey, appSecret, serviceUrl, successCallback, failureCallback) {
	var logger = new konyLogger();
	if (!(appKey && appSecret && serviceUrl)) {
		logger.log("### init:: Invalid credentials passed");
		kony.sdk.verifyAndCallClosure(failureCallback, "Invalid initialization parameters passed. Please check appKey, appSecret and ServiceUrl parameters");
		return;
	}
	var networkProvider = new konyNetworkProvider();
	this.mainRef.appKey = appKey;
	this.mainRef.appSecret = appSecret;
	serviceUrl = serviceUrl.trim();
	this.mainRef.serviceUrl = serviceUrl;
	kony.sdk.currentInstance = this;
	var konyRef = this;

	var _doInit = function (serviceDoc) {
		var _processServiceDoc = function (servConfig) {
			logger.log("### init::_doInit::_processServiceDoc" + JSON.stringify(servConfig));
			try {
				konyRef.mainRef.appId = servConfig.appId;
				konyRef.mainRef.baseId = servConfig.baseId;
				konyRef.mainRef.name = servConfig.name;
				if (typeof(servConfig.login) !== 'undefined') {
					logger.log("### init::_doInit::_processServiceDoc parsing AuthServices");
					konyRef.login = servConfig.login;
				}

				if (typeof(servConfig.integsvc) !== 'undefined') {
					logger.log("### init::_doInit::_processServiceDoc parsing Integration services");
					konyRef.integsvc = servConfig.integsvc;
					logger.log("### init::_doInit::konyRef integration Services" + JSON.stringify(konyRef.integsvc));
				}

				if (typeof(servConfig.messagingsvc) !== 'undefined') {
					logger.log("### init::_doInit::_processServiceDoc parsing Messaging services");
					konyRef.messagingsvc = servConfig.messagingsvc;
				}
				
				if(typeof(servConfig.sync) !== 'undefined'){
					konyRef.sync = servConfig.sync;
				}
				if(servConfig.reportingsvc && servConfig.reportingsvc.custom && servConfig.reportingsvc.session){
					konyRef.customReportingURL = servConfig.reportingsvc.custom;
					konyRef.sessionReportingURL = servConfig.reportingsvc.session;
				}
				else{
					throw new Exception(Errors.INIT_FAILURE, "invalid url for reporting service"); 
				}
				
				logger.log("### init::_doInit::_processServiceDoc parsing service document done");
				return true;
			} catch (err) {
				logger.log("### init::_doInit::_processServiceDoc failed with an exception: " + err);
				return ("processing the ServiceDoc failed with an exception: " + JSON.stringify(err));
			}
		};

		if (serviceDoc) {
			var processServiceDocResult = _processServiceDoc(serviceDoc);
			if (processServiceDocResult === true) {
				logger.log("### init::_doInit processing Service doc successful. Calling success callback");
				//TODO write similiar methods for Kony SDK and plain js
				kony.sdk.isInitialized = true;
				konyRef.setUserId("");
				kony.sdk.initiateSession(konyRef);
				if(kony.sdk.metric){
					kony.sdk.metric.flushEvents();
				}
				kony.sdk.verifyAndCallClosure(successCallback,konyRef.mainRef);
			} else {
				logger.log("### init::_doInit processing Service doc failed. Calling failure callback");
				kony.sdk.verifyAndCallClosure(failureCallback,JSON.stringify(processServiceDocResult));
			}
		} else {
			logger.log("### init::_doInit calling GET on appConfig to retrieve servicedoc");
			//hack for not sending reporting params by Kony IDE in init call. 
			var params = 
			{
			    get konyreportingparams() {
			        return undefined;
			    },
			    set konyreportingparams (name) {
			 		//donothing
			    }
			};
			networkProvider.post(
				serviceUrl,
				params, {
				"X-Kony-App-Key" : appKey,
				"X-Kony-App-Secret" : appSecret,
				"X-HTTP-Method-Override" : "GET"
			},
				function (data) {
				logger.log("### init::_doInit fetched servicedoc successfuly");
				logger.log("### init:: retrieved data from service doc");
				logger.log(data);
				konyRef.mainRef.config = data;
				konyRef.servicedoc = data;
				konyRef.mainRef.appId = data.appId;
				var processServiceDocResult = _processServiceDoc(data);
				if (processServiceDocResult === true) {
					logger.log("### init::_doInit processing service document successful");
					var svcDataStr = JSON.stringify(data);
					logger.log("### init::_doInit saving done. Calling success callback");
					kony.sdk.isInitialized = true;
					konyRef.setUserId("");
					kony.sdk.initiateSession(konyRef);
					if(kony.sdk.metric){
						kony.sdk.metric.flushEvents();
					}
					kony.sdk.verifyAndCallClosure(successCallback, konyRef.mainRef);
				} else {
					logger.log("### init::_doInit processing servicedoc failed. Calling failure callback");
					kony.sdk.verifyAndCallClosure(failureCallback,JSON.stringify(processServiceDocResult));
				}
			},
				function (data) {
				logger.log("### init::_doInit fetching service document from Server failed" + data);
				logger.log("### init::_doInit calling failure callback");
				kony.sdk.verifyAndCallClosure(failureCallback, JSON.stringify(data));
			});
		}

	};
		logger.log("### init::calling simple _doInit ");
		_doInit();
}
/**
 * Method to create the Identity service instance with the provided provider name.
 * @param {string} providerName - Name of the provider
 * @returns {IdentityService} Identity service instance
 */
kony.sdk.prototype.getIdentityService = function (providerName) {
			if(!kony.sdk.isInitialized){
				throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
			}
			var logger = new konyLogger();
			var provider = null;
			if(this.login != null){
				for (var i = 0; i < this.login.length; i++) {
					var rec = this.login[i];
					if(rec.prov === providerName){
						this.rec = rec;
						provider = new IdentityService(this);
						break;						
					}
						
				}
			if(provider === null){
				throw new Exception(Errors.AUTH_FAILURE, "Invalid providerName");
			}
			//TODO: what if the providerName is not passed by the user? 
			logger.log("### auth:: returning authService for providerName = " + provider.getProviderName());
			return provider;			
			}

		}; 
/**
 * Should not be called by the developer.
 * @class
 * @classdesc Identity service instance for handling login/logout calls.
 */
function IdentityService(konyRef){
			var logger = new konyLogger();
			var networkProvider = new konyNetworkProvider();
			var serviceObj = konyRef.rec;
			var mainRef = konyRef.mainRef;
			if (serviceObj === undefined || serviceObj.prov == undefined || serviceObj.type == undefined) {
				throw new Exception(Errors.INIT_FAILURE, "Invalid service url and service type");
			}

			var _type = serviceObj.type;
			var _serviceUrl = stripTrailingCharacter(serviceObj.url, "/"); ;
			var _providerName = serviceObj.prov;

			logger.log("### AuthService:: initialized for provider " + _providerName + " with type " + _type);

			var dsKey = _serviceUrl + "::" + _providerName + "::" + _type + "::RAW";
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
			this.login = function (options, successCallback, failureCallback) {

				logger.log("### AuthService::login Invoked login for provider " + _providerName + " of type " + _type);

				if (typeof(options) == 'undefined') {
					throw new Exception(Errors.INIT_FAILURE, "Missing required number of arguments to login function");
				}
				function invokeAjaxCall(url, params, headers) {
					params["provider"] = _providerName;
					
					if(headers === undefined){
						headers = {};
					}
					headers["X-Kony-App-Key"] = mainRef.appKey;
					headers["X-Kony-App-Secret"] = mainRef.appSecret;
					headers["Accept"]="application/json";

					networkProvider.post(_serviceUrl + url + "?provider=" + _providerName, params, headers,
						function (data) {
						logger.log("### AuthService::login successful. Retrieved Data:: ");
						logger.log(data);
						konyRef.tokens[_providerName] = data;
						logger.log("### AuthService::login extracted token. Calling success callback");
						konyRef.currentClaimToken = data.claims_token.value;
						konyRef.currentBackEndToken = data.provider_token;
						konyRef.claimTokenExpiry = data.claims_token.exp;
						konyRef.currentRefreshToken = data.refresh_token;
						if(!konyRef.getUserId()){
							konyRef.setUserId(data.profile.userid);
						}
						logger.log("userid is " + konyRef.getUserId());
						kony.sdk.verifyAndCallClosure(successCallback, data.claims_token.value);
					},
						function (data) {
						logger.log("### AuthService::login login failure. retrieved data:: ");
						logger.log(data);
						logger.log("### AuthService::login Calling failure callback");
						failureCallback(data);
					});
				}
				//TODO: error handling for oauth2 and saml
				if (_type == "basic") {

					if (options.userid == undefined || options.password == undefined) {
						throw new Exception(Errors.INIT_FAILURE, "Require username and password");
					}
					
					logger.log("### AuthService::login Adapter type is basic ");
					invokeAjaxCall("/login",{
						"userid" : options.userid,
						"password" : options.password,
						"provider" : _providerName
					});
				} else{
					logger.log("### AuthService::login Adapter type is " + _type);
					OAuthHandler(_serviceUrl, _providerName, invokeAjaxCall,_type);
				
				}
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
			this.logout = function(successCallback, failureCallback){
				function logoutHandler(){
					_logout(successCallback, failureCallback);
				}
				kony.sdk.claimsRefresh(logoutHandler, failureCallback);
			};			
			
			function _logout(successCallback, failureCallback) {
				logger.log("### AuthService::logout invoked on provider " + _providerName + " of type " + _type);
	
				delete konyRef.tokens[_providerName];
				
				networkProvider.post(_serviceUrl + "/logout", {}, {
					"Authorization" : konyRef.currentClaimToken
				},
					function (data) {
					logger.log("AuthService::logout successfully logged out. Calling success callback");
					kony.sdk.verifyAndCallClosure(successCallback, {});
				},
					function (xhr, status, err) {
					if (xhr.status == 200) {
						logger.log("### AuthService::logout successfully logged out. Calling success callback");
						kony.sdk.verifyAndCallClosure(successCallback, {});
						konyRef.currentClaimToken = null;
						konyRef.currentBackEndToken = null;
						konyRef.claimTokenExpiry = null;
						konyRef.currentRefreshToken = null;
					} else {
						logger.log("### AuthService::logout logged out Failed. Calling failure callback");
						kony.sdk.verifyAndCallClosure(failureCallback, {});
					}
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
			this.getBackendToken = function (fromserver, options, successCallback, failureCallback) {
				logger.log("### AuthService::getBackendToken called for provider " + _providerName + " of type " + _type);
				if (fromserver != undefined && fromserver === true) {
					logger.log("### AuthService::getBackendToken fromserver is enabled. Trying to login");
					_claimsRefresh(null,
						function (token) {
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
								function (token) {
								konyRef.tokens[_providerName] = token.claims_token.value;
								logger.log("### AuthService::getBackendToken fetching refresh successfull. Calling success callback");
								konyRef.currentBackEndToken = token.provider_token;
								kony.sdk.verifyAndCallClosure(successCallback, token.provider_token);
							},
								function (error) {
								logger.log("### AuthService::getBackendToken fetching refresh failed. Calling failure callback");
								kony.sdk.verifyAndCallClosure(failureCallback, error);
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
			this.getProfile = function (fromserver, successCallback, failureCallback) {
				if (fromserver && fromserver == true) {
					_claimsRefresh(null,
						function (token) {
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
			this.getProviderName = function () {
				return _providerName;
			};
			/**
			 * Get the provider type.
			 * @returns {string} Provider type.
			 */
			this.getProviderType = function () {
				return _type;
			};
			/**
			 * Method to refresh the claims token.
			 * @private
			 */
			var _claimsRefresh = function (options, success, failure) {
				logger.log("### AuthService::_claimsRefresh fetching claims from server for provider " + _providerName);
				var value = konyRef.tokens[_providerName];
				var refreshToken = null;
				if (value) {
					refreshToken = value.refresh_token;
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
						"Authorization" : refreshToken
					},
						function (data) {
						logger.log("### AuthService::_claimsRefresh Fetching claims succcessfull");
						konyRef.tokens[_providerName] = data;
						logger.log("### AuthService::_claimsRefresh saved locally. Calling success callback");
						kony.sdk.verifyAndCallClosure(success, data);
					},
						function (xhr, status, err) {
						logger.log("### AuthService::_claimsRefresh fetching claims failed. Calling failure callback");
						kony.sdk.verifyAndCallClosure(failure, err);
					});
				} else {
					logger.log("### AuthService::_claimsRefresh no refreshtoken found. calling failure callback");
					kony.sdk.verifyAndCallClosure(failure, null);
				}
			};
		};


stripTrailingCharacter = function (str, character) {
	if (str.substr(str.length - 1) == character) {
		return str.substr(0, str.length - 1);
	}
	return str;
};

var Constants = {
	APP_KEY_HEADER : "X-Kony-App-Key",
	APP_SECRET_HEADER : "X-Kony-App-Secret",
	AUTHORIZATION_HEADER : "Authorization"
};

var Errors = {
	INIT_FAILURE : "INIT_FAILURE",
	DATA_STORE_EXCEPTION : "DATASTORE_FAILURE",
	AUTH_FAILURE: "AUTH_FAILURE",
	INTEGRATION_FAILURE: "INTEGRATION_FAILURE",
	MESSAGING_FAILURE: "MESSAGING_FAILURE",
	SYNC_FAILURE: "SYNC_FAILURE",
	METRICS_FAILURE: "METRICS_FAILURE"
};
kony.sdk.prototype.enableDebug = function () {
	kony.sdk.isDebugEnabled = true;
}

kony.sdk.prototype.disableDebug = function () {
	kony.sdk.isDebugEnabled = false;
}

function Exception(name, message) {
	alert(name + ": " + message);
	return {
		code : name,
		message : message
	};
};

kony.sdk.verifyAndCallClosure = function(closure, params){
	if(typeof(closure) === 'function'){
		closure(params);
	}
	else{
		var logger  = new konyLogger();
		logger.log("invalid callback");
	}
}

kony.sdk.formatCurrentDate = function(inputDateString){
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

kony.sdk.formatDateComponent = function(dateComponent){
	if(dateComponent < 10){
        dateComponent = "0" + dateComponent;
    }
    return dateComponent;
}

kony.sdk.isNullOrUndefined = function(val){
	if(val === null || val === undefined){
		return true;
	}else{
		return false;
	}
};

if(typeof(kony.sdk.metric)=== "undefined"){
	kony.sdk.metric = {};
}

kony.sdk.metric.eventFlowTag = "";
kony.sdk.metric.eventConfig = {"confType" : "BUFFER","eventBufferAutoFlushCount": kony.sdk.metric.eventBufferAutoFlushValue,"eventBufferMaxCount" : kony.sdk.metric.eventBufferMaxValue};
kony.sdk.metric.eventBufferMaxValue = 1000;
kony.sdk.metric.eventBufferAutoFlushValue = 15;
kony.sdk.metric.characterLengthLimit = 256;
kony.sdk.metric.reportEventBufferArray = [];
kony.sdk.metric.reportEventBufferBackupArray = [];
kony.sdk.metric.retrievedDS = false;
kony.sdk.metric.eventBufferCount = 0;
kony.sdk.metric.eventTypeMap = {"formentry" : "FormEntry","touch" : "Touch","servicecall" : "ServiceCall","gesture" : "Gesture","orientation" : "Orientation","custom" : "Custom"};
kony.sdk.metric.errorCodeMap = {"1000" : true,"1011" : true,"1012" : true,"1014" : true,"1015" : true,"1016":true};

kony.sdk.metric.setEventFlowTag = function(flowTag){
	if(kony.sdk.isNullOrUndefined(flowTag)){
		throw new Exception(Errors.METRICS_FAILURE, "Invalid value for event flow tag");
	}else if(flowTag.length <= kony.sdk.metric.characterLengthLimit){
		kony.sdk.metric.eventFlowTag = flowTag;
	}else{
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
	}
};

kony.sdk.metric.clearEventFlowTag = function(){
	kony.sdk.metric.eventFlowTag = "";
};

kony.sdk.metric.getEventFlowTag = function(){
	return kony.sdk.metric.eventFlowTag;
};

kony.sdk.metric.setEventConfig = function(confType,eventBufferAutoFlushCount,eventBufferMaxCount){
	if(kony.sdk.isNullOrUndefined(confType)){
		throw new Exception(Errors.METRICS_FAILURE, "Config Type can not be null");
	}else{
		confType = confType.toUpperCase();
	}
	if(confType === "BUFFER" || confType === "INSTANT"){
		kony.sdk.metric.eventConfig["confType"] = confType;
	}else{
		throw new Exception(Errors.METRICS_FAILURE, "Invalid value for config type");
	}
	if(!kony.sdk.isNullOrUndefined(eventBufferMaxCount)  && typeof(eventBufferMaxCount) === "number" && eventBufferMaxCount > 0){
		kony.sdk.metric.eventConfig["eventBufferMaxCount"] = eventBufferMaxCount;
	}else{
		throw new Exception(Errors.METRICS_FAILURE, "eventBufferMaxCount has to be a Number and greater than 0");
	}
	if(!kony.sdk.isNullOrUndefined(eventBufferAutoFlushCount) && typeof(eventBufferAutoFlushCount) === "number" && eventBufferAutoFlushCount > 0 && eventBufferAutoFlushCount <= eventBufferMaxCount){
		kony.sdk.metric.eventConfig["eventBufferAutoFlushCount"] = eventBufferAutoFlushCount;
	}else if(eventBufferAutoFlushCount >= eventBufferMaxCount){
		kony.sdk.metric.eventConfig["eventBufferMaxCount"] = 1000;
		throw new Exception(Errors.METRICS_FAILURE, "eventBufferAutoFlushCount can not be greater than eventBufferMaxCount");
	}else{
		throw new Exception(Errors.METRICS_FAILURE, "eventBufferAutoFlushCount has to be a Number and greater than 0");
	}
};

kony.sdk.metric.reportEvent = function(evttype,evtSubType,formID,widgetID,flowTag){
	if(kony.sdk.metric.reportEventBufferBackupArray.length === 0){
		kony.sdk.metric.readFromDS();
	}
	kony.sdk.metric.eventBufferCount = kony.sdk.metric.reportEventBufferBackupArray.length + kony.sdk.metric.reportEventBufferArray.length;
	
	if(kony.sdk.metric.eventBufferCount === kony.sdk.metric.eventConfig["eventBufferMaxCount"]){
		throw new Exception(Errors.DATA_STORE_EXCEPTION, "Reached maximum limit to store events");
		return;
	}
	var reportEventMap = {};
	reportEventMap.ts = kony.sdk.formatCurrentDate(new Date());
	evttype = evttype.toLowerCase();
	if(kony.sdk.isNullOrUndefined(kony.sdk.metric.eventTypeMap[evttype])){
		throw new Exception(Errors.METRICS_FAILURE, "Invalid value for event type");
		return;
	}else{
		reportEventMap["evttype"] = kony.sdk.metric.eventTypeMap[evttype];
	}
	if(kony.sdk.isNullOrUndefined(evtSubType)){
		reportEventMap["evtSubType"] = "";
	}else if(evtSubType.length <= kony.sdk.metric.characterLengthLimit){
		reportEventMap["evtSubType"] = evtSubType;
	}else{
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
		return;
	}
	if(kony.sdk.isNullOrUndefined(formID)){
		reportEventMap["formID"] = "";
	}else if(formID.length <= kony.sdk.metric.characterLengthLimit){
		reportEventMap["formID"] = formID;
	}else{
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
		return;
	}
	if(kony.sdk.isNullOrUndefined(widgetID)){
		reportEventMap["widgetID"] = "";
	}else if(widgetID.length <= kony.sdk.metric.characterLengthLimit){
		reportEventMap["widgetID"] = widgetID;
	}else{
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
		return;
	}
	if(kony.sdk.isNullOrUndefined(flowTag)){
		reportEventMap["flowTag"] = kony.sdk.metric.getEventFlowTag();
	}else if(flowTag.length <= kony.sdk.metric.characterLengthLimit){
		reportEventMap["flowTag"] = flowTag;
	}else{
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
		return;
	}
	reportEventMap.SID = kony.ds.read("konyUUID")[0];
	kony.sdk.metric.reportEventBufferArray.push(reportEventMap);
	
	if(kony.sdk.metric.reportEventBufferArray.length % kony.sdk.metric.eventConfig["eventBufferAutoFlushCount"] === 0 || kony.sdk.metric.eventConfig["confType"] === "INSTANT"){
			kony.sdk.metric.flushEvents();
	}
};

kony.sdk.metric.flushEvents = function(){
	var logger = new konyLogger();
	if(kony.sdk.metric.reportEventBufferBackupArray.length === 0){
		kony.sdk.metric.readFromDS();
	}
	if(kony.sdk.metric.reportEventBufferBackupArray.length === 0 && kony.sdk.metric.reportEventBufferArray.length === 0){
			logger.log("There are no events to flush");
			return;
	}
	var payload = kony.sdk.getPayload(kony.sdk.getCurrentInstance());
	var params = {};
	if(kony.sdk.metric.reportEventBufferArray.length !== 0){
		kony.sdk.metric.pushEventsToBufferArray();
	}
	var headers = {"Content-Type" : "application/x-www-form-urlencoded"};
    payload.httpheaders = headers;
	payload.events = kony.sdk.metric.reportEventBufferBackupArray;
	payload.svcid = "SendEvents";
	payload.rsid = kony.sdk.metric.reportEventBufferBackupArray[0].SID;
	params.konyreportingparams = JSON.stringify(payload);
	kony.net.invokeServiceAsync(kony.sdk.currentInstance.customReportingURL,params,flushCallback);
	
	function flushCallback(status, response){
		if(status === 400){
			if(response.opstatus === 0){
				kony.sdk.metric.clearBufferEvents();
			}else if(kony.sdk.metric.errorCodeMap[response.opstatus]){
				kony.sdk.metric.saveInDS();
			}else{
				kony.sdk.metric.clearBufferEvents();
			}
		}else if(status === 300){
				kony.sdk.metric.saveInDS();
			}	
	}
};

/*Stores event data in Data Store on failure of service Call*/
kony.sdk.metric.saveInDS = function(){
	var eventsToSave =[];
	eventsToSave.push(JSON.stringify(kony.sdk.metric.reportEventBufferBackupArray));
	kony.ds.save(eventsToSave,"konyMetricsBuffer");
	kony.sdk.metric.reportEventBufferBackupArray = [];
};

/*Clearing events sent to server */
kony.sdk.metric.clearBufferEvents = function(){
	kony.sdk.metric.reportEventBufferBackupArray = [];
	kony.ds.remove("konyMetricsBuffer");
};

/*Reading any pending events from Data Store */
kony.sdk.metric.readFromDS = function(){
	var eventsFromDS = kony.ds.read("konyMetricsBuffer");
	if(eventsFromDS !== null){
		var pushToArray = [];
		pushToArray.push(JSON.parse(eventsFromDS[0]));
		kony.sdk.metric.reportEventBufferBackupArray.push.apply(kony.sdk.metric.reportEventBufferBackupArray,pushToArray);
	}
};

/*Pushes events received from user to BufferBackupArray which will be flushed to server */
kony.sdk.metric.pushEventsToBufferArray = function(){
	kony.sdk.metric.reportEventBufferBackupArray.push.apply(kony.sdk.metric.reportEventBufferBackupArray,kony.sdk.metric.reportEventBufferArray);
	kony.sdk.metric.reportEventBufferArray = [];
};

kony.sdk.metric.getEventsInBuffer = function(){
	var eventsFromDS = kony.ds.read("konyMetricsBuffer");
	var eventsToReturn = [];
	if(!kony.sdk.isNullOrUndefined(eventsFromDS)){
		eventsToReturn.push(JSON.parse(eventsFromDS[0]));
	}
	if(kony.sdk.metric.reportEventBufferArray.length !== 0){
		eventsToReturn.push.apply(eventsToReturn,kony.sdk.metric.reportEventBufferArray);
	}
	if(eventsToReturn.length !== 0){
		return eventsToReturn;
	}else{
		return null;
	}
};
/**
 * Method to create the integration service instance with the provided service name.
 * @param {string} serviceName - Name of the service
 * @returns {IntegrationService} Integration service instance
 */
kony.sdk.prototype.getIntegrationService = function (serviceName) {
	if(!kony.sdk.isInitialized){
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	if(!this.currentClaimToken){
		throw new Exception(Errors.AUTH_FAILURE, "Please call login in Identity Service before invoking this service");
	}
	var logger = new konyLogger();
	var integrationService = null;
	if(this.integsvc != null){
		if(this.integsvc[serviceName] != null){
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
			var homeUrl = konyRef.integsvc[serviceName];
			var networkProvider = new konyNetworkProvider();
			if (homeUrl == undefined || serviceName == undefined) {
				throw new Exception(Errors.INIT_FAILURE, "Invalid homeUrl and serviceName");
			}
			homeUrl = stripTrailingCharacter(homeUrl, "/");


			this.getUrl = function () {
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
			this.invokeOperation = function (operationName, headers, data, successCallback, failureCallback) {
				function invokeOperationHandler(){
					_invokeOperation(operationName, headers, data, successCallback, failureCallback);
				}
				kony.sdk.claimsRefresh(invokeOperationHandler, failureCallback);
			};
			function _invokeOperation(operationName, headers, data, successCallback, failureCallback) {
				var requestData = {};
				var reportingData = kony.sdk.getPayload(konyRef);
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
				logger.log("The token after processing is" + JSON.stringify(token));

				requestData["konyreportingparams"] = JSON.stringify(reportingData);
				var defaultHeaders = {
					"Content-Type" : "application/x-www-form-urlencoded",
					"X-Kony-Authorization" : konyRef.currentClaimToken
				}

				// if the user has defined his own headers, use them
				if (headers) {
					for (var header in headers) {
						defaultHeaders[header] = headers[header];
					}
				}

				networkProvider.post(homeUrl + "/" + operationName,
					requestData, defaultHeaders,
					function (res) {
					if (kony.sdk.metric) {
						kony.sdk.metric.clearBufferEvents();
					}
					kony.sdk.verifyAndCallClosure(successCallback, res);
				},
					function (xhr, status, err) {
					if (xhr && !(status && err)) {
						err = xhr;
					}
					if (kony.sdk.metric) {
						if (kony.sdk.metric.errorCodeMap[xhr.opstatus]) {
							kony.sdk.metric.saveInDS();
						}
					}
					kony.sdk.verifyAndCallClosure(failureCallback, err);
				}, true);
			};


		};
/**
 * Method to create the messaging service instance.
 * @returns {MessagingService} Messaging service instance
 */
kony.sdk.prototype.getMessagingService = function () {
	if(!kony.sdk.isInitialized){
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

	this.getUrl = function () {
		return homeUrl;
	};

	this.setKSID = function (ksid) {
		konyRef.getDataStore().setItem(dsKey, ksid);
		KSID = ksid;
	};

	this.getKSID = function () {
		if (!KSID) {
			KSID = konyRef.getDataStore().getItem(dsKey);
		}
		return KSID;
	};

	this.setKmsAppId = function (id) {
		appId = id;
	};

	this.getKmsAppId = function () {
		return appId;
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
	 * @param {string} pnsToken - Token value
	 * @param {registerSuccessCallback} successCallback - Callback method on success
	 * @param {registerFailureCallback} failureCallback - Callback method on failure
	 */
	this.register = function (osType, deviceId, pnsToken, email, successCallback, failureCallback) {
		if(typeof(pnsToken) === 'undefined' || pnsToken === null){
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid pnsToken/sId. Please check your messaging provider");
		}
		if(typeof(osType) === 'undefined' || osType === null){
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid osType.");
		}
		if(typeof(deviceId) === 'undefined' || deviceId === null){
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid deviceId.");
		}
		if(typeof(email) === 'undefined' || email === null){
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid email.");
		}
		var uri = homeUrl + "/subscribers";
		jsonParam = {
			"subscriptionService" : {
				"subscribe" : {
					"sid" : pnsToken,
					"appId" : this.getKmsAppId(),
					"ufid" : email,
					"osType" : osType,
					"deviceId" : deviceId
				}
			}
		};
		logger.log(JSON.stringify(jsonParam));
		var headers = {"Content-Type":"application/json"};
		var payload = {postdata: JSON.stringify(jsonParam)};
		networkProvider.post(uri,
			payload,
			headers,
			function (data) {
			KSID = data.id;
			konyRef.getDataStore().setItem(dsKey, KSID);
			logger.log("Device registered to KMS with KSID:" + KSID);
			kony.sdk.verifyAndCallClosure(successCallback, data);
		},
			function (data, status, error) {

			logger.log("ERROR: Failed to register device for KMS");
			var errorObj = {};
			errorObj.data = data;
			errorObj.status = status;
			errorObj.error = error;
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
	this.unregister = function (successCallback, failureCallback) {
		var uri = homeUrl + "/subscribers"
		var sub = { "ksid":this.getKSID()};
		var inp = {"subscriptionService":{"unsubscribe":sub}};
		var headers = {"Content-Type":"application/json"};
		var payload = {postdata:JSON.stringify(inp)}
		logger.log("unsubscribe uri:" + uri);
		konyRef.getDataStore().removeItem(dsKey);
		networkProvider.post(uri,
			payload,
			headers,
			function (data) {
			kony.sdk.verifyAndCallClosure(successCallback, data);
		},
			function (data, status, error) {

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
	this.fetchAllMessages = function (startIndex, pageSize, successCallback, failureCallback) {
		var uri = homeUrl + "/messages/fetch";

		var data = {
			"ksid" : this.getKSID(),
			"startElement" : startIndex,
			"elementsPerPage" : pageSize
		};
		var headers = {"Content-Type":"application/json"};
		var payload = {postdata:JSON.stringify(data)};

		networkProvider.post(uri, payload, headers, successCallback, failureCallback);
	};
	/**
	* Update location service success callback method.
	* @callback updateLocationSuccessCallback
	* @param {json} response - Update location response
	*/

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
	this.updateGeoLocation= function (latitude, longitude, locationName, successCallback, failureCallback) {
		if(typeof(latitude) === 'undefined' || latitude === null){
			throw new Exception(MESSAGING_FAILURE, "invalid latitude paramter value");
		}
		if(typeof(longitude) === 'undefined' || longitude === null){
			throw new Exception(MESSAGING_FAILURE, "invalid longitude paramter value");
		}
		if(typeof(locationName) === 'undefined' || locationName === null){
			throw new Exception(MESSAGING_FAILURE, "invalid locationName paramter value");
		}

		var uri = homeUrl + "/location";
		var data = {
			"ksid" : this.getKSID(),
			"latitude" : latitude,
			"locname" : locationName,
			"longitude" : longitude
		};
		var headers = {"Content-Type":"application/json"};
		
		var payload = {postdata:JSON.stringify(data)};
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
	this.markMessageRead = function (fetchId, successCallback, failureCallback) {
		if(typeof(fetchId) === 'undefined' || fetchId === null){
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
	this.fetchMessageContent = function (fetchId, successCallback, failureCallback) {
		if(typeof(fetchId) === 'undefined' || fetchId === null){
			throw new Exception(MESSAGING_FAILURE, "invalid fetchId paramter value");
		}		
		var uri = homeUrl + "/messages/content/" + fetchId;
		networkProvider.post(uri, null, null, successCallback, failureCallback);
	};
};

/**
 * Method to create the Reporting service instance with the provided service name.
 * @returns {ReportingService} Reporting service instance
 */
kony.sdk.prototype.getReportingService = function () {
	if(!kony.sdk.isInitialized){
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
	 * invoke the report operation 
	 * @param {string} reportingGroupID - reporting Group ID
	 * @param {object} metrics - metrics being reported
	 */
	this.report = function (reportingGroupID, metrics) {
		if (typeof(metrics) !== "object") {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid type for metrics data.");
			return;
		}
		var sessionID = kony.ds.read("konyUUID");
		var reportData = konyRef.getDataStore().getItem("konyCustomReportData");
		if (!reportData) {
			reportData = new Array();
		}
		else{
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
		if(kony.sdk.metric){
			if(kony.sdk.metric.reportEventBufferBackupArray.length === 0){
				kony.sdk.metric.readFromDS();
			}
			kony.sdk.metric.pushEventsToBufferArray();
			payload.events = kony.sdk.metric.reportEventBufferBackupArray;
		}
		payload.reportData = reportData;		
		payload.rsid = sessionID;
		payload.svcid = "CaptureKonyCustomMetrics";
		var newData = {};
		newData["konyreportingparams"] = JSON.stringify(payload);
		
		networkProvider.post(url, newData, null, function (res) {
			//successcallback
			//konyRef.getDataStore().removeItem("konyCustomReportData");
			if(kony.sdk.metric){
				kony.sdk.metric.clearBufferEvents();
			}
			logger.log("metric data successfully sent" + JSON.stringify(res));
		},
			function (res) {

			var storeData = konyRef.getDataStore().getItem("konyCustomReportData");
			if (!storeData) {
				storeData = new Array();
			}
			else{
				storeData = JSON.parse(storeData);				
			}
			if(kony.sdk.metric){
				if(kony.sdk.metric.errorCodeMap[res.opstatus]){
					kony.sdk.metric.saveInDS();
				}
			}
			storeData.push(reportData);
			konyRef.getDataStore().setItem("konyCustomReportData",JSON.stringify(storeData));
			
			logger.log("Unable to send metric report" + JSON.stringify(res));
		}, true);
	}

}


//stub method
kony.sdk.initiateSession = function () {
	return;
}
/**
 * Method to create the sync service instance.
 * @returns {SyncService} sync service instance
 */
kony.sdk.prototype.getSyncService = function () {
	if(!kony.sdk.isInitialized){
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	var konySync = sync;
	var SyncProvider = this.sync;
	if(!SyncProvider){
			throw new Exception(Errors.SYNC_FAILURE, "invalid sync provider in serviceDoc");
	}
	var claimToken = this.currentClaimToken;
	var tempFunction = sync.startSession;
	function tempSession(config){
		if(!config){
			throw new Exception(Errors.SYNC_FAILURE, "invalid startSession config object");
		}
		if(!claimToken){
			throw new Exception(Errors.SYNC_FAILURE, "invalid claims token.Please call Identity Service Login");
		}

		var syncServiceAppid = SyncProvider["appId"];
		var syncServiceUrl = SyncProvider["url"] +"/";
		

		config.serverurl = syncServiceUrl;
		config.appid = syncServiceAppid;
		config.authtoken = claimToken;
		tempFunction(config);
	}
	konySync.startSession = tempSession;
	
	return konySync;
}



 

function OAuthHandler(serviceUrl, providerName, callback, type) {
	var popBasic ={id:"popUp", skin:null, isModal:false, transparencyBehindThePopup:80};
	var popLayout ={containerWeight:100, padding:[5,5,5,5], "paddingInPixel": true};
	var popPSP ={};
	var urlType = "/" + type + "/";
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
	//browserSF.handleRequest = function(){};
	var popUp = new kony.ui.Popup(popBasic, popLayout, popPSP);
	popUp.add(browserSF);
	popUp.show();

	var urlConf = {
		URL : serviceUrl + urlType + "login?provider=" + providerName,
		requestMethod : constants.BROWSER_REQUEST_METHOD_GET
	};
	browserSF.requestURLConfig = urlConf;
	browserSF.handleRequest = handleRequestCallback;
	function handleRequestCallback(browserWidget, params) {

		var originalUrl = params["originalURL"];
		if (typeof(params.queryParams) !== "undefined" && typeof(params.queryParams.code) !== "undefined") {
			// make request for tokens
			popUp.dismiss();
			var headers = {};
			if(type == "oauth2" || type == "saml"){
				headers["Content-Type"]  =  "application/x-www-form-urlencoded"
			}
			callback(urlType + "token",{code:decodeURIComponent(params.queryParams.code)}, headers);
		}
		return false;

	}
}


function konyLogger() {
	this.log = function (text) {
		if (kony.sdk.isDebugEnabled) {
			kony.print(text);
		}
	}
}
function konyNetworkProvider() {
	var logger = new konyLogger();
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
	/*	if (headers === undefined || headers === null) {
			headers = {}
		} 
		if (headers["Content-Type"] === null || headers["Content-Type"] === undefined) {
			//headers["Content-Type"] = "application/json"; //setting to default header
			//headers["Content-Type"] = "application/x-www-form-urlencoded"; //setting to default header
		}*/
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

function konyDataStore() {
	var logger = new konyLogger();
	this.setItem = function (key, value) {
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

	this.getItem = function (key) {
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

	this.removeItem = function (key) {
		logger.log("Removing item for key:" + key);
		if (typeof(key) !== "string") {
			throw new Exception(Error.DATA_STORE_EXCEPTION);
		} else {
			key = key.replace(/\//gi, "");
			kony.store.removeItem(key); //If no item with that key exists, the method does not perform any action. Thus no need to check for key availablity.
		}
	};

	this.destroy = function () {
		logger.log("Destroying data store for this app");
		kony.store.clear();
	};

	this.getAllItems = function () {
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

kony.sdk.getPayload = function(konyRef){
	var payload = {};
	payload.os = kony.os.deviceInfo().version + "";
    payload.dm = kony.os.deviceInfo().model;
    payload.did = kony.os.deviceInfo().deviceid;
    payload.ua = kony.os.userAgent();
	payload.aid = konyRef.mainRef.baseId;
	payload.aname = konyRef.mainRef.name;
	payload.chnl = kony.sdk.getChannelType();
	payload.plat = kony.sdk.getPlatformName();
	payload.aver = appConfig.appVersion;
	payload.atype = "native";
	payload.stype = "b2c";
	payload.kuid = konyRef.getUserId();
	return payload;
}

kony.sdk.getChannelType = function(){
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

kony.sdk.getPlatformName = function(){
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

kony.mbaas.invokeMbaasServiceFromKonyStudio = function(url, inputParam, serviceID, operationID ,callBack){
	var currentInstance = kony.sdk.getCurrentInstance();
	if(!currentInstance){
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	var integrationService = currentInstance.getIntegrationService(serviceID);

	integrationService.invokeOperation(operationID, null, inputParam, function(res){
		if(typeof(callBack) === 'function'){
			callBack(400,res);
		}

	}, function(res){
		if(typeof(callBack) === 'function'){
			callBack(400,res);
		}
	});
}
