# TV Shows Dashboard

TV show dashboard that effectively categorizes and displays shows based on their genre and are sorted according to the ratings. Navigation to a detail page with summary of the show is available on clicking.

The app can be accessed from the URL: https://capable-fudge-66c3ca.netlify.app/

## Features

- Browse TV shows grouped by genre
- Shows sorted by rating within each genre
- Search shows across the full TVMaze database
- Show detail page with more information
- Responsive design - mobile & desktop
- Simple error handling

## Technology stack

- Vue 3 + TypeScript
- Vite
- Pinia
- Vue Router
- PrimeVue
- Vitest + Vue Test Utils
- TVMaze API

## Architecture decisions

- Fetches 250 shows on initial load. This is maintained in Pinia store.
- Ensures single fetch with guards.
- Search results are merged into main store to prevent duplicate API calls.
- `/shows/:id` is fired only on direct URL access with unknown IDs.
- Image lazy loading with `loading="lazy"` is applied to the images.
- PrimeVue was used as it was mentioned to be used within the company and could utilize some out of the box components.

## Getting started

### Versions used

    -  Node v20.19.5
    -  npm 10.8.2

### Installation

    -  npm install
    -  npm run dev

### Running tests

    -  npm run test
    -  npm run test:coverage

### Building

    -  npm run build

## Known limitations / future improvements

- No pagination - limited to 250 shows on initial load.
- If there is chance of API requests to hang, implementing AbortController can help aborting calls after waiting for a set duration.
- Loading show card components could be improved by introducing `IntersectionObserver` at the shelf level to defer rendering entire genre until it enter viewport.
- Currently, search is not cached - same search hits the API every time. Could cache results by query string in the store.
- E2E testing with Playwright to cover critical user journeys across real browsers.
- A new `LoadingSkeleton` component that mimics the layout of real `ShowShelf` could be introduced instead of current simple `Loading...` message, to make better user experience on waiting.
