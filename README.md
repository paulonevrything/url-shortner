# URL Shortener
This project contains a Fullstcak application built using Typescript - VueJs for the frontend, NodeJs for the backend and MongoDb database.


## Scope of the project

#### Backend

-   NodeJs and Typescript for the server side language
-   [Loopback 4](https://loopback.io/doc/en/lb4/index.html) for microservices REST framework.
-   Repository Pattern
-   Unit tests on the API controllers
-   Open API documentation using Swagger UI
-   MongoDB for the Database.
-   [Nanoid](https://www.npmjs.com/package/nanoid) for generating unique strings
-   [Yup](https://www.npmjs.com/package/yup) for request validation

### User Interface

-   A single page application built with Typescript and VueJs [Bootstrap Vue](https://bootstrap-vue.org/)  compnents
-   Webpack: Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging modules.
-   Modularized project structure.
-   Axios for http calls
-   [vue-clipboard2](https://www.npmjs.com/package/vue-clipboard2) for the clipboard feature

## Likely Improvements

Likely improvements that can be done on the project include:

-   Redis caching
-   Custom short urls from users
-   Dns look up for inputed urls
-   Securing the endpoints using JWT/OAuth/Basic Auth

## Installation information

Clone the project
```
git clone https://github.com/paulonevrything/url-shortner
```
CD into project root
```
cd url-shortner
```

### Docker
From the project root, run the following:
```
docker-compose build
docker-compose up
```
Launch the API documentation on swagger on [http://localhost:3000/explorer/](http://localhost:3000/explorer/)
Launch the Web Interface on [http://localhost:8080/](http://localhost:8080)
