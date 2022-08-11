const express     = require('express')
const router      = express.Router()
const jwt         = require('../middlewares/jwt')
const playersCtrl = require('../controllers/players')

// /players
router.get('/', jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.getAll)

// /players/groups
router.post('/groups',   jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.createGroup)
router.put('/:group_id', jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.updateGroup)

// /players/members
router.post('/members',   jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.createMember)
router.put('/:member_id', jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.updateMember)

module.exports = router
