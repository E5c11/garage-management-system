'use client'

import { useRouter } from 'next/navigation'
import type { Fault } from '@/app/lib/faults/types'
import { StatusBadge, UrgencyBadge, formatDate } from './lib/labels'

export function FaultTable({
  title,
  description,
  faults,
  emptyMessage,
}: {
  title: string
  description: string
  faults: Fault[]
  emptyMessage: string
}) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mb-3 text-sm text-zinc-500">{description}</p>
      {faults.length === 0 ? (
        <p className="rounded-md border border-dashed border-zinc-300 px-4 py-6 text-center text-sm text-zinc-500">
          {emptyMessage}
        </p>
      ) : (
        <div className="overflow-hidden rounded-md border border-zinc-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-4 py-2 font-medium">Customer</th>
                <th className="px-4 py-2 font-medium">Vehicle</th>
                <th className="px-4 py-2 font-medium">Description</th>
                <th className="px-4 py-2 font-medium">Urgency</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {faults.map((fault) => (
                <FaultRow key={fault.id} fault={fault} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

function FaultRow({ fault }: { fault: Fault }) {
  const router = useRouter()
  const href = `/manager/${fault.id}`

  return (
    <tr
      role="link"
      tabIndex={0}
      onClick={() => router.push(href)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') router.push(href)
      }}
      className="cursor-pointer hover:bg-zinc-50"
    >
      <td className="px-4 py-3 font-medium">{fault.customer_name}</td>
      <td className="px-4 py-3 whitespace-nowrap">
        {fault.car_metadata.brand} {fault.car_metadata.model}
      </td>
      <td className="max-w-xs truncate px-4 py-3 text-zinc-600">
        {fault.description}
      </td>
      <td className="px-4 py-3">
        <UrgencyBadge urgency={fault.urgency} />
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={fault.status} />
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-zinc-500">
        {formatDate(fault.updated_at)}
      </td>
    </tr>
  )
}
