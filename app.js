import { Low, JSONFile } from 'lowdb'
import express from 'express'
import fetch from 'node-fetch';
import fs from 'fs'
import readline from 'readline'
import path from 'path';

const __dirname = path.resolve();

const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-apikey': 'd939e12d943da23cbcbad42125c22fa6dd200bcd713bdcaf1d8c66f1390b2ec5' //'5d7310d34217a642c22cf788592e1e14b552485968825a9db8e47a213d01be48'
    }
  };

function VT_Api(hash) {
    return fetch(`https://www.virustotal.com/api/v3/files/${hash}`, options)
        .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${ response.status }`)
            }
        })
        .then(res => res.json())
        .then(data => data.data.attributes)
        .then(attributes => {
            return {
                crowdsourced_ids_stats: attributes.crowdsourced_ids_stats,
                last_analysis_stats: attributes.last_analysis_stats,
                md5: attributes.md5,
                names: attributes.names,
                reputation: attributes.reputation,
                sha1: attributes.sha1,
                sha256: attributes.sha256,
                sigma_analysis_stats: attributes.sigma_analysis_stats,
                size: attributes.size,
                type_description: attributes.type_description,
                type_extension: attributes.type_extension,
                type_tag: attributes.type_tag,
                valid: true
            }
        })
        .then(hash_info => {
            db.data[hash] = hash_info
            db.write()
        })
}

const adapter = new JSONFile('db.json')
const db = new Low(adapter)

await db.read()
if (db.data == null) {
    db.data = { }
    var readLine = readline.createInterface({
        input: fs.createReadStream('maliciousHashes-dummy.txt')
    })
    readLine.on('line', (hash) => VT_Api(hash).catch(error => console.log(error)))
}

const app = express()
app.use(express.static('public'))
app.use('/images', express.static('images'))
app.use('/static', express.static('static'))
app.use('/js', express.static('js'))

//GET request to root of web page and render homePage.html file
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/homePage.html");
})

//GET request to /results and render resultsPage.html file
app.get('/results', function (req, res) {
  res.sendFile(__dirname + "/resultsPage.html");
})

//GET request to /seach/:hash and return object representing file hash
app.get('/search/:hash', async (req, res) => {
  var hashInfo = db.data[req.params.hash]
  if (hashInfo == undefined) {
      await VT_Api(req.params.hash)
            .then(info => hashInfo = info)
            .catch(error => {
              console.log(error)
              hashInfo = {valid:false}
            })
  }
  res.send(hashInfo)
})

//GET request to /random and return object representing random file hash
app.get('/random', function (req, res) {
  const keys = Object.keys(db.data)
  res.send(db.data[keys[Math.floor(Math.random() * keys.length)]])
})

app.listen(3000);
