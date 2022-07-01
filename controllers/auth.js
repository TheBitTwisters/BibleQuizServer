const bcrypt  = require('bcrypt')
const Manager = require('../models/Manager')
const Player  = require('../models/Player')
const Game    = require('../models/Game')
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
          message: 'Manager not found'
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

        // get games
        var games = await Game.getAll()

        // responding to client request with user profile success message and  access token.
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Login successful',
          manager: manager.toPublicData(),
          games: games,
          session: session
        })
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const signinPlayer = (req, res) => {
  var params = {
    name: req.body.name
  }
  Player.get(params)
    .then(player => {
      if (!player) {
        return res.status(404).json({
          err: true,
          code: 404,
          message: 'Player not found'
        });
      }

      // get session by signing the manager_id
      var session = jwt.signinPlayer(player.id)

      // responding to client request with user profile success message and  access token.
      res.status(200).json({
        err: false,
        code: 200,
        message: 'Login successful',
        player: player.toPublicData(),
        games: games,
        session: session
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  signinManager,
  signinPlayer
}
