require('dotenv-extended').load({ silent: false, errorOnMissing: true, includeProcessEnv: true })

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
  if (process.env.SENTRY_DSN !== '') {
    const Raven = require('raven')
    Raven.config(process.env.SENTRY_DSN).install()
  }
}

// Check for env
if (!process.env.ENABLE_GRAPHIQL.match(/^(true|false)$/i) || !process.env.GENEROUS_CORS.match(/^(true|false)$/i)) {
  // If any is not filled, exit
  console.error('Error: 1 or more necessary environment variables are not set correctly.')
  process.exit(1)
}

const server = require('./src/server')

// Setup auth
require('./src/auth')(server)
// Setup postgraphile
require('./src/graphql')(server)

// Start listening
const port = process.env.PORT || 3000
server.listen(port)
console.log('Server listening on port ' + port)
