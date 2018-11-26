$(document).ready(function () {
    let key = sessionStorage.getItem("SessionKey");
    let validTo = sessionStorage.getItem("ValidTo");
    let datetime = new Date(validTo);
    console.log(datetime);
    if (datetime > new Date()) {
        window.location = "Profile.html";
    }

    $("#btn_register").click(function () {
        let email = $("#txt_email").val();
        let pass = $("#txt_pass").val();
        let passre = $("#txt_passre").val();

        if (pass === passre) {

            let data = {
                Email: email,
                PasswordHash: pass,
                isCompany: false
            }
            $.ajax({
                url: "https://companyratesapi.azurewebsites.net/api/users/",
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (data) {
                    console.log(data);


                },
                error: function () {
                    console.log('error');
                }

            })
        }
    });
});