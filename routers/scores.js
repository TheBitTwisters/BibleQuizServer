const express    = require('express')
const router     = express.Router()
const jwt        = require('../middlewares/jwt')
const scoresCtrl = require('../controllers/scores')

// GET

router.get('/', scoresCtrl.getAll)

module.exports = router
