import axios from '../../src/index'

const url = `http://localhost:3000/banner`

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  withCredentials: true,
  baseURL: 'http://localhost:3000/'
})

instance.interceptors.request.use(config => {
  config.onDownloadProgress = download

  return config
})

instance
  .get('/banner', {
    params: {
      type: 1
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
