

	var __createContainer = function(id, orientation, onClickCallback, containerWeight){
		var bxsegpopupPreview = new kony.ui.Box({
			"id": id,
			"isVisible": true,
			"position": constants.BOX_POSITION_AS_NORMAL,
			"orientation": orientation,
			"onClick": onClickCallback
			}, {
			"containerWeight": containerWeight,
			"percent": true,
			"widgetAlignment": constants.WIDGET_ALIGN_CENTER,
			"vExpand": false,
			"marginInPixel": false,
			"layoutType": constants.CONTAINER_LAYOUT_BOX
			}, {});
		
		return bxsegpopupPreview;
	}
	
	var __createLabel = function(id, skin, widgetAlign, vExpand, hExpand, margin, padding, contentAlign, containerWeight){
 		var dynLabel = new kony.ui.Label({
			"id": id,
			"isVisible": true,
			"skin": skin
			}, {
			"widgetAlignment": widgetAlign,
			"vExpand": true,
			"hExpand": true,
			"margin": margin,
			"padding": padding,
			"contentAlignment": contentAlign,
			"marginInPixel": false,
			"paddingInPixel": false,
			"containerWeight": containerWeight
			}, {
			"wrapping": constants.WIDGET_TEXT_WORD_WRAP
		})		
		return dynLabel;
	}
	
	var __createButton = function(id, text, isVisible, skin, onClick, margin, padding, containerWeight){
	    var editButton = new kony.ui.Button({
			"id": id,
			"isVisible": isVisible,
			"text": text,
			"skin": skin,
			"focusSkin": skin,
			"onClick":onClick
			}, {
			"widgetAlignment": constants.WIDGET_ALIGN_MIDDLE_RIGHT,
			"vExpand": false,
			"hExpand": true,
			"margin": margin,
			"padding": padding,
			"contentAlignment": constants.CONTENT_ALIGN_CENTER,
			"displayText": true,
			"marginInPixel": false,
			"paddingInPixel": false,
			"containerWeight": containerWeight
			}, {
			"glowEffect": false,
			"showProgressIndicator": true
		});
		return editButton;
	}
	

	 var __notesRowtemplate = function(){
	 
		hbxnotesRowTempPreview = __createContainer("hbxnotesRowTempPreview", constants.BOX_LAYOUT_HORIZONTAL, null, 100);
	
        var trashButton = __createButton("trashButton", "X", false, "sknTrashButton", __deleteCommentFP, [2, 2, 2, 2], [0, 1, 0, 1], 0);
		var vbxsegpopupPreview = __createContainer("vbxsegpopupPreview", constants.BOX_LAYOUT_VERTICAL, null, 100);
		
		var createdBy =  __createLabel(
		"createdBy", "popNotesPersonLabel", constants.WIDGET_ALIGN_MIDDLE_LEFT, true, true, [0, 0, 0, 0], [1, 1, 1, 1]
		, constants.CONTENT_ALIGN_MIDDLE_LEFT, 40);
		
		var formattedlmt =  __createLabel(
		"formattedlmt", "popNotesTimestampLabel", constants.WIDGET_ALIGN_MIDDLE_RIGHT, true, true, [1, 1, 1, 1], [1, 1, 1, 1]
		, constants.CONTENT_ALIGN_MIDDLE_RIGHT, 60);

		var hbxsegpopupPreview = __createContainer("hbxsegpopupPreview", constants.BOX_LAYOUT_HORIZONTAL, null, 30);

		hbxsegpopupPreview.add(createdBy, formattedlmt);

		var comment =  __createLabel(
		"comment", "notesPopNoteContent", constants.WIDGET_ALIGN_MIDDLE_LEFT, true, true, [1, 1, 1, 1], [1, 1, 1, 1]
		, constants.CONTENT_ALIGN_MIDDLE_LEFT, 70);
		
		vbxsegpopupPreview.add(hbxsegpopupPreview, comment);
		hbxnotesRowTempPreview.add(trashButton,vbxsegpopupPreview);
	 }
     
     var __notesRowtemplateWithDelete = function(){
	 
		hbxnotesRowTempPreviewWithDelete = __createContainer("hbxnotesRowTempPreviewWithDelete", constants.BOX_LAYOUT_HORIZONTAL, null, 100);
	
        var trashButton = __createButton("trashButton", "X", false, "sknTrashButton", __deleteCommentFP, [2, 2, 2, 2], [0, 1, 0, 1], 12);
		var vbxsegpopupPreview = __createContainer("vbxsegpopupPreview", constants.BOX_LAYOUT_VERTICAL, null, 88);
		
		var createdBy =  __createLabel(
		"createdBy", "popNotesPersonLabel", constants.WIDGET_ALIGN_MIDDLE_LEFT, true, true, [0, 0, 0, 0], [1, 1, 1, 1]
		, constants.CONTENT_ALIGN_MIDDLE_LEFT, 40);
		
		var formattedlmt =  __createLabel(
		"formattedlmt", "popNotesTimestampLabel", constants.WIDGET_ALIGN_MIDDLE_RIGHT, true, true, [1, 1, 1, 1], [1, 1, 1, 1]
		, constants.CONTENT_ALIGN_MIDDLE_RIGHT, 60);

		var hbxsegpopupPreview = __createContainer("hbxsegpopupPreview", constants.BOX_LAYOUT_HORIZONTAL, null, 30);

		hbxsegpopupPreview.add(createdBy, formattedlmt);

		var comment =  __createLabel(
		"comment", "notesPopNoteContent", constants.WIDGET_ALIGN_MIDDLE_LEFT, true, true, [1, 1, 1, 1], [1, 1, 1, 1]
		, constants.CONTENT_ALIGN_MIDDLE_LEFT, 70);
		
		vbxsegpopupPreview.add(hbxsegpopupPreview, comment);
		hbxnotesRowTempPreviewWithDelete.add(trashButton,vbxsegpopupPreview);
		//__onSwipeofTemplate();	
		//return hbxnotesRowTempPreview;
	 }
     	
     function btnEditDoneBottomHdrCallback(eventobject) {
         var visible = false;
            if(this.text == 'Done'){
                visible = false;
                popupBottomPreview.headers[0].btnEditDone.skin = 'sknbtnEdit';
                popupBottomPreview.headers[0].btnEditDone.text = 'Edit';
                popupBottomPreview.segPopupPreview.rowTemplate = hbxnotesRowTempPreview;
                popupBottomPreview.segPopupPreview.onRowClick = null;
                hbxpopupTxtbxTemplate.textboxAddFP.text = "";
            } else {
                visible = true;
                popupBottomPreview.headers[0].btnEditDone.skin = 'sknbtnDone';
                popupBottomPreview.headers[0].btnEditDone.text = 'Done';
                popupBottomPreview.segPopupPreview.rowTemplate = hbxnotesRowTempPreviewWithDelete;
                popupBottomPreview.segPopupPreview.onRowClick = __editCommentFP;
            }
            var data = popupBottomPreview.segPopupPreview.data || {};
            var kvsession = kony.ds.read("kvsession")[0];
            var userDetails = kvsession['userDetails'];
            var key;
            for(key in data){
                if(data[key].createdById == userDetails['user_guid']){
                    data[key]["trashButton"] = {text : "X" , isVisible : visible};
                } else {
                    data[key]["trashButton"] = {text : "X" , isVisible : visible , skin : "sknTrashButtonDisabled"};
                }
            }
            popupBottomPreview.segPopupPreview.setData(data);
     }

    function btnEditDoneTopHdrCallback(eventobject) {
         var visible = false;
            if(this.text == 'Done'){
                visible = false;
                popupTopPreview.footers[0].btnEditDone.skin = 'sknbtnEdit';
                popupTopPreview.footers[0].btnEditDone.text = 'Edit';
                popupTopPreview.segPopupPreview.rowTemplate = hbxnotesRowTempPreview;
                popupTopPreview.segPopupPreview.onRowClick = null;
                hbxpopupTxtbxTemplate.textboxAddFP.text = "";
            } else {
                visible = true;
                popupTopPreview.footers[0].btnEditDone.skin = 'sknbtnDone';
                popupTopPreview.footers[0].btnEditDone.text = 'Done';
                popupTopPreview.segPopupPreview.rowTemplate = hbxnotesRowTempPreviewWithDelete;
                popupTopPreview.segPopupPreview.onRowClick = __editCommentFP;
            }

            var data = popupTopPreview.segPopupPreview.data || {};
            var kvsession = kony.ds.read("kvsession")[0];
            var userDetails = kvsession['userDetails'];
            var key;
            for(key in data){
                if(data[key].createdById == userDetails['user_guid']){
                    data[key]["trashButton"] = {text : "X" , isVisible : visible};
                } else {
                    data[key]["trashButton"] = {text : "X" , isVisible : visible , skin : "sknTrashButtonDisabled"};
                }
            }
            popupTopPreview.segPopupPreview.setData(data);
     }
/*
* add more comments template
* HBox header/footer template with textbox & button for popupBottom/Top
*/
	 
function __hbxTxtbxBtnTemplate(addbtn_onClick_callback){

	var textboxAddFP = new kony.ui.TextBox2({
		"id": "textboxAddFP",
		"isVisible": true,
		"text": null,
		"secureTextEntry": false,
		"textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
		"keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
		"placeholder": "Add note",
		"autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
		"skin": "skntxtAddNotefp",
		"focusSkin": "skntxtAddNotefp",
		"onDone": addbtn_onClick_callback
	}, {
		"widgetAlignment": constants.WIDGET_ALIGN_CENTER,
		"vExpand": false,
		"hExpand": true,
		"margin": [0, 0, 0, 0],
		"padding": [1, 1, 1, 1],
		"contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
		"containerHeightMode": constants.TEXTBOX_DEFAULT_PLATFORM_HEIGHT,
		"marginInPixel": false,
		"paddingInPixel": false,
		"containerWeight": 76
	}, {
		"pasteboardType": constants.TEXTBOX_PASTE_BOARD_TYPE_NO_PASTE_BOARD,
		"leftViewImage": null,
		"showClearButton": true,
		"showProgressIndicator": true,
		"showCloseButton": true,
		"closeButtonText": "Done",
		"keyboardActionLabel": constants.TEXTBOX_KEYBOARD_LABEL_DONE,
		"viewType": constants.TEXTBOX_VIEW_TYPE_DEFAULT
	});
	var button15876207044 = new kony.ui.Button({
		"id": "button15876207044",
		"isVisible": true,
		"text": "Post",
		"skin": "sknbtnPostfp",
		"focusSkin":"sknbtnPostfp",
		"onClick": addbtn_onClick_callback
	}, {
		"widgetAlignment": constants.WIDGET_ALIGN_CENTER,
		"vExpand": false,
		"hExpand": true,
		"margin": [1, 1, 1, 1],
		"padding": [0, 3, 0, 3],
		"contentAlignment": constants.CONTENT_ALIGN_CENTER,
		"displayText": true,
		"marginInPixel": true,
		"paddingInPixel": false,
		"containerWeight": 24
	}, {
		"glowEffect": false,
		"showProgressIndicator": true
	});


	hbxpopupTxtbxTemplate = new kony.ui.Box({
	"id": "hbxpopupTxtbxTemplate",
	"isVisible": true,
	"position": constants.BOX_POSITION_AS_NORMAL,
	"orientation": constants.BOX_LAYOUT_HORIZONTAL
	}, {
	"containerWeight": 11,
	"percent": true,
	"widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
	"margin": [4, 2, 4, 2],
	"padding": [0, 0, 0, 0],
	"vExpand": false,
	"marginInPixel": false,
	"paddingInPixel": false,
	"layoutType": constants.CONTAINER_LAYOUT_BOX
	}, {});
	
	hbxpopupTxtbxTemplate.add(textboxAddFP,button15876207044);
}
 
 
/*
* initialize top/bottom popup
*/
 	
		
var __popupTopBottomFP = function(){
	hdrBottomPopupFP();
	hdrTopPopupFP();
	__hbxTxtbxBtnTemplate(__addBtnOnclick);
		

	popupBottomPreview = new kony.ui.Popup({
		"id": "popupBottomPreview",
		"title": null,
        "headers" : [hbxpopupBottomHDRPreview],
		"footers":[hbxpopupTxtbxTemplate],
		"transparencyBehindThePopup": 100,
		"skin": "notesPopBG",
		"isModal": true,
		"addWidgets": addWidgetspopupBottomPreview//addWidgetspopupBottomPreview
	}, {
		"padding": [0, 0, 0, 0],
		"containerWeight": 100,
		"containerHeight": 45,
		"containerHeightReference": constants.HEIGHT_BY_DEVICE_REFERENCE,
		"paddingInPixel": false,
		"layoutType": constants.CONTAINER_LAYOUT_BOX
	}, {
		"windowSoftInputMode": constants.POPUP_ADJUST_PAN,
		"inTransitionConfig": {
			"animation": 0
		},
		"outTransitionConfig": {
			"animation": 0
		},
		"directChildrenIDs": ["segPopupPreview"]
	});
	popupTopPreview = new kony.ui.Popup({
		"id": "popupTopPreview",
		"title": null,
		"headers":[hbxpopupTxtbxTemplate],
        "footers" : [hbxpopupTopHDRPreview],
		"transparencyBehindThePopup": 100,
		"skin": "notesPopBG",
		"isModal": true,
		"addWidgets": addWidgetspopupTopPreview//addWidgetspopupTopPreview
	}, {
		"padding": [0, 0, 0, 0],
		"containerWeight": 100,
		"containerHeight": 45,
		"containerHeightReference": constants.HEIGHT_BY_DEVICE_REFERENCE,
		"paddingInPixel": false,
		"layoutType": constants.CONTAINER_LAYOUT_BOX
	}, {
		"windowSoftInputMode": constants.POPUP_ADJUST_PAN,
		"inTransitionConfig": {
			"animation": 0
		},
		"outTransitionConfig": {
			"animation": 0
		},
		"directChildrenIDs": ["segPopupPreview"]
	});
}




 
/*
* widgets for popupOptions
*/
 
var addWidgetspopupOptionsFPreview = function(){
	
		var segPopupFPreviewbox = new kony.ui.Box({
			"id": "segPopupPreviewbox",
			"isVisible": true,
			"orientation": constants.BOX_LAYOUT_VERTICAL
		}, {
			"layoutAlignment": constants.BOX_LAYOUT_ALIGN_FROM_LEFT,
			"containerWeight": 45
		}, {});
		var segPopupFPreview = 	new kony.ui.SegmentedUI2({
			"id": "segPopupFPreview",
			"isVisible": true,
			"retainSelection": false,
			"widgetDataMap": {
				"notesOptions": "notesOptions"
			},
			"rowTemplate": segPopupFPreviewbox,
			"widgetSkin": "segTrans",
			"rowSkin": "segRowTrans",
			"rowFocusSkin": "segRowTrans",
			"sectionHeaderSkin": "seg2Header",
			"separatorRequired": true,
			"separatorThickness": 1,
			"separatorColor": "b4b4b400",
			"showScrollbars": false,
			"groupCells": false,
			"screenLevelWidget": false,
			"selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
			"viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW
						
		}, {
			"margin": [3, 0, 3, 0],
			"padding": [0, 0, 0, 0],
			"marginInPixel": false,
			"paddingInPixel": false,
			"containerWeight": 45
		}, {
			"indicator": constants.SEGUI_NONE,
			"enableDictionary": false,
			"showProgressIndicator": true,
			"progressIndicatorColor": constants.PROGRESS_INDICATOR_COLOR_WHITE,
			"bounces": false,
			"editStyle": constants.SEGUI_EDITING_STYLE_SWIPE
		});
		
	    var notesOptions = new kony.ui.Label({
        "id": "notesOptions",
        "isVisible": true,
        "skin": "popNotesOptions"
		}, {
			"widgetAlignment": constants.WIDGET_ALIGN_CENTER,
			"vExpand": false,
			"hExpand": false,
			"margin": [0, 0, 0, 0],
			"padding": [2, 4, 2, 4],
			"contentAlignment": constants.CONTENT_ALIGN_CENTER,
			"marginInPixel": false,
			"paddingInPixel": false,
			"containerWeight": 40
		}, {
			"wrapping": constants.WIDGET_TEXT_WORD_WRAP
		});	
		
		segPopupFPreviewbox.add(notesOptions);
		popupOptionsPreview.add(segPopupFPreview);
	}

	
/*
* widgets for popupTopBottom preview
*/
 	 
function addWidgetspopupTopPreview() {
    var segPopupPreviewbox = new kony.ui.Box({
        "id": "segPopupPreviewbox",
        "isVisible": true,
        "orientation": constants.BOX_LAYOUT_VERTICAL
    }, {
        "layoutAlignment": constants.BOX_LAYOUT_ALIGN_FROM_LEFT,
        "containerWeight": 45
    }, {});
    var segPopupPreview = 	new kony.ui.SegmentedUI2({
        "id": "segPopupPreview",
        "isVisible": true,
        "retainSelection": false,
        "widgetDataMap": {
			"hbxsegpopupPreview": "hbxsegpopupPreview",
			"comment": "comment",
			"createdBy": "createdBy",
            "formattedlmt": "formattedlmt",
            "trashButton" : "trashButton"
        },
        "rowTemplate": hbxnotesRowTempPreview,
        "widgetSkin": "segTrans",
        "rowSkin": "segRowTrans",
        "rowFocusSkin": "segRowTrans",
        "sectionHeaderSkin": "seg2Header",
        "separatorRequired": true,
        "separatorThickness": 1,
        "separatorColor": "b4b4b400",
        "showScrollbars": false,
        "groupCells": false,
        "screenLevelWidget": false,
        "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
        "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW
    }, {
        "margin": [0, 0, 0, 0],
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 45
    }, {
        "indicator": constants.SEGUI_NONE,
        "enableDictionary": false,
        "showProgressIndicator": true,
        "progressIndicatorColor": constants.PROGRESS_INDICATOR_COLOR_WHITE,
        "bounces": false,
        "editStyle": constants.SEGUI_EDITING_STYLE_SWIPE
    });
	


    segPopupPreviewbox.add();
	popupTopPreview.add(segPopupPreview);
};

/*
* widgets for popupTopBottom preview
*/
 	 
function addWidgetspopupBottomPreview() {
    var segPopupPreviewbox = new kony.ui.Box({
        "id": "segPopupPreviewbox",
        "isVisible": true,
        "orientation": constants.BOX_LAYOUT_VERTICAL
    }, {
        "layoutAlignment": constants.BOX_LAYOUT_ALIGN_FROM_LEFT,
        "containerWeight": 45
    }, {});
    var segPopupPreview = 	new kony.ui.SegmentedUI2({
        "id": "segPopupPreview",
        "isVisible": true,
        "retainSelection": false,
        "widgetDataMap": {
			"hbxsegpopupPreview": "hbxsegpopupPreview",
			"comment": "comment",
			"createdBy": "createdBy",
            "formattedlmt": "formattedlmt",
            "trashButton" : "trashButton"
        },
        "rowTemplate": hbxnotesRowTempPreview,
        "widgetSkin": "segTrans",
        "rowSkin": "segRowTrans",
        "rowFocusSkin": "segRowTrans",
        "sectionHeaderSkin": "seg2Header",
        "separatorRequired": true,
        "separatorThickness": 1,
        "separatorColor": "b4b4b400",
        "showScrollbars": false,
        "groupCells": false,
        "screenLevelWidget": false,
        "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
        "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW
    }, {
        "margin": [0, 0, 0, 0],
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 45
    }, {
        "indicator": constants.SEGUI_NONE,
        "enableDictionary": false,
        "showProgressIndicator": true,
        "progressIndicatorColor": constants.PROGRESS_INDICATOR_COLOR_WHITE,
        "bounces": false,
        "editStyle": constants.SEGUI_EDITING_STYLE_SWIPE
    });
	


    segPopupPreviewbox.add();
    popupBottomPreview.add(segPopupPreview);
};

function hdrBottomPopupFP() {
    var button1039885914163844 = new kony.ui.Button({
        "id": "button1039885914163844",
        "isVisible": true,
        "text": "To Top",
        "skin": "popSwitchButton",
        "focusSkin": "popSwitchButtonFocus",
		"onClick": function(eventobject) {
			popupBottomPreview.dismiss();
			var currentfrm = kony.application.getCurrentForm();
            var context_leftSwipe;
            if(kony.os.deviceInfo().name == 'android'){
                context_leftSwipe = {
                    "anchor": "top",
                    "sizetoanchorwidth": false
                };
            } else {
                context_leftSwipe = {
                    "widget": currentfrm,
                    "anchor": "top",
                    "sizetoanchorwidth": false
                };
            }
			popupTopPreview.setContext(context_leftSwipe);
			popupTopPreview.show();
        }
    }, {
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
        "vExpand": false,
        "hExpand": false,		
        "padding": [4, 4, 4, 4],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "paddingInPixel": false,
        "containerWeight": 23
    }, {
        "glowEffect": false,
        "showProgressIndicator": true
    });
    var label1367604859562 = new kony.ui.Label({
        "id": "label1367604859562",
        "isVisible": true,
        "text": "FORM NOTES",
        "skin": "notesPopTitle"
    }, {
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
        "vExpand": false,
        "hExpand": true,
        "padding": [1, 1, 1, 1],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "paddingInPixel": false,
        "containerWeight": 45
    }, {
        "wrapping": constants.WIDGET_TEXT_WORD_WRAP
    });
    var btnEditDone = new kony.ui.Button({
        "id": "btnEditDone",
        "isVisible": true,
        "text": "Edit",
        "skin" : "sknbtnEdit",
        "focusSkin" : "sknbtnEdit",
		"onClick": btnEditDoneBottomHdrCallback
    }, {
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
        "vExpand": false,
        "hExpand": false,
        "margin": [0, 0, 1, 0],
        "marginInPixel": true,
        "padding" : [4, 4, 4, 4],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "paddingInPixel": false,
        "containerWeight": 19
    }, {
        "glowEffect": false,
        "showProgressIndicator": true
    });
    var button1039885914163836 = new kony.ui.Button({
        "id": "button1039885914163836",
        "isVisible": true,
        "text": "X",
        "skin": "popCloseButton",
        "focusSkin": "popCloseButtonFocus",
		"onClick": function(eventobject) {
			popupBottomPreview.dismiss();
        }
    }, {
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
        "vExpand": false,
        "hExpand": true,
        "margin": [1, 1, 1, 1],
        "marginInPixel": true,
        "padding" : [4, 4, 4, 4],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "paddingInPixel": false,
        "containerWeight": 13
    }, {
        "glowEffect": false,
        "showProgressIndicator": true
    });
    hbxpopupBottomHDRPreview = new kony.ui.Box({
        "id": "hbxpopupBottomHDRPreview",
        "isVisible": true,
        "skin": "popNotesTitleHbox",
        "orientation": constants.BOX_LAYOUT_HORIZONTAL,
        "position" : constants.BOX_POSITION_AS_NORMAL
    }, {
        "containerWeight": 11,
        "percent": true,
		"padding": [0, 0, 0, 0],
        "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
        "vExpand": false,
        "layoutType": constants.CONTAINER_LAYOUT_BOX
    }, {});
    hbxpopupBottomHDRPreview.add(
    button1039885914163844, label1367604859562, btnEditDone, button1039885914163836);
}


function hdrTopPopupFP() {
    var button1039885914163844 = new kony.ui.Button({
        "id": "button1039885914163844",
        "isVisible": true,
        "text": "To Bottom",
        "skin": "popSwitchButton",
        "focusSkin": "popSwitchButtonFocus",
		"onClick": function(eventobject) {
            popupTopPreview.dismiss();
			popupBottomPreview.show();
        }
    }, {
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
        "vExpand": false,
        "hExpand": false,
        "padding": [4, 4, 4, 4],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "paddingInPixel": false,
        "containerWeight": 33
    }, {
        "glowEffect": false,
        "showProgressIndicator": true
    });
    var label1367604859562 = new kony.ui.Label({
        "id": "label1367604859562",
        "isVisible": true,
        "text": "FORM NOTES",
        "skin": "notesPopTitle"
    }, {
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
        "vExpand": false,
        "hExpand": true,
        "padding": [1, 1, 1, 1],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "paddingInPixel": false,
        "containerWeight": 35
    }, {
        "wrapping": constants.WIDGET_TEXT_WORD_WRAP
    });
    var btnEditDone = new kony.ui.Button({
        "id": "btnEditDone",
        "isVisible": true,
        "text": "Edit",
        "skin" : "sknbtnEdit",
        "focusSkin" : "sknbtnEdit",
		"onClick": btnEditDoneTopHdrCallback
    }, {
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
        "vExpand": false,
        "hExpand": false,
        "margin": [0, 0, 1, 0],
        "marginInPixel": true,
        "padding" : [4, 4, 4, 4],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "paddingInPixel": false,
        "containerWeight": 19
    }, {
        "glowEffect": false,
        "showProgressIndicator": true
    });
    var button1039885914163836 = new kony.ui.Button({
        "id": "button1039885914163836",
        "isVisible": true,
        "text": "X",
        "skin": "popCloseButton",
        "focusSkin": "popCloseButtonFocus",
		"onClick": function(eventobject) {
			popupTopPreview.dismiss();
        }
    }, {
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
        "vExpand": false,
        "hExpand": true,		
        "margin": [1, 1, 1, 1],
        "marginInPixel": true,
        "padding" : [4, 4, 4, 4],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "paddingInPixel": false,
        "containerWeight": 13
    }, {
        "glowEffect": false,
        "showProgressIndicator": true
    });
    hbxpopupTopHDRPreview = new kony.ui.Box({
        "id": "hbxpopupTopHDRPreview",
        "isVisible": true,
        "skin": "popNotesTitleHbox",
        "orientation": constants.BOX_LAYOUT_HORIZONTAL,
        "position" : constants.BOX_POSITION_AS_NORMAL
    }, {
        "containerWeight": 11,
        "percent": true,
		"padding": [0, 2, 0, 2],
        "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
        "vExpand": false,
        "layoutType": constants.CONTAINER_LAYOUT_BOX
    }, {});
    hbxpopupTopHDRPreview.add(
    button1039885914163844, label1367604859562, btnEditDone, button1039885914163836);
}
