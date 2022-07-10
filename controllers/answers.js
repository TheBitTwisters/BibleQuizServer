const bcrypt = require('bcrypt')
const Answer = require('../models/Answer')
const jwt    = require('../middlewares/jwt')

const checkAnswers = (req, res) => {
  Answer.getQuestionAnswers(req.body.question_id)
    .then(list => {
      res.status(200).json({
        err: false,
        code: 200,
        message: 'Question answers fetched successfully',
        answers: list,
        session: req.session
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const submitAnswer = (req, res) => {
  const answer = new Answer(req.body.answer)
  answer.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Answer submitted successfully',
          session: req.session
        })
      } else {
        res.status(200).json({
          err: true,
          code: 200,
          message: 'Answer already submitted'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  checkAnswers,
  submitAnswer
}
