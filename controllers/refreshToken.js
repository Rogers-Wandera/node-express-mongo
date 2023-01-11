const jwt = require("jsonwebtoken");
const UserModel = require("../models/userSchema");


const handleRefresh = async (req,res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt){
        return res.status(401).json({msg:`no jwt cookie found`})
    }
    const refreshToken = cookies.jwt;

    const userExist =  await UserModel.findOne({ refreshToken }).exec();
    if(!userExist) {
        return res.status(401).json({msg:`there is no user found`})
    }

    try {
        jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN,(err,decoded) => {
            if(err || userExist.username !== decoded.username ||userExist.email !== decoded.email){
                return res.status(403).json({msg: "no user found"})
            }
            const roles = Object.values(userExist.roles);
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: decoded.username, 
                        email: decoded.email,
                        roles: roles
                    }
                },
                process.env.JWT_ACCESS_TOKEN,
                {expiresIn: "30d"}
            ) 
            res.status(200).json({msg: `successfully signed in as ${decoded.email}`,accessToken})
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { handleRefresh }