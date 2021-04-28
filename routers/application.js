const express = require("express");
const router = express.Router()
const path = require("path")
const rootDir = require("../util/path")
const url = require("url")
const _ = require("lodash")
const http = require("http");
const moment = require("moment");
const e = require("express");
var HOST = 'localhost'
// var HOST = 'http://65.1.118.86/'

router.get("/home", (req, res) => {
    return res.send("kanikaram ledu ra bhai")
})

function getAPIResponse(res, url_path, req_type, data=""){
    try{
        return new Promise((resolve, reject) => {
            var request = http.request({
                host: HOST,
                port: 3000,
                path: url_path,
                method: req_type,
                headers: {
                  'Content-Type': 'application/json',
                  'Content-Length': data.length
                }
              }, function(response) {
                if(response.statusCode == 200){
                  var data = '';
                  response.setEncoding('utf8');
                  response.on('data', (chunk) => {
                      data += chunk;
                  });
                  response.on('end', () => {
                    data = JSON.parse(data)
                    // callback_func(res, data)
                    resolve(data)
                  });
                } else{
                  throwError(res, 500)
                }
              });
              request.write(data);
              request.on("error", (err) => {
                throwError(res, 500)
                reject()
              })
        })
    } catch(err){
      console.log(err)
      reject()
    }
}

  
router.get("/plant", (req, res) => {
    getAPIResponse(res, "/api/items", "GET").then((items_data) => {
        // res.send(categories_data.concat(items_data))
        const url_query_params = url.parse(req.url, true).query
        const plant_id = url_query_params["plant_id"]
        if(plant_id){
            const cur_item = _.filter(items_data, {"id": plant_id})
            if(cur_item.length){
                console.log(cur_item)
                return res.status(200).render(path.join(rootDir, "views", "plant_page"), {
                    "items": items_data, "cur_item": cur_item, "image_array": [0,1,2,3,4]
                })
            } 
        }
        return res.status(500).send("plant_id is missing")       
    })
})

router.get("/", (req, res) => {
    getAPIResponse(res, '/api/category/get', "GET").then((categories_data) => {
        getAPIResponse(res, "/api/items", "GET").then((items_data) => {
            // res.send(categories_data.concat(items_data))
            res.status(200).render(path.join(rootDir, "views", "home"), {
                "categories": categories_data, "items": items_data
            })   
        })
    })
})


module.exports = router;
