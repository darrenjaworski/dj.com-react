# personal site

## vite

This is a personal site built with [Vite](https://vitejs.dev/) and React.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Install dependencies

```bash
npm i
```

### Run locally (development)

```bash
npm run dev
```

This will start the Vite development server. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

The production-ready files will be output to the `dist/` directory.

### Preview production build locally

```bash
npm run preview
```

This will serve the built site locally for testing.

## Testing

### Unit tests

```bash
npm test
```

Unit tests are located in `src/__tests__/`.

### End-to-end tests (Playwright)

```bash
npm run test:e2e
```

E2E tests are located in `e2e-tests/`.

## Project Structure

- `src/` - Main source code
- `e2e-tests/` - Playwright E2E tests
- `assets/` - Static assets and coverage reports
- `dist/` - Production build output

## Additional Info

- Configuration files: `vite.config.ts`, `tsconfig.json`, `playwright.config.ts`
- For more details, see comments in source files or reach out to the project maintainer.
