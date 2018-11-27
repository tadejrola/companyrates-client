$(document).ready(function () {

    showLoggedInUser();

    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('companyid')) {
        let param = searchParams.get('companyid')
        $.ajax({
            url: "https://companyratesapi.azurewebsites.net/api/companies/" + param,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#lbl_name').text(data.Name);
                $('#lbl_address').text(data.Address + " " + data.City + " " + data.Country);
                $('#lbl_site').text(data.Website);
                $('#lbl_verified').text(data.Verified);
                $('#lbl_rating').text(data.TotalRating);
                $("#logo-img").attr("src", data.LogoUrl);

                // TO-DO:
                // - DISPLAY REVIEWS OF COMPANY
                // - ADDING NEW REVIEWS
                // - RATING REVIEWS
                // - RATING COMPANIES


            },
            error: function () {
                console.log('error');
            }
        });

        $("#btn_thumbsup").click(function () {

            $.ajax({
                url: "https://companyratesapi.azurewebsites.net/api/reviews/" + param,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    for (let i in data) {

                        var tablerow = '<tr><td><p>Something strange happened</p></td><td><p>Entered:<br/><strong>Tadej Rola</strong></p></td><td><p>Category:<br /><strong>Mobing</strong></p></td><td><p>Date:<br /> <strong> 19/11/2018 14:35</strong> </p> </td> <td> <button name="btn_thumbsup" id="" class="btn"><i class="far fa-thumbs-up"></i></button> <button name="btn_thumbsdown" id="" class="btn"><i class="far fa-thumbs-down"></i></button> </td> <td> <h5> <b>Total rating:</b> </h5> <p> 0 </p> </td> </tr>';

                        $('#table_reviews tbody').append(tablerow);
                    }
                    console.log(data);
                },
                error: function () {
                    console.log('error');
                }
            });
        });

        $("#btn_addReview").click(function () {

            let userData = getStorageItems();

            let category = $('#DDL_category').val();
            let text = $("#txt_review").val();
            let user_fk = userData.UserID;
            let company_fk = param;
            let date = new Date();
            let dateadded = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
            console.log(dateadded);
            let reviewData = {
                Category: category,
                Text: text,
                User_FK: user_fk,
                Company_FK: company_fk,
                DateTimeAdded: dateadded
            }
            console.log(reviewData);
            $.ajax({
                url: "https://companyratesapi.azurewebsites.net/api/reviews/" + param + '?sessionkey=' + userData.SessionKey,
                type: 'POST',
                dataType: 'json',
                data: reviewData,
                success: function (data) {

                    console.log(data);
                },
                error: function () {
                    console.log('error');
                }
            });
        });
    }
    else {
        window.location = "index.html";
    }


});