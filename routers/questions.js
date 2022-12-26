const express       = require('express')
const router        = express.Router()
const jwt           = require('../middlewares/jwt')
const questionsCtrl = require('../controllers/questions')

// GET

router.get('/:question_id',         jwt.check,                                questionsCtrl.getDetails)
router.get('/:question_id/answer',  jwt.check, jwt.verify, jwt.verifyManager, questionsCtrl.getAnswer)
router.get('/:question_id/answers', jwt.check, jwt.verify, jwt.verifyManager, questionsCtrl.getSubmittedAnswers)

// POST

router.post('/',                      jwt.check, jwt.verify, jwt.verifyManager, questionsCtrl.createQuestion)
router.post('/:question_id/answer',   jwt.check,                                questionsCtrl.submitAnswer)
router.post('/:question_id/passplay', jwt.check,                                questionsCtrl.passplay)
router.post('/:question_id/lock',     jwt.check, jwt.verify, jwt.verifyManager, questionsCtrl.lockQuestion)

// PUT

router.put('/:question_id', jwt.check, jwt.verify, jwt.verifyManager, questionsCtrl.updateQuestion)

module.exports = router
