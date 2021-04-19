const express = require("express");
const router = express.Router()
const path = require("path")
const rootDir = require("../util/path")

router.get("/", (req, res, next) => {
    const set_of_operations = [
        {"url": "/item/add", "operation": "add plants", "description": "add new plant", "class": "bg-info"},
        {"url": "/item/show", "operation": "show plants", "description": "show plants", "class": "bg-secondary"},
        {"url": "/category/add", "operation": "add category", "description": "Add Categories", "class": "bg-info"},
        {"url": "/category/show", "operation": "show category", "description": "Show Categories", "class": "bg-secondary"},
        {"url": "/pottery/add", "operation": "add pottery", "description": "Add Pottery", "class": "bg-info"},
        {"url": "/pottery/show", "operation": "show pottery", "description": "Show Pottery", "class": "bg-secondary"},
        {"url": "/soil/add", "operation": "add soil", "description": "Add Soils", "class": "bg-info"},
        {"url": "/soil/show", "operation": "show soil", "description": "Show Soils", "class": "bg-secondary"},
        // {"url": "/item/update", "operation": "update", "description": "update plant", "class": "bg-warning"},
        // {"url": "/item/delete", "operation": "delete", "description": "delete plants", "class": "bg-danger"},
    ]
    res.status(200).render(path.join(rootDir, "views", "admin"), {"actions": set_of_operations})
})


module.exports = router;
