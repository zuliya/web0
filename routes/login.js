var express = require("express")
var router = express.Router()
var dbConnection = require('../helpers/dbConnection')



router.post('/log', login)

function login(req, resp) {
  console.log("Got here")
  const { username, password } = req.body
  dbConnection.query(`SELECT * FROM user WHERE username LIKE '${username}' and password LIKE '${password}'`, function(err, res) {
    if (err) {
      resp.send(err)
    }
    const user = res[0]
    if (!user) {
      resp.send("No user with this login/password")
      return
    }
    // now will generateToken
    var newDateObj = moment(oldDateObj).add(30, 'm').toDate();
    console.log(newDateObj)
    resp.json(user)
  })
}


module.exports = router
