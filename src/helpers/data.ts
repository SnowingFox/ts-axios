import { AxiosTransformer } from '../types'
import { isPlainObject } from './utils'
import defaults from '../defaults'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function processResponeseData(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      //...
    }
  }

  return data
}

/**
 * Synatx sugar which avoids surplus grammer [...defaults.transformResponse]
 * @param fns AxiosTransformer
 * @returns [..., function(), defaults.transformResponse]
 */
export function processTransformResponse(fns: AxiosTransformer | AxiosTransformer[]): any {
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  if (!Array.isArray(defaults.transformResponse)) {
    fns.push(defaults.transformResponse!)
  } else {
    fns.push(...defaults.transformResponse!)
  }

  return fns
}

/**
 * Synatx sugar which avoids surplus grammer [...defaults.transformRequest]
 * @param fns AxiosTransformer
 * @returns [defaults.transformRequest, function, ...]
 */
export function processTransformRequest(fns: AxiosTransformer | AxiosTransformer[]): any {
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  if (!Array.isArray(defaults.transformRequest)) {
    fns.unshift(defaults.transformRequest!)
  } else {
    fns.unshift(...defaults.transformRequest!)
  }

  return fns
}
