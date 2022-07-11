const express    = require('express')
const router     = express.Router()
const jwt        = require('../middlewares/jwt')
const qtypesCtrl = require('../controllers/quest_types')

// GET

router.get('/',         qtypesCtrl.getAll)
router.get('/:type_id', qtypesCtrl.getDetails)

// POST

router.post('/', jwt.verify, jwt.verifyManager, qtypesCtrl.createQuestType)

// PUT

router.put('/:type_id', jwt.verify, jwt.verifyManager, qtypesCtrl.updateQuestType)

module.exports = router
