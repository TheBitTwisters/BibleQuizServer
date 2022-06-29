const express  = require('express')
const router   = express.Router()
const authCtrl = require('../controllers/auth')

// /auth/login
router.post('/manager/login', authCtrl.signinManager)

module.exports = router
