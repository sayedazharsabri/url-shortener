# url-shortener
This is a URL shortener project. Tech stack is NodeJS, Express, TypeScript and MongoDB


# To start
1. Clone the repository
2. RUN: yarn install
3. Provide connection string to mongoDB, for development put it in nodemon.json
- RUN: yarn start:dev
4. To Build 
- RUN: yarn build
5. To run JavaScript files, after build (Make sure that environment contain CONNECTION_STRING)
- yarn start
6. To fix lint
- yarn lint:fix
7. To check lint
- yarn lint 



# API Calls
- On development, send body on below URL
1. To create short URL
- POST Request: localhost:3000/shorturl/
- body should be JSON containing originalURL like

    {
    "originalURL":"http://mydomain.com/someotherpath"
    }

2. To get Original URL
- Send shortURL without the base for development (in our case base is "tier.app/")
- localhost:3000/shorturl/shortURLWithoutBase
- Example, let shortURL is "tier.app/71627eab" then send like below
- localhost:3000/shorturl/71627eab
