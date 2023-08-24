const router=require("express").Router()
const PostC=require("../Controllers/PostController")
const validation=require("../validation")


router.post("/add",validation.verifyToken,PostC.addPost)

module.exports.posts=router