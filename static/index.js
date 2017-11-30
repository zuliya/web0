var express = require("express");
var events = require('./routes/events')
var venues = require('./routes/venues')
var login = require('./routes/login')
var dbConnection = require('./helpers/dbConnection')


//TODO ask steven about cookies
// do not try and access part of the document untill it has completed loading
