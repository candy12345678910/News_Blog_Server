const express=require("express")
const user=express()
const { login, register }=require("../controllers/userController")

user.get("/",(req,res)=>res.send("user Route"))
user.get("/login",login)
user.post("/register",register)

module.exports=user