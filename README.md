A readme.md file with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, and a link to the live site.

# yash-yoga

## Description:

Yash-Yoga is a full-stack web application that can be used to create and share custom yoga routines as well as to document one's yoga journey.

#### Features/Technologies:

This application contains local authorization (passport-local) along with Facebook and Github OAuths. The local auth uses BCrypt to salt and hash user passwords. Flash messages are used to notify the user of successes and errors where necessary. Sessions is used to keep user logged in. Sequelize is used to create, modify, and migrate models. EJS and EJS Layouts are used for back-end HTML. Async is used to handle asynschronous events. Moment is used to format dates for easy viewing by the user. Rowdy-logger is used to generate a table of all methods and paths.


This app uses JavaScript, jQuery, Node.js, PostgreSQL, HTML5, CSS, etc. 

#### Accessing the application:
**Link:** https://yash-yoga.herokuapp.com/

> Note: Facebook and Github OAuths are not currently functional on the deployed site (pending review).

#### To install/run this app locally:

1. Fork this repository. Click clone and copy the HTTPS link. Open terminal and run `git clone *insert HTTPS link here*`. Access the repository by changing directory accordingly (`cd yash-yoga`). 

2. Install all dependencies by running `npm install`.

3. Create a local database to store app models by using `createdb <db_name>`.

4. Update the `config.json` file appropriately to include database (from 3) and dialect.

5. Run migration by running `sequelize db:migrate`.

6. Create a `.env` file to store the following values (get through Facebook Developer or Github):

    * BASE_URL = 'http://localhost:3000'
    * GITHUB_CLIENT_ID
    * GITHUB_SECRET
    * FACEBOOK_CLIENT_ID
    * FACEBOOK_SECRET
    * SESSION_SECRET= 'can be anything'

7. Run the server with `nodemon`. Open browser and go to `http://localhost:3000`.

## Approach

## Further Goals
