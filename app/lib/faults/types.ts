export type Urgency = 'low' | 'medium' | 'high'

export type FaultStatus = 'not_started' | 'scheduled' | 'await_payment' | 'complete'

export interface CarMetadata {
  brand: string
  model: string
}

export interface Fault {
  id: string
  customer_name: string
  car_metadata: CarMetadata
  description: string
  urgency: Urgency
  safety_advice?: string
  affected_systems: string[]
  questions_for_customer: string[]
  suggested_inspection_items: string[]
  status: FaultStatus
  scheduled_for?: string
  created_at: string
  updated_at: string
}

/** Customer intake shape only — manager fields are seeded with defaults on create. */
export interface CreateFaultInput {
  customer_name: string
  car_metadata: CarMetadata
  description: string
  urgency: Urgency
  safety_advice?: string
}

/** Manager-editable fields only — customer intake fields are not editable through this path. */
export interface UpdateFaultInput {
  urgency?: Urgency
  status?: FaultStatus
  scheduled_for?: string
  affected_systems?: string[]
  questions_for_customer?: string[]
  suggested_inspection_items?: string[]
}
