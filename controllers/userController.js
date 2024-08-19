const user=require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login HandlerFunction
const login=async(req,res)=>{
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
                const token = jwt.sign({ email, password }, process.env.JWT_KEY);
                res.cookie("newsToken", token, { maxAge: 3600000 });
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

//Profile HandlerFunction
const profile=async (req, res)=>{
    const data=await user.findOne({email: req.user.email})
    if(!data){
        return res.status(201).send({ "msg": "No user found" })
    }
    return res.status(200).send(data)
}

// Register HandlerFunction
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const data = await user.findOne({ email });
        if (data) {
            return res.status(201).send("Email already exists");
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) {
                return res.status(500).send("Error generating salt");
            }

            bcrypt.hash(password, salt, async function(err, hash) {
                if (err) {
                    return res.status(500).send("Error hashing password");
                }

                try {
                    const newUser = await user.create({
                        name,
                        email,
                        password: hash
                    });

                    const token = jwt.sign({ email, password }, process.env.JWT_KEY);
                    res.cookie("newsToken", token, { maxAge: 3600000 });
                    return res.status(200).send({'msg': "Registered"});
                } catch (err) {
                    return res.status(500).send("Error occurred while storing in database: " + err);
                }
            });
        });
    } catch (err) {
        return res.status(500).send("Error occurred while checking if email is present: " + err);
    }
};

//Logout HandlerFunction
const logout=(req, res)=>{
    res.cookie('newsToken','').send("You need to be logged in")
}


module.exports={
    login,
    register,
    profile,
    logout
}