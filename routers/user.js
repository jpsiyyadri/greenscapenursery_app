const express = require("express");
const router = express.Router()
const path = require("path")
const rootDir = require("../util/path")

router.get("/checkout", (req, res, next) => {
    const data = []
    res.status(200).render(path.join(rootDir, "views", "checkout"), {"data": data})
})


module.exports = router;
