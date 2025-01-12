//jo v user routes hoga , ab yha bnega
//for production level
//baar baar routes bnnana n pde

const express = require("express")
const router = express.Router();
const { body, validationResult } = require("express-validator") //for form validation
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


router.get("/register", (req, res) => { //../user/register
    res.render("register")
})

router.post("/register",
    body("email").trim().isEmail().isLength({ min: 13 }),
    body("password").trim().isLength({ min: 5 }),
    body("username").isLength({ min: 3 }),
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {  //if error
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data"
            })
        }

        const { username, email, password } = req.body

        const hashPassword = await bcrypt.hash(password, 10)  //await daalna jruri hai
        const newUser = await userModel.create({   //agr res m khali aa rha to await async nhi diye ho
            username,
            email,
            password: hashPassword
        })
        res.json(newUser)   //data json format m rhta h 


    })

router.get("/login", (req, res) => {
    res.render("login")
})


router.post("/login",
    body("email").trim().isLength({ min: 10 }),
    body("password").trim().isLength({ min: 5 }),

    async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                message: 'Invalid data'
            })

        }

        const { email, password } = req.body

        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password" //always show this message
            })
        }

        const isMatch = bcrypt.compare(password, user.password)  //(plain text password, user hashed password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({   //email, username ko token bna do
            userId: user.id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET,
        )

        res.cookie("token", token)
        res.send("logged in")


    })


module.exports = router;