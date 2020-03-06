const socket = new io.connect();
var deviceList = new Array();

var index = 0;

socket.on("deviceName", function(data) {
  var html;
  html += "<tr onclick=\"onListClick(this)\">";
  html += "<td>" + index + "</td>";
  html += "<td>" + data.name + "</td>";
  html += "<td>" + data.uuid + "</td>";
  html += "<td>" + data.address + "</td>";
  html += "<td>" + data.rssi + "</td>";
  html += "</tr>";
  $(discoverList).append(html);
  index++;
});

socket.on("init", function(data) {
  var html;
  $(connectList).prepend(html);
  $(discoverList).prepend(html);
});

function onButtonClick(params){
  socket.emit(params, "");
}

function onSendButtonClick(params){
    var tr = params.parentNode.parentNode;
    var uuid = (tr.children[2]).innerHTML;
    var data = (tr.children[3]).children[0].value;

    socket.emit('writeData', {uuid:uuid, data:data});
}

function onDisconnectButtonClick(params){
    var tr = params.parentNode.parentNode;
    var uuid = (tr.children[2]).innerHTML;
    socket.emit('deviceDisconnect', uuid);
}

function onListClick(params){
  var selectUUID = (params.children[2]).innerHTML;
  socket.emit('deviceConnect', selectUUID);
  var html;
    html += "<tr>";
    html += "<td>" + (params.children[0]).innerHTML + "</td>";
    html += "<td>" + (params.children[1]).innerHTML + "</td>";
    html += "<td>" + (params.children[2]).innerHTML + "</td>";
    html += "<td><input type=\"text\"></td>";
    html += "<td><button onclick=\"onSendButtonClick(this)\">보내기</button></td>";
    html += "<td><button onclick=\"onDisconnectButtonClick(this)\">연결끊기</button></td>";
    html += "</tr>";
  $(connectList).append(html);
  index++;
}
