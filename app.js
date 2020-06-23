var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose    = require("mongoose");
var Campground =require('./models/campground');
var Comment=require('./models/comment');
var seedDB=require('./seeds');
var flash =require('connect-flash');
var passport    = require("passport");
var LocalStrategy = require("passport-local");
var	User= require("./models/user");
var methodOverride=require('method-override');

//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")


//CONNECTING MONGOOSE:-
mongoose.connect("mongodb+srv://goormide:Devesh12345@cluster0.ka6aj.mongodb.net/<dbname>?retryWrites=true&w=majority",
{
 useNewUrlParser:true,
 useCreateIndex:true
}).then(()=>{
	console.log('connected to DB');
}).catch(err=>{
	console.log('ERROR',err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//SEEDED DATABASE
//seedDB();

app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	//CHECK@
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});



/*CLEAR THE CODE-:-
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
*/
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);
		
app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!");
});