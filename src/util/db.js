const mysql = require('mysql');
const env = require("dotenv").config({
    path: '../../.env'
});

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
});


con.connect((err) => {
    if(err){
        console.log(`Error occured during trying to connect with database: ${err}`);
    }
})

module.exports = con;

