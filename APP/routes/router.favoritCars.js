const router = require('express').Router()

const controlerFavoritCars = require('../controler/contoler-faivoritCars')

// midelware
const authorizationMidelware = require('../../midelware/authorization-midelware')


router.get('/favorit', authorizationMidelware, controlerFavoritCars.getFavoritCars)
router.get('/favorit/:id', authorizationMidelware, controlerFavoritCars.getFavoritCarsById)
router.post('/favorit', authorizationMidelware,  controlerFavoritCars.createFavoritCars)
router.put('/favorit/:id', authorizationMidelware,  controlerFavoritCars.updateFavoritCars)
router.delete('/favorit/:id', authorizationMidelware,  controlerFavoritCars.deleteFavoritCars)

module.exports = router