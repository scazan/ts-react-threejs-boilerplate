# TS, React, Three.js boiler plate

Initially created from create-react-app and so inherits properties and conventions from there.

### includes:
* TypeScript
* React
* Three.js
* GSAP
* Styled Components
* AWS SDK
* Basic Gitlab CI/CD config
* WASM webpack support
* CSS reset from [github.com/necolas/normalize.css](https://github.com/necolas/normalize.css)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `yarn deploy`

Deploys the site to an S3 bucket (needs keys in the environment) and is used with the included gitlab CI/CD config
