let express=require("express");
const { BlogModel } = require("../models/blog_model");
let blogRouter=express.Router();

blogRouter.get("/blogs",async(req,res)=>{
    let {title, category, order}=req.query;
    console.log(order)
    try {
        if(title){
            let blogs=await BlogModel.find({title:title})
            res.status(200).send({msg:blogs});
        }
        else if(category){
            let blogs=await BlogModel.find({category:category})
            res.status(200).send({msg:blogs});
        }
        else if(order){
            let blogs=await BlogModel.aggregate([{$sort:{date:Number(order)}}]);
            res.status(200).send({msg:blogs});
        }
        else{
            let blogs=await BlogModel.find();
            res.status(200).send({msg:blogs});
        }
        
        
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})


blogRouter.post("/blogs",async(req,res)=>{
    let {title,content,category,date}=req.body;
    
    try {
        let blog=new BlogModel({username:req.body.username,title,content,category,date});
        await blog.save();
        res.status(200).send({msg:"Blog is created"});
        
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

blogRouter.patch("/blogs/:id",async(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    try {
        let blog=await BlogModel.findByIdAndUpdate({_id:id},req.body);
        res.status(200).send({msg:"Blog is Updated"});
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

blogRouter.delete("/blogs/:id",async(req,res)=>{
    let {id}=req.params;
    try {
        let blog=await BlogModel.findByIdAndDelete({_id:id});
        res.status(200).send({msg:"Blog is Deleted"});
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

blogRouter.patch("/blogs/:id/like",async(req,res)=>{
    let {id}=req.params;
    try {
        let user=await BlogModel.findByIdAndUpdate({_id:id},req.body)
        
        res.status(200).send({msg:"Blog is Liked"});
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

blogRouter.patch("/blogs/:id/comment",async(req,res)=>{
    let {id}=req.params;
    let {username,content}=req.body
    try {
        let user=await BlogModel.findById({_id:id})
        let newComment={
            username,
            content
        }
        user.comments.push(newComment)
        res.status(200).send({msg:"Comment Done"});
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})


module.exports={blogRouter}
