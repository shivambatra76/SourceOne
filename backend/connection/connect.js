const mongoose = require('mongoose');
const connect = async () => {
    try {
        await mongoose.connect(config.mongodb.url);
        process.conn1 = mongoose.connection;
        console.log('source_one db successfully connected!');
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    connect: connect
};
