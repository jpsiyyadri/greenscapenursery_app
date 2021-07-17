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
                        out = out + '<span class="fs-12 d-flex flex-column py-1 text-wrap">'
                            item_name = item_name.toLowerCase()
                            item_name = item_name.slice(0,1).toUpperCase() + item_name.slice(1)
                            out = out + process_names(item_name)
                        out = out + '</span>'
                        out = out + '<span class="d-flex align-items-center">'
                            out = out + '<span class="item-rating text-sm" data-rating="'+getRandomInt(3,5)+'"></span>(<span class="fs-10">'+getRandomInt(5, 20)+'</span>)'
                        out = out + '</span>'
                        out = out + "<div class='row justify-content-center align-items-center'>"
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
            out += '<a href="/plant?plant_id='+item_id+'">'
            out += '<div class="mob-item-card card mb-3">'
                out += '<div class="row no-gutters col-12 px-0 h-100">'
                    out += '<div class="col-3 h-100">'
                        out += '<img src="'+img_link_0+'" class="card-img h-100 w-100 img-responsive" alt="/static/img/man.jpg">'
                    out += '</div>'
                    out += '<div class="col-9">'
                        out += '<div class="card-body">'
                            out += '<span class="fs-15 d-flex flex-column py-1 text-wrap">'
                                item_name = item_name.toLowerCase()
                                item_name = item_name.slice(0,1).toUpperCase() + item_name.slice(1)
                                out = out + process_names(item_name, 30)
                            out += '</span>'
                            out = out + '<span class="d-flex align-items-center">'
                                out = out + '<span class="item-rating text-sm" data-rating="'+getRandomInt(3,5)+'"></span>(<span class="fs-10">'+getRandomInt(5, 20)+'</span>)'
                            out = out + '</span>'
                            out = out + "<div class='d-flex fs-11'>"
                                out += '<button class="btn-add-to-cart" data-item="'+item_id+'">Add to Cart</button>'
                                out += '<button class="btn-buy-now" data-item="'+item_id+'">Buy Now</button>'
                            out =  out+ '</div>'
                            // out = out + '<a class="" href="/plant?plant_id='+item_id+'">'
                            out += '</div>'
                    out += '</div>'
                out += '</div>'
            out += '</div>'
            out += '</a>'
        }
        return out
    }
};
