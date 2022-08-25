const jwt        = require('jsonwebtoken')
const Manager    = require('../models/Manager')
const Attendance = require('../models/Attendance')

const sign = function (id, type) {
  var token = process.env.JWT_PREFIX + jwt.sign(
    {
      id: id,
      type: type
    },
    process.env.JWT_SECRET,
    { expiresIn: parseInt(process.env.JWT_TIMESPAN) }
  )
  return {
    token: token,
    expiresIn: parseInt(process.env.JWT_TIMESPAN)
  }
}

const check = async function (req, res, next) {
  try {
    var token = req.headers.authorization.replace(process.env.JWT_PREFIX, '')
    var decoded = jwt.verify(token, process.env.JWT_SECRET)
    switch (decoded.type) {
      case 'manager':
        var manager = await Manager.get({ id: decoded.id })
        if (manager) {
          req.manager = manager
          req.session = sign(manager.id, 'manager')
        }
      case 'player':
        var player = await Attendance.get({ id: decoded.id })
        if (player) {
          req.player = player
          req.session = sign(player.id, 'player')
        }
    }
  } catch (err) {
    console.log('JWT verification error')
  }
  next()
}

const verify = function (req, res, next) {
  if (req.player || req.manager) {
    next()
  } else {
    res.status(403).json({
      err: true,
      code: 403,
      message: 'Invalid token or expired'
    })
  }
}

const verifyManager = function (req, res, next) {
  if (req.manager) {
    next()
  } else {
    res.status(401).json({
      err: true,
      code: 401,
      message: 'Unauthorized access'
    })
  }
}

const isManager = function (req) {
  return req.manager
}
const isPlayer = function (req) {
  return req.player
}

module.exports = {
  sign,
  check,
  verify,
  verifyManager,
  isManager,
  isPlayer
}
