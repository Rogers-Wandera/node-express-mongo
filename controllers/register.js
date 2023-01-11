const UserModel = require("../models/userSchema");
const bcrypt = require("bcryptjs");

const registerUser = async (req,res)  => {
    const { username,email,password} = req.body;
    console.log(req.body)
    if(!username||!password||!email){
        return res.status(409).json({msg: "username,password,email must be provided"})
    }
    try {
        //check for duplicates
        const duplicate = await UserModel.findOne({ email: email }).exec();
        if(duplicate) {
            return res.status(409).json({msg: `user with email of ${email} already exists`})
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username:username,
            email:email,
            password:hashedPassword
        }

        await UserModel.create({ ...user })
        res.status(201).json({msg: `New user ${username} with email of ${email} created`})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {registerUser};

