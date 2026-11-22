# RepRoute verification plan

Use the deployed app or `npm run dev`. Record the actual result and date when each check is performed; do not mark a check passed solely because it is listed here.

| ID | Test | Steps | Expected result |
|---|---|---|---|
| T00 | Simulated load failure | Open `/?simulateError=1` | Error state appears; click Try again and catalogue loads |
| T01 | Home route | Open `/` | Header, hero, featured programmes and footer render |
| T02 | Catalogue route | Open `/programs` | Ten programme records appear after the loading state |
| T03 | Search | Search for `mobility` | Mobility Reset and Yoga Balance remain |
| T04 | Empty search | Search for `no-such-programme` | Empty state appears; Reset restores the catalogue |
| T05 | Category / level | Choose Conditioning and Intermediate | Only matching records remain |
| T06 | Sort | Choose price low to high | Matching cards are ordered by ascending price |
| T07 | Parameterized detail | Open `/programs/mobility-reset` | Correct record details appear |
| T08 | Unknown detail | Open `/programs/not-a-real-programme` | Not-found state appears |
| T09 | Capacity | Open HIIT Circuit or select it in the form | Full programme cannot be submitted |
| T10 | Eligibility | Select Muscle Build with Beginner experience | Intermediate requirement message appears |
| T11 | Required fields | Submit the form empty | Nickname, date and programme errors appear |
| T12 | Date validation | Attempt a past date | Past date is rejected |
| T13 | Pricing | Select Strength Foundations | 10% deposit is calculated as PKR 650 |
| T14 | Confirmation | Complete a valid fictional booking | Confirmation shows nickname, programme, date and reference |
| T15 | Persistence | Refresh confirmation after submission | Local demo booking remains available |
| T16 | Clear state | Select Clear saved demo booking | Confirmation redirects to booking |
| T17 | Direct route refresh | Refresh `/programs/mobility-reset` on deployment | App shell loads rather than a server 404 |
| T18 | Mobile layout | Test at 390px viewport | No horizontal page overflow; cards and form stack vertically |
| T19 | Desktop layout | Test at 1280px viewport | Catalogue uses a multi-column layout and filters remain usable |
| T20 | Keyboard | Tab through navigation, filters and form | Focus remains visible and controls are operable |

## Evidence record

Add dated screenshots for the home page, catalogue/filter results, parameterized detail, form validation, confirmation, mobile layout and desktop layout. Add the three reference-site screenshots requested in the assignment. Only mark a check as passed after it has been performed on the deployed build.
