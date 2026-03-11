# COBOL App Test Plan

This test plan documents the business logic of the current COBOL account management application. Use it to validate behaviour with stakeholders and later translate into automated unit/integration tests in the Node.js port.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|-----------------------|----------------|------------|-----------------|---------------|--------------------|----------|
| TC-01 | View balance from main menu | Application started with balance 1000.00 | 1. Run app 2. Select option 1 (View Balance) | Display "Current balance: 001000.00" and return to menu | | | Verify formatting if needed |
| TC-02 | Credit account with positive amount | App started, balance 1000.00 | 1. Run app 2. Select option 2 (Credit) 3. Enter amount 500 | Balance read as 1000.00, new balance 1500.00 displayed, storage updated | | | Ensure amount added correctly |
| TC-03 | Debit account with sufficient funds | App started, balance 1000.00 | 1. Run app 2. Select option 3 (Debit) 3. Enter amount 200 | Balance read as 1000.00, new balance 800.00 displayed, storage updated | | | | 
| TC-04 | Debit account with insufficient funds | App started, balance 1000.00 | 1. Run app 2. Select option 3 (Debit) 3. Enter amount 2000 | Balance read as 1000.00, message "Insufficient funds for this debit." displayed, balance unchanged | | | | 
| TC-05 | Handle invalid menu selection | App started | 1. Run app 2. Enter option 5 or non-numeric | Display "Invalid choice, please select 1-4." and re-display menu | | | | 
| TC-06 | Exit application | App started | 1. Run app 2. Enter option 4 | Program terminates with goodbye message | | | | 

*Note:* "Actual Result" and "Status" columns are to be filled during execution with stakeholders.

This plan covers all major business rules:
- Starting balance of 1000.00
- Viewing balance
- Crediting any positive amount
- Debiting only when sufficient funds exist
- Insufficient funds check
- User interface validation for menu selection
- Program loop and exit behavior
