const Joi = require("@hapi/joi")
const jwt = require("jsonwebtoken")
//registration validation 
const RegistValidation=(data)=>{

    const ValidSchema = {
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(3),
        DateOfBirth:Joi.date().required()
    }
    return Joi.object(ValidSchema).validate(data)
}


const LoginValidation=(data)=>{

    const ValidSchema = {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(3),
    }
    return Joi.object(ValidSchema).validate(data)
}


const verifyToken=(req,res,next)=>{
 const token = req.header("auth-token")
 if (!token)
 return res.status(401).send("Access denied")
 //verifying token 
 try{
    const valid=jwt.verify(token,process.env.SecretKey)
    req.user=valid
    next()
 }catch(err){
    res.status(400).send("invalid user")
 }
 
}





module.exports.RegistValidation=RegistValidation
module.exports.LoginValidation=LoginValidation
module.exports.verifyToken=verifyToken