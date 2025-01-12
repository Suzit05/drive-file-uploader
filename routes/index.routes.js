//file upload ya home se related routes yha bnega

const express = require("express")

const router = express.Router();
const upload = require("../config/multer.config")

router.get("/home", (req, res) => {
    res.render("home")
})

router.post("/upload", upload.single("file"), (req, res) => {  //upload.single("name from ejs")
    res.send(req.file)
})

module.exports = router;