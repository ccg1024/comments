import { makeRequest } from './makeRequest'

export function getLogin(username, password) {
  return makeRequest('/login', {
    method: 'POST',
    data: { username, password }
  })
}

export function outLogin() {
  return makeRequest('/logout', {
    method: 'POST'
  })
}
