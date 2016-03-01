var postLimit = 5,
    color = 0,
    instaInterval,
    wait = 10,
    colors = [
        "#1A8CCD",
        "#DC006E",
        "#EE822F",
        "#9C27B0",
        "#4CAF50"
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
        template: '<div class="post post--hidden animated section group"><div class="col span_1_of_2"><img src="{{image}}" alt="{{model.user.username}}" draggable="false" class="post__image" /></div><div class="col span_1_of_2"><p class="post__caption">{{caption}}</p></div></div>',
        after: function() {
            $(".post__caption").each(function(current) {
                caption = $(this).text();
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

url_interval = setInterval(do_urls, (wait * 1000));
$("body").css("background-color", colors[0]);

function showPost(n) {
    var showAnimation = "zoomIn",
        hideAnimation = "zoomOut";

    $(".post--active").removeClass("post--active");
    $(".post:not(.post--active)").addClass(hideAnimation).removeClass(showAnimation);

    setTimeout(function() {
        $(".post:not(.post:nth(" + n + "))").hide();
        $(".post:nth(" + n + ")").show().removeClass(hideAnimation).addClass(showAnimation).addClass("post--active");
    }, 300);

    $(".body").css("background-color", colors[color]);

    color = (colors.length - 1 === color) ? 0 : color + 1;

    return n + 1;
}

$(document).ready(function() {
    getInstafeed();
    instaInterval = setInterval(getInstafeed, 120 * 1000);
});
