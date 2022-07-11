const express     = require('express')
const router      = express.Router()
const jwt         = require('../middlewares/jwt')
const playersCtrl = require('../controllers/players')

// /players/all
router.get('/all', jwt.verify, playersCtrl.getAll)

// /players/save
router.post('/save', jwt.verify, playersCtrl.savePlayer)
router.put('/:player_id', jwt.verify, playersCtrl.savePlayer)

// /players/attendance
router.get('/attendance', jwt.verify, playersCtrl.getAttendance)

module.exports = router
