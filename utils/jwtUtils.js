const { sign, verify } = require('jsonwebtoken')
const { errorCreator } = require('./responseCreator')
//sign - to generate a token
//verify - to verify token validity

const SECRET_KEY = 'MySecretKey'

const generateToken = (data) => {
    return sign(data,SECRET_KEY,{expiresIn:`1h`})
}

const verifyToken = (token) => {
    if(!token){
        errorCreator("token missing!! Please login", 401)
    }
    return verify(token, SECRET_KEY)
}

module.exports = {generateToken, verifyToken}