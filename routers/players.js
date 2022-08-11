const express     = require('express')
const router      = express.Router()
const jwt         = require('../middlewares/jwt')
const playersCtrl = require('../controllers/players')

// /players
router.get('/', jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.getAll)

// /players/groups
router.get('/groups',           jwt.check,                                playersCtrl.getGroups)
router.post('/groups',          jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.createGroup)
router.put('/groups/:group_id', jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.updateGroup)

// /players/members
router.get('/members',                   jwt.check,                                playersCtrl.getMembers)
router.post('/members',                  jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.createMember)
router.put('/members/:member_id',        jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.updateMember)
router.post('/members/:member_id/group', jwt.check, jwt.verify, jwt.verifyManager, playersCtrl.setMemberGroup)

module.exports = router
