const { CarModel, Brand } = require('../../models')


const getCartModel = async (req, res, next) => {
    try {
        const newCar = await CarModel.findAll({ include: Brand })

        res.status(200).json({
            error: false,
            message: 'get data Car successfully',
            datas: newCar
        })
    } catch (error) {
        next(error)
    }
}

const getCartById = async (req, res, next) => {
    try {
        const id = req.params.id

        const newCar = await CarModel.findOne({ where: { id }, include: Brand })

        if (!newCar) return res.status(404).json({ error: true, message: `data Car id: ${id} not found` })

        res.status(200).json({
            error: false,
            message: `data Cart id: ${id} successfully`,
            datas: newCar
        })

    } catch (error) {
        next(error)
    }
}

const createCartModel = async (req, res, next) => {
    try {
        const { name, year, brand_id } = req.body

        const newCar = await CarModel.create({ name, year, brand_id })

        res.status(201).json({ error: false, message: 'create data Car successfully', datas: newCar })
    } catch (error) {
        next(error)
    }
}

const updateCarModel = async (req, res, next) => {
    try {
        const id = req.params.id
        const { name, year, brand_id } = req.body

        const newCar = await CarModel.findByPk(id)
        if (!newCar) return res.status(404).json({ error: true, message: `update by id: ${id} not found` })

        newCar.name = name
        newCar.year = year
        newCar.brand_id = brand_id


        res.status(201).json({
            error: false,
            message: 'update data car successfully',
            datas: {
                name: newCar.name,
                year: newCar.year,
                brand_id: newCar.brand_id,
                createdAt: newCar.createdAt,
                updatedAt: newCar.updatedAt
            }
        })
    } catch (error) {
        next(error)
    }
}

const deleteCarModel = async (req, res, next) => {
    try {
        const id = req.params.id
        const newCar = await CarModel.findByPk(id)
        if (!newCar) return res.status(404).json({ error: true, message: 'Car tidak di temukan' })

        await newCar.destroy()
        res.status(200).json({
            error: false,
            message: `delete car id: ${id} successfully`,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCartModel,
    getCartById,
    createCartModel,
    updateCarModel,
    deleteCarModel
}