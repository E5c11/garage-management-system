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
