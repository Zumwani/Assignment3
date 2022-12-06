const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
}

const authorize = (request, response, next) => {

    if (!request.headers.authorization?.startsWith("Bearer ")) {
        response.status(401).json();
        return;
    }

    try {   

        const accessToken = request.headers.authorization.split(" ")[1];
        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        next();
        
    } catch (error) {
        response.status(401).json();
    }

} 

module.exports = { generateAccessToken, authorize };