const path = require('path');
const routes = require('./controllers');
const express = require('./express'); 
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');
const auth = require('./utils/auth')

const sequelize = require('./connection'); 

const app = express(); 
const PORT = process.env.PORT || 3001; 


