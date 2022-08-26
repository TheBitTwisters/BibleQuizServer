const express    = require('express')
const router     = express.Router()
const jwt        = require('../middlewares/jwt')
const scoresCtrl = require('../controllers/scores')

// GET

router.get('/', scoresCtrl.getAll)

// POST

router.post('/:game_id/:group_id', jwt.check, jwt.verify, jwt.verifyManager, scoresCtrl.setGroupGameScore)

module.exports = router
