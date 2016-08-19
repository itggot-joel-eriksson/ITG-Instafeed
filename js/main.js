var postLimit = 20;
var color = 0;
var instaInterval;
var clockInterval;
var wait = 10;
var colors = [
    "rgb(239,83,80)",
    "rgb(255,202,40)",
    "rgb(26,140,205)",
    "rgb(220,0,110)",
    "rgb(238,130,47)",
    "rgb(156,39,176)",
    "rgb(76,175,80)",
    "rgb(239,83,80)",
    "rgb(255,202,40)",
    "rgb(26,140,205)",
    "rgb(220,0,110)",
    "rgb(238,130,47)",
    "rgb(156,39,176)",
    "rgb(76,175,80)",
    "rgb(239,83,80)",
    "rgb(255,202,40)",
    "rgb(26,140,205)",
    "rgb(220,0,110)",
    "rgb(238,130,47)",
    "rgb(156,39,176)",
    "rgb(76,175,80)",
    "rgb(239,83,80)",
    "rgb(255,202,40)",
    "rgb(26,140,205)",
    "rgb(220,0,110)",
    "rgb(238,130,47)",
    "rgb(156,39,176)",
    "rgb(76,175,80)",
];
var instagramUser = "itgymnasietgoteborg";

function getInstagramFeed(user) {
    $.ajax({
        url: "https://itgapp.azurewebsites.net/api/v1/instafeed/" + user,
        method: "GET",
        success: function(data) {
            $(".posts .post").remove();
            data.forEach(function(post, index) {
                if (post.post.caption.text.html) {
                    // $(".posts").append('<div class="post post-hidden animated" data-insta-profile="' + post.user.username + '" data-insta-avatar="' + post.user.profile_picture + '"><img src="' + post.post.image + '" alt="' + post.post.id + '" draggable="false" class="post__image" /><p class="post__caption">' + post.post.caption.text.html + '</p></div>');
                } else {
                    // $(".posts").append('<div class="post post-hidden animated" data-insta-profile="' + post.user.username + '" data-insta-avatar="' + post.user.profile_picture + '"><img src="' + post.post.image + '" alt="' + post.post.id + '" draggable="false" class="post__image" /></div>');
                }
            });
        },
        error: function(error) {
            console.error(error);
        }
    });
}