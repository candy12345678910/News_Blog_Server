const express=require("express")
const user=express()
const { login, register, logout }=require("../controllers/userController")
const isLoggedin =require("../middleware/isLoggedin")

user.get("/",(req,res)=>res.send("user Route"))
user.post("/login",isLoggedin, login)
user.post("/register",register)
user.get("/logout", logout)

module.exports=user