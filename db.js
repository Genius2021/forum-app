require("dotenv").config();
const Pool = require("pg").Pool;
                // OR below
// const  Client  = require("pg").Client


    const connectionString = `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}`

    const isProduction = process.env.NODE_ENV === "production";

   const DATABASE_URL = process.env.DATABASE_URL

const db = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl:{
        rejectUnauthorized: false,
    },
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