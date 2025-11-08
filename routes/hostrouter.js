const express=require('express');
const path=require('path');
const hostRouter=express.Router();
const homecontroller=require('../controllers/hostcontroller');



hostRouter.get('/add-home',homecontroller.getaddhome);
hostRouter.get('/host-home-list',homecontroller.gethosthome);


hostRouter.post("/addhome",homecontroller.postaddhome);
hostRouter.get('/edithome/:homeId',homecontroller.geteditHome);
hostRouter.post('/edithome',homecontroller.posteditHome);
hostRouter.post('/delete-home/:homeId',homecontroller.postdeleteHome);

module.exports=hostRouter;
