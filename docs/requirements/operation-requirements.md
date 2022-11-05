# Operation Requirements

The purpose of this document is the outline the operational requirements for the NG+ app

## Requirements

- **R1**: must have unit testing
- **R2**: must have integration testing
- **R3**: must have automatic linting
- **R4**: must have static analysis
- **R5**: must have git commit hooks
- **R6**: must have automated builds

## Details

### R1 Unit Testing

The project must contain unit testing code coverage > 80%

### R2 Integration Testing

Where possible, the project must have integration testing

### R3 Automatic Linting

The project must have automated linting to enforce coding standards

### R4 Static Analysis

The project must contain static analysis tools to determine code. This could be tools that determine cyclomatic complexity or duplicate code

### R5 Commit Hook

Commit hooks should be used to automatically run operational tools to determine code quality

### R6 Automated Pipeline

Automated builds should be run on the development branch, main branch and on PR branches. They should run all operational tools, as well as rolling at least a build number

- The main branch pipeline should:
  - Run unit tests
  - Run integration tests
  - determine code quality
  - role the minor version number
  - Generate a build
  - Generate a package/release and a tag
- The develop branch pipeline should:
  - Run unit tests
  - Run integration tests
  - determine code quality
  - role the build number
  - Generate a build
- PR branch pipeline should:
  - Run unit tests
  - Run integration test
  - determine code quality
