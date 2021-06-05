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
const { IMAGE_FIELDS_ARRAY, SHOW_CATEGORY_TABLE_COLS } = require("../util/config")
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
        return response.on('end', () => {
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

    form.append("category_name", req.body.category_name)

    for(var i=0;i<count_of_images_to_upload;i++){
      console.log(path.join(rootDir, `/uploads/test/${file_names[i]}`))
      const readStream = fs.createReadStream(path.join(rootDir, `/uploads/test/${file_names[i]}`))
      form.append("category_image", readStream)
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
          fs.unlinkSync(path.join(rootDir, `/uploads/test/${file_names[i]}`), {
            force: true,
          });  
        }
        file_names = []
        return resp.redirect("/category/show/")
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

function renderShowCategories(res, data){
  // if(data.length){
    return res.status(200).render("show_categories", {
        "items": data,
        "table_structure": SHOW_CATEGORY_TABLE_COLS,
        "hasProducts": (data.length)?true: false
      })
  // } else{
  //   return res.status(200).redirect("/admin/")
  // }
}
router.get("/show", (req, res) => {
    const url_query_params = url.parse(req.url, true).query
    const ref = url_query_params.ref || "items"
    getAPIResponse(res, "/api/category/get", "GET", renderShowCategories)
})

function renderPostDelete(res){
  res.redirect("/category/show")
}

router.get('/add', (req, res, next) => {
  return res.status(200).render("add_category")
})


router.get('/delete', (req, res, next) => {
  getAPIResponse(res, `/api/category/${req.url}`, "GET", renderPostDelete)
})

function redirectToHomePage(res, data){
  console.log("sucecefully redirected")
  res.redirect("/admin/")
}

var cpUpload = upload.fields(IMAGE_FIELDS_ARRAY)

router.post('/add_new_category', cpUpload, (req, res, next) => {
  try{
    if(req.files){
      console.log(Object.keys(req.files).length)
    }
    // console.log(req.files[0])
    pushItemToDataBase(req, res, '/api/category/add_new_category', redirectToHomePage)
    // res.send("uploaded succesfully")
  } catch{
    res.send("error: ", err)
  }
})

router.get('/', (req, res, next) => {
    return res.send("Page not found error")
})

module.exports = router;
