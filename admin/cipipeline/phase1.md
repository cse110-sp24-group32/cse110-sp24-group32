# Phase 1 CI/CD pipeline

# Diagram

<insert diagram here>

# In Progress

We have a rough pipeline in place that will eventually be expanded when our project becomes more developed. Right now we are focusing on code quality, pull requests, merging, and automated Jest tests.

We decided as a team on 5/9/2024 that our pipeline for phase 1 should be as follows:

1. **Developer:** Initiates code changes and improvements ->
2. **Lint with VSCode extensions:** Developers utilize VSCode extensions for linting for consistent coding styles across HTML, CSS, and JavaScript files ->
3. **Push to own GitHub branch:** Developers push their changes to individual branches within the GitHub repository ->
4. **Do linter checks:** Automated linting processes are triggered upon push, enforcing coding standards defined by stylelint for CSS, eslint for JavaScript, and HTML5 validation for HTML files ->
5. **Jest tests:**  Automated Jest tests are executed to validate the functionality of the codebase ->
6. **JSDocs generating javascript documentation:** Automatically generate comprehensive JavaScript documentation, aiding in code comprehension and maintenance ->
7. **Pull request:** Initiate pull requests to merge their changes into the main branch, triggering a series of automated checks and reviews ->
8. **Code review:** If all automated checks pass and the reviewer approves, the pull request proceeds to the next stage ->
9. **Merge:** Changes are merged into the main branch, integrating the new codebase with the existing project

## We will use the following for accomplishing this pipeline:

Pipeline: GitHub actions in our project repository

Linter: (stylelint for css, eslint for js, https://github.com/marketplace/actions/html5-validator for html)
Use google styling

Pull requests: Push code to github and request a pull request, just have at least one set of eyes to review the code before you merge IF it has a green “able to merge”

Jest for testing functions

JSDocs for generating javascript documentation


# Planned

We were able to get some good things in progress for our phase 1 pipeline, but we decided that we eventually will need more. For example, we want to implement the following:

- End2End unit testing with Jest AND Pupeteer
- Accessibility validation checks
- Implement more Jest unit tests for functions in our code

By implementing these planned enhancements, we aim to obtain the quality and reliability of our Phase 1 CI/CD pipeline
