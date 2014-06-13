/**
****************************************************************
*	Name    : showPopup
*	Author  : Kony Inc.
*	Purpose : Displays the popup
****************************************************************
*/
function showPopup()
{
	kony.ui.Alert({message: "Hello World!",
	               alertType: constants.ALERT_TYPE_INFO,
	               yesLabel:"Close"}, 
	               {});//usage: kony.ui.Alert(basicProperties,layoutProperties,platformSpecificProperties);
	return;				   
}