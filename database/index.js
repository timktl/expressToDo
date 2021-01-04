const mongoose = require('mongoose');

const databaseConnection = mongoose.connect('mongodb://localhost/todo', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    connectTimeoutMS: 1000,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.log(`Unable to connect to database server. Please restart the server. \nError:`, err);
    } else {
        console.log('Connected to database server successfully!');
    }
})

module.exports = databaseConnection;