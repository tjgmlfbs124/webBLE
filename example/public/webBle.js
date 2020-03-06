// npm install bluetooth-hci-socket
// npm install noble
var Noble = require('noble');
const serviceUUIDs = ['ffe0'];
const characteristicUUIDs = ['ffe1'];

var WebBLE = {
  _noble : Noble
};

function onServicesAndCharacteristicsDiscovered(error, services, characteristics) {
  const _characteristics = characteristics[0];

  // receive Event 바인딩
  _characteristics.on('data', (data, isNotification) => {
    console.log("Received: " + data);
  });

  // write Event 바인딩
  _characteristics.on('write', (err) => {
    if(err) console.log("write err : " , err)
  });
}

WebBLE.startScanning = function(){
  Noble.startScanning([], true);
};

WebBLE.stopScanning = function(){
  Noble.stopScanning();
};

WebBLE.connect = function(uuid){
  var peripheral = Noble._peripherals[uuid];
  if(peripheral){
    peripheral.connect(function (err){
      if(err) console.log("connect err : " , err);
      else
        peripheral.discoverSomeServicesAndCharacteristics(serviceUUIDs, characteristicUUIDs, onServicesAndCharacteristicsDiscovered);
    });

    // 연결 이벤트 바인딩
    peripheral.once('connect',function(err){
      if(err) console.log("connect err : " , err)
      /**
      * TODO
      */
    });


    // 연결해제 바인딩
    peripheral.once('disconnect',function(err){
      if(err) console.log("disconnect err : " , err)
      /**
      * TODO
      */
    });
  }
};

WebBLE.disconnect = function(uuid){
  var peripheral = Noble._peripherals[uuid];
  peripheral.disconnect(function(){
    /**
    * TODO
    */
  })
};

WebBLE.allDisconnect = function(){
  var peripheral = Noble._peripherals;
  for( var key in peripheral ) {
    Noble.disconnect(key);
  }
};

WebBLE.write = function(data){
  var uuid = data.uuid;
  var data = new Buffer(data.data, 'hex');
  Noble.write(uuid, serviceUUIDs, characteristicUUIDs, data, null);
}

module.exports = WebBLE;
