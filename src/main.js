let express=require("express");
let app=express();
let hbs=require("hbs");
let mongoose=require("mongoose");
let path=require("path");
let bcrypt=require("bcryptjs");
let {sign}=require("./mongoose");

let session=require("express-session");
let mongosession=require("connect-mongodb-session")(session);
let mongoURI="mongodb://127.0.0.1:27017/silverwinkdemo";
app.use(express.urlencoded({extended:true}))
app.set("view engine","hbs");
app.set("views", path.join(__dirname,"../templates/"));

// for session storing in mongodb
let store=new mongosession({
    uri:mongoURI,
    collection:"mysession"
});

// this is the session
app.use(session({
    secret:"Tushar",
    resave:false,
    saveUninitialized:false,
    store:store
}));

let auth=(req,res,next)=>{
    if(req.session.auth){
        next();
    }
    else{
        res.redirect("/signin");
    }
}

app.get("/",auth,(req,res)=>{
    res.render("home");
})

app.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        return res.redirect("/signin");
    })
})
app.get("/signin",(req,res)=>{
    res.render("login");
})
app.get("/login",async(req,res)=>{
    const {email,password}=req.query;
    // let pass=bcrypt.hash(password,12);
    let data={
        Email:email
    }

    sign.find(data,(err,result)=>{
        if(err) return err;
        if(result==""){
            console.log("Data is not find");
            res.redirect("/signin?=fail");
        }
        else{
            if(bcrypt.compareSync(password,result[0].Password)){
                console.log("password is found");
                // res.redirect("/signin?=success"); 
                console.log("data is found successfully");
                req.session.auth=true;
                res.redirect("/");
            }
            else{
                console.log("password is not match")
                res.redirect("/signin?=fail");
            }
        }
    })
    // const signin= await sign.findOne(data);
    // if(bcrypt.compareSync(password,signin.Password)){
    //     console.log("password is found");
    //     res.redirect("/?=success");
    // }
    // else{
    //     console.log("not found");
    //     res.redirect("/?=fail");
    // }

})
app.get("/sign",(req,res)=>{
    res.render("signin");
});

app.get("/signin",async(req,res)=>{
    const {name,email,password,mobile}=req.query;
    console.log(name,email,password);
    let pass=await bcrypt.hash(password,12);
    let data={
        Name:name,
        Email:email,
        Password:pass,
        Mobile:mobile
    }
    await sign.insertMany([data]);
    res.redirect("/sign?=success");
});

app.listen(process.env.PORT);
console.log("Server is starting at the port 5082...");
