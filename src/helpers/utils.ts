const toString = Object.prototype.toString

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isEmptyPlainObject(val: any): val is Object {
  return JSON.stringify(val) === '{}'
}
