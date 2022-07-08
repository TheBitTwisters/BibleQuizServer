const bcrypt    = require('bcrypt')
const Game      = require('../models/Game')
const Question  = require('../models/Question')
const Choice    = require('../models/Choice')
const jwt       = require('../middlewares/jwt')

const getGameQuestions = (req, res) => {
  Game.get({ id: req.query.game_id })
    .then(game => {
      Question.search({ game_id: game.id }, {})
        .then(async (results) => {
          var questions = [], i = 1
          for (let question of results) {
            question.row_number = i
            question.choices = await Choice.search({ question_id: question.id })
            questions.push(question)
            i++
          }
          res.status(200).json({
            err: false,
            code: 200,
            message: 'Questions fetched successfully',
            game: game,
            questions: questions,
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
    .then(async (result) => {
      if (question.id > 0) {
        Choice.delete({ question_id: question.id })
        for (let choice_data of req.body.question.choices) {
          const choice = new Choice(choice_data)
          choice.question_id = question.id
          await choice.save()
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
