import axios from '../../src/index'

const url = `http://localhost:3000/`

axios.defaults.baseURL = url

function getA() {
  return axios.get('/banner', {
    type: 1
  })
}

function getB() {
  return axios.get('/banner', {
    type: 2
  })
}

axios.interceptors.response.use(function(res) {
  return res
})

function a(callback: (resolve, reject?) => any): any {
  let resolve = 1
  let reject = 2

  callback(resolve, reject)
}

a(([resolve]) => {})
