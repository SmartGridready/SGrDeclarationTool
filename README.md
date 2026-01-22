# SmartGridready Declaration Tool

A web-based editor for creating and editing SmartGridready device and functional profile XML declarations. 
This tool provides a form-based interface with validation, XML preview and import/export capabilities.

For more information about SmartGridready, visit the [SGrSpecifications repository](https://github.com/SmartGridready/SGrSpecifications) and [smartgridready.ch](https://smartgridready.ch/).

## Table of Contents

- [Getting Started](#getting-started)
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Used Libraries](#used-libraries)
- [Commit Rules](#commit-rules)
- [Releasing](#releasing)
- [Pipeline and Deployment](#pipeline-and-deployment)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool.git
   ```

2. **Install dependencies**

   ```bash
   npm i
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000).

## Project Overview

The `src/` folder contains the following top-level directories:

- **`app/`** - Next.js App Router pages and layouts for the main routes (devices, functional profiles)
- **`components/`** - Reusable React components including editor dialogs, form inputs, navigation, and shadcn UI primitives
- **`constants/`** - Constant values for error, info, and success messages used throughout the application
- **`hooks/`** - Custom React hooks for file import/export, validation, debouncing, and XSL preview
- **`models/`** - TypeScript type definitions for functional profiles and products
- **`sections/`** - Form sections and related logic (builders, mappers, schemas, slices) for device and functional profile editors
- **`test/`** - Jest test files for library API integration tests
- **`utils/`** - Utility functions for XML building, mapping, validation, and other shared logic

## Used Libraries

### Dependencies

- **[Next.js](https://nextjs.org/)** - React framework for routing and optimization features
- **[React](https://react.dev/)** - Core React library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript for type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for styling
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management solution
- **[xml2js](https://www.npmjs.com/package/xml2js)** - XML parser for SmartGridready declarations
- **[Shadcn UI](https://ui.shadcn.com/)** - Reusable UI components built with Radix UI and Tailwind CSS
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notification library for React

### Dev Dependencies

- **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)** - Code linting and formatting
- **[Jest](https://jestjs.io/)** & **[Testing Library](https://testing-library.com/)** - Testing framework and utilities
- **[Husky](https://typicode.github.io/husky/)** - Git hooks for pre-commit checks
- **[standard-version](https://github.com/conventional-changelog/standard-version)** - Automated versioning and changelog generation

## Commit Rules

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

### Commit Message Format

Each commit message should follow this format:

```plaintext
<type>(<scope>): <subject> (GL-<Issue Number>)
```

- **Type** (required): The type of change being made
- **Scope** (optional): The area of the codebase affected
- **Subject** (required): A short, imperative description of the change
- **Issue Number** (optional but preferred): The linked Issue from GitLab

**Example:**

```bash
git commit -m "feat(api): change device endpoint structure (GL-99)"
```

### Husky Pre-commit Checks

This project uses [Husky](https://typicode.github.io/husky/) to run automated checks before commits:

- **Pre-commit hook**: Runs `npm run lint` and `npm run format:check`
- **Commit-msg hook**: Validates commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification

## Releasing

Releases are performed **manually** using semantic versioning (patch, minor, major).
The project uses [standard-version](https://github.com/conventional-changelog/standard-version).

1. **Choose the release type and run the command**

   **Patch** (`0.2.0` → `0.2.1`): Bug fixes, patches

   ```bash
   npm run release:patch
   ```

   **Minor** (`0.2.0` → `0.3.0`): New features, backwards compatible

   ```bash
   npm run release:minor
   ```

   **Major** (`0.2.0` → `1.0.0`): Breaking changes

   ```bash
   npm run release:major
   ```

   This will:
   - Bump the version in `package.json`
   - Generate/update `CHANGELOG.md` based on commit history
   - Create a git tag with the new version
   - Create a commit with the version bump and changelog

2. **Push the release**

   ```bash
   git push --follow-tags origin main
   ```

## Pipeline and Deployment

The GitLab CI/CD pipeline consists of three stages:

1. **Lint**: Runs `format-check` and `lint` jobs on the `main` branch
2. **Test**: Runs `npm test` on all branches and commits
3. **Build and Deploy**: Builds and deploys to [GitLab Pages](https://sgr-declaration-tool-6bb311.pages.fhnw.ch/) when a tag is pushed
