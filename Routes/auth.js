const router = require("express").Router()
const authC= require("../Controllers/authController")


//registration
router.post("/register",authC.register)
router.post("/login",authC.login)




module.exports={
    auth:router
}