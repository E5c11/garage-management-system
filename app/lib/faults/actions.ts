'use server'

import { revalidatePath } from 'next/cache'
import {
  applyFaultUpdate,
  insertFault,
  selectAllFaults,
  selectFault,
} from './store'
import type { CreateFaultInput, Fault, UpdateFaultInput } from './types'

export async function createFault(input: CreateFaultInput): Promise<Fault> {
  const fault = insertFault(input)
  revalidatePath('/', 'layout')
  return fault
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
