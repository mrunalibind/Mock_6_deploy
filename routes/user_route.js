let express=require("express");
const { UserModel } = require("../models/user_model");
let userRouter=express.Router();
let bcrypt=require("bcrypt");
let jwt=require("jsonwebtoken");

userRouter.post("/register",async(req,res)=>{
    let {username,avatar,email,password}=req.body;
    try {
        let user=await UserModel.findOne({email});
        if(user){
            return res.status(400).send({msg:"User is already exists"})
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            let user=new UserModel({username,avatar,email,password:hash});
            await user.save();
            res.status(200).send({msg:"Registeration Successfull"})
        })
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

userRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    try {
        let user=await UserModel.findOne({email});
        if(!user){
            return res.status(400).send({msg:"User is not exists"})
        }
        bcrypt.compare(password,user.password,async(err,result)=>{
            if(result){
                let token=jwt.sign({userData:user},"privatekey");
                if(token){
                        res.status(200).send({msg:"Login Successfull",token})
                        console.log(token);
                        
                }    
            }
        })
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

module.exports={userRouter};