import axios from '../../src/index'

const url = 'http://localhost:8082/simple/get'

axios.defaults.headers.get['Content-Type'] = '1'

axios.get(url).then(res => {
  console.log(res.data)
})
