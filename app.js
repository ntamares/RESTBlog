var express      = require("express"),
    app          = express(),
    bodyParser   = require ("body-parser")
    mongoose     = require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://www.manmadekennels.com/wp-content/uploads/2018/11/CHAMPAGNE-FEMALE-PUPPY.jpg",
//     body: "look at him!"
// });

////////////////////////////////
////        Routes         ////
//////////////////////////////

// ROOT ROUTE
app.get("/", function(req, res){
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }
        else {
            res.render("index", {blogs: blogs})
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req,res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

///////////////////////////////

app.listen(3000, function(){
    console.log("RESTful blog app has started");
});