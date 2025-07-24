# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application built with Vite and TypeScript. It's a minimal setup using React 19 with standard Vite development tooling.

## Key Commands

### Development

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint on the src directory (scoped to avoid linting build artifacts)
- `npm run typecheck` - Run TypeScript compiler in no-emit mode for type checking

### Testing

#### Unit Tests (Vitest)
- `npm test` - Run unit tests in watch mode
- `npm run test:run` - Run unit tests once
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:report` - Run tests with verbose and HTML reporting

#### End-to-End Tests (Playwright)
- `npm run test:e2e` - Run Playwright e2e tests
- `npm run test:e2e:ui` - Run e2e tests with Playwright UI
- `npm run test:e2e:report` - Show Playwright test report

## Architecture

### Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling and development server
- **ESLint** for code linting with React-specific rules
- **CSS** for styling (no CSS framework)
- **Vitest** for unit testing with coverage support
- **Playwright** for end-to-end testing across multiple browsers

### Project Structure

- `src/main.tsx` - Application entry point with React root setup
- `src/App.tsx` - Main application component
- `src/index.css` - Global styles
- `src/reset.css` - CSS reset styles
- `src/__tests__/` - Unit test files (Vitest)
- `src/test/setup.ts` - Test setup configuration
- `e2e-tests/` - End-to-end test files (Playwright)
- `coverage/` - Test coverage reports
- `playwright-report/` - Playwright test results
- TypeScript configuration split across:
  - `tsconfig.json` - Root configuration with project references
  - `tsconfig.app.json` - Application-specific TypeScript config
  - `tsconfig.node.json` - Node.js/build tool TypeScript config

### Build Configuration

- Vite uses `@vitejs/plugin-react-swc` for React support with SWC-based Fast Refresh
- ESLint configured with React hooks and refresh plugins
- Production builds output to `dist/` directory (standard Vite behavior)
- Vitest integrated with Vite config for unit testing with jsdom environment
- Playwright configured for cross-browser e2e testing with HTML reporting

## Development Notes

### TypeScript Setup

The project uses a simplified TypeScript configuration with project references for better build performance. The root `tsconfig.json` delegates to separate configs for app and build tool code.

### Linting

ESLint is configured with React-specific rules. The README suggests upgrading to type-aware lint rules for production applications.
