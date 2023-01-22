# react-play-web-svc

`React Play web service` is basically a backend application to [ReactPlay](https://reactplay.io/). This is a node application destined to resides within [netlify](https://www.netlify.com/) ecosystem on [api.reactplay.io](https://api.reactplay.io)


For more information refer [React Play Gihub Repo](https://github.com/reactplay/react-play)


## 🏗️ How to Set up `react-play-web-svc` for Development?

### ⬇️ Install Dependencies
Install the dependencies by running the following command 
```bash
npm install
```
Or
```bash
yarn install
```

### 🦄 Start the Development Mode
Use the following command to start the app in the development mode:
```bash
npm start
```
Or
```bash
yarn start
```
### 🧱 Build the App for Production
Use the following command to build the app for production:

```bash
npm run build
```
Or
```bash
yarn build
```

### Production Environment
Even though the [api.reactplay.io](https://api.reactplay.io) is meant for the production URL however your every PR will create a preview build in netlify for validation


## Note
1. As the application is targetted for [netlify](https://www.netlify.com/) environment, you might notice some .netlify directory be created when you build it, you can safely ignore it.
1. It uses a concept called [Netlify Functions](https://www.netlify.com/products/functions/), so the entire build output gets populated under `functions/server.js`
1. Netlify has size validation for function [https://docs.netlify.com/edge-functions/limits/](https://docs.netlify.com/edge-functions/limits/) so its important to keep the build methodology set to  `esbuild` (refer `netlify.toml`)