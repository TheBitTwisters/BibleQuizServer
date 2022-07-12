const express    = require('express')
const router     = express.Router()
const jwt        = require('../middlewares/jwt')
const qtypesCtrl = require('../controllers/quest_types')

// GET

router.get('/',         jwt.check, qtypesCtrl.getAll)
router.get('/:type_id', jwt.check, qtypesCtrl.getDetails)

// POST

router.post('/', jwt.check, jwt.verify, jwt.verifyManager, qtypesCtrl.createQuestType)

// PUT

router.put('/:type_id', jwt.check, jwt.verify, jwt.verifyManager, qtypesCtrl.updateQuestType)

module.exports = router
