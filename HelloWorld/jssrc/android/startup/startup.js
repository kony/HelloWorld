//startup.js file
var globalhttpheaders = {};
var appConfig = {
    appId: "HelloWorld",
    appName: "HelloWorld",
    appVersion: "1.0.0",
    platformVersion: null,
    serverIp: "10.10.25.100",
    serverPort: "80",
    secureServerPort: "443",
    isDebug: true,
    middlewareContext: "HelloWorld",
    isMFApp: false,
    eventTypes: ["FormEntry", "ServiceRequest", "Error", "Crash"],
    url: "https://sampletestcloud.qa-konycloud.com/HelloWorld/MWServlet",
    secureurl: "https://sampletestcloud.qa-konycloud.com/HelloWorld/MWServlet"
};
sessionID = "";

function appInit(params) {
    skinsInit();
    initializeTemp08c13b1ba7ba042();
    frmHomeGlobals();
    setAppBehaviors();
};

function setAppBehaviors() {
    kony.application.setApplicationBehaviors({
        applyMarginPaddingInBCGMode: false,
        adherePercentageStrictly: true,
        retainSpaceOnHide: true,
        marginsIncludedInWidgetContainerWeight: true,
        APILevel: 6900
    })
};

function themeCallBack() {
    callAppMenu();
    initializeGlobalVariables();
    kony.application.setApplicationInitializationEvents({
        init: appInit,
        showstartupform: function() {
            frmHome.show();
        }
    });
};

function loadResources() {
    globalhttpheaders = {};
    sdkInitConfig = {
        "appConfig": appConfig,
        "isMFApp": appConfig.isMFApp,
        "eventTypes": appConfig.eventTypes,
    }
    kony.setupsdks(sdkInitConfig, onSuccessSDKCallBack, onSuccessSDKCallBack);
};

function onSuccessSDKCallBack() {
    kony.theme.setCurrentTheme("default", themeCallBack, themeCallBack);
}
kony.application.setApplicationMode(constants.APPLICATION_MODE_NATIVE);
//If default locale is specified. This is set even before any other app life cycle event is called.
loadResources();
// If you wish to debug Application Initialization events, now is the time to
// place breakpoints.
debugger;