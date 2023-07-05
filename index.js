const express = require('express')
const router = require('./routes/router')
const requestLogger = require('./utils/requestLogger')
const errorHandler = require('./utils/errorHandler')
const db = require('./dbConnection')
const userRouter = require('./routes/userRouter')

const app = express()
const port = 4000

//middleware
app.use(express.json()) 
app.use(requestLogger)
app.use('/router', router)
app.use('/user',userRouter)
app.use(errorHandler)

app.listen(port,() => {
    console.clear()
    console.log(`Server running on port ${port}`)
})