$(document).ready(function () {

    changeLocationIfLoggedIn();

    $("#btn_login").click(function () {
        let user = {};
        user.email = $("#txt_email").val();
        user.passwordHash = $("#txt_pass").val();
        $.ajax({
            url: "https://companyratesapi.azurewebsites.net/api/accounts/login",
            type: 'POST',
            data: user,
            dataType: 'json',
            success: function (data) {

                console.log(data);
                window.location = "index.html";
                sessionStorage.setItem("SessionKey", data.SessionKey);
                sessionStorage.setItem("ValidTo", data.ValidTo);
                sessionStorage.setItem("UserID", data.User_FK);
                console.log(data);

            },
            error: function () {
                console.log('error');
            }
        });
    });



    // TO-DO:
    // SEARCH BY STRING

});

