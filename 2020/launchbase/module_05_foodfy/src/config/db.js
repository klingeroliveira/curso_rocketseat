const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: 'ADM',
    host: 'localhost',
    port: 5432,
    database: 'foodfy'
})