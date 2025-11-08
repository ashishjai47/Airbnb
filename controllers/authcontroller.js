const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const user = require("../models/user");

exports.getlogin = (req, res, next) => {
  res.render("auth/loginpage", {
    pageTitle: "Login",
    isloggedIn: false,
    user:{},
    errors: [],
    oldInput: {email:''},
  });
};
exports.getsignup = (req, res, next) => { 
  res.render("auth/signup", {
    pageTitle: "Signup",
    
    isloggedIn: false,
    user:req.session.user,
    errors: [],
    oldInput: {firstName:'',lastName:'',email:'',userType:''},
    user:{}
  });
};

exports.postlogout = (req, res, next) => {
    req.session.destroy(()=>{
     res.redirect("/login");
    });

};
exports.postlogin = async(req, res, next) => {
    const {email,password}=req.body;
    const user = await User.findOne({email:email});
      if(!user){
       return res.status(422).render('auth/loginpage',{
      pageTitle:'login',
      isloggedIn:false,
       errors: ['Invalid email or password.'],
      oldInput:{email:email},
      user:{}
    });
      };
      const doMatch=await bcrypt.compare(password,user.password);
      if(!doMatch){
       return res.status(422).render('auth/loginpage',{
      pageTitle:'login',
      isloggedIn:false,
       errors: ['Invalid password.'],
      oldInput:{email:email}
    });
      }

    req.session.user=user;  
    req.session.isloggedIn = true;
    res.redirect("/");
};
exports.postsignup = [
  check('firstName').not().isEmpty().withMessage('First name is required.')
  .trim()
  .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long.')
  .matches(/^[A-Za-z]+$/).withMessage('First name must contain only alphabetic characters.'),
  check('lastName').not().isEmpty().withMessage('Last name is required.')
  .trim()
  .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long.')
  .matches(/^[A-Za-z]+$/).withMessage('Last name must contain only alphabetic characters.'),
  check('email').isEmail().withMessage('Please enter a valid email address.').normalizeEmail(),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
  .matches(/\d/).withMessage('Password must contain at least one number.')
  .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character.')
  .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
  .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
  .trim(),
  check('confirmPassword')
  .trim()
  .custom((value, { req }) => {

    if (value !== req.body.password) {
      throw new Error('Passwords do not match.');
    }
    return true;
  }),
  check('userType').isIn(['guest', 'host']).withMessage('User type must be either guest or host.'),
  (req, res, next) => {
  // Here, you would typically handle user registration logic,
  // such as saving the user to the database.
  // For now, we'll just redirect to the login page after "signup".
   const {firstName,lastName,email,password,userType}=req.body;
   const error=validationResult(req);
   if(!error.isEmpty()){
    console.log(error.array());
    return res.status(422).render('auth/signup',{
      pageTitle:'Signup',
      isloggedIn:false,
      user:{},
       errors: error.array().map(err => err.msg),
      oldInput:{firstName:firstName,lastName:lastName,email:email,userType:userType}
    });
   }
   bcrypt.hash(password,12).then(hashedPassword=>{
    const newuser=new User({firstName,lastName,email,password:hashedPassword,userType});
    return newuser.save();
   })
   .then(()=>{
    console.log('User Registered Successfully');
    res.redirect('/login');
   })
   .catch(err=>{ 
   return res.status(422).render('auth/signup',{
      pageTitle:'Signup',
      isloggedIn:false,
      user:{},
       errors: [err.message],
      oldInput:{firstName:firstName,lastName:lastName,email:email,userType:userType}
    });
});
   
}
];
