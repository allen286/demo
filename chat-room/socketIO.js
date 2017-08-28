var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

server.listen(8001, function () {
  console.log('listening at http://localhost:8001')
})

// 静态资源服务器
app.use(express.static('public'))
// 路由
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' })

  socket.on('register', (data) => {
    console.log(data)
    socket.user = data.user
    io.emit('chatting', Object.assign({ type: 'enter' }, data))
  })

  socket.on('chatting', function (data) {
    console.log(data)
    io.emit('chatting', Object.assign({ type: 'chat' }, data))
  })

  socket.on('disconnect', function () {
    io.emit('chatting', { type: 'leave', user: socket.user })
  })
})
