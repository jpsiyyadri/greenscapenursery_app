const express = require("express");
const app = express();
const path = require("path")
const body_parser = require("body-parser");
const express_handlebars = require("express-handlebars")
const adminRoutes = require("./routers/admin")
const itemRoutes = require("./routers/item")


const rootDir = require("./util/path")

app.engine("handlebars", express_handlebars())
app.set("view engine", "handlebars")
// app.enable('view cache')

app.set("views", "views")


app.use(body_parser.urlencoded({"extended": false}));
app.use(body_parser.json());
app.use(body_parser.raw())

app.use(express.static(path.join(__dirname, "public")))

app.use("/admin", adminRoutes)
app.use("/item", itemRoutes)


app.get("/", (req, res) => {
    res.status(404).render("error", {"error_id": "404", "message": `Requested ${req.url} Not Found Error`})
})

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(1);
});


app.listen(5000)
console.log("The app is live on 5000 port!!!")
