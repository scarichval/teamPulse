const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
console.log(`authHeader: ${authHeader}`);
    if(!authHeader) return res.status(403).json({error: 'Access denied'});
    
    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`decodedToken: ${decodedToken}`);    
        req.user = decodedToken;
    } catch (error) {
        return res.status(403).json({error: 'Invalid token'});
    }    

}

module.exports = verifyToken;