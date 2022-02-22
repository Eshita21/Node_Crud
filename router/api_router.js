const express=require('express');
const Route=express.Router();
const WebController=require('../controller/api_Controller')

Route.get('/',WebController.indexview);
Route.post('/add',WebController.post_data)
Route.get('/edit/:p_id',WebController.edit)
Route.post('/update/:p_id',WebController.update)
Route.get('/delete/:p_id',WebController.delete)
module.exports = Route;