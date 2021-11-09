import axios from '../../src/index'

const url = `http://localhost:3000/`

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  withCredentials: true,
  baseURL: 'http://localhost:3000/'
})
const config = {
  url: '/banner',
  params: {
    type: 1
  },
  baseURL: url
}

console.log(axios.getUri(config))
