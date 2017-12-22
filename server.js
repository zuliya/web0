// set up express for routing
var express = require("express");
var moment = require('moment')
var app = express();
var events = require('./routes/events')
var venues = require('./routes/venues')
var login = require('./routes/login')
var dbConnection = require('./helpers/dbConnection')
var bodyParser = require('body-parser');
// Middlewear


// Allow for get and post variables to be read
// post requests hiddent
app.use(bodyParser.json()); // to support JSON-encoded bodies
//url getrequest in the urlencoded
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


app.use(checkToken)
app.use('/events', events)
app.use('/venues', venues)
app.use('/login', login)
app.use('/static', express.static('./static'))



function checkToken(req, resp, next) {
  // if just need to find event no need to be admin
  if (req.method === 'GET') {
    next()
    return
  }
  // TODO add later auth_token === 'concertina' && req.connection.remoteAddress.startsWith('129.234.')
  const { auth_token , username, password} = req.body

  if (auth_token === 'concertina' ) {
    next()
    return
  }


  if (auth_token) {

    dbConnection.query(`SELECT * FROM user WHERE token = '${auth_token}'`, function(err, result) {
      if (err) {
        resp.send('NOT authenticated')
        return
      }

      if(!user){
          resp.send('NOT authenticated!')
          return
      }
      next()
      return
    })
  }

  if(!username || !password) {
      resp.send('NOT authenticated')
  }

  if (username, password) {
    dbConnection.query(`SELECT * FROM user WHERE username LIKE '${username}' and password LIKE '${password}'`, function(err, res) {
      if (err) {
        resp.send("Not authenticated!")
        // # HERE IS AN ERROR #
        return
      }

      const user = res[0]
      if (!user) {
        resp.send("No user with this login/password")
        // # HERE IS AN ERROR #
        return
      }
  })
  next()
  return
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
