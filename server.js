const express=require('express');
const app=express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const multer=require('multer');
const path = require('path');
const dbDriver="mongodb+srv://eshitaBlog:EaTBjx1Zev4y5TBS@cluster0.gdsqv.mongodb.net/crudf"

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
//Step 1
app.use('/upload',express.static(path.join(__dirname,'upload')))
//Step 2
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
//Step 3
const filterFile=(req,file,cb)=>{
    if(file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("pdf") ||
    file.mimetype.includes("jpeg")){
        cb(null,true)
    } else{
        cb(null,false)
    }
}
//step 4
app.use(multer({storage:fileStorage,fileFilter:filterFile,limits:{fieldSize:1024*1024*5}}).single('image'))


app.set("view engine", "ejs")
app.set("views","views")

const Router = require('./router/Route')
const api_Route=require('./router/api_router')
app.use(Router)
app.use('/api',api_Route)



const port=process.env.PORT || 3023
mongoose.connect(dbDriver,{useNewUrlParser: true,useUnifiedTopology: true})
.then((result)=>{
app.listen(port,function(){
    console.log(`Running on server http://localhost:${port}`)
    console.log('Database connection established')
})
}).catch((err)=>{
    console.log(err)
})
