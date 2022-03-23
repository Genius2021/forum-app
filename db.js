require("dotenv").config();
const Pool = require("pg").Pool;
                // OR below
// const  Client  = require("pg").Client


const db = new Pool({
    user: process.env.user || "postgres",
    host: process.env.host || "localhost",
    database: process.env.database || "blog",
    password: process.env.password,
    port: process.env.port || "5432",
});

// const db = new Client({
//     user: "postgres",
//     host: "localhost",
//     database: "blog",
//     password: "kasparov54",
//     port: "5432",
// });



module.exports = {
    db,
}