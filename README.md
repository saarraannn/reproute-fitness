# RepRoute

**Student:** Sameer Hussain  
**Roll number:** I242042  
**Section:** B  
**Course:** CS4032 Web Programming — Assignment 02

RepRoute is a responsive fitness-class discovery and booking prototype. Visitors can explore ten training programmes, filter and sort the catalogue, review programme details, and create a simulated booking. It is a frontend demonstration: it does not process payments, create real memberships, or collect health information.

## Routes

- `/` — Home and featured programmes
- `/programs` — Searchable, filterable programme catalogue
- `/programs/:id` — Programme details and booking entry point
- `/booking` — Booking form and calculated price summary
- `/confirmation` — Local booking confirmation

## Features

- Ten locally defined programme records
- Search, category filters, and sort controls
- Programme capacity and experience-level rules
- Shared booking state and controlled form fields
- Form validation and derived price summary
- Local-storage persistence for the current demo booking
- Asynchronous local catalogue loading with loading, error, retry, and empty states
- Responsive layout and keyboard-accessible controls

## Run locally

Requirements: Node.js 18 or later and npm.

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project links

- GitHub: https://github.com/saarraannn/reproute-fitness
- Deployment: to be added after Vercel import and verification.

## Business rules

1. **Capacity:** a class cannot accept more bookings than its listed remaining seats.
2. **Eligibility:** programmes marked Intermediate or Advanced require the matching experience level or higher in the booking form.
3. **Pricing and fulfilment:** the displayed programme price is the full simulated booking amount; a 10% booking deposit is calculated for the confirmation summary. No payment is collected.

## Reproduce edge cases

- Select a full programme to see the capacity restriction.
- Choose a beginner experience level for an Intermediate or Advanced programme to see the eligibility message.
- Submit the booking form with missing or invalid values to see field-level validation.
- Clear the catalogue search to restore the full list; use an unmatched term to see the empty state.
- Use the retry control if the simulated catalogue request fails.

## Concept map

```text
RepRoute
├── Programme catalogue
│   ├── Search / filter / sort
│   └── Programme details
├── Booking flow
│   ├── Capacity and eligibility rules
│   ├── Validated form
│   └── Price / deposit summary
└── Confirmation
    └── Local demo persistence
```

## Limitations

The data is local and illustrative. Catalogue loading and booking are simulated. There is no account system, backend database, payment gateway, trainer availability feed, or medical/health assessment. Do not enter sensitive personal or health information.
