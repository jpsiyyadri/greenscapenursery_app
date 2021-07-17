$(document).ready(function(){
    var starSizeVal = 25;
    var scrollPos = 800;
    var viewItemStarSize = 25;
    if($(window).width() < 600){
      starSizeVal = 15;
      viewItemStarSize = 15;
      scrollPos = 300;
    }
    $(".view-item-rating").starRating({
        starSize: viewItemStarSize,
        readOnly: true,
        strokeWidth: viewItemStarSize,
        strokeColor: "#c45500",
        activeColor: "#f4d078",
        callback: function(currentRating, $el){
            // make a server call here
        }
    })
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
    $("#shop-items").scroll(function(){
        var leftPos = $("#shop-items").scrollLeft();
        if(leftPos+scrollPos >= $("#shop-items")[0].scrollLeftMax){
            $(".scroll-item-right").addClass("feed-control-disabled")
        }
        if(leftPos < $("#shop-items")[0].scrollLeftMax){
            $(".scroll-item-right").removeClass("feed-control-disabled")
        }
        if(leftPos > 0){
            $(".scroll-item-left").removeClass("feed-control-disabled")
        }
        if(leftPos <= 0){
            $(".scroll-item-left").addClass("feed-control-disabled")
        }
    })

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
      if(leftPos+scrollPos < $("#shop-items")[0].scrollLeftMax){
        $(".scroll-item-right").removeClass("feed-control-disabled")
      }
      if(leftPos-scrollPos <= 0){
        $(".scroll-item-left").addClass("feed-control-disabled")
      }
    })

})
