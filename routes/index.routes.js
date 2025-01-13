//file upload ya home se related routes yha bnega

const express = require("express")
const firebase = require("../config/firebase.config")
const authMiddleware = require("../middlewares/authe")

const router = express.Router();
const upload = require("../config/multer.config")
const fileModel = require("../models/files.models")


router.get("/home", authMiddleware, async (req, res) => {

    const userFiles = await fileModel.find({
        user: req.user.userId //same user k saraa files
    })

    console.log(userFiles)


    res.render("home", {
        files: userFiles
    })



})

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {  //upload.single("name from ejs")
    const newFile = await fileModel.create({
        path: req.file.path,
        originalname: req.file.originalname,
        user: req.user.userId,

    })
    res.json(newFile)
})

router.get("/download/:path", authMiddleware, async (req, res) => {
    //path and loggenInuserId le lo taki dekh pao ki valid user k paas valid file tha ya nhi
    console.log("router hit")
    const loggedinUserid = req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({
        user: loggedinUserid,
        path: path
    })

    if (!file) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const signedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
        action: "read",
        expires: Date.now() + 60 * 1000  //60 sec k liye link valid rhega
    })

    console.log(signedUrl[0])
    console.log("you are downloading")
    res.redirect(signedUrl[0])
})

module.exports = router;