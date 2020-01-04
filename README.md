# express-auth

This is the basic starting code for projects. It is a skeleton node/express app with basic local user authentication. It exists so that *I don't have to start from scratch on my projects*.

## What it includes:

* Sequelize user model / migration
* Settings for PostgreSQL
* Passport and passport-local for authentication
* Sessions to keep user logged in between pages
* Flash messages for errors and successes
* Passwords that are hashed with BCrypt
* EJS Templating and EJS Layouts

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

