# customer-fault-submission-screen

**Work type:** feature

## Objective

Build the customer-facing fault-report submission screen: a form with Customer name, car_metadata (brand + model), description, urgency, and optional safety_advice, plus a submit button at the bottom. On submit, write a new fault record to the shared in-memory store (from the fault-data-foundation task) and show the customer a confirmation that their fault has been logged.

## Initiative

Part of initiative `garage-fault-triage-showcase`.
Depends on: garage-management-system/fault-data-foundation

## Components

- `garage-management-system`

## Referenced architecture documents

- `PLAT-WEB-NEXT`
- `PLAT-WEB-NEXT-APP`

## Scope boundary

No manager/dashboard UI here (separate task: manager-fault-dashboard-screen). No data model or storage changes here — consume the create-fault Server Action from fault-data-foundation as-is. No client-side validation library — plain HTML/React required-field validation is enough.

## Completion conditions

- A customer-facing route renders a form with fields: Customer name, car brand, car model, description, urgency, and an optional safety_advice field
- A submit button at the bottom of the form calls the shared create-fault Server Action from fault-data-foundation
- On successful submission, the user sees a clear on-screen confirmation that their fault has been logged (no silent success, no dead-end)
- Required fields (customer name, brand, model, description, urgency) cannot be submitted empty; safety_advice is optional
- npm run build succeeds with no type errors
