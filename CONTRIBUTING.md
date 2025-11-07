# Contributing to Lytics Lab

Thank you for contributing to Lytics Lab! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js 22.20.0 (managed via Volta)
- Yarn 1.22.18

### Getting Started

```bash
# Clone the repository
git clone https://github.com/lytics/lytics-lab.git
cd lytics-lab

# Install dependencies
yarn install

# Run tests
yarn test

# Run linting
yarn lint

# Type check
yarn typecheck

# Build all packages
yarn build
```

## Making Changes

### 1. Create a Branch

```bash
git checkout -b issue/[number]-[description]
```

### 2. Make Your Changes

- Write clear, concise code
- Add tests for new features
- Update documentation as needed
- Follow the existing code style (enforced by Biome)

### 3. Run Quality Checks

```bash
# Run all checks locally before pushing
yarn lint
yarn typecheck
yarn test
yarn build
```

## Changesets Workflow

We use [Changesets](https://github.com/changesets/changesets) for versioning and publishing. This ensures clear changelogs and semantic versioning.

### Creating a Changeset

When you make changes that should be released, create a changeset:

```bash
yarn changeset
```

This will prompt you to:

1. **Select packages** - Which packages did you change?
2. **Select bump type** - What type of change is this?
   - **patch** (1.0.0 → 1.0.1) - Bug fixes, minor changes
   - **minor** (1.0.0 → 1.1.0) - New features, backwards compatible
   - **major** (1.0.0 → 2.0.0) - Breaking changes
3. **Write a summary** - Describe your changes (will appear in CHANGELOG)

This creates a markdown file in `.changeset/` that will be committed with your PR.

### Example Workflow

```bash
# 1. Make your changes
git checkout -b feat/add-new-feature

# 2. Create a changeset
yarn changeset
# Select: experience-editor
# Choose: minor
# Summary: "Add support for custom themes"

# 3. Commit everything together
git add .
git commit -m "feat(experience-editor): add custom theme support"
git push origin feat/add-new-feature

# 4. Open a PR
```

### What Happens Next?

1. **Your PR is reviewed** - Maintainers review your code and changeset
2. **PR is merged** - Your changeset is merged to main
3. **Version PR is created** - A bot creates a "Version Packages" PR with:
   - Updated package versions
   - Updated CHANGELOGs
   - All pending changesets combined
4. **Maintainer merges Version PR** - Packages are automatically published to npm

### Changeset Guidelines

**Do create a changeset when:**

- Adding features
- Fixing bugs
- Making breaking changes
- Updating dependencies that affect users

**Don't create a changeset for:**

- Documentation updates
- Internal refactors (no API changes)
- CI/build configuration changes
- Development dependencies

## Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>
```

### Types

- `feat` - New feature
- `bug` - Bug fix
- `maint` - Maintenance/refactoring

### Scopes

- `experience-editor` - Changes to experience-editor package
- `recommendation-block` - Changes to recommendation-block package
- `repo` - Repository-level changes
- `ci` - CI/CD changes
- `deps` - Dependency updates
- `docs` - Documentation
- `tests` - Test changes

### Examples

```
feat(experience-editor): add date range display condition

bug(recommendation-block): fix API timeout issue

maint(repo): upgrade to Biome 2.0
```

## Pull Request Process

1. **Create a clear PR title** - Following conventional commit format
2. **Include changeset** - Add changeset if user-facing changes
3. **Fill out PR template** - Provide context and testing notes
4. **Wait for CI** - All checks must pass
5. **Address feedback** - Respond to review comments
6. **Squash and merge** - Maintainers will merge when ready

## Testing

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn cover

# Run tests for specific package
cd packages/experience-editor
yarn test
```

### Writing Tests

- Place tests in `__tests__` folders
- Use descriptive test names
- Follow existing patterns
- Aim for good coverage of new code

## Code Style

We use [Biome](https://biomejs.dev/) for linting and formatting:

```bash
# Check for issues
yarn lint

# Auto-fix issues
yarn lint:fix

# Format code
yarn format
```

Your editor should auto-format on save if configured properly.

## Need Help?

- **Questions?** Open an issue with the "question" label
- **Bug?** Open an issue with the "bug" label
- **Feature idea?** Open an issue with the "enhancement" label

## License

By contributing, you agree that your contributions will be licensed under the project's license.
