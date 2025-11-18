const User = require('../models/user')

// Example valid Mongoose ObjectIds for users:

const userId1 = '60d21b4667d0d8992e610c85'
const userId2 = '60d21b4967d0d8992e610c86'
const userId3 = '60d21b4b67d0d8992e610c87'

//const johnsToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG5Vc2VyMTMzNyIsImlkIjoiNjgzOWEwMWE2YTJmMzUyYTQzYzI0MDNkIiwiaWF0IjoxNzQ4NjA3MDEyfQ.f5xp1YP7u5sdSe5p7le_PnIrqDf8SL77pwJGtxbUBuE"

const initialBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		blogUrl: 'https://reactpatterns.com/',
		votes: 7,
		user: userId1,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		blogUrl:
			'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		votes: 5,
		user: userId2,
		__v: 0,
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		blogUrl:
			'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		votes: 12,
		user: '60d21b4667d0d8992e610c85',
		__v: 0,
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		blogUrl:
			'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		votes: 10,
		user: userId3,
		__v: 0,
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		blogUrl:
			'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		votes: 0,
		user: userId3,
		__v: 0,
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		blogUrl:
			'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		votes: 2,
		user: userId3,
		__v: 0,
	},
]

const initialUsers = [
	{
		_id: userId1,
		name: 'Michel Chan',
		username: 'MichaelChan12',
		passwordHash: 'michaelspassword',
		blogs: [],
		__v: 0,
	},
	{
		_id: userId2,
		name: 'Edsger Dijkstra',
		username: 'BigD12',
		passwordHash: 'dijsktraspassword',
		blogs: [],
		__v: 0,
	},
	{
		_id: userId3,
		name: 'John User',
		username: 'User1337',
		passwordHash: 'password123',
		blogs: [],
		__v: 0,
	},
]
/*
const testBlog = {
    'id': "1234567789",
    'title': "Testing API",
    'author': "John Tester",
    'blogUrl': "https://testingstuff.com/",
    'votes': 7,
    'user': { username: 'JohnUser1337', name: 'John User', id: '60d21b4667d0d8992e610c85', blogs: ['1234567789'] },
    '__v': 0
}
    */

const testBlog = {
	title: 'Testing API',
	author: 'John Tester',
	blogUrl: 'https://testingstuff.com/',
	votes: 7,
	user: '60d21b4667d0d8992e610c85',
	__v: 0,
}

const testBlog2 = {
	title: 'Testing API',
	author: 'John Tester',
	blogUrl: 'https://testingstuff.com/',
	votes: 7,
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map((u) => u.toJSON())
}

const blogWithNoVotes = {
	title: 'Testing API',
	author: 'John Tester',
	blogUrl: 'https://testingstuff.com/',
	user: '60d21b4667d0d8992e610c85',
	__v: 0,
}

const blogWithNoTitle = {
	id: '22222222222',
	author: 'John TitleTester',
	blogUrl: 'https://testingstuff.com/',
	votes: 7,
	user: '60d21b4667d0d8992e610c85',
	__v: 0,
}

const blogWithNoUrl = {
	id: '11111111111',
	title: 'Testing URL',
	author: 'John UrlTester',
	votes: 7,
	user: '60d21b4667d0d8992e610c85',
	__v: 0,
}

const updatedBlog = {
	_id: '5a422b3a1b54a676234d17f9',
	title: 'Canonical string reduction VERSION 2',
	author: 'Edsger W. Dijkstra Jr.',
	blogUrl: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
	votes: 200,
	user: '60d21b4667d0d8992e610c85',
	__v: 0,
}
const testUser = {
	username: 'JohnUser1337',
	password: 'password123',
}

module.exports = {
	initialBlogs,
	testBlog,
	blogWithNoVotes,
	blogWithNoTitle,
	blogWithNoUrl,
	updatedBlog,
	usersInDb,
	initialUsers,
	testUser,
	testBlog2,
}
