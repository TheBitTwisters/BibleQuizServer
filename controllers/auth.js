const bcrypt     = require('bcrypt')
const Manager    = require('../models/Manager')
const Attendance = require('../models/Attendance')
const Game       = require('../models/Game')
const jwt        = require('../middlewares/jwt')

const signinManager = (req, res) => {
  Manager.get({ name: req.body.name })
    .then(async (manager) => {
      if (manager) {
        // comparing passwords
        var result = await bcrypt.compareSync(req.body.pin, manager.pin)
        if (result) {
          // get session by signing the manager_id
          var session = jwt.sign(manager.id, 'manager')
          // get games
          var games = await Game.getAll()
          // responding to client request with manager profile success message and  access token.
          res.status(200).json({
            err: false,
            code: 200,
            message: 'Login successful',
            manager: manager.toPublicData(),
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
          message: 'manager not found'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}

const signinPlayer = (req, res) => {
  Attendance.get({ pass: req.body.pass })
    .then(async (player) => {
      if (player) {
        // get session by signing the manager_id
        var session = jwt.sign(player.id, 'player')
        var game = await Game.get({ id: player.game_id })
        // responding to client request with manager profile success message and  access token.
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Login successful',
          player: player.toPublicData(),
          game: game,
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
