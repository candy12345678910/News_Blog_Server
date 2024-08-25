const express=require("express")
const admin=express()
const { adminLogin, adminRegister, deleteUser, deletePost, deleteDetails }=require("../controllers/adminController")

admin.get("/",(req,res)=>res.send("Admin route"))
admin.get("/delete-detail", deleteDetails)
admin.post("/admin-login", adminLogin)
admin.post("/admin-register", adminRegister)
admin.post("/delete/user", deleteUser)
admin.post("/delete/post", deletePost)

module.exports=admin