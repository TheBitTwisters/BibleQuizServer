const express    = require('express')
const router     = express.Router()
const jwt        = require('../middlewares/jwt')
const levelsCtrl = require('../controllers/levels')

// /levels/all
router.get('/all', jwt.verifyManager, levelsCtrl.getAll)

// /levels/save
router.post('/save', jwt.verifyManager, levelsCtrl.saveLevel)
router.put('/:level_id', jwt.verifyManager, levelsCtrl.saveLevel)

module.exports = router
