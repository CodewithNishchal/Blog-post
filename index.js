import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public")); 
app.use(bodyParser.urlencoded({ extended: true }));

//This is the string that will hold the data
let blog_head = [];
let blog_details = [];
let id = 0;
let heading = "";
let details = "";
let content = null;
let blog = [];
let curr_id = -1;

app.get("/", (req, res) => {
    if(content === null)
        res.render("index.ejs");
    else
        res.render("index.ejs", { form_data: content });
})

app.post("/create_Post", (req, res) => {
    res.render("form.ejs");
})

app.post("/alter_Post", (req, res) => {
    console.log(req.body);
    heading = blog_head[req.body.id];
    details = blog_details[req.body.id];
    curr_id = req.body.id;
    res.render("form.ejs", { blog_heading: heading, blog_details: details });
})

app.post("/", (req, res) => {
    console.log(req.body.blog_heading);
    console.log(req.body.blog_details);
    heading = req.body.blog_heading;
    details = req.body.blog_details;
    if (req.body.name === "create") {
        blog_head.push(heading);
        blog_details.push(details);
        blog.push("<button class='test' name='id' value='" + id + "'>" + heading + "</button>");
        content = "";
        blog.forEach(element => {
            content += element;
        });
        id++;
        res.render("index.ejs", { form_data: content });
    }

    else if (req.body.name === "update")
    {
        blog_head[curr_id] = heading;
        blog_details[curr_id] = details;
        blog[curr_id] = "<button class='test' name='id' value='" + curr_id + "'>" + heading + "</button>";
        content = " ";
        blog.forEach(element => {
            content += element;
        });
        curr_id = -1;
        res.render("index.ejs", { form_data: content });
    }

    else if (req.body.name === "delete")
    {
        blog_head.splice(curr_id, 1);
        blog_details.splice(curr_id, 1);
        blog.splice(curr_id, 1);
        for (let i = 0; i < blog.length; i++)
        {
            blog[i] = "<button class='test' name='id' value='" + i + "'>" + blog_head[i] + "</button>";
        }
        content = " ";
        blog.forEach(element => {
            content += element;
        });
        curr_id = -1;
        res.render("index.ejs", { form_data: content });
    }
        
    else
        res.render("index.ejs", { form_data: content });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})