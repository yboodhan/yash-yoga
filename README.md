# yash-yoga

## Description:

Yash-Yoga is a full-stack web application that can be used to create and share custom yoga routines as well as to document one's yoga journey.

#### Features/Technologies:

This application contains local authorization (passport-local) along with Facebook and Github OAuths. The local auth uses BCrypt to salt and hash user passwords. Flash messages are used to notify the user of successes and errors where necessary. Sessions is used to keep user logged in. Sequelize is used to create, modify, and migrate models. EJS and EJS Layouts are used for back-end HTML. Async is used to handle asynschronous events. Moment is used to format dates for easy viewing by the user. Rowdy-logger is used to generate a table of all methods and paths. Bootstrap was used for styling, in conjunction with CSS, to make the app responsive.


This app uses JavaScript, jQuery, Node.js, PostgreSQL, HTML5, CSS, Bootstrap, etc. 

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
    ```
    * BASE_URL = 'http://localhost:3000'
    * GITHUB_CLIENT_ID
    * GITHUB_SECRET
    * FACEBOOK_CLIENT_ID
    * FACEBOOK_SECRET
    * SESSION_SECRET= 'can be anything'
    ```

7. Run the server with `nodemon`. Open browser and go to `http://localhost:3000`.

## Approach:

A combination of making physical notes, using comments throughout the process, and using Trello was implemented in order to track workflow and tasks.

* First, wireframes were hand-drawn and used as a guide to complete initial HTML and CSS elements of the application (dummy elements).

* Next, auth-boilerplate (containing OAuth and passport-local auth) was forked, cloned, and modified to fit models and interface designed for Yash-Yoga. All code was cleaned up to only include items for Yash-Yoga.

* Basic routes were created and stubbed. Content was added to all stubs using HTML, ejs, and ejs-layouts. Content was simultaneously styled using CSS.

* After basic functionality was tested and confirmed, routes were developed to incorporate interaction with the models (connect app functionality with database).

* The app development proceeded iteratively -- by building out one method at a time until one route was completed entirely and functioning properly before proceeding to the next route.

* Changes were committed after each iteration or notewhorthy change in code.

* The `readme.md` file was edited to summarize the app.

## Further Goals:
Due to the lack of time, code was not DRY and contains console.logs from testing as well. One big place for DRY code to be used is in the script of the show.ejs file for the slideshow of each routine (views/users/routines/show.ejs). There was repition of code that should be incorporated into a function which is then called. If given more time, code would be cleaner and easier to read/understand.

While the app allows the user to edit their routine, this functionality is limited in that users cannot modify poses already added to the routine and cannot remove poses -- they can only ever add. Of course this is not ideal and if given more time, I would try to incorporate the functionality to edit existing poses in a routine and remove poses as well.

While playing the slideshow, if the user stops the slideshow while playing and then begins again, the timer/duration for the current slide on the slideshow is reset to it's original value rather than continuing from where the timer was stopped. While this functionality was unintended intially (technically a bug), I decided to leave it in as it was something that in my opinion, improves the user experience. A user can stop, take time to figure out the pose, and get the time they originally gave themselves to complete it.

There is still much improvement for the app and much cleaning up for the code but overall, this application works as intended and has no blatant functionality errors/formatting issues.

