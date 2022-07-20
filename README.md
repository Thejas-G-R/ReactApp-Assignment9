React App - Assingment 9
Running the application:

Node server:
Node nodeServer.js

Mongo Server:
mongod --dbpath {{your path to the mongoData folder}}

React app:
yarn start

Description/Features of the React app:

1. The app contains dependency for react-router-dom which is used for routing.
2. Initially we have a landing page which requires a valid login credential to proceed
3. On successful login we are routed to the home page which displays a number of cards and has a nav bar
4. Links on the navbar lead to different pages which are independent react components displaying cards with information
5. Cards used in the app is a custom complex component which intern contains a Square and Label component
