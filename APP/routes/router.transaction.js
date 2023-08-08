const router = require('express').Router()

const controlerTransaction = require('../controler/controler-transaksion')

// midelware
const authorizationMidelware = require('../../midelware/authorization-midelware')
const adminAuthorization = require('../../midelware/admin-authorization')

router.get('/transaction', authorizationMidelware, controlerTransaction.getTransaction)
router.get('/transaction/:id', authorizationMidelware, controlerTransaction.getTransactionById)
router.post('/transaction', authorizationMidelware, adminAuthorization, controlerTransaction.createTransaction)
router.put('/transaction/:id', authorizationMidelware, adminAuthorization, controlerTransaction.updateTransaction)
router.delete('/transaction/:id', authorizationMidelware, adminAuthorization, controlerTransaction.deleteTransaction)

module.exports = router