'use client'

import { useActionState } from 'react'
import type { Fault } from '@/app/lib/faults/types'
import { saveFaultTriage, type SaveFaultState } from './actions'

const initialState: SaveFaultState = { status: 'idle' }

export function FaultEditForm({ fault }: { fault: Fault }) {
  const action = saveFaultTriage.bind(null, fault.id)
  const [state, formAction, pending] = useActionState(action, initialState)
  const current = state.fault ?? fault

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Urgency
          <select
            name="urgency"
            defaultValue={current.urgency}
            className="rounded border border-zinc-300 px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Status
          <select
            name="status"
            defaultValue={current.status}
            className="rounded border border-zinc-300 px-3 py-2"
          >
            <option value="not_started">Not started</option>
            <option value="scheduled">Scheduled</option>
            <option value="await_payment">Complete — awaiting payment</option>
            <option value="complete">Complete</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        Scheduled for
        <input
          type="date"
          name="scheduled_for"
          defaultValue={current.scheduled_for ?? ''}
          className="rounded border border-zinc-300 px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Affected systems (one per line)
        <textarea
          name="affected_systems"
          defaultValue={(current.affected_systems ?? []).join('\n')}
          rows={3}
          className="rounded border border-zinc-300 px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Questions for customer (one per line)
        <textarea
          name="questions_for_customer"
          defaultValue={(current.questions_for_customer ?? []).join('\n')}
          rows={3}
          className="rounded border border-zinc-300 px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Suggested inspection items (one per line)
        <textarea
          name="suggested_inspection_items"
          defaultValue={(current.suggested_inspection_items ?? []).join('\n')}
          rows={3}
          className="rounded border border-zinc-300 px-3 py-2"
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {pending ? 'Saving…' : 'Save changes'}
        </button>
        {state.status === 'success' && (
          <span className="text-sm text-green-600">Saved.</span>
        )}
        {state.status === 'error' && (
          <span className="text-sm text-red-600">{state.message}</span>
        )}
      </div>
    </form>
  )
}
