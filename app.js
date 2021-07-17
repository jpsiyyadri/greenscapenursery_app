const express = require("express");
const app = express();
const path = require("path");
const body_parser = require("body-parser");
const express_handlebars = require("express-handlebars");
const userRoutes = require("./routers/user");
const adminRoutes = require("./routers/admin");
const itemRoutes = require("./routers/item");
const categoryRoutes = require("./routers/category");
const cartRoutes = require("./routers/cart");
const appRoutes = require("./routers/application");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const rootDir = require("./util/path");
const csrfMiddleWare = csrf({ "cookie": true});
const firebase_admin = require("./util/db_connect");

exhbs = express_handlebars.create(
    {
        layoutsDir: path.join(__dirname, 'views/layouts'),
        defaultLayout: 'main',
        // custom helpers
        helpers: require("./handlers")

    }
)


app.engine("handlebars", exhbs.engine)
app.set("view engine", "handlebars")
// app.enable('view cache')

// Serve Static Assets
app.set("views", "views")


app.use(body_parser.urlencoded({"extended": false}));
app.use(body_parser.json());
app.use(body_parser.raw())
app.use(cookieParser());
app.use(csrfMiddleWare)

// app.use(function(req, res, next) {
//     app.locals._token = req.csrfToken()
//     next()
// })
// serves static files
app.use("/static", express.static(path.join(__dirname, "public")))

// serve nodu modules
app.use("/node_modules/", express.static(path.join(__dirname, "node_modules")))

// server will add a token to ensure security
app.all("*", (req, res, next) => {
    res.cookie("xsrfToken", req.csrfToken());
    res.cookie("SameSite", "Lax");
    next();
});

app.get("/login", function(req, res){
    return res.status(200).render(path.join(rootDir, "views", "login"))
})

// stores session information
app.post("/sessionLogin", (req, res) => {
    const idToken = req.body.idToken.toString();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    firebase_admin
        .auth()
        .createSessionCookie(idToken, {expiresIn})
        .then(
            (sessionCookie) => {
                const options = { maxAge : expiresIn, httpOnly: true}
                res.cookie("session", sessionCookie, options);
                res.end(JSON.stringify({status: "success"}))
                // res.cookie("user_id", idToken, options )
                res.redirect("/")
            },
            (error) => {
                res.status(401).send("UNAUTHORISED REQUEST")
            }
        )
})

// verify every incoming request
function verifyCookie(req, res, next){
    const sessionCookie = req.cookies.session || "";
    firebase_admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(() => {
            res.cookie("auth_verified", true)
            next()
        })
        .catch((error) => {
            res.cookie("auth_verified", false)
            next()
        })
}

// verifies all incoming requests
app.all("*", verifyCookie)


app.use("/cart", cartRoutes)
app.use("/user", userRoutes)
// app.use("/admin", adminRoutes)
app.use("/item", itemRoutes)
app.use("/category", categoryRoutes)
app.use("/", appRoutes)


// app.get("/", (req, res) => {
//     res.status(404).render("error", {"error_id": "404", "message": `Requested ${req.url} Not Found Error`})
// })


// clears session information
app.get("/sessionLogout", (Req, res) => {
    res.clearCookie("session");
    res.redirect("/login")
})

// exit ctrl+c method
process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(1);
});

// start the server
app.listen(5000)
console.log("The app is live on 5000 port!!!")
