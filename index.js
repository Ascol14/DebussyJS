const express = require('express')
const app = express()
const port = 3000
const partitionManager = require('./Debussy-MusicXLM-Parser/index.js');
const partition = new partitionManager()
const fs = require('fs')

app.use('/', express.static('public'))

app.get('/get', async (req, res) => {
    file = await partition.loadFile('exemple.musicxml')
    partition.Dfile.instruments[0].name = "Trompette"
    partition.Dfile.infos.title = "Test"
    partition.reloadjson()
    console.log(partition.json["score-partwise"])
    fs.writeFileSync('exemple2.musicxml', await partition.buildxml(), "utf-8")
    res.send(file)
})

app.listen(port, () => {
    console.log(`Debussy static server listening on port ${port}`)
})