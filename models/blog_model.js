let mongoose=require("mongoose");
let blogSchema=mongoose.Schema({
    username:String,
    title:String,
    content:String,
    category:String,
    date:{
        type:String
        
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[{username:String,content:String}]
})


let BlogModel=mongoose.model("blog",blogSchema);

module.exports={BlogModel}