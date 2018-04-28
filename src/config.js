const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const applyConfiguration = function(server) {
	const app = server
	const rootDir = path.resolve(__dirname, '..')

	if(!!process.env.GENEROUS_CORS.match(/true/i)){
		app.use(cors())
	}

	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())
	app.use(express.static(rootDir + '/public'))
}

exports.applyConfiguration = applyConfiguration
