const express=require('express');
const path=require('path');
const storerouter=express.Router();

const storecontroller=require('../controllers/storecontroller');


storerouter.get('/',storecontroller.getIndex);
storerouter.get('/bookings',storecontroller.getbookings);
storerouter.get('/favourites',storecontroller.getfavorites);
storerouter.get('/homes',storecontroller.gethome);
storerouter.get('/homes/:homeId',storecontroller.gethomedetails);
storerouter.post('/favourites',storecontroller.postaddtofavorites);
storerouter.post('/favourites/delete/:homeId',storecontroller.postremovefromfavorites);

module.exports=storerouter;