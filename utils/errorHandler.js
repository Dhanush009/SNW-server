const errorHandler = (err,req,res,next) => {
    console.error(err)
    res.status(err.status||500).send({
        success:false,
        messsage:err.message
    });
    
}

module.exports = errorHandler;