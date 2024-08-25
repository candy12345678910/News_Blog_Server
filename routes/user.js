const express=require("express")
const user=express()
const { login, register, profile, resetPassword, sendOtp, logout }=require("../controllers/userController")
const isLoggedin =require("../middleware/isLoggedin")

user.get("/",(req,res)=>res.send("user Route"))
user.post("/login", login)
user.post("/register", register)
user.get("/profile", isLoggedin, profile)
user.post("/reset", resetPassword)
user.post('/otp', sendOtp)
user.get("/logout", logout)

module.exports=user