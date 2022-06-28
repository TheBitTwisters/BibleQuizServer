const jwt     = require('jsonwebtoken')
const Manager = require('../models/Manager')

const signManager = function (manager_id) {
  var token = process.env.JWT_PREFIX + jwt.sign(
    { id: manager_id },
    process.env.JWT_SECRET,
    { expiresIn: parseInt(process.env.JWT_TIMESPAN) }
  )
  return {
    token: token,
    expiresIn: parseInt(process.env.JWT_TIMESPAN)
  }
}

exports.signManager = signManager
exports.verifyManager = (req, res, next) => {
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
      Manager.get({ id: decode.id })
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
