const bcrypt = require('bcrypt')
const Game   = require('../models/Game')
const jwt    = require('../middlewares/jwt')

const getAll = (req, res) => {
  Game.getAll()
    .then(list => {
      res.status(200).json({
        err: false,
        code: 200,
        message: 'Games fetched successfully',
        games: list,
        session: req.session
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const setGameQuestion = (req, res) => {
  Game.get({ id: req.body.game_id })
    .then(game => {
      game.current_question_id = req.body.question_id
      game.save()
        .then(result => {
          if (result) {
            res.status(200).json({
              err: false,
              code: 200,
              message: 'Game current question changed successfully',
              game: game,
              session: req.session
            })
          } else {
            res.status(409).json({
              err: true,
              code: 409,
              message: 'Failed to change game question'
            })
          }
        })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const saveGame = (req, res) => {
  const game = new Game(req.body.game)
  if (req.params.hasOwnProperty('game_id')) {
    game.id = req.params.game_id
  }
  game.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Game details saved successfully',
          session: req.session
        })
      } else {
        res.status(409).json({
          err: true,
          code: 409,
          message: 'Failed to save game details'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  getAll,
  setGameQuestion,
  saveGame
}
