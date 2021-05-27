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
let joined = true

let games = Array(100);
for (let i = 0; i < 100; i++) {
    games[i] = {players: 0 , pid: [0 , 0]}
}


io.on('connection', function (socket) {
    let gameId = 0
    socket.on('joined', function (msg) {
        let playerId = msg
        for(i = 0; i< 100; i++){
            if (games[i].players < 2) {
                games[i].players++;
                games[i].pid[games[i].players - 1] = playerId;
                console.log(`${playerId} joining room ${i}`)
                gameId = i;
                socket.emit('room', {gameId})
                return
            }
        }
    
        console.log(player1 + ' joined')
        console.log(games[roomId]);
        players = games[roomId].players
        socket.broadcast.emit('joined', {msg})
    })
    socket.on('disconnect', function () {
        console.log(' disconnected')
    })
    socket.on('move', function (msg) {
        console.log('MOVES', msg)
    socket.broadcast.emit('move', {msg})
    })  
});