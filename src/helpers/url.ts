import { isPlainObject, isDate } from './utils'

interface URLOrigin {
  protocol: string
  host: string
}

function encode(url: string): string {
  return encodeURIComponent(url)
    .replace(/%3A/gi, ':')
    .replace(/%40/g, '@')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []
  let serializedParams

  if (isPlainObject(params)) {
    Object.keys(params).forEach(key => {
      const val = params[key]
      if (val === null || typeof val === 'undefined') {
        return
      }

      let values: any[] = []
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }
      //Ensure each val can build as string
      values.forEach(item => {
        if (isDate(item)) {
          item = item.toISOString()
        } else if (isPlainObject(item)) {
          item = JSON.stringify(item)
        }
        parts.push(`${encode(key)}=${encode(item)}`)
      })
    })
  }

  serializedParams = parts.join('&')

  if (serializedParams) {
    //Filter hash code
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    if (url.indexOf('?') === -1) {
      url = url + '?' + serializedParams
    } else {
      url = url + '&' + serializedParams
    }
  }

  return url
}

export function isSameOrigin(requestURL: string): boolean {
  const parsedOrgin = resolveURL(requestURL)

  return (
    parsedOrgin.protocol === currentOriginURL.protocol && parsedOrgin.host === currentOriginURL.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOriginURL = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}
