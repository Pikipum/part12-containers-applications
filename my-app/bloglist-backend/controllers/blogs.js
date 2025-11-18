const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user')
	response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
	const blog = new Blog(request.body)

	const user = request.user

	if (!user) {
		return response
			.status(400)
			.json({ error: 'UserID missing or not valid' })
	}

	blog.user = request.user.id

	logger.info(request.body)
	logger.info(blog)

	try {
		let savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		savedBlog = await savedBlog.populate('user', { name: 1, username: 1 })
		await user.save()
		response.status(201).json(savedBlog)
	} catch (err) {
		response.status(400).json({ err: 'could not save blog' })
	}
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
	const user = request.user

	if (!user) {
		return response
			.status(400)
			.json({ error: 'UserID missing or not valid' })
	}

	const blog = await Blog.findById(request.params.id)
	if (blog.user.toString() === user.id.toString()) {
		await Blog.findByIdAndDelete(request.params.id)
		response.status(204).end()
	} else {
		response.status(400).json({ error: 'invalid user' })
	}
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
	const { author, title, blogUrl, votes, voteUpdate } = request.body
	const user = request.user

	if (voteUpdate) {
		const updatedBlog = await Blog.findByIdAndUpdate(
			request.params.id,
			{ author, title, blogUrl, votes },
			{ new: false, runValidators: true, context: 'query' },
		)
		return response.status(200).json(updatedBlog)
	}

	if (!user) {
		return response
			.status(400)
			.json({ error: 'UserID missing or not valid' })
	}

	if (!blogUrl || !title) {
		return response.status(400).json({
			error: 'title or url missing',
		})
	}

	await Blog.findByIdAndUpdate(
		request.params.id,
		{ author, title, blogUrl, votes },
		{ new: true, runValidators: true, context: 'query' },
	)
	return response.status(200).json('Blog updated')
})

module.exports = blogsRouter
