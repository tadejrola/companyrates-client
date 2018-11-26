$(document).ready(function () {
    let key = sessionStorage.getItem("SessionKey");
    let validTo = sessionStorage.getItem("ValidTo");
    let datetime = new Date(validTo);
    console.log(datetime);
    if (datetime < new Date() || key == undefined) {
        window.location = "Login.html";
    }


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