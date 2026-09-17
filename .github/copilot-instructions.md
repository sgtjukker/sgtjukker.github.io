# Project instructions

## Stack

- Node.js
- TypeScript
- Express
- npm
- Vitest may be introduced for tests

## General rules

- Use TypeScript.
- Prefer async/await.
- Keep functions small and focused.
- Do not introduce dependencies unless they are justified.
- Run the build after code changes.
- Do not modify generated files in `dist/`.
- Keep business logic separate from HTTP transport where practical.

## API conventions

- Use appropriate HTTP status codes.
- Validate incoming data.
- Return JSON responses.
- Do not swallow errors.

## Agent workflow

This repository is deliberately designed for experimenting with agentic development.

Preferred workflow:

1. Architect agent analyzes the task and creates a plan.
2. Developer agent implements the plan.
