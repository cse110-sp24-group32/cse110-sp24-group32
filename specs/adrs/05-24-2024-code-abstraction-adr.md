# Code abstraction

## Context and Problem Statement

After Sprint 1, our team had written a lot of code. However, it was very messy and all stored in `index.js`. We decided during a meeting that we wanted to refactor our codebase.

## Considered Options

- Keep the code in same `index.js` (considered if this was principle of locality but decided no)
- Break code up per function
- Split code by functionality of app

## Decision Outcome

### We decided to adhere to principle of locality by splitting our code based on the functionalities it has. Our new JS file structure is as follows:

### Front-end functionality files:

Initialize app and singleton object -- also passes singleton object instance to other functionality files through `getManagerObject()`
`index.js`

Sidebar front-end functionality:

`sidebarFunctionality.js`

Note/entry front-end functionality:

`notesFunctionality.js`

Search/top bar front-end functionality:

`search.js`

### Singleton Interface Class Files:

```
manager.js
note.js
proj.js
```

Overall our codebase has been easier to work with since splitting up our files like this
