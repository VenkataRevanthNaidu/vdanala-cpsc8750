// use the express library
const express = require('express');





// create a new server application
const app = express();

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// set the view engine to ejs
app.set('view engine', 'ejs');
// The main page of our website


// ... snipped out code ...
let nextVisitorId = 1;
var currenttime = new Date();


app.get('/', (req, res) => {
  res.cookie('visitorId', nextVisitorId);
  res.cookie('visited', Date.now().toString());
  res.render('welcome', {
    name: req.query.name || "World",
    date: req.query.date || new Date().toLocaleString(),

    vistorid: req.query.vistorid || nextVisitorId,

    time: req.query.time || Math.round((new Date().getTime() - currenttime.getTime()) / 1000),


  });
  currenttime = new Date();
});



// tell your server code about the public folde
app.use(express.static('public'));

// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");