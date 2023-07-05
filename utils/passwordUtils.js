const { compare, genSalt, hash } = require('bcrypt')

const generatePasswordHash = async (password) => {
    const salt = await genSalt()
    console.log(salt)
    const pwdHash = await hash(password, salt)
    console.log(pwdHash)
    return pwdHash
}

const verifyPwd = async (password,pwdHash) => {
    return compare(password, pwdHash)
}

module.exports = {generatePasswordHash, verifyPwd}