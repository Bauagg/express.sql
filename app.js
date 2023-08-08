const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

// import config-doten
const configDoten = require('./APP/config-doten')

// import Router
const routerUser = require('./APP/routes/router.user')
const routerBrand = require('./APP/routes/router.brands')
const routerCar = require('./APP/routes/router.car')
const routerCarListing = require('./APP/routes/router.carListing')
const routerTransaction = require('./APP/routes/router.transaction')
const routerFavoritCars = require('./APP/routes/router.favoritCars')
const routerImages = require('./APP/routes/router.images')

const port = parseInt(configDoten.port) || 4000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(cookieParser())

app.use('/', routerUser)
app.use('/', routerBrand)
app.use('/', routerCar)
app.use('/', routerCarListing)
app.use('/', routerTransaction)
app.use('/', routerFavoritCars)
app.use('/', routerImages)

app.listen(port, () => {
    console.log(`databases running 4000`)
})