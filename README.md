# AutoMateMe [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE.txt)

## Introduction

**AREA** is an Epitech school project. We had to recreate the environment of IFTTT,
with a _backend_, a _web frontend_ and a _mobile frontend_.

## How to use

This project use __Docker__ and __docker-compose__ to be served. The only thing you
have to do is running:

```bash
$ docker-compose up -d --build
```

You can download the APK file of the application on the webapp under the `/automateme.apk`
route.

## Folder architecture

We have 3 subprojects in this repository:
- Server (under `server`) which act as the master node of the application. It contains
  all the logic of the actions and reactions.
- Website front-end (under `client_web`) which expose a website to interact with the AREA.
- Mobile front-end (under `client_mobile`) which expose a mobile application to interact with
  the AREA.

## Technical choices

The backend is devepped in __TypeScript__ with the __NestJS framework__. Thanks to
its conception rules, we can isolate the different part of the application. This way,
we have been really fast to implement a lot of functionalities. Also, because we can
isolate the parts, we can test them separatly.

All the developer docs and user docs can be found [here](https://docs.automateme.fr/)

## Usage of mobile app

[Mobile](https://docs.automateme.fr/)

## API documentation

[AutoMateMeAPI](/server/api.md)

## Authors

- Rayane ELOUDJEDI - [GitHub](https://github.com/RayaneTekMars)
- Théo TARALLO - [GitHub](https://github.com/thtarallo)
- Tony BANO - [GitHub](https://github.com/Tonymelyo)
