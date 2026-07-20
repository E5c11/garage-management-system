'use server'

import { revalidatePath } from 'next/cache'
import {
  applyFaultUpdate,
  insertFault,
  selectAllFaults,
  selectFault,
} from './store'
import type {
  CreateFaultInput,
  Fault,
  UpdateFaultInput,
  Urgency,
} from './types'

export async function createFault(input: CreateFaultInput): Promise<Fault> {
  const fault = insertFault(input)
  revalidatePath('/', 'layout')
  return fault
}

const URGENCY_VALUES: Urgency[] = ['low', 'medium', 'high']

export type SubmitFaultReportState = {
  status: 'idle' | 'error' | 'success'
  errors?: Partial<Record<'customer_name' | 'brand' | 'model' | 'description' | 'urgency', string>>
  fault?: Fault
}

/** Customer-facing entry point: validates untrusted FormData before writing to the store. */
export async function submitFaultReport(
  _prevState: SubmitFaultReportState,
  formData: FormData
): Promise<SubmitFaultReportState> {
  const customer_name = String(formData.get('customer_name') ?? '').trim()
  const brand = String(formData.get('brand') ?? '').trim()
  const model = String(formData.get('model') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  const urgency = String(formData.get('urgency') ?? '').trim()
  const safety_advice = String(formData.get('safety_advice') ?? '').trim()

  const errors: SubmitFaultReportState['errors'] = {}
  if (!customer_name) errors.customer_name = 'Enter your name.'
  if (!brand) errors.brand = 'Enter the car brand.'
  if (!model) errors.model = 'Enter the car model.'
  if (!description) errors.description = 'Describe the fault.'
  if (!URGENCY_VALUES.includes(urgency as Urgency)) {
    errors.urgency = 'Select an urgency.'
  }

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors }
  }

  const fault = await createFault({
    customer_name,
    car_metadata: { brand, model },
    description,
    urgency: urgency as Urgency,
    safety_advice: safety_advice || undefined,
  })

  return { status: 'success', fault }
}

export async function listFaults(): Promise<Fault[]> {
  return selectAllFaults()
}

export async function getFault(id: string): Promise<Fault | undefined> {
  return selectFault(id)
}

export async function updateFault(
  id: string,
  patch: UpdateFaultInput
): Promise<Fault | undefined> {
  const fault = applyFaultUpdate(id, patch)
  if (fault) {
    revalidatePath('/', 'layout')
  }
  return fault
}
