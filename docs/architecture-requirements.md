# Architecture Requirements

The purpose of this document is to define the archiectural requirements for the NG+ app.

## Requirements

- **R1**: must be implemented in a single language
- **R2**: must be a desktop app, but extensible to other platforms
- **R3**: persistant storage
- **R4**: logging
- **R5**: provide include solution for long running jobs
- **R6**: data gathering

## Details

### R1 Single Language

There are a couple reason why the project should be written in a single language.

Firstly, if a project contains multiple language, it can slow down development time as the switching to another languages adds overhead to context switching.
Secondly, if two areas of the code base use different languages, then they are not able to share code.
Lastly, two lanugages means two different build systems, meaning more complicated setup and configuration.

### R2 Must be a Desktop App

By developing a desktop app, the development process in general is easy as the development is usually done on a desktop. No emulators or deployment required.
However it may be beneficial to support other platforms in the future. So a design must keep that in mind.

### R3 Peristent Storage

Some games may contain many possible starting states. These starting states should be accessible through the architecture.

### R4 Logging

Logging is an important mechanism for view the stating of the app and detecting errors. The architecture must provide a logging service for info and errors, this must also be persisted.

### R5 Long Running Jobs

Game projects will involve AI algorithms to solve puzzles or provide suggested actions.
These calculations can take some time, so the architecture must provide a way to perform long running background jobs without affect performance.

### R6 Metrics Gathering

Game projects will involve AI algorithms to solve puzzles or provide suggested actions.
It will be important to measure the performance of these algorithms. The architecture must provide some way of storing performance related data points.
