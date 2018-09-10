const bodyParser = require('body-parser')
const cors = require('cors')

const applyConfiguration = function(server) {
	const app = server

	if (!!process.env.GENEROUS_CORS.match(/true/i)) {
		app.use(cors())
	}

	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())
}

exports.applyConfiguration = applyConfiguration
