const express       = require('express')
const router        = express.Router()
const jwt           = require('../middlewares/jwt')
const gamesCtrl     = require('../controllers/games')

// GET

router.get('/',                   jwt.check, gamesCtrl.getAll)
router.get('/:game_id',           jwt.check, gamesCtrl.getDetails)
router.get('/:game_id/questions', jwt.check, gamesCtrl.getQuestions)
router.get('/:game_id/question',  jwt.check, gamesCtrl.getCurrentQuestion)
router.get('/:game_id/players',   jwt.check, gamesCtrl.getPlayers)
router.get('/:game_id/scores',    jwt.check, gamesCtrl.getScores)

// POST

router.post('/',                        jwt.check, jwt.verify, jwt.verifyManager, gamesCtrl.createGame)
router.post('/:game_id/question',       jwt.check, jwt.verify, jwt.verifyManager, gamesCtrl.setCurrentQuestion)
router.post('/:game_id/player',         jwt.check, jwt.verify, jwt.verifyManager, gamesCtrl.addPlayer)
router.post('/:game_id/players/modify', jwt.check, jwt.verify, jwt.verifyManager, gamesCtrl.modifyPlayersPass)

// PUT

router.put('/:game_id', jwt.check, jwt.verify, jwt.verifyManager, gamesCtrl.updateGame)

module.exports = router
