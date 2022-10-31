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

const fetch = require('node-fetch');
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
app.get("/trivia", async (req, res) => {
  // fetch the data
  const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");

  // fail if bad response
  if (!response.ok) {
    res.status(500);
    res.send(`Open Trivia Database failed with HTTP code ${response.status}`);
    return;
  }

  // interpret the body as json
  const data = await response.json();

  // fail if db failed
  if (data.response_code !== 0) {
    res.status(500);
    res.send(`Open Trivia Database failed with internal response code ${data.response_code}`);
    return;
  }

  // respond to the browser
  // TODO: make proper html
  correctAnswer = data.results[0]['correct_answer']
  answers = data.results[0]['incorrect_answers']
  answers.push(correctAnswer)
  let sequencemix = answers.sort(function() {
      return Math.random() - 0.5;
  });
  const answerLinks = sequencemix.map(answer => {
      return `<a style='color:white' href="javascript:alert('${
        answer === correctAnswer ? 'Correct!' : 'Incorrect, Please Try Again!'
        }')">${answer}</a>`
  })
  res.render('trivia', {
      question: data.results[0]['question'],
      category: data.results[0]['category'],
      difficulty: data.results[0]['difficulty'],
      answers: answerLinks
  })
})


// tell your server code about the public folde


// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");
