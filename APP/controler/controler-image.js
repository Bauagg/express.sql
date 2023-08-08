const { Images } = require('../../models')

const getImages = async (req, res, next) => {
    try {
        const newImages = await Images.findAll()

        res.status(200).json({
            error: false,
            message: 'get data Images successfully',
            datas: newImages
        })
    } catch (error) {
        next(error)
    }
}

const getImagesById = async (req, res, next) => {
    try {
        const id = req.params.id
        const newImages = await Images.findOne({ where: { id } })
        if (!newImages) return res.status(404).json({ error: true, message: `get data image by id: ${id} tidak ditemukan` })

        res.status(200).json({
            error: false,
            message: `data by id: ${id} successfully`,
            datas: newImages
        })
    } catch (error) {
        next(error)
    }
}

const createImages = async (req, res, next) => {
    try {
        const { image_url, listing_id } = req.body
        const newImages = await Images.create({ image_url, listing_id })

        res.status(201).json({
            error: false,
            message: 'create data successfully',
            datas: newImages
        })
    } catch (error) {
        next(error)
    }
}

const updateImages = async (req, res, next) => {
    try {
        const id = req.params.id
        const { image_url, listing_id } = req.body
        const newImages = await Images.findByPk(id)
        if (!newImages) return res.status(404).json({ error: true, message: `get data image by id: ${id} tidak ditemukan` })

        newImages.image_url = image_url
        newImages.listing_id = listing_id

        res.status(201).json({
            error: false,
            message: 'update data image successfully',
            datas: newImages
        })
    } catch (error) {
        next(error)
    }
}

const deleteImages = async (req, res, next) => {
    try {
        const id = req.params.id
        const newImages = await Images.findByPk(id)
        if (!newImages) return res.status(404).json({ error: true, message: `get data image by id: ${id} tidak ditemukan` })

        await newImages.destroy()
        res.status(200).json({
            error: false,
            message: 'delete data successfully'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getImages,
    getImagesById,
    createImages,
    updateImages,
    deleteImages
}