const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')
const api = supertest(app)
const { userExtractor } = require('../utils/middleware')
const jwt = require('jsonwebtoken')

describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'jtest1',
			name: 'John Tester',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

		const usernames = usersAtEnd.map((u) => u.username)
		assert(usernames.includes(newUser.username))
	})
	test('creation fails with no username', async () => {
		const usersAtStart = await helper.usersInDb()

		const invalidUser = {
			name: 'nonameuser',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(invalidUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length)

		const usernames = usersAtEnd.map((u) => u.username)
		assert.strictEqual(usernames.includes(invalidUser.name), false)
	})

	test('creation fails with short password', async () => {
		const usersAtStart = await helper.usersInDb()

		const invalidUser = {
			username: 'shortpassworduser',
			name: 'mr. shortpassword',
			password: 'sa',
		}

		await api
			.post('/api/users')
			.send(invalidUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length)

		const usernames = usersAtEnd.map((u) => u.username)
		assert.strictEqual(usernames.includes(invalidUser.username), false)
	})

	test('creation fails with no password', async () => {
		const usersAtStart = await helper.usersInDb()

		const invalidUser = {
			username: 'nopassworduser',
			name: 'mr. nopassword',
		}

		await api
			.post('/api/users')
			.send(invalidUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length)

		const usernames = usersAtEnd.map((u) => u.username)
		assert.strictEqual(usernames.includes(invalidUser.username), false)
	})

	test('creation fails with short username', async () => {
		const usersAtStart = await helper.usersInDb()

		const invalidUser = {
			username: 'sh',
			name: 'mr. shortusername',
			password: '0f9uj430jf',
		}

		await api
			.post('/api/users')
			.send(invalidUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length)

		const usernames = usersAtEnd.map((u) => u.username)
		assert.strictEqual(usernames.includes(invalidUser.username), false)
	})

	test('creation fails with no token', async () => {
		const usersAtStart = await helper.usersInDb()

		const invalidUser = {
			username: 'sh',
			name: 'mr. shortusername',
			password: '0f9uj430jf',
		}

		await api
			.post('/api/users')
			.send(invalidUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length)

		const usernames = usersAtEnd.map((u) => u.username)
		assert.strictEqual(usernames.includes(invalidUser.username), false)
	})
})

after(async () => {
	await mongoose.connection.close()
})
