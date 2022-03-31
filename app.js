const express = require('express')
const app = express()
var mysql = require('mysql');
const readline = require('readline');
const fs = require('fs');
const { resolve } = require('path');

/*
//database server connection information
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

//connect to database server
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  //create database within database server
  con.query("CREATE DATABASE IF NOT EXISTS maliciousHashDB", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

  //connect to database 'mydb'
  con.query("USE maliciousHashDB", function (err, result) {
    if (err) throw err;
    console.log("connected to 'maliciousHashDB' database");
  });

  //create table
  var createTableQuery = "CREATE TABLE IF NOT EXISTS maliciousHash (hashID VARCHAR(16000))";
  con.query(createTableQuery, function (err, result) {
    if (err) throw err;
    console.log("created table 'maliciousHash'");
  });

  //set up read file interface
  var readLine = require('readline').createInterface({
    input: require('fs').createReadStream('maliciousHashes.txt')
  });

  //read maliciousHashes.txt file line by line and insert hash into database
  readLine.on('line', function (line) {
    var insertQuery = `INSERT INTO maliciousHash (hashID) VALUES ('${line}')`;
    con.query(insertQuery, function (err, result) {
      if (err) throw err;
    });
  });

  //helps print this console.log message in the correct order
  setTimeout(() => { console.log("inserted 100 malicious hashes"); }, 10);


});
*/

app.use(express.static('public'))
app.use('/images', express.static('images'))
app.use('/static', express.static('static'))

//GET request to root of web page and render homePage.html file
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/homePage.html");
})


//GET request to /results and render resultsPage.html file
app.get('/results', function (req, res) {
  res.sendFile(__dirname + "/resultsPage.html");
})


app.listen(3000);
