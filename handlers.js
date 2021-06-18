function getRandomInt(minInt, maxInt) {
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}
function getRandomFloatNumber(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = {
    "item_card": function(items_data, options){
        let out = ""
        for (var i = 0; i< items_data.length; i++){
            let this_obj = items_data[i]
            let img_link_0 = this_obj["link_0"]
            let item_id = this_obj["id"]
            let item_name = this_obj["plant_name"]
            out = out + '<div class="item">'
                out = out + '<div class="card p-0 m-0 bg-white">'
                    out = out + '<div class="card-body p-0 m-0" height="50px">'
                        out = out + '<a href="/plant?plant_id='+item_id+'">'
                        out = out + '<img class="img-fluid img-thumbnail img-responsive" src="'+img_link_0+'" alt="" srcset="">'
                        out = out + '</a>'
                    out = out + '</div>'
                    out = out + '<div class="px-1 card-footer d-flex flex-column justify-content-start">'
                        out = out + '<span class="fs-20 text-capitalize">'
                            out = out + item_name
                        out = out + '</span>'
                        out = out + '<span class="d-flex align-items-center">'
                            out = out + '<span class="item-rating text-sm" data-rating="'+getRandomInt(3,5)+'"></span>(<span>'+getRandomInt(5, 20)+'</span>)'
                        out = out + '</span>'
                    out = out + '</div>'
                out = out + '</div>'
            out = out + '</div>'
        }
        return out
    },
    "cat_item_card": function(items_data, options){
        let out = ""
        for (var i = 0; i< items_data.length; i++){
            let this_obj = items_data[i]
            let img_link_0 = this_obj["link_0"]
            let item_id = this_obj["id"]
            let item_name = this_obj["plant_name"]
            out = out + '<div class="item col-2">'
                out = out + '<div class="card p-0 m-0 bg-white">'
                    out = out + '<div class="card-body p-0 m-0" height="50px">'
                        out = out + '<a href="/plant?plant_id='+item_id+'">'
                        out = out + '<img class="img-fluid img-thumbnail img-responsive" src="'+img_link_0+'" alt="" srcset="">'
                        out = out + '</a>'
                    out = out + '</div>'
                    out = out + '<div class="px-1 card-footer d-flex flex-column justify-content-start">'
                        out = out + '<span class="fs-20 text-capitalize">'
                            out = out + item_name
                        out = out + '</span>'
                        out = out + '<span class="d-flex align-items-center">'
                            out = out + '<span class="item-rating text-sm" data-rating="'+getRandomInt(3,5)+'"></span>(<span>'+getRandomInt(5, 20)+'</span>)'
                        out = out + '</span>'
                    out = out + '</div>'
                out = out + '</div>'
            out = out + '</div>'
        }
        return out
    }
};
