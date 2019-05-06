var noble = require('../index');
var moment = require('moment');
const axios = require('axios');
var seen={};
const http = require('http');

console.log('continuous scan test with noble');
console.log('move the device away for 5 secs and return to see it again');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning([], true);
  }
});

noble.on('discover', function(peripheral) {
  dev=peripheral.uuid;
  devRssi = peripheral.rssi;
  devMac = peripheral.address;
  
  var new_one = (typeof seen[dev] === 'undefined' || seen[dev] < (moment() - 1000));

  if (new_one) {
    console.log(devMac + ' ' + devRssi);
 
    const data = JSON.stringify({
      id: ,
      beacon: devMac,
      rssi: devRssi,
      time: new Date()
    });
    var request = new http.ClientRequest({
      hostname: '',
      port: 3000,
      path: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    request.end(data);
  }

  seen[dev]=moment();
});



