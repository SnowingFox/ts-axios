import { ICancel } from '../types'

export default class Cancel implements ICancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(val: any): boolean {
  return val instanceof Cancel
}
