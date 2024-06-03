# Code abstraction

## Context and Problem Statement

Because we save our data in localStorage in the browser, we saw that if the localStorage was cleared (maybe when history was cleared or cache was cleared), the entire journal was cleared and all of the notes and data were lost. We decided to figure out a way to make data persist

## Considered Options

- local SQL database
- local no-SQL database
- export/import data as json files

## Decision Outcome

We decided to implement the following to allow data to persist

# Export All

- Requests `notes` data from `localStorage`
- Saves `notes` data content into `notes-data.json`
- Saves `nodes-data.json` to user's computer

# Import All

- Opens user's file directory
- Can import downloaded `notes-data.json` from previous feature
- Parses `.json` file and saves into `notes` data in `localStorage

With this functionality, a user can save their journal after using it to ensure they have it saved on their computer. Local first!

