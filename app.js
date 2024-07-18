const express=require("express")
require("dotenv").config()
const app=express();
const port=process.env.PORT || 8000
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connection=require("./connection")


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.get("/",(req,res)=>res.send(req.body))
app.get("/:id",(req,res)=>res.cookie("name",req.params.id).send(`hello ${req.params.id}`))
app.get("/api/logout",(req,res)=>res.cookie("name","").send("Loggedout"))
app.get("/about",(req,res)=>res.send("I am abhijit, I'm a web developer"))
app.get("/*",(req,res)=>res.send("404 Page not found"))

app.listen(port,()=>console.log(`Server started at port ${port}`))
connection("User")