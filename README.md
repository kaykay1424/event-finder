# Event Finder
[Event Finder](https://kaykay1424.github.io/event-finder/) is a progressive web application built with React and a serverless background that is capable of working offline and lets users view upcoming events in various cities as well as filter events by city. 

## Before Getting Started
You need to have a [Google account](https://accounts.google.com/signup/v2/webcreateaccount?hl=en&flowName=GlifWebSignIn&flowEntry=SignUp) and an [OAuth Consumer](https://support.google.com/googleapi/answer/6158849?hl=en#zippy=%2Cauthorized-domains)  to use the Google Calendar API.

If you want to use the app monitoring tool Atatus, you will need to [create an account](https://www.atatus.com/for/react).

## How to Get Started
1. Clone the repo or download the zip file
1. Navigate to project folder
1. Run `npm install` to install the necessary dependencies
1. Add config.json file to root of auth-server folder with the following code filling in the client_id, project_id and client_secret values from your OAuth Consumer.
`{
    "CLIENT_ID": "client_id",
    "PROJECT_ID": "project_id",
    "CLIENT_SECRET": "client_secret",
    "CALENDAR_ID": "fullstackwebdev@careerfoundry.com"
}`
1. Add Atatus key to atatus config on line 7 in index.js file in root of project folder. If you don't want to use Atatus, comment out the atatus lines (6, 7).
1. Run `npm start` to start the local server and view the app

## List of Technologies
- HTML
- CSS
- JavaScript
- React
- Faas (AWS Lambda)
- [Google Calendar Api](https://developers.google.com/calendar/api")



