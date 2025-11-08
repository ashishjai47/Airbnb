const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true         
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        enum:['guest','host'],
        required:true
    },
    favourites:[{
        type:Schema.Types.ObjectId,
        ref:'Home'
    }]
});
module.exports=mongoose.model('User',userSchema);   