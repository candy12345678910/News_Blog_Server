const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},
{
    timestamps: true
}
)

module.exports=mongoose.model("post",postSchema)