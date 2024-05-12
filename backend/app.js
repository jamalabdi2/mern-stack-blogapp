const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const {globalErrorHandler} = require('./middlewares/error')
const AppError = require('./utils/AppError')

require('dotenv').config()
connectDB()

//middlewares
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

const port = process.env.PORT || 9000
const nodeEnvironment = process.env.NODE_ENVIRONMENT


app.get('/',(req,res) =>{
    return res.send('Server is running')
})
//handle unhandled routes
app.all('*', (req,res,next) =>{
    next(new AppError(`This path ${req.originalUrl} is not on this server`,404))
})
app.use(globalErrorHandler)

app.listen(port,() =>{
    console.log(`Server running on port ${port} in ${nodeEnvironment}`)
})
