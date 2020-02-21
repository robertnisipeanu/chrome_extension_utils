
document.onkeydown = function(event) {

    if(event.ctrlKey && event.keyCode == 67){
        event.preventDefault();

        navigator.clipboard.writeText("").then(() => {
            document.execCommand("copy");
        });
    }
};

document.addEventListener("copy", function(e) {

    chrome.runtime.sendMessage({
        type: "copy_verify",
        url: window.location.href
    });

});
