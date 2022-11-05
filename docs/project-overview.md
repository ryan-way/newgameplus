# Project Overview

This document is used to outline the goals and motivations behind the New Game Plus App (NG+)

## Motivation

This is meant to be a pet project that I can use to practice and grow. I want to practice following the full software life cycle, and operational best practices for software, while keeping everything organized and communicative. Doing this by myself from scratch. Creating an app with lots of games in them is the outlet for this, because it will involve from front end and back end work, as well has involving some AI elements.

## Principles

The guidelines are:

- The project should be document heavy
  - Whenever a change is made, there should be a document showing research and decisions made.
- No skipping steps
  - Whenever something SHOULD be done, it SHOULD be done

## Efforts

In the spirit of keeping efforts organized, here are the project that improvements should be organized into:

### Operations

Operational improvements are changes support processes. Essentially, tools are improve the quality of the code, or improve the processes by which code is developed. Typically, these will be tools outside of what is shipped.

**Examples**

- unit testing
- ui mock ups tools
- static analysis

**Non Examples**

- front end framework
- ORM's
- New games

This will be represented by a project in the repo

### Architecture

Architectural improvements are changes to how the overall app is organized, or bringing in new functional tools that new features can use. Anything whose scope spans multiple games. Often Features will populate tasks to this project.

**Examples**

- ORM's
- Front end framework
- Design patterns

**Non Examples**

- what is stored by a game variant
- implementation of an AI algorithm

This will be represented by a project in the repo

### Feature

Feature improvements include changes whose scope involve a single game.

**Examples**

- How the home page is laid out
- game rules
- specific persistent mechanisms
