
$(document).ready(function () {

    

//display speak message 
eel.expose(DisplayMessage)
function DisplayMessage(message){

    $(".siri-message li:first").text(message);
    $('.siri-message').textillate('start')
}
    

//display hood
eel.expose(ShowHood)
function ShowHood(){
    $("#oval").attr("hidden",false);
    $("#siriwave").attr("hidden", true);
}


});

