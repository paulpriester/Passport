var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	hbs = require("hbs"),
	passport = require("passport"),
	bcrypt = require("bcrypt-nodejs"),
	session = require("express-session"),
	User = require("./user"),
	localAuth = require("./auth"),
	app = express();

app.set("view engine", "hbs")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session ({
	secret: "itsASecret",
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

localAuth(passport);

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/login", function(req, res) {
	res.render("login");
});

app.get("/signup", function(req, res) {
	res.render("signup");
});

app.post("/login", passport.authenticate("local-login",{
		successRedirect: "/user",
		failureRedirect: "/login"
}));

app.post("/signup", function(req, res) {
	new User({
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password),
		token: id()
	}).save(function(err) {
		if(err){
			console.log(err);
		} else {
			res.redirect("/login");
		}
	});
});

app.get("/user", function(req, res) {
	res.render("user", {
		user: req.user
	});
});

mongoose.connect("mongodb://localhost/user");
app.listen(8080);

console.log("server is running");