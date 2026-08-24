# Contributing

Thanks for looking at [layout-manager-react](https://github.com/hrashkan/layout-manager-react). Bug reports, docs fixes and small, focused pull requests are welcome.

By participating you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Setup

Node.js 18+ and npm. This repo is npm-only (`package-lock.json`). Do not add a yarn or pnpm lockfile.

```bash
npm ci
```

The demo is a separate install root and imports the library from `../../src`:

```bash
cd demo
npm ci
npm run dev
```

Then open http://localhost:5173/

## What to change

- Runtime code lives in `src/`. Do not add comments there.
- Unit tests live in `__test__/src/`. End-to-end tests live in `__test__/e2e/` and drive the demo.
- User-facing behaviour goes in `CHANGELOG.md` under `[Unreleased]`. `docs/` is not published to npm.

## Checks

Run these from the repo root before opening a PR:

```bash
npm run type-check
npm run lint
npm test
npm run build
```

If you touch layout, resize or restore behaviour, also run:

```bash
npm run e2e
```

(`npm run e2e:install` once if Playwright browsers are missing.)

## Pull requests

- One concern per PR.
- Include tests for behaviour changes.
- Do not bump `package.json` version unless a release is being cut.

Security reports should not go through a public issue. See [SECURITY.md](SECURITY.md).
