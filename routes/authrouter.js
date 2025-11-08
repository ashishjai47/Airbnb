const express=require('express');
const path=require('path');
const authrouter=express.Router();

const authcontroller=require('../controllers/authcontroller');


authrouter.get('/login',authcontroller.getlogin);
authrouter.post('/auth/login',authcontroller.postlogin);
authrouter.post('/logout',authcontroller.postlogout);
authrouter.get('/signup',authcontroller.getsignup);
authrouter.post('/signup',authcontroller.postsignup);
module.exports=authrouter;