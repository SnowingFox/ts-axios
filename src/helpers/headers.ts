import { Method } from '../types'
import { isPlainObject, isEmptyPlainObject, deepMerge } from './utils'

/**
 * Converts the user's configuration header name to a standard header name
 * @param headers Xhr headers
 * @param normalizedName Transformed name
 * @returns
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (!isEmptyPlainObject(headers) && headers['Content-Type'] === undefined) {
      headers['Content-Type'] = 'application/json'
    }

    if (isEmptyPlainObject(headers)) {
      headers['Content-Type'] = 'application/json'
    }
  }

  return headers
}

export function parseAllHeaders(headers: any): any {
  if (typeof headers !== 'string') {
    return
  }
  let parsed = Object.create(null)
  headers.split('\r\n').forEach(item => {
    let [key, val] = item.split(':')
    key = key.trim().toLowerCase()
    //If key is '', this loop time will be end
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
