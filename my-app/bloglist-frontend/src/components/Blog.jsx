import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNotification } from '../NotificationContext'

const Blog = ({
	blog,
	updateBlog,
	removeBlog,
	user,
	name,
}) => {
	const [visible, setVisible] = useState(false)
	const [, dispatchNotification] = useNotification()

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const removeBlogConfirm = async (event) => {
		if (
			window.confirm(
				`Do you want to remove ${blog.title} by ${blog.author}`,
			)
		) {
			const response = await removeBlog({
				_id: blog.id,
			})
		}
		return null
	}

	const voteBlog = async (event) => {
		event.preventDefault()
		try {
			const response = await updateBlog({
				_id: blog.id,
				title: blog.title,
				author: blog.author,
				blogUrl: blog.blogUrl,
				votes: blog.votes + 1,
				voteUpdate: true,
			})

			console.log(response)
			dispatchNotification({
				type: 'SHOW',
				payload: `You liked "${blog.title}"`,
			})
			setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)
		} catch (error) {
			console.log(error)
			dispatchNotification({
				type: 'SHOW',
				payload: 'Could not submit like',
			})
			setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)
		}
	}

	const blogStyle = {
		paddingTop: 3,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 1,
	}

	if (visible && blog.user && name === blog.user.name) {
		return (
			<div className='blog' style={blogStyle}>
				<div>
					{blog.title} {blog.author}{' '}
					<button onClick={toggleVisibility}>Hide</button>
					<div>{blog.blogUrl}</div>
					<div>
						Votes: {blog.votes}{' '}
						<button onClick={voteBlog}>Like</button>
					</div>
					<div>{blog.user.name}</div>
					<div>
						<button onClick={removeBlogConfirm}>Remove</button>
					</div>
				</div>
			</div>
		)
	} else if (visible && blog.user && name !== blog.user.name) {
		return (
			<div className='blog' style={blogStyle}>
				<div>
					{blog.title} {blog.author}{' '}
					<button onClick={toggleVisibility}>Hide</button>
					<div>{blog.blogUrl}</div>
					<div>
						Votes: {blog.votes}{' '}
						<button onClick={voteBlog}>Like</button>
					</div>
					<div>{blog.user.name}</div>
				</div>
			</div>
		)
	} else {
		return (
			<div className='blog' style={blogStyle}>
				{blog.title} {blog.author}{' '}
				<button onClick={toggleVisibility}>Show</button>
			</div>
		)
	}
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	updateBlog: PropTypes.func.isRequired,
	removeBlog: PropTypes.func.isRequired,
	user: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
}

export default Blog
