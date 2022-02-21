require("dotenv").config();
const Pool = require("pg").Pool;
                // OR below
// const  Client  = require("pg").Client


const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "blog",
    password: "kasparov54",
    port: "5432",
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