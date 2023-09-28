let mongoose=require("mongoose");
let userSchema=mongoose.Schema({
    username:String,
    avatar:String,
    email:String,
    password:String
})

let UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}