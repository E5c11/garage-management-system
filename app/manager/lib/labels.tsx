import type { FaultStatus, Urgency } from '@/app/lib/faults/types'

const URGENCY_STYLES: Record<Urgency, string> = {
  low: 'bg-zinc-100 text-zinc-700',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-red-100 text-red-800',
}

const STATUS_LABELS: Record<FaultStatus, string> = {
  not_started: 'Not started',
  scheduled: 'Scheduled',
  await_payment: 'Awaiting payment',
  complete: 'Complete',
}

const STATUS_STYLES: Record<FaultStatus, string> = {
  not_started: 'bg-zinc-100 text-zinc-700',
  scheduled: 'bg-blue-100 text-blue-800',
  await_payment: 'bg-amber-100 text-amber-800',
  complete: 'bg-green-100 text-green-800',
}

export function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${URGENCY_STYLES[urgency]}`}
    >
      {urgency}
    </span>
  )
}

export function StatusBadge({ status }: { status: FaultStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
