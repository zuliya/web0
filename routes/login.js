var express = require("express")
var router = express.Router()
var dbConnection = require('../helpers/dbConnection')



router.post('/login', login)
function login(req, resp) {
  app.use(checkToken);
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

function checkToken(req, resp, next) {
  // if just need to find event no need to be admin
  if (req.method === 'GET') {
    next()
    return
  }
  // TODO add later auth_token === 'concertina' && req.connection.remoteAddress.startsWith('129.234.')
  const { auth_token } = req.body
  if (auth_token === 'concertina' ) {
    next()
    return
  }
  resp.send('Not authenticated!')

  if (!auth_token){
  resp.send('Not authenticated!')
  }

}

module.exports = router
