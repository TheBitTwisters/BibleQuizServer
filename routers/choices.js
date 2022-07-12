const express    = require('express')
const router     = express.Router()
const jwt        = require('../middlewares/jwt')
const choicesCtrl = require('../controllers/choices')

// GET

router.get('/:choice_id', jwt.check, choicesCtrl.getDetails)

// POST

router.post('/:choice_id', jwt.check, jwt.verify, jwt.verifyManager, choicesCtrl.getDetails)
router.post('/',           jwt.check, jwt.verify, jwt.verifyManager, choicesCtrl.createChoice)

// PUT

router.put('/:choice_id', jwt.check, jwt.verify, jwt.verifyManager, choicesCtrl.updateChoice)

module.exports = router
