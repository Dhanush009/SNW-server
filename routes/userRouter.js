const userRouter = require('express').Router()
const authController = require('../controllers/authController')
const {signup, login, loginWithCookie, addFriend, removeFriend, aaa} = require('../controllers/userController')

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.get('/login', loginWithCookie)
userRouter.patch('/addFriend', authController, addFriend)
userRouter.patch('/removeFriend', authController, removeFriend)
userRouter.get('/a', aaa)

module.exports = userRouter