function MyAlert() {
    // Used https://www.youtube.com/watch?v=-RLE2Q7OzME as guide
    var result = false;
    var inputText = null;
    var isPaused = false;

    // Function that shows the overlay and the dialog
    this.render = function(){
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
    // Function that alerts the user with paramter txt
    this.alert = function (txt) {
        this.render();
        document.getElementById('dialogHead').innerHTML = "Alert!";
        document.getElementById('dialogBody').innerHTML = txt;
        var button = '<button onclick="Alert.hide()">OK</button>';
        document.getElementById('dialogFoot').innerHTML = button;



    }
    // Hides the dialog from the user
    this.hide = function () {
        var dialogOverlay = document.getElementById("dialogOverlay");
        var dialogBox = document.getElementById("dialogBox");

        dialogBox.style.display = "none";
        dialogOverlay.style.display = "none";

    }
    // Function that asks user for confirmation
    this.confirmation = function(txt, yesCallback, noCallBack){
        this.render();
        document.getElementById('dialogHead').innerHTML = "Confirmation";
        document.getElementById('dialogBody').innerHTML = txt;
        var button = '<button id="buttonYes" ">Confirm</button>';
        button = button + '<button id="buttonNo">Deny</button>';
        document.getElementById('dialogFoot').innerHTML = button;
        document.getElementById('buttonYes').onclick = function() {
            new MyAlert().hide();
            yesCallback();
        }
        document.getElementById('buttonNo').onclick = function () {
            new MyAlert().hide();
            noCallBack();
        }

    }
    this.prompt = function(txt, def, yesCallBack){
        this.render();

        document.getElementById('dialogHead').innerHTML = txt;
        if (def == null){
            def = '';
        }
        var input = '<input id="prompt_value" value="'+def+'">';
        document.getElementById('dialogBody').innerHTML = input;
        var button = '<button id = "prompt_confirm">Confirm</button>';
        button = button + '<button id = "prompt_deny">Deny</button>';
        document.getElementById('dialogFoot').innerHTML = button;
        document.getElementById('prompt_confirm').onclick = function () {
            new MyAlert().hide();
            yesCallBack();
        
        }
        document.getElementById('prompt_deny').onclick = function () {
            new MyAlert().hide();
            document.getElementById('prompt_value').value = null;
            yesCallBack();
        }
        
        if(result){
            inputText = document.getElementById('prompt_value').innerHTML;
            return inputText;
        }
        return null;

    }
}