const { postgraphile } = require('postgraphile')
const { DBInfo } = require('./database')

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
