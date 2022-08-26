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

const setGroupGameScore = (req, res) => {
  Gamescore.search({
    game_id: req.params.game_id,
    group_id: req.params.group_id
  }).then(list => {
    var groupscore = new Gamescore({
      game_id: req.params.game_id,
      group_id: req.params.group_id,
      score: req.body.score
    })
    if (list.length > 0) {
      groupscore.id = list[0].id
    }
    groupscore.save()
      .then(result => {
        if (result) {
          res.status(200).json({
            err: false,
            code: 200,
            message: 'Group gamescore has been saved',
            session: req.session
          })
        } else {
          res.status(409).json({
            err: false,
            code: 409,
            message: 'Failed save Group gamescore',
            session: req.session
          })
        }
      })
  }).catch(err => {
    res.status(500).json(err)
  })
}

module.exports = {
  getAll,
  setGroupGameScore
}
