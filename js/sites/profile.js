$(document).ready(function () {
    changeLocationIfNotLoggedIn();

    showLoggedInUser();


    $("#btn_logout").click(function () {
        let key = {};
        key.SessionKey = sessionStorage.getItem("SessionKey");

        $.ajax({
            url: "https://companyratesapi.azurewebsites.net/api/accounts/logout",
            type: 'POST',
            dataType: 'json',
            data: key,
            success: function (data) {
                console.log(data);
                sessionStorage.clear();
                window.location = "Login.html";


            },
            error: function (err) {
                console.log(err);
            }

        })
    })

});