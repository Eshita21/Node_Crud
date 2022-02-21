const express = require('express');
const app = express();
const FData = require('../model/FormData')
const path=require('path')

exports.index=(req,res)=>{
FData.find((err,data)=>{
if(!err){
console.log(data)
res.render('show',{
    DispatchData:data
})
}})
}
exports.add_data=(req,res)=>{
    res.render('add')
}
exports.post_data=(req,res)=>{
    const image = req.file
    const data=new FData({
    name:req.body.name,
    phone:req.body.phone,
    city:req.body.city,
    image:image.path
    })
    data.save().then((result)=>{
        console.log("Data Added Successfully!")
        res.redirect('/')
    }).catch((err)=>{
    console.log(err)
    })
}
exports.edit=(req,res)=>{
    const pid=req.params.p_id
    FData.findById(pid).then((result)=>{
    console.log(result)
    res.render('edit',{
    data:result
    })
}).catch((err)=>{
    console.log(err)
})
}
exports.update=(req,res)=>{
const ppid=req.body.p_id
const name=req.body.name
const phone=req.body.phone
const city=req.body.city
const image = req.file
FData.findById(ppid).then((result)=>{
    result.name=name
    result.phone=phone
    result.city=city
    result.image=image.path
result.save().then((rel)=>{
    console.log("Data updated successfully!")
    res.redirect('/')
}).catch((err)=>{
    console.log(err)
})
})
}
exports.delete=(req, res) => {
    const id = req.params.p_id
    FData.deleteOne({_id:id}).then((result) => {
    console.log("Delete Successfully!",result)
    res.redirect('/')
    }).catch((err) => {
    console.log("Error",err)
    })
}