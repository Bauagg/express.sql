const { User } = require('../../models')

const bcrypt = require('../../utils/bcrypt')
const jwt = require('../../utils/jwt')

const register = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body

        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: true, message: 'Email tidak valid' })
        }

        const isValidatorEmail = await User.findOne({ where: { email } })
        if (isValidatorEmail) {
            return res.status(400).json({ error: true, message: 'Email sudah terdaftar' })
        }

        const newUser = await User.create({ username, email, password: await bcrypt.hashPassword(password), role })

        res.status(201).json({
            error: false,
            message: 'register successfuly',
            datas: newUser
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const newuser = await User.findOne({ where: { email } })
        if (!newuser) {
            return res.status(400).json({ error: true, message: 'invalid Email atau Password' })
        }

        const validationpassword = await bcrypt.validationpassword(password, newuser.password)
        if (!validationpassword) {
            return res.status(400).json({ error: true, message: 'invalid Email atau Password' })
        }

        const tokenPayload = {
            id: newuser.id,
            user: newuser.username,
            email: newuser, email,
            role: newuser.role
        }

        const jwtToken = jwt.createToken(tokenPayload)

        res.status(201).json({
            error: false,
            message: 'Login Successfully',
            datas: {
                username: newuser.username,
                email: newuser.email,
                role: newuser.role,
                token: jwtToken
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}