const express   = require('express')
const router    = express.Router()
const jwt       = require('../middlewares/jwt')
const gamesCtrl = require('../controllers/games')

// /games/all
router.get('/all', jwt.verifyManager, gamesCtrl.getAll)

// /games/save
router.post('/save', jwt.verifyManager, gamesCtrl.saveGame)
router.put('/:game_id', jwt.verifyManager, gamesCtrl.saveGame)

// /games/:game_id/question
router.post('/question', jwt.verifyManager, gamesCtrl.setGameQuestion)


// /games/play
router.get('/play', jwt.verifyPlayer, gamesCtrl.getPlayGames)
router.get('/play/:game_id', jwt.verifyPlayer, gamesCtrl.getPlayGame)

module.exports = router
