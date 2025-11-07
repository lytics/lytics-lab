# Continuous Integration & Release

## Overview
This project uses GitHub Actions for continuous integration and automated releases. Workflows run automatically on all pull requests and pushes to the `main` branch.

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

## Release Process

This project uses [Changesets](https://github.com/changesets/changesets) for automated versioning and publishing to npm.

### How It Works

1. **Create changes** - Make your code changes as usual
2. **Add changeset** - Run `yarn changeset` to document the change
3. **Open PR** - Create a pull request with your changes + changeset
4. **PR merged** - After review, your PR is merged to main
5. **Version PR created** - The release workflow automatically creates a "Version Packages" PR
6. **Publish** - When the Version PR is merged, packages are published to npm

### For Contributors

When making user-facing changes, always create a changeset:

```bash
yarn changeset
```

Select the affected packages, choose the bump type (patch/minor/major), and describe your changes. This will be included in the changelog.

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed instructions.

### For Maintainers

#### Normal Releases
1. Review and merge PRs with changesets
2. Review the auto-generated "Version Packages" PR
3. Merge the Version PR to trigger publishing

#### Dry Run Testing
To test the release process without publishing:

```bash
# Trigger the release workflow manually
# Go to Actions → Release → Run workflow
# Select "dry_run: true"
```

#### NPM Trusted Publishing Setup
This project uses NPM's Trusted Publishing (OIDC) for secure, token-free publishing:

**One-time setup on NPM:**
1. Go to each package's settings on npmjs.com
2. Configure Trusted Publisher:
   - Publisher: GitHub Actions
   - Repository: `lytics/lytics-lab`
   - Workflow: `release.yml`
   - Environment: `production`
3. Set publishing access to "Require 2FA and disallow tokens" for maximum security

**GitHub Environment:**
The `production` environment must exist in repository settings (Settings → Environments).

No NPM tokens required! Authentication happens automatically via OIDC.

## Adding New Checks
To add additional CI checks, edit `.github/workflows/ci.yml` and add new steps under the `steps` section.

