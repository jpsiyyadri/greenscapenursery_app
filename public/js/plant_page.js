$(document).ready(function(){

    $('#plantPageCarousel').on('slid.bs.carousel', function () {
        // do something...
        var mv_slide = $(".carousel-indicators li.active").data("slide-to");
        $(".carousel-ctrl-item").removeClass("active")
        $(`.carousel-ctrl-item[data-slide-to='${mv_slide}']`).addClass("active")

    })

    $(".carousel-ctrl-item", function(){
        var mv_slide = $(this).data("slide-to");
        $('#plantPageCarousel').carousel(mv_slide)
    })

    $("#action-checkout").on("click", function(){
        location.href = "https://jpsiyyadri.github.io/ui_app/checkout.html"

    })

})
