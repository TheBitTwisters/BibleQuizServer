const bcrypt    = require('bcrypt')
const Game      = require('../models/Game')
const Group     = require('../models/Group')
const Gamescore = require('../models/Gamescore')
const jwt       = require('../middlewares/jwt')

const getAll = (req, res) => {
  Gamescore.getAllScores()
    .then(scores => {
      res.status(200).json({
        err: false,
        code: 200,
        message: 'All scores fetched successfully',
        scores: scores,
        session: req.session
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  getAll
}
