const mongoose = require('mongoose');
const { errorCreator } = require('../utils/responseCreator');
const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        unique:true,
        required: [true, 'username is mandatory!!']
    },

    password:{
        type: String,
        required: [true, 'password is mandatory!!']
    },

    name:{
        type: String,
        required: [true, 'name is mandatory!!']
    },
    profilePicture:{
        type: String
    },

    secret:{
        type: String
    },

    friendList:[String]

})

//CRUD operations

userSchema.statics.createUser = async (userData) => {
    const data = await userModel.create(userData)
    console.log(data)
    return data
}

userSchema.statics.findUser = async (username) => {
    const user = (await userModel.findOne({username}, {_id:0, __v:0}))?.toObject() //in order to handle null values, we convert mongoose object to plain json object 
    if(user) {
        return user
    }
    else{
        errorCreator("User not found", 404)
    }
}

userSchema.statics.updateFriendList = async (username, id, addFriend = true) => {
    let data = null
    if(addFriend){
        data = await userModel.updateOne({username},{$addToSet:{friendList:id}})
    }else{
        data = await userModel.updateOne({username},{$pull:{friendList:id}})
    }

    if(data.modifiedCount){
        return userModel.findUser(username)
    }
}


const userModel = mongoose.model('users',userSchema)
module.exports = userModel