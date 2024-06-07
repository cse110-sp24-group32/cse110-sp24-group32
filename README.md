# CSE 110 Spring 2024 Group 32
This is the official production repository for group 32's quarter-long CSE 110 project.

# Deployed group project:
https://cse110-sp24-group32.github.io/cse110-sp24-group32/

# Deployed JSDocs doc page:
https://cse110-sp24-group32.github.io/cse110-sp24-group32/documentation/

# Team page: 
https://github.com/cse110-sp24-group32/cse110-sp24-group32/blob/main/admin/team.md

# Tutorial for CI/CD pipeline:

1. Run linter and style fixes locally via Visual Studio Code extensions
- Install `StandardJS` on VSC 
- Install `Stylelint` on VSC
- Open terminal and run these commands to locally install the necessary NPM packages:
```
npm install --save-dev stylelint stylelint-config-standard
npm install -g standard
```

Run StandardJS and stylelint in project src directory:
```
npx standard --fix
npx stylelint "**/*.css" --fix
```

2. Fix any remaining errors that can't be auto fixed

3. Push code to your branch

4. Create a pull request and link to issue by typing in ` #<num> ` where `<num>` is the issue number you are resolving/implementing. Put this in the PR description.

5. Repo required review from one person before merge

6. Merge if no conflicts and linter + tests pass


