const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./db');
const User = require('./models/User');

const app = express();
app.use(express.json());

try {
    sequelize.sync().then(() => {
        console.log('PostgreSQL database is connected and synced');
    });
} catch(error){
    console.log('Error encountered while connecting to database', error);
}