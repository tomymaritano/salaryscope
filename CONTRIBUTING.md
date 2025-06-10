# Contributing

Thank you for taking the time to contribute! This project is built with Next.js and uses Prisma and PostgreSQL. The following guide explains how to get the project running locally, the commit conventions we follow and how to run lint and tests before submitting a pull request.

## Setup

1. **Fork and clone** the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables template and adjust the values as needed:
   ```bash
   cp .env.example .env
   ```
4. Initialize the database (requires a running PostgreSQL instance):
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Commit Guidelines

- Use short, present‑tense descriptions (e.g. `fix form validation`).
- Group related changes into a single commit.
- Reference an issue number when applicable, for example `feat: add salary filter (#12)`.
- Squash or rebase locally so each commit represents a meaningful unit of work.

## Running Lint and Tests

Before opening a pull request, make sure the codebase passes lint checks and automated tests:

```bash
npm run lint
npm test
```

Both commands must exit without errors for the CI workflow to succeed.
