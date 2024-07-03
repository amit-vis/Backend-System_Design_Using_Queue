// function for get the loges for error only
const {logger} = require("./logger");

class errorHandler extends Error{
    constructor(message, statuscode){
        super(message);
        this.statuscode = statuscode
    }
}

const errorHandlerMiddleware = (err, req, res, next)=>{
    if(err instanceof errorHandler){
        logger.log({
            level: 'error',
            timestamp: new Date().toString(),
            "request URL": req.url,
            "error message": err.message
        });
        return res.status(err.statuscode).json({status: false, msg: err.message})
    }
    return res.status(500).json({message: "Oops! Something went wrong... Please try again later!",err:err.message})
}

module.exports = {errorHandler, errorHandlerMiddleware}