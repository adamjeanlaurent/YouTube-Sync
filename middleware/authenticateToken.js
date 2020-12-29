require('dotenv').config()

// middleware to authenticate json web token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token;

    // check if authheader exist
    if(authHeader) {
        token = authHeader.split(' ')[1];
    } 

    // check if token exists
    if(token === null || typeof token === 'undefined') {
        return res.sendStatus(401);
    }

    // verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, roomInfo) => {
        if(err) {
           console.log(err);
           return res.sendStatus(403);
        }

        req.roomInfo = roomInfo;
        next();
    });
}

module.exports = authenticateToken;