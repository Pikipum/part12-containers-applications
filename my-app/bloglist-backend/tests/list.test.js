const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		blogUrl: 'https://reactpatterns.com/',
		votes: 7,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		blogUrl:
			'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		votes: 5,
		__v: 0,
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		blogUrl:
			'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		votes: 12,
		__v: 0,
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		blogUrl:
			'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		votes: 10,
		__v: 0,
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		blogUrl:
			'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		votes: 0,
		__v: 0,
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		blogUrl:
			'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		votes: 2,
		__v: 0,
	},
]

describe('total votes', () => {
	test('test total amount of votes in list', () => {
		const result = listHelper.totalVotes(blogs)
		assert.strictEqual(result, 36)
	})
})

describe('blog with most votes', () => {
	test('test blog with most votes', () => {
		const result = listHelper.favoriteBlog(blogs)
		assert.strictEqual(result, blogs[2])
	})
})

describe('author with most blogs', () => {
	test('test author with the most blogs', () => {
		const result = listHelper.mostBlogs(blogs)
		assert.strictEqual(result.author, 'Robert C. Martin')
	})
})

describe('author with most votes', () => {
	test('test author with the most votes', () => {
		const result = listHelper.mostVotes(blogs)
		assert.strictEqual(result.author, 'Edsger W. Dijkstra')
	})
})
