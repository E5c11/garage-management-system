import { FaultReportForm } from './fault-report-form'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center gap-6 bg-white px-16 py-20 dark:bg-black">
        <div className="flex w-full max-w-lg flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Report a vehicle fault
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Tell us what&apos;s wrong and a service adviser will follow up.
          </p>
        </div>
        <FaultReportForm />
      </main>
    </div>
  )
}
