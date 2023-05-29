import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNewBlog = async (title, author, url) => {
  try {
    const response = await axios.post(baseUrl, {
      author,
      title,
      url
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

const updateBlog = async (blog) => {
  try {
    const response = await axios.put(baseUrl + '/' + blog.id, {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, postNewBlog, updateBlog, deleteBlog }