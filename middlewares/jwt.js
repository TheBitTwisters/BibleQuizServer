const jwt     = require('jsonwebtoken')
const Manager = require('../models/Manager')
const Player  = require('../models/Player')

const signManager = function (manager_id) {
  var token = process.env.JWT_PREFIX + jwt.sign(
    { manager_id: manager_id },
    process.env.JWT_SECRET,
    { expiresIn: parseInt(process.env.JWT_TIMESPAN) }
  )
  return {
    token: token,
    expiresIn: parseInt(process.env.JWT_TIMESPAN)
  }
}

const signPlayer = function (player_id) {
  var token = process.env.JWT_PREFIX + jwt.sign(
    { player_id: player_id },
    process.env.JWT_SECRET,
    { expiresIn: parseInt(process.env.JWT_TIMESPAN) }
  )
  return {
    token: token,
    expiresIn: parseInt(process.env.JWT_TIMESPAN)
  }
}

const verifyManager = function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.startsWith(process.env.JWT_PREFIX)) {
    var token = req.headers.authorization.replace(process.env.JWT_PREFIX, '')
    jwt.verify(token, process.env.JWT_SECRET, function (err, decode) {
      if (err) {
        return res.status(403).json({
          err: true,
          code: 403,
          message: 'Invalid token'
        })
      }
      Manager.get({ id: decode.manager_id })
        .then(async (manager) => {
          if (manager) {
            // set req vars
            req.manager = manager
            req.session = signManager(manager.id)
            return next()
          } else {
            return res.status(403).json({
              err: true,
              code: 403,
              message: 'Invalid token'
            })
          }
        })
        .catch(err => {
          res.status(500).json(err)
        })
    })
  } else {
    return res.status(403).json({
      err: true,
      code: 403,
      message: 'No token found'
    })
  }
}

const verifyPlayer = function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.startsWith(process.env.JWT_PREFIX)) {
    var token = req.headers.authorization.replace(process.env.JWT_PREFIX, '')
    jwt.verify(token, process.env.JWT_SECRET, function (err, decode) {
      if (err) {
        return res.status(403).json({
          err: true,
          code: 403,
          message: 'Invalid token'
        })
      }
      Player.get({ id: decode.player_id })
        .then(async (player) => {
          if (player) {
            // set req vars
            req.player = player
            req.session = signPlayer(player.id)
            return next()
          } else {
            return res.status(403).json({
              err: true,
              code: 403,
              message: 'Invalid token'
            })
          }
        })
        .catch(err => {
          res.status(500).json(err)
        })
    })
  } else {
    return res.status(403).json({
      err: true,
      code: 403,
      message: 'No token found'
    })
  }
}

module.exports = {
  signManager,
  signPlayer,
  verifyManager,
  verifyPlayer
}
