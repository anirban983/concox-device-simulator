const axios = require('axios');
axios.defaults.baseURL = 'http://127.0.0.1:3000';

const loginPacket = "78 78 11 01 03 51 60 80 80 77 92 88 22 03 32 01 01 AA 53 36 0D 0A"
const heartbeatPacket = "78 78 0B 23 C0 01 22 04 00 01 00 08 18 72 0D 0A"
const gpsLocationPacket = "78 78 22 22 0F 0C 1D 02 33 05 C9 02 7A C8 18 0C 46 58 60 00 14 00 01 CC 00 28 7D 00 1F 71 00"

const makeHearbeatRequest = async () => {
    console.log('Sending Hearbeat Packet: ' + '"' + heartbeatPacket + '"')
    axios.post('/api/heartbeat', { heartbeatPacket })
    .then(async function (response) {
        console.log('Connection established')
        console.log('Heartbeat Packet Response: ' + '"' + response.data + '"');
        await makeHearbeatRequest()
    })
    .catch(function (error) {
        console.log('Connection failed')
        console.log('Error:', error.message);
    });
}

const makeGpsLocationRequest = async () => {
    console.log('Sending GPS Location Packet: ' + '"' + gpsLocationPacket + '"')
    await axios.post('/api/gps-location', { gpsLocationPacket })
    .then(function (response) {
        console.log('Connection established')
        console.log('GPS Location Packet Response: ' + '"' + response.data + '"');
    })
    .catch(function (error) {
        console.log('Connection failed')
        console.log('Error:', error.message);
    });
}

const makeLoginRequest = async () => {
    console.log('Sending Login Packet: ' + '"' + loginPacket + '"')
    await axios.post('/api/login', { loginPacket })
    .then(async function (response) {
        console.log('Connection established')
        console.log('Login Packet Response: ' + '"' + response.data + '"');
        await makeHearbeatRequest()
        await makeGpsLocationRequest()
    })
    .catch(function (error) {
        console.log('Connection failed')
        console.log('Error:', error.message);
    });
}

const connectToServer = async () => {
    while (true) {
        await makeLoginRequest()
    }
}

connectToServer()