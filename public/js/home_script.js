$(document).ready(function(){
    var starSizeVal = 25
    var scrollPos = 800;
    if($(window).width() < 600){
      starSizeVal = 15;
      scrollPos = 300;
    }
    $(".item-rating").starRating({
        starSize: starSizeVal,
        readOnly: true,
        strokeWidth: starSizeVal,
        strokeColor: "#c45500",
        activeColor: "#f4d078",
        callback: function(currentRating, $el){
            // make a server call here
        }
    });

    $(".scroll-item-right").on("click", function(){
      var leftPos = $("#shop-items").scrollLeft();
      $("#shop-items").animate({scrollLeft: leftPos+scrollPos}, 800);
      if(leftPos+scrollPos >= $("#shop-items")[0].scrollLeftMax){
        $(".scroll-item-right").addClass("feed-control-disabled")
      }
      if(leftPos+scrollPos>0){
        $(".scroll-item-left").removeClass("feed-control-disabled")
      }
    })
    $(".scroll-item-left").on("click", function(){
      var leftPos = $("#shop-items").scrollLeft();
      $("#shop-items").animate({scrollLeft: leftPos-scrollPos}, 800);
      if(leftPos+scrollPos > 0){
        $(".scroll-item-right").removeClass("feed-control-disabled")
      }
      if(leftPos-scrollPos <= 0){
        $(".scroll-item-left").addClass("feed-control-disabled")
      }
    })

})
