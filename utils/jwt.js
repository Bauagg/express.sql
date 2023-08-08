const jwt = require('jsonwebtoken')
const configDoten = require('../APP/config-doten')

module.exports = {
    createToken: (payload) => {
        return jwt.sign(payload, configDoten.secretKey)
    },
    validateToken: (token) => {
        return jwt.verify(token, configDoten.secretKey)
    }
}

