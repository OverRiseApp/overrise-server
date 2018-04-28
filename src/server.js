const express = require('express')
const	config = require('./config')

const	server = express();

// Apply the configuration
config.applyConfiguration(server);

module.exports = server;