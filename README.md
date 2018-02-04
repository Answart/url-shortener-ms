# url-shortener-microservice

An app that listens for a URL after the /new/ path and returns a JSON object with the original_url and short_url. If URL in path is already shortened, directs user to link's location.

## User Stories

- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- When I visit that shortened URL, it will redirect me to my original link.

## Install

### Local

Create your own server. I used mLab.com.

Create a user on that server.

Create your own .env file in the root directory with a DB_URI which links to your server. Here is an example:
```
PORT=8000
DB_URI="mongodb://<dbuser>:<dbpassword>@ds223738.mlab.com:23738/answart-url-shortener-ms"
SECRET="my-super-secret"
APP_URL="http://answart-url-shortener-ms.herokuapp.com"
```

```
npm install
node server.js
```

```
http://localhost:8000
http://localhost:8000/new/https://www.google.com
http://localhost:8000/new/http://answart-url-shortener-ms.herokuapp.com/6170
```

### Production

```
https://answart-url-shortener-ms.herokuapp.com
https://answart-url-shortener-ms.herokuapp.com/new/https://www.google.com
https://answart-url-shortener-ms.herokuapp.com/new/http://answart-url-shortener-ms.herokuapp.com/6170
```

## Output

```
{ "original_url":	"https://www.google.com", "short_url": "https://answart-url-shortener-ms.herokuapp.com/1059" }
```
