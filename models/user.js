const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("user", userSchema);
