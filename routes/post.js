const express=require("express")
const post=express()
const { allPost, createPost}=require("../controllers/postController")

post.get('/',(req, res)=>res.send("Post route"))
post.get("/allpost", allPost)
post.post("/create", createPost)

module.exports=post