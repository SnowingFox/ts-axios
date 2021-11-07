import axios, { AxiosTransformer } from '../../src/index'

const url = 'http://localhost:8082/simple/post'

axios({
  transformRequest: [
    function(data, headers) {
      headers.test = 1
      return data
    }
  ],
  transformResponse: [
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ],
  url,
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data)
})
