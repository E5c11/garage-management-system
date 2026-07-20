'use server'

import { revalidatePath } from 'next/cache'
import { updateFault } from '@/app/lib/faults/actions'
import type { Fault, FaultStatus, Urgency } from '@/app/lib/faults/types'

export type SaveFaultState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fault?: Fault
}

const URGENCY_VALUES: Urgency[] = ['low', 'medium', 'high']
const STATUS_VALUES: FaultStatus[] = [
  'not_started',
  'scheduled',
  'await_payment',
  'complete',
]

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export async function saveFaultTriage(
  id: string,
  _prevState: SaveFaultState,
  formData: FormData
): Promise<SaveFaultState> {
  const urgency = String(formData.get('urgency') ?? '')
  const status = String(formData.get('status') ?? '')
  const scheduled_for = String(formData.get('scheduled_for') ?? '').trim()

  if (!URGENCY_VALUES.includes(urgency as Urgency)) {
    return { status: 'error', message: 'Select a valid urgency.' }
  }
  if (!STATUS_VALUES.includes(status as FaultStatus)) {
    return { status: 'error', message: 'Select a valid status.' }
  }

  const fault = await updateFault(id, {
    urgency: urgency as Urgency,
    status: status as FaultStatus,
    scheduled_for: scheduled_for || undefined,
    affected_systems: parseLines(formData.get('affected_systems')),
    questions_for_customer: parseLines(formData.get('questions_for_customer')),
    suggested_inspection_items: parseLines(
      formData.get('suggested_inspection_items')
    ),
  })

  if (!fault) {
    return { status: 'error', message: 'Fault not found.' }
  }

  revalidatePath('/manager')
  revalidatePath(`/manager/${id}`)
  return { status: 'success', fault }
}
