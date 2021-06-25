Feature: Show/hide event details

Scenario: Event details are hidden by default
Given the user hasn't clicked on 'Details' button to show event's details
When the user opens the app
Then the event's details should be hidden

Scenario: Hidden event details are shown when user clicks on Details button
Given the event's details are hidden
When the user clicks on 'Details' button
Then the event's details should be visible

Scenario: Visible event details are hidden when user clicks on Details button
Given the event's details are visible
When the user clicks on 'Details' button
Then the event's details should be hidden