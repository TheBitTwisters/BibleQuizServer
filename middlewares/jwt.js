const jwt  = require('jsonwebtoken')
const User = require('../models/User')

const sign = function (user_id) {
  var token = process.env.JWT_PREFIX + jwt.sign(
    { user_id: user_id },
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
    await User.get({ id: decoded.user_id })
      .then(user => {
        if (user) {
          req.user = user
          req.session = sign(user.id)
        }
      })
  } catch (err) {
    console.log('JWT verification error')
  }
  next()
}

const verify = function (req, res, next) {
  if (req.user) {
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
  if (req.user.type == 'manager') {
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
  return req.user && req.user.type == 'manager'
}

module.exports = {
  sign,
  check,
  verify,
  verifyManager,
  isManager
}
