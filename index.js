const express = require("express")
const app = express()
const dotenv = require("dotenv")
const path = require("path")
dotenv.config()
const db = require("./config/dbConnection.js")
db()
const multer = require("multer")
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// storing images
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "images")
    },
    filename: (req, file, cb)=>{
        cb(null, "hello.jpeg");
    }
})

const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("file has been uploaded!");
})
// routes
const authRoute = require("./routes/authRoute.js")
const userRoute = require("./routes/userRoute.js")
const postRoute = require("./routes/postRoute.js")
const catRoute = require("./routes/categoryRoute.js")
// using the route
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/post", postRoute)
app.use("/api/categories", catRoute)

if(process.env.local === "local"){
    app.use(cors({
        origin : "http://localhost:5000",
        credentials: true
    }))
}else{
    app.use(cors({
        credentials:true
    }))
}

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "./frontend/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'./','frontend','build','index.js'))
    })

}



app.listen(process.env.PORT,()=>{
    console.log(`server is running fine ${process.env.PORT}`)
})