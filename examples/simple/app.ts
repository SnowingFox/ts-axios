import axios from '../../src/index'

const url = 'http://localhost:8081/simple/post'

axios({
  url,
  method: 'post',
  data: {
    a: 1,
    b: {
      c: 2
    }
  },
}).then(res => console.log(res))