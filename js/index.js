;
(function () {

  function reDisplay() {
    var W = $(window).width();

    $('html').css({
      fontSize: W / 750 * 100
    })
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

  var num=0,timer=null;

  function ban() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      num++;
      if(num>3){
        num=0;
      }
      $(".ban-img li").eq(num).addClass("active");
      $(".ban-img li").eq(num).siblings().removeClass('active');
      $(".ban-cir li").eq(num).addClass("current");
      $(".ban-cir li").eq(num).siblings().removeClass('current');
      ban();
    }, 2000);
  }

  ban();


})