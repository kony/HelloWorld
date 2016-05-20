function addWidgetsfrmHome() {
    frmHome.setDefaultUnit(kony.flex.DP);
    var FlexContainer0239525d7b6d54b = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "8%",
        "id": "FlexContainer0239525d7b6d54b",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        "skin": "slFbox",
        "top": "0dp",
        "width": "100%"
    }, {}, {});
    FlexContainer0239525d7b6d54b.setDefaultUnit(kony.flex.DP);
    var Label005519a95bde348 = new kony.ui.Label({
        "height": "100%",
        "id": "Label005519a95bde348",
        "isVisible": true,
        "left": "0dp",
        "skin": "CopyslLabel0a56f874d63754e",
        "text": "Home",
        "top": "0dp",
        "width": "100%"
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "renderAsAnchor": false,
        "textCopyable": false
    });
    FlexContainer0239525d7b6d54b.add(
    Label005519a95bde348);
    var Image0fa5d961b98ff4f = new kony.ui.Image2({
        "id": "Image0fa5d961b98ff4f",
        "isVisible": true,
        "left": "0dp",
        "skin": "slImage",
        "src": "helloworld.png",
        "top": "10%",
        "width": "100%",
        "zIndex": 1
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var FlexContainer06ad4a7b0f47045 = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "10%",
        "id": "FlexContainer06ad4a7b0f47045",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        "skin": "slFbox",
        "top": "60%",
        "width": "100%",
        "zIndex": 1
    }, {}, {});
    FlexContainer06ad4a7b0f47045.setDefaultUnit(kony.flex.DP);
    var Button0d69ad14065aa41 = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "100%",
        "id": "Button0d69ad14065aa41",
        "isVisible": true,
        "left": "5%",
        "skin": "CopyslButtonGlossBlue003f32005c39646",
        "text": "Click me",
        "top": "0dp",
        "width": "90%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    FlexContainer06ad4a7b0f47045.add(
    Button0d69ad14065aa41);
    frmHome.add(
    FlexContainer0239525d7b6d54b, Image0fa5d961b98ff4f, FlexContainer06ad4a7b0f47045);
};

function frmHomeGlobals() {
    frmHome = new kony.ui.Form2({
        "addWidgets": addWidgetsfrmHome,
        "enabledForIdleTimeout": false,
        "id": "frmHome",
        "layoutType": kony.flex.FREE_FORM,
        "needAppMenu": false,
        "skin": "CopyslForm005c3d2dd737745"
    }, {
        "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
        "layoutType": kony.flex.FREE_FORM,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "retainScrollPosition": false
    });
};