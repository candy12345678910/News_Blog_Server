const express=require("express")
const admin=express()

admin.get("/",(req,res)=>res.send("Admin route"))

module.exports=admin