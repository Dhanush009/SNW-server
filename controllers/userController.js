const {Request, Response, NextFunction} = require('express')
const userModel = require('../models/userModel')
const { generateToken, verifyToken } = require('../utils/jwtUtils')
const { generatePasswordHash, verifyPwd } = require('../utils/passwordUtils')
const { repsonseCreator, errorCreator } = require('../utils/responseCreator')
const {generateQrCode, verifyOTP} = require('../utils/totpUtils')

const signup = async (req,res,next) => {
    try {
        const {password, ...data} = req.body
        const pwdHash = await generatePasswordHash(password)
        data.password = pwdHash
        const {secret,qr} = await generateQrCode()
        const userData = await userModel.createUser(...data, secret)
        res.status(201).send(repsonseCreator("Account created successfully", qr)) 
        // res.status(201).send(
        //     `<h1>Two factor Authentication</h1>
        //     <h2>Please scan the QR code with Google Authenticator</h2>
        //     <img src=${qr}
        //     `
        // )
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

const resetPassword = async (req,res,next) => {
    try {
        const {username, password:pwd, otp} = req.body
        const {secret, ...user} = await userModel.findUser(username)

        const isOTPValid = verifyOTP(otp, secret)

        if(isOTPValid){
            const password = await generatePasswordHash(pwd)
            const userUpdated = userModel.updateOne({username}, {$set: {password}})
            if(userUpdated.modifiedCount){
                res.status(201).send(repsonseCreator(`Password reset Successfully!!`))
            }
            else{
                errorCreator("New password can't be same as Old Password!", 403)
            }

        }else{
            errorCreator("Invalid OTP", 403)
        }
        
    } catch (error) {
        next(error)
    }
}

const addFriend = async (req,res,next) => {
    try {
        const {username} = res.locals.user
        const{ name, id} = req.body
        const data = userModel.updateFriendList(username,id)

        if(data){
            repsonseCreator(`You are now friends with ${name}`,data.friendList)
        }
        
    } catch (error) {
        next(error)
    }
}

const removeFriend = async (req,res,next) => {
    try {
        const {username} = res.locals.user
        const{ name, id} = req.body
        const data = userModel.updateFriendList(username, id, false)

        if(data){
            repsonseCreator(`You are no longer friends with ${name}`,data.friendList)
        }
        
    } catch (error) {
        next(error)
    }
}

const aaa = (req,res) => {
    res.send(
        {
            success:true,
            message:"server working"
        }
    )
}

module.exports = {signup, login, loginWithCookie, resetPassword, addFriend, removeFriend, aaa}