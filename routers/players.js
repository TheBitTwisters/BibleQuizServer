const express     = require('express')
const router      = express.Router()
const jwt         = require('../middlewares/jwt')
const playersCtrl = require('../controllers/players')

// /players/all
router.get('/all', jwt.verifyManager, playersCtrl.getAll)

// /players/save
router.post('/save', jwt.verifyManager, playersCtrl.savePlayer)
router.put('/:player_id', jwt.verifyManager, playersCtrl.savePlayer)

// /players/attendance
router.get('/attendance', jwt.verifyManager, playersCtrl.getAttendance)

module.exports = router
