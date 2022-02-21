const express = require('express');
const app = express();
const FData = require('../model/FormData')
const path=require('path')

exports.indexview=(req,res)=>{
FData.find((err,data)=>{
if(!err){
res.status(200).json({
status:"Successful",
data:data,
message:"Execution Successful!"
})
}})
}
// exports.add_data=(req,res)=>{
//     res.render('add')
// }
exports.post_data=(req,res)=>{
    const image = req.file
    const data=new FData({
    name:req.body.name,
    phone:req.body.phone,
    city:req.body.city,
    image: image && image.path ? image.path : 'upload/no-image.jpg'
    })
    data.save().then((result)=>{
       res.status(201).json({
        status:"Successful!",
        data:result,
        message:"Data Added successfully!"
       })
    }).catch((err)=>{
    console.log(err)
    })
}
exports.edit=(req,res)=>{
    const pid=req.params.p_id
    FData.findById(pid).then((result)=>{
    console.log(result)
    res.status(200).json({
    status:"Successful",
    data:result
    })
}).catch((err)=>{
    console.log(err)
})
}
// exports.update=(req,res)=>{
// const ppid=req.body.p_id
// const name=req.body.name
// const phone=req.body.phone
// const city=req.body.city
// const image = req.file
// FData.findById(ppid).then((result)=>{
//     result.name=name
//     result.phone=phone
//     result.city=city
//     result.image=image.path
// result.save().then((rel)=>{
//     console.log("Data updated successfully!")
//     res.redirect('/')
// }).catch((err)=>{
//     console.log(err)
// })
// })
// }
exports.delete=(req, res) => {
    const id = req.params.p_id
    FData.deleteOne({_id:id}).then((result) => {
    console.log("Delete Successfully!",result)
    res.status(200).json({
    status:"Deleted successfully!",
    data: result
    })
    }).catch((err) => {
    console.log("Error",err)
    })
}