import axios from '../../src/index'

const url = 'http://localhost:3000/banner'

axios.interceptors.request.use(config => {
  config.headers.test += '1'

  return config
})

axios.interceptors.response.use(res => {
  res.data = res.data

  return res
})

axios(url, {
  headers: {
    'test-type': 'appl',
    test: 2
  }
}).then(res => {
  console.log(res)
})
