var postLimit = 7,
    color = 0,
    instaInterval,
    clockInterval,
    wait = 10,
    colors = [
        "rgb(239,83,80)",
        "rgb(255,202,40)",
        "rgb(26,140,205)",
        "rgb(220,0,110)",
        "rgb(238,130,47)",
        "rgb(156,39,176)",
        "rgb(76,175,80)"
    ];

String.prototype.linkify = function() {
    var str = this.replace(/(^|\s)@(\w+)/g, '$1<span class="post__caption--mention">@$2</span>');
    return str.replace(/(^|\s)#(\w+)/g, '$1<span class="post__caption--hashtag">#$2</span>');
};

function getInstafeed() {
    var feed = new Instafeed({
        clientId: "467ede5a6b9b48ae8e03f4e2582aeeb3",
        get: "user",
        userId: "510446258", //http://jelled.com/instagram/lookup-user-id#
        limit: postLimit,
        target: "feed",
        resolution: "standard_resolution",
        template: '<div class="post post--hidden animated" data-insta-profile="{{model.user.username}}" data-insta-avatar="{{model.user.profile_picture}}"><img src="{{image}}" alt="{{model.user.username}}" draggable="false" class="post__image" /><p class="post__caption">{{caption}}</p></div>',
        after: function() {
            $(".post:not(.post:nth(0))").hide();

            $(".post__caption").each(function(current) {
                caption = $(this).html();
                $(this).html(caption.linkify());
            });

            do_urls();
        }
    });
    feed.run();
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
        $(".account__name").text($(".post:nth(" + n + ")").attr("data-insta-profile"));
        $(".account__avatar").attr("alt", $(".post:nth(" + n + ")").attr("data-insta-profile"));
        $(".account__avatar").attr("src", $(".post:nth(" + n + ")").attr("data-insta-avatar"));
    }, 300);

    $(".body").css("background-color", colors[color]);

    color = (colors.length - 1 === color) ? 0 : color + 1;

    return n + 1;
}

$(document).ready(function() {
    getInstafeed();
    instaInterval = setInterval(getInstafeed, 3 * 60 * 1000);

    $(".time__now--hour").text(moment().locale("sv").format("HH"));
    $(".time__now--minute").text(moment().locale("sv").format("mm"));

    clockInterval = setInterval(function() {
        $(".time__now--hour").text(moment().locale("sv").format("HH"));
        $(".time__now--minute").text(moment().locale("sv").format("mm"));
    }, 1000);
});
