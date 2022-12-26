const bcrypt    = require('bcrypt')
const Game      = require('../models/Game')
const Question  = require('../models/Question')
const Level     = require('../models/Level')
const QuestType = require('../models/QuestType')
const Choice    = require('../models/Choice')
const Answer    = require('../models/Answer')
const PassPlayAttendance = require('../models/PassPlayAttendance')
const jwt       = require('../middlewares/jwt')

const getDetails = (req, res) => {
  Question.get({ id: req.params.question_id }, {})
    .then(async (question) => {
      if (question) {
        var level = await Level.get(question.level_id)
        var quest_type = await QuestType.get(question.type_id)
        var choices = await Choice.search({ question_id: question.id })
        if (question.locked_at || jwt.isManager(req)) {
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

const passplay = (req, res) => {
  Question.get({ id: req.params.question_id }, {})
    .then(async (question) => {
      var passorplay = new PassPlayAttendance({
        question_id: question.id,
        attendance_id: req.player.id,
        play: req.body.play
      })
      passorplay.save()
        .then(result => {
          if (result) {
            res.status(200).json({
              err: false,
              code: 200,
              message: 'Question pass or play successfully',
              question_id: question.id,
              session: req.session
            })
          } else {
            res.status(409).json({
              err: true,
              code: 409,
              message: 'Failed to pass or play'
            })
          }
        })
    }).catch(err => {
      res.status(500).json(err)
    })
}

const submitAnswer = (req, res) => {
  Question.get({ id: req.params.question_id }, {})
    .then(async (question) => {
      if (question.locked_at) {
        res.status(409).json({
          err: false,
          code: 409,
          message: 'Failed to accept answer, question locked',
          session: req.session
        })
      } else {
        var canAnswer = true
        if (question.passplay) {
          var passplay = await PassPlayAttendance.get({
            question_id: question.id,
            attendance_id: req.player.id
          })
          if (!passplay.play) {
            canAnswer = false
          }
        }
        if (canAnswer) {
          Answer.submit({
            game_id:       question.game_id,
            question_id:   question.id,
            attendance_id: req.player.id,
            answer:        req.body.answer
          })
            .then(answer => {
              var message = 'Answer submitted successfully'
              if (answer.checked == 1) {
                message = 'Answer has been checked'
              }
              res.status(200).json({
                err: false,
                code: 200,
                message: message,
                answer: answer,
                session: req.session
              })
            })
        } else {
          res.status(409).json({
            err: false,
            code: 409,
            message: 'Failed to accept answer, player passed',
            session: req.session
          })
        }
      }
    }).catch(err => {
      res.status(500).json(err)
    })
}

const getSubmittedAnswers = (req, res) => {
  Question.get({ id: req.params.question_id }, {})
    .then(question => {
      Answer.search({ question_id: question.id }, {})
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

const lockQuestion = (req, res) => {
  Question.get({ id: req.params.question_id }, {})
    .then(question => {
      question.lock()
        .then(async (result) => {
          if (result) {
            var lockedQuestion = await Question.get({ id: question.id })
            res.status(200).json({
              err: false,
              code: 200,
              message: 'Question has been locked',
              question: lockedQuestion,
              session: req.session
            })
          } else {
            res.status(409).json({
              err: false,
              code: 409,
              message: 'Failed to lock question',
              session: req.session
            })
          }
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
  passplay,
  submitAnswer,
  getSubmittedAnswers,
  lockQuestion,
  createQuestion,
  updateQuestion
}
