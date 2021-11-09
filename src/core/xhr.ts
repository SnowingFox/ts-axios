import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import { parseAllHeaders } from '../helpers/headers'
import createError from '../helpers/error'
import { isSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/utils'

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
      xsrfHeaderName,
      auth,
      onDownloadProgress,
      onUploadProgress,
      validateStatus
    } = config

    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url!, true)

    processHeaders()

    addEvents()

    processCancel()

    request.send(data)

    function processHeaders(): void {
      if (withCredentials) {
        request.withCredentials = withCredentials
      }

      if ((withCredentials || isSameOrigin(url!)) && xsrfCookieName) {
        const xsrfVal = cookie.read(xsrfCookieName)

        if (xsrfVal && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfVal
        }
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(`${auth.username}:${auth.password}`)
      }

      /**
       * Delete Content-Type when data type is formdata
       * Because brower will automatic add formdata header
       */
      if (isFormData(data)) {
        delete headers['Content-Type']
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
    }

    function addEvents(): void {
      if (timeout) {
        request.timeout = timeout
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

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
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
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse) {
      if (validateStatus && validateStatus(response.status)) {
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
