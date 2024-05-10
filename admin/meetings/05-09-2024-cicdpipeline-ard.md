# TEAM MEETING THURSDAY:

## Attendance:
- Christopher
- Anthony
- Hailani
- Thomas
- David
- Thanh
- Richard

# Meeting Purpose

The purpose of this meeting is to come up with a CI/CD phase 1 pipeline for our project, and assign people to work on it and the ADR for our pipeline

Pipeline document: https://github.com/cse110-sp24-group32/cse110-sp24-group32/blob/main/admin/cipipeline/phase1.md

# CI/CD PIPELINE (DUE SUNDAY):

-Come up with what pipeline should have as team (see cipipeline/phase1.md)

- Assign 1-2 people to make phase 1 build pipeline diagram using drawio: Hailani made this
- Assign people to make the pipeline work on our repo using Github actions: Thomas 
- Assign 2 people to make phase1.md, a short 2 page (roughly) 
status on the pipeline in terms of what is currently functional
(and what is planned or in progress). Embed your diagram in the 
markdown file.: Christopher
- Assign 1 person to make phase1.mp4, "a no more than 2 min video demonstration of the pipeline" – Richard >:)

Put files in: /admin/cipipeline


# CI/CD Pipeline:

## Our pipeline decisions: 

### Pipeline flow: 
Developer -> lint with VSCode extensions -> push to github -> do linter checks -> jest tests -> JSDocs generating javascript documentation -> pull request -> have set of eyes review -> merge

- Linter: (stylelint for css, eslint for js, https://github.com/marketplace/actions/html5-validator for html). Use google styling

- Pull requests: Push code to github and request a pull request, just have at least one set of eyes to review the code before you merge IF it has a green “able to merge”

- Jest for testing 

- JSDocs for generating javascript documentation

In progress:
-linter - install linters in VSCode and also use github actions to verify
-pull requests - have more than 1 set of eyes to merge a pull request - any other person, doesnt have to be a leader
-JSDocs - js documentation

Planned:
-implement jest unit tests for functions
-maybe E2E testing once our program is more fleshed out, which is UI testing
-accessibility testing to ensure our website is accessible to people with disabilities

Resources:
https://www.freecodecamp.org/news/continuous-integration-with-github-actions-and-puppeteer/

# Architectural Decision Record (DUE SUNDAY):

“Big decisions should be recorded to avoid organizational debt.  Unfortunately important decisions are often made in meetings, in chat, video conferences, power point decks, etc.  Consensus may be reached via these interactions or artifacts but preservation of the decisions is often lost over time particularly if team members move on.  To address the erosion of shared understanding of decisions SEs are encouraged to document key decisions in the form Architectural Decision Records (ADRs). “

ADR MD format they want us to use: https://adr.github.io/madr/

“You will store all our decisions in our repo in /specs/adrs (though you may also publish them internally to your Wiki).  Each decision should be an individual document and should be named the topic and a date to sort the decisions.  A name format like MMDDYY-Decision-Name.md would help you keep the decisions in a set order. “

- As a team, figure out what our first ADR should be that we put in. Maybe the pipeline?

- Assign 1-3 people to make the first ADR using format above


Assigned:
-Hailani
-Anthony

# Unfinished:

High Contrast Color option for developers with bad eyes? (I think Accessibility point is here https://wave.webaim.org/) -> alternative text on images

Team question: Switch communication to Discord server?

