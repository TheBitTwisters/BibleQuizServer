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

const createLevel = (req, res) => {
  const level = new Level(req.body.level)
  level.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Level created successfully',
          session: req.session
        })
      } else {
        res.status(409).json({
          err: true,
          code: 409,
          message: 'Failed to create level'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const updateLevel = (req, res) => {
  Level.get({ id: req.params.level_id })
    .then(level => {
      level.updateData(req.body.level)
      level.save()
        .then(result => {
          if (result) {
            res.status(200).json({
              err: false,
              code: 200,
              message: 'Level created successfully',
              session: req.session
            })
          } else {
            res.status(409).json({
              err: true,
              code: 409,
              message: 'Failed to create level'
            })
          }
        })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  getAll,
  createLevel,
  updateLevel
}
