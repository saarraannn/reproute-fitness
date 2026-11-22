# Frontend decisions — RepRoute

## Decision 1 — Catalogue interaction and shared state
- **Problem:** A long list of training programmes is difficult to scan, and booking details must remain available across routes.
- **Decision:** Use controlled search/category/level/sort inputs, derive the filtered list with `useMemo`, and keep the active demo booking in a React context with localStorage persistence.
- **Alternative considered:** Separate static pages or storing the booking only inside the booking page.
- **Reason:** Derived filtering avoids duplicating catalogue state. Context makes the confirmation route able to read the same booking.
- **Trade-off:** Context is more structure than a tiny single-page example needs, and localStorage is browser-specific.
- **Code location:** `src/pages/Programs.jsx`, `src/context/BookingContext.jsx`, `src/pages/Confirmation.jsx`.
- **Evidence to capture:** Search/filter/sort interaction, followed by booking confirmation and a page refresh.

## Decision 2 — Information hierarchy and mobile layout
- **Problem:** Programme cards contain several kinds of information (focus, level, duration, seats and price); on a narrow screen a dense multi-column layout becomes difficult to read.
- **Decision:** Use a clear hero and section hierarchy, repeatable programme cards, a two-column desktop catalogue and a single-column mobile catalogue. Filters wrap into a compact grid at small widths.
- **Alternative considered:** A dense table or fixed desktop grid.
- **Reason:** Cards make each programme independently scannable, while the mobile layout avoids horizontal scrolling at 390px.
- **Trade-off:** Cards take more vertical space than a table.
- **Code location:** `src/pages/Home.jsx`, `src/pages/Programs.jsx`, `src/components/ProgramCard.jsx`, `src/styles.css`.
- **Evidence to capture:** 1280px desktop and 390px mobile screenshots.

## Decision 3 — Explicit business-rule feedback
- **Problem:** A user should not be able to proceed with a full programme or an experience level below the programme requirement.
- **Decision:** Store remaining seats and required level in each local record, check both at submission, and show field-level messages before creating the local confirmation.
- **Alternative considered:** Allow all submissions and show a generic confirmation.
- **Reason:** The rules are visible in programme details and enforced again at form submission.
- **Trade-off:** The sample capacity is static and does not represent a live reservation system.
- **Code location:** `src/data/programs.js`, `src/pages/ProgramDetails.jsx`, `src/pages/Booking.jsx`.
- **Evidence to capture:** Full HIIT programme, insufficient experience validation, and a successful fictional demo booking.
