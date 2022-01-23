// require("dotenv").config();
// let alert = require('alert');

// var popup = require('popups');
const express = require("express");
const app = express();
const encrypt = require("mongoose-encryption");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


// var path = require('path')
//
// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))
app.use('/js', express.static(__dirname, + 'public/js'));
app.use('/css', express.static(__dirname, + 'public/css'));
app.set('view engine', 'ejs');

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,

}));

app.use(passport.initialize());
app.use(passport.session());


//DATABASE

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/interndb', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

//DATBASE SCHEMA

const usrdtSchema = new mongoose.Schema({
  username: String,
  gmail: String,
  password: String,
  confirmpassword: String,
});



usrdtSchema.plugin(passportLocalMongoose);

usrdtSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password',"confirmpassword"]});

const Userdetail = mongoose.model('userdetail', usrdtSchema);

passport.use(Userdetail.createStrategy());
passport.serializeUser(Userdetail.serializeUser());
passport.deserializeUser(Userdetail.deserializeUser());


app.listen(3000,function(){
  console.log("server starts to function");
});



app.post("/", function(req,res){

  Userdetail.register({username: req.body.username},req.body.password,function(err,user){
    if (err) {
      console.log(err);
      res.redirect("/");
    }
    else {
      passport.authenticate("local")(req,res,function(){
        res.redirect("/homepage");
      });
    }
  });

var username =  req.body.username;
var email = req.body.email;
var password = req.body.password;
var cnfmpass = (req.body.cnfmpass);
//
console.log(username, email,password,cnfmpass );


  const user = new Userdetail({
    username:username ,
    gmail:email ,
    password:password ,
    confirmpassword: cnfmpass
   });
//
//
// // INSERT CODE
   // Userdetail.insertMany([user],function(err){
   //   if(err){
   //     console.log(err);
   //   }else{
   //     console.log("succesfully saved");
   //   }
   // });
 //   user.save();
 // res.redirect("/login");

// });

app.get("/",function(req,res){
res.sendFile(__dirname+"/login1.html");
});

app.get("/login",function(req,res){
res.sendFile(__dirname+"/login.html");
});

app.post("/login",function(req,res){

var usrname= req.body.lusername;
var pass= req.body.lpassword;


const user = new Userdetail({
   username: req.body.lusername,
   password: req.body.lpassword
});
  // console.log(user.usrname,user.pass);
  req.login(user,function(err){
    if (err){
      console.log(err);
    }else {
      passport.authenticate("local")(req,res,function(){
        res.redirect("/homepage");
      });
    }
  });



  //FIND CODE

 // Userdetail.find(function(err,usrdtls){
 //
 //     usrdtls.forEach(function(usrdts){
 //
 //         if (usrdts.password === req.body.lpassword && usrdts.username === usrname) {
 //            res.redirect("/homepage");
 //         }
 //         else {
 //          var op = "OOPS!"
 //         res.render("login",{oops:op});
 //
 //         }
 //
 //       });
 //
 //     });

// });

// app.get("/homepage",function(req,res){
//
//   if (req.isAuthenticated()) {
//     res.sendFile(__dirname+"/homepage.html");
//   }else{
//     res.sendFile(__dirname+"/login.html");
//   }
//
// });
// app.post("/homepage", function(req,res){
//    var searchitem = req.body.demanditem;


   //FIND CODE
//    Staff.find(function(err,usrdtls){
//
//       usrdtls.forEach(function(usrdts){
//         var name = usrdts.name;
//         var gamil = usrdts.department;
//         var eq = usrdts.eduquali;
//         var cab = usrdts.cabin;
//         var mob = usrdts.mobile;
//         if(searchitem === name ){
//         console.log(usrdts);
//    res.render("info",{Name:name,Dept:gamil,Degree:eq,Room:cab,Cell:mob});
// }
//       });
//
//    });
//
// });
//
//  app.post("/loginerr",function(req,res){
//    res.redirect("/login");
//  });



 // // userdt.save();
 // const scnduser = new Userdetail({
 //   username: "cahrnipriya",
 //   gmail: "chanjeevkumar@gmail.com",
 //   password: "charni004",
 //   confirmpassword: "charni004"
 // });
 //
 // const thriduser = new Userdetail({
 //   username: "chitra",
 //   gmail: "chanjeevkumar@gmail.com",
 //   password: "charni004",
 //   confirmpassword: "charni004"
 // });
 //
 // const frthuser = new Userdetail({
 //   username: "kumar",
 //   gmail: "chanjeevkumar@gmail.com",
 //   password: "charni004",
 //   confirmpassword: "charni004"
 // })
 //
 // INSERT CODE




// DELETE CODE
//
// Userdetail.deleteMany({ gmail: "chanjeevkumar@gmail.com"},function(err){
//   console.log("succesfully deleted");
// });





//NEW COLLECTION
//
// const friendSchema = new mongoose.Schema({
//   name: String,
//   bestfriend: usrdtSchema
// });
//
//
// const Frd = mongoose.model('friend', friendSchema);
//
// const frstfrd = new Frd({
//    name: 'Silencer'
//  });
//
//  const scndfrd = new Frd({
//     name: 'panjavanparivendhan'
//   });
//
// INSERT CODE
// Frd.insertMany([frstfrd,scndfrd],function(){
//   console.log("succesfully inserted");
// });



  //DELTE CODE

  // Frd.deleteMany({name: 'panjavanparivendhan'},function(){
  //   mongoose.connection.close();
  //   console.log("succesfully deleted");
  // });



// UPDATE CODE
// Frd.updateOne({name: 'panjavanparivendhan'},{bestfriend:firstuser},function(err){
//   if (err) {console.log(err);
//
//   }else {
//     console.log("updated");
//   }
// })
//
//   //FIND METHOD
//
//   Frd.find(function(err,frds){
//   console.log(frds);
//   mongoose.connection.close();
//   });


//STAFF DATABASE

//SHEMA
// const staffSchema = new mongoose.Schema({
//   name: String,
//   department: String,
//   eduquali: String,
//   cabin: String,
//   mobile: String
//
// });
//
// const Staff = mongoose.model('staff', staffSchema);

//
// const stf1 = new Staff({
//   name: "Anupriya Rajkumar",
//   department: "CSE",
//   eduquali: "MCA,ph.d",
//   cabin: "A-105",
//   mobile: '9283764736'
//
// });
//
// const stf2 = new Staff({
//   name: "Suba Manoj",
//   department: "CSE",
//   eduquali: "BCA,ph.d",
//   cabin: "A-234",
//   mobile: '9283684736'
//
// });
//
//
// const stf3 = new Staff({
//   name: "Gobi N",
//   department: "CSE",
//   eduquali: "B.E,ph.d",
//   cabin: "C-235",
//   mobile: '9283712736'
//
// });
//
//
// const stf4 = new Staff({
//   name: "Vijai Ganesh",
//   department: "CSE",
//   eduquali: "B.E,M.phil",
//   cabin: "c-125",
//   mobile: '9283764566'
//
// });
//
//
//
// // INSERT CODE
//
// Staff.insertMany([stf1,stf2,stf3,stf4],function(err){
//   if (err) {
//     console.log(err);
//   }else {
//       console.log("succesfully inserted");
//   }
//
// });
