const express=require('express');
const Route=express.Router();
const WebController=require('../controller/Controller')

Route.get('/',WebController.index);
Route.get('/add',WebController.add_data)
Route.post('/add',WebController.post_data)
Route.get('/edit/:p_id',WebController.edit)
Route.post('/update',WebController.update)
Route.get('/delete/:p_id',WebController.delete)
module.exports = Route;