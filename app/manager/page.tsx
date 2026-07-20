import { listFaults } from '@/app/lib/faults/actions'
import { FaultTable } from './fault-table'
import { isTriaged } from './lib/triage'

export default async function ManagerDashboardPage() {
  const faults = await listFaults()
  const todo = faults.filter((fault) => !isTriaged(fault))
  const active = faults.filter(isTriaged)

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">Fault dashboard</h1>
      <p className="mb-8 text-sm text-zinc-500">
        Faults reported by customers, waiting for triage or already in progress.
      </p>

      <FaultTable
        title="Todo"
        description="Not yet triaged by a manager."
        faults={todo}
        emptyMessage="No faults waiting for triage."
      />

      <FaultTable
        title="Active"
        description="Triaged and being tracked to completion."
        faults={active}
        emptyMessage="No active faults."
      />
    </div>
  )
}
