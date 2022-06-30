const express       = require('express')
const router        = express.Router()
const jwt           = require('../middlewares/jwt')
const questionsCtrl = require('../controllers/questions')

// /questions/all
router.get('/all', jwt.verifyManager, questionsCtrl.getGameQuestions)

// /questions/save
router.post('/save', jwt.verifyManager, questionsCtrl.saveQuestion)
router.put('/:question_id', jwt.verifyManager, questionsCtrl.saveQuestion)

module.exports = router
