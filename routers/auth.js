const express  = require('express')
const router   = express.Router()
const authCtrl = require('../controllers/auth')

// /auth/manager/login
router.post('/manager/login', authCtrl.signinManager)

// /auth/player/login
router.post('/player/login', authCtrl.signinPlayer)

module.exports = router
