A readme.md file with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, and a link to the live site.

# yash-yoga

## Description:

Yash-Yoga is a full-stack web application that can be used to create and share custom yoga routines as well as to document one's yoga journey.

Features/Technologies: This application contains local authorization (passport-local) along with Facebook and Github OAuths. The local auth uses BCrypt to salt and hash user passwords. Flash messages are used to notify the user of successes and errors where necessary. Sessions is used to keep user logged in. Sequelize is used to create, modify, and migrate models. EJS and EJS Layouts are used for back-end HTML. Async is used to handle asynschronous events. Moment is used to format dates for easy viewing by the user. Rowdy-logger is used to generate a table of all methods and paths.


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
* SESSION_SECRET='can be anything'

7. Run the server with `nodemon`. Open browser and go to `http://localhost:3000`.

## Approach

## Further Goals

### User Model
| Column Name | Data Type | Notes |
|---------------------|------------------------|----------------------------------------|
| id | Integer | Serial Primary Key |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |
| firstname | String | Required |
| lastname | String | - |
| email | String | Unique / For login |
| username | String | - |
| password | String | Hashed |
| photoUrl | String | Profile Picture |
| admin | Boolean | Default: false |
| bio | Text | - |
| birthdate | Date | - |

### Default Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | index.js | Home page |
| GET | * | index.js | Render error/404 page |
| GET | /auth/login | auth.js | Login form |
| GET | /auth/signup | auth.js | Signup form |
| POST | /auth/login | auth.js | Login user |
| POST | /auth/signup | auth.js | Creates User |
| GET | /auth/logout | auth.js | Removes session info |
| GET | /profile | profile.js | Regular User Profile |
| GET | /profile/admin | profile.js | Admin User Profile |

## Steps To Use

#### 1. Clone this repo and rename it to a new name you choose

```
git clone <repo_link> <your_new_name>
```

#### 2. Install all dependencies for this project

```
npm install
```

#### 3. Create your own project name for the project you want to use this with

But first! Remove defaults that won't apply to you:

* Title in `layout.ejs`
* Logo in NavBar
* Description/Repo Link in `package.json`
* Remove readme information and make relevant to new project

#### 4. Create a new local database for the project you are working on

```
createdb <new_db_name>
```

#### 5. Update your `config.json` file to your database and with your dialect

* Change the database name
* Check dialect is what you are using

#### 6. Modify/add models for relevancy in your projects

* Check required fields are needed in your project
* Add fields you may require
* Adjust migration accordingly

#### 7. Run the migration

```
sequelize db:migrate

```
#### 8. Add a `.env` file with the keys you need to run your app (API keys, secret keys, etc.)

* SESSION_SECRET can be any random string, usually hashed for production

> Note: If you need OAuth for Facebook for Github, switch to the directions on `with-oauth` brach.

#### 9. Run server to make sure it works

```
nodemon
```

or 

```
node index.js
```

#### 10. Create a new github repository for your project

* Create a new repository on your personal Github account (via GUI)
* Delete the old remote to origin (`git remote remove origin`)
* Add a new repository link as a remote location you can push to (`git remote add origin <new_link>`)
* Add, commit, and push:
    * `git add -A`
    * `git commit -m 'first commit'`
    * `git push origin master`

> Note: Do not make commits from new project to your auth boilerplate. Keep it the same so that you can reuse it for other projects.