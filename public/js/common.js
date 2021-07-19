$(document).ready(function(){
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var starSizeVal = 25
    if($(window).width() < 600){
      starSizeVal = 15;
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
    // add to cart click action
    $(".btn-add-to-cart").on("click", function(){
        var item_id = $(this).data("item");

        // send a post request
        jQuery.ajax({
            "url": "/cart/add",
            "type": 'POST',
            "headers": {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'CSRF-Token': token
            },
            "body": JSON.stringify({'item_id': item_id}),
            "data": JSON.stringify({'item_id': item_id})
        }).done(function(message){
            alert(message)
        }).fail(function(){
            alert("Failed to add an item")
        });       
    })

    // buy now action
    $(".btn-buy-now").on("click", function(){
        var item_id = $(this).data("item");

        // send a post request

    })


    // checkoout action

})