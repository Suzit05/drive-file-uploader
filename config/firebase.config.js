//npm i firebase-admin

const Firebase = require("firebase-admin")

const serviceAccount = require("../drive-backend-337e7-firebase-adminsdk-mqaj1-c0a112398e.json")

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: "drive-backend-337e7.firebasestorage.app"
})

module.exports = Firebase;