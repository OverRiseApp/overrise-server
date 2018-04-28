require('dotenv').config()

// Check for env
if (
	!process.env.DB_HOST ||
	!process.env.DB_USER ||
	!process.env.DB_PASSWORD ||
	!process.env.DB_DATABASE ||
  !process.env.GOOGLE_CLIENT_ID || 
  !process.env.ENABLE_GRAPHIQL || !process.env.ENABLE_GRAPHIQL.match(/^(true|false)$/i) ||
  !process.env.GENEROUS_CORS || !process.env.GENEROUS_CORS.match(/^(true|false)$/i)
) {
  // If any is not filled, exit
  console.error("Error: 1 or more necessary environment variables are not set correctly.")
	process.exit(1)
}

const server = require('./src/server');

// Setup auth
require('./src/auth')(server)
// Setup postgraphile
require('./src/graphql')(server)

// Start listening
const port = process.env.PORT || 3000;
server.listen(port);
console.log("Server listening on port " + port);