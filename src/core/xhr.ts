import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import { parseAllHeaders } from '../helpers/headers'
import createError from '../helpers/error'
import { isSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName
    } = config

    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url!, true)

    if (withCredentials) {
      request.withCredentials = withCredentials
    }

    if ((withCredentials || isSameOrigin(url!)) && xsrfCookieName) {
      const xsrfVal = cookie.read(xsrfCookieName)

      if (xsrfVal && xsrfHeaderName) {
        headers[xsrfHeaderName] = xsrfVal
      }
    }

    Object.keys(headers).forEach(name => {
      if (
        data === null &&
        name.toLowerCase() === 'content-type' &&
        method.toLowerCase() !== 'get'
      ) {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (timeout) {
      request.timeout = timeout
    }

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.onerror = () => {
      reject(
        createError({
          name: 'Network',
          message: 'Network Error',
          config,
          code: null,
          request
        })
      )
    }

    request.ontimeout = () => {
      reject(
        createError({
          name: 'Timeout',
          message: `Timeout of ${timeout} exceeded`,
          config,
          code: 'ECONNABORTED',
          request
        })
      )
    }
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responeseHeaders = request.getAllResponseHeaders()
      const responeseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responeseData,
        status: request.status,
        statusText: request.statusText,
        headers: parseAllHeaders(responeseHeaders),
        config,
        request: request
      }

      handleResponse(response)
    }

    request.send(data)

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError({
            name: 'Faild Request',
            message: `Faild request with status code ${response.status}`,
            config,
            request,
            response
          })
        )
      }
    }
  })
}
