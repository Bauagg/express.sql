const { Brand } = require('../../models')

const getBands = async (req, res, next) => {
    try {
        const newBrand = await Brand.findAll()

        res.status(200).json({
            error: false,
            message: 'get data successfyly',
            datas: newBrand
        })
    } catch (error) {
        next(error)
    }
}

const getBandsById = async (req, res, next) => {
    try {
        const id = req.params.id

        const newBrand = await Brand.findOne({ where: { id } })

        if (!newBrand) return res.status(404).json({ error: true, message: `get data by id: ${id} not found` })

        res.status(200).json({
            error: false,
            message: 'get data by id successfully',
            datas: newBrand
        })
    } catch (error) {
        next(error)
    }
}

const createBrand = async (req, res, next) => {
    try {
        const { name, country } = req.body

        const newBrand = await Brand.create({ name, country })

        res.status(201).json({ error: false, message: 'create Brand successfully', datas: newBrand })
    } catch (error) {
        next(error)
    }
}

const updateBrand = async (req, res, next) => {
    try {
        const id = req.params.id
        const { name, country } = req.body

        const newBrand = await Brand.findByPk(id)
        if (!newBrand) {
            return res.status(404).json({ error: true, message: 'Brand tidak ditemukan' })
        }

        newBrand.name = name
        newBrand.country = country
        res.status(201).json({
            error: false,
            message: 'supdate Brand berhasil di update',
            datas: {
                name: newBrand.name,
                country: newBrand.country,
                createdAt: newBrand.createdAt,
                updatedAt: newBrand.updatedAt
            }
        })
    } catch (error) {
        next(error)
    }
}

const deleteBrand = async (req, res, next) => {
    try {
        const id = req.params.id
        const newBrand = await Brand.findByPk(id)
        if (!newBrand) {
            return res.status(404).json({ error: true, message: 'Brand tidak di temukan' })
        }

        await newBrand.destroy()

        res.status(200).json({ error: false, message: 'delete brand successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getBands,
    getBandsById,
    createBrand,
    updateBrand,
    deleteBrand
}