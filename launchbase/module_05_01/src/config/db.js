const { Poll } = require("pg")

module.exports = new Poll({
    user: "postgres",
    passwor: "ADM",
    host: "localhost",
    port: 5432,
    database: "my_teacher"
})