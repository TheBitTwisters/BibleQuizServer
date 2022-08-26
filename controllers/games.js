const bcrypt     = require('bcrypt')
const Game       = require('../models/Game')
const Level      = require('../models/Level')
const QuestType  = require('../models/QuestType')
const Question   = require('../models/Question')
const Choice     = require('../models/Choice')
const Answer     = require('../models/Answer')
const Attendance = require('../models/Attendance')
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
        if (jwt.isPlayer(req)) {
          var answer = await Answer.search({ question_id: question.id, attendance_id: req.player.id })
          if (answer.length > 0) {
            question.submitted_answer = answer[0].answer
          }
        }
        var choices = await Choice.search({ question_id: question.id })
        if (question.locked_at || jwt.isManager(req)) {
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
      console.error(err)
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
    .then(async (game) => {
      if (game) {
        var current_question = null
        if (game.current_question_id > 0) {
          current_question = await Question.get({ id: game.current_question_id })
        }
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Game details fetched successfully',
          game: game,
          current_question: current_question,
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
    .then(players => {
      res.status(200).json({
        err: false,
        code: 200,
        message: 'Players fetched successfully',
        players: players,
        session: req.session
      })
    }).catch(err => {
      res.status(500).json(err)
    })
}
const modifyPlayersPass = (req, res) => {
  Attendance.search({ game_id: req.params.game_id })
    .then(async (players) => {
      for (let player of players) {
        player.pass = req.params.game_id + '-' + player.pass
        await player.save()
      }
      res.status(200).json({
        err: false,
        code: 200,
        message: 'Players pass modified successfully',
        players: players,
        session: req.session
      })
    }).catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
}

const getScores = (req, res) => {
  Answer.getGameScores(req.params.game_id)
    .then(async (scores) => {
      if (scores.length == 0) {
        scores = await Attendance.search({ game_id: req.params.game_id })
      }
      res.status(200).json({
        err: false,
        code: 200,
        message: 'Game scores fetched successfully',
        scores: scores,
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
      if (req.body.question_id > 0) {
        Question.get({ id: req.body.question_id })
          .then(question => {
            game.current_question_id = question.id
            game.save()
              .then(() => {
                res.status(200).json({
                  err: false,
                  code: 200,
                  message: 'Current Game\'s question changed successfully',
                  game: game,
                  question: question,
                  session: req.session
                })
              })
          })
      } else {
        game.current_question_id = req.body.question_id
        game.save()
          .then(() => {
            res.status(200).json({
              err: false,
              code: 200,
              message: 'Game finished successfully',
              game: game,
              session: req.session
            })
          })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const addPlayer = (req, res) => {
  Game.get({ id: req.params.game_id })
    .then(game => {
      const attend = new Attendance({
        game_id: game.id,
        name: req.body.name,
        pass: req.body.pass
      })
      switch (req.body.type) {
        case 'group':
          attend.group_id = req.body.player_id
          attend.member_id = null
          break
        case 'individual':
          attend.member_id = req.body.player_id
          attend.group_id = null
          break
      }
      attend.save()
        .then(() => {
          Attendance.search({ game_id: game.id })
            .then(players => {
              res.status(200).json({
                err: false,
                code: 200,
                message: 'Players updated',
                players: players,
                session: req.session
              })
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
  modifyPlayersPass,
  getScores,
  getQuestions,
  getCurrentQuestion,
  setCurrentQuestion,
  addPlayer,
  createGame,
  updateGame
}
