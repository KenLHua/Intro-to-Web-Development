//The arrays to populate the page.

var itemNames = [];
var categories = [];
var prices = [];
var comments = [];
var images = [];
var itemDatas = []

var websiteBase = 'http://127.0.0.1:5500/public/'
var sessionId = 0;
var wishList = null;



function checkLogin(){
    sessionId = window.localStorage.getItem('accessToken');
    refreshItemsParaFirst();
}

function logout(){
    var url = 'http://fa19server.appspot.com/api/Users/logout?access_token=' + sessionId
    xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function(){
        window.localStorage.removeItem('accessToken');
        window.location.href = '../public/login.html';
    }
    xhr.send(null);
}



//The function to refresh the list of Items.
// HTTP
function refreshItemsPara() {

    //Set up the list
    var i;
    table = document.getElementById("itemTableBody")

    
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            wishList = JSON.parse(xhr.responseText).wishItems
            if (wishList.length > 0) {
                document.getElementById("listPara").style.display = "none";
            }
            else{
                document.getElementById("listPara").style.display = "block";
            }
            while (table.rows.length > 0) {
                table.deleteRow(0)
            }
            for (i = 0; i < wishList.length; i++) {
                row = document.createElement('tr');
                row.index = i;
                itemData = [document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), 0]
                row.className = 'item';
                itemData[0].innerHTML = wishList[i].item
                itemData[1].innerHTML = wishList[i].category
                itemData[2].innerHTML = wishList[i].price
                itemData[3].innerHTML = wishList[i].comment
                itemData[4].innerHTML = wishList[i].image
                itemData[5] = wishList[i].id
                itemDatas[i] = itemData;
                row.setAttribute("onclick", "editItemPrompt(" + i + ")")
                for (var j = 0; j < 3; j++)
                    row.appendChild(itemData[j]);
                document.getElementById("itemTableBody").appendChild(row);

            }

        }
    }
    xhr.open("GET", "http://fa19server.appspot.com/api/wishlists/myWishlist?access_token=" + sessionId, true);
    xhr.send(null)


}

//Retrieves wishlist from database. For first time page is refreshed/ body is loaded.
// HTTP
function refreshItemsParaFirst() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            wishList = JSON.parse(xhr.responseText).wishItems
            if (wishList.length > 0) {
                document.getElementById("listPara").style.display = "none";
            }
            else {
                document.getElementById("listPara").style.display = "block";
            }
            for (i = 0; i < wishList.length; i++) {
                row = document.createElement('tr');
                row.index = i;
                itemData = [document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td')]
                row.className = 'item';
                itemData[0].innerHTML = wishList[i].item
                itemData[1].innerHTML = wishList[i].category
                itemData[2].innerHTML = wishList[i].price
                itemData[3].innerHTML = wishList[i].comment
                itemData[4].innerHTML = wishList[i].image
                itemData[5] = wishList[i].id
                itemDatas[i] = itemData;
                row.setAttribute("onclick", "editItemPrompt(" + i + ")")
                for (var j = 0; j < 3; j++)
                    row.appendChild(itemData[j]);
                document.getElementById("itemTableBody").appendChild(row);

            }
            
        }
    }
    xhr.open("GET", "http://fa19server.appspot.com/api/wishlists/myWishlist?access_token="+sessionId, true);
    xhr.send(null)

}



//Pull up the add prompt
function addItemPrompt() {
    var addBox = document.getElementById("addBox")
    addBox.style.display = "block";
    addBox.style.display = "block";
    addBox.style.margin = "auto";
    addBox.style.position = "absolute";
    addBox.style.top = "200px";
    addBox.style.left = "0px";
    addBox.style.right = "0px";
    document.getElementById("over").style.display = "block";
}

//Add our Item to the list. Also, set the items in storage. Finally refresh the list.
// HTTP
function addItem() {
    // Get elements and put them into variables
    var itemName = DOMPurify.sanitize(document.getElementById("addItem").value);
    var category = document.getElementById("addCategory").value;
    var price = document.getElementById("addPrice").value;
    var image = document.getElementById("addImage").value;
    var comment = document.getElementById("addComment").value;
    if(image == ''){
        image = websiteBase + 'media/noimage.jpg'
    }

    var url = 'http://fa19server.appspot.com/api/wishlists?access_token='+sessionId

    // Store the data
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            refreshItemsPara();
        }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('item=' + itemName + '&price=' + price+'&category='+category+'&image='+image+'&comment='+comment)
    
    // Reset values to the default values
    document.getElementById("over").style.display = "none";
    document.getElementById('imageDiv').style.display = "none";
    document.getElementById("upload_widget").style.display = "inline"

    document.getElementById("addItem").value = '';
    document.getElementById("addPrice").value = '0';
    document.getElementById("addCategory").value = 'Other';
    document.getElementById("addImage").value = websiteBase + 'media/noimage.jpg';
    document.getElementById("addComment").value = '';
    addBox.style.display = "none";
}

//Pull up the edit prompt WITH ORIGINAL FIELDS ALREADY POPULATED.
function editItemPrompt(i) {
    var editBox = document.getElementById("editBox")

    // Item
    document.getElementById("editItem").value = wishList[i].item;
    document.getElementById("editPrice").value = wishList[i].price;
    document.getElementById("editCategory").value = wishList[i].category;
    document.getElementById("editImage").src = wishList[i].image;
    if (wishList[i].image == websiteBase+'media/noimage.jpg'){
        document.getElementById("edit_clear_button").style.display = "none";
        document.getElementById("edit_upload_widget").style.display = "block";
    }
    else{
        document.getElementById("edit_clear_button").style.display = "block";
        document.getElementById("edit_upload_widget").style.display = "none";
    }

    document.getElementById("editComment").value = wishList[i].comment;
    document.getElementById("edit_clear_button").setAttribute("onclick", "clearImage(" + i + ")");
    document.getElementById("editSave").setAttribute("onclick", "editItem(" + i + ")");
    document.getElementById("editDelete").setAttribute("onclick", "deleteItemPrompt(" + i + ")");

    editBox.style.display = "block";
    editBox.style.margin = "auto";
    editBox.style.position = "absolute";
    editBox.style.top = "200px";
    editBox.style.left = "0px";
    editBox.style.right = "0px";

    editBox.style.display = "block";
    document.getElementById("over").style.display = "block";
}

function clearImage(i) {
    document.getElementById("editImage").src = websiteBase + "media/noimage.jpg"
    document.getElementById("edit_clear_button").style.display = "none";
    document.getElementById("edit_upload_widget").style.display = "block";
}

//Edit our Item in the list. Also, set the items in storage. Finally refresh the list.
// HTTP
function editItem(i) {
    var item = DOMPurify.sanitize(document.getElementById("editItem").value);
    var price = document.getElementById("editPrice").value;
    var category = document.getElementById("editCategory").value;
    var image = document.getElementById("editImage").src;
    var itemId = itemDatas[i][5]

    var comment = DOMPurify.sanitize(document.getElementById("editComment").value);

    var xhr = new XMLHttpRequest();
    var url = 'http://fa19server.appspot.com/api/wishlists/' + itemId + "/"+ 'replace?access_token=' + sessionId;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            refreshItemsPara();
        }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('item=' + item + '&price=' + price + '&category=' + category + '&image=' + image + '&comment=' + comment)


    document.getElementById("editBox").style.display = "none";
    document.getElementById("over").style.display = "none";
}


//Pull up deletion box
function deleteItemPrompt(i) {
    document.getElementById("editBox").style.zIndex = '999';
    var pageHeight = window.innerHeight;
    document.getElementById("deleteButton").setAttribute("onclick", "deleteItem(" + i + ")");
    document.getElementById("deleteBox").style.display = "block";
    document.getElementById("deleteBox").style.margin = "auto";
    document.getElementById("deleteBox").style.position = "absolute";
    document.getElementById("deleteBox").style.top = "200px";
    document.getElementById("deleteBox").style.left = "0px";
    document.getElementById("deleteBox").style.right = "0px";
    document.getElementById("over").style.display = "block";
}

//Delete the Item from our arrays, and update our storage.
// HTTP
function deleteItem(i) {
    var xhr = new XMLHttpRequest();
    var itemId = itemDatas[i][5]
    var url = 'http://fa19server.appspot.com/api/wishlists/' + itemId+ '/' + '?access_token=' + sessionId
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            refreshItemsPara();
        }
    }
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(null)

    document.getElementById("deleteBox").style.display = "none";
    document.getElementById("editBox").style.display = "none";
    document.getElementById("editBox").style.zIndex = '1001';
    document.getElementById("over").style.display = "none";

}

//What to do on cancel. Just resetting the boxes. Hiding prompts.
function cancel() {
    document.getElementById("over").style.display = "none";
    document.getElementById('imageDiv').style.display = "none";
    document.getElementById("addCategory").value = 'Other';
    document.getElementById("upload_widget").style.display = 'initial'
    document.getElementById("addItem").value = '';
    document.getElementById("addPrice").value = 0;
    document.getElementById("addImage").value = websiteBase+'media/noimage.jpg';
    document.getElementById("addComment").value = '';

    document.getElementById("editBox").style.zIndex = '1001';
    document.getElementById("deleteText").innerHTML = "Delete Item?"
    
    var i;
    for (i = 0; i < document.getElementsByClassName("box").length; i++) {
        document.getElementsByClassName("box")[i].style.display = "none";
    }
}

function clearStorage() {
    var i = 0
    var requests = []
    var url = null
    for (i = 0; i < itemDatas.length-1; i++){
        requests.push(new XMLHttpRequest())
        url = 'http://fa19server.appspot.com/api/wishlists/' + itemDatas[i][5] + '/' + '?access_token=' + sessionId
        requests[i].open("DELETE", url, true);
        requests[i].setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        requests[i].send(null)
    }
    var func = function () {
        if (request[0].readyState == XMLHttpRequest.DONE) {
            refreshItemsPara();
        }
    }

    var lastRequest = new XMLHttpRequest()
    lastRequest.onreadystatechange = function(){
        if (lastRequest.readyState == XMLHttpRequest.DONE) {
            refreshItemsPara();
        }
    };
    url = 'http://fa19server.appspot.com/api/wishlists/' + itemDatas[itemDatas.length-1][5] + '/' + '?access_token=' + sessionId
    lastRequest.open("DELETE", url, true);
    lastRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    lastRequest.send(null)
    document.getElementById("deleteBox").style.display = "none";
    document.getElementById("over").style.display = "none";
    
}
function clearStoragePrompt(){
    document.getElementById("editBox").style.zIndex = '999';
    var pageHeight = window.innerHeight;
    document.getElementById("deleteText").innerHTML = "Are you sure you want to delete everything?"
    document.getElementById("deleteBox").style.display = "block";
    document.getElementById("deleteBox").style.margin = "auto";
    document.getElementById("deleteBox").style.position = "absolute";
    document.getElementById("deleteBox").style.top = "200px";
    document.getElementById("deleteBox").style.left = "0px";
    document.getElementById("deleteBox").style.right = "0px";
    document.getElementById("over").style.display = "block";
    document.getElementById("deleteButton").onclick = function(){clearStorage()}
}