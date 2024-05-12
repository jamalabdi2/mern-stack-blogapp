const mongoose = require('mongoose')

const connectDB = async() =>{
    const databaseUrl = process.env.DATABASE_URL
    try {
        await mongoose.connect(databaseUrl)
        console.log(`Database connected successfully.`)
    } catch (error) {
        console.error(`Errro connecting to the database \n ${error.message}`)
    }
}
module.exports = connectDB