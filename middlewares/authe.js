//middleware so that only the logged user

const jwt = require("jsonwebtoken")

function auth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  //token from user-routes 
        return next();

    }
    catch (err) {

        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

module.exports = auth //index-routes m require krdo