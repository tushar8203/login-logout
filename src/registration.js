let mongoose=require("mongoose");
let signSchema=mongoose.Schema({
    Name:String,
    Email:String,
    Password:String
})
let sign=mongoose.model("sign", signSchema,"Sign");
module.exports=sign;