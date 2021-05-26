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
  let color;
  let playerId = Math.floor((Math.random() * 100) + 1)
  console.log(playerId + ' connected')

  socket.on('joined', function (player1) {
    // games[roomId] = {}
    for(i = 0; i< 100; i++){
        if (games[i].players < 2) {
            games[i].players++;
            games[i].pid[games[i].players - 1] = playerId;
            console.log(`${playerId} joing room ${i}`)
            return
        }
        else{
            socket.emit('full', i)
            return
        }
    }
    console.log(player1 + ' joined')
    console.log(games[roomId]);
    players = games[roomId].players
    

    if (players % 2 == 0) color = 'black';
    else color = 'white';

    socket.emit('player', { playerId, players, color, roomId })
    // players--;

    
});

socket.on('message', function (msg) {
    console.log(msg, "80")
    socket.broadcast.emit('message', {msg})
})
  
  socket.on('disconnect', function () {
    console.log(playerId + ' disconnected')
  })
})

