const bcrypt     = require('bcrypt')
const User       = require('../models/User')
const Attendance = require('../models/Attendance')
const jwt        = require('../middlewares/jwt')

const getAll = (req, res) => {
  User.search({ type: 'player' }, {})
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

const createPlayer = (req, res) => {
  const player = new User(req.body.player)
  player.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Player created successfully',
          player: player,
          session: req.session
        })
      } else {
        res.status(409).json({
          err: true,
          code: 409,
          message: 'Failed to create player'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const updatePlayer = (req, res) => {
  User.get({ id: req.params.player_id })
    .then(player => {
      player.updateData(req.body.player)
      player.save()
        .then(result => {
          if (result) {
            res.status(200).json({
              err: false,
              code: 200,
              message: 'Player updated successfully',
              player: player,
              session: req.session
            })
          } else {
            res.status(409).json({
              err: true,
              code: 409,
              message: 'Failed to update player'
            })
          }
        })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  getAll,
  createPlayer,
  updatePlayer
}
