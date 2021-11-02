<a href="https://codeclimate.com/github/eriocl/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/277f6d9f6229528215c2/maintainability" /></a>
<a href="https://codeclimate.com/github/eriocl/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/277f6d9f6229528215c2/test_coverage" /></a>
[![Node.js CI](https://github.com/eriocl/frontend-project-lvl2/actions/workflows/main.yml/badge.svg)](https://github.com/eriocl/frontend-project-lvl2/actions/workflows/main.yml)

**Gendiff** - a program that calculates the difference between two data structures. This is a popular problem, for which there are many online services ([JSON Diff](http://www.jsondiff.com/)). A similar mechanism, for example, is used when outputting tests or when automatically tracking changes in configuration files.

**Utility features:**

- Support for different input formats: yaml, json.
- Generating a report in plain text, stylish and json format.

## Install

```sh
git clone https://github.com/eriocl/gendiff-js.git
cd gendiff-js
make ci
npm publish --dry-run
cd /project_dir
npm link gendiff
```

## Run tests

```sh
make test
make test-coverage
```

## Gendiff API

You can import the utility as a function:

```javascript
import gendiff from 'gendiff';

const difference = gendiff(filepath1, filepath2, formatName);
```

First two arguments `<filepath1>` and `<filepath2>` are paths to files you want to compare. They are required.

The third argument `[formatName]` is a string and is optional. It determines how the result is displayed. List of supported formats:

- `stylish` (uses as default format)
- `plain`
- `json`

Json is a structured format. It allows other programs to use the output for their work.
