const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', (socket) => {
	console.log('connection')
})

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', userRouter)

app.listen(9093, () => {
	console.log('9093端口服务启动')
})
