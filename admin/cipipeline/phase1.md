# Phase 1 CI/CD pipeline

# Diagram

<insert diagram here>

# In Progress

We have a rough pipeline in place that will eventually be expanded when our project becomes more developed. Right now we are focusing on code quality, pull requests, merging, and automated Jest tests.

We decided as a team on 5/9/2024 that our pipeline for phase 1 should be as follows:

1. Developer ->
2. Lint with VSCode extensions ->
3. Push to own GitHub branch ->
4. Do linter checks ->
5. Jest tests ->
6. JSDocs generating javascript documentation ->
7. Pull request ->
8. Have another set of eyes review if green checkmark ->
9. Merge

## We will use the following for accomplishing this pipeline:

Pipeline: GitHub actions in our project repository

Linter: (stylelint for css, eslint for js, https://github.com/marketplace/actions/html5-validator for html)
Use google styling

Pull requests: Push code to github and request a pull request, just have at least one set of eyes to review the code before you merge IF it has a green “able to merge”

Jest for testing 

JSDocs for generating javascript documentation


# Planned

We were able to get some good things in progress for our phase 1 pipeline, but we decided that we eventually will need more. For example, we want to implement the following:

- End2End unit testing with Jest AND Pupeteer
- Accessibility validation checks
- Implement more Jest unit tests for functions in our code
