const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb+srv://aj_dev:cHinu12345@cluster0.nieejt3.mongodb.net/?appName=Cluster0';
let _db;
const mongoconnect =(callback)=>{
MongoClient.connect(url)
  .then(client => {
    console.log('Connected to Database');
    _db = client.db('airbnb');
    callback(client);
  })
  .catch(error => console.error(error));  
};
const getdb=()=>{
    if(_db){
        return _db;
    }
    throw 'No database found';
};
exports.getdb=getdb;
exports.mongoconnect=mongoconnect;