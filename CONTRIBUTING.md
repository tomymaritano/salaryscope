# Contributing to SalaryBoard

Thank you for considering contributing! This project is maintained by the HackLab.dog community and we welcome pull requests.

## Setup
1. Fork and clone the repository.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env` and update the variables.
4. Run database migrations with `npx prisma migrate dev --name init`.
5. Start the development server using `npm run dev`.

## Branch naming
- Use `feature/<short-description>` for new features.
- Use `fix/<short-description>` for bug fixes.
- Use `chore/<short-description>` for maintenance changes.

## Commit guidelines
- Write concise commit messages in the present tense.
- Group related changes into a single commit.
- Reference issues when applicable (e.g. `Fix #123`).

Before opening a pull request ensure that `npm test` and `npm run lint` run without errors.
