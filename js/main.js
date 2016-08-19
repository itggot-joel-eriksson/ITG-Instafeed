var postLimit = 7;
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
];
var instagramUser = "itgymnasietgoteborg";

function getInstagramFeed(user) {
    $.ajax({
        url: "https://itgapp.azurewebsites.net/api/v1/instafeed/" + user,
        method: "GET",
        success: function(data) {
            $("#feed .post").remove();
            data.forEach(function(post, index) {
                if (post.post.caption.text.html) {
                    $("#feed").append('<div class="post post-hidden animated" data-insta-profile="' + post.user.username + '" data-insta-avatar="' + post.user.profile_picture + '"><img src="' + post.post.image + '" alt="' + post.post.id + '" draggable="false" class="post__image" /><p class="post__caption">' + post.post.caption.text.html + '</p></div>');
                } else {
                    $("#feed").append('<div class="post post-hidden animated" data-insta-profile="' + post.user.username + '" data-insta-avatar="' + post.user.profile_picture + '"><img src="' + post.post.image + '" alt="' + post.post.id + '" draggable="false" class="post__image" /></div>');
                }
            });

            do_urls();
        },
        error: function(error) {
            console.error(error);
        }
    });
}

var time = 0,
    n = 0;
function do_urls() {
    n = showPost(n);
    if (n >= postLimit) {
        n = 0;
    }
}

var url_interval = setInterval(do_urls, (wait * 1000));
$("body").css("background-color", colors[0]);

function showPost(n) {
    var showAnimation = "zoomIn",
        hideAnimation = "zoomOut";

    $(".post--active").removeClass("post--active");
    $(".post:not(.post--active)").addClass(hideAnimation).removeClass(showAnimation);

    setTimeout(function() {
        $(".post:not(.post:nth(" + n + "))").hide();
        $(".post:nth(" + n + ")").show().removeClass(hideAnimation).addClass(showAnimation).addClass("post--active");
        $(".account__name").text($(".post:nth(" + n + ")").data("insta-profile"));
        $(".account__avatar").attr("alt", $(".post:nth(" + n + ")").data("insta-profile"));
        $(".account__avatar").attr("src", $(".post:nth(" + n + ")").data("insta-avatar"));
    }, 300);

    $(".body").css("background-color", colors[color]);

    color = (colors.length - 1 === color) ? 0 : color + 1;

    return n + 1;
}

$(document).ready(function() {
    getInstagramFeed(instagramUser);
    instaInterval = setInterval(function() {
        getInstagramFeed(instagramUser);
    }, 300000);

    $(".time__now--hour").text(moment().locale("sv").format("HH"));
    $(".time__now--minute").text(moment().locale("sv").format("mm"));

    clockInterval = setInterval(function() {
        $(".time__now--hour").text(moment().locale("sv").format("HH"));
        $(".time__now--minute").text(moment().locale("sv").format("mm"));
    }, 1000);
});
