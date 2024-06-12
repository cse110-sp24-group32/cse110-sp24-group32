# CSE 110 Spring 2024 Group 32
This is the official production repository for group 32's quarter-long CSE 110 project.

Final private video: https://www.youtube.com/watch?v=kg9HB47AquM
Final public video: https://www.youtube.com/watch?v=AkWsQX3UHJ8

# Deployed group project:
https://cse110-sp24-group32.github.io/cse110-sp24-group32/

# Deployed JSDocs doc page:
https://cse110-sp24-group32.github.io/cse110-sp24-group32/documentation/

# Team page: 
https://github.com/cse110-sp24-group32/cse110-sp24-group32/blob/main/admin/team.md

# Tutorial for CI/CD pipeline:

## 1. Run linter and style fixes locally via Visual Studio Code extensions
- Install `StandardJS` on VSC 
- Install `Stylelint` on VSC
- Open terminal and run these commands to locally install the necessary NPM packages:
```
npm install --save-dev stylelint stylelint-config-standard
npm install -g standard
```

Run `StandardJS` and `stylelint` in project src directory:
```
npx standard --fix
npx stylelint "**/*.css" --fix
```

## 2. Fix any remaining `standard` errors that can't be auto fixed

## 3. Run `Jest-puppeteer` tests locally before pushing to ensure unit test and e2e tests pass:
- Open terminal to `/source/` directory and enter the following to start a local server and run tests:
```
npm install --save-dev
npm start &
```
- Open another terminal to `/source/` directory and enter the following to run all tests:
- Set `headless: true` to `headless: false` in `notes.test.js` and `more.test.js`, and change it back before pushing
```
npm test
```

## 4. Push code to your branch if tests pass

## 5. Create a pull request and link to issue by typing in ` #<num> ` where `<num>` is the issue number you are resolving/implementing. Put this in the PR description.

## 6. Pull requests require review from one person before merge

## 7. Merge if no conflicts and linter + tests pass

# Run app locally:

- Clone repo
- in `source` run `npm install --save-dev`
- Either run `npm start &` to host locally or start a `live server` on `index.html` in `VSC` to run with live server extension


