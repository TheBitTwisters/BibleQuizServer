const bcrypt = require('bcrypt')
const Answer = require('../models/Answer')
const jwt    = require('../middlewares/jwt')

const getGameScores = (req, res) => {
  Answer.getGameScores(req.body.game_id)
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

module.exports = {
  getGameScores
}