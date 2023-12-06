const xml2js = require('xml2js');
const fs = require('fs');
const Instrument = require('./instruments');
const partInfo = require('./partInfo');

class XMLParser {
    constructor() {
        this.parser = new xml2js.Parser({ attrkey: "ATTR" });
        this.builder = new xml2js.Builder({ attrkey: "ATTR" });
        this.xml = null;
        this.json = null;
        this.Dfile = {
            instruments: []
        };
    }

    async buildxml() {
        this.xml = await this.builder.buildObject(this.json);
        this.xml = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">'+this.xml.split('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>')[1]
        return this.xml
    }

    async reloadjson() {
        this.Dfile.instruments.forEach((instrument, index) => {
            this.json["score-partwise"]["part-list"][0]["score-part"][index] = instrument.toJSON()
        });
        this.json["score-partwise"] = {
            ...this.json["score-partwise"],
            ...this.Dfile.infos.toJSON()
        };
        return this.json
    }

    async loadFile(file) {
        file = fs.readFileSync(file, 'utf8');
        this.xml = file;
        this.json = await this.parser.parseStringPromise(this.xml);
        await this.reloadDebbusyFile();
        return this.json
    }

    reloadDebbusyFile() {
        this.json["score-partwise"]["part-list"][0]["score-part"].forEach(element => {
            this.Dfile.instruments.push(new Instrument(element))
        })
        this.Dfile.infos = new partInfo(this.json["score-partwise"])
    }

    get(type) {
        if (type == "instrument") {
            return this.Dfile
        }
    }
}

module.exports = XMLParser;