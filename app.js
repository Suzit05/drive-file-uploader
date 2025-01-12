const port = 3000;
const express = require("express")
const app = express()
const userRouter = require("./routes/user.routes")
const indexRouter = require("./routes/index.routes")
const dotenv = require("dotenv")   //env ko access krne wala package
dotenv.config()
const cookieParser = require("cookie-parser")


const connectToDB = require("./config/db")
connectToDB()   //call it

app.use(express.json())
app.use(cookieParser()) //cookie-parse
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

//ab yha route nhi bnaege, use krege routes folder 

app.use("/user", userRouter)    //app.use("name -jis route ko user krna hia", uska package)  /user/register
app.use("/", indexRouter)   // "/"--aur index-Router m "/home" hai to "/home" se get ho jaega


app.listen((port), () => {
    console.log(`listening on ${port}😎`)
})