import axios from '../../src/index'

const url = 'http://localhost:3000/banner'

const instance = axios.create()

document.cookie = 'a=b'

instance(url, {
  withCredentials: true
}).then(res => {
  console.log(res)
})
