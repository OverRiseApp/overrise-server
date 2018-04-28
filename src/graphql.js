const { postgraphile } = require('postgraphile')

const DBInfo = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	// Indicate the time is stored in UTC
	timezone: 'Z',
	charset: 'utf8',
}

module.exports = function(app) {
	app.use((req, res, next) =>
		postgraphile(DBInfo, 'public', {
			pgSettings: () => {
				return {
					'user.id': res.locals.user_id,
					role: 'postgres', // Temp
				}
			},
			watchPg: true,
			graphqlRoute: '/api/graphql',
			graphiqlRoute: '/api/graphiql',
			graphiql: !!process.env.ENABLE_GRAPHIQL.match(/^true$/i),
		})(req, res, next),
	)
}
