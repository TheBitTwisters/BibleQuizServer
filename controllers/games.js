const bcrypt     = require('bcrypt')
const Game       = require('../models/Game')
const Level      = require('../models/Level')
const QuestType  = require('../models/QuestType')
const Question   = require('../models/Question')
const Choice     = require('../models/Choice')
const Answer     = require('../models/Answer')
const Attendance = require('../models/Attendance')
const User       = require('../models/User')
const jwt        = require('../middlewares/jwt')

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

const getQuestions = (req, res) => {
  Question.search({ game_id: req.params.game_id }, {})
    .then(async (questions) => {
      for (let question of questions) {
        var choices = await Choice.search({ question_id: question.id })
        if (jwt.isManager(req)) {
          question.choices = choices
        } else {
          question.choices = []
          for (let choice of choices) {
            question.choices.push(choice.toPublicData())
          }
        }
      }
      res.status(200).json({
        err: false,
        code: 200,
        message: 'Questions fetched successfully',
        questions: questions,
        session: req.session
      })
    }).catch(err => {
      res.status(500).json(err)
    })
}

const getCurrentQuestion = (req, res) => {
  Game.get({ id: req.params.game_id })
    .then(game => {
      Question.get({ id: game.current_question_id }, {})
        .then(async (question) => {
          var choices = await Choice.search({ question_id: question.id })
          question.choices = []
          for (let choice of choices) {
            question.choices.push(choice.toPublicData())
          }
          res.status(200).json({
            err: false,
            code: 200,
            message: 'Game\'s current question fetched successfully',
            question: question,
            session: req.session
          })
        })
    }).catch(err => {
      res.status(500).json(err)
    })
}


const getDetails = (req, res) => {
  Game.get({ id: req.params.game_id })
    .then(game => {
      if (game) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Game details fetched successfully',
          game: game,
          session: req.session
        })
      } else {
        res.status(404).json({
          err: true,
          code: 404,
          message: 'Game not found'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const getPlayers = (req, res) => {
  Attendance.search({ game_id: req.params.game_id })
    .then(async (results) => {
      var players = []
      for (let attendance of results) {
        var player = await User.get({ id: attendance.user_id })
        players.push(player.toPublicData())
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

const getScores = (req, res) => {
  Answer.getGameScores(req.params.game_id)
    .then(list => {
      res.status(200).json({
        err: false,
        code: 200,
        message: 'Game scores fetched successfully',
        scores: list,
        session: req.session
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const setCurrentQuestion = (req, res) => {
  Game.get({ id: req.params.game_id })
    .then(game => {
      game.current_question_id = req.body.question_id
      game.save()
        .then(() => {
          res.status(200).json({
            err: false,
            code: 200,
            message: 'Current Game\'s question changed successfully',
            game: game,
            session: req.session
          })
        })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const createGame = (req, res) => {
  const game = new Game(req.body.game)
  game.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Game created successfully',
          game: game,
          session: req.session
        })
      } else {
        res.status(409).json({
          err: true,
          code: 409,
          message: 'Failed to create game'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const updateGame = (req, res) => {
  Game.get({ id: req.params.geme_id })
    .then(game => {
      game.updateData(req.body.game)
      game.save()
        .then(result => {
          if (result) {
            res.status(200).json({
              err: false,
              code: 200,
              message: 'Game updated successfully',
              game: game,
              session: req.session
            })
          } else {
            res.status(409).json({
              err: true,
              code: 409,
              message: 'Failed to update game'
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
  getDetails,
  getPlayers,
  getScores,
  getQuestions,
  getCurrentQuestion,
  setCurrentQuestion,
  createGame,
  updateGame
}
