# Desktop Frameworks

The purpose of this document is to research and determine a desktop framework for the project. Since the project will be created with node, there are two options.

## Electron

Electron is a desktop framework written in node, using Chromium to render javascript on the front end.

Pros:

- Widely used
- Electrons apps can be written entirely in typescript

Cons:

- Not secure by default
- Not as performant as other options

## Tauri

Tauri is a desktop framework written in rust, that can be installed as an npm package.

Pros:

- Secure by default
- Better performance
  Cons:
- Back end is written in rust, and not typescript
- Not widely used

## Decision

The choice is close here, but because the project needs to be written in a single language, the choice is Electron.
