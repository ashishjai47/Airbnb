const user = require("../models/user");

exports.errorpagenotfound=(req,res,next)=>{
    res.status(404).render('404notfound',{
        pageTitle:'Page Not Found',
        isloggedIn:req.session.isloggedIn,
        user:req.session.user
    });
}