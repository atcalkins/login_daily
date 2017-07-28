const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const allowedUsers = {
  email: "abc@gmail.com",
  password: "troll"
};

// Register '.mustache' extension with The Mustache Express
app.engine("mustache", mustacheExpress());

// Turn on default template engine
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

// Setup a session store using express-session
app.use(
  session({
    secret: "1823-984719824798127349878971239-8adpsuifhlkjhak;jfads",
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true }
  })
);


app.use(require("./login"));

app.use('/', function(req, res) {
    res.render("login");
});

app.use(function(req, res, next) {       // Catches access to all other pages
    if(!req.session.accessToken) {       // requiring a valid access token
        res.redirect('/login');
    } else {
        next();
    }
});


app.listen(3000, () => {
  console.log(
    `Node runnning in ${app.get("env")} mode at http://localhost:3000`
  );
});
