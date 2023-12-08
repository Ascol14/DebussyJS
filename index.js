const express = require('express')
const app = express()
const port = 3000
const partitionManager = require('./musicxml-parser/index.js');
const partition = new partitionManager()
const fs = require('fs')

app.use('/', express.static('public'))

app.get('/get', async (req, res) => {
    file = await partition.loadFile('exemple.musicxml')
    console.log(partition.json["score-partwise"].part[0])
    console.log(partition.Dfile.parts)
    partition.reloadjson()
    fs.writeFileSync('exemple2.musicxml', await partition.buildxml(), "utf-8")
    res.send(file)
})

app.listen(port, () => {
    console.log(`Debussy static server listening on port ${port}`)
})