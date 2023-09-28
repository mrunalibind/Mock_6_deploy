let jwt=require("jsonwebtoken");

let auth=async(req,res,next)=>{
    try {
        let token=req.headers.authorization;
      
        if(token){
            jwt.verify(token,"privatekey",(err,decoded)=>{
                if(decoded){
                    
                    req.body.username=decoded.userData.username
                    next()
                }
            })
        }
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
}

module.exports={auth};