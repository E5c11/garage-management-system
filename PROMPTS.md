## Prompt 1
I have recieved this task:
[Pasted text #1]
This should be a 2 screen app, one for the customer faults one for the manager's portal where they can view all fault in a table and have the ability to view, by clicking on an item and edit the fault report, by either changing the priority or marking it
as complete or marking it as complete but waiting payment.
Architecture: Next.js + React + server-side in-memory storage.
This should be a 2 screen app, one for the customer faults one for the manager's portal where they can view all fault in a table and have the ability to view, by clicking on an item and edit the fault report, by either changing the priority or marking it as
complete or marking it as complete but waiting payment.                                                                                                                                                                                                           
Architecture: Next.js + React + server-side in-memory storage.                                                                                                                                                                                                    
Onboard this repo through escape-ai-orchestrator's CLI directly (repository add/analyze/answer/apply) - /home/emmanuel/PycharmProjects/esc-ai-orchestrator.                                                                                                       
Use the file-based subcommands, not an interactive session. Register esc-ai-architecture-framework in registry.yaml's frameworks route.                                                                                                                           
Commit after onboarding.                                                                                                                                                                                                                                          
Use escape-ai to implement the two screens.                                                                                                                                                                                                                       
Customer screen should have a form based input: Customer name, car_metadata (brand + model), description, urgency, saftey_advice (optional). Add a submit button at the bottom, once written to storage Inform the user their fault has been logged.              
Manager screen should have a table that displays the faults. Two tables should be present: Active and Todo                                                                                                                                                        
Active should be the edited items, on top of the fault data, add: affected_systems (array), questions_for_customer (array), suggested_inspection_items, status (complete/await_payment/not_started/scheduled) (not nullable, default = not_started),              
scheduled_for.                                                                                                                                                                                                                                                    
After onboarding, create the tasks in the workflow with a dependency graph of the tasks to indicate for parallel agents                                                                                                                                           
Report back after task creation for me to review the task dependency graph 

## Prompt 2
Run the tasks — start with fault-data-foundation

## Prompt 3
Yes, kick off both in parallel

## Prompt 4
There are 5 reported errors on teh manager screen, look into and fix them then report back.  
Console logs

## Prompt 5
There are 5 reported errors on teh manager screen, look into and fix them then report back.                                                                                                                                                                       

## Prompt 6
Add testing instructions in `README.md` for both the Customer and Manager Screen, include the manager screen route.     
