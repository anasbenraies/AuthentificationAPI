const { default: mongoose } = require("mongoose")
const User = require("../Models/User")
const validation = require("../validation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const register = async (req, res) => {
    //validation
    const validationResult = validation.RegistValidation(req.body)
    if (validationResult.error)
        return res.status(400).json("user not valid")
    //verify email
    EmailExists = await User.findOne({ "email": req.body.email })
    if (EmailExists)
        return res.status(400).json("a user with such email already exists !")
    try {
        //add user
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            DateOfBirth: req.body.DateOfBirth
        })
        const SavedUser = await user.save()
        const ResultUser = {
            name: SavedUser.name, email: SavedUser.email
            , DateOfBirth: SavedUser.DateOfBirth
        }
        //Giving access with token
        const SecretKey=process.env.SecretKey
        const token=jwt.sign({data:{id:ResultUser._id,name:ResultUser.name,email:ResultUser.email},
        exp: Math.floor(Date.now() / 1000) + (60 * 60)},SecretKey)
        res.status(200).header("auth-token",token).json({user:ResultUser,token:token})
    } catch (err) {
        res.status(400).json(err)
    }

}



const login = async (req, res) => {
    //validation
    const validationResult = validation.LoginValidation(req.body)
    if (validationResult.error) {
        return res.status(400).send("user not valid")
    }
    const ResultUser = await User.findOne({ 'email': req.body.email })
    if (!ResultUser) {
        return res.status(400).send("User does not exist . check password or email !")
    }
    // check the password 
    const passwordMatches = bcrypt.compareSync(req.body.password, ResultUser.password);
    if (!passwordMatches)
        return res.status(400).send("invalid email or password")

    //Giving access with token
    const SecretKey=process.env.SecretKey
    const token=jwt.sign({data:{id:ResultUser._id,name:ResultUser.name,email:ResultUser.email},
        exp: Math.floor(Date.now() / 1000) + (60 * 60)},SecretKey)

        res.status(200).header("auth-token",token).send({user:ResultUser,token:token})
    }

module.exports = {
    register: register,
    login: login
}