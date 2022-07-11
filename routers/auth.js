const express  = require('express')
const router   = express.Router()
const authCtrl = require('../controllers/auth')

// /auth/manager
router.post('/manager', authCtrl.signinManager)

// /auth/player
router.post('/player', authCtrl.signinPlayer)

module.exports = router
