import { deepMerge, isPlainObject } from '../helpers/utils'
import { AxiosRequestConfig } from '../types'

const strats = Object.create(null)

function defaultStrat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }

  return val1
}

/**
 * Only accept user's configuration
 * @param val1 defaults' configuration
 * @param val2 user's configuration
 * @returns
 */
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const stratFromVal2 = ['url', 'param', 'data']

stratFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

function deepMergeStrats(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else {
    return val1
  }
}

const stratKeysDeepMerge = ['headers', 'auth']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMerge
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config: AxiosRequestConfig = Object.create(null)

  //Merge the configuration sent by user first
  for (let key in config2) {
    mergeFiled(key)
  }

  /**
   * Merge the configuration which doesn't exist in config2 from config1
   * Finally, if key exist in config1 & config2, config2[key] will cover config1[key]
   */
  for (let key in config1) {
    if (!config2[key]) {
      mergeFiled(key)
    }
  }

  function mergeFiled(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
