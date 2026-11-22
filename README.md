# RepRoute

**Student:** Sameer Hussain  
**Roll number:** I242042  
**Section:** B  
**Course:** CS4032 Web Programming — Assignment 02

RepRoute is a responsive fitness programme discovery and simulated booking prototype. Visitors can explore ten training programmes, filter and sort the catalogue, review programme details, and create a local demo booking. It does not process payments, create real memberships, or provide health advice.

## Routes
- `/` — Home and featured programmes
- `/programs` — Searchable, filterable programme catalogue
- `/programs/:id` — Parameterized programme details
- `/booking` — Controlled booking form and calculated price summary
- `/confirmation` — Local demo confirmation

## Run locally
Requires Node.js 18+ and npm.
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Main features
- Ten local programme records
- Search, category and experience-level filters, and sorting
- Capacity and experience eligibility rules
- Shared booking state and localStorage persistence
- Controlled form using a fictional nickname, validation and derived 10% deposit calculation
- Simulated asynchronous catalogue loading, retry, and empty states
- Responsive layout and keyboard focus styles

## Business rules
1. **Capacity:** a programme with zero available places cannot be booked.
2. **Eligibility:** Intermediate programmes require Intermediate or Advanced experience; Advanced programmes require Advanced experience.
3. **Pricing/fulfilment:** a 10% deposit is calculated for the local demo summary; no payment is collected and no real reservation is made.

## Edge cases
- Open HIIT Circuit to see the full-capacity restriction.
- Choose Beginner for an Intermediate or Advanced programme.
- Submit an incomplete or invalid form.
- Search for a term with no matches and use Reset.
- Open an unknown `/programs/:id` route.
- Open `/confirmation` without a saved booking.

## Project links
- Repository: https://github.com/saarraannn/reproute-fitness
- Deployment: pending Vercel import and verification.

## Concept map
```text
RepRoute
├── Home
├── Programme catalogue
│   ├── Search / filter / sort
│   └── Parameterized details
├── Booking
│   ├── Capacity + eligibility
│   ├── Controlled form + validation
│   └── Derived price / deposit
└── Confirmation
    └── localStorage demo state
```

## Limitations
All programme data is illustrative and local. Loading and booking are simulated. There is no backend, authentication, payment gateway, live capacity service, or health assessment. Use a fictional nickname only; do not enter real names, contact details or sensitive health information.
