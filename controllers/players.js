const bcrypt     = require('bcrypt')
const Player     = require('../models/Player')
const Attendance = require('../models/Attendance')
const jwt        = require('../middlewares/jwt')

const getAll = (req, res) => {
  Player.getAll()
    .then(list => {
      res.status(200).json({
        err: false,
        code: 200,
        message: 'Players fetched successfully',
        players: list,
        session: req.session
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const getAttendance = (req, res) => {
  Attendance.search({ game_id: req.params.game_id })
  .then(async (results) => {
    var players = []
    for (let attendance of results) {
      var player = await Player.get({ id: attendance.player_id })
      players.push(player)
    }
    res.status(200).json({
      err: false,
      code: 200,
      message: 'Attendance fetched successfully',
      players: players,
      session: req.session
    })
  }).catch(err => {
    res.status(500).json(err)
  })
}

const savePlayer = (req, res) => {
  const player = new Player(req.body.player)
  if (req.params.hasOwnProperty('player_id')) {
    player.id = req.params.player_id
  }
  player.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Player details saved successfully',
          session: req.session
        })
      } else {
        res.status(409).json({
          err: true,
          code: 409,
          message: 'Failed to save player details'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  getAll,
  getAttendance,
  savePlayer
}
