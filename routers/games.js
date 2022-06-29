const express       = require('express')
const router        = express.Router()
const jwt           = require('../middlewares/jwt')
const gamesCtrl     = require('../controllers/games')
const questionsCtrl = require('../controllers/questions')

// /games/all
router.get('/all', jwt.verifyManager, gamesCtrl.getAll)

// /games/save
router.post('/save', jwt.verifyManager, gamesCtrl.saveGame)
router.put('/:game_id', jwt.verifyManager, gamesCtrl.saveGame)

// /games/:game_id/questions
router.get('/:game_id/questions', jwt.verifyManager, questionsCtrl.getGameQuestions)

module.exports = router
