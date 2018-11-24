$(document).ready(function () {


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
                // for (let i in data) {
                //     let verified = '';
                //     if (data[i].Verified === true) {
                //         verified = '<span class="glyphicon glyphicon-ok"></span>';
                //     }
                //     else {
                //         verified = '<span class="glyphicon glyphicon-remove"></span>';
                //     }
                //     var tablerow = '<tr><th scope="row">' + data[i].CompanyID + '</th><td>' + data[i].Name + '</td><td>' + verified + '</td><td><a href="' + data[i].Website + '">' + data[i].Website + '</a></td><td>' + data[i].TotalRating + '</td><td><a href="SelectedCompany.html?companyid=' + data[i].CompanyID + '"><i class="far fa-comments"></i></a></td></tr>';

                //     $('#table_companies tbody').append(tablerow);
                // }

                console.log(data);
                window.location = "index.html";
                sessionStorage.setItem("SessionKey", data.SessionKey);
                sessionStorage.setItem("ValidTo", data.ValidTo);
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

