// set up express for routing
var express = require("express");
var app = express();

// Allow for get and post variables to be read
var bodyParser = require('body-parser');
// post requests hiddent
app.use(bodyParser.json()); // to support JSON-encoded bodies
//url getrequest in the urlencoded
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// searches through everything to find (will look for that in static) /About

// TODO all the routes in /events2017/ (router do something) name
app.use("/", express.static(__dirname + "/static"));

app.get("/", function(req, resp) {

});

app.get("/events", function(req, resp) {
// application/json all response have JSON have to send JSON
    resp.setHeader("content-type", "application/json");

    // TODO get data from database
    // Maybe use https://github.com/mysqljs/mysql for a mysql connection with nodejs

    // TODO send the data from the database to the client
    resp.send({
      // object json
      //send actual data back
        greeting: "Hello"
    });
});

app.post("/events", function(req, resp) {
    var venueTown = req.body.venueTown;
    var varN = req.body.venueName;
});


app.post("/venues", function(req, resp) {
    var venueName = req.body.venueName
    // saved in the variable to validate them
});
// TODO authentication the route ( make sure the route will not be matched too late)
// should be above*** Post get (variable magic tocken n send back ) 
app.get("*", function(req, resp) {
    resp.send("404 - page not found");
});

app.listen("8090", function() {
    console.log("Successfully started listening on port 8090")
});
