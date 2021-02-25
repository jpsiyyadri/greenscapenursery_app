const express = require("express");
const router = express.Router()
const path = require("path")
const rootDir = require("../util/path")

router.get("/", (req, res, next) => {
    const set_of_operations = [
        {"url": "/item/add", "operation": "add", "description": "add new plant", "class": "bg-success"},
        {"url": "/item/show", "operation": "show", "description": "show plants", "class": "bg-primary"},
        // {"url": "/item/update", "operation": "update", "description": "update plant", "class": "bg-warning"},
        // {"url": "/item/delete", "operation": "delete", "description": "delete plants", "class": "bg-danger"},
    ]
    res.status(200).render(path.join(rootDir, "views", "admin"), {"actions": set_of_operations})
})


module.exports = router;
