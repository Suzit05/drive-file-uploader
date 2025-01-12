const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => {   //url env se liya jaa rha
        console.log("connected to db")
    })  
}

module.exports = connectToDB;