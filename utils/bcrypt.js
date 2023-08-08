const bcrpty = require('bcrypt')

module.exports = {
    hashPassword: (password) => {
        return bcrpty.hash(password, 10)
    },
    validationpassword: (password, dbPassword) => {
        return bcrpty.compare(password, dbPassword)
    }
}