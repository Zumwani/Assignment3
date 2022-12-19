const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
}

const authorize = (request) => {
    
    try {
        const accessToken = request.headers.authorization.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_SECRET);
    } catch (e) {
        throw new Error("Unauthorized");
    }


}

module.exports = { generateAccessToken, authorize };