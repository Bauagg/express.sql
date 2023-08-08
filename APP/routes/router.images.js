const router = require('express').Router()

const controlerImages = require('../controler/controler-image')

// midelware
const authorizationMidelware = require('../../midelware/authorization-midelware')
const adminAuthorization = require('../../midelware/admin-authorization')

router.get('/image', authorizationMidelware, controlerImages.getImages)
router.get('/image/:id', authorizationMidelware, controlerImages.getImagesById)
router.post('/image', authorizationMidelware, adminAuthorization, controlerImages.createImages)
router.put('/image/:id', authorizationMidelware, adminAuthorization, controlerImages.updateImages)
router.delete('/image/:id', authorizationMidelware, adminAuthorization, controlerImages.deleteImages)

module.exports = router