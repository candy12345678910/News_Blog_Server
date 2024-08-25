const mongoose=require("mongoose")

const adminSchema=mongoose.Schema({
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String, 
            required: true
        },
        superAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timeStams: true
    }
)

module.exports= mongoose.model("admin", adminSchema)