const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());


let posts = [
    {   
        id: uuidv4(),
        username : "Mahatma Gandhi",
        content : "It is the quality of our work which will please God, not the quantity."
    },

    {   
        id: uuidv4(),
        username : "Joseph Joubert",
        content : "He who has imagination without learning has wings but no feet."
    },

    {   
        id: uuidv4(),
        username : "Ralph Abernathy",
        content : "The industrial landscape is already littered with remains of once successful companies that could not adapt their strategic vision to altered conditions of competition."
    },
]

// Showing all posts
app.get("/posts", (req,res)=>{
    res.render("index.ejs", { posts }); 
});

// add new post page
app.get("/posts/new",(req, res)=>{
    res.render("new.ejs");
});
// post req of new.ejs form
app.post("/posts", (req,res)=>{
    let id = uuidv4();
    let {username , content} = req.body;
    posts.push({username, content , id});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    // console.log(id);
    let post = posts.find((p)=> id === p.id);
    res.render("view.ejs", { post });
});
//edit get request
app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    // console.log(id);
    res.render("edit.ejs", {post});
});
// patch request
app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    // console.log(newContent);
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    // console.log(post);
    res.redirect("/posts");
});
app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id != p.id);
    res.redirect("/posts");
});
app.get("/", (req, res)=>{
    res.redirect("/posts");
});

app.listen(PORT, ()=>{
    console.log("app is listning to port:", PORT);
});