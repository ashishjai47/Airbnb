const home = require('../models/home');
const User = require('../models/user');

exports.getIndex = (req, res, next) => {
    home.find().then((registeredhomes) =>{
    res.render("store/index", {
      registeredhomes: registeredhomes,
      pageTitle: "airbnb Home",
      isloggedIn: req.session.isloggedIn,
      user:req.session.user
    })
});
};
exports.gethome = (req, res, next) => {
   home.find().then((registeredhomes) =>{
    res.render("store/home-list", {
      registeredhomes: registeredhomes,
      pageTitle: "Homes List",
      isloggedIn: req.session.isloggedIn,
      user:req.session.user
    })
 });
};


exports.getbookings = (req, res, next) =>  {
    res.render('store/bookings', {pageTitle: ' My bookings'
    ,isloggedIn:req.session.isloggedIn,
    user:req.session.user
    });
};
exports.getfavorites = async(req, res, next) =>  {
   const userId = req.session.user._id;
   const user=await User.findById(userId).populate('favourites');
    res.render("store/favourites", {
      favouriteHomes: user.favourites,
      pageTitle: "My Favourites",
      currentPage: "favourites",
      isloggedIn:req.session.isloggedIn,
      user:req.session.user
    });
  };
exports.gethomedetails = (req, res, next) => {
    const homeId = req.params.homeId;
    
    home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        isloggedIn:req.session.isloggedIn,
        user:req.session.user
      });
    }
  })
};
exports.postaddtofavorites = async (req, res, next) => {
     const homeId = req.body.id;
     const userId = req.session.user._id;
     const user=await User.findById(userId);
     if(!user.favourites.includes(homeId)){
  user.favourites.push(homeId);
   await user.save();
}
    res.redirect("/favourites");
};
exports.postremovefromfavorites = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user=await User.findById(userId);
  if(user.favourites.includes(homeId)){
    user.favourites=user.favourites.filter(favId => favId.toString() !== homeId.toString());
    await user.save();
  }
  res.redirect("/favourites");
};
  