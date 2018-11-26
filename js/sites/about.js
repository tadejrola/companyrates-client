$(document).ready(function () {
    let key = sessionStorage.getItem("SessionKey");
    let validTo = sessionStorage.getItem("ValidTo");
    let datetime = new Date(validTo);
    console.log(datetime);
    if (datetime > new Date()) {
        $('#ul_profile > li').hide();
        var liRow = '<li><a href="Profile.html"><span class="glyphicon glyphicon-user"></span> Session key: ' + key + '</a></li>';
        $('#ul_profile').append(liRow);
    }


});

