import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import { beforeEach, describe, expect, test, vi } from 'vitest'

describe('rendering blogs', () => {
	let container
	beforeEach(() => {
		const blog = {
			id: 'aksd903jgfjae2',
			title: 'Test title',
			author: 'John Tester',
			blogUrl: 'testing.com',
			votes: 9,
		}
		container = render(<Blog blog={blog} />).container
	})

	test('renders title', () => {
		const div = container.querySelector('.blog')
		expect(div).toHaveTextContent('Test title')
	})
	test('renders author', () => {
		const div = container.querySelector('.blog')
		expect(div).toHaveTextContent('John Tester')
	})
	test('doesnt render url by default', () => {
		const div = container.querySelector('.blog')
		expect(div).not.toHaveTextContent('testing.com')
	})
	test('doesnt render votes by default', () => {
		const div = container.querySelector('.blog')
		expect(div).not.toHaveTextContent(9)
	})
})
describe('button pressed', async () => {
	let container
	beforeEach(() => {
		const blog = {
			id: 'aksd903jgfjae2',
			title: 'Test title',
			author: 'John Tester',
			blogUrl: 'testing.com',
			votes: 965,
			user: {
				name: 'John Blogger',
			},
		}
		const mockHandler = vi.fn()
		container = render(
			<Blog blog={blog} toggleVisibility={mockHandler} />,
		).container
	})
	test('url renders when show button pressed', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('Show')
		await user.click(button)
		const div = container.querySelector('.blog')

		expect(div).toHaveTextContent('testing.com')
	})
	test('votes renders when show button pressed', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('Show')
		await user.click(button)
		const div = container.querySelector('.blog')

		expect(div).toHaveTextContent(965)
	})
	test('user renders when show button pressed', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('Show')
		await user.click(button)
		const div = container.querySelector('.blog')

		expect(div).toHaveTextContent('John Blogger')
	})
})
describe('pressing vote button', async () => {
	let container
	let mockUpdate

	beforeEach(() => {
		const blog = {
			id: 'aksd903jgfjae2',
			title: 'Test title',
			author: 'John Tester',
			blogUrl: 'testing.com',
			votes: 965,
			user: {
				name: 'John Blogger',
			},
		}
		mockUpdate = vi.fn()
		const mockHandler = vi.fn()
		const mockRemove = vi.fn()
		const mockSetErrorMessage = vi.fn()
		container = render(
			<Blog
				blog={blog}
				toggleVisibility={mockHandler}
				updateBlog={mockUpdate}
				removeBlog={mockRemove}
				setErrorMessage={mockSetErrorMessage}
			/>,
		).container
	})
	test('like button pressed twice results in two function calls', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('Show')
		await user.click(button)
		const voteButton = screen.getByText('Like')
		await user.click(voteButton)
		await user.click(voteButton)

		expect(mockUpdate).toHaveBeenCalledTimes(2)
	})
})
describe('submitting forms', async () => {
	let container
	let mockAddBlog

	beforeEach(() => {
		mockAddBlog = vi.fn()
		const mockRef = vi.fn()
		const mockSetErrorMessage = vi.fn()
		container = render(
			<CreateBlogForm
				addBlog={mockAddBlog}
				blogFormRef={mockRef}
				setErrorMessage={mockSetErrorMessage}
			/>,
		).container
	})
	test('submitting blog has correct fields', async () => {
		const title = container.querySelector('#title-input')
		const author = container.querySelector('#author-input')
		const url = container.querySelector('#url-input')
		const button = screen.getByText('Create')

		await userEvent.type(title, 'testing blogs part 23893')
		await userEvent.type(author, 'John Tester')
		await userEvent.type(url, 'testingwithvitest.com')
		await userEvent.click(button)

		expect(mockAddBlog.mock.calls).toHaveLength(1)
		expect(mockAddBlog.mock.calls[0][0].title).toBe(
			'testing blogs part 23893',
		)
		expect(mockAddBlog.mock.calls[0][0].author).toBe('John Tester')
		expect(mockAddBlog.mock.calls[0][0].blogUrl).toBe(
			'testingwithvitest.com',
		)
	})
})
