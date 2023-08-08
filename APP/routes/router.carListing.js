const router = require('express').Router()

const controlerCarListing = require('../controler/controler-carListing')

// midelware
const authorizationMidelware = require('../../midelware/authorization-midelware')
const adminAuthorization = require('../../midelware/admin-authorization')

router.get('/carListing', authorizationMidelware, controlerCarListing.getCarListing)
router.get('/carListing/:id', authorizationMidelware, controlerCarListing.getCarListingById)
router.post('/carListing', authorizationMidelware, adminAuthorization, controlerCarListing.createCarListing)
router.put('/carListing/:id', authorizationMidelware, adminAuthorization, controlerCarListing.updateCarListing)
router.delete('/carListing/:id', authorizationMidelware, adminAuthorization, controlerCarListing.deleteCarListing)

module.exports = router