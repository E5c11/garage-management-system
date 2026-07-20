import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getFault } from '@/app/lib/faults/actions'
import { FaultEditForm } from './fault-edit-form'

export default async function FaultDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const fault = await getFault(id)
  if (!fault) notFound()

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <Link href="/manager" className="text-sm text-zinc-500 hover:underline">
        ← Back to dashboard
      </Link>

      <h1 className="mt-2 text-2xl font-semibold">{fault.customer_name}</h1>
      <p className="text-sm text-zinc-500">
        {fault.car_metadata.brand} {fault.car_metadata.model}
      </p>

      <div className="mt-4 rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm">
        <p className="font-medium text-zinc-700">Reported description</p>
        <p className="mt-1 whitespace-pre-wrap text-zinc-600">
          {fault.description}
        </p>
        {fault.safety_advice && (
          <>
            <p className="mt-3 font-medium text-zinc-700">Safety advice given</p>
            <p className="mt-1 whitespace-pre-wrap text-zinc-600">
              {fault.safety_advice}
            </p>
          </>
        )}
      </div>

      <FaultEditForm fault={fault} />
    </div>
  )
}
