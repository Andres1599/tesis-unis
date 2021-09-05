module.exports = (logger) => {
    return {
        success: (data, message) => {
            return Object.assign({
                ok: true,
                message,
                data
            })
        },
        fail: (error) => {
            logger.error(error)
            return Object.assign({
                ok: false,
                message: error.message,
                data: error
            })
        }
    }
}