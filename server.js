const express = require('express')
const app = express()

const http = require('http')
const socket = require('socket.io')

require('dotenv').config()

const server = http.createServer(app, {
  cors:{
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"]
  }
})
const io = socket(server)

app.use(require('morgan')('tiny'))
const routesReport = require('rowdy-logger').begin(app)

app.use(express.json())
app.use(require('cors')())

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  routesReport.print()
})

const userRouter = require('./routes/userRoutes')

app.use('/user', userRouter)

var players;
var games = Array(100);
for (let i = 0; i < 100; i++) {
    games[i] = {players: 0 , pid: [0 , 0]}
}

io.on('connection', function (socket) {
  var playerId = Math.floor((Math.random() * 100) + 1)
  console.log(playerId + ' connected')

  socket.on('disconnect', function () {
    console.log(playerId + ' disconnected')
  })
})

