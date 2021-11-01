import {
  Axios as AxiosInterface,
  AxiosPromise,
  AxiosRequestConfig,
  Method
} from '../types/interface'
import dispatchRequest from './dispatchRequest'

export default class Axios implements AxiosInterface {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthoutData('get', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthoutData('head', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthoutData('delete', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthData('post', data, url, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthData('put', data, url, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthData('patch', data, url, config)
  }

  requestWidthoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  requestWidthData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
