const express = require('express')
const router = require('./routes/router')
const requestLogger = require('./utils/requestLogger')
const errorHandler = require('./utils/errorHandler')
const db = require('./dbConnection')
const userRouter = require('./routes/userRouter')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
const port = 8080

//middleware
app.use(express.json()) 
app.use(cookieParser)
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true //because we are sharing cookies
}))
app.use(requestLogger)
app.use('/router', router)
app.use('/user',userRouter)
app.use(errorHandler)

app.listen(port,() => {
    console.clear()
    console.log(`Server running on port ${port}`)
})