function Dialog() {
    // Used https://www.youtube.com/watch?v=-RLE2Q7OzME as guide
    var result = false;
    var inputText = null;
    var isPaused = false;

    this.render = function () {
        var pageHeight = window.innerHeight;
        var dialogOverlay = document.getElementById("dialogOverlay");
        var dialogBox = document.getElementById("dialogBox");
        dialogOverlay.style.display = "block";
        dialogOverlay.style.height = pageHeight + "px";
        dialogBox.style.margin = "auto";
        dialogBox.style.position = "absolute";
        dialogBox.style.left = "0px";
        dialogBox.style.top = "100px";
        dialogBox.style.right = "0px";
        dialogBox.style.display = "block";
    }
    this.hide = function () {
        var dialogOverlay = document.getElementById("dialogOverlay");
        var dialogBox = document.getElementById("dialogBox");
        dialogBox.style.display = "none";
        dialogOverlay.style.display = "none";

    }
    this.prompt = function (callBack) {
        this.render();
        //var button = '<button id="save" onclick="safeprompt(null)">Save</button>' + '<button id="cancel" onclick="Dialog.hide()">Cancel</button>';
        //document.getElementById('dialogFoot').innerHTML = button;
        document.getElementById('save').onclick = callBack();

    }
}