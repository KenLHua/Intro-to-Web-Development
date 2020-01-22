var document = window.document;

function login() {
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;
    
    var url = "http://fa19server.appspot.com/api/Users/login";
    var okay = true;
    var userBody = '';
    userBody = userBody.concat("username=", username);
    var passBody = '';
    passBody = passBody.concat("password=", password);
    var data = '';
    data = data.concat(userBody, "&", passBody);
    
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
            okay = false;
        }
        return response.json();
    })
    .then(function(myJson) {
        if (!okay) {
            var errText = myJson.error.message;
            alert(errText);
        }
        else {
            window.localStorage.setItem('accessToken', myJson.id);
            window.location.href = 'xmaswishlist.html';
        }
        //console.log(myJson);
    });
}

function checkAccess() {
    
    if(window.localStorage.getItem('accessToken') == null) {
        
    }
    else {
        window.location.href = 'xmaswishlist.html';
    }
    
}