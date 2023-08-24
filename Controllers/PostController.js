

const addPost=async(req,res)=>{
    //console.log(req.user) user informations available here from the verify middelware 
    res.status(200).send("Post added")
}

module.exports.addPost=addPost