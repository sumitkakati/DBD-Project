const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database :"mydb11",
    multipleStatements: true
});


module.exports=connection;