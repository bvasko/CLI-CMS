const database = require('./database.js');
const makeApp = require('./app.js');

const app = makeApp(database);

app.listen(3001, () => console.log("listening on port 3001"))