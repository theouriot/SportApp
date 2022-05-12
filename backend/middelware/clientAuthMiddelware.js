const ClientModel = require("../models/Client")
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            /* Get the token from header */
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.SECRET_TOKEN)

            // Get user from the token
            const user = ClientModel.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
}
