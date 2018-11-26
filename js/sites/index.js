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
    $.ajax({
        url: "https://companyratesapi.azurewebsites.net/api/companies",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            for (let i in data) {
                let verified = '';
                if (data[i].Verified === true) {
                    verified = '<span class="glyphicon glyphicon-ok"></span>';
                }
                else {
                    verified = '<span class="glyphicon glyphicon-remove"></span>';
                }
                var tablerow = '<tr><th scope="row">' + data[i].CompanyID + '</th><td>' + data[i].Name + '</td><td>' + verified + '</td><td><a href="' + data[i].Website + '">' + data[i].Website + '</a></td><td>' + data[i].TotalRating + '</td><td><a href="SelectedCompany.html?companyid=' + data[i].CompanyID + '"><i class="far fa-comments"></i></a></td></tr>';

                $('#table_companies tbody').append(tablerow);
            }

        },
        error: function () {
            console.log('error');
        }
    });


    // TO-DO:
    // SEARCH BY STRING

});

