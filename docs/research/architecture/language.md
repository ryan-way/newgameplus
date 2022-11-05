# Language

The purpose of this document is to make a determination on the language used in the project.

## Requirements Under Consideration

- **[R1](../architecture-requirements.md)** Single Language
- **[R2](../architecture-requirements.md)** Must be Desktop App, but extensible to other platforms

## Options

### Typescript

Typescript is a language that compiles down to javascript and primarily used for web development.
It seeks to make javascript development easier by bringing type safety.

Pros:

- Modern language with modern features/patterns
- Most widely used language
- While the originally used for web, typescript can be used to develop any type of app (native/web/desktop)

Cons:

- Tools can be unruly. Because typescript is so widely used, the landscape constantly changes.
  Some tools are not meant to work with others and you won't know that until you try.

### Rust

Rust is a language whose goal to be performant and memory safe without the need for garbage collection.

Pros:

- Fast
- Modern
- Popular
- Built in test runner, package manager, and compiler.

Cons:

- New, rust is still new to the game and tools may not have much support
- Desktop library for rust would require some javascript glue to work with a front end rust framework. This violates R1

### C#

C# is a language owned by microsoft. C# is primarily used in the .NET framework.

Pros:

- Can be used to develop any platform
- Things work out of the box with Visual Studio

Cons:

- I'm already very familiar with C# and I want to try something new
- I don't want to use Visual Studio >:(

## Choice

Typescript makes the most sense for the project here. With typescript comes node as a runtime. There are other existing runtimes for typescript/javascript.
However, they are in the early stages of development, and it would be difficult if at all possible to run on all platforms.
