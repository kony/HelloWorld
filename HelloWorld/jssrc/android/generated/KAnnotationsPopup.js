
	var project_params = null;
	var annotationDataPREVIEW = null;
	var doEdit = false;
	var editSelectedItem = null;
	/*
	* project details params [project_guid, channel etc.].
	*/	
	var __projectDetailsParams = function(ann_id){
		
		var proj_details = kony.ds.read("kv_project");
		var params = {};
		if(proj_details != null && proj_details.length > 0)
		{
			params.proj_guid = proj_details[0]["project_guid"];
            params.acc_guid = proj_details[0]["account_guid"];
			params.annotation_id = ann_id;
            params.widget_id = ann_id;
			params.channel = proj_details[0]["channel"];
		}
		kony.print("@@@project_params: "+JSON.stringify(params));
		
		return params;
	}

	/*
	* active comments data for segment.
	*/
	var segmentData = function(annotationData){
		
		var seg_data = [];
        var widgetId = project_params.widget_id;
		if(annotationData == null || annotationData["comments"][widgetId] == null) return seg_data;
		
		//for(var i=0; i < annotationData["comments"].length; i++)
        
		for(var key in annotationData["comments"][widgetId])
		{
            var comments = annotationData["comments"][widgetId];
			if(comments[key]['active'] == 1)
			{
                var lmt = comments[key].lastModifiedTime;
                lmt = new Date(lmt);
               // var days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
                var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                var dn = "AM";
                var hour = lmt.getHours();
                var minutes = lmt.getMinutes();
                if(hour > 12){
                    hour = hour - 12;
                    dn = "PM";
                }
                if(hour == 0){
                    hour = 12;
                }
                if(minutes <= 9){
                    minutes = "0"+minutes;
                }
                var dateString = months[lmt.getMonth()] + " " + lmt.getDate() + ", " + hour + ":"+ minutes + " " + dn;
                comments[key].formattedlmt = dateString;
				seg_data.push(comments[key]);
			}
		}
		function compare(a,b) {
          if (a.lastModifiedTime < b.lastModifiedTime)
             return -1;
          if (a.lastModifiedTime > b.lastModifiedTime)
            return 1;
          return 0;
        }

        seg_data.sort(compare);
		return seg_data;
	}
	
	/*
	*  set segment data for popupBottomPreview.
	*/
	var setSegmentData_popupBottomPreview = function(data){
		
		annotationDataPREVIEW = data;
		var annLength = data.length;
			
		switch(annLength)
		{
			case 0:
				popupHeightFP = 20;
				break;						
			case 1:
				popupHeightFP = 40;
				break;
			case 2:
				popupHeightFP = 40;
				break;
			default:
				popupHeightFP = 50;
		}
		
        var context_leftSwipe;
        if(kony.os.deviceInfo().name == 'android'){
            context_leftSwipe = {
                "anchor": "bottom",
                "sizetoanchorwidth": false
            };
        } else {
            context_leftSwipe = {
                "widget": currentfrmFP,
                "anchor": "bottom",
                "sizetoanchorwidth": false
            };
        }
        var visible = false;
        if(popupBottomPreview.headers[0].btnEditDone.text == 'Done'){
            visible = true;
        } else {
            visible = false;
        }
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
		popupBottomPreview.setContext(context_leftSwipe);
		popupBottomPreview.segPopupPreview && popupBottomPreview.segPopupPreview.setData(data);
		popupBottomPreview.containerHeight = popupHeightFP;
		
	}
    
    /*
	*  set segment data for popupBottomPreview.
	*/
	var setSegmentData_popupTopPreview = function(data){
		
		annotationDataPREVIEW = data;
		var annLength = data.length;
			
		switch(annLength)
		{
			case 0:
				popupHeightFP = 20;
				break;						
			case 1:
				popupHeightFP = 40;
				break;
			case 2:
				popupHeightFP = 40;
				break;
			default:
				popupHeightFP = 50;
		}
		
		var context_leftSwipe;
        if(kony.os.deviceInfo().name == 'android'){
            context_leftSwipe = {
                "anchor": "top",
                "sizetoanchorwidth": false
            };
        } else {
            context_leftSwipe = {
                "widget": currentfrmFP,
                "anchor": "top",
                "sizetoanchorwidth": false
            };
        }
        
        var visible = false;
        if(popupTopPreview.footers[0].btnEditDone.text == 'Done'){
            visible = true;
        } else {
            visible = false;
        }
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
		
		popupTopPreview.setContext(context_leftSwipe);
		popupTopPreview.segPopupPreview && popupTopPreview.segPopupPreview.setData(data);
		popupTopPreview.containerHeight = popupHeightFP;
		
	}

	/*
	*  read annotation from DataStore
	*/	
	var __annotationData = function(){
        
		var annotations = fpas.readAnnotationFromDataStore(project_params);
		//kony.print("@@@@annotationData: "+JSON.stringify(annotations));
		
		return segmentData(annotations);
	}



	var __showPopupWidBottomContext = function(){
            var segment_data = __annotationData();
			//kony.print("@@@@segmentData: "+JSON.stringify(segment_data));
			setSegmentData_popupBottomPreview(segment_data);
            setSegmentData_popupTopPreview(segment_data);
			popupBottomPreview.show();
	}
    
    var __refreshSegmentData = function(){
            var segment_data = __annotationData();
			//kony.print("@@@@segmentData: "+JSON.stringify(segment_data));
			setSegmentData_popupBottomPreview(segment_data);
            setSegmentData_popupTopPreview(segment_data);
	}
	
	/*
	* button onclick callback for add or edit comment  
	*/
	var __addBtnOnclick = function(){
			
			if(!doEdit){
				__addAppendCommentFP();
			}else{
					var selectedItem = editSelectedItem;
					var annotation = selectedItem[0]; 
					var comment = hbxpopupTxtbxTemplate.textboxAddFP.text && hbxpopupTxtbxTemplate.textboxAddFP.text.trim();
					if(selectedItem != null && selectedItem.length > 0)
					{
                        if(comment == null || comment == "") {
                            hbxpopupTxtbxTemplate.textboxAddFP.text = null;
                            doEdit = false;
                            return;
                        }
						annotation.comment = comment;
						delete annotation.template;
						fpas.updateCommentTODS(project_params, annotation, function(result){
										if(result['status'] == 400)
										{
											var seg_data = segmentData(result['data']);
                                           // kony.print("SEG DATA :" + JSON.stringify(seg_data));
											setSegmentData_popupBottomPreview(seg_data);
                                            setSegmentData_popupTopPreview(seg_data);
											syncWithCloudDBUtil(function(res){
                                             if(res.status == 200){
                                                 kony.print("Successfully synced with DB.");
                                                 __refreshSegmentData();
                                             }
                                            hbxpopupTxtbxTemplate.textboxAddFP.text = null;
                                            doEdit = false;
                                            });
										}else kony.print("Error: "+result['err']);
									});	
					}					
			}
			
	}
	
	
	/*
	* Add & appends new notes in popup [call addOrAppendAnnotation function] 
	*/
	var __addAppendCommentFP = function(){
		doEdit = false;
		var annotation = {};
		var comment = hbxpopupTxtbxTemplate.textboxAddFP.text && hbxpopupTxtbxTemplate.textboxAddFP.text.trim();
		if(comment == null || comment == "") return;
		annotation.comment = comment;
		fpas.addOrAppendAnnotationTODS(project_params, annotation, function(result){
						if(result['status'] == 400)
						{
							//kony.print("@@@@@@result['data']: "+JSON.stringify(result['data']));
							var seg_data = segmentData(result['data']);
							setSegmentData_popupBottomPreview(seg_data);
                            setSegmentData_popupTopPreview(seg_data);
							syncWithCloudDBUtil(function(res){
                                             if(res.status == 200){
                                                 kony.print("Successfully synced with DB.");
                                                __refreshSegmentData();
                                             }
                                            });
                            hbxpopupTxtbxTemplate.textboxAddFP.text = null;
						}else kony.print("Error: "+result['err']);
					});
				
	}
	
	/*
	* delete notes in popup [call addOrAppendAnnotation function] 
	*/

	var __deleteCommentFP = function(eventobject, editmode, sectionNumber, rowNumber){
		var rowIndex = (popupBottomPreview.segPopupPreview.selectedIndex && popupBottomPreview.segPopupPreview.selectedIndex[1]) || (popupTopPreview.segPopupPreview.selectedIndex && popupTopPreview.segPopupPreview.selectedIndex[1]);
		var selectedItem = popupBottomPreview.segPopupPreview.selectedItems || popupTopPreview.segPopupPreview.selectedItems;
		if(selectedItem != null && selectedItem.length > 0)
		{
			var comment = selectedItem[0];
            var kvsession = kony.ds.read("kvsession")[0];
            var userDetails = kvsession['userDetails'];
            if(comment.createdById == userDetails['user_guid']){
                delete comment.template;
                kony.print("@@@@@comment: "+JSON.stringify(comment));
                fpas.deleteCommentFROMDS(project_params, comment, function(result){
                            if(result['status'] == 400)
                            {
                               // kony.print("@@@@@delete: "+JSON.stringify(result['data']));
                                var seg_data = segmentData(result['data']);
                                setSegmentData_popupBottomPreview(seg_data);
                                setSegmentData_popupTopPreview(seg_data);
                                syncWithCloudDBUtil(function(res){
                                                 if(res.status == 200){
                                                     kony.print("Successfully synced with DB.");
                                                     __refreshSegmentData();
                                                 }
                                                });
                            }else kony.print("Error: "+result['err']);
                        });
            }
		}
	}
	
	/*
	* edit notes in popup [call addOrAppendAnnotation function] 
	*/	
	var __editCommentFP = function(){
		var rowIndex = (popupBottomPreview.segPopupPreview.selectedIndex && popupBottomPreview.segPopupPreview.selectedIndex[1]) || (popupTopPreview.segPopupPreview.selectedIndex && popupTopPreview.segPopupPreview.selectedIndex[1]);
		var selectedItem = popupBottomPreview.segPopupPreview.selectedItems || popupTopPreview.segPopupPreview.selectedItems;
        if(selectedItem != null && selectedItem.length > 0)
            {
            var annotation = selectedItem[0];
            var kvsession = kony.ds.read("kvsession")[0];
            var userDetails = kvsession['userDetails'];
            if(annotation.createdById == userDetails['user_guid']){
                doEdit = true;
                hbxpopupTxtbxTemplate.textboxAddFP.text = annotation.comment;
                editSelectedItem = selectedItem;
            }
        }
	}

    
	var syncWithCloudDBUtil = function(callback){
		var segment_data = [];
		fpnotes.updateNotesToRemoteDB(project_params,function(result){
            if(result.status == 200){
                fpnotes.fetchNotesFromRemoteDB(project_params,function (fetchresult){
                    if(fetchresult.status == 200 && fetchresult.data != null){
                        segment_data = segmentData(fetchresult.data);
                    } else {
                        var annotation = fpas.readAnnotationFromDataStore(project_params);
                        segment_data = segmentData(annotation);
                    }
                    setSegmentData_popupBottomPreview(segment_data);
                    setSegmentData_popupTopPreview(segment_data);
                    callback({status:200});
                });
            } else {
                callback({status:200});
            }
		});
	}
	
	
	var segOptionsOnRowClick = function(eventobject, sectionNumber, rowNumber){
		
        currentfrmFP = kony.application.getCurrentForm();
        if(currentfrmFP == null || currentfrmFP == undefined) return;
        if(currentfrmFP.info == null || currentfrmFP.info == undefined) return;			
        ann_id = currentfrmFP.info.kuid;
        project_params = __projectDetailsParams(ann_id);
        
        var selectedItem = popupOptionsPreview.segPopupFPreview.selectedItems;
        var rowText = selectedItem[0].notesOptions;
        
		switch(rowText){
		
		// Create Notes
			case "Create Note":
				doEdit = false;
                popupOptionsPreview.dismiss();
                __showPopupWidBottomContext();
                syncWithCloudDBUtil(function(res){
                                            //no matter whether it is synced with remote or not, status will be 200 and this will be executed
                                             if(res.status == 200){
                                                hbxpopupTxtbxTemplate.textboxAddFP.text = "";
                                                __refreshSegmentData();
                                                }
                                            });
				break;

		// View Notes		
			case "View Notes":
                popupOptionsPreview.dismiss();
                __showPopupWidBottomContext();
				syncWithCloudDBUtil(function(res){
                                            //no matter whether it is synced with remote or not, status will be 200 and this will be executed
                                             if(res.status == 200){
                                                hbxpopupTxtbxTemplate.textboxAddFP.text = "";
                                                __refreshSegmentData();
                                              }
                                            });			
				break;
		
		// Exit app:
			case "Exit App":
				popupOptionsPreview.dismiss();
				kony.accelerometer.unregisterAccelerationEvents(["shake"]);
				kony.application.removeGestureRecognizerForAllForms(gestureIDForMenuInChildApp);
                kony.application.removeGestureRecognizerForAllForms(gestureIDForTwoFingerSwipe);
				kony.application.launchApplication(null);
				break;
		
		//Dismiss popup:		
			default:
				popupOptionsPreview.dismiss();
				break;
		}
				
	}
	
	
	/*
	* Shake Gesture for notes popup
	*/ 
	
	var onShakeFpApp = function (){
		//alert("Shake called");
	
		var currentfrm = kony.application.getCurrentForm();	
		var context = {
			"widget": currentfrm,
			"anchor": "bottom",
			"sizetoanchorwidth": false
		};
		
 		var optionsData = [];
        if(kony.store.getItem("FP_Type") == "LOCAL") {
            optionsData = [ {"notesOptions":"Exit App"},
                            {"notesOptions":"Dismiss"}];
            popupOptionsPreview.containerHeight = 18;
        } else {
            optionsData = [{"notesOptions":"Create Note"},
                           {"notesOptions":"View Notes"},
                           {"notesOptions":"Exit App"},
                           {"notesOptions":"Dismiss"}];
            popupOptionsPreview.containerHeight = 37;
        }
						
							
		popupOptionsPreview.setContext(context);					
		popupOptionsPreview.segPopupFPreview.setData(optionsData);
		popupOptionsPreview.segPopupFPreview.onRowClick = segOptionsOnRowClick;
		popupTopPreview.dismiss();
		popupBottomPreview.dismiss();
		popupOptionsPreview.show();
	}
	
	
//startup.js file

function apppostappinitFuncPreview() {
		
		__popupTopBottomFP();
		__notesRowtemplate();
        __notesRowtemplateWithDelete();
		//__notesUpdateRowtemplate();	
	
		popupOptionsPreview = new kony.ui.Popup({
			"id": "popupOptionsPreview",
			"title": null,
			"transparencyBehindThePopup": 100,
			"skin": "notesPopBG",
			"isModal": true,
			"addWidgets": addWidgetspopupOptionsFPreview
		}, {
			"padding": [8, 0, 8, 0],
			"containerWeight": 100,
			"containerHeight": 37,
			"containerHeightReference": constants.HEIGHT_BY_DEVICE_REFERENCE,
			"paddingInPixel": false,
			"layoutType": constants.CONTAINER_LAYOUT_BOX
		}, {
			"windowSoftInputMode": constants.POPUP_ADJUST_RESIZE,
			"inTransitionConfig": {
				"animation": 0
			},
			"outTransitionConfig": {
				"animation": 0
			},
			"directChildrenIDs": ["segPopupFPreview"]
		});

    //Registering the 2 finger press gesture event
	var platName = (kony.os.deviceInfo().name).toLowerCase();
	//alert("platName : " + platName);
	var x = {};
	if ( platName == 'windows' || platName == 'windowsphone') {
		x = {
	        fingers: 1,
	        pressDuration: 1
	    };
	} else {
		x = {
	        fingers: 2,
	        pressDuration: 1
	    };
	}
    try {
        gestureIDForMenuInChildApp = kony.application.setGestureRecognizerForAllForms(3, x, function(widgetRef, gestureInfo) {
		if (kony.os.toNumber(gestureInfo["gestureType"]) == 3 && kony.os.toNumber(gestureInfo["gesturesetUpParams"]["pressDuration"]) == 1) {
				kony.print("gestureInfo : " + JSON.stringify(gestureInfo));
                 onShakeFpApp();
            }
        });
    } catch (err) {
        alert(typeof err);
        alert("error in function callbackSingleTapGesture:" + err.message);
    }
    
    //Registering the 2 finger swipe gesture event
	//Checking for Windows as it does not set the 'swipevelocity' value accurately
	var platName = (kony.os.deviceInfo().name).toLowerCase();
	kony.print("platName : " + platName);
	var y = {};
	if ( platName == 'windows' || platName == 'windowsphone') {
		y = {
		fingers: 2,
        swipedistance: 30
		};
	} else {
		y = {
        fingers: 2,
        swipedistance: 30,
        swipevelocity: 60
		};
	}
	
    try {
        gestureIDForTwoFingerSwipe = kony.application.setGestureRecognizerForAllForms(2, y, function(widgetRef, gestureInfo) {
            if (kony.os.toNumber(gestureInfo["gestureType"]) == 2) {
                if (kony.os.toNumber(gestureInfo["swipeDirection"]) == 2) {
                    kony.accelerometer.unregisterAccelerationEvents(["shake"]);
					kony.application.removeGestureRecognizerForAllForms(gestureIDForMenuInChildApp);
                    kony.application.removeGestureRecognizerForAllForms(gestureIDForTwoFingerSwipe);
                    kony.application.launchApplication(null);
                }
            }
        });
    } catch (err) {
        alert(typeof err);
        alert("error in function callbackSingleTapGesture:" + err.message);
    }

    //Registering the shake gesture event
	var events = {shake:onShakeFpApp};
	kony.accelerometer.registerAccelerationEvents(events);
};


	


