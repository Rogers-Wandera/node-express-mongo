const UserModel = require("../models/userSchema");


const handleLogOut = async (req,res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt){
        return res.status(204).json({msg:`success`})
    }

    const refreshToken = cookies.jwt;

    const userExist =  await UserModel.findOne({ refreshToken }).exec();
    if(!userExist) {
        res.clearCookie("jwt",{httpOnly: true,sameSite:'None',secure: true})
        return res.status(204).json({msg:`success logout`})
    }

    userExist.refreshToken = "";
    await userExist.save();
    
    res.clearCookie("jwt",{httpOnly: true,sameSite:'None',secure: true}) // in production secure: true to serve https
    res.status(204).json({ msg: "log out successfull" })
}

module.exports = { handleLogOut }