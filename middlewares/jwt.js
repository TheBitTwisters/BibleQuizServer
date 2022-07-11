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

const verify = function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.startsWith(process.env.JWT_PREFIX)) {
    var token = req.headers.authorization.replace(process.env.JWT_PREFIX, '')
    jwt.verify(token, process.env.JWT_SECRET, function (err, decode) {
      if (err) {
        res.status(403).json({
          err: true,
          code: 403,
          message: 'Invalid token'
        })
      }
      else {
        User.get({ id: decode.user_id })
          .then(async (user) => {
            if (user) {
              // set req vars
              req.user = user
              req.session = sign(user.id)
              next()
            } else {
              res.status(403).json({
                err: true,
                code: 403,
                message: 'Invalid token'
              })
            }
          })
          .catch(err => {
            res.status(500).json(err)
          })
      }
    })
  } else {
    res.status(401).json({
      err: true,
      code: 401,
      message: 'Unauthorized access, no token found'
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
  verify,
  verifyManager,
  isManager
}
