module.exports = function(app, io)
{
	//@SEO
	var WebBLE = require('../public/webBLE');
	app.get('/',function(req,res){
		res.render('index.html')
	});

	io.on('connection', function(socket) {
			console.log("Connected io socket ")
			socket.on('scanStart', function(data) {
				WebBLE.startScanning();
			});

			socket.on('scanStop', function(data) {
				WebBLE.stopScanning();
			});

			// @uuid : uuid of connect device
			socket.on('deviceConnect', function(uuid) {
				WebBLE.connect(uuid);
			});

			socket.on('writeData', function(data){
				WebBLE.write(data);
			});
	});

	// discover 바인딩
	WebBLE.noble.on('discover', function(peripheral){
	  var name =  peripheral.advertisement.localName;
	  if(name){
	    // TODO
	    if(name.indexOf("camRobot") < 0 && peripheral.rssi > -30){
	      io.emit('deviceName', {name:name, uuid:peripheral.uuid, rssi:peripheral.rssi, address:peripheral.address});
	    }
	  }
	});

}
