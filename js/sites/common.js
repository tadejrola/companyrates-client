function getStorageItems() {
    let key = sessionStorage.getItem("SessionKey");
    let validTo = sessionStorage.getItem("ValidTo");
    let userId = sessionStorage.getItem("UserID");
    let datetime = new Date(validTo);
    let obj = {
        SessionKey: key,
        ValidTo: datetime,
        UserID: userId
    }
    return obj;
}

function changeLocationIfLoggedIn() {
    let items = getStorageItems();

    if (items.ValidTo > new Date()) {
        window.location = "Profile.html";
    }
}

function changeLocationIfNotLoggedIn() {
    let items = getStorageItems();
    if (items.ValidTo < new Date() || items.SessionKey == undefined) {
        window.location = "Login.html";
    }
}

function showLoggedInUser() {
    let items = getStorageItems();
    if (items.ValidTo > new Date()) {
        $('#ul_profile > li').hide();
        var liRow = '<li><a href="Profile.html"><span class="glyphicon glyphicon-user"></span> Session key: ' + items.SessionKey + '</a></li>';
        $('#ul_profile').append(liRow);
    }

}