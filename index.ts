import {Application} from "express";
require('dotenv').config();
const express = require("express");
const app:Application = express();

const getUsers = require('./api/getUsers');
getUsers.set(app);

const deleteUser = require('./api/deleteUser');
deleteUser.set(app);

const createUser = require('./api/createUser');
createUser.set(app);

const getUserCategories = require('./api/getUserCategories');
getUserCategories.set(app);

const getUserNews = require('./api/getUserNews');
getUserNews.set(app);

const linkUserWithCategory = require('./api/linkUserWithCategory');
linkUserWithCategory.set(app);

const unlinkUserWithCategory = require('./api/unlinkUserFromCategory');
unlinkUserWithCategory.set(app);

const port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});

