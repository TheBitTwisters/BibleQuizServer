const bcrypt    = require('bcrypt')
const Game      = require('../models/Game')
const Question  = require('../models/Question')
const Level     = require('../models/Level')
const QuestType = require('../models/QuestType')
const Choice    = require('../models/Choice')
const Answer    = require('../models/Answer')
const jwt       = require('../middlewares/jwt')

const getDetails = (req, res) => {
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

const getAnswer = (req, res) => {
  Question.get({ id: req.params.question_id }, {})
    .then(async (question) => {
      var choices = await Choice.search({ question_id: question.id })
      var answer = null
      var answerChoice = null
      for (let choice of choices) {
        if (choice.is_answer == 1) {
          answer = `${choice.label}${choice.label ? '.':''} ${choice.value}`
          answerChoice = choice
        }
      }
      res.status(200).json({
        err: false,
        code: 200,
        message: 'Question answer fetched successfully',
        answer: answer,
        choice: answerChoice,
        session: req.session
      })
    }).catch(err => {
      res.status(500).json(err)
    })
}

const submitAnswer = (req, res) => {
  Question.get({ id: req.params.question_id }, {})
    .then(question => {
      Answer.submit({
        game_id:     question.game_id,
        question_id: question.id,
        user_id:     req.user.id,
        answer:      req.body.answer
      })
        .then(answer => {
          res.status(200).json({
            err: false,
            code: 200,
            message: 'Question answer submitted successfully',
            answer: answer,
            session: req.session
          })
        })
    }).catch(err => {
      res.status(500).json(err)
    })
}

const getSubmittedAnswers = (req, res) => {
  Question.get({ id: req.params.question_id }, {})
    .then(async (question) => {
      Answer.getQuestionAnswers(question.id)
        .then(list => {
          res.status(200).json({
            err: false,
            code: 200,
            message: 'Question answers fetched successfully',
            answers: list,
            session: req.session
          })
        })
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
          question: question,
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
          var message = 'Question updated successfully'
          if (!result) {
            message = 'Question is unchanged'
          }
          res.status(200).json({
            err: false,
            code: 200,
            message: message,
            question: question,
            session: req.session
          })
        })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  getDetails,
  getAnswer,
  submitAnswer,
  getSubmittedAnswers,
  createQuestion,
  updateQuestion
}
