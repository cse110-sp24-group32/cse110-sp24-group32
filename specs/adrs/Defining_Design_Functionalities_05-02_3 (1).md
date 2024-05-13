# Defining Design Functionalities 05/02

## Context and Problem Statement

What core features did we want? how should we go about designing our "developer's journal"?

## Considered Options

**Things we would like:**
- A page to have daily tasks/ to-dos for different days, separate pages/notes for different projects/brainstorming
- I want to keep track of all pull requests I made as a developer to keep track of how much work I have done
- Different pages for different projects
- Allows import of code snippets / github repositories
- Way to keep track of issues
- Blank pages for regular journaling
- Way to keep track of figma designs / figjams
- Code playground to test code / functions
- Allow for comments
- Task list

## Decision Outcome

**Core Functionalities:**
- Search bar to search for keywords in notes or for specific tags
- Markdown notes (change to normal text notes if implementation comes out to be too time consuming)
- Notes can display images or code snippets for better visualization of context
- Assignable tags in the metadata of notes for better organization: title, date, difficulty, feature, bug, etc.
- Sidebar navigation hierarchy: Projects -> meeting notes / general md notes / design artifacts / tasks -> detailed notes
- Can group notes based on top tags Eg. project -> sprint -> certain day, etc.
Ability to manage notes (create, delete, rename, edit, etc.)

**Design-Wise:** (UI)
Creating our developer's journal, we were inspired by the theme and UI layout of Discord. By using a layout similar to that of Discord, we intend to take advantage of the user’s preexisting knowledge and familiarity with Discord to significantly decrease the learning curve of our app. In terms of the hierarchical organization of the sidebar elements, the server list on Discord is analogous to our projects while the channels in each server are analogous to our categories for notes, like tasks, meeting notes, design artifacts, etc. Each note could also be assigned multiple tags for the purpose of better organization and improved search results when using the search bar. We intend to incorporate markdown notes as it is frequently used in websites like Github and GitLab, and is also a language used commonly for documentation.
