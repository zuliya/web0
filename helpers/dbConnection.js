var mysql = require('mysql')

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

module.exports = dbConnection
