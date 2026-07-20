import type { Fault } from '@/app/lib/faults/types'

/**
 * A fault has been triaged once a manager has saved an edit through the
 * update-fault Server Action, which is the only path that moves
 * updated_at away from its created_at value.
 */
export function isTriaged(fault: Fault): boolean {
  return fault.updated_at !== fault.created_at
}
