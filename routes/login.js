var express = require('express')
var moment = require('moment')
var router = express.Router()
var crypto = require("crypto");
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
    // time
    var timeNow = moment()
    // format 2017-12-01T15:54:55.801Z ISOO :(
    var timeExpire = moment(timeNow).add(120, 'm').format('YYYY-MM-DD HH:mm:ss');
    console.log(timeExpire)
    // token
    var token = crypto.randomBytes(20).toString('hex');
    //ip
    var ipAddress = req.connection.remoteAddress.replace(/^.*:/, '')
    dbConnection.query(`UPDATE user SET token='${token}', token_IpAddress='${ipAddress}', tokenExpires='${timeExpire}' WHERE id=${user.id}`)


    resp.json(user)
  })
}


module.exports = router
