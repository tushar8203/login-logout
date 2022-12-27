const { resolveSoa } = require("dns");
let express=require("express");
let app=express();
let hbs=require("hbs");
let path=require("path");
let https=require("https");
let unirest=require("unirest");

let req1=unirest("GET","https://www.fast2sms.com/dev/bulkV2");

app.set("view engine","hbs");
app.set("views",path.join(__dirname,"../templates/"));

app.get("/",(req,res)=>{
    res.render("sms");
})
app.get("/sms",(req,res)=>{
    let {mobile,text}=req.query;
    console.log(mobile,text);
    req1.query({
        "authorization":"YCKFRaoShxrTdA7pmJNgn4ZWGjQVIyMOEfk5w1eD6P2c0bX3vtv60He7xgmWEbB8F9KsGLXzCYthuayp",
        "message":text,
        "language":"english",
        "route":"q",
        "numbers":mobile
    });
     req1.headers({
        "cache-control":"no-cache"
     })
     req1.end(function(res){
        if(res.error) throw new Error(res.error);
        console.log(res.body);
     });
    res.redirect("/?=sms");
})
app.listen(5083);
console.log("Server is started at the port 5083...");
