const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const { userExtractor, tokenExtractor } = require('../utils/middleware')
const jwt = require('jsonwebtoken')

const api = supertest(app)

describe('test regarding blogs', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await User.deleteMany({})

		const userId = '60d21b4667d0d8992e610c85'
		const passwordHash = await bcrypt.hash('password123', 10)
		const user = new User({
			_id: userId,
			username: 'JohnUser1337',
			passwordHash,
			name: 'John Tester',
		})
		await user.save()

		await Blog.insertMany(helper.initialBlogs)
	})

	test('right amount of blogs is returned', async () => {
		const response = await api.get('/api/blogs')

		assert.strictEqual(response.body.length, 6)
	})

	test('blogs have correct id field', async () => {
		const response = await api.get('/api/blogs')

		assert.strictEqual(Object.keys(response.body[0]).includes('id'), true)
	})

	test('blogs can be added', async () => {
		const blogsBefore = await api.get('/api/blogs')

		const loggedUser = await api.post('/api/login').send(helper.testUser)
		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${loggedUser.body.token}`)
			.send(helper.testBlog)

		const blogsAfter = await api.get('/api/blogs')

		assert.strictEqual(blogsAfter.body.length, blogsBefore.body.length + 1)
	})

	test('adding blog with no votes value sets votes to 0', async () => {
		const loggedUser = await api.post('/api/login').send(helper.testUser)
		const response = await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${loggedUser.body.token}`)
			.send(helper.blogWithNoVotes)
			.expect(201)

		assert.strictEqual(response.body.votes, 0)
	})

	test('adding blog with no url receives 400 Bad Request', async () => {
		const loggedUser = await api.post('/api/login').send(helper.testUser)
		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${loggedUser.body.token}`)
			.send(helper.blogWithNoUrl)
			.expect(400)
	})

	test('adding blog with no title receives 400 Bad Request', async () => {
		const loggedUser = await api.post('/api/login').send(helper.testUser)
		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${loggedUser.body.token}`)
			.send(helper.blogWithNoTitle)
			.expect(400)
	})

	test('deleting a blog by id returns 204', async () => {
		const blogsBefore = await api.get('/api/blogs')

		const loggedUser = await api.post('/api/login').send(helper.testUser)
		await api
			.delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
			.set('Authorization', `Bearer ${loggedUser.body.token}`)
			.expect(204)

		const blogsAfter = await api.get('/api/blogs')

		assert.strictEqual(blogsBefore.body.length, blogsAfter.body.length + 1)
	})

	test('updating a blog by id returns 200 OK', async () => {
		const loggedUser = await api.post('/api/login').send(helper.testUser)
		await api
			.put(`/api/blogs/${helper.initialBlogs[2]._id}`)
			.set('Authorization', `Bearer ${loggedUser.body.token}`)
			.send(helper.updatedBlog)
			.expect(200)
	})
})

after(async () => {
	await mongoose.connection.close()
})
