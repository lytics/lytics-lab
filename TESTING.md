# Testing Guide

This repository uses [Vitest](https://vitest.dev/) with workspace support for
testing across all packages.

## Quick Start

```bash
# Run all tests
yarn test

# Run tests in watch mode (interactive)
yarn test:watch

# Run tests with UI (browser-based test runner)
yarn test:ui

# Run tests in TDD mode (watch with minimal output)
yarn tdd

# Run tests with coverage
yarn cover
```

## Test Structure

### Workspace Configuration

Tests are configured at the workspace level using `vitest.workspace.ts`:

```typescript
// vitest.workspace.ts
export default defineWorkspace([
  {
    extends: "./packages/experience-editor/vitest.config.ts",
    test: {
      name: "experience-editor",
      root: "./packages/experience-editor",
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
    },
  },
  // Add more packages here...
]);
```

### Current Test Coverage

#### Experience Editor Package

- **39 tests** (27 unit + 12 component)
- **Test files:**
  - `src/utility/fieldLogic.test.ts` - Field logic utilities
  - `src/components/form/radioGroup.test.tsx` - RadioGroup component

See
[`packages/experience-editor/TEST_README.md`](./packages/experience-editor/TEST_README.md)
for package-specific details.

## Adding Tests to a New Package

### 1. Add vitest.config.ts to your package

```typescript
// packages/your-package/vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // or "jsdom" for React components
    globals: true,
  },
});
```

### 2. Add your package to the workspace

```typescript
// vitest.workspace.ts
export default defineWorkspace([
  // ... existing packages
  {
    extends: "./packages/your-package/vitest.config.ts",
    test: {
      name: "your-package",
      root: "./packages/your-package",
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
    },
  },
]);
```

### 3. Add test script to package.json

```json
{
  "scripts": {
    "test": "vitest run",
    "tdd": "vitest"
  }
}
```

## Test Commands

### Vitest Commands (Recommended)

- `yarn test` - Run all tests once
- `yarn test:watch` - Run tests in watch mode
- `yarn test:ui` - Open Vitest UI in browser
- `yarn tdd` - Watch mode with minimal output
- `yarn cover` - Run with coverage report

### Nx Commands (Alternative)

- `yarn test:nx` - Run tests via Nx (runs per-package scripts)
- `yarn tdd:nx` - Watch mode via Nx
- `yarn cover:nx` - Coverage via Nx

**Note:** Vitest workspace commands are preferred as they:

- Show all test results in one place
- Support cross-package testing
- Provide better filtering and watch mode
- Work without Nx Cloud setup

## Test Output

When running `yarn test`, you'll see output like:

```
✓ |experience-editor| src/utility/fieldLogic.test.ts  (27 tests) 3ms
✓ |experience-editor| src/components/form/radioGroup.test.tsx  (12 tests) 113ms

Test Files  2 passed (2)
     Tests  39 passed (39)
```

The `|package-name|` prefix shows which package each test file belongs to.

## Writing Tests

### Unit Tests (Pure Functions)

```typescript
// src/utils/myFunction.test.ts
import { describe, it, expect } from "vitest";
import { myFunction } from "./myFunction";

describe("myFunction", () => {
  it("should do something", () => {
    expect(myFunction("input")).toBe("output");
  });
});
```

### Component Tests (React)

```typescript
// src/components/MyComponent.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("should render", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

## Dependencies

### Core Testing Libraries

- `vitest` - Test runner
- `@vitest/coverage-v8` - Coverage reporting

### React Testing (if needed)

- `@testing-library/react` - React component testing
- `@testing-library/jest-dom` - Extended matchers
- `jsdom` - DOM environment for tests

## Troubleshooting

### Tests not found

Make sure your test files match the pattern: `**/*.{test,spec}.{ts,tsx}`

### Module resolution errors

Check that your `vitest.config.ts` includes the same path resolution as your
`vite.config.ts`

### React component tests failing

Ensure you have:

1. `environment: "jsdom"` in vitest.config.ts
2. jsdom installed: `yarn add -D jsdom`
3. @testing-library/react installed

### Nx-related issues

If using `yarn test:nx` and encountering Nx Cloud errors, either:

1. Use `yarn test` (Vitest workspace) instead
2. Configure Nx Cloud token
3. Disable Nx Cloud in nx.json

## Best Practices

1. **Colocate tests** - Keep test files next to source files
2. **Descriptive names** - Use clear test descriptions
3. **Test behavior, not implementation** - Test what users see/do
4. **Fast tests** - Keep unit tests under 10ms when possible
5. **Isolated tests** - Each test should be independent
6. **Mock sparingly** - Prefer real implementations when feasible

## CI Integration

### GitHub Actions Example

```yaml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "22"
      - run: yarn install
      - run: yarn test
      - run: yarn cover
```

## Coverage

Coverage reports are generated in `coverage/` directory:

```bash
yarn cover

# View HTML report
open coverage/index.html
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Vitest Workspace Guide](https://vitest.dev/guide/workspace.html)
