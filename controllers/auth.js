const bcrypt = require('bcrypt')
const User   = require('../models/User')
const Game   = require('../models/Game')
const jwt    = require('../middlewares/jwt')

const signinManager = (req, res) => {
  User.get({ name: req.body.name })
    .then(async (user) => {
      if (user) {
        // comparing passwords
        var result = await bcrypt.compareSync(req.body.pin, user.pin)
        if (result) {
          // get session by signing the user_id
          var session = jwt.sign(user.id)
          // get games
          var games = await Game.getAll()
          // responding to client request with user profile success message and  access token.
          res.status(200).json({
            err: false,
            code: 200,
            message: 'Login successful',
            user: user.toPublicData(),
            games: games,
            session: session
          })
        } else {
          return res.status(401).json({
            err: true,
            code: 401,
            message: 'Invalid pin!'
          })
        }
      } else {
        res.status(404).json({
          err: true,
          code: 404,
          message: 'User not found'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}

const signinPlayer = (req, res) => {
  User.get({ name: req.body.name })
    .then(user => {
      if (user) {
        // get session by signing the user_id
        var session = jwt.sign(user.id)
        // responding to client request with user profile success message and  access token.
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Login successful',
          user: user.toPublicData(),
          session: session
        })
      } else {
        res.status(404).json({
          err: true,
          code: 404,
          message: 'Player not found'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  signinManager,
  signinPlayer
}
