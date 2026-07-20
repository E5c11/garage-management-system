# manager-fault-dashboard-screen

**Work type:** feature

## Objective

Build the manager/service-adviser dashboard screen: two tables, Active and Todo, listing faults from the shared in-memory store (from the fault-data-foundation task). Clicking a fault opens a detail/edit view where the manager can change its priority/urgency, and mark it complete, complete-but-awaiting-payment, or otherwise update its status. Active vs Todo table placement reflects whether the fault has been triaged/edited by a manager yet.

## Initiative

Part of initiative `garage-fault-triage-showcase`.
Depends on: garage-management-system/fault-data-foundation

## Components

- `garage-management-system`

## Referenced architecture documents

- `PLAT-WEB-NEXT`
- `PLAT-WEB-NEXT-APP`

## Scope boundary

No customer submission UI here (separate task: customer-fault-submission-screen). No data model or storage changes here — consume the list/get/update Server Actions from fault-data-foundation as-is. No authentication/authorization for the manager route. affected_systems/questions_for_customer/suggested_inspection_items are plain editable text/array fields in this task, not AI-generated (no AI triage logic in scope here).

## Completion conditions

- A manager-facing route renders two tables, Active and Todo, populated from the shared list-faults Server Action
- Todo holds faults a manager has not yet edited/triaged; Active holds faults a manager has edited (or otherwise progressed) — table placement rule is implemented and visible
- Clicking a fault row opens a view/edit interface for that single fault
- From the edit view, a manager can change the fault's priority/urgency
- From the edit view, a manager can set status to complete, or to complete-but-awaiting-payment (await_payment), or otherwise update status (not_started/scheduled)
- Edits are persisted via the shared update-fault Server Action from fault-data-foundation and reflected in the table on return
- npm run build succeeds with no type errors
