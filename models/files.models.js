//path m kch changes ho jata hai jb same naam k do file rhta hai, to usko yha theek kia jaega


const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, "path is required"]

    },
    originalname: {
        type: String,
        required: [true, "Original name is required"]
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,  //id
        ref: "users",   //collection in database
        required: [true, "User is required"]
    }
})


const file = mongoose.model("file", fileSchema)

module.exports = file;