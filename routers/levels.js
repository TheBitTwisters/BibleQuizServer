const express    = require('express')
const router     = express.Router()
const jwt        = require('../middlewares/jwt')
const levelsCtrl = require('../controllers/levels')

// GET

router.get('/',          levelsCtrl.getAll)
router.get('/:level_id', levelsCtrl.getDetails)

// POST

router.post('/', jwt.verify, jwt.verifyManager, levelsCtrl.createLevel)

// PUT

router.put('/:level_id', jwt.verify, jwt.verifyManager, levelsCtrl.updateLevel)

module.exports = router
