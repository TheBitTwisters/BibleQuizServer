const bcrypt = require('bcrypt')
const Choice = require('../models/Choice')
const jwt    = require('../middlewares/jwt')

const getDetails = (req, res) => {
  Choice.get({ id: req.params.choice_id })
    .then(choice => {
      if (choice) {
        if (!jwt.isManager(req)) {
          choice = choice.toPublicData()
        }
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Choice details fetched successfully',
          choice: choice,
          session: req.session
        })
      } else {
        res.status(404).json({
          err: true,
          code: 404,
          message: 'Choice not found'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const createChoice = (req, res) => {
  const choice = new Choice(req.body.choice)
  choice.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Choice created successfully',
          session: req.session
        })
      } else {
        res.status(409).json({
          err: true,
          code: 409,
          message: 'Failed to create choice'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const updateChoice = (req, res) => {
  Choice.get({ id: req.params.choice_id })
    .then(choice => {
      choice.updateData(req.body.choice)
      choice.save()
        .then(result => {
          if (result) {
            res.status(200).json({
              err: false,
              code: 200,
              message: 'Choice updated successfully',
              session: req.session
            })
          } else {
            res.status(409).json({
              err: true,
              code: 409,
              message: 'Failed to update choice'
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
  createChoice,
  updateChoice
}
