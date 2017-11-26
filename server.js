// set up express for routing
var express = require("express");
var app = express();
var events = require('./routes/events')
var dbConnection = require('./helpers/dbConnection')

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

// Get all venues
app.get("/venues", function(req, resp) {
  // application/json all response have JSON have to send JSON
      resp.setHeader("content-type", "application/json");
  // pass the query to an established connection
  const query = 'SELECT * FROM venue'
  dbConnection.query(query, function(error, result) {
    if (error) {
      console.log(error)
    }
    let normalized = {}
    for (var i = 0; i < result.length; i++ ) {
      const { id, name, postcode, town, url, icon } = result[i]
      // string interpalation ['']
      normalized[`v_${id}`] = { name, postcode, town, url, icon }
    }
    resp.json({ venues: normalized })
  })
})

app.post("/venues/add", function(req, resp) {
  const { name, postcode, town, url, icon } = req.body
  const params = { name, postcode, town, url, icon }
  dbConnection.query('INSERT INTO venue SET ?', params, function(err, res) {
    if (err) {
      resp.send(err)
      return
    }
    resp.send(params)
  })
});




// TODO authentication the route ( make sure the route will not be matched too late)
// should be above*** Post get (variable magic tocken n send back )

function checkToken(req, resp, next) {
  if (req.method === 'GET') {
    next()
    return
  }
  const { auth_token } = req.body
  if (auth_token === 'concertina' && req.connection.remoteAddress.startsWith('129.234.')) {
    next()
    return
  }
  resp.send('Steve, not authenticated!')
}



app.get("*", function(req, resp) {
    resp.send("404 - page not found");
});

app.listen("8090", function() {
    console.log("Successfully started listening on port 8090")
});
