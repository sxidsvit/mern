const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.methods === 'OPTIONS') {
    return next()
  }

  try {
    //  we extract information about the token from the request header to the server
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      // protection of links for unauthorized users
      return res.staus(401).json({ message: ' No authorization' })
    }
    // checking the token
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()

  } catch (e) {
    res.status(401).json({ message: ' No authorization' })
  }
}