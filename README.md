# Interview Scheduler

Interview Scheduler is a single page application(SPA) that allows a student to a book and manage interviews with a mentor and is built using React. Data is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format.

## Demo

![demo-desktop-gif](https://raw.githubusercontent.com/digivolv/lighthouse-labs-scheduler/97d59381958f818060343b8817a748aef3b2fca8/public/images/desktop_demo.gif)

## Behaviour

The App allows users to add, edit and delete appointments in real time. It uses React built-in and custom hooks, and data is persisted by the API server through a PostgreSQL database.
This basic Scheduler allows users to book appointments and select interviewer from available interviewers. These appointments can also be modified and deleted. If there is an error creating, editing or deleting an appointment the user will see an error message.

- When the applicaiton is loaded a request is made to the API server. The appointments are displayed for the selected day.
- Interviews can be booked between Monday and Friday from 12pm to 5pm.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- axios
- @testing-library/react-hooks
- react-test-renderer
