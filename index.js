require('dotenv').config();
const { app } = require('./app');
require('./src/db/db').connectDatabase()


// creating server
const port = process.env.PORT;
console.log('server start @', port)
app.listen(port);
