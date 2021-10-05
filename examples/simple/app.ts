import axios from '../../src/index'

const url = 'http://localhost/index.php/learn/request'

axios({
  method: 'get',
  url,
  params: {
    authors: [{ name: 'John' }, { name: 'Jane' }],
    email: 'safmaasf@qq.com'
  }
})
