function displayMWError() {
    kony.ui.Alert("Middleware Error ", null, "error", null, null);
};

function displaySessionError() {
    kony.ui.Alert("Session Expired .. Please re-login", null, "error", null, null);
};

function displayError(code, msg) {
    // Commented for SWA: kony.ui.Alert("Error Code: "..code .." Message: " ..msg,null,"error",null,null);
    kony.ui.Alert(code + "- " + msg, null, "error", null, null);
};
var mergeHeaders = function(httpHeaders, globalHeaders) {
        for (var attrName in globalHeaders) {
            httpHeaders[attrName] = globalHeaders[attrName];
        }
        return httpHeaders;
    };

function appmiddlewareinvoker(inputParam, isBlocking, indicator, datasetID) {
    var url = appConfig.url;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "rc";
    inputParam["platform"] = kony.os.deviceInfo().name;
    if (indicator) {
        inputParam["indicator"] = indicator;
    };
    if (datasetID) {
        inputParam["datasetID"] = datasetID;
    };
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = globalhttpheaders;
        };
    };
    var resulttable = _invokeServiceSyncForMF_(url, inputParam, isBlocking);
    if (resulttable) {
        if (resulttable[sessionIdKey]) {
            sessionID = resulttable[sessionIdKey];
        };
    };
    return resulttable;
};

function appmiddlewaresecureinvoker(inputParam, isBlocking, indicator, datasetID) {
    var url = appConfig.secureurl;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "rc";
    inputParam["platform"] = kony.os.deviceInfo().name;
    if (indicator) {
        inputParam["indicator"] = indicator;
    };
    if (datasetID) {
        inputParam["datasetID"] = datasetID;
    };
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = globalhttpheaders;
        };
    };
    var resulttable = _invokeServiceSyncForMF_(url, inputParam, isBlocking);
    if (resulttable) {
        if (resulttable[sessionIdKey]) {
            sessionID = resulttable[sessionIdKey];
        };
    };
    return resulttable;
};

function appmiddlewareinvokerasync(inputParam, callBack) {
    var url = appConfig.url;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "rc";
    inputParam["platform"] = kony.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam.httpheaders = globalhttpheaders;
        };
    };
    var connHandle = _invokeServiceAsyncForMF_(url, inputParam, callBack);
    return connHandle;
};

function appmiddlewaresecureinvokerasync(inputParam, callBack) {
    var url = appConfig.secureurl;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "rc";
    inputParam["platform"] = kony.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = globalhttpheaders;
        };
    };
    var connHandle = _invokeServiceAsyncForMF_(url, inputParam, callBack);
    return connHandle;
};

function mfgetidentityservice(idProviderName) {
    var currentInstance = kony.sdk.getCurrentInstance();
    if (!currentInstance) {
        throw new Exception("INIT_FAILURE", "Please call init before getting identity provider");
    }
    return currentInstance.getIdentityService(idProviderName);
};

function mfintegrationsecureinvokerasync(inputParam, serviceID, operationID, callBack) {
    var url = appConfig.secureurl;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "rc";
    inputParam["platform"] = kony.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = mergeHeaders({}, globalhttpheaders);
        };
    };
    kony.print("Async : Invoking service through mobileFabric with url : " + url + " service id : " + serviceID + " operationid : " + operationID + "\n input params" + JSON.stringify(inputParam));
    if (kony.mbaas) {
        kony.mbaas.invokeMbaasServiceFromKonyStudio(url, inputParam, serviceID, operationID, callBack);
    } else {
        alert("Unable to find the mobileFabric SDK for KonyStudio. Please download the SDK from the Kony Cloud Console and add as module to the Kony Project.");
    }
};

function mfintegrationsecureinvokersync(inputParam, serviceID, operationID) {
    var url = appConfig.secureurl;
    var sessionIdKey = "cacheid";
    var resulttable;
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "rc";
    inputParam["platform"] = kony.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = mergeHeaders({}, globalhttpheaders);
        };
    };
    kony.print("Invoking service through mobileFabric with url : " + url + " service id : " + serviceID + " operationid : " + operationID + "\n input params" + JSON.stringify(inputParam));
    if (kony.mbaas) {
        resulttable = kony.mbaas.invokeMbaasServiceFromKonyStudioSync(url, inputParam, serviceID, operationID);
        kony.print("Result table for service id : " + serviceID + " operationid : " + operationID + " : " + JSON.stringify(resulttable));
    } else {
        alert("Unable to find the mobileFabric SDK for KonyStudio. Please download the SDK from the Kony Cloud Console and add as module to the Kony Project.");
    }
    return resulttable;
};
_invokeServiceAsyncForMF_ = function(url, inputParam, callBack) {
    var operationID = inputParam["serviceID"];
    if (!operationID) {
        resulttable = kony.net.invokeServiceAsync(url, inputParam, callBack);
    } else {
        var _mfServicesMap_ = {};
        kony.print("Getting serviceID for : " + operationID);
        var serviceID = _mfServicesMap_[operationID] && _mfServicesMap_[operationID]["servicename"];
        kony.print("Got serviceID for : " + operationID + " : " + serviceID);
        kony.print("Async : Invoking service through mobileFabric with url : " + url + " service id : " + serviceID + " operationid : " + operationID + "\n input params" + JSON.stringify(inputParam));
        if (serviceID && operationID) {
            var url = appConfig.secureurl;
            if (kony.mbaas) {
                kony.mbaas.invokeMbaasServiceFromKonyStudio(url, inputParam, serviceID, operationID, callBack);
            } else {
                alert("Unable to find the mobileFabric SDK for KonyStudio. Please download the SDK from the Kony Cloud Console and add as module to the Kony Project.");
            }
        } else {
            resulttable = kony.net.invokeServiceAsync(url, inputParam, callBack);
        }
    }
};
_invokeServiceSyncForMF_ = function(url, inputParam, isBlocking) {
    var resulttable;
    var operationID = inputParam["serviceID"];
    if (!operationID) {
        resulttable = kony.net.invokeService(url, inputParam, isBlocking);
    } else {
        var _mfServicesMap_ = {};
        kony.print("Getting serviceID for : " + operationID);
        var serviceID = _mfServicesMap_[operationID] && _mfServicesMap_[operationID]["servicename"];
        kony.print("Got serviceID for : " + operationID + " : " + serviceID);
        kony.print("Invoking service through mobileFabric with url : " + url + " service id : " + serviceID + " operationid : " + operationID + "\n input params" + JSON.stringify(inputParam));
        if (serviceID && operationID) {
            var url = appConfig.secureurl;
            if (kony.mbaas) {
                resulttable = kony.mbaas.invokeMbaasServiceFromKonyStudioSync(url, inputParam, serviceID, operationID);
                kony.print("Result table for service id : " + serviceID + " operationid : " + operationID + " : " + JSON.stringify(resulttable));
            } else {
                alert("Unable to find the mobileFabric SDK for KonyStudio. Please download the SDK from the Kony Cloud Console and add as module to the Kony Project.");
            }
        } else {
            resulttable = kony.net.invokeService(url, inputParam, isBlocking);
        }
    }
    return resulttable;
};
/*
        Sample invocation code
        var inputparam = {};
        inputparam.options = {
            "access": "online",
            "CRUD_TYPE": "get",//get/create..
            "odataurl": "$filter=UserId eq xxx",
            "data" : {a:1,b:2}//in case of create/update
        };
     */
function mfobjectsecureinvokerasync(inputParam, serviceID, objectID, callBack) {
    var options = {
        "access": inputParam.options.access
    };
    var serviceObj = kony.sdk.getCurrentInstance().getObjectService(serviceID, options);
    var CRUD_TYPE = inputParam.options.CRUD_TYPE;
    switch (CRUD_TYPE) {
    case 'get':
        var dataObject = new kony.sdk.dto.DataObject(objectID);
        var headers = inputParam.httpheaders || {};
        if (inputParam.options && inputParam.options.odataurl) dataObject.setOdataUrl(inputParam.options.odataurl.toString());
        options = {
            "dataObject": dataObject,
            "headers": headers
        };
        serviceObj.fetch(options, callBack, callBack);
        break;
    case 'create':
        var dataObject = new kony.sdk.dto.DataObject(objectID);
        var headers = inputParam.httpheaders || {};
        var data = inputParam.options && inputParam.options.data || {};
        var key;
        for (key in data) {
            dataObject.addField(key, data[key]);
        }
        options = {
            "dataObject": dataObject,
            "headers": headers
        };
        serviceObj.create(options, callBack, callBack);
        break;
    case 'update':
        var dataObject = new kony.sdk.dto.DataObject(objectID);
        var headers = inputParam.httpheaders || {};
        var data = inputParam.options && inputParam.options.data || {};
        var key;
        for (key in data) {
            dataObject.addField(key, data[key]);
        }
        options = {
            "dataObject": dataObject,
            "headers": headers
        };
        serviceObj.update(options, callBack, callBack);
        break;
    case 'partialupdate':
        var dataObject = new kony.sdk.dto.DataObject(objectID);
        var headers = inputParam.httpheaders || {};
        var data = inputParam.options && inputParam.options.data || {};
        var key;
        for (key in data) {
            dataObject.addField(key, data[key]);
        }
        options = {
            "dataObject": dataObject,
            "headers": headers
        };
        serviceObj.partialUpdate(options, callBack, callBack);
        break;
    case 'delete':
        var dataObject = new kony.sdk.dto.DataObject(objectID);
        var headers = inputParam.httpheaders || {};
        var data = inputParam.options && inputParam.options.data || {};
        var key;
        for (key in data) {
            dataObject.addField(key, data[key]);
        }
        options = {
            "dataObject": dataObject,
            "headers": headers
        };
        serviceObj.deleteRecord(options, callBack, callBack);
        break;
    default:
    }
};

function appmenuseq() {
    frmHome.show();
};

function callAppMenu() {
    var appMenu = [
        ["appmenuitemid1", "Item 1", "option1.png", appmenuseq,
        {}],
        ["appmenuitemid2", "Item 2", "option2.png", appmenuseq,
        {}],
        ["appmenuitemid3", "Item 3", "option3.png", appmenuseq,
        {}],
        ["appmenuitemid4", "Item 4", "option4.png", appmenuseq,
        {}]
    ];
    kony.application.createAppMenu("sampAppMenu", appMenu, "", "");
    kony.application.setCurrentAppMenu("sampAppMenu");
};

function makeCall(eventobject) {
    kony.phone.dial(eventobject.text);
};

function initializeGlobalVariables() {};