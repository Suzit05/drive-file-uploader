// npm i multer multer-firebase-storage  -- for any frontend files to backend
const multer = require("multer")
const firebasestorage = require("multer-firebase-storage")
const firebase = require("../config/firebase.config")
const serviceAccount = require("../drive-backend-337e7-firebase-adminsdk-mqaj1-c0a112398e.json")
const { credential } = require("firebase-admin")


const storage = firebasestorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: "drive-backend-337e7.firebasestorage.app",
    unique: true,
})


const upload = multer({  //upload hone k liye
    storage: storage
})

module.exports = upload  //index-routes-js m require kro