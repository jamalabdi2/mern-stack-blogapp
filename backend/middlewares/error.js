const AppError = require('../utils/AppError')

// Global Error handler
const globalErrorHandler = (err,req,res,next) => {
    err.statusCode = err.statusCode || 5000
    err.status = err.status || "Error"
    const nodeEnvironment = process.env.NODE_ENVIRONMENT

    if(nodeEnvironment === "development"){
        developmentError(err,res)
    } else if(nodeEnvironment === "production"){
        productionError(err,res)
    }
}
//Error handler for development
const developmentError = (err,res) =>{
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

//Error handler for production
const productionError = (err,res) =>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })

    }else{
        res.status(500).json({
            status: "Error",
            message: "Sorry! Something went wrong"
        })
    }
}


module.exports = {globalErrorHandler}