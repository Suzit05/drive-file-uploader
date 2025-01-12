//path m kch changes ho jata hai jb same naam k do file rhta hai, to usko yha theek kia jaega


const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, "path is required"]

    },
//yha se start ho jao........
})