var copyData = [];
var sendFinalResponse;
var url;
var mode;


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type !== "copy")
        return;


    var pasteLocation = document.getElementById("pastelocation");
    pasteLocation.focus();

    mode = 0;
    document.execCommand("paste");

    sendResponse({status: 'success'});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type !== "copy_verify")
        return;
    
    var pasteLocation = document.getElementById("pastelocation");
    pasteLocation.focus();

    sendFinalResponse = sendResponse;
    url = request.url;
    mode = 1;
    document.execCommand("paste");
});



document.addEventListener("paste", function(event) {
    var evt = event;

    var text = evt.clipboardData.getData('text/plain');
    var html = evt.clipboardData.getData('text/html');

    copyData[mode] = text;
    console.log(copyData);

    if(mode == 1 && copyData[0] === copyData[1] && sendFinalResponse && url){
        copyToClipboard(url);
        sendFinalResponse({status: 'success'});
    }

    sendFinalResponse = undefined;
});

function copyToClipboard(url){
    setTimeout(() => {
        var copyLocation = document.getElementById("copylocation");
        copyLocation.innerHTML = url;
        copyLocation.select();
        document.execCommand("copy");
        console.log("test", copyLocation.innerHTML);
    }, 0);
}
