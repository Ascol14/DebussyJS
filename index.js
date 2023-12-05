const express = require('express')
const app = express()
const port = 3000
const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ attrkey: "ATTR" });



app.use('/', express.static('public'))

app.get('/get', async (req, res) => {
    file = fs.readFileSync('exemple.musicxml', 'utf8');

    parser.parseString(file, function (error, result) {
        if (error === null) {
            console.log(result)

            res.send(file)
        }
        else {
            console.log(error);
        }
    });
})

app.listen(port, () => {
    console.log(`Debussy static server listening on port ${port}`)
})