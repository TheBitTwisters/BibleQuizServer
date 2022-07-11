const bcrypt    = require('bcrypt')
const Game      = require('../models/Game')
const Question  = require('../models/Question')
const Level     = require('../models/Level')
const QuestType = require('../models/QuestType')
const Choice    = require('../models/Choice')
const jwt       = require('../middlewares/jwt')

const getDetails = (req, res) => {
  console.log(req)
  Question.get({ id: req.params.question_id }, {})
    .then(async (question) => {
      if (question) {
        var level = await Level.get(question.level_id)
        var quest_type = await QuestType.get(question.type_id)
        var choices = await Choice.search({ question_id: question.id })
        if (jwt.isManager(req)) {
          question.choices = choices
        } else {
          question.choices = []
          for (let choice of choices) {
            question.choices.push(choice.toPublicData())
          }
        }
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Question details fetched successfully',
          question: question,
          level: level,
          quest_type: quest_type,
          session: req.session
        })
      } else {
        res.status(404).json({
          err: true,
          code: 404,
          message: 'Question not found'
        })
      }
    }).catch(err => {
      res.status(500).json(err)
    })
}

const createQuestion = (req, res) => {
  const question = new Question(req.body.question)
  question.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Question created successfully',
          session: req.session
        })
      } else {
        res.status(409).json({
          err: true,
          code: 409,
          message: 'Failed to create question'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const updateQuestion = (req, res) => {
  Question.get({ id: req.params.question_id })
    .then(question => {
      question.updateData(req.body.question)
      question.save()
        .then(result => {
          if (result) {
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
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  getDetails,
  createQuestion,
  updateQuestion
}
