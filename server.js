// set up express for routing
var express = require("express");
var app = express();
var events = require('./routes/events')
var venues = require('./routes/venues')
var dbConnection = require('./helpers/dbConnection')

// Middlewear

// Allow for get and post variables to be read
var bodyParser = require('body-parser');
// post requests hiddent
app.use(bodyParser.json()); // to support JSON-encoded bodies
//url getrequest in the urlencoded
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(checkToken);
app.use('/events', events)
app.use('/venues', venues)


function checkToken(req, resp, next) {
  if (req.method === 'GET') {
    next()
    return
  }
  // TODO add later auth_token === 'concertina' && req.connection.remoteAddress.startsWith('129.234.')
  const { auth_token } = req.body
  if (auth_token === 'concertina' ) {
    next()
    return
  }
  resp.send('Not authenticated!')
}



app.get("*", function(req, resp) {
    resp.send("404 - page not found");
});

app.listen("8090", function() {
    console.log("Successfully started listening on port 8090")
});
