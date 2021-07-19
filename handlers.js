function getRandomInt(minInt, maxInt) {
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}
function getRandomFloatNumber(min, max) {
    return Math.random() * (max - min) + min;
}
function process_names(str, char_limit=20){
    var char_count = str.length;
    var formatted_html = "";
    while(char_count > 0){
        formatted_html += "<span>"+str.slice(0, char_limit)+"</span>";
        str = str.slice(char_limit);
        char_count = str.length;
    }
    return formatted_html;
}

module.exports = {
    'plant': function(plant_data, options){
        var out = ''
        for(var i =0; i< 1; i++){
            var this_= plant_data[i]
            out += '<div class="col-1 col-md-1 col-lg-1 flex-col flex-wrap ml-3 d-none d-sm-none d-md-block">'
                for(var j=0; j<3; j++){
                    if(j==0){
                        out += '<div class="carousel-ctrl-item active mb-1 p-1" data-target="#plantPageCarousel" data-slide-to="'+j+'">'
                            out += '<img class="d-block w-100 h-100" src="'+this_['link_'+j]+'" alt="First slide">'
                        out += '</div>'
                    }
                    else{
                        out += '<div class="carousel-ctrl-item mb-1 p-1" data-target="#plantPageCarousel" data-slide-to="'+j+'">'
                            out += '<img class="d-block w-100 h-100" src="'+this_['link_'+j]+'" alt="First slide">'
                        out += '</div>'
                    }
                }
            out += '</div>'
            
            out += '<div class="col-10 col-md-3 col-lg-5 ml-1 mr-3 h-100" >'
                out += '<div id="plantPageCarousel" class="carousel slide carousel-fade h-90" data-ride="carousel">'
                    out += '<ol class="carousel-indicators">'
                        for(var j=0; j<3; j++){
                            if(j==0){
                                out += '<li data-target="#plantPageCarousel" data-slide-to="0" class="active"></li>'
                            }
                            else{
                                out += '<li data-target="#plantPageCarousel" data-slide-to="'+j+'" class=""></li>'
                            }
                        }
                    out += '</ol>'
                    out += '<div class="carousel-inner">'
                        for(var j=0; j<3; j++){
                            if(j==0){
                                out += '<div class="carousel-item active">'
                                    out +='<img class="d-block w-100 h-100" src="'+this_['link_'+j]+'" alt="First slide">'
                                out += '</div>'
                            }
                            else{
                                out += '<div class="carousel-item">'
                                    out +='<img class="d-block w-100 h-100" src="'+this_['link_'+j]+'" alt="First slide">'
                                out += '</div>'
                            }
                        }
                    out += '</div>'
                    out += '\
                        <a class="carousel-control-prev" href="#plantPageCarousel" role="button" data-slide="prev">\
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>\
                            <span class="sr-only">Previous</span>\
                        </a>\
                        <a class="carousel-control-next" href="#plantPageCarousel" role="button" data-slide="next">\
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>\
                            <span class="sr-only">Next</span>\
                        </a> '
                out += '</div>'
            out += '</div>'
            out += '<div class="col row mx-3 row d-sm-block d-md-none justify-content-center">'
                for(var j=0; j<3; j++){
                    if(j==0){
                        out += '<div class="carousel-ctrl-item active mb-1 p-1" data-target="#plantPageCarousel" data-slide-to="'+j+'">'
                            out += '<img class="d-block w-100 h-100" src="'+this_['link_'+j]+'" alt="First slide">'
                        out += '</div>'
                    }
                    else{
                        out += '<div class="carousel-ctrl-item mb-1 p-1" data-target="#plantPageCarousel" data-slide-to="'+j+'">'
                            out += '<img class="d-block w-100 h-100" src="'+this_['link_'+j]+'" alt="First slide">'
                        out += '</div>'
                    }
                }
            out += '</div>'
            out += '<div class="col-10 col-md-3 col-lg-5 mx-3">'
                out += '<span class="fs-35 text-capitalize font-weight-bold plant-name">' + this_['plant_name'] + '</span>'
                out += '<div class="fs-14 font-weight-bold text-wrap d-flex align-items-center">'
                    out += '<span class="item-rating text-sm" data-rating="'+getRandomInt(3,5)+'"></span>(<span class="fs-10">'+getRandomInt(5, 20)+'</span>)'
                out += '</div>'
                out += '<div><a href="#">'+getRandomInt(0,5)+' Comments</a></div>'
                out += '<button class="bg-warning text-light border-0 fs-12 font-weight-bold text-capitalize">Call us for Pricing:\
                    <span class="fs-20"><i class="bi bi-headset"></i>98666 66250</span>\
                </button>\
                <div class="font-italic text-success fs-10">* Promotion offer applied use coupoun: New20 at the checkout</div>\
                <div class="d-flex m-0 p-0">\
                    <button class="btn-add-to-cart mr-1">Add to Cart</button>\
                    <button class="btn-buy-now" id="action-checkout">Buy Now</button>\
                </div>\
                <div class="border-bottom mt-1 mb-2"></div>\
                <div class="plant_description">\
                    <span class="fs-20">Description</span>\
                    <ul class="p-0 pl-3">\
                        <li class="fs-14"><span class="font-weight-bold">Type:</span><span>Plant type</span></li>\
                        <li class="fs-14"><span class="font-weight-bold">Bag size:</span><span>5X5</span></li>\
                        <li class="fs-14"><span class="font-weight-bold">Height:</span><span>depends upon bag size</span></li>\
                        <li class="fs-14"><span class="font-weight-bold">Weight:</span><span>Approx 2.5 to 3kg</span></li>\
                        <li class="fs-14"><span class="font-weight-bold">Purpose:</span><span>Decorative/Oxygen/Display</span></li>\
                    </ul>\
                </div>\
                <div class="plant_maintenance">\
                    <span class="fs-20">Maintenance</span>\
                    <ul class="p-0 pl-3">\
                        <li class="fs-14"><span class="font-weight-bold">Soil type:</span> <span>Sand, Clay, Potting Soil, Mixture can be used</span></li>\
                        <li class="fs-14"><span class="font-weight-bold">Water type:</span> <span>Regular water, Fertilized water can be used</span></li>\
                        <li class="fs-14"><span class="font-weight-bold">Temperature:</span> <span>Sunlight or rain</span></li>\
                    </ul>\
                </div>\
            </div>'
        }
        return out
    },
    'isTrue': function (value) {
        return value == 'true';
    },
    "each_categroies": function(categories_data, options){
        let out = ""
        for (var i = 0; i< categories_data.length; i++){
            let this_obj = categories_data[i];
            let category_id = this_obj["id"];
            let category_name = this_obj["category_name"];
            let category_image = this_obj["link_0"]

            out += '<div class="category-item col-4 col-md-3 col-lg-1">'
                out += '<div class="category-card card border-0 bg-transparent">'
                    out += '<div class="card-body p-0 m-0">'
                        out += '<a href="/category_items?category_id='+category_id+'&category_name='+category_name+'">'
                            out += '<img src="'+category_image+'" alt="avenue" class="rounded-circle">'
                        out += '</a>'
                    out += '</div>'
                    out += '<div class="card-footer bg-transparent border-0 fs-12 font-weight-bold py-0 px-0 text-center text-truncate" style="width: 6rem;" title="{{category_name}}">'
                        out = out + '<span class="fs-12 d-flex flex-column py-1 text-wrap">'
                            category_name = category_name.toLowerCase()
                            category_name = category_name.slice(0,1).toUpperCase() + category_name.slice(1)
                            out = out + process_names(category_name, 30)
                        out = out + '</span>'
                    out += '</div>'
                out += '</div>'
            out += '</div>'
        }
        return out;
    },
    "item_card": function(items_data, options){
        let out = ""
        for (var i = 0; i< items_data.length; i++){
            let this_obj = items_data[i]
            let img_link_0 = this_obj["link_0"]
            let item_id = this_obj["id"]
            let item_name = this_obj["plant_name"]
            out = out + '<div class="px-2 mb-3">'
                out = out + '<div class="card item-card p-0 m-0 bg-white card-block h-100 w-100">'
                    out = out + '<div class="card-body p-0 m-0 h-100 w-100">'
                        out = out + '<a href="/plant?plant_id='+item_id+'">'
                        out = out + '<img class="img-fluid img-thumbnail img-responsive h-100 w-100" src="'+img_link_0+'" alt="" srcset="">'
                        out = out + '</a>'
                    out = out + '</div>'
                    out = out + '<div class="px-1 card-footer d-flex flex-column justify-content-start">'
                        out = out + '<span class="fs-14 d-flex flex-column py-1 text-wrap">'
                            item_name = item_name.toLowerCase()
                            item_name = item_name.slice(0,1).toUpperCase() + item_name.slice(1)
                            out = out + process_names(item_name)
                        out = out + '</span>'
                        out = out + '<span class="d-flex align-items-center">'
                            out = out + '<span class="item-rating text-sm" data-rating="'+getRandomInt(3,5)+'"></span>(<span class="fs-10">'+getRandomInt(5, 20)+'</span>)'
                        out = out + '</span>'
                        out = out + "<div class='d-none d-sm-none d-md-flex justify-content-center align-items-center'>"
                            out += '<button class="btn-add-to-cart m-1" data-item="'+item_id+'">Add to Cart</button>'
                            out += '<button class="btn-buy-now" data-item="'+item_id+'">Buy Now</button>'
                        out =  out+ '</div>'
                    out = out + '</div>'
                out = out + '</div>'
            out = out + '</div>'
        }
        return out
    },
    "mob_item_card": function(items_data, options){
        let out = ""
        for (var i = 0; i< items_data.length; i++){
            let this_obj = items_data[i]
            let img_link_0 = this_obj["link_0"]
            let item_id = this_obj["id"]
            let item_name = this_obj["plant_name"]
            out += '<div class="mob-item-card card mb-3">'
                out += '<div class="row no-gutters col-12 px-0 h-100">'
                    out += '<div class="col-3 h-100">'
                        out += '<img src="'+img_link_0+'" class="card-img h-100 w-100 img-responsive" alt="plant item">'
                    out += '</div>'
                    out += '<div class="col-9">'
                        out += '<div class="card-body mt-0 pt-1">'
                            out += '<a href="/plant?plant_id='+item_id+'">'
                                out += '<span class="fs-15 d-flex flex-column py-1 text-wrap">'
                                    item_name = item_name.toLowerCase()
                                    item_name = item_name.slice(0,1).toUpperCase() + item_name.slice(1)
                                    out = out + process_names(item_name, 30)
                                out += '</span>'
                            out += '</a>'
                            out = out + '<span class="d-flex align-items-center">'
                                out = out + '<span class="item-rating text-sm" data-rating="'+getRandomInt(3,5)+'"></span>(<span class="fs-10">'+getRandomInt(5, 20)+'</span>)'
                            out = out + '</span>'
                            out = out + "<div class='d-flex fs-11 mt-3'>"
                                out += '<button class="btn-add-to-cart" data-item="'+item_id+'">Add to Cart</button>'
                                out += '<button class="btn-buy-now" data-item="'+item_id+'">Buy Now</button>'
                            out =  out+ '</div>'
                            // out = out + '<a class="" href="/plant?plant_id='+item_id+'">'
                            out += '</div>'
                    out += '</div>'
                out += '</div>'
            out += '</div>'
        }
        return out
    }
};
