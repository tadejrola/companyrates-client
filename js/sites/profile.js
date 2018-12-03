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
                sessionStorage.clear();
                window.location = "Login.html";


            },
            error: function (err) {
                console.log(err);
            }

        })
    })

    $.ajax({
        url: "https://companyratesapi.azurewebsites.net/api/reviews/",
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            for (let i in data) {
                let items = getStorageItems();
                if (data[i].User_FK == items.UserID) {
                    var tablerow = `<tr><td><p>${data[i].Text}</p></td><td><p>Category:<br /><strong>${data[i].Category}</strong></p></td><td><p>Date:<br /> <strong>${data[i].DateTimeAdded}</strong> </p> </td><td> <h5> <b>Total rating:</b> </h5> <p>${data[i].TotalRating}</p> </td><td> <button OnClick="goToCompany(this);" value="${data[i].Company_FK}"class="btn"><i class="far fa-comment"></i></button> </td>  </tr>`;
                    $('#LV_reviews tbody').append(tablerow);
                }


            }
        },
        error: function () {
            console.log('error');
        }
    });

});

function goToCompany(el) {
    var id = $(el).attr('value');
    window.location = "SelectedCompany.html?companyid=" + id;
}