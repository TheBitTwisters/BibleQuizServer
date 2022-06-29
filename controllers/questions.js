const bcrypt    = require('bcrypt')
const Game      = require('../models/Game')
const Level     = require('../models/Level')
const QuestType = require('../models/QuestType')
const Question  = require('../models/Question')
const jwt       = require('../middlewares/jwt')

const getGameQuestions = (req, res) => {
  var game_id = 0
  if (req.params.hasOwnProperty('game_id')) {
    game_id = req.params.game_id
  }
  Game.get({ id: game_id })
    .then(async (game) => {

      var levels = await Level.getAll()
      var types = await QuestType.getAll()

      Question.search({ game_id: game_id }, {})
        .then(results => {
          res.status(200).json({
            err: false,
            code: 200,
            message: 'Questions fetched successfully',
            game: game,
            levels: levels,
            quest_types: types,
            questions: results,
            session: req.session
          })
        })
    }).catch(err => {
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
  getGameQuestions,
  saveGame
}
