const bcrypt    = require('bcrypt')
const QuestType = require('../models/QuestType')
const jwt       = require('../middlewares/jwt')

const getAll = (req, res) => {
  QuestType.getAll()
    .then(list => {
      res.status(200).json({
        err: false,
        code: 200,
        message: 'QuestTypes fetched successfully',
        quest_types: list,
        session: req.session
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const getDetails = (req, res) => {
  QuestType.get({ id: req.params.type_id })
    .then(quest_type => {
      res.status(200).json({
        err: false,
        code: 200,
        message: 'QuestType fetched successfully',
        quest_type: quest_type,
        session: req.session
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const createQuestType = (req, res) => {
  const quest_type = new QuestType(req.body.quest_type)
  quest_type.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'QuestType created successfully',
          quest_type: quest_type,
          session: req.session
        })
      } else {
        res.status(409).json({
          err: true,
          code: 409,
          message: 'Failed to create quest_type'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const updateQuestType = (req, res) => {
  QuestType.get({ id: req.params.type_id })
    .then(quest_type => {
      quest_type.updateData(req.body.quest_type)
      quest_type.save()
        .then(result => {
          if (result) {
            res.status(200).json({
              err: false,
              code: 200,
              message: 'QuestType updated successfully',
              quest_type: quest_type,
              session: req.session
            })
          } else {
            res.status(409).json({
              err: true,
              code: 409,
              message: 'Failed to update quest_type'
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
  getDetails,
  createQuestType,
  updateQuestType
}
