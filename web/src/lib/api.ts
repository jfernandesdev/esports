import axios from 'axios'

export const api = axios.create({
  // baseURL: 'http://localhost:6543',
  baseURL: 'https://api-esports-jfernandesdev.onrender.com',
})