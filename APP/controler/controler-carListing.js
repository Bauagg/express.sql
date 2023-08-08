const { CarListing, User, CarModel } = require('../../models')

const getCarListing = async (req, res, next) => {
    try {
        const newCarListing = await CarListing.findAll({
            include: [
                {
                    model: CarModel,
                    attributes: ['id', 'name', 'year']
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'email', 'role']
                }
            ]

        })

        res.status(200).json({
            error: false,
            message: 'get data CarListen successfully',
            datas: newCarListing
        })
    } catch (error) {
        next(error)
    }
}

const getCarListingById = async (req, res, next) => {
    try {
        const id = req.params.id
        const newCarListing = await CarListing.findOne({
            where: { id },
            include: [
                {
                    model: CarModel,
                    attributes: ['id', 'name', 'year']
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'email', 'role']
                }
            ]
        })

        if (!newCarListing) return res.status(404).json({ error: true, message: 'data Car id: ${id} not found' })

        res.status(200).json({
            error: false,
            message: `data by id: ${id} successfully`,
            datas: newCarListing
        })

    } catch (error) {
        next(error)
    }
}

const createCarListing = async (req, res, next) => {
    try {
        const { seller_id, model_id, price, condition } = req.body
        console.log(seller_id, model_id, price, condition)

        const newCarListing = await CarListing.create({ seller_id, model_id, price, condition })

        res.status(201).json({ error: false, message: 'create Car successfully', datas: newCarListing })
    } catch (error) {
        next(error)
    }
}

const updateCarListing = async (req, res, next) => {
    try {
        const id = req.params.id
        const { seller_id, model_id, price, condition } = req.body

        const newCarListing = await CarListing.findByPk(id)

        newCarListing.seller_id = seller_id
        newCarListing.model_id = model_id
        newCarListing.price = price
        newCarListing.condition = condition

        res.status(201).json({
            error: false,
            message: 'update data Car sucsessfully',
            datas: newCarListing
        })

    } catch (error) {
        next(error)
    }
}

const deleteCarListing = async (req, res, next) => {
    try {
        const id = req.params.id
        const newCarListing = await CarListing.findByPk(id)
        if (!newCarListing) return res.status(200).json({ error: true, message: 'Car tidak di temukan' })

        await newCarListing.destroy()
        res.status(200).json({
            error: false,
            message: `delete car id: ${id} successfully`
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCarListing,
    getCarListingById,
    createCarListing,
    updateCarListing,
    deleteCarListing
}