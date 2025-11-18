import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNotification } from '../NotificationContext'

const CreateBlogForm = ({ addBlog, blogFormRef }) => {
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')
	const [, dispatchNotification] = useNotification()

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			await addBlog({
				title: newTitle,
				author: newAuthor,
				blogUrl: newUrl,
			})
			setNewTitle('')
			setNewAuthor('')
			setNewUrl('')

			dispatchNotification({ type: 'SHOW', payload: `Blog "${newTitle}" submitted successfully!` })
			setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)
			if (blogFormRef && blogFormRef.current)
				blogFormRef.current.toggleVisibility()
		} catch (error) {
			dispatchNotification({ type: 'SHOW', payload: 'Could not submit blog.' })
			setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)
		}
	}

	return (
		<div className='blogDiv'>
			<h2>Create new blog</h2>
			<form onSubmit={handleSubmit}>
				<div>
					Title:{' '}
					<input
						name='title'
						value={newTitle}
						placeholder='blog title'
						id='title-input'
						onChange={(e) => setNewTitle(e.target.value)}
					/>
				</div>
				<div>
					Author:{' '}
					<input
						name='author'
						value={newAuthor}
						placeholder='author name'
						id='author-input'
						onChange={(e) => setNewAuthor(e.target.value)}
					/>
				</div>
				<div>
					URL:{' '}
					<input
						name='blogUrl'
						value={newUrl}
						placeholder='blog url'
						id='url-input'
						onChange={(e) => setNewUrl(e.target.value)}
					/>
				</div>
				<button type='submit'>Create</button>
			</form>
		</div>
	)
}

CreateBlogForm.propTypes = {
	addBlog: PropTypes.func.isRequired,
}

export default CreateBlogForm
