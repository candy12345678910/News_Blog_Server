const mongoose=require("mongoose")

const dblink=process.env.MONGODBLINK
const connection=(dbname)=>{
    mongoose.connect(dblink+dbname)
    .then(()=>console.log("Database is connected"))
    .catch((err)=>console.log("Error occured "+err))
}

module.exports=connection