const user=require("../models/user")
const post=require("../models/post")
const admin=require("../models/admin")
const allDetails=require("../models/allDetails")
const bcrypt = require('bcrypt');

// Admin Login handler function
const adminLogin=async(req, res)=>{

    const { email, password }=req.body
        const data=await admin.findOne({email})
        if(!data){
            return res.status(201).send("No account found")
        }
        // console.log(data.password)
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

// Admin Register handler
const adminRegister=async(req, res)=>{
    // const { email, password, superAdmin } = req.body;
    // const data={ 'email': req.body.email,
    //     'password': req.body.password,
    //     'superAdmin': req.body.superAdmin || false
    // }
    // console.log(data)
    // return res.status(200).send(data)
    try {
        const data = await admin.findOne({ email: req.body.email });
        if (data) {
            return res.status(201).send("Email already exists");
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) {
                return res.status(500).send("Error generating salt");
            }

            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                if (err) {
                    return res.status(500).send("Error hashing password");
                }

                try {
                    const newUser = await admin.create({
                        email: req.body.email,
                        password: hash,
                        superAdmin: req.body.superAdmin || false

                    });
                    return res.status(200).send({'msg': "Admin Registered"});
                } catch (err) {
                    return res.status(500).send("Error occurred while storing in database: " + err);
                }
            });
        });
    } catch (err) {
        return res.status(500).send("Error occurred while checking if email is present: " + err);
    }
}

// Delete user handler function
const deleteUser=async(req,res)=>{
    // console.log(req.body)
    try{
        const { _id, email }=req.body
        const userData=await user.findOne({_id})
        const userPostArray=userData.post
        const del=await post.deleteMany({ _id: { $in: userPostArray } })
        const details = await allDetails.findOne({});
        await user.deleteOne({_id})

        if (details) {
            details.deletedUser += 1;
            details.deletedPost += del.deletedCount;
            await details.save();
            // console.log(details)
        } else {
            console.log("Details not found")
            return res.status(404).send({ message: "Details not found" });
        }
        
        return res.status(200).send({message: "User deletedet successfully"})
    }
    catch(err){
        console.error('Error deleting user and posts:', error);
        res.status(201).json({ message: "An error occurred while deleting the user and posts" });
    }
}

// Delete post handler function
const deletePost=async(req, res)=>{
    // console.log(req.body)
    try{
        const { _id, email }=req.body
        const userData=await user.findOne({email})
        const details = await allDetails.findOne({});
        await post.deleteOne({_id})
        userData.post=userData.post.filter(i=>i!=_id)
        await userData.save();

        if (details) {
            details.deletedPost += 1;
            await details.save();
            // console.log(details)
        } else {
            console.log("Details not found")
            return res.status(404).send({ message: "Details not found" });
        }

        return res.status(200).send("Post deleted successfully");
    }
    catch(err){
        console.error("Error deleting post:", err);
        return res.status(500).send("An error occurred while deleting the post");
    }
}


//Delete details
const deleteDetails=async(req, res)=>{
    try{
        const all=await allDetails.find({})
        return res.status(200).send(all[0])
    }
    catch(err){
        console.log("Error while sending details"+err)
        return res.status(201).send({"msg": "Erro while sending details"})
    }
}

module.exports={
    adminLogin,
    adminRegister,
    deleteUser,
    deletePost,
    deleteDetails
}