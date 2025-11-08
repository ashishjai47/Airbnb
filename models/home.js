// const registeredhomes=[];
// const path=require('path');
// const fs=require('fs');
// const rootdir=require('../utils/pathutils');
// const { error } = require('console');
// const { get } = require('http');
// const filepath=path.join(rootdir,'data','homes.json');
// const {getdb} = require('../utils/database');
// const { ObjectId } = require('mongodb');

// module.exports=class home{
//     constructor(houseName, Price, location, Rating, photo, _id){
//         this.houseName=houseName;
//         this.Price=Price;
//         this.location=location;
//         this.Rating=Rating;
//         this.photo=photo;
//         if(_id){  
//         this._id=_id;
//     }
//   }

//   //   save(){
//   //     home.find((registeredhomes) => {
//   //     if (this.id) { // edit home case
//   //       registeredhomes = registeredhomes.map(home => 
//   //         home._id === this.id ? this : home);
//   //     } else { // add home case
//   //       this.id = Math.random().toString();
//   //       registeredhomes.push(this);
//   //     }

//   //     fs.writeFile(filepath, JSON.stringify(registeredhomes), (error) => {
//   //       console.log("File Writing Concluded", error);
//   //     });
//   //   });
//   // }

//   //   static find(callback){
//   //       const filepath=path.join(rootdir,'data','homes.json');
//   //        fs.readFile(filepath, 'utf8', (err, data) => {
//   //       if (err) {
//   //           // if file not found or unreadable, return empty array
//   //           return callback([]);
//   //       }
//   //       try {
//   //           // safely parse JSON, handle empty file
//   //           const homes = data.trim() ? JSON.parse(data) : [];
//   //           callback(homes);
//   //       } catch (error) {
//   //           console.error('Error parsing homes.json:', error);
//   //           callback([]);
//   //       }
//   //   });
//   //   }
//   //    static findById(homeId, callback) {
//   //   this.find(homes => {
       
//   //     const homeFound = homes.find(home => home._id === homeId);
//   //     callback(homeFound);
      
//   //   });
//   // }
//   save(){
//       const db = getDB();
//     if (this._id) { // update
//       const updateFields = {
//         houseName: this.houseName,
//         Price: this.Price,
//         location: this.location,
//         Rating: this.Rating,
//         photo: this.photo 
//       };

//       return db.collection('homes').updateOne({_id: new ObjectId(String(this._id))}, {$set: updateFields});
//     } else { // insert
//       return db.collection('homes').insertOne(this);
//     }
//   }


//   static find(){
//     const db=getdb();
//     return db.collection('homes').find().toArray()
           
// };
//     static findById(homeId) {
//     const db=getdb();
//      return db.collection('homes')
//      .findOne({_id: new ObjectId(String(homeId))})
//      .next();
   
// }
// static deleteById(homeId) {
//     const db=getdb();
//      return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))})
    
// }
// };
// const path = require('path');
// const fs = require('fs');
// const { ObjectId } = require('mongodb');
// const { getdb } = require('../utils/database'); // ✅ correct spelling (you had getDB once)
// const rootdir = require('../utils/pathutils');

// module.exports = class Home {
//   constructor(houseName, Price, location, Rating, photo, _id) {
//     this.houseName = houseName;
//     this.Price = Price;
//     this.location = location;
//     this.Rating = Rating;
//     this.photo = photo;
//     if (_id) {
//       this._id = new ObjectId(_id); // ✅ Convert safely here once
//     }
//   }

//   save() {
//     const db = getdb(); // ✅ corrected from getDB → getdb

//     if (this._id && ObjectId.isValid(this._id)) {
//       // ✅ update existing home
//       const updateFields = {
//         houseName: this.houseName,
//         Price: this.Price,
//         location: this.location,
//         Rating: this.Rating,
//         photo: this.photo,
//       };

//       return db
//         .collection('homes')
//         .updateOne({ _id: this._id }, { $set: updateFields });
//     } else {
//       // ✅ insert new home
//       return db.collection('homes').insertOne(this);
//     }
//   }

//   static find() {
//     const db = getdb();
//     return db.collection('homes').find().toArray();
//   }

//   static findById(homeId) {
//     const db = getdb();

//     if (!homeId || !ObjectId.isValid(homeId)) {
//       console.warn('⚠️ Invalid homeId:', homeId);
//       return Promise.resolve(null); // prevents crash
//     }

//     return db.collection('homes').findOne({ _id: new ObjectId(homeId) });
//   }

//  static deleteById(homeId) {
//   const db = getdb();

//   // ✅ Validate the ID first
//   if (!homeId || !ObjectId.isValid(homeId)) {
//     console.warn('⚠️ Invalid homeId passed to deleteById:', homeId);
//     return Promise.resolve(); // Avoids throwing an exception
//   }

//   // ✅ Safe deletion
//   return db.collection('homes').deleteOne({ _id: new ObjectId(homeId) });
// }
  
// };
const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  Rating: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Home', homeSchema);