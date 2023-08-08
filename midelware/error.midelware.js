module.exports = (err, req, res, next) => {
    const messageError = {
        error: true,
        url: err.url,
        method: req.method
    }

    if (err.name == 'JsonWebTokenError') {
        return res.status(401).json({ ...messageError, message: 'Authentication failed ' })
    }

    if (err.code && err.meessage) {
        return res.status(err.code).json({ ...messageError, message: err.meessage })
    }

    return res.status(500).json({ ...messageError, message: 'Interna Server Error', error: err.message })
}