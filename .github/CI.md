# Continuous Integration

## Overview
This project uses GitHub Actions for continuous integration. The CI workflow runs automatically on all pull requests and pushes to the `main` branch.

## CI Workflow
The CI workflow (`.github/workflows/ci.yml`) runs the following checks in sequence:

1. **Install dependencies** - `yarn install --frozen-lockfile`
2. **Lint** - `yarn lint` - Runs Biome linter on all source files
3. **Type check** - `yarn typecheck` - Runs TypeScript type checking across all packages
4. **Test** - `yarn test` - Runs all unit tests (currently 39 tests)
5. **Build** - `yarn build` - Verifies all packages build successfully

All checks must pass before code can be merged to `main`.

## Environment
- **Node version:** 22.20.0
- **Yarn version:** 1.22.18
- **OS:** Ubuntu (latest)

## Running CI Checks Locally
Before pushing your changes, you can run the same checks locally:

```bash
# Run all checks in sequence
yarn install --frozen-lockfile
yarn lint
yarn typecheck
yarn test
yarn build

# Or run them individually as needed
yarn lint          # Check code quality with Biome
yarn lint:fix      # Fix auto-fixable linting issues
yarn typecheck     # Check TypeScript types
yarn test          # Run unit tests
yarn build         # Build all packages
```

## Troubleshooting

### yarn.lock out of sync
If CI fails with a frozen lockfile error:
1. Make sure you've committed your `yarn.lock` file
2. Run `yarn install` locally and commit the updated `yarn.lock`
3. Never manually edit `yarn.lock`

### Test failures
Run `yarn test` locally to debug failing tests. For watch mode during development, use `yarn tdd`.

### Build failures
Run `yarn build` locally to reproduce build issues.

## Branch Protection
The `main` branch is protected and requires:
- All CI checks to pass
- Pull request reviews (if configured)
- Branches to be up to date before merging

## Adding New Checks
To add additional CI checks, edit `.github/workflows/ci.yml` and add new steps under the `steps` section.

