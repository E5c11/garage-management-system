import { randomUUID } from 'node:crypto'
import type { CreateFaultInput, Fault, UpdateFaultInput } from './types'

// Module-level in-memory store: persists across requests within this server
// process, reset on restart. No DB, no external persistence, by design.
const faults = new Map<string, Fault>()

export function insertFault(input: CreateFaultInput): Fault {
  const now = new Date().toISOString()
  const fault: Fault = {
    id: randomUUID(),
    customer_name: input.customer_name,
    car_metadata: input.car_metadata,
    description: input.description,
    urgency: input.urgency,
    safety_advice: input.safety_advice,
    affected_systems: null,
    questions_for_customer: null,
    suggested_inspection_items: null,
    status: 'not_started',
    scheduled_for: null,
    created_at: now,
    updated_at: now,
  }
  faults.set(fault.id, fault)
  return fault
}

export function selectAllFaults(): Fault[] {
  return Array.from(faults.values()).sort((a, b) =>
    b.created_at.localeCompare(a.created_at)
  )
}

export function selectFault(id: string): Fault | undefined {
  return faults.get(id)
}

export function applyFaultUpdate(
  id: string,
  patch: UpdateFaultInput
): Fault | undefined {
  const existing = faults.get(id)
  if (!existing) return undefined

  const updated: Fault = {
    ...existing,
    ...patch,
    updated_at: new Date().toISOString(),
  }
  faults.set(id, updated)
  return updated
}
