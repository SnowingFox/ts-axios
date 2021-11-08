import axios, { AxiosTransformer, Canceler } from '../../src/index'

const url = 'http://localhost:3000/banner'

const instance = axios.create()
const CancelToken = axios.CancelToken
const source = CancelToken.source()
console.log(source.token)
let cancel
axios
  .get(url, {
    cancelToken: source.token
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
source.cancel('1')
