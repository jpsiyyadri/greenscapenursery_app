const express = require("express");
const router = express.Router()
const path = require("path")
const rootDir = require("../util/path")
const url = require("url")
const http = require("http");
const multer = require("multer")
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 5 * 1024 * 1024 // limits 5 MB
  }
})



function getAPIResponse(res, url_path, req_type, callback_func, data=""){
  var request = http.request({
    host: 'localhost',
    port: 3000,
    path: url_path,
    method: req_type,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      // headers such as "Cookie" can be extracted from req object and sent to /test
    }
  }, function(response) {
    var data = '';
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
        data += chunk;
    });
    response.on('end', () => {
    //   res.end('check result: ' + data);
      data = JSON.parse(data)
      callback_func(res, data)
    });
  });
  request.write(data);
  request.on("error", (err) => {
    throwError(res, 500)
  })
  request.end();
}

function throwError(res, error_id){
  return res.status(error_id, "Internal Server Error")
}

function renderShowItems(res, data){
  return res.status(200).render("show_items", {
      "items": data,
      "hasProducts": true
    })
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
    const ref = url_query_params.ref || "items"
    getAPIResponse(res, "/api/items", "GET", renderShowItems)
})

// function render_add_item_page(res, categories){
//     res.sendFile(path.join(rootDir, "views", "admin", "add_item.html"), {"categories": categories})
// }

function renderAddItem(res, data){
  return res.status(200).render("add_item", {"categories": data})
}

router.get('/add', (req, res, next) => {
  getAPIResponse(res, '/api/categories', "GET", renderAddItem)
})


function redirectToHomePage(res, data){
  console.log("sucecefully redirected")
}

router.post('/add_new_item', upload.array("plant_image", 3), (req, res, next) => {
  getAPIResponse(res, '/api/add_item', "POST", redirectToHomePage, JSON.stringify({
    "files": JSON.stringify(req.files), "plant_description": req.body.plant_description, "plant_name": req.body.plant_name,
    "plant_category": req.body.plant_category, "plant_price": req.body.plant_price
  }))
})

router.get('/', (req, res, next) => {
    return res.send("Page not found error")
})

module.exports = router;
