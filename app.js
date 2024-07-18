const express=require("express")
require("dotenv").config()
const app=express();
const port=process.env.PORT || 8000
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connection=require("./connection")

const user=require("./models/user")
const post=require("./models/post")


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.get("/",async(req,res)=>{
    const data=await user.find({
        email: "Sayan@gmail.com"
    })
    console.log(data)
    res.send(data)}
)

app.get("/create",async (req,res)=>{
    await user.create({
        name: "Sayan",
        email: "Sayan@gmail.com",
        password: "password"
    })
    .then((show)=>{
        console.log(show)
        res.send(show)
    })
    .catch(err=>{
        console.log("Email already present")
        res.send("Email already present")
    })
    
    
})

app.get("/*",(req,res)=>res.send("404 Page not found"))

app.listen(port,()=>console.log(`Server started at port ${port}`))
connection("User")