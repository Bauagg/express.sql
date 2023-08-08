const jwt = require('../utils/jwt')

module.exports = (req, res, next) => {
    try {
        if (req.user.role === 'admin' || req.user.role === 'seller') {
            next()
        } else {
            return res.status(400).json({ message: 'unauthorized access' })
        }
    } catch (error) {
        next(error)
    }
}