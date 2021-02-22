// Externe Module
// Setup basic express server

/*
    DEBUG Module einbinden???
*/

const express = require('express')
const session = require('express-session')
const path = require('path')
const cors = require('cors')
const config = require('config')

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const {socketIO} = require('./modules/socket')

// Router
const loginRouter = require('./routes/login-router')
const connectRouter = require('./routes/connect-router')
const playerRouter = require('./routes/player-router')

app.use(cors())

app.use(express.json())
//app.use(express.urlencoded({ extended: false }))

// Session einbinden
let sessionMiddleware = session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }});
app.use(sessionMiddleware);
// Session auch für WebSocket verfügbar machen
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});

//Bind Port 3000 to Server if no os Port exist
const PORT = process.env.PORT || config.get("PORT")
server.listen(PORT, () => {
    console.log(`ZickZackZiege listens on Port ${PORT}`)
})

//Load index.html on localhost:3000
app.use(express.static(path.join(__dirname, 'public')))
// Routen einbinden
app.use('/api/player', playerRouter)
app.use('/api/login', loginRouter)

app.use('/connect', connectRouter)

socketIO(io)