# BookHuddle

> An app for book lovers who want to create, join and enjoy book clubs.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [Installing Dependencies](#installing-dependencies)
1. [Roadmap](#roadmap)

## Usage

- From the landing page, a user can sign up for an account or login with preexisting credentials.
- From the dashboard, a user can create a club or join an existing club by using the search bar.
- Within the club page a user can create new meetings and select a book to discuss.

## Requirements

In addition to the dependencies listed in package.json, you will need recent versions of node and mySQL installed on your computer.

Dependencies

```
  "algolia-places-react": "^1.1.0",
  "axios": "^0.18.0",
  "bluebird": "^3.5.1",
  "body-parser": "^1.18.2",
  "bookshelf": "^0.13.2",
  "crypto-js": "^3.1.9-1",
  "cryptojs": "^2.5.3",
  "dotenv": "^5.0.1",
  "express": "^4.16.2",
  "express-graphql": "^0.6.12",
  "express-session": "^1.15.6",
  "graphql": "^0.13.2",
  "knex": "^0.14.4",
  "luxon": "^1.0.0",
  "moment": "^2.22.0",
  "mysql": "^2.15.0",
  "react": "^16.2.0",
  "react-datetime": "^2.14.0",
  "react-dom": "^16.2.0",
  "react-facebook-login": "^4.0.1",
  "react-router-dom": "^4.2.2",
  "reactstrap": "^5.0.0-beta.3",
  "request-promise": "^4.2.2",
  "socket.io": "^2.0.4",
  "socket.io-client": "^2.0.4",
  "uuid": "^3.2.1",
  "xml2js": "^0.4.19"
```

## Development

Dev Dependencies

```
  "babel": "^6.23.0",
  "babel-core": "^6.26.0",
  "babel-loader": "^7.1.2",
  "babel-plugin-syntax-dynamic-import": "^6.18.0",
  "babel-preset-es2015": "^6.24.1",
  "babel-preset-react": "^6.24.1",
  "chai": "^4.1.2",
  "css-loader": "^0.28.10",
  "enzyme": "^3.3.0",
  "eslint": "^4.19.1",
  "eslint-config-airbnb": "^16.1.0",
  "eslint-plugin-import": "^2.9.0",
  "eslint-plugin-jsx-a11y": "^6.0.3",
  "eslint-plugin-react": "^7.7.0",
  "mocha": "^5.0.4",
  "nodemon": "^1.17.3",
  "request": "^2.85.0",
  "style-loader": "^0.20.3",
  "supertest": "^3.0.0",
  "webpack": "^3.11.0"
```

### Installing Dependencies

From within the root directory:

```
1) npm install
2) Create .env file with your AWS API credentials:
  a) Sign up for an AWS account
      AWS_ACCESS_KEY_ID='hash'
      AWS_SECRET_ACCESS_KEY='hash'
      ASSOCIATE_ID='idGoeshere'
  b) Set up your .env with the following attributes:
      DATABASE_HOST='url'
      DATABASE_USER='username'
      DATABASE_PASSWORD='password'
      DATABASE_NAME='myDatabase'
3) npm run react-dev
4) npm run server-dev
5) Setting up local instance of mySQL: (mac-specific instructions)
  a) Install homebrew with this command in terminal: `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
  b) Update homebrew: `brew update`
  c) Run the MySQL daemon `brew services start mysql`
  d) Assign a username and password (in this example user is 'root' and password is 'password'): `mysqladmin -u root password 'password'`
  e) download and install sequalPro (https://sequelpro.com/download#auto-start) <-- optional, there are other ways of setting up mySQL.
  f) Configure the db in sequalPro:
      i) set 'host' to '127.0.0.1'
      ii) use your username and password from step d.
      iii) hit 'connect'
      iv) click Database > Add Database and name it
```

### Roadmap

View the project roadmap [here](https://github.com/LetsGitGoing-Labs/BookHuddle/issues)


