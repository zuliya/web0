// set up express for routing
var express = require("express");
var moment = require('moment')
var app = express();
var events = require('./routes/events')
var venues = require('./routes/venues')
var login = require('./routes/login')
var dbConnection = require('./helpers/dbConnection')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
// Middlewear





// Allow for get and post variables to be read
// post requests hiddent
app.use(bodyParser.json()); // to support JSON-encoded bodies
//url getrequest in the urlencoded
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use('/events2017/login', login)
app.use(checkToken)
app.use('/events2017/events', events)
app.use('/events2017/venues', venues)
app.use('/events2017', express.static('./static'))

function checkToken(req, resp, next) {
  // if just need to find event no need to be admin
  if (req.method === 'GET') {
    next()
    return
  }


  // TODO add later auth_token === 'concertina' && req.connection.remoteAddress.startsWith('129.234.')
  let { auth_token } = req.body

  if (auth_token === 'concertina' ) {
    next()
    return
  }

    if (!auth_token) {
        auth_token = req.cookies.auth_token
    }
  if (auth_token) {
      console.log("here");
    console.log(auth_token);

    dbConnection.all(`SELECT * FROM user WHERE token = '${auth_token}'`, function(err, result) {
      // Result gives an empty string
      console.log(result);

      if (err) {
        resp.send('NOT authenticated')
        return
      }

      console.log(result)

      if(!result){
          resp.send('NOT authenticated!')
          return
      }

      next()
      return
    })
  }
   else {
    resp.send('Not authenticated!')
    return
  }
}


app.get("*", function(req, resp) {
    resp.send("404 - page not found");
});



// app.post("*", function(req, resp) {
//     resp.send("404 - page not found");
// });

app.listen("8090", function() {
    console.log("Successfully started listening on port 8090")
});
