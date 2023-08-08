const router = require('express').Router()

const controlerBrands = require('../controler/controler-brand')

// midelware
const authorizationMidelware = require('../../midelware/authorization-midelware')
const adminAuthorization = require('../../midelware/admin-authorization')

router.get('/brand', controlerBrands.getBands)
router.get('/brand/:id', controlerBrands.getBandsById)
router.post('/brand', authorizationMidelware, adminAuthorization, controlerBrands.createBrand)
router.put('/brand/:id', authorizationMidelware, adminAuthorization, controlerBrands.updateBrand)
router.delete('/brand/:id', authorizationMidelware, adminAuthorization, controlerBrands.deleteBrand)

module.exports = router