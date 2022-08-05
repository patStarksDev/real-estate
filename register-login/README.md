# Real Estate Management App

I am building a real estate management app for a client.

This is the user registration and login portions of the app.

**Link to project:** TBA

![alt tag](https://placekitten.com/1200/650)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Mongo.db, Express, Node.js

TODO:

-   form validation
-   user authentification
    -   OAuth 2.0
    -   Bearer tokens
-   data sanitation

-   separate register and login pages
    -   res.redirect() ?
-   implement HTTPS
-   create MongoDB collection
-   migrate user array to MongoDB
-   launch on Heroku/similar

## Optimizations

-   localStorage vs sessionStorage
-   bcrypt vs argon2
-   self-encoded access tokens vs stored json web tokens in database

## Lessons Learned:

-   created simple server with express to handle user registration and login attempts
-   used brcypt to hash submitted passwords, and compare with stored hashes
-   form vaidation: required attribute

## Examples:

TODO
