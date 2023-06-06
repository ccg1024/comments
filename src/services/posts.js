import { makeRequest } from './makeRequest'

export function getPosts() {
  return makeRequest('/posts')
}

export function getPost(id) {
  return makeRequest(`/posts/${id}`)
}

export function createPost({ title, body }) {
  return makeRequest('/post/create', {
    method: 'POST',
    data: { title, body }
  })
}
