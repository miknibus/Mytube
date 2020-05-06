# Mytube

Cloning Youtube with Vanilla and NodeJS

## Quick Install
- Declare empty git repository with `git init` and clone with the following command
  ```shell
  git clone https://github.com/miknibus/Mytube.git
  ```
- [Install NPM](https://www.npmjs.com/get-npm)

## Project Description

This is a Javascript full stack practice application to recreate functionalities like: basic authentication, front-end design, back-end http server and video upload to database.

- #### External Resource Package Management

    [NPM Package Manager](https://npmjs.com/) is used for all dependency management.

- #### Front-end
    
    HTTP requests are received from the server to render view components with [PugJS](https://pugjs.org/) and [SCSS / SASS](https://sass-lang.com/)

- #### Back-end
    
    Back-end is written in vanilla Javascript and mainly uses the server framework called [ExpressJS](https://expressjs.com/) which is acquired through [Node.JS](https://nodejs.org/). Node.JS is a tool that helps run JavaScript outside of the browser and run within the system.

- #### Dev-Ops
    [Webpack.JS](https://webpack.js.org/) is used to control build flow and pipeline asset packaging of [Babel](https://babeljs.io/) / Front-end view component / [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX) interactivity. Webpack and Babel ensures browser compatibility by converting modern Javascript [ES6](http://es6-features.org/) into one giant static HTML/CSS/JS file.

- #### Database
    Community open-source NoSQL database [MongoDB](https://www.mongodb.com/) is used to store data in [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) format. This database is created through [MongooseJS](https://mongoosejs.com/docs/) which uses Model Schemas of User / Comment / Video which cross reference each other via array format of ids. 

- #### Authentication
    [Passport](http://www.passportjs.org/) is injected as middleware in the Express server which utilizes different authentication strategies to serialize the req.user. This project uses pre-built github-strategy and local strategy. Twitch strategy was manually developed using Oauth2Strategy.prototype and [Request](https://www.npmjs.com/package/request).

## Dev Commands

This process will start a development test server at localhost

1. Install Dependencies

   ```shell
   npm install
   ```

2. [Download .env](https://drive.google.com/file/d/1aSzm7Qs8FG5oyO_RmFc4IpoTxtKDeqkH/view?usp=sharing) file to the project root directory

3. Run Development Assets

   This process will watch client side assets changes (JS, SCSS, PUG, etc)

   ```shell
   npm run dev:assets
   ```

4. Run Develop Server

   This process will watch server side code (express server, passport, db, package.json, etc)

   ```shell
   npm run dev:server
   ```
## Dependencies Reference and Guides

The following are useful links and dependency documentations.

### Used Tool Links

- [Node JS](https://nodejs.org/en/)
- [NPM](https://npmjs.com/)
- [PugJS](https://pugjs.org/)
- [SCSS / SASS](https://sass-lang.com/)
- [Webpack.JS](https://webpack.js.org/)
- [Babel](https://babeljs.io/)

### Authentication

- [Passport](http://www.passportjs.org/)
- [Passport-github](http://www.passportjs.org/packages/passport-github/)
- [Passport-local](http://www.passportjs.org/packages/passport-local/)
- [Passport-oauth](http://www.passportjs.org/packages/passport-oauth/)
- [Passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)

### Database

- [MongoDB](https://www.mongodb.com/)
- [MongooseJS](https://mongoosejs.com/docs/)

### NPM packages

- [ExpressJS](https://expressjs.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Cross-env](https://www.npmjs.com/package/cross-env)
- [Axios](https://www.npmjs.com/package/axios)
- [Autoprefixer](https://www.npmjs.com/package/autoprefixer)
- [Nodemon](https://www.npmjs.com/package/nodemon)

##### Middlewares
  
The backend Express server utilizes middlewares. Middlewares are processes that are called in between every HTTP req -> res call.

- [Morgan](https://www.npmjs.com/package/morgan)
- [Helmet](https://www.npmjs.com/package/helmet)
- [Body-parser](https://www.npmjs.com/package/body-parser)
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [Express-session](https://www.npmjs.com/package/express-session)
- [Multer](https://www.npmjs.com/package/multer)
