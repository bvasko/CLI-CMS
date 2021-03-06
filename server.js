require('dotenv').config();
const database = require('./database.js');
const userOptions = require('./userOptions.js');
const makeApp  = require('./app.js');

const app = makeApp(database, userOptions);

app.startApp(userOptions.list);