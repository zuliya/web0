var express = require('express')
var moment = require('moment')
var router = express.Router()
var crypto = require("crypto");
var dbConnection = require('../helpers/dbConnection');

router.get('/',function (req, res) {
    console.log("");
})

router.post('/', login);

function login(req, resp) {

  console.log("Got here");

  var sql = "SELECT * FROM user WHERE username = ? and password = ?";
  var inserts = [req.body.Username,req.body.Password]

  dbConnection.all(sql,inserts, function(err, res) {


    if (err) {
      resp.send("Not authenticated")
    }
    const user = res[0]
    if (!user) {
      resp.send("No user with this login/password")
      return
    }
    // now will generateToken
    // time
    var timeNow = moment()
    // format 2017-12-01 T 15:54:55.801Z ISOO :(
    var timeExpire = moment(timeNow).add(120, 'm').format('YYYY-MM-DD HH:mm:ss');
    console.log(timeExpire)
    // token
    var token = crypto.randomBytes(20).toString('hex');
    //ip
    var ipAddress = req.connection.remoteAddress.replace(/^.*:/, '')
    dbConnection.all(`UPDATE user SET token='${token}', token_IpAddress='${ipAddress}', tokenExpires='${timeExpire}' WHERE id=${user.id}`)
    resp.cookie('token',token,{maxAge:7200000});
    resp.redirect("admin.html");

  })
}


module.exports = router
