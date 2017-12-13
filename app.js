var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path')
var cookieSession = require('cookie-session')
//var socket = require('http').createServer()
//var io = require('socket.io')(socket);
var apiRoute = require('./node/routes/api.js')

app.use(express.static(path.join(__dirname, 'node')))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use(cookieSession({
	name:'session',
	secret:'some randon charactors',
	maxAge:1000*60*60*24
}))

app.use('/api',apiRoute)

//socket.sendmes({body:{mes:''}},{json:{}},{})

app.listen('4000' || process.env.PROT)

// socket.listen('5000')
