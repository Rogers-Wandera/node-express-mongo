const jwt = require("jsonwebtoken");


const verifyJwt = (req,res,next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Your not authorized" })
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token,process.env.JWT_ACCESS_TOKEN,(err,decoded) => {
        if(err){
            return res.status(403).json({ msg: "invalid token" })
        }
        req.user = {userame: decoded.UserInfo.username, email: decoded.UserInfo.email  }
        req.roles = decoded.UserInfo.roles
        next();
    })
}

module.exports = verifyJwt;
