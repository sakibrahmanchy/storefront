import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';
import api from './api';

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem('auth')),
);
const AUTH_KEY = 'auth';

const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  list: () => api('users'),
  fetchUserById: (id) => api(`users/${id}`),
  login: async (username, password) => {
    try {
      const response = await api('users/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
        token: undefined,
      });
      const { success = false, ...authItems } = response;
      if (success) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(authItems));
        userSubject.next(authItems);
        return authItems;
      } else {
        throw new Error(response.message);
      }
    } catch (e) {
      throw e;
    }
  },
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    userSubject.next(null);
    Router.push('/login');
  },
  register: (registerFormData) =>
    api('users', { method: 'POST', body: JSON.stringify(registerFormData) }),
  saveUserData: (id, userData) =>
    api(`users/${id}`, { method: 'PUT', body: JSON.stringify(userData) }),
  changePassword: (changePasswordData) =>
    api(`users/change-password`, {
      method: 'POST',
      body: JSON.stringify(changePasswordData),
    }),
};

export default userService;
