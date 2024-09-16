import axios from 'axios'

export const AuthoriseDotNetAxios = axios.create({
  baseURL: 'https://apitest.authorize.net/xml/v1/request.api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
