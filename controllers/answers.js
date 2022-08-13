const bcrypt = require('bcrypt')
const Answer = require('../models/Answer')
const jwt    = require('../middlewares/jwt')

const saveScore = (req, res) => {
  Answer.get({ id: req.params.answer_id })
    .then(answer => {
      answer.saveScore(req.body.score)
        .then(result => {
          res.status(200).json({
            err: false,
            code: 200,
            message: 'Answer\'s score updated successfully',
            answer: answer,
            session: req.session
          })
        })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  saveScore
}
