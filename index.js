const express=require('express');
const path=require('path');
const hostRouter = require('./routes/hostrouter');
const routedir=require('./utils/pathutils');
const app=express();
const errorcontroller=require('./controllers/errors');
const storerouter = require('./routes/storerouter');
const {mongoconnect} = require('./utils/database');
const mongoose = require('mongoose');
const authrouter = require('./routes/authrouter');
const session = require('express-session');
const dbpath='mongodb+srv://aj_dev:cHinu12345@cluster0.nieejt3.mongodb.net/airbnb?appName=Cluster0';
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname);
    }
});
const filefilter=(req,file,cb)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

app.use(express.urlencoded());
app.use(multer({ storage, filefilter }).single('photo'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use('/host/uploads',express.static(path.join(__dirname,'uploads')));
app.use('/homes/uploads',express.static(path.join(__dirname,'uploads')));







const store = new MongoDBStore({
    uri: dbpath,
    collection: 'sessions'
});

app.set('view engine','ejs');
app.set('views','views');

app.use(session({   
    secret:'my secret',
    resave:false,
    saveUninitialized:false,
    store:store
}));


// app.use((req,res,next)=>{
//     req.session.isloggedIn=req.session.isloggedIn;
//     next();
// });
app.use(storerouter);
app.use('/host', (req, res, next) => {
    if(!req.session.isloggedIn){
        return res.redirect('/login');
    }else{
    next();
    }
});
app.use('/host', hostRouter);

app.use(authrouter);
app.use(errorcontroller.errorpagenotfound);







const PORT=4001;

mongoose.connect(dbpath).then(()=>{
    console.log("Connected to database");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })  
}).catch(err=>{
    console.log(err);
});

