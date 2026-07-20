# Garage Management System

A small Next.js app that turns a customer's free-text vehicle fault description into
something structured and useful for a service adviser: a customer-facing submission
screen, and a manager/adviser dashboard for triaging and resolving faults.

Storage is a module-level in-memory store (see `app/lib/faults/store.ts`) — no
database. Data resets whenever the server process restarts.

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Testing the Customer screen

Route: `/` (the app's home page)

1. Go to `http://localhost:3000/`.
2. Fill in the form: Customer name, car brand, car model, description, urgency, and
   optionally safety advice.
3. Try submitting with a required field left blank — you should see an inline error
   for each missing field and nothing gets saved.
4. Fill in all required fields and click **Submit fault report**.
5. You should see a confirmation panel ("Fault logged") showing a reference ID and
   the urgency you selected. Click **Report another fault** to submit another one.

## Testing the Manager screen

Route: `/manager`

1. Submit at least one fault via the Customer screen first (`/`) — the dashboard is
   empty until there's data.
2. Go to `http://localhost:3000/manager`. Newly submitted, untouched faults appear in
   the **Todo** table.
3. Click any row to open that fault's detail/edit view at `/manager/<id>`. You'll see
   the customer's reported description and safety advice (if given).
4. Change urgency and/or status (Not started / Scheduled / Complete — awaiting
   payment / Complete), optionally set a scheduled date, and fill in affected
   systems / questions for the customer / suggested inspection items (one per line).
5. Click **Save changes**, then **Back to dashboard**. The fault you just edited
   should now appear in the **Active** table instead of Todo — a fault moves from
   Todo to Active the first time a manager saves an edit on it.
6. Re-open the fault and confirm your edits persisted (still backed by the same
   in-memory store, so this only holds until the server restarts).

## Trade-offs & what I'd do for production

Built to a ~3 hour take-home scope. Storage is an in-memory `Map` (`app/lib/faults/store.ts`)
by design — no database, no auth, single process, data lost on restart. Everything
below is scoped by that constraint; here's what real production use would need.

### Testing

There are no automated tests today — verification was manual (`npm run lint` /
`npm run build`, clicking through both screens). This codebase splits into three
testability tiers, worth knowing before adding a suite:

- **Unit-testable now, no mocking:** `app/manager/lib/triage.ts` (`isTriaged`),
  `app/manager/lib/labels.tsx` (badges, `formatDate`), and `app/page.tsx` (a plain,
  non-async component). `app/lib/faults/store.ts`'s CRUD functions are testable too,
  but the module-level `Map` has no reset hook — tests would leak state across cases
  without adding a `__resetForTests()` export or re-importing the module per test.
- **Testable with mocking:** `app/lib/faults/actions.ts` and
  `app/manager/[id]/actions.ts` both call `revalidatePath` (`next/cache`), which
  throws outside a real request context — needs
  `vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))`. The client components
  that call `useRouter()` or bind directly to a Server Action
  (`fault-table.tsx`, `fault-report-form.tsx`, `fault-edit-form.tsx`) need
  `next/navigation` and/or the bound action mocked.
- **Not unit-testable at all:** `app/manager/page.tsx` and `app/manager/[id]/page.tsx`
  are `async function` Server Components that `await` data directly — this Next.js
  version's own docs (`node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md`)
  say Vitest doesn't support async Server Components and recommends E2E instead. This
  is most of the actual dashboard/detail-view logic, so real coverage here means
  Playwright, not unit tests.

Production plan: Vitest for the pure logic and mocked actions/components above, plus
a small store reset hook for test isolation; Playwright for the two dashboard pages
and the full submit → triage → resolve flow end to end.

### Error handling & edge cases

What exists: server-side required-field and enum validation in `submitFaultReport`
and `saveFaultTriage` (not just relying on HTML `required`), a "Fault not found"
error path, and `notFound()` → real 404 for an unknown fault ID.

What's missing:
- No `error.tsx` anywhere — an unhandled exception in a Server Component (e.g. a bug
  in `listFaults`) falls through to Next's generic error overlay, not a handled UI.
- No input length limits on free-text fields (description, safety advice, the
  manager's array fields) — someone could store arbitrarily large strings.
- No duplicate-submission guard — double-clicking Submit before the pending state
  disables the button (or a slow network) could create two fault records.
- No handling of concurrent edits — fine for one in-memory process, but a real
  multi-manager deployment would need optimistic-concurrency checks (e.g. an
  `updated_at`-based conflict check) before overwriting.

### UI loading & error states

What exists: `useFormStatus`'s `pending` disables the Submit/Save buttons and swaps
their label ("Submitting…" / "Saving…") on both forms.

What's missing:
- No `loading.tsx` for `/manager` or `/manager/[id]` — the App Router convention for
  a route-level loading skeleton isn't used, so navigating there just blocks until
  the async Server Component's data resolves. Invisible today because the in-memory
  store is effectively instant; would matter the moment there's real I/O latency.
- No `error.tsx` (see above) — no custom "something went wrong, retry" state.
- No optimistic UI on manager saves — the edit form waits for the full server
  round-trip and `revalidatePath` before showing the result. Acceptable at this
  scale; real usage might want an optimistic update with rollback on failure.

### API security

Currently there is none, deliberately out of scope for a same-machine take-home demo:

- **No authentication/authorization.** `/manager` is only "private" in that its URL
  isn't advertised on the customer screen — anyone who navigates there can view, edit,
  or triage every fault. Production needs real auth (adviser accounts/roles) and
  server-side enforcement, not a hidden route.
- **No rate limiting** on the customer submission action — it's spammable.
- **No audit trail** — `updateFault` overwrites fields in place; there's no record of
  who changed a status/priority or when, beyond the single `updated_at` timestamp.
- **No input sanitization beyond trim/required checks** — React's default escaping
  covers XSS for rendering, but there's no length/content policy on free text before
  it's stored.
- **No persistence-layer hardening yet** because there's no persistence layer — moving
  off the in-memory `Map` to a real database introduces its own surface (parameterized
  queries/ORM, connection secrets, migrations) that doesn't exist to secure today.
