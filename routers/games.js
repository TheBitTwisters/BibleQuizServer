const express       = require('express')
const router        = express.Router()
const jwt           = require('../middlewares/jwt')
const gamesCtrl     = require('../controllers/games')

// GET

router.get('/',                   gamesCtrl.getAll)
router.get('/:game_id',           gamesCtrl.getDetails)
router.get('/:game_id/questions', gamesCtrl.getQuestions)
router.post('/:game_id/question', gamesCtrl.setCurrentQuestion)

// POST

router.post('/',                  jwt.verify, jwt.verifyManager, gamesCtrl.createGame)
router.post('/:game_id/question', jwt.verify, jwt.verifyManager, gamesCtrl.setCurrentQuestion)

// PUT

router.put('/:game_id', jwt.verify, jwt.verifyManager, gamesCtrl.updateGame)

module.exports = router
