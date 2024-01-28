import type ReasonType from './types/reason-type.enum'
import { type BackendErrorType } from './types/backendError'

class BackendError extends Error {
  readonly details: BackendErrorType

  constructor (reason: ReasonType, status: number) {
    super(reason)
    this.details = {
      status,
      reason
    }
  }
}

export default BackendError
