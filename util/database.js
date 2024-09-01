const database = require('mysql2');

const pool = database.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'Shyam@123',
});

module.exports = pool.promise();
