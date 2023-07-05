const userRouter = require('express').Router()
const {signup, login, loginWithCookie} = require('../controllers/userController')

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.get('/login', loginWithCookie)

module.exports = userRouter