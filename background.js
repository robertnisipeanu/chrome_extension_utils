var copyData;
var sendFinalResponse;
var url;


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type !== "copy_verify")
        return;

    // wait 5 seconds to make sure data is found in the clipboard
    setTimeout(() => {
        var pasteLocation = document.getElementById("pastelocation");
        pasteLocation.focus();

        sendFinalResponse = sendResponse;
        url = request.url;

        document.execCommand("paste");
    }, 5);
});



document.addEventListener("paste", function(event) {

    var text = event.clipboardData.getData('text/plain');
    // var html = event.clipboardData.getData('text/html');

    if(sendFinalResponse)
        copyData = text;

    if(sendFinalResponse && copyData === "" && url){
        copyToClipboard(url);
        sendFinalResponse({status: 'success'});
    }
    else
        sendFinalResponse({status: 'text-selected'});

    copyData = "";
    sendFinalResponse = undefined;
});

function copyToClipboard(url){
    // Timeout for not throwing a chrome error (it thinks we are doing a copy-paste loop and blocks the command otherwise)
    setTimeout(() => {
        var copyLocation = document.getElementById("copylocation");
        copyLocation.innerHTML = url;
        copyLocation.select();
        document.execCommand("copy");
    }, 0);
}
