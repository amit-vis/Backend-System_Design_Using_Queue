const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../config/errorHandler");

// function for register the user
module.exports.register = async (req, res, next)=>{
    try {
        const {name, email, password} = req.body;
        if(name === "" || email === "" || password === ""){
            throw new errorHandler("Kindly Enter the required details", 400)
        }
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            throw new errorHandler("User already exist", 401)
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        return res.status(200).json({
            message: "User Register successfully!!",
            success: true,
            user: newUser
        })
    } catch (error) {
        next(error)
    }
}

// function for logged in user
module.exports.login = async (req, res, next)=>{
    try {
        const {email, password} = req.body;
        if(email === "" || password === ""){
            throw new errorHandler("Email And Password body should not be empty!!", 400)
        }
        const user = await User.findOne({email: email});
        if(!user || !(await bcrypt.compare(password, user.password))){
            throw new errorHandler("Invalid password or email", 401)
        }
        const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {expiresIn: "1h"})
        res.status(200).json({
            message: "user Registered successfully!!",
            token
        })
    } catch (error) {
        next(error)
    }
}
