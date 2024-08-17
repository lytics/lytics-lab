# `@lytics/lytics-lab`

Lytics Lab

## Table of Contents

- [`@lytics/lytics-lab`](#lyticslytics-lab)
  - [Table of Contents](#table-of-contents)
  - [Workspaces](#workspaces)
    - [`packages`](#packages)
  - [Configuration](#configuration)
    - [.env](#env)
    - [nx-cloud.env](#nx-cloudenv)
  - [Iterating](#iterating)
    - [`yarn start`](#yarn-start)
    - [`yarn storybook`](#yarn-storybook)
    - [`yarn tdd`](#yarn-tdd)
  - [Blueprints](#blueprints)
    - [`yarn create-package`](#yarn-create-package)
  - [Code Maintenance](#code-maintenance)
    - [`yarn lint`](#yarn-lint)
    - [`yarn format`](#yarn-format)
    - [`yarn clean`](#yarn-clean)
  - [Testing](#testing)
    - [`yarn test`](#yarn-test)
    - [`yarn cover`](#yarn-cover)
    - [`yarn test-storybook`](#yarn-test-storybook)
    - [`yarn test-storyshots`](#yarn-test-storyshots)
  - [Building](#building)
    - [`yarn build`](#yarn-build)
    - [`yarn build-storybook`](#yarn-build-storybook)
  - [Pods](#pods)
  - [Scripts](#scripts)
    - [`scripts/deploy`](#scriptsdeploy)
    - [`scripts/create-package`](#scriptscreate-package)
      - [Flags](#flags)
      - [Execution](#execution)

<hr>

## Workspaces

### `packages`

Just regular packages, containing libraries or [pods](#pods).

<hr>

## Configuration 

### .env

This workspace supports three levels of environment variables ( .env.development, .env.production, .env.staging ). Duplicate the base helper (`SAMPLE-env`) file and enter valid details to configure. 

### nx-cloud.env

To build, run tests, storybook, etc., you may be required to create a local `nx-cloud.env` file to configure NX caching. Do do so create a new file at the root named `nx-cloud.env` and format the contents:

```
# Authentication Token for Nx Cloud
NX_CLOUD_ACCESS_TOKEN={VALID_READ_WRITE_TOKEN}
```

## Iterating

### `yarn start`

Start an entrypoint or package

```sh
yarn start --projects=@lytics/bar
```

### `yarn storybook`

Start the storybook

```sh
yarn storybook
```

### `yarn tdd`

Run tests in TDD mode.

```sh
yarn tdd --projects=@lytics/bar
```

<hr>

## Blueprints

### `yarn create-package`

Create a package

```sh
yarn create-package -n foo
```

<hr>

## Code Maintenance

### `yarn lint`

Run the linter on all packages

```sh
yarn lint
```

### `yarn format`

Run the formatter on all packages

```sh
yarn format
```

### `yarn clean`

Delete `dist` and `build` in all packages

```sh
yarn clean
```

<hr>

## Testing

### `yarn test`

Run tests for everything except `segbuilder`

```sh
yarn test
```

Run tests for a given package

```sh
yarn test --projects=@lytics/foo
```

### `yarn cover`

Run tests and generate coverage reports for all packages

```sh
yarn cover
```

Run tests and generate coverage reports for a package

```sh
yarn cover --projects=@lytics/foo
```

### `yarn test-storybook`

Run the storybook smoke test

```sh
yarn test-storybook
```

### `yarn test-storyshots`

Run the storybook snapshot tests

```sh
yarn test-storyshots
```

<hr>

## Building

### `yarn build`

Build everything in the correct topological order

```sh
yarn build
```

Build a package

```sh
yarn build --projects=@lytics/foo
```

### `yarn build-storybook`

Build the storybook

```sh
yarn build-storybook
```

<hr>

## Pods

Pods are a code organization convention. Code is organized *by pod* when, within a package, directly under the `src` directory, a single directory contains all relevant code including tests, stories, styles, types, and an `index.ts` file declaring all its exports.

<hr>

## Scripts

### `scripts/deploy`

Placeholder for future deploy automation. Not in use.

```sh
Usage: ./scripts/deploy
```

### `scripts/create-package`

This script is for creating a new package or entrypoint for the lytics-ui project. It takes several options:

#### Flags

- `-n <package_name>`: *Required.* the name of the package to create. 
- `-g <global_name>`: *Optional.* the global variable name of the package. Defaults to `"Lytics<PackageName>"`.
- `-e <entrypoint>`: *Optional.* if set, creates an entrypoint instead of a package. 
- `-v <verbose>`: *Optional.* if set, enables verbose output. 

#### Execution

The script does the following:
1. creates a directory for the package/entrypoint based on the blueprint/package or blueprint/entrypoint directory
1. replaces all occurrences of the package_pattern '{{PACKAGE_NAME}}' with the given package_name
1. removes the '.hbs' suffix from files
1. interpolates the package_name in all files
1. if creating a package, it also updates the globals.json and tsconfig.json files to include the new package

The script also includes a trap to clean up the tmp directory and remove the package directory if the script exits with a non-zero status code.

<hr>