
const express = require('express')
const { auth } = require('./Routes/auth')
const mongoose =require("mongoose")
const { posts } = require('./Routes/Posts')
require('dotenv').config({path:"./Variables.env"})
const cors = require("cors")

const app = express()
app.use(express.json())
const port = 8000
mongoose.connect(`mongodb+srv://anas:${process.env.dbPassword}@cluster.bam75o1.mongodb.net/`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
//checking db connection 
const db=mongoose.connection
db.once("open",()=>{
    console.log("connected to database")
})
db.once("error",(error)=>{
    console.log(error)
})

app.use(cors())
app.use("/users",auth)
app.use("/posts",posts)
app.listen(port, () => console.log(`Authentification server is runnning on Port ${port}`))