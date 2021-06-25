Feature: Specify number of events

Scenario: Default number of events is showing
Given the user hasn't changed the number of events
When the user opens the app
Then the user should see a list of events matching default number

Scenario: When user changes number of events, events showing changes to match that number
Given the app is open
When the user changes number of events
Then the user should see a list of events equal to that number