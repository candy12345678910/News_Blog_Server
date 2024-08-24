const mongoose=require("mongoose")

const allDetails=mongoose.Schema({
    deletedUser: {
        type: Number,
        default: 0
    },
    deletedPost: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("alldetail", allDetails)