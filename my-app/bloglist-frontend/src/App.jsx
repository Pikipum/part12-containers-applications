import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotification } from './NotificationContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const Notification = () => {
	const [notification] = useNotification()
	if (!notification) return null
	return <div className='error'>{notification}</div>
}

const ShowUser = (props) => {
	return (
		<div>
			Logged in as: {props.name}{' '}
			<form onSubmit={props.handleLogout}>
				<button type='submit'>Log out</button>
			</form>
		</div>
	)
}

const BlogView = (props) => {
	return (
		<div>
			{props.blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					updateBlog={props.updateBlog}
					removeBlog={props.removeBlog}
					user={props.user}
					name={props.name}
				/>
			))}
		</div>
	)
}

const LoginScreen = (props) => {
	if (props.user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<form onSubmit={props.handleLoginSubmission}>
					<div>
						username:{' '}
						<input
							name='username'
							value={props.newUserName}
							onChange={props.handleNameFieldChange}
						/>
					</div>
					<div>
						password:{' '}
						<input
							name='password'
							type='password'
							value={props.NewPassword}
							onChange={props.handlePasswordFieldChange}
						/>
					</div>
					<button type='submit'>Login</button>
				</form>
			</div>
		)
	}
	return (
		<div>
			<h2>blogs</h2>
			<ShowUser name={props.name} handleLogout={props.handleLogout} />
			<Togglable buttonLabel='Create blog' ref={props.blogFormRef}>
				<CreateBlogForm
					addBlog={props.addBlog}
					blogFormRef={props.blogFormRef}
				/>
			</Togglable>
			<BlogView
				blogs={props.blogs}
				updateBlog={props.updateBlog}
				removeBlog={props.removeBlog}
				user={props.user}
				name={props.name}
			/>
		</div>
	)
}

const App = () => {
	const [user, setUser] = useState(null)
	const [name, setName] = useState(null)
	const [newUserName, setNewUserName] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [, dispatchNotification] = useNotification()
	const blogFormRef = useRef()
	const queryClient = useQueryClient()

	const { data: blogs = [], isLoading } = useQuery(
		'blogs',
		blogService.getAll,
		{
			select: (data) => [...data].sort((a, b) => b.votes - a.votes),
			onError: (error) => {
				dispatchNotification({
					type: 'SHOW',
					payload: 'Could not retrieve blogs',
					error,
				})
				setTimeout(() => {
					dispatchNotification({ type: 'CLEAR' })
				}, 5000)
			},
		},
	)
	const addBlogMutation = useMutation(
		(blogObject) => blogService.post(blogObject, user),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('blogs')
			},
		},
	)
	const updateBlogMutation = useMutation(
		(blogObject) => blogService.put(blogObject._id, blogObject, user),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('blogs')
			},
		},
	)
	const removeBlogMutation = useMutation(
		(blogObject) => blogService.deleteBlog(blogObject._id, user),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('blogs')
			},
		},
	)
	const loginMutation = useMutation(
		({ username, password }) => loginService.login({ username, password }),
		{
			onSuccess: (response) => {
				setUser(response.data.token)
				setName(response.data.name)
				window.localStorage.setItem('user', response.data.token)
				window.localStorage.setItem('name', response.data.name)
				dispatchNotification({
					type: 'SHOW',
					payload: `Login successful, logged in as ${response.data.name}.`,
				})
				setTimeout(() => {
					dispatchNotification({ type: 'CLEAR' })
				}, 5000)
			},
			onError: () => {
				dispatchNotification({
					type: 'SHOW',
					payload: 'Wrong username or password.',
				})
				setTimeout(() => {
					dispatchNotification({ type: 'CLEAR' })
				}, 5000)
			},
		},
	)
	const handleLogout = (event) => {
		window.localStorage.removeItem('user')
		window.localStorage.removeItem('name')
		setUser(null)
		setName(null)

		dispatchNotification({ type: 'SHOW', payload: 'Log out succesful.' })
		setTimeout(() => {
			dispatchNotification({ type: 'CLEAR' })
		}, 5000)
	}
	const handleLoginSubmission = (event) => {
		event.preventDefault()
		loginMutation.mutate({ username: newUserName, password: newPassword })
	}

	const addBlog = async (blogObject) => {
		return addBlogMutation.mutateAsync(blogObject)
	}

	const updateBlog = async (blogObject) => {
		return updateBlogMutation.mutateAsync(blogObject)
	}

	const removeBlog = async (blogObject) => {
		return removeBlogMutation.mutateAsync(blogObject)
	}

	const handleNameFieldChange = (event) => {
		setNewUserName(event.target.value)
		console.log(event.target.value)
	}
	const handlePasswordFieldChange = (event) => {
		setNewPassword(event.target.value)
		console.log(event.target.value)
	}

	return (
		<div>
			<Notification />
			<LoginScreen
				user={user}
				blogs={blogs}
				newUserName={newUserName}
				newPassword={newPassword}
				handleLoginSubmission={handleLoginSubmission}
				handleNameFieldChange={handleNameFieldChange}
				handlePasswordFieldChange={handlePasswordFieldChange}
				name={name}
				handleLogout={handleLogout}
				blogFormRef={blogFormRef}
				addBlog={addBlog}
				updateBlog={updateBlog}
				removeBlog={removeBlog}
			/>
		</div>
	)
}

export default App
