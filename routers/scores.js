const express    = require('express')
const router     = express.Router()
const jwt        = require('../middlewares/jwt')
const scoresCtrl = require('../controllers/scores')

// /scores/all
router.get('/all', jwt.verifyManager, scoresCtrl.getAllGamesScores)

// /scores/game
router.get('/game', jwt.verifyManager, scoresCtrl.getGameScores)

module.exports = router
