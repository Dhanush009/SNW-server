const errorHandler = (err,req,res,next) => {
    console.error(err)
    if(err.code === 11000){
        err.message = "Username already exists!!"
        err.status = 403
    }
    else if(err.name === 'TokenExpiredError'){
        err.message="Session Expired.Please login to continue!!"
        err.status = 401
    }
    res.status(err.status||500).send({
        success:false,
        messsage:err.message
    });
    
}

module.exports = errorHandler;