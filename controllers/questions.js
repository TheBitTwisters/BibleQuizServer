const bcrypt    = require('bcrypt')
const Game      = require('../models/Game')
const Level     = require('../models/Level')
const QuestType = require('../models/QuestType')
const Question  = require('../models/Question')
const Choice    = require('../models/Choice')
const jwt       = require('../middlewares/jwt')

const getGameQuestions = (req, res) => {
  Game.get({ id: req.body.game_id })
    .then(game => {
      Question.search({ game_id: game.id }, {})
        .then(async (results) => {
          for (let question of results) {
            question.choices = await Level.search({ question_id: question.id })
          }
          res.status(200).json({
            err: false,
            code: 200,
            message: 'Questions fetched successfully',
            game: game,
            questions: results,
            session: req.session
          })
        })
    }).catch(err => {
      res.status(500).json(err)
    })
}

const saveQuestion = (req, res) => {
  const question = new Question(req.body.question)
  if (req.params.hasOwnProperty('question_id')) {
    question.id = req.params.question_id
  }
  question.save()
    .then(result => {
      if (result) {
        Choice.delete({ question_id: question.id })
        for (let choice_data of req.body.question.choices) {
          const choice = new Choice(choice_data)
          choice.question_id = question.id
          choice.save()
        }
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Question details saved successfully',
          session: req.session
        })
      } else {
        res.status(409).json({
          err: true,
          code: 409,
          message: 'Failed to save question details'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  getGameQuestions,
  saveQuestion
}
