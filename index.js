let express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user_route");
let app=express();
let cors=require("cors");
const { blogRouter } = require("./routes/blog_route");
const { auth } = require("./middleware/auth");
const cookie=require("cookie-parser");
app.use(cookie())
app.use(cors());

app.use(express.json());


app.use("/user",userRouter)
app.use(auth)
app.use("/blog",blogRouter)

app.get("/",(req,res)=>{
    res.send("Home Page working Fine")
})

app.listen(8090,async()=>{
    try {
        await connection
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running on port 8090")
})