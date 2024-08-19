const jwt = require("jsonwebtoken");

const isLoggedin = (req, res, next) => {

    if (!req.cookies.newsToken) {
        return res.status(201).send("No token is set"); 
    }

    if (req.cookies.newsToken === '') {
        return res.status(201).send("Token is empty");
    }

    try {
        const data = jwt.verify(req.cookies.newsToken, process.env.JWT_KEY);
        // console.log(data);
        req.user = data;
        next();
    } catch (err) {
        return res.status(403).send("Invalid token");
    }
};

module.exports = isLoggedin;
