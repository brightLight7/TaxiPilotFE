# TaxiPilot

A responsive taxi-booking frontend built with Angular and TypeScript. The application includes customer-facing service pages, route and location inputs, account registration, email verification, and administration views backed by REST APIs.

## Features

- Responsive customer and mobile layouts
- Pickup and destination inputs with Google Maps integration
- Airport quote and journey-information flows
- User registration and email-verification workflow
- Administration and visitor-management views
- Backend API integration through Angular services
- Application state management with NgRx
- Real-time integration support with SignalR

## Tech stack

| Area | Technology |
|---|---|
| Framework | Angular 16 |
| Language | TypeScript |
| UI | Angular Material, Bootstrap, Sass, Tailwind CSS |
| State | NgRx, RxJS |
| Maps | Google Maps |
| Real time | SignalR |
| Testing | Jasmine, Karma, Cypress |

## Running locally

```bash
npm install
npm start
```

Then open `http://localhost:4200/`.

The application expects a compatible backend API. API URLs and third-party credentials must be supplied through secure environment-specific configuration; do not commit live keys, secrets, or recovery codes to the repository.

## Repository status

This repository is an active project snapshot and still needs a cleanup pass before it is deployment-ready. Planned work includes removing generated build output from version control, documenting the backend contract, adding an example environment configuration, and expanding automated test coverage.

## Security

If a credential is accidentally committed, remove it from the current source, rotate or revoke it with the provider, and clean it from the repository's Git history. Treat any committed value as compromised even after the visible file is updated.


