"use-strict";

const axios = require('axios');
const config = require('config');

// setting axios default base url
axios.defaults.baseURL = config.adapterURL

// setting default packet values
const loginPacket = config.loginPacket
const heartbeatPacket = config.heartbeatPacket
const gpsLocationPacket = config.gpsLocationPacket

// function to make heartbeat request
const makeHearbeatRequest = async () => {
    console.log('Sending Hearbeat Packet: ' + '"' + heartbeatPacket + '"')
    axios.post('/api/heartbeat', { heartbeatPacket })
    .then(async function (response) {
        console.log('Connection established')
        console.log('Heartbeat Packet Response: ' + '"' + response.data + '"');
        await makeHearbeatRequest() // continues to make heartbeat request
    })
    .catch(function (error) {
        console.log('Connection failed')
        console.log('Error:', error.message);
    });
}

// function to make gps location request
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

// function to make login request
const makeLoginRequest = async () => {
    console.log('Sending Login Packet: ' + '"' + loginPacket + '"')
    await axios.post('/api/login', { loginPacket })
    .then(async function (response) {
        console.log('Connection established')
        console.log('Login Packet Response: ' + '"' + response.data + '"');
        await makeHearbeatRequest() // make heartbeat request on successful login connection
        await makeGpsLocationRequest() // make gps location request on successful login connection
    })
    .catch(function (error) {
        console.log('Connection failed')
        console.log('Error:', error.message);
    });
}

// function to connect to the device adapter
const connectToServer = async () => {
    while (true) {
        await makeLoginRequest() // continues to send login request
    }
}

connectToServer()