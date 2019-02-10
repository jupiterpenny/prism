var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {Storage} = require("@google-cloud/storage");
// var firebase = require("firebase");
// var cheerio = require("cheerio");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const admin = require('firebase-admin');
//const LicenscePlate = require('./models/LicenscePlate');
//var can = LicenscePlate.LicensePlateSchema;
//console.log(can);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config to get keys for heroku
//const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(
  "mongodb:",
  { useNewUrlParser: true }
);
mongoose.connection
  .once("open", function() {
    console.log("MongoDB connection has been made! \n");
  })
  .on("error", function(error) {
    console.log("Error is: ", error);
  });


var serviceAccount = require('./dashcam-2219d-firebase-adminsdk-dwhfk-322a9cc932.json');

admin.initializeApp({

});

var db = admin.database();
var ref = db.ref("/photo");


ref.on("value", function(snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);


    for (var i = 0; i< keys.length; i++){
        var k = keys[i];
        const keys2 = Object.keys(data[k]);
        var j = keys2[i];
        console.log(keys, "this is k");
        console.log(keys2, "this is k");
        console.log(data[k].alert_type);
        console.log(data[k].alert_type_name);





    }

}, function (error) {
    console.log("Error: " + error.code);
});


module.exports = app;
