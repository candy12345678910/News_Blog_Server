const express=require("express")
const user=express()
const { login, register, profile, sendOtp, logout }=require("../controllers/userController")
const isLoggedin =require("../middleware/isLoggedin")

user.get("/",(req,res)=>res.send("user Route"))
user.post("/login", login)
user.post("/register", register)
user.get("/profile", isLoggedin, profile)
user.post('/otp', sendOtp)
user.get("/logout", logout)

module.exports=user