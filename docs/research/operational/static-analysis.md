# Static Analysis

The purpose of this document is to outline static analysis tools that will be used in pipelines and/or git commit hooks.
This will not include tools for unit testing, linting, and formatting.

## npm audit

Can be used to update/detect out of date packages

- npm audit fix: automatically updates packages
  - add the "--force" flag to update majors versions as well
  - "--dry-run" flag outputs list of changes
  - the flags potentially can be used at the same time
