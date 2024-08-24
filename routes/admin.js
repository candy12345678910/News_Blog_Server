const express=require("express")
const admin=express()
const { adminLogin, deleteUser }=require("../controllers/adminController")

admin.get("/",(req,res)=>res.send("Admin route"))
admin.post("/admin/login", adminLogin)
admin.post("/delete/user", deleteUser)

module.exports=admin