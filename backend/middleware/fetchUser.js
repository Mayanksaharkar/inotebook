
const jwt = require('jsonwebtoken')
const JWT_SECRET = "inotebookApplication"
const fetchUser = (req, res, next) => {
    // get usr from jwt token and add id to req obj
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please Authenticate using valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate using valid token" })
    }

}
module.exports = fetchUser;