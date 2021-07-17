const express = require("express");
const router = express.Router()
const path = require("path")
const rootDir = require("../util/path")

router.post("/add", (req, res, next) => {
    console.log("**********************")
    console.log("&&&&&&&&&&&&&&&&&&&&&&")
    var item_id =  req.body.item_id.toString()
    var user_id = req.cookies.user_id;
    // res.status(200).render(path.join(rootDir, "views", "checkout"), {"data": data})
    res.status(200).send("succesfully added "+item_id+" for user "+ user_id)
})

// payment

// addresses

// user info



module.exports = router;
