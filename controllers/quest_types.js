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

const saveQuestType = (req, res) => {
  const quest_type = new QuestType(req.body.quest_type)
  if (req.params.hasOwnProperty('quest_type_id')) {
    quest_type.id = req.params.quest_type_id
  }
  quest_type.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'QuestType details saved successfully',
          session: req.session
        })
      } else {
        res.status(409).json({
          err: true,
          code: 409,
          message: 'Failed to save quest_type details'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  getAll,
  saveQuestType
}
