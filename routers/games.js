const express   = require('express')
const router    = express.Router()
const jwt       = require('../middlewares/jwt')
const gamesCtrl = require('../controllers/games')

// GET

router.get('/',                                      gamesCtrl.getAll)
router.get('/:game_id',                              gamesCtrl.getGameDetails)
router.get('/:game_id/questions', jwt.verifyManager, gamesCtrl.setGameQuestion)

// POST

router.post('/', jwt.verifyManager, gamesCtrl.saveGame)

// PUT

router.put('/:game_id', jwt.verifyManager, gamesCtrl.saveGame)


// /games/play
router.get('/play', jwt.verifyPlayer, gamesCtrl.getPlayGames)
router.get('/play/:game_id', jwt.verifyPlayer, gamesCtrl.getPlayGame)

module.exports = router
