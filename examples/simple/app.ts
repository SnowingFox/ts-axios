import axios from '../../src/index'

const url = 'http://localhost:3000/banner'
document.cookie = 'a=b'
const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D',
  withCredentials: true
})

instance
  .get(url, {
    type: 1
  })
  .then(res => {
    console.log(res)
  })
