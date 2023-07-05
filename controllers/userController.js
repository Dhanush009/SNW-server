const userModel = require('../models/userModel')
const { repsonseCreator, errorCreator } = require('../utils/responseCreator')

const signup = async (req,res,next) => {
    try {
        const data = req.body
        const userData = await userModel.createUser(data)
        res.status(201).send(repsonseCreator("Account created successfully", userData)) 
    } catch (error) {
        next(error)
    }

}

const login = async (req, res, next) => {
    try {
        const {username, password} = req.body
        const {password:pwd,...user} = await userModel.findUser(username)
        
        if(password !== pwd){
            errorCreator("Invalid password",401)
            
        }else{
            res.status(201).send(repsonseCreator("User logged in successfully", user))
        }
        
    } catch (error) {
        next(error)
    }
}

module.exports = {signup, login}