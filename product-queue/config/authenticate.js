const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWT_SECRET || 'Secrets'

const authenticate = (req, res, next) => {
  const token = req.get('Authorization')

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err)
      req.decoded = decoded
      decoded.role === 'admin' ? (req.admin = true) : (req.admin = false)
      req.user_id = decoded.subject
      next()
    })
  } else {
    return res.status(401).json({ message: 'Please log in' })
  }
}

module.exports = authenticate
