;
(function () {

  function reDisplay() {
    var W = $(window).width();

    $('html').css({
      fontSize: W / 750 * 100
    });

  }
  reDisplay();
  var timer = null;
  $(window).on("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      reDisplay();
    }, 20);
  })

})();


$(function () {
  var H = $(window).height();
  $("#view").css({
    height: H - ($('.nav').height() + $('.foot-list').height())
  });

  // var num = 0,
  //   timer = null;

  // function ban() {
  //   clearTimeout(timer);
  //   timer = setTimeout(() => {
  //     num++;
  //     if (num > 3) {
  //       num = 0;
  //     }
  //     // $(".ban-img li").eq(num).addClass("active");
  //     // $(".ban-img li").eq(num).siblings().removeClass('active');
  //     // $(".ban-cir li").eq(num).addClass("current");
  //     // $(".ban-cir li").eq(num).siblings().removeClass('current');
  //     ban();
  //   }, 2000);
  // }

  // ban();

  // 滑动轮播图


  var imgw = $("#ban").width();

  var lunbo = new iScroll("ban", {
    hScrollbar: false,
    snap: true,
    momentum: false,
    x: -imgw,
    onScrollEnd: function (e) {
      if (this.currPageX == 0) {
        this.scrollToPage(6, 0, 0);
      } else if (this.currPageX == ($("#ban img").length - 1)) {
        this.scrollToPage(1, 0, 0);
      }
      $(".ban-cir li").eq(this.currPageX - 1).addClass("current");
      $(".ban-cir li").eq(this.currPageX - 1).siblings().removeClass('current');
    }
  });
  lunbo.currPageX = 1;


  // 上下刷新

  var loadw = $(".load p").height();

  var scro = new iScroll("view", {
    vScrollbar: false,
    // bounce:false,
    checkDOMChanges: true,
    y: -loadw,
    // topOffset: loadw,
    onScrollMove: function (e) {

      if (this.y < -($(".banner").height())) {
        $(".cb").css({
          display: "block"
        })
      } else if (this.y >= 100) {
        $(".load p").text("松开小手，立刻刷新！")
        this.minScrollY = 0;
      } else if (this.y < 100) {
        $(".load p").text("下拉刷新");
        this.minScrollY = -loadw;
      } else {
        $(".cb").css({
          display: "none"
        })
      }
    },
    onTouchEnd: function () {
      if (this.y >= 100) {
        $(".load p").text("刷新中...")
        setTimeout(function () {
          var loadata = $(".content3").eq(3).clone(true, true);
          loadata.insertBefore($('.content2'))
          $(".load p").text("刷新成功！")
          this.scrollTo(0, -loadw, 1000);
          this.refresh();
        }.bind(this), 2000);

      } else if (this.y < 100 && this.y > 0) {
        this.scrollTo(0, -loadw, 200);
      }
    },
    onScrollEnd: function (e) {
      if (this.y == 0) {
        $(".cb").css({
          display: "none"
        })
      }
    }
  });

  $(".cb").click(function () {
    scro.scrollTo(0, -loadw, 500);
  })
})