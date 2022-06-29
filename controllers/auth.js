const bcrypt  = require('bcrypt')
const Manager = require('../models/Manager')
const jwt     = require('../middlewares/jwt')

const signinManager = (req, res) => {
  var params = {
    name: req.body.name
  }
  Manager.get(params)
    .then(manager => {
      if (!manager) {
        return res.status(404).json({
          err: true,
          code: 404,
          message: 'User Not found'
        });
      }
      // comparing passwords
      bcrypt.compare(req.body.pin, manager.pin, async function(err, result) {
        if (!result) {
          return res.status(401).json({
            err: true,
            code: 401,
            message: 'Invalid pin!'
          })
        }

        // get session by signing the manager_id
        var session = jwt.signManager(manager.id)

        // responding to client request with user profile success message and  access token.
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Login successful',
          manager: manager.toPublicData(),
          session: session
        })
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  signinManager
}
