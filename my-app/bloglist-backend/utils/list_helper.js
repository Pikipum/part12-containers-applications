const dummy = (blogs) => {
	return 1
}

const totalVotes = (blogs) => {
	return blogs.reduce((total, blog) => total + blog.votes, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) return null

	return blogs.reduce((acc, currentblog) => {
		return acc.votes > currentblog.votes ? acc : currentblog
	})
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return null

	const blogCounts = blogs.reduce((acc, blog) => {
		acc[blog.author] = (acc[blog.author] || 0) + 1
		return acc
	}, {})

	const authorWithMost = Object.entries(blogCounts).reduce(
		(max, [author, count]) =>
			count > max.blogs ? { author, blogs: count } : max,
		{ author: null, blogs: 0 },
	)

	return authorWithMost
}

const mostVotes = (blogs) => {
	if (blogs.length === 0) return null

	const votes = blogs.reduce((acc, blog) => {
		acc[blog.author] = (acc[blog.author] || 0) + blog.votes
		return acc
	}, {})

	const authorWithMostVotes = Object.entries(votes).reduce(
		(max, [author, count]) =>
			count > max.votes ? { author, votes: count } : max,
		{ author: null, votes: 0 },
	)

	return authorWithMostVotes
}

module.exports = {
	dummy,
	totalVotes,
	favoriteBlog,
	mostBlogs,
	mostVotes,
}
