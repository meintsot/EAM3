import type ReasonType from './reason-type.enum'

interface BackendErrorType {
  status: number
  reason: ReasonType
}
