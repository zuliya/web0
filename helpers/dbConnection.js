// var mysql = require('mysql')
//
// // Connecting to db. Up here, so every function can reuse
// const dbConnection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'web'
// })
//
// //espablish connecton
// dbConnection.connect(function(error) {
//   if (error) throw error
//   console.log('Successfully connected to Database')
// })
//
// module.exports = dbConnection


var sqlite3 = require('sqlite3').verbose();

// Connecting to db. Up here, so every function can reuse

//  Cannot read property '0' of undefined

var dbConnection = new sqlite3.Database('web.db', 'sqlite3.OPEN_READWRITE', function(err)
{
  console.log("HERE");
  if(err){
    console.log("err");
  }
  console.log('Connected to the in-memory SQlite database.');
});

module.exports = dbConnection
