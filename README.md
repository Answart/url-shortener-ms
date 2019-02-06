[travis]: https://travis-ci.org/Answart/url-shortener-ms
[dependency]: https://david-dm.org/Answart/url-shortener-ms
[snyk]: https://snyk.io/test/github/Answart/url-shortener-ms
[MIT]: https://github.com/Answart/url-shortener-ms/blob/master/LICENSE.md

<p align="center">
  <img src="https://user-images.githubusercontent.com/4269260/52347547-0a5bb300-29d7-11e9-836b-be7378cdbbd9.png" height="250" width="350">
  <img src="https://user-images.githubusercontent.com/4269260/52347549-0b8ce000-29d7-11e9-9cec-4187d7b531cf.png" height="250" width="350">
</p>

# URL Shortener Micro-service

[![Build Status](https://travis-ci.org/Answart/url-shortener-ms.svg)][travis]
[![dependencies Status](https://david-dm.org/Answart/url-shortener-ms/status.svg)][dependency]
[![Known Vulnerabilities](https://snyk.io/test/github/Answart/url-shortener-ms/badge.svg)][snyk]
[![MIT](https://img.shields.io/github/license/Answart/url-shortener-ms.svg)][MIT]

An app that takes a url and returns a a JSON object with the shortened url. If given url is already shortened, user is directed to the link's location.

```json
{
  "original_url": "https://www.google.com",
  "short_url": "http://localhost:8000/s/6695"
}
```

User Stories
------------

- I can pass a URL as a parameter and I will receive a shortened url in the JSON response.
- When I visit that shortened url, it will redirect me to my original link.

Tech Stack and Key Packages
---------------------------

* [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for node
* [EJS](https://ejs.co/): Embedded JavaScript templates
* [express-ejs-layouts](https://github.com/Soarez/express-ejs-layouts#readme): Layout support for ejs in express
* [express-session](https://github.com/expressjs/session#readme): Create express session middleware with given options
* [express-flash](https://github.com/RGBboy/express-flash#readme): Rendering flash messages without redirecting the request
* [body-parser](https://github.com/expressjs/body-parser#readme): Node.js body parsing middleware
* [cookie-parser](https://github.com/expressjs/cookie-parser): Parse Cookie header and populate req.cookies with an object keyed by the cookie names
* [mongoose](https://mongoosejs.com/): MongoDB object modeling tool designed to work in an asynchronous environment.
* [connect-mongo](https://github.com/jdesboeufs/connect-mongo#readme): MongoDB session store for Connect and Express
* [dotenv](https://github.com/motdotla/dotenv#readme): Load environment variables from .env file
* [request](https://github.com/request/request#readme): Used to make http calls

Getting Started
---------------

Create your own server. I used [**mLab.com**](http://mLab.com). Create a user on that server.

Create your own **.env** file in the root directory:
```bash
HOST=localhost
PORT=8000
SECRET=my-super-secret
MONGODB_URI=mongodb://<dbuser>:<dbpassword>@<mlabdatabase>
PUBLIC_URL=http://localhost:8000
```

Install dependencies then launch app @ [**localhost:8000**](http://localhost:8000)
```bash
$ npm install
$ npm run start:dev
```

Example routes:

* http://localhost:8000
* http://localhost:8000/new/https://www.google.com
* http://localhost:8000/s/6695

View [app in production](https://answart-url-shortener-ms.herokuapp.com) (if still live)

NPM Commands
------------

| Command | Description |
| ------- | ----------- |
| npm install | Install dependencies |
| npm run start:dev | Launch app locally @ **[localhost:8000](http://localhost:8000)** |
