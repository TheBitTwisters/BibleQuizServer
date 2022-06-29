const bcrypt = require('bcrypt')
const Level  = require('../models/Level')
const jwt    = require('../middlewares/jwt')

const getAll = (req, res) => {
  Level.getAll()
    .then(list => {
      res.status(200).json({
        err: false,
        code: 200,
        message: 'Levels fetched successfully',
        levels: list,
        session: req.session
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const saveLevel = (req, res) => {
  const level = new Level(req.body.level)
  if (req.params.hasOwnProperty('level_id')) {
    level.id = req.params.level_id
  }
  level.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Level details saved successfully',
          session: req.session
        })
      } else {
        res.status(409).json({
          err: true,
          code: 409,
          message: 'Failed to save level details'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  getAll,
  saveLevel
}
