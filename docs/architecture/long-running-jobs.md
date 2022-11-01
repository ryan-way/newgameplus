# Long Running Jobs

## Description

Because one of the goals of the project is to have AI's to solve puzzles or play a game, there will be some long running jobs doing calculations.
The architecture must provide some solution for long running jobs, that don't bog down the peformance of the front end.
This document outlines and chooses an option.

## Options

### Web Workers

Web workers can be used to do background work. The API is build directly into javascript. However, it is not recommended to perform long running jobs in web workers so this is eliminated as an option.


### Electron Solutions
___
### Main Process

Electron's process model include two components. The main process and the renderer process.
The main process is used to interact with the node environment, and exposes an IPC API to interact with renderer processes.
Running long jobs in the main process can cause the program as a whole to become unresponsive. So this is not a viable option.

### Renderer Process

The renderer process is responsible for the renderer the UI.
This also cannot be used to perform long running jobs as this will cause performance issues with the UI.
However, another renderer process can be created to run the job. This will keep the main process and the UI's renderer process running well.
