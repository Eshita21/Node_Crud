const mongoose=require('mongoose');
const FData=mongoose.Schema;

const NewData= new FData({
name:{
    type:String,
    required: true
},
phone:{
    type:String,
    required: true
},
city:{
    type:String,
    required: true
},
image:{
    type:String,
    required: false
}
})
const Data=mongoose.model('NewFormData',NewData)
module.exports =Data;