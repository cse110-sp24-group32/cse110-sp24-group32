# Defining Design Functionalities 05/02

## Context and Problem Statement

Our app has functionality to allow a user to create a markdown note, either templated or not from a pre-defined "developer friendly" MD template (meeting notes, design artifact, GitHub task, code snippet). Thus, we needed to include a markdown renderer as a co-dependency for our application to work. We considered different options and chose the one that fit our project the best without making the project too bloated with unused code.

## Considered Options

We saw many different markdown renderers that could have worked, but ultimately chose one. Some of the options we considered were:

- https://dillinger.io/ , which we did not pick because it had too many features that we did not need, meaning it would bloat our app and potentially slow it down. Dillinger.io boasts "Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible, AngularJS-powered HTML5 Markdown editor," which is nice, but we do not need our markdown renderer to be "cloud-enabled", meaning there would be unncessary code in our program if we used this.

- https://md-block.verou.me/ , which is a lightweight markdown renderer. It simply introduces an HTML elemenmt `<md-block>` that allows you to put in raw MD and have it be rendered.

## Decision Outcome

We decided to use https://md-block.verou.me/ as a co-dependency to our app to render markdown. As developers, it is very lightweight and only introduced what is necessary for our app. You do not even need to `npm install` it, you can add it to the app using a `<style>` tag with the following code:

```
<script type="module" src="https://md-block.verou.me/md-block.js"></script>
```

We will edit the innerText of the <md-block> in each journal entry and add our own buttons to allow the user to interact with this markdown renderer. When a user clicks "edit" on a journal entry, their rendered markdown will transform into a different HTML element, a textbox input to allow the user to edit the raw MD. When done, the changed MD will be placed into the innerText of our <md-block> element
