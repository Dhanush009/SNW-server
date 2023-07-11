const userModel = require("../models/userModel")
const { verifyToken } = require("../utils/jwtUtils")

const authController = async (req,res,next) => {
    try {
        
        const {token} = req.cookies
        const {username} = verifyToken(token)
        const user = await userModel.findUser(username)
        //saving data in response object
        res.locals.user = user
        next()
        
    } catch (error) {
        next(error)
    }

}

module.exports = authController