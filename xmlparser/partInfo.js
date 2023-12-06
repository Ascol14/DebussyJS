/* <work>
<work-number>D. 911</work-number>
<work-title>Winterreise</work-title>
</work>
<movement-number>22</movement-number>
<movement-title>Mut</movement-title>
<identification>
<creator type="composer">Franz Schubert</creator>
<creator type="poet">Wilhelm Müller</creator>
<rights>Copyright © 2001 Recordare LLC</rights>
<encoding>
  <encoding-date>2002-02-16</encoding-date>
  <encoder>Michael Good</encoder>
  <software>Finale 2002 for Windows</software>
  <encoding-description>MusicXML 1.0 example</encoding-description>
</encoding>
<source>Based on Breitkopf &amp; Härtel edition of 1895</source>
</identification> */

class partInfo {
    constructor(content = {}) {
        this.title = ""
        this.number = ""
        this.movtitle = ""
        this.movnumber = ""
        this.right = ""
        this.creator = {}
        this.encoding = {}
        this.source = ""

        if (content != {}) {
            try {
                this.title = content["work"][0]["work-title"][0]
            } catch (ex) { }
            try {
                this.number = content["work"][0]["work-number"][0]
            } catch (ex) { }
            try {
                this.movtitle = content["movement-title"][0]
            } catch (ex) { }
            try {
                this.movnumber = content["movement-number"][0]
            } catch (ex) { }
            content["identification"][0]["creator"].forEach(element => {
                this.creator[element["ATTR"]["type"]] = element["_"]
            });
            try {
                this.encoding = content["identification"][0]["encoding"]
            } catch (ex) { }
            console.log(this.encoding)
            try {
                this.source = content["source"][0]
            } catch (ex) { }
        }
    }

    toJSON() {
        var json = {
            "identification": [{}]
        }

        if (this.title != "") {
            if (json["work"] == undefined) {
                json["work"] = []
                json["work"][0] = {}
            }
            json["work"][0]["work-title"] = []
            json["work"][0]["work-title"][0] = this.title
        }
        if (this.number != "") {
            if (json["work"] == undefined) {
                json["work"] = []
                json["work"][0] = {}
            }
            json["work"][0]["work-number"] = []
            json["work"][0]["work-number"][0] = this.number
        }
        if (this.movtitle != "") {
            json["movement-title"] = []
            json["movement-title"][0] = this.movtitle
        }
        if (this.movnumber != "") {
            json["movement-number"] = []
            json["movement-number"][0] = this.movnumber
        }
        if (this.source != "") {
            json["source"] = []
            json["source"][0] = this.source
        }

        var creator = []
        var creatorList = this.creator
        Object.keys(creatorList).forEach(function (k) {
            console.log(k)
            creator.push({ _: creatorList[k], ATTR: { type: k } })
        });
        json["identification"][0] = {
            creator: creator,
            encoding: this.encoding
        }

        return json
    }
}

module.exports = partInfo;