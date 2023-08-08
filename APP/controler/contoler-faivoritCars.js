const { FavoriteCars, User, CarListing } = require('../../models')

const getFavoritCars = async (req, res, next) => {
    try {
        const newFavoritCars = await FavoriteCars.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'email', 'role']
                },
                {
                    model: CarListing
                }
            ]
        })

        res.status(200).json({
            error: false,
            message: 'get data successfully',
            datas: newFavoritCars
        })
    } catch (error) {
        next(error)
    }
}

const getFavoritCarsById = async (req, res, next) => {
    try {
        const id = req.params.id

        const newFavoritCars = await FavoriteCars.findOne({ where: { id } })
        if (!newFavoritCars) return res.status(404).json({ error: true, message: `data id ${id} tidak di ketahui` })

        res.status(200).json({
            error: false,
            message: `melihat data by id: ${id} successfully`,
            datas: newFavoritCars
        })
    } catch (error) {
        next(error)
    }
}

const createFavoritCars = async (req, res, next) => {
    try {
        const { user_id, listing_id } = req.body

        const newFavoritCars = await FavoriteCars.create({ user_id, listing_id })

        res.status(201).json({
            error: false,
            message: 'create data FaforitCars successfully',
            datas: newFavoritCars
        })
    } catch (error) {
        next(error)
    }
}

const updateFavoritCars = async (req, res, next) => {
    try {
        const id = req.params.id
        const { user_id, listing_id } = req.body

        const newFavoritCars = await FavoriteCars.findByPk(id)
        if (!newFavoritCars) return res.status(404).json({ error: true, message: `melihat data by id: ${id} successfully` })

        newFavoritCars.user_id = user_id
        newFavoritCars.listing_id = listing_id

        res.status(201).json({
            error: false,
            message: 'update FavoritCars successfully',
            datas: newFavoritCars
        })
    } catch (error) {
        next(error)
    }
}

const deleteFavoritCars = async (req, res, next) => {
    try {
        const id = req.params.id

        const newFavoritCars = await FavoriteCars.findByPk(id)
        if (!newFavoritCars) return res.status(404).json({ error: true, message: `melihat data by id: ${id} successfully` })

        await newFavoritCars.destroy()
        res.status(200).json({
            error: false,
            message: `delete id: ${id} successfully`
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getFavoritCars,
    getFavoritCarsById,
    createFavoritCars,
    updateFavoritCars,
    deleteFavoritCars
}