import axios from "../config/request.config"

export const AUTH_ERRORS = {
    LOGIN: "Failed when logining"
} 

export async function login(email, password) {
  try {
    const response = await axios.post('http://localhost:3000/login', { email, password });
    localStorage.setItem('auth', response.data);
    return {response}
  } catch (error) {
    return {error: AUTH_ERRORS.LOGIN}
  }
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
