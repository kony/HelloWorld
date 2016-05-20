/*
 * Kony OAuth Client to perform OAuth authentication/authorization with any given OAuth server (ver 1.0 or 2.0)
 * @Dev : Aasim Kumar Sokal
 * Integrated with Netflix implementation of OAuth.
 * 
 * Copyright 2013 Kony Inc.
 */

KOAuth._constants = {
	"VERSION_1_0" : "1.0A",
    "ENCODING" : "UTF-8",
    "FORM_ENCODED" : "application/x-www-form-urlencoded",
    "HTTP_AUTHORIZATION_HEADER" : "Authorization",
    "OAUTH_CONSUMER_KEY" : "oauth_consumer_key",
    "OAUTH_TOKEN" : "oauth_token",
    "OAUTH_TOKEN_SECRET" : "oauth_token_secret",
    "OAUTH_SIGNATURE_METHOD" : "oauth_signature_method",
    "OAUTH_SIGNATURE" : "oauth_signature",
    "OAUTH_TIMESTAMP" : "oauth_timestamp",
    "OAUTH_NONCE" : "oauth_nonce",
    "OAUTH_VERSION" : "oauth_version",
    "OAUTH_CALLBACK" : "oauth_callback",
    "OAUTH_VERIFIER" : "oauth_verifier",
    "HTTP_CONTENT_TYPE" : "Content-Type",
    "SIGNATURE_PLAINTEXT" : "PLAINTEXT",
    "SIGNATURE_SHA1" : "HMAC-SHA1"
};

function KOAuth(requestUrl, accessUrl, consumerKey, consumerSecret, version, authorize_callback, signatureMethod, customHeaders) {
	this._requestUrl = requestUrl;
	this._accessUrl = accessUrl;
	this._consumerKey = consumerKey;
	this._consumerSecret = this._encodeData(consumerSecret);
	this._version = version;

	if (authorize_callback === undefined) {
		this._authorize_callback = "oob";
	} else {
    	this._authorize_callback = authorize_callback;
  	}

  	if (signatureMethod != KOAuth._constants.SIGNATURE_PLAINTEXT && signatureMethod != KOAuth._constants.SIGNATURE_SHA1)
    	throw new Error("Un-supported signature method: " + signatureMethod)
  		this._signatureMethod = signatureMethod;
  	this._headers = customHeaders || {
    	"Accept" : "*/*",
    	"Connection" : "close",
    	"User-Agent" : "Kony authentication",
    	"preview_type" : "native"
  	}
  	this._clientOptions = this._defaultClientOptions = {
    	"requestTokenHttpMethod" : "POST",
   		"accessTokenHttpMethod" : "POST"
  	};
  	this._oauthParameterSeperator = ",";
};

KOAuth.prototype.getOAuthRequestToken = function(callback) {
  	this._performSecureRequest(null, null, this._clientOptions.requestTokenHttpMethod, this._requestUrl, null, null, null,
								    function(error, data, response) {
								      if (error)
								        	callback(error);
								      else {
								        	var results = _parseQuerystring(data);
								        	var oauth_token = results[KOAuth._constants.OAUTH_TOKEN];
								        	var oauth_token_secret = results[KOAuth._constants.OAUTH_TOKEN_SECRET];
								        	delete results[KOAuth._constants.OAUTH_TOKEN];
								        	delete results[KOAuth._constants.OAUTH_TOKEN_SECRET];
								        	callback(null, oauth_token, oauth_token_secret, results);
								      }
								    });
}

KOAuth.prototype.getOAuthTokenAuthorized = function(oauth_token, oauth_token_secret, url, extra_params, callback) {
  	this._performSecureRequest(oauth_token, oauth_token_secret, this._clientOptions.requestTokenHttpMethod, url, extra_params,null, null, 
			    					function(error, data, response) {
								      if (error)
								        callback(error);
								      else {
								        callback(null, 'SUCCESS');
								      }
								    });
}

KOAuth.prototype.getOAuthAccessToken = function(oauth_token,
    oauth_token_secret, oauth_verifier, callback) {
  	var extraParams = {};
  	if (typeof oauth_verifier == "function") {
    	callback = oauth_verifier;
  	} else {
    	extraParams.oauth_verifier = oauth_verifier;
  	}
  	this._performSecureRequest(oauth_token, oauth_token_secret, this._clientOptions.accessTokenHttpMethod, this._accessUrl, extraParams, null, null,
							    function(error, data, response) {
							      if (error)
							        callback(error);
							      else {
							        var results = _parseQuerystring(data);
							        var oauth_access_token = results[KOAuth._constants.OAUTH_TOKEN];
							        delete results[KOAuth._constants.OAUTH_TOKEN];
							        var oauth_access_token_secret = results[KOAuth._constants.OAUTH_TOKEN_SECRET];
							        delete results[KOAuth._constants.OAUTH_TOKEN_SECRET];
							        callback(null, oauth_access_token,
							            oauth_access_token_secret, results);
							      }
							    });
}

KOAuth.prototype.getSecureData = function(url, method, oauth_token, oauth_token_secret, callback) {
  this._performSecureRequest(oauth_token, oauth_token_secret, method, url,null, null, null,
							   function(error, data, response) {
							      if (error)
							        callback(error);
							      else {
							        callback(null, data, response);
							      }
							    });
}

KOAuth.prototype._performSecureRequest = function(oauth_token, oauth_token_secret, method, url, extra_params, post_body, post_content_type, callback) {
	var orderedParameters = this._prepareParameters(oauth_token, oauth_token_secret, method, url, extra_params);
  	if (!post_content_type) {
    	post_content_type = KOAuth._constants.FORM_ENCODED;
  	}

  	var headers = {};
  	var authorization = this._buildAuthorizationHeaders(orderedParameters);
  	kony.print("Final build " + authorization);
  	headers[KOAuth._constants.HTTP_AUTHORIZATION_HEADER] = authorization;

  	for ( var key in this._headers) {
    	if (this._headers.hasOwnProperty(key)) {
      		headers[key] = this._headers[key];
    	}
  	}

  // Filter out any passed extra_params that are really to do with OAuth
  	for ( var key in extra_params) {
    	if (key.substring(0, 6) == "oauth_") {
      		delete extra_params[key];
    	}
  	}
  	var async = false;
	if(method == 'GET') {
	 req_method = constants.HTTP_METHOD_GET;
	 async = true;
	}
	else req_method = constants.HTTP_METHOD_POST;

  	if ((method == "POST" || method == "PUT") && (post_body == null && extra_params != null)) {
    	post_body = this._paramStringify(extra_params).replace(/\!/g, "%21").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g,"%29").replace(/\*/g, "%2A");
  	}
  	headers[KOAuth._constants.HTTP_CONTENT_TYPE] = post_content_type;

  	kony.print("Headers Used " + JSON.stringify(headers));
  
	 
	
	if((kony.os.deviceInfo().name).toLowerCase() == "android")
		nativelogin.nativecreaterequest(url);
	else{		
	 	var request = new kony.net.HttpRequest(); 
	 	request.timeout = 5000; 
	 	request.open(req_method, url, async); 	 	
	}
	  
 	var response = "";
 	if((kony.os.deviceInfo().name).toLowerCase() != "android") { 	
     	request.onReadyStateChange = function() {
     	kony.print("statusText = " + this.statusText + " Number  " + this.status);
     	if(this.statusText == "server error"){
 			errorMsgFP("Unable to reach host.");
 			return;
     	 }
 	   	if (this.readyState == constants.HTTP_READY_STATE_DONE) {
        	kony.print("Status = " + this.statusText + " Number  " + this.status);
        	kony.print("RESPONSE HEADERS " + JSON.stringify(request.getAllResponseHeaders()));
			response = this.response;			
		 	kony.print("JS Received response1 " + JSON.stringify(response));
		 	if(response != null){
			  	var response1 = _parseQuerystring("" + response);
			  	kony.print("JS Received Data  " + JSON.stringify(response1));
			  	if (this.status >= 200 && this.status <= 299) {
			  		kony.print("SUCCESS CODE ");
			    	callback(null, response, response);
			  	} else {
			  		kony.print("FAILURE CODE");
			    	callback(response, response, response);
			  	}
			}
		}
    	}
    	
 	}
	
  	for ( var key in headers) {
	  if((kony.os.deviceInfo().name).toLowerCase() == "android")
	     nativelogin.nativesetrequesthdr(key, headers[key]);
	   else
		 request.setRequestHeader(key, headers[key]);
	   
  	}
  
  	if ((method == "POST" || method == "PUT") && post_body != null && post_body != "") {
      	kony.print("Sending Form Data " + post_body);
      	if((kony.os.deviceInfo().name).toLowerCase() == "android")
	 		response = nativelogin.nativesenddata(post_body);
        else{
      	  	var post_body = new kony.net.FormData();        
	      	post_body.append("primary_email", encodeURIComponent(extra_params["primary_email"]));
	      	post_body.append("password", encodeURIComponent(extra_params["password"]));
	        request.send(post_body);
    	}
  	} else {
	   if((kony.os.deviceInfo().name).toLowerCase() == "android")
			response = nativelogin.nativesenddata(null);   		
	   else{
	   		request.send();	   		
	   }
  	}
  	
  if((kony.os.deviceInfo().name).toLowerCase() == "android"){
	  kony.print("JS Received response1 " + response);
	  var response1 = _parseQuerystring("" + response);
	  var aIdx = response.indexOf('&');
	  response = response.substring(aIdx + 1, response.length);
	  kony.print("JS Received Data  " + JSON.stringify(response1));
	  if (response1.status >= 200 && response1.status <= 299) {
	  	kony.print("SUCCESS CODE ");
	    callback(null, response, response);
	  } else {
	  	kony.print("FAILURE CODE");
	      callback(response, response, response);
	  }
  }
}

var _addUrlPath = function(url, path) {
  	var uri = url;
  	if (url.substring(url.length - 1, url.length) == '/') {
    	if (path.substring(0, 1) == '/') {
      		uri = url + path.substring(1, path.length);
    	} else {
      		uri = url + path;
    	}
  	} else {
    	if (path.substring(0, 1) == '/') {
     	 	uri = url + path;
    	} else {
      		uri = url + '/' + path;
    	}
  	}
  	return uri;
};

var _addToURL = function(url, parameters) {
  	newURL = url;
  	if (parameters != null) {
    	var toAdd = OAuth.formEncode(parameters);
    	if (toAdd.length > 0) {
      	var q = url.indexOf('?');
      	if (q < 0)
        	newURL += '?';
      	else
        	newURL += '&';
      	newURL += toAdd;
    	}
  	}
 	 return newURL;
};

var _parseURL = function(url) {
  	var idx = url.indexOf('?');
  	if (idx > 0) {
    	var queryString = url.substring(idx + 1);
    	var params = _parseQuerystring(queryString);
  	}
  	return params;
};

var _parseQuerystring = function(queryString) {
  	var params = {}, queries, temp, i, l;
  	queries = queryString.split("&");
  	for (i = 0, l = queries.length; i < l; i++) {
    	temp = queries[i].split('=');
    	params[temp[0]] = temp[1];
  	}
  	return params;
};

KOAuth.prototype._paramStringify = function(parameters) {
  	var form = "";
  	var list = parameters;// OAuth.getParameterList(parameters);
  	for ( var p in parameters) {
    	if (form != "")
      		form += '&';
    	form += this._encodeData(p) + '=' + this._encodeData(list[p]);
  	}
  	return form;
};

var _formEncode = function(parameters) {
  	var form = "";
  	var list = parameters;// OAuth.getParameterList(parameters);
  	for ( var p = 0; p < list.length; ++p) {
    	var value = list[p][1];
    	if (value == null)
      		value = "";
    	if (form != "")
      	form += '&';
    	form += _encodeData(list[p][0]) + '=' + _encodeData(value);
  	}
  	return form;
};

KOAuth.prototype._encodeData = function(toEncode) {
  	if (toEncode == null || toEncode == "")
    	return ""
  	else {
    	var result = encodeURIComponent(toEncode);
    // Fix the mismatch between OAuth's RFC3986's and Javascript's beliefs
    // in what is right and wrong ;)
    	return result.replace(/\!/g, "%21").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
  	}
}
KOAuth.prototype._prepareParameters = function(oauth_token, oauth_token_secret, method, url, extra_params) {
  	var accessor = {
    	consumerSecret : this._consumerSecret,
    	consumerKey : this._consumerKey,
    	token : oauth_token,
    	tokenSecret : oauth_token_secret
  	};

  	var message = {
    	action : url,
    	method : method,
    	parameters : []
  	};

  	message.parameters.push([ KOAuth._constants.OAUTH_TIMESTAMP, "" ]);
  	message.parameters.push([ KOAuth._constants.OAUTH_NONCE, "" ]);
  	message.parameters.push([ KOAuth._constants.OAUTH_VERSION, this._version ]);
  	message.parameters.push([ KOAuth._constants.OAUTH_SIGNATURE_METHOD, this._signatureMethod ]);
  	message.parameters.push([ KOAuth._constants.OAUTH_CONSUMER_KEY, this._consumerKey ]);

  	if (oauth_token) {
    	message.parameters.push([ KOAuth._constants.OAUTH_TOKEN, oauth_token ]);
  	}

  	if (extra_params) {
    	for ( var key in extra_params) {
      		message.parameters[key] = extra_params[key];
    	}
  	}
  	var extraParameters = _parseURL(url);
  	if (extraParameters) {
    	var key2;
    	for ( var key in extraParameters) {
     		var value = extraParameters[key];
      		if (typeof value == "object") {
        	// TODO: This probably should be recursive
        		for (key2 in value) {
          			message.parameters[key + "[" + key2 + "]"] = value[key2];
        		}
      		} else {
        		message.parameters[key] = value;
      		}
    	}
  	}
  	OAuth.setTimestampAndNonce(message);
 	OAuth.completeRequest(message, accessor);
  	var parameterMap = OAuth.getParameterMap(message.parameters);
  	// kony.print("Head seed " + JSON.stringify(parameterMap));
  	return parameterMap;
}

KOAuth.prototype._parseURL = function(toEncode) {
  	if (toEncode == null || toEncode == "")
    	return ""
  	else {
    	var result = encodeURIComponent(toEncode);
    	// Fix the mismatch between OAuth's RFC3986's and Javascript's beliefs
    	// in what is right and wrong ;)
    	return result.replace(/\!/g, "%21").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
  	}
}

KOAuth.prototype._decodeData = function(toDecode) {
  	if (toDecode != null) {
    	toDecode = toDecode.replace(/\+/g, " ");
  	}
  	return decodeURIComponent(toDecode);
}

// build the OAuth request authorization header
KOAuth.prototype._buildAuthorizationHeaders = function(orderedParameters) {
  	var authHeader = "OAuth ";
  	for ( var p in orderedParameters) {
    	if (p.substring(0, 6) == "oauth_") {
      	authHeader += "" + this._encodeData(p) + "=\""
          	+ this._encodeData(orderedParameters[p]) + "\"" + ",";
    	}
  	}
  	authHeader = authHeader.substring(0, authHeader.length
      	- this._oauthParameterSeperator.length);
  	return authHeader;
}
