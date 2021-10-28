const toString = Object.prototype.toString

export function isObject(val: any): val is Object {
  return toString.call(val) === '[object object]'
}

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
