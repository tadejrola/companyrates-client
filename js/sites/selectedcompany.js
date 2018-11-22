$(document).ready(function () {

    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('companyid')) {
        let param = searchParams.get('companyid')
        $.ajax({
            url: "https://companyratesapi.azurewebsites.net/api/companies/" + param,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $('#lbl_name').text(data.Name);
                $('#lbl_address').text(data.Address + " " + data.City + " " + data.Country);
                $('#lbl_site').text(data.Website);
                $('#lbl_verified').text(data.Verified);
                $('#lbl_rating').text(data.TotalRating);

                // TO-DO:
                // - DISPLAY LOGO OF COMPANY
                // - DISPLAY REVIEWS OF COMPANY
                // - ADDING NEW REVIEWS
                // - RATING REVIEWS
                // - RATING COMPANIES


            },
            error: function () {
                console.log('error');
            }
        });
    }




});