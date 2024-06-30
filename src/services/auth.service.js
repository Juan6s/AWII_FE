import axios from 'axios';

export async function login(email, password) {
  const response = await axios.post('http://localhost:3000/login', { email, password });
  localStorage.setItem('auth', response.data);
}

export async function register(email, password) {
  await axios.post('http://localhost:3000/register', { email, password });
}

export async function getToken() {
  return localStorage.getItem('auth');
}

export async function deleteToken() {
  localStorage.removeItem('auth');
}
