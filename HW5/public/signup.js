var document = window.document;

function signupCheck() {
    var username = document.getElementById("usernameInput").value;
    var email = document.getElementById("emailInput").value;
    var password = document.getElementById("passwordInput").value;
    var conPass = document.getElementById("confirmPass").value;
    
    if(password === conPass) {
        signupPost(username, email, password);
    }
    else {
        alert("Passwords do not match!")
    } 
}

function signupPost(username, email, password) {
    var url = "http://fa19server.appspot.com/api/Users";
    var okay = true;
    var userBody = '';
    userBody = userBody.concat("username=", username);
    var emailBody = '';
    emailBody = emailBody.concat("email=", email);
    var passBody = '';
    passBody = passBody.concat("password=", password);
    var data = '';
    data = data.concat(userBody, "&", emailBody, "&", passBody);
    
    //Refrenced primarily from developers.google.com
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        
        body: data
        
    })
    .then(function(response) {
        if (!response.ok) {
            console.log("NOT OKAY");
            okay = false;
        }
        return response.json();
    })
    .then(function(myJson) {
        if (!okay) {
            var errTexts = '';
            var alMessages = myJson.error.details.messages;
            for(var i in alMessages) {
                errTexts = errTexts.concat(i, ": ", alMessages[i], "\n")
            }
            alert(errTexts);
        }
        else {
            window.location.href = '../public/login.html';
        }
        //console.log(myJson);
    });
    
}