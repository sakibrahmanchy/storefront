import userService from './user';

export const API_URL = 'http://localhost:3001/api';

const api = (
  url,
  { body = undefined, token = undefined, method = 'GET' } = {},
) => {
  return fetch(`${API_URL}/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        userService.userValue ? userService.userValue.token : ''
      }`,
    },
    body,
  })
    .then((res) => {
      if (res.status === 401) {
        userService.logout();
      } else return res.json();
    })
    .catch((err) => err)
    .then((res) => res);
};

export default api;
