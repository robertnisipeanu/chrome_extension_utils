
document.addEventListener("copy", function(e) {
    if(!getSelectionText()){
        e.clipboardData.setData("text/plain", window.location.href);
        e.preventDefault();
    }
});


function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}