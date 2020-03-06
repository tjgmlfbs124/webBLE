// npm install bluetooth-hci-socket
// npm install noble
var Noble = require('noble');
const serviceUUIDs = ['ffe0'];
const characteristicUUIDs = ['ffe1'];

var WebBLE = {
  noble : Noble
};

function onServicesAndCharacteristicsDiscovered(error, services, characteristics) {
  const echoCharacteristic = characteristics[0];

  // Receive Event 바인딩
  echoCharacteristic.on('data', (data, isNotification) => {
    console.log('Received: "' + data + '"');
  });

  // write Event 바인딩
  echoCharacteristic.on('write', () => {
    // TODO
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

    // 연결된 블루투스 기기의 이벤트를 바인딩하는곳
    peripheral.once('connect',function(err){
      if(err) console.log("connect err : " , err)
      // TODO
      console.log("send Data");
    });

    peripheral.once('disconnect',function(err){
      if(err) console.log("disconnect err : " , err)
      // TODO
    });
  }
};

WebBLE.write = function(data){
  var uuid = data.uuid;
  var data = new Buffer(data.data, 'hex');
  Noble.write(uuid, serviceUUIDs, characteristicUUIDs, data, null);
}

module.exports = WebBLE;
