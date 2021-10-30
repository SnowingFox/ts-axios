import axios from '../../src/index'

const url = 'http://localhost:3000/search'

axios({
  url,
  method: 'post',
  data: {
    keywords: 'Intro'
  },
  timeout: 1000
}).then(res => console.log(res)).catch(e => {
  console.log(e.message)
})