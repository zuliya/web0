var express = require("express");
var events = require('./routes/events')
var venues = require('./routes/venues')
var login = require('./routes/login')
var dbConnection = require('./helpers/dbConnection')
var router = express.Router()
var app = express();
var bodyParser = require('body-parser');

app.use('/venues', venues)
app.use('/events', events)
app.use('/login',login)

app.listen(8090)
//TODO ask steven about cookies
// do not try and access part of the document untill it has completed loading

function checkRequest(req, resp, next)
{
  if req.method = 'GET':
  next()
  return

  if req.method = 'POST':
  next()
  return

  //How do I call the function from login (so it can check my token?)

}

function checkTokenStillValid (req,resp, next)
{

}
