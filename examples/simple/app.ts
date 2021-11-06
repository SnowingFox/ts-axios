import axios from '../../src/index'

const url = 'http://localhost:8082/simple/get'

axios.interceptors.request.use(config => {
  config.headers.test = '1'

  return config
})

axios.interceptors.request.use(config => {
  config.headers.test += '2'

  return config
})

axios.interceptors.request.use(config => {
  config.headers.test += '3'

  return config
})



axios.interceptors.response.use(res => {
  res.data = res

  return res
})

axios(url, {
  data: {
    type: 1
  }
}).then(res => {
  console.log(res)
})
