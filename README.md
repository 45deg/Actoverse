# 🛰️ Actoverse

Actoverse is an online debugger suite for the Actor model, which provides a graphical visualization for message timeline, causal-consistent reverse debugging, and some useful features for debugging actors.

**NOTE: This is a client interface of Actoverse protocol and this repository does not include libraries for debugging targets or demo applications. Check [a target API implementation for Scala](https://github.com/45deg/Actoverse-Scala) and [its examples](https://github.com/45deg/Actoverse-Scala-Demos).**

## Features

- Live inspecting states inside actors
- Visualizing the causal flow of messages between actors
- Restore any point of the past state of actors ( _Reverse Debugging_ ) while keeping the causal relationship
- Making breakpoints by the attributes or contents of messages such as:
  + sender / receiver actor's name
  + partial / perfect pattern matching of message data

## Downloading Binary

[See the release page](https://github.com/45deg/Actoverse/releases)

## Executing from Source Repository

### Requirements

- node.js environment (latest)
- npm

### How to run

```
npm install
npm start
```
