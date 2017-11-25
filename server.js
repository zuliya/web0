// set up express for routing
var express = require("express");
var app = express();
var mysql = require('mysql')

// Allow for get and post variables to be read
var bodyParser = require('body-parser');
// post requests hiddent

// Connecting to db. Up here, so every function can reuse
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'web'
})

//espablish connecton
dbConnection.connect(function(error) {
  if (error) throw error
  console.log('Successfully connected to Database')
})
app.use(bodyParser.json()); // to support JSON-encoded bodies
//url getrequest in the urlencoded
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


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

app.get("/events/search", function (req,resp){
  const {search, date} = req.query
  let query = 'SELECT * FROM event where'
  if (search) query += `title LIKE '%${search}%'`
  if (date) query += `title LIKE '%${search}%'`
  if (search && date) query += ` AND `
  dbConnection.query(query, function (err, result) {
    if (err) {
      console.log(err)
      resp.send("404 - page not found")
    }
    resp.send(result)
  })
})

app.post("/venues/add", function(req, resp) {
  const params = req.body
  dbConnection.query('INSERT INTO venue SET ?', params, function(error, result) {
    if (error) {
      console.log(error)
    }
    resp.send(result)
  })
})

app.get("/events/get/:event_id", function (req,resp){
  const id = req.params.event_id;
  dbConnection.query('SELECT * FROM event where event_id = ?', id, function(err, res, fields) {
    if(err) throw err
    const event = res[0]
    if (!event) {
      resp.send("Error: no such event")
      return
    }
    resp.json(event);
  })
});


app.post("/events/add", function(req, resp) {
  const { event_id, title, venue_id, date, url, blurb } = req.body
  const params = { event_id, title, venue_id, date, url, blurb }
  dbConnection.query('INSERT INTO event SET ?', params, function(err, res) {
    if (err) {
      resp.send(err)
      return
    }
    resp.send(params)
  })

});


app.post("/venues", function(req, resp) {
    var vensomeThing = req.body.venueSomeThing
    // saved in the variable to validate them
    var varN = req.body.venueName;
});

// TODO authentication the route ( make sure the route will not be matched too late)
// should be above*** Post get (variable magic tocken n send back )




app.get("*", function(req, resp) {
    resp.send("404 - page not found");
});

app.listen("8090", function() {
    console.log("Successfully started listening on port 8090")
});
