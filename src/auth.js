const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

async function verify(token) {
	return client
		.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		})
		.then(ticket => {
			const payload = ticket.getPayload()
			const userid = payload['sub']
			return userid
		})
}

module.exports = function(app) {
	app.use(async (req, res, next) => {
		try {
			const auth = req.headers.authorization

			const token = auth.split(' ')[1]
			const user_id = await verify(token)
			res.locals.user_id = user_id
			next()
		} catch (e) {
			res.status(401).end()
		}
	})
}
