const user=require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
    const { name, email, password, img } = req.body;

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
                        password: hash,
                        img
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

//Otp sender
const sendOtp = async (req, res)=>{
    
    const otp=Math.floor(100000 + Math.random() * 900000).toString()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'skigamerz4@gmail.com',
          pass: 'dcehulyzlxokjbzc'
        }
      });
      
      const mailOptions = {
        from: 'skigamerz4@gmail.com',
        to: req.body.email,
        subject: 'NewsBlog OTP',
        text: otp
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log("Error when sending otp to email: "+error);
          return res.status(201).send("Invalid email")
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).send(otp)
        }
      });

}

//Logout HandlerFunction
const logout=(req, res)=>{
    res.cookie('newsToken','').send("You need to be logged in")
}


module.exports={
    login,
    register,
    profile,
    sendOtp,
    logout
}