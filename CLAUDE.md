# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application built with Vite and TypeScript. It's a minimal setup using React 19 with standard Vite development tooling.

## Key Commands

### Development

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint on the codebase
- `npm test:report` - Run Vitest

### Type Checking

- `tsc -b` - Run TypeScript compiler in build mode (included in build script)

## Architecture

### Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling and development server
- **ESLint** for code linting with React-specific rules
- **CSS** for styling (no CSS framework)

### Project Structure

- `src/main.tsx` - Application entry point with React root setup
- `src/App.tsx` - Main application component
- `src/index.css` - Global styles
- `src/App.css` - Component-specific styles
- `public/` - Static assets served by Vite
- TypeScript configuration split across:
  - `tsconfig.json` - Root configuration with project references
  - `tsconfig.app.json` - Application-specific TypeScript config
  - `tsconfig.node.json` - Node.js/build tool TypeScript config

### Build Configuration

- Vite uses `@vitejs/plugin-react` for React support with Babel-based Fast Refresh
- ESLint configured with React hooks and refresh plugins
- Production builds output to `dist/` directory (standard Vite behavior)

## Development Notes

### TypeScript Setup

The project uses TypeScript with project references for better build performance. The root `tsconfig.json` delegates to separate configs for app and build tool code.

### Linting

ESLint is configured with React-specific rules. The README suggests upgrading to type-aware lint rules for production applications.
