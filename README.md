# url-shortener-ms URL Shortener Micro-service

An app that listens for a URL after the /new/ path and returns a JSON object with the original_url and short_url. If URL in path is already shortened, directs user to link's location.

```
{ "original_url":	"https://www.google.com", "short_url": "https://answart-url-shortener-ms.herokuapp.com/1059" }
```

User Stories
------------

- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- When I visit that shortened URL, it will redirect me to my original link.

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

Create your own server. I used mLab.com.

Create a user on that server.

Create your own .env file in the root directory with a DB_URI which links to your server. Here is an example:
```
PORT=8000
DB_URI="mongodb://<dbuser>:<dbpassword>@ds223738.mlab.com:23738/answart-url-shortener-ms"
SECRET="my-super-secret"
APP_URL="http://answart-url-shortener-ms.herokuapp.com"
```

Install dependencies then launch app @ [http://localhost:8000](http://localhost:8000)
```
$ npm install
$ node server.js
```

Example routes:
```
http://localhost:8000
http://localhost:8000/new/https://www.google.com
http://localhost:8000/new/http://answart-url-shortener-ms.herokuapp.com/6170
```

View [app in production](https://answart-url-shortener-ms.herokuapp.com) (if still active)

```
https://answart-url-shortener-ms.herokuapp.com
https://answart-url-shortener-ms.herokuapp.com/new/https://www.google.com
https://answart-url-shortener-ms.herokuapp.com/new/http://answart-url-shortener-ms.herokuapp.com/6170
```

NPM Commands
------------

| Command | Description |
|---------|-------------|
|npm install|Install dependencies in package.json|
|node server.js|Start server port @ **localhost:8000**|
