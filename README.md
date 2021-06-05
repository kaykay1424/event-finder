# Event Finder
Event Finder is a progressive web application built with React and a serverless background that is capable of working offline and lets users view upcoming events in various cities as well as filter events by city. 
## User Stories
- As a user, I should be able to show or hide an event so that I can see or hide its details.
    - Gherkin Syntax:
        - Given events have been loaded
        When user clicks on 'Details' button 
        Then details of event should expand and be visible to user.
        - Given event's details are currently visible
        When user clicks on 'Details' button
        Then details should collapse and be hidden from user.
- As a user, I should be able to change the number of events, so that I can see more than or less than the default number of 32 events.
    - Gherkin Syntax:
        - Given user hasn't specified number of events
        When user is on main page
        Then default number of 32 events will be displayed
        - Given user is on main page
        When user specifies number of events
        Then number of events will change to that number and number of events displayed will match that number
- As a user, I should be able to use the app offline, so that I can see my previously viewed events when there's no internet connection.
    - Gherkin Syntax:
        - Given user has no internet connection
        When user opens app
        Then user should see cached data
        - Given user has no internet connection
        When user changes settings
        Then error should be displayed to user
- As a user, I should be able to view a chart, so that I can see the number of upcoming events in each city.
    - Gherkin Syntax:
        - Given user hasn't selected city
        When user opens app
        Then user should see chart with number of upcoming events in each city