const express     = require('express')
const router      = express.Router()
const jwt         = require('../middlewares/jwt')
const playersCtrl = require('../controllers/players')

// /players/all
router.get('/', jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.getAll)

// /players/save
router.post('/',          jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.createPlayer)
router.put('/:player_id', jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.updatePlayer)

module.exports = router
