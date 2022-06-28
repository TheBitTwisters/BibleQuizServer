const express  = require('express')
const router   = express.Router()
const authCtrl = require('../controllers/auth')

// /auth/login
router.post('/master/login', authCtrl.signinManager)

module.exports = router
