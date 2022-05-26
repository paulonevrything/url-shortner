# URL Shortener
This project contains a Fullstcak application built using Typescript - VueJs for the frontend, NodeJs for the backend and MongoDb database.


## [](https://github.com/paulonevrything/recepticon-web#scope-of-my-solution)[](https://github.com/paulonevrything/recepticon-web#scope)Scope of the project

#### [](https://github.com/paulonevrything/recepticon-web#backend)[](https://github.com/paulonevrything/recepticon-web#scope-backend)Backend

-   NodeJs and Typescript for the server side language
-   [Loopback 4](https://loopback.io/doc/en/lb4/index.html) for microservices REST framework.
-   Repository Pattern
-   Unit tests on the API controllers
-   Open API documentation using Swagger UI
-   MongoDB for the Database.

### [](https://github.com/paulonevrything/recepticon-web#user-interface)[](https://github.com/paulonevrything/recepticon-web#scope-ui)User Interface

-   A single page application built with Typescript and VueJs [Bootstrap Vue](https://bootstrap-vue.org/)  compnents
-   Webpack: Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging modules.
-   Modularized project structure.
-   Axios for http calls
-   

## [](https://github.com/paulonevrything/recepticon-web#limitations)[](https://github.com/paulonevrything/recepticon-web#limitations)Likely Improvements

Likely improvements that can be done on the project include:

-   Redis caching
-   Custom short urls from users
-   Dns look up for inputed urls






## Endpoints

1. Get Supported Currencies

   Request 

    ```
    http://localhost:8080/currencies
    ```
   Response

    ```
    {
        "currencies": 
        [
            {
                "id": "USD",
                "name": "US Dollar",
                "numberOfRequests": 0
            },
            {
                "id": "JPY",
                "name": "Japanese Yen",
                "numberOfRequests": 0
                },
            {
                "id": "BGN",
                "name": "Bulgarian Lev",
                "numberOfRequests": 0
            }
         ...
        ]
    }
    ```

2. Get Reference Rate

   Request

    ```
    http://localhost:8080/rates/reference-rate?target=usd
    ```
   Response

    ```
    {
        "rate": 1.1345,
        "source": "EUR",
        "target": "USD",
        "time": "2022-02-17T11:09:06.378+00:00",
        "chartUrl": "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html"
    }
    ```

3. Get Exchange Rate

   Request

    ```
    http://localhost:8080/rates/exchange-rate?source=cad&target=usd
    ```
   Response

    ```
    {
        "rate": 0.786,
        "source": "CAD",
        "target": "USD",
        "time": "2022-02-17T11:17:43.795+00:00",
        "chartUrl": "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html"
    }
    ```

5. Convert Currency

   Request

    ```
    http://localhost:8080/rates/convert?source=DKK&target=GBP&amount=4000
    ```
   Response

    ```
    {
        "rate": 0.11255,
        "source": "DKK",
        "target": "GBP",
        "time": "2022-02-17T11:18:58.635+00:00",
        "chartUrl": "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-gbp.en.html",
        "amount": 4000,
        "result": 450.2
    }
    ```

## Likely Improvements
- Adding persistence for the supported currencies
- Securing the endpoints using JWT/OAuth/Basic Auth


## Installation information
### Maven
Build project to standalone application
```
mvn clean package
```
Run standalone application
```
java -jar target/exchange_rate_service-0.0.1-SNAPSHOT.jar
```
Launch the API documentation on swagger on [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

### Docker
Create docker image from Dockerfile
```
docker build -t exchangerate:1 .
```
Run the container from the image
```
docker run -p 8080:8080 exchangerate:1 
```
Launch the API documentation on swagger on [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
