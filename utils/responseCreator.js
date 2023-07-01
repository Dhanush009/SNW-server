const repsonseCreator = (message,data) => {
    const response = {success:true, message:message}
    if(data){
        response.data = data
    }
    return response;
}

const errorCreator = (message, status = 500) => {
    const err = new Error(message)
    err. status = status
    throw err
}

module.exports = {repsonseCreator, errorCreator};