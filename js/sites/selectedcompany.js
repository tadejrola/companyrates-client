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
                $.ajax({
                    url: "https://companyratesapi.azurewebsites.net/api/reviews/" + param,
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        for (let i in data) {

                            var tablerow = `<tr><td><p>${data[i].Text}</p></td><td><p>Entered:<br/><strong>${data[i].UserFK.Email}</strong></p></td><td><p>Category:<br /><strong>${data[i].Category}</strong></p></td><td><p>Date:<br /> <strong>${data[i].DateTimeAdded}</strong> </p> </td> <td> <button OnClick="ThumbsUpReview(this);" value="${data[i].ReviewID}" class="btn btn_thumbsup"><i class="far fa-thumbs-up"></i></button> <button OnClick="ThumbsDownReview(this);" value="${data[i].ReviewID}"class="btn btn_thumbsdown"><i class="far fa-thumbs-down"></i></button> </td> <td> <h5> <b>Total rating:</b> </h5> <p>${data[i].TotalRating}</p> </td> </tr>`;

                            $('#table_reviews tbody').append(tablerow);
                        }
                    },
                    error: function () {
                        console.log('error');
                    }
                });


                // - RATING REVIEWS
                // - RATING COMPANIES


            },
            error: function () {
                console.log('error');
            }
        });

        $("#btn_compnay_thumbsup").click(function () {
            changeLocationIfNotLoggedIn();
            let userData = getStorageItems();
            let companyThumbDownData = {
                User_FK: userData.UserID,
                Company_FK: param,
                Value: 1
            };
            console.log(companyThumbDownData);
            $.ajax({
                url: "https://companyratesapi.azurewebsites.net/api/votecompanies?sessionkey=" + userData.SessionKey,
                type: 'POST',
                dataType: 'json',
                data: companyThumbDownData,
                success: function (data) {

                    console.log(data);
                    window.location.reload(true);
                },
                error: function (err) {
                    console.log(err);
                    window.location.reload(true);
                }
            });

        });

        $("#btn_company_thumbsdown").click(function () {
            changeLocationIfNotLoggedIn();
            let userData = getStorageItems();
            let companyThumbUpData = {
                User_FK: userData.UserID,
                Company_FK: param,
                Value: -1
            };
            $.ajax({
                url: "https://companyratesapi.azurewebsites.net/api/votecompanies?sessionkey=" + userData.SessionKey,
                type: 'POST',
                dataType: 'json',
                data: companyThumbUpData,
                success: function (data) {

                    console.log(data);
                    window.location.reload(true);
                },
                error: function () {
                    console.log('error');
                    window.location.reload(true);
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
            let month = parseInt(date.getMonth()) + 1;
            let dateadded = date.getFullYear() + "-" + month + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
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
                url: "https://companyratesapi.azurewebsites.net/api/reviews?sessionkey=" + userData.SessionKey,
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

        $("#btn_openModalAddReview").click(function () {
            changeLocationIfNotLoggedIn();

        });


    }
    else {
        window.location = "index.html";
    }


});

function ThumbsDownReview(el) {


    var id = $(el).attr('value');
    changeLocationIfNotLoggedIn();
    let userData = getStorageItems();
    let ReviewThumbDownData = {
        User_FK: userData.UserID,
        Review_FK: id,
        Value: -1
    };
    console.log(ReviewThumbDownData);
    $.ajax({
        url: "https://companyratesapi.azurewebsites.net/api/votereviews?sessionkey=" + userData.SessionKey,
        type: 'POST',
        dataType: 'json',
        data: ReviewThumbDownData,
        success: function (data) {

            console.log(data);
            window.location.reload(true);
        },
        error: function (err) {
            console.log(err);
            window.location.reload(true);
        }
    });

}

function ThumbsUpReview(el) {


    var id = $(el).attr('value');
    changeLocationIfNotLoggedIn();
    let userData = getStorageItems();
    let ReviewThumbDownData = {
        User_FK: userData.UserID,
        Review_FK: id,
        Value: 1
    };
    console.log(ReviewThumbDownData);
    $.ajax({
        url: "https://companyratesapi.azurewebsites.net/api/votereviews?sessionkey=" + userData.SessionKey,
        type: 'POST',
        dataType: 'json',
        data: ReviewThumbDownData,
        success: function (data) {

            console.log(data);
            window.location.reload(true);
        },
        error: function (err) {
            console.log(err);
            window.location.reload(true);
        }
    });

}