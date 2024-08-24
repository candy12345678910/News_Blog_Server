const user=require("../models/user")
const post=require("../models/post")
const admin=require("../models/admin")
const allDetails=require("../models/allDetails")
// const bcrypt = require('bcrypt');

// Admin Login handler function
const adminLogin=async(req, res)=>{
    const { email, password }=req.body
        const data=await user.findOne({email})
        // console.log(data.password)
        if(!data){
            return res.status(201).send("No account found")
        }
        try{
            bcrypt.compare(password, data.password, function(err, result){
                if (result) {
                    console.log('Password matches!');    
                    return res.status(200).send({'msg': "Logged in"})
                } else {
                    console.log('Password does not match.');
                    return res.status(202).send("Password not matched")
                }
            });
        }
        catch(err){
            console.log("Error occured while hashing password")
        }
}

// Delete user handler function
const deleteUser=async(req,res)=>{
    // console.log(req.body)
    try{
        const { _id, email }=req.body
        const userData=await user.findOne({_id})
        const userPostArray=userData.post
        await post.deleteMany({ _id: { $in: userPostArray } })
        await user.deleteOne({_id})
        return res.status(200).send({message: "User deletedet successfully"})
    }
    catch(err){
        console.error('Error deleting user and posts:', error);
        res.status(201).json({ message: "An error occurred while deleting the user and posts" });
    }
}

module.exports={
    adminLogin,
    deleteUser
}