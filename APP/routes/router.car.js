const router = require('express').Router()

const controlerCartModel = require('../controler/controler-CartModel')

// midelware
const authorizationMidelware = require('../../midelware/authorization-midelware')
const adminAuthorization = require('../../midelware/admin-authorization')

router.get('/car', authorizationMidelware, controlerCartModel.getCartModel)
router.get('/car/:id', authorizationMidelware, controlerCartModel.getCartById)
router.post('/car', authorizationMidelware, adminAuthorization, controlerCartModel.createCartModel)
router.put('/car/:id', authorizationMidelware, adminAuthorization, controlerCartModel.updateCarModel)
router.delete('/car/:id', authorizationMidelware, adminAuthorization, controlerCartModel.deleteCarModel)

module.exports = router