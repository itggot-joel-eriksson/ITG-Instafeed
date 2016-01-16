var color = 0,
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

function shadeBlend(p,c0,c1) {
    var n=p<0?p*-1:p,u=Math.round,w=parseInt;
    if(c0.length>7){
        f = (c0.split(","),t=(c1?c1:p<0) ? "rgb(0,0,0)" : "rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
        return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")";
    }else{
        f = w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
        return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1);
    }
}

function showPost(n) {
    var showAnimation = "zoomIn",
        hideAnimation = "zoomOut";

    $(".post--active").removeClass("post--active");
    $(".post:not(.post--active)").addClass(hideAnimation).removeClass(showAnimation);

    setTimeout(function() {
        $(".post:not(.post--active)").hide();
        $(".post:nth(" + n + ")").show().removeClass(hideAnimation).addClass(showAnimation).addClass("post--active");
    }, 300);

    $(".body").css("background-color", colors[color]);
    $(".credit").css("color", shadeBlend(-0.3, colors[color]));

    color = (colors.length - 1 === color) ? 0 : color + 1;
}

$(document).ready(function() {
    function getInstafeed() {
        var feed = new Instafeed({
            clientId: "467ede5a6b9b48ae8e03f4e2582aeeb3",
            get: "user",
            userId: "510446258", //http://jelled.com/instagram/lookup-user-id#
            limit: 5,
            target: "feed",
            resolution: "standard_resolution",
            template: '<div class="post post--hidden animated"><img src="{{image}}" alt="{{caption}}" draggable="false" class="post__image" /><p class="post__caption">{{caption}}</p></div>',
            after: function() {
                $(".post__caption").each(function(current) {
                    caption = $(this).text();
                    $(this).html(caption.linkify());
                });

                showPost(0);
            }
        });
        feed.run();
    }

    getInstafeed();

    var time = 0,
        n = 0;
    function do_urls() {
        time += 1;

        if (time === 0) {
            n = 0;
            showPost(n);
        } else if (time === 5) {
            n = 1;
            showPost(n);
        } else if (time === 10) {
            n = 2;
            showPost(n);
        } else if (time === 15) {
            n = 3;
            showPost(n);
        } else if (time === 20) {
            n = 4;
            showPost(n);
        } else if (time === 25) {
            time = 0;
            n = 0;
            showPost(n);
        }
    }

    url_interval = setInterval(do_urls, 1000);
    $("body").css("background-color", colors[0]);
});
