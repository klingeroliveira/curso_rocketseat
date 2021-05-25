const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: 'adm',
    host: 'localhost',
    port: 5432,
    database: 'foodfy'
})