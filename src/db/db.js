//database connection

const mongoose = require('mongoose');
const createConnection = mongoose.createConnection(process.env.DB_URL)
const connectDatabase = async () => {
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedtopology : true,
    }).then(() => console.log('Database Connected...'))
        .catch((err) => {
            console.log(err);
            createConnection;
        });
}

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
    } catch (err) {
        console.log("disconnectDB catch >> ", err);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
};

module.exports = { connectDatabase, createConnection, disconnectDB };