const jwt = require('jsonwebtoken')
const bcryptJS = require('bcryptjs')
const Joi = require('joi')
const Raven = require('raven')

const knex = require('./database').knex

const opts = {
	secretOrKey: process.env.JWT_SECRET,
	issuer: process.env.SITE_NAME,
	audience: process.env.SITE_NAME,
}

const {
	InvalidData,
	UnknownError,
	InvalidEmailOrPasswordError,
	EmailRegisteredError,
	PasswordDoesNotExist,
} = require('./errors')

module.exports = function (app) {
	app.post('/api/login', (req, res, next) => {
		const schema = {
			email: Joi.string()
				.email()
				.required(),
			password: Joi.string()
				.min(4)
				.required(),
		}
		if (Joi.validate(req.body, schema, { convert: false }).error) {
			res.status(400).json({ status: 'error', code: InvalidData.errorCode, error: 'Invalid data' })
			return
		}

		const { password } = req.body
		const email = req.body.email.toLowerCase()

		let user_id
		let user_type

		knex('user')
			.select('id', 'user_type')
			.where('email_address', email)
			.then(model => {
				// Check if email is registered
				if (model.length > 0) {
					user_id = model[0].id
					user_type = model[0].user_type
					return knex('user')
						.withSchema('private')
						.select('hashed_password')
						.where('id', user_id)
				}
				throw new InvalidEmailOrPasswordError()
			})
			.then(model => {
				// Get password
				if (model.length > 0) {
					return bcryptJS.compare(password, model[0].hashed_password)
				}
				// Shouldn't get here
				throw new PasswordDoesNotExist()
			})
			.then(isCorrectPassword => {
				if (isCorrectPassword) {
					const jwtToken = jwt.sign(
						{ user_id, role: user_type.toLowerCase(), iss: opts.issuer, aud: opts.audience },
						opts.secretOrKey,
					)
					res.status(200).json({ jwt: jwtToken })
					return
				}
				throw new InvalidEmailOrPasswordError()
			})
			.catch(err => {
				if (err instanceof InvalidEmailOrPasswordError) {
					res.status(401).json({
						status: 'error',
						code: InvalidEmailOrPasswordError.errorCode,
						error: 'Incorrect email or password.',
					})
				} else {
					console.error(err)
					Raven.captureException(err)
					res.status(500).json({
						status: 'error',
						code: UnknownError.errorCode,
						error: 'Something went wrong with the server. Please try again later.',
					})
				}
			})
	})
	app.post('/api/register', (req, res, next) => {
		const schema = {
			first_name: Joi.string()
				.allow('')
				.required(),
			last_name: Joi.string()
				.allow('')
				.required(),
			email: Joi.string()
				.email()
				.required(),
			password: Joi.string()
				.min(4)
				.required(),
		}
		if (Joi.validate(req.body, schema, { convert: false }).error) {
			res.status(400).json({ status: 'error', code: InvalidData.errorCode, error: 'Invalid data' })
			return
		}

		const { first_name, last_name, password } = req.body
		const email = req.body.email.toLowerCase()

		knex('user')
			.select('id')
			.where('email_address', email)
			.then(model => {
				// Check if email is registered
				if (model.length === 0) {
					return bcryptJS.hash(password, 12)
				}
				throw new EmailRegisteredError()
			})
			.then(hashed_password => {
				return knex.transaction(trx => {
					return trx
						.into('user')
						.insert({
							first_name,
							last_name,
							email_address: email,
						})
						.returning('id')
						.then(model => {
							return trx
								.withSchema('private')
								.into('user')
								.insert({ id: model[0].id, hashed_password })
						})
				})
			})
			.then(() => {
				res.status(200).json({ status: 'success' })
			})
			.catch(err => {
				if (err instanceof EmailRegisteredError) {
					res.status(403).json({
						status: 'error',
						code: EmailRegisteredError.errorCode,
						error: 'Email registered. Please choose another email.',
					})
				} else {
					console.error(err)
					Raven.captureException(err)
					res.status(500).json({
						status: 'error',
						code: UnknownError.errorCode,
						error: 'Something went wrong with the server. Please try again later.',
					})
				}
			})
	})
}
