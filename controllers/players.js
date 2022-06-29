const bcrypt = require('bcrypt')
const Player = require('../models/Player')
const jwt    = require('../middlewares/jwt')

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
  savePlayer
}
