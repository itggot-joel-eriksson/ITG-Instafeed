$(document).ready(function() {
    var feed = new Instafeed({
        clientId: "467ede5a6b9b48ae8e03f4e2582aeeb3",
        get: "user",
        userId: "510446258", //http://jelled.com/instagram/lookup-user-id#
        limit: 5,
        target: "feed",
        resolution: "standard_resolution",
        template: '<div class="post animated"><img src="{{image}}" alt="{{caption}}" draggable="false" class="post__image" /><p class="post__caption">{{caption}}</p></div>'
    });
    feed.run();

    var time = 0,
        n = 0;
    function do_urls() {
        time += 1;

        /*$(".post__caption").linky({
            mentions: true,
            hashtags: false,
            urls: true,
            linkTo: "instagram"
        });*/

        if (time === 0) {
            n = 0;
            $(".active").removeClass("active");
        } else if (time === 5) {
            n = 1;
            $(".active").removeClass("active");
        } else if (time === 10) {
            n = 2;
            $(".active").removeClass("active");
        } else if (time === 15) {
            n = 3;
            $(".active").removeClass("active");
        } else if (time === 20) {
            n = 4;
            $(".active").removeClass("active");
        } else if (time === 25) {
            time = 0;
            n = 0;
            $(".active").removeClass("active");
        }



        $(".post:not(.active)").removeClass("fadeInDownBig").addClass("fadeOutDownBig").hide();//.addClass("post--hidden");
        $(".post:nth(" + n + ")").show().removeClass("fadeOutDownBig").addClass("fadeInDownBig").addClass("active");//.removeClass("post--hidden");
    }

    url_interval = setInterval(do_urls, 1000);
});
