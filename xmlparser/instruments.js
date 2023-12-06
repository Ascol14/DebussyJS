class Instrument {
    constructor(content = {}) {
        this.id = ""
        this.name = ""
        this.abbreviation = ""
        this.scoreInstrument = {}
        this.midiInstrument = {}
        this.midiDevice = {}

        if (content != {}) {
            this.id = content["ATTR"]["id"]
            this.name = content["part-name"][0]

            try { this.abbreviation = content["part-abbreviation"][0] } catch (ex) { }
            try {
                this.scoreInstrument = {
                    id: content["score-instrument"][0]["ATTR"]["id"],
                    name: content["score-instrument"][0]["instrument-name"][0]
                }
            } catch (ex) { }
            try {
                this.midiInstrument = {
                    id: content["midi-instrument"][0]["ATTR"]["id"],
                    name: content["midi-instrument"][0]["midi-channel"][0],
                }
            } catch (ex) { }
            try {
                this.midiInstrument.abbreviation = content["midi-instrument"][0]["midi-program"][0]
            } catch (ex) { }
            try {
                this.midiInstrument.volume = content["midi-instrument"][0]["volume"][0]
            } catch (ex) { }
            try {
                this.midiInstrument.pan = content["midi-instrument"][0]["pan"][0]
            } catch (ex) { }
            try {
                this.midiDevice = {
                    id: content["midi-device"][0]["ATTR"]["id"],
                    port: content["midi-device"][0]["ATTR"]["port"],
                }
            } catch (ex) { }
        }
    }

    toJSON() {
        var json = {
            "ATTR": {
                "id": ""
            },
            "part-name": [""],
            "part-abbreviation": [""],
            "score-instrument": [{
                "ATTR": {
                    "id": ""
                },
                "instrument-name": [""]
            }],
            "midi-instrument": [{
                "ATTR": {
                    "id": ""
                },
                "midi-channel": [""],
                "midi-program": [""],
                "volume": [""],
                "pan": [""]
            }],
            "midi-device": [{
                "ATTR": {
                    "id": "",
                    "port": ""
                }
            }]
        }
        json["ATTR"]["id"] = this.id
        json["part-name"][0] = this.name
        json["part-abbreviation"][0] = this.abbreviation
        json["score-instrument"][0]["ATTR"]["id"] = this.scoreInstrument.id
        json["score-instrument"][0]["instrument-name"][0] = this.scoreInstrument.name
        json["midi-instrument"][0]["ATTR"]["id"] = this.midiInstrument.id
        json["midi-instrument"][0]["midi-channel"][0] = this.midiInstrument.name
        json["midi-instrument"][0]["midi-program"][0] = this.midiInstrument.abbreviation
        json["midi-instrument"][0]["volume"][0] = this.midiInstrument.volume
        json["midi-instrument"][0]["pan"][0] = this.midiInstrument.pan
        json["midi-device"][0]["ATTR"]["id"] = this.midiDevice.id
        json["midi-device"][0]["ATTR"]["port"] = this.midiDevice.port

        return json
    }
}

module.exports = Instrument;