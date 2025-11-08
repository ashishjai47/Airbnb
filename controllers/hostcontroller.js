const { Result } = require('postcss');
const home = require('../models/home');
const fs=require('fs');


exports.getaddhome = (req, res, next) => {
    res.render('host/edithome', { 
      pageTitle: 'Add Home to airbnb',
       editing: false ,
       isloggedIn:req.session.isloggedIn,
       user:req.session.user});

};
exports.gethosthome = (req, res, next) => {
    home.find().then(registeredhomes =>{
    res.render("host/host-home-list", {
      registeredhomes: registeredhomes,
      pageTitle: "Host Homes List",
      editing: false,
      isloggedIn:req.session.isloggedIn,
      user:req.session.user
    
    })
});
};
exports.geteditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const isEditing = req.query.editing=== 'true';
  home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edithome", {
      pageTitle: "Edit your home",
      editing: isEditing,
      home: home,
      isloggedIn:req.session.isloggedIn,
      user:req.session.user
    });
  });
};
exports.postaddhome = (req, res, next) => {
    const {houseName, Price, location, Rating} = req.body;
    console.log(req.body);
    console.log(req.file);

    if (!req.file) {
        return res.status(422).render('host/edithome', {
            pageTitle: 'Add Home',
            editing: false,
            isloggedIn: req.session.isloggedIn,
            user: req.session.user,
            errors: ['Attached file is not an image.'],
        });
    }

    const newhome = new home({houseName, Price, location, Rating, photo: req.file.path});
    newhome.save().then(() => {
        console.log('Home Added Successfully');
    });

    res.redirect('/host/host-home-list');
};
exports.posteditHome = (req, res, next) => {
    const {homeId, houseName, Price, location, Rating} = req.body;
    home.findById(homeId).then(home => {
        home.houseName = houseName;
        home.Price = Price;
        home.location = location;
        home.Rating = Rating;
        if (req.file) {
          fs.unlink(home.photo, (err) => {  
            if (err) {
              console.log(err);
            }
            
          });
          home.photo = req.file.path;
        }

    home.save().then(result => {
        console.log('Home Updated Successfully');
    }).catch(err => {
        console.log(err);
    });
   res.redirect('/host/host-home-list');
  }).catch(err => {
    console.log(err);
   });
};
exports.postdeleteHome = (req, res, next) => {
    const homeId = req.params.homeId;
    home.findByIdAndDelete( homeId).then(() => {
        console.log("Home Deleted");
        res.redirect("/host/host-home-list");
    }).catch(err => {
        console.log(err);
    });
};


