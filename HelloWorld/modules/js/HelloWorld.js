/**
****************************************************************
*	Name    : searchByHelpCategory
*	Author  : Kony Solutions
*	Purpose : Displays the popup in all forms
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