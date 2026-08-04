# Full Movie Library

Full Movie Library is a Single-Page Application that provides comprehensive information on various movies.

## Features

- Movie Library has 5 pages: Home page, Settings page, Movie list page and Details page.
- In movie list page user can add the movies
- In Details page users can view the details of the movie and have an option to delete the movie from their list.
- In settings page user update their username

## Tech Stack

- HTML
- CSS
- TypeScript
- Jest is used for testing

## TypeScript Features Used

- Type checking
- Path aliasing

## Folder Structure

```
├── ./
│ ├── rootDir/
│ │ ├── package-lock.json
│ │ ├── jest.config.js
│ │ ├── .prettierrc.json
│ │ ├── README.md
│ │ ├── package.json
│ │ ├── tsconfig.json
│ │ ├── .eslintrc.json
│ │ ├── js/
│ │ │ ├── store.ts
│ │ │ ├── apiClient.test.ts
│ │ │ ├── main.ts
│ │ │ ├── formSubmissions.test.ts
│ │ │ ├── queue.test.ts
│ │ │ ├── types.js
│ │ │ ├── pages.test.ts
│ │ │ ├── store.test.ts
│ │ │ ├── router.test.ts
│ │ │ ├── typeMismatchDemo.ts
│ │ │ ├── router.ts
│ │ │ ├── components.ts
│ │ │ ├── movieServices.ts
│ │ │ ├── pages.ts
│ │ │ ├── queue.ts
│ │ │ ├── movieServices.test.ts
│ │ │ ├── types.d.ts
│ │ │ ├── apiClient.ts
│ │ │ ├── typeMismatchDemo.test.ts
│ ├── dist/
│ │ ├── .gitignore
│ │ ├── package-lock.json
│ │ ├── package.json
│ │ ├── index.html
│ │ ├── index.css
│ │ ├── js/
│ │ │ ├── router.test.js
│ │ │ ├── typeMismatchDemo.test.js
│ │ │ ├── queue.js
│ │ │ ├── formSubmissions.test.js
│ │ │ ├── pages.js
│ │ │ ├── store.test.js
│ │ │ ├── router.js
│ │ │ ├── components.js
│ │ │ ├── apiClient.js
│ │ │ ├── pages.test.js
│ │ │ ├── movieServices.js
│ │ │ ├── movieServices.test.js
│ │ │ ├── main.js
│ │ │ ├── store.js
│ │ │ ├── typeMismatchDemo.js
│ │ │ ├── queue.test.js
│ │ │ ├── apiClient.test.js

```

## How to Run

- Clone the repo using git clone `https://github.com/aswinvijayan-vonnue/Week4-New-Project.git `
- Change to dist directory
- Run the index.html using `npm run start  `
- Now the website is live on localhost

## How to Test

- Install jest
- run `npx jest `
