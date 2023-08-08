const { Transaction, User } = require('../../models')

const getTransaction = async (req, res, next) => {
    try {
        const newTransaction = await Transaction.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'email', 'role']
                }
            ]
        })

        res.status(200).json({
            error: false,
            message: 'get data successfully',
            datas: newTransaction
        })
    } catch (error) {
        next(error)
    }
}

const getTransactionById = async (req, res, next) => {
    try {
        const id = req.params.id

        const newTransaction = await Transaction.findOne({
            where: { id },
            include: {
                model: User,
                attributes: ['id', 'username', 'email', 'role']
            }
        })
        if (!newTransaction) return res.status(404).json({ error: true, message: `data id: ${id} tidak di temukan` })

        res.status(200).json({
            error: false,
            message: 'get data by id successfully',
            datas: newTransaction
        })
    } catch (error) {
        next(error)
    }
}

const createTransaction = async (req, res, next) => {
    try {
        const { buyer_id, listing_id, amount } = req.body

        const newTransaction = await Transaction.create({
            buyer_id,
            listing_id,
            amount,
            transaction_date: new Date()
        })

        res.status(201).json({ error: false, message: 'create data Transaction successfully', datas: newTransaction })
    } catch (error) {
        next(error)
    }
}

const updateTransaction = async (req, res, next) => {
    try {
        const id = req.params.id
        const { buyer_id, listing_id, amount } = req.body

        const newTransaction = await Transaction.findByPk(id)
        if (!newTransaction) return res.status(404).json({ error: true, message: `data id: ${id} tidak di temukan` })

        newTransaction.buyer_id = buyer_id
        newTransaction.listing_id = listing_id
        newTransaction.amount = amount
        newTransaction.transaction_date = new Date()

        res.status(201).json({
            error: false,
            message: 'data berhasil di update',
            datas: newTransaction
        })
    } catch (error) {
        next(error)
    }
}

const deleteTransaction = async (req, res, next) => {
    try {
        const id = req.params.id
        const newTransaction = await Transaction.findOne({ where: { id } })

        if (!newTransaction) return res.status(404).json({ error: false, message: `data id: ${id} tidak di temukan` })

        await newTransaction.destroy()
        res.status(200).json({ error: false, message: 'delete data transaction successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getTransaction,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
}