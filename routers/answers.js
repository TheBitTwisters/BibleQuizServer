const express     = require('express')
const router      = express.Router()
const jwt         = require('../middlewares/jwt')
const answersCtrl = require('../controllers/answers')

// POST

router.post('/:answer_id/score', jwt.check, jwt.verify, jwt.verifyManager, answersCtrl.saveScore)

module.exports = router
