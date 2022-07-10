const express     = require('express')
const router      = express.Router()
const jwt         = require('../middlewares/jwt')
const answersCtrl = require('../controllers/answers')

// /answers/question
router.post('/check', jwt.verifyManager, answersCtrl.checkAnswers)

router.post('/submit', jwt.verifyPlayer, answersCtrl.submitAnswer)

module.exports = router
