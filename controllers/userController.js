const user=require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login HandlerFunction
const login=(req,res)=>{
    res.send("Login")
}


// Register HandlerFunction
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const data = await user.findOne({ email });
        if (data) {
            res.status(201).send("Email already exists");
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
        
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {  
                await user.create({
                    name,
                    email,
                    password: hash
                })
                .then((data)=>{
                    const token = jwt.sign({ email, password }, process.env.JWT_KEY);                    
                    res.cookie("newsToken", token,{maxAge: 3600000}).send(email)
                })
                .catch(err=>res.send("Error ocured while storing in data base, bujhle khoka: "+err))
            });
        });        
    } catch (err) {
        res.status(500).send("Error occurred while checking email is present or not");
    }
};




module.exports={
    login,
    register
}