const {Request, Response, NextFunction} = require('express')
const userModel = require('../models/userModel')
const { generateToken, verifyToken } = require('../utils/jwtUtils')
const { generatePasswordHash, verifyPwd } = require('../utils/passwordUtils')
const { repsonseCreator, errorCreator } = require('../utils/responseCreator')

const signup = async (req,res,next) => {
    try {
        const {password, ...data} = req.body
        const pwdHash = await generatePasswordHash(password)
        data.password = pwdHash
        const userData = await userModel.createUser(data)
        res.status(201).send(repsonseCreator("Account created successfully", userData)) 
    } catch (error) {
        next(error)
    }

}
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */

const login = async (req, res, next) => {
    try {
        const {username, password} = req.body
        const {password:pwdHash,...user} = await userModel.findUser(username)
        
        const isPasswordTrue = verifyPwd(password, pwdHash)

        if(!isPasswordTrue){
            errorCreator("Invalid password",401)
            
        }else{
            //login successful
            const token = generateToken(user)
            res.cookie("token",token,{ httpOnly:true, expires:3600_000 })
            res.status(201).send(repsonseCreator("User logged in successfully", user))
        }
        
    } catch (error) {
        next(error)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */

const loginWithCookie = async (req, res, next) => {
    try {
        const {token} = req.cookies
        const {username} = verifyToken(token)
        const user = await userModel.findUser(username)
        res.status(201).send(repsonseCreator("User logged in successfully with cookie", user))
        
    } catch (error) {
        next(error)
    }
}

module.exports = {signup, login, loginWithCookie}