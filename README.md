# 🛰️ Actoverse

![Screenshot](https://user-images.githubusercontent.com/7984294/28313089-794a9084-6bf0-11e7-9c3a-0c67a6db4986.png)

Actoverse is an online debugger suite for the Actor model, which provides a graphical visualization for message timeline, causal-consistent reverse debugging, and some useful features for debugging actors.

📺 Movie → https://youtu.be/2x6KXKDG1jw

**NOTE: This is a client interface of Actoverse protocol and this repository does not include libraries for debugging targets or demo applications. Check [a target API implementation for Scala](https://github.com/45deg/Actoverse-Scala) and [its examples](https://github.com/45deg/Actoverse-Scala-Demos).**

## Citation

> Kazuhiro Shibanai and Takuo Watanabe. 2017. Actoverse: a reversible debugger for actors. In Proceedings of the 7th ACM SIGPLAN International Workshop on Programming Based on Actors, Agents, and Decentralized Control (AGERE 2017). Association for Computing Machinery, New York, NY, USA, 50–57. DOI:https://doi.org/10.1145/3141834.3141840

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

## Quick start with Scala

Using [Actoverse-Scala](https://github.com/45deg/Actoverse-Scala) for a target.

1. Install scala and sbt. For example in macOS,

```
brew install scala
brew install sbt
```

2. Clone the repository of the demo source. → `git clone https://github.com/45deg/Actoverse-Scala-Demos`
3. Execute `sbt run`.
4. Select a example script to run by entering the index of it.
5. Start the Actoverse debugger and input the address `localhost:2000` into the form and push the `Connect` button.
6. Then a time-space diagram will show up.

## Internals

### API Specifications

The API through which communicates with a client program is handled with the JSON format over the WebSocket connection.

API Specification: https://github.com/45deg/Actoverse/wiki/API-Specification

## License

MIT
