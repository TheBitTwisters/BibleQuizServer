const express         = require('express')
const router          = express.Router()
const jwt             = require('../middlewares/jwt')
const quest_typesCtrl = require('../controllers/quest_types')

// /quest_types/all
router.get('/all', jwt.verifyManager, quest_typesCtrl.getAll)

// /quest_types/save
router.post('/save', jwt.verifyManager, quest_typesCtrl.saveQuestType)
router.put('/:quest_type_id', jwt.verifyManager, quest_typesCtrl.saveQuestType)

module.exports = router
