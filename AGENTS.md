# Repository Guidelines

## Project Structure & Module Organization
The working code base is `react-app/`, a Vite-powered React + TypeScript client. Source is grouped under `src/mobile`, `src/web`, `src/shared`, and `src/pages`; refer to the path aliases (`@`, `@mobile`, `@web`, `@shared`) in `tsconfig.json` and `vite.config.ts`. Treat `phase1-mvp/` and `phase2-full/` as frozen mock references, and rely on `docs/` for specifications and standards. Preserve the client-provided assets under the Japanese-named directories.

## Build, Test, and Development Commands
From `react-app/`, install dependencies with `npm install`. Use `npm run dev` for the default workspace or `npm run dev:mobile` / `npm run dev:web` to open a specific surface. `npm run build` performs type checking and bundles for production, while `npm run preview` validates that build locally. `npm run lint` must succeed before pushing. A Jest runner is planned; until it exists, note manual checks in every PR.

## Coding Style & Naming Conventions
Follow `docs/coding-standards/コーディング規約.md`: two-space indentation, single quotes, no trailing semicolons, and strict TypeScript (avoid `any`). Components and types use PascalCase; functions, variables, and utility files use camelCase, with shared constants and types suffixed `.constants.ts` and `.types.ts`. Favor the absolute import aliases and keep hooks, services, and UI modules in their respective folders.

## Testing Guidelines
Jest with React Testing Library is the expected harness. Keep specs beside the code (`*.test.ts` / `*.test.tsx`) and rely on accessibility-first queries for resilience. Phase 1 code should cover core data transforms and happy paths; Phase 2 work targets ≥80 % coverage per the standards. Until automated tests land, attach detailed manual test notes to every PR.

## Commit & Pull Request Guidelines
Commits use `<type>: <subject>` (e.g., `feat: add phase2 report wizard`) and may reference tickets like `P1-M-001` in the body. Keep changes scoped so each commit is reviewable on its own. Pull requests should summarize the change, call out impacted surfaces (mobile/web, phase1/phase2), include UI screenshots if applicable, list the commands executed, and link to updated specs.

## Security & Configuration Tips
Store secrets in environment variables (per the coding standards) and never commit new client data. When mock content is required, copy the templates in `shared/` or `mockup-config.json` instead of editing originals. Cross-check changes against the approved specs before requesting review.
