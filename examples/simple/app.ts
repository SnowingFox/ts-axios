import axios from '../../src/index'

const url = `http://localhost:8082/simple/get`

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  withCredentials: true
})

instance.interceptors.request.use(config => {
  config.onDownloadProgress = download

  return config
})

instance
  .get(url, {
    auth: {
      username: 'Jane',
      password: 'abc'
    }
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

function download(e: ProgressEvent) {
  console.log(e)
}
