const { postgraphile } = require('postgraphile')
const { DBInfo } = require('./database')

const jwt = require('jsonwebtoken')

module.exports = function(app) {
	app.use((req, res, next) =>
		postgraphile(DBInfo, 'public', {
			pgSettings: async () => {
				if (!!req.headers.authorization) {
					try {
						// Normal http connection
						const authorization = req.headers.authorization
						const token = authorization.split(' ')[1]

						const data = jwt.verify(token, process.env.JWT_SECRET, { audience: process.env.SITE_NAME })
						return {
							'jwt.claims.user_id': data.user_id,
							role: data.role,
						}
					} catch (e) {
						res.status(401).end()
					}
				}
				return {
					role: 'anonymous',
				}
			},
			graphqlRoute: '/api/graphql',
			graphiqlRoute: '/api/graphiql',
			enhanceGraphiql: true,
			graphiql: !!process.env.ENABLE_GRAPHIQL.match(/^true$/i),
		})(req, res, next),
	)
}
