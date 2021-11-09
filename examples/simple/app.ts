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

axios.all([getA(), getB()]).then(res => {
  const [resA, resB] = res

  console.log(resA, resB)
})
axios.interceptors.response.use(function(res) {
  return res
})
