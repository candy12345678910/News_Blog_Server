const user=require("../models/user")
const post=require("../models/post")

//Sending all posts
const allPost=async(req,res)=>{
    try{
        const posts=await post.find({})
        console.log(posts)
        return res.status(200).send(posts)
    }
    catch(err){
        console.log("Error occured in blog: "+err)
    }
}

//Create post handlefunction 
const createPost=async(req,res)=>{
    try{
        const { email, title, content }=req.body
        const userData=await user.findOne({email})
        const postData=await post.create({name: userData.name, email, title, content, user: userData._id})
        userData.post.push(postData._id)
        await userData.save()
        // console.log(postData)
        // return res.status(200).send(res.body)
    }
    catch(err){
        console.log("Error occured while creating a post: "+err)
    }
    
}

module.exports={ 
    allPost,
    createPost,
}