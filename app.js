const express=require("express")
require("dotenv").config()

const app=express();
const port=process.env.PORT || 8000
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connection=require("./connection")

// const user=require("./models/user")
// const post=require("./models/post")
const apiFetch=require("./routes/apiFetch")
const userRoute=require("./routes/user")
const postRoute=require("./routes/post")

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())


app.use("/api/fetch/",apiFetch)
app.use("/api/user/",userRoute)
app.use("/api/post/",postRoute)
app.get("/*",(req,res)=>res.send("404 Page not found"))

app.listen(port,()=>console.log(`Server started at port ${port}`))
connection("User")