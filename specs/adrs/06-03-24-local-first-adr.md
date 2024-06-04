# Local first functionality

## Context and Problem Statement

Given that our app prioritizes local first, by using localStorage along with an export/import json file system, we knew that we wanted our app to be able to work offline with no internet connection.

## Considered Options

- Electron app
- PWA from lab 8
- Only service workers

## Decision Outcome

We decided to implement service workers to cache all necessary files. We also added `manifest.json` so the app can be installed locally outside of the browser.

`sw.js`

- Intercepts all incoming network requests and serves content with cached versions if they exist
- Caches them if they do not exist

`manifest.json`

- Defines the icons, name, theme of our PWA
- Allows user to download app as a program like Electron


