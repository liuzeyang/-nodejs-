var socket = require('http').createServer()
var io = require('socket.io')(socket);
module.exports = {
	sendmes(req, res, next){
        socket.listen('5000')
        console.log('test');
		io.on('connection', function (socket) {
		  socket.emit('customEmit', req.body.mes);
		  socket.on('spg', function (data) {
		    if(data.mes == 'yes'){
		    	res.json({success:true})
		     }else{
		     	res.json({success:false})
		     }
		  });
		});
		res.json({success:true})

	}
}

