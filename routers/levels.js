const express    = require('express')
const router     = express.Router()
const jwt        = require('../middlewares/jwt')
const levelsCtrl = require('../controllers/levels')

// GET

router.get('/',          jwt.check, levelsCtrl.getAll)
router.get('/:level_id', jwt.check, levelsCtrl.getDetails)

// POST

router.post('/', jwt.check, jwt.verify, jwt.verifyManager, levelsCtrl.createLevel)

// PUT

router.put('/:level_id', jwt.check, jwt.verify, jwt.verifyManager, levelsCtrl.updateLevel)

module.exports = router
