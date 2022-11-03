var express = require('express');
var router = express.Router();
var Contact = require("../models/contacts");
var User = require("../models/user");

router.get('/', (req, res) => {
  res.render('../views/index', {photo : "images/home_page.jpg"})
});

router.get('/login', (req, res) => {
  res.render('../views/login', {photo : "images/home_page.jpg"})
});

router.get('/aboutMe',(req, res) => {
  res.render('../views/aboutMe', {photo : "images/john_doe.jpg"})
});

router.get('/contactMe', (req, res) => {
  res.render('../views/contactMe')
});

const services = [
  {
    title : 'General Programming', 
    body : 'languages: Rust, C, C++, Java'
  },

  {
    title : 'Front End Website Development',
    body : 'frameworks: React, Vue, JQuery, Tailwind CSS, Bootstrap CSS'
  },
  {
    title : 'Back End  and Cloud Computing',
    body : 'Amazon AWS, Heroku, Mongo DB, Microsoft Azure'
  },
  {
    title : 'Video Game Programming',
    body : 'Unreal4 Engine, Unity, Cocos 2D, FrostBite'
  },
];

router.get('/services', (req, res) => {
  res.render('../views/services',{articles : services})
});

const projects = [
  {
    title : 'Shopping Website',
    body : 'an online store, still in progress',
    type : "cormecial project",
    role : "lead developer in a team of 5",
    image : "images/shopping.webp"
  },
  {
    title : 'Data Scrapping tool',
    body : 'Get emails and photos from linkedin, twitter and instragram',
    type : "cormecial project",
    role : "lone developer",
    image : "images/web_scraping.png"
  },
  {
    title : 'Horror video game',
    body : 'Unreal4 Engine based adventure game',
    type : "hobby project",
    role : "lone developer",
    image : "images/limbo.jpg"
  },
];

router.get('/projects', (req, res) => {
  res.render('../views/projects', {articles : projects})
});


router.post('/authenticate', (req, res) => {
  console.log(req.body)
  User.find({ name: req.body.name, password: req.body.pass }, (err, user) => {
    if (err){
      console.log(user);
      return res.json({okay: false})
    }
    if (user.length == 0) {
      return res.json({okay: false})
    }
    console.log(user[0]);
    req.session.name = req.body.name;
    return res.json({okay: true, user: user[0]})
  });
});


function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.name)
    return next();
  else
    res.redirect('/login');
}

router.get('/contacts', ensureAuthenticated, async(req, res) => {
    contacts =  await Contact.find();
    var sortedcontacts = contacts.sort((a,b) => 
      (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1);
    res.render('../views/contacts', {contacts : sortedcontacts})
});


router.post('/delete', ensureAuthenticated, async (req, res) => {
  console.log("deleting...")
  console.log(req.body.contact)
  let done = await Contact.findOneAndRemove(req.body.contact);
  console.log(done);
  if (!done) {
    return res.json({okay:false});
  }
  res.json({okay:true});
});

router.post('/update_or_insert', ensureAuthenticated, async (req, res) => {
  console.log("updating/inserting...")
  console.log(req.body.contact)
  console.log("with....")
  console.log(req.body.update)
  let done = await Contact.findOneAndUpdate(req.body.contact, {$set: req.body.update}, {upsert: true});
  res.json({okay:true});
});

router.get('/update', ensureAuthenticated, async (req, res) => {
  console.log("update with id");
  console.log(req.query.id);
  let contact = await Contact.findOne({_id: req.query.id});
  if (!contact) {
    contact = {};
  }
  console.log(contact);
  res.render('../views/update', {contact : contact})
});


module.exports = router;

// heroku git:remote -a assignment-1-portfolio
// heroku git:remote -a assignment-2-portfolio

