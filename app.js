const express = require('express')
const app = express()

//GET request to root of web page and render homePage.html file
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/homePage.html");
})


//GET request to /results and render resultsPage.html file
app.get('/results', function (req, res) {
    res.sendFile(__dirname + "/resultsPage.html");
  })

app.listen(3000)