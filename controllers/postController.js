const user=require("../models/user")
const post=require("../models/post")

//Sending all posts
const allPost=async(req,res)=>{
    try{
        const posts=await post.find({})
        // console.log(posts)
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
        const postData=await post.create({name: userData.name, email, img: userData.img, title, content, user: userData._id})
        userData.post.push(postData._id)
        await userData.save()
        // console.log(postData)
        return res.status(200).send({'msg': 'Post created'})
    }
    catch(err){
        console.log("Error occured while creating a post: "+err)
    }    
}

//Reference post handle unction
const userPost=async(req, res)=>{
    try{
        const userPost=await user.findOne({ email: req.body.email }).populate('post')
        return res.status(200).send(userPost)
    }
    catch(err){
        return res.status(201).send({'msg': "Error while populating data"})
    }
}

//Post Delete handler function
const deletePost=async(req, res)=>{
    try{
        const { _id, email }=req.body
        const userData=await user.findOne({email})
        await post.deleteOne({_id})
        userData.post=userData.post.filter(i=>i!=_id)
        await userData.save();
        return res.status(200).send("Post deleted successfully");
    }
    catch(err){
        console.error("Error deleting post:", err);
        return res.status(500).send("An error occurred while deleting the post");
    }
}

module.exports={ 
    allPost,
    createPost,
    userPost,
    deletePost
}