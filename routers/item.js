const express = require("express");
const router = express.Router()
const path = require("path")
const rootDir = require("../util/path")
const url = require("url")
const http = require("http");
const multer = require("multer")
const FormData = require("form-data")
const moment = require("moment")
const fs = require('fs')
const { IMAGE_FIELDS_ARRAY, BAG_SIZES_ARRAY, DESCRIPTION_CATEGORY_ARRAY, SHOW_TABLE_COLS } = require("../util/config")
var file_names = []
var HOST = 'localhost'
// HOST = 'http://65.1.118.86/'

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(rootDir, `/uploads/test/`))
  },
  filename: function (req, file, cb) {
    console.log(">> ", file.fieldname+"."+file.originalname.split(".").slice(-1)[0])
    file_names.push(file.fieldname+"."+file.originalname.split(".").slice(-1)[0])
    cb(null, file.fieldname+"."+file.originalname.split(".").slice(-1)[0])
  }
})
 
var upload = multer({ storage: storage })


function getAPIResponse(res, url_path, req_type, callback_func, data=""){
  try{
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
          callback_func(res, data)
        });
      } else{
        throwError(res, 500)
      }
    });
    request.write(data);
    request.on("error", (err) => {
      throwError(res, 500)
    })
  } catch(err){
    console.log(err)
    res.send("error")
  }
}

function pushItemToDataBase(req, resp, url_path, redirect_url){
  try{
    var count_of_images_to_upload = Object.keys(req.files).length
    var form = new FormData();

    form.append("plant_name", req.body.plant_name)
    form.append("plant_description", req.body.plant_description)
    form.append("plant_category_type", req.body.plant_category_type)
    form.append("plant_price", req.body.plant_price)
    form.append("plant_bag_size", req.body.plant_bag_size)
    form.append("plant_height", req.body.plant_height)

    for(var i=0;i<count_of_images_to_upload;i++){
      console.log(path.join(rootDir, `/uploads/test/${file_names[i]}`))
      const readStream = fs.createReadStream(path.join(rootDir, `/uploads/test/${file_names[i]}`))
      form.append("plant_image", readStream)
    }

    const formReq = http.request(
      {
        host: HOST,
        port: '3000',
        path: url_path,
        method: 'POST',
        headers: form.getHeaders(),
      },
      response => {
        console.log(response.statusCode); // 200
        for(var i=0;i<count_of_images_to_upload;i++){
          console.log(">> ", file_names[i])
          fs.unlinkSync(path.join(rootDir, `/uploads/test/${file_names[i]}`), {
            force: true,
          });  
        }
        file_names = []
        return resp.redirect("/item/show/")
      }
    );
     
    form.pipe(formReq);
  } catch(err){
    console.log("catch block")
    resp.send("Error")
  } finally{
    console.log("finally block")
    // formReq.close()
  }
}

function throwError(res, error_id){
  return res.status(error_id, "Internal Server Error")
}

function renderCategoryItems(res, data){
  // if(data.length){
    return res.status(200).render(path.join(rootDir, "views", "category_items"), {
        "items": data,
    })
  // } else{
  //   return res.status(200).redirect("/admin/")
  // }
}

function renderShowItems(res, data){
  // if(data.length){
    return res.status(200).render("show_items", {
        "items": data,
        "hasProducts": (data.length)?true: false,
        "table_structure": SHOW_TABLE_COLS
      })
  // } else{
  //   return res.status(200).redirect("/admin/")
  // }
}

function renderViewItem(res, data){
  return res.status(200).render("view_item", {
    "items": data,
    "hasProducts": true
  })
}

router.get("/view", (req, res) => {
  const url_query_params = url.parse(req.url, true).query
  getAPIResponse(res, `/api/items?id=${url_query_params.id}`, "GET", renderViewItem)
})

router.get("/show", (req, res) => {
  const url_query_params = url.parse(req.url, true).query
  getAPIResponse(res, "/api/items", "GET", renderShowItems)
})


function renderPostDelete(res){
  res.redirect("/item/show")
}

function renderAddItem(res, data){
  return res.status(200).render("add_item", {
    "categories": data,
    "input_images_obj": IMAGE_FIELDS_ARRAY,
    "bag_size_array": BAG_SIZES_ARRAY,
    "heights_array": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  })
}

router.get('/add', (req, res, next) => {
  getAPIResponse(res, '/api/category/get', "GET", renderAddItem)
})

router.get('/delete', (req, res, next) => {
  getAPIResponse(res, `/api${req.url}`, "GET", renderPostDelete)
})

function redirectToHomePage(res, data){
  console.log("sucecefully redirected")
  res.redirect("/admin/")
}

var cpUpload = upload.fields(IMAGE_FIELDS_ARRAY)

router.post('/add_new_item', cpUpload, (req, res, next) => {
  try{
    if(req.files){
      console.log(Object.keys(req.files).length)
    }
    // console.log(req.files[0])
    pushItemToDataBase(req, res, '/api/add_new_item', redirectToHomePage)
    // res.send("uploaded succesfully")
  } catch{
    res.send("error: ", err)
  }
})

router.get('/', (req, res, next) => {
    return res.send("Page not found error")
})

module.exports = router;
