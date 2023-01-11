const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userSchema");

const handleLogin = async (req,res) => {
    const { email,password } = req.body;

    if(!email || !password){
        return res.status(400).json({msg:`email and password are required`})
    }

    const userExist = await UserModel.findOne({ email: email }).exec();
    if(!userExist) {
        return res.status(401).json({msg:`user with email of ${email} doesnot exist`})
    }

    console.log(userExist);
    try {
        const match = await bcrypt.compare(password, userExist.password);
        if(match) {
            const roles = Object.values(userExist.roles);
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: userExist.username, 
                        email: userExist.email,
                        roles: roles
                    }
                },
                process.env.JWT_ACCESS_TOKEN,
                {expiresIn: "30d"}
            )
            const refreshToken = jwt.sign(
                {username: userExist.username, email: userExist.email},
                process.env.JWT_REFRESH_TOKEN,
                {expiresIn: "60d"}
            )

           userExist.refreshToken = refreshToken;
           await userExist.save();
            res.cookie("jwt",refreshToken,{httpOnly: true,sameSite:"None",secure: true,maxAge: 24 * 60 * 60 * 10000})
            res.status(200).json({msg: `successfully signed in as ${email}`,accessToken})
        } else {
            res.status(401).json({msg: `Passwords donot match`})
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { handleLogin }