'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import {
  submitFaultReport,
  type SubmitFaultReportState,
} from './lib/faults/actions'

const initialState: SubmitFaultReportState = { status: 'idle' }

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
    >
      {pending ? 'Submitting…' : 'Submit fault report'}
    </button>
  )
}

export function FaultReportForm() {
  const [state, formAction] = useActionState(submitFaultReport, initialState)

  if (state.status === 'success' && state.fault) {
    const fault = state.fault
    return (
      <div className="w-full max-w-lg rounded-lg border border-black/[.08] p-6 dark:border-white/[.145]">
        <h2 className="text-lg font-semibold">Fault logged</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Thanks, {fault.customer_name}. We&apos;ve logged the fault on your{' '}
          {fault.car_metadata.brand} {fault.car_metadata.model} and a service
          adviser will follow up.
        </p>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
          <dt className="text-zinc-500">Reference</dt>
          <dd>{fault.id}</dd>
          <dt className="text-zinc-500">Urgency</dt>
          <dd className="capitalize">{fault.urgency}</dd>
        </dl>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full border border-black/[.08] px-5 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        >
          Report another fault
        </Link>
      </div>
    )
  }

  const errors = state.status === 'error' ? state.errors : undefined

  return (
    <form
      action={formAction}
      className="flex w-full max-w-lg flex-col gap-4"
      noValidate
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="customer_name" className="text-sm font-medium">
          Customer name
        </label>
        <input
          id="customer_name"
          name="customer_name"
          type="text"
          required
          className="rounded-md border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
        />
        {errors?.customer_name && (
          <p className="text-sm text-red-600">{errors.customer_name}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="brand" className="text-sm font-medium">
            Car brand
          </label>
          <input
            id="brand"
            name="brand"
            type="text"
            required
            className="rounded-md border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
          />
          {errors?.brand && (
            <p className="text-sm text-red-600">{errors.brand}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="model" className="text-sm font-medium">
            Car model
          </label>
          <input
            id="model"
            name="model"
            type="text"
            required
            className="rounded-md border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
          />
          {errors?.model && (
            <p className="text-sm text-red-600">{errors.model}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          className="rounded-md border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
        />
        {errors?.description && (
          <p className="text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="urgency" className="text-sm font-medium">
          Urgency
        </label>
        <select
          id="urgency"
          name="urgency"
          required
          defaultValue=""
          className="rounded-md border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
        >
          <option value="" disabled>
            Select urgency
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors?.urgency && (
          <p className="text-sm text-red-600">{errors.urgency}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="safety_advice" className="text-sm font-medium">
          Safety advice <span className="text-zinc-500">(optional)</span>
        </label>
        <textarea
          id="safety_advice"
          name="safety_advice"
          rows={2}
          placeholder="e.g. Avoid driving until inspected"
          className="rounded-md border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
        />
      </div>

      <SubmitButton />
    </form>
  )
}
