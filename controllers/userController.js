const user=require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login HandlerFunction
const login=(req,res)=>{
    return res.status(200).send({'token': req.cookies.newsToken})
}

//Profile HandlerFunction


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
                    return res.send(email);
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
    logout
}