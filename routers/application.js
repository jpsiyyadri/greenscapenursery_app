const express = require("express");
const router = express.Router()
const path = require("path")
const rootDir = require("../util/path")
const url = require("url")
const _ = require("lodash")
const http = require("http");
const moment = require("moment");
var HOST = 'localhost'
// HOST = 'http://65.1.118.86/api'

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
                items_data = items_data.slice(0, 15)
                return res.status(200).render(path.join(rootDir, "views", "plant_page"), {
                    "items": items_data, "cur_item": cur_item, "image_array": [0,1,2,3,4]
                })
            } 
        }
        return res.status(500).send("plant_id is missing")       
    })
})

router.get("/category_items", (req, res) => {
  getAPIResponse(res, "/api/items", "GET").then((items_data) => {
    // res.send(categories_data.concat(items_data))
    const url_query_params = url.parse(req.url, true).query
    const category_id = url_query_params["category_id"] || ""
    const category_name = url_query_params["category_name"]
    var cate_items = items_data;
    if(category_id.length){
      cate_items = _.filter(items_data, {"plant_category_type": category_id})
    }
    if(cate_items.length){
        console.log(cate_items)
        return res.status(200).render(path.join(rootDir, "views", "all_items"), {
          "items": cate_items, "category_name": category_name
        })
    } 
    
    return res.status(500).send(`<h1>`+category_name+` items are not available</h1><a href='/'>Go to Home</a>`)
  })
})

router.get("/about", (req, res, next) =>{
  // return res.status(500).send(`<h1>About us</h1>`)
  return res.status(200).render(path.join(rootDir, "views", "about"))
})

router.get("/services", (req, res, next) =>{
  // return res.status(500).send(`<h1>Services</h1>`)
  return res.status(200).render(path.join(rootDir, "views", "services"))
})

router.get("/", (req, res) => {
    var isVerifiedUser = req.cookies.auth_verified;
    getAPIResponse(res, '/api/category/get', "GET").then((categories_data) => {
        getAPIResponse(res, "/api/items", "GET").then((items_data) => {
            // res.send(categories_data.concat(items_data))
            items_data = items_data.slice(0, 15)
            res.status(200).render(path.join(rootDir, "views", "home"), {
                "categories": categories_data, "items": items_data, 'isVerifiedUser': isVerifiedUser
            })   
        })
    })
})


module.exports = router;
