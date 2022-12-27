let mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/silverwinkdemo")
.then(() => {}).catch((err) =>{});

let loginSchema= new mongoose.Schema({
    Name:{
        type:String, 
        required:true
    },
    Password:{
        type:String, 
        required:true
    },
    Email:{
        type:String ,
        required:true
    },
    Mobile:{
        type:Number,
        required:true
    }
})

let sign= new mongoose.model("sign",loginSchema,"Sign");
module.exports={
    sign:sign,
    // mongoUri:mongoUri
};