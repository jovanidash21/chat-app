# Chat App
---

## Prerequisite
* [Node.js](https://nodejs.org/en/) installed.
* [Gmail API and OAuth 2.0 Credentials](http://masashi-k.blogspot.com/2013/06/sending-mail-with-gmail-using-xoauth2.html) registered. *Note: Follow Steps 2-4.
* [MongoDB](https://www.mongodb.com/) installed.

## Installation
* Clone or download this repository.
```
git clone https://github.com/jovanidash21/chat-app.git
```
* Using a terminal or cmd, navigate to the project directory.
```
cd chat-app
```
* Install node modules.
```
npm install
```
* Start the MongoDB Server.
```
mongod
```
* Open another terminal or cmd and run mongo.
```
mongo
```
* Create a database locally using MongoDB on your computer.
```
use chat-app
```
* Create a ```.env``` file.
* Copy and paste the texts in ```.env.example``` to ```.env``` and insert the values for each environment variables.
* Open another terminal or cmd and run the project.
```
npm run build
```
* Open a browser and visit ```localhost:3000```.
* Signup to create an account.
* Run in dev mode.
```
npm run dev
```

## NPM Scripts
* ```npm start``` - start the server.
* ```npm run build``` - run the project in production mode.
* ```npm run dev``` - run the project in dev mode.
* ```npm run webpack:prod``` - run the webpack in production mode.
* ```npm run webpack:dev``` - run the webpack in dev mode.
* ```npm run node:prod``` - run the node server in production mode.
* ```npm run node:dev``` - run the node server in dev mode.

## Credits
- [React-Redux-Socket.IO Chat](https://github.com/raineroviir/react-redux-socketio-chat)

## Website
[Live Demo](https://chat-app-jovanidash21.herokuapp.com/)
