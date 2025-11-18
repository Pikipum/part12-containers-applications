import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

const post = async (blog, token) => {
	console.log(token, blog)
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}
	console.log(config)
	const response = await axios.post(baseUrl, blog, config)
	return response.data
}

const put = async (id, blog, token) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}
	const response = await axios.put(`${baseUrl}/${id}`, blog, config)
	return response.data
}

const deleteBlog = async (id, token) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}
	const response = await axios.delete(`${baseUrl}/${id}`, config)
	return response.data
}

export default { getAll, post, put, deleteBlog }
