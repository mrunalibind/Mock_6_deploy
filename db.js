let mongoose=require("mongoose");
// require("dotenv").config();
let connection=mongoose.connect("mongodb+srv://mrunali:mrunalibind@cluster0.tsxywrf.mongodb.net/Mock6?retryWrites=true&w=majority");

module.exports={connection};