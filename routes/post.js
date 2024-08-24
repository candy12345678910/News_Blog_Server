const express=require("express")
const postRoute=express()
const { allPost, createPost, userPost, deletePost, allUser}=require("../controllers/postController")

postRoute.get('/',(req, res)=>res.send("Post route"))
postRoute.get("/alluser", allUser)
postRoute.get("/allpost", allPost)
postRoute.post("/userpost", userPost)
postRoute.post("/create", createPost)
postRoute.post("/delete", deletePost)

module.exports=postRoute