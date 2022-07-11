const express       = require('express')
const router        = express.Router()
const jwt           = require('../middlewares/jwt')
const questionsCtrl = require('../controllers/questions')

// GET

router.get('/:question_id', questionsCtrl.getDetails)

// POST

router.post('/:question_id', jwt.verify, jwt.verifyManager, questionsCtrl.getDetails)
router.post('/',             jwt.verify, jwt.verifyManager, questionsCtrl.createQuestion)

// PUT

router.put('/:question_id', jwt.verify, jwt.verifyManager, questionsCtrl.updateQuestion)

module.exports = router
