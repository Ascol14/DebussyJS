
ligneHeight = 2
interligne = 10
minMargin = 10

async function load() {
    res = await fetch("/get", {
        "headers": {
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
    })
    partition = await res.json()
    console.log(partition)

    render(20, 10, partition)
}

function render(x, y, partition) {
    var canvas = document.getElementById("score");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        partHeight = ligneHeight * 5 + interligne * 4

        lignId = 0
        textMargin = 0

        partition["score-partwise"]["part-list"][0]["score-part"].forEach(element => {
            ctx.font = `${partHeight / 2}px serif`;
            ctx.textBaseline = "top";
            var texte = ctx.measureText(element["part-name"]);
            if (texte.width > textMargin) {
                textMargin = texte.width
            }
        });

        partition["score-partwise"]["part-list"][0]["score-part"].forEach(element => {
            console.log(element["part-name"])
            ctx.font = `${partHeight / 2}px serif`;
            ctx.textBaseline = "top";
            ctx.textAlign = "center";
            ctx.fillText(element["part-name"], x + textMargin / 2, y + partHeight / 4 + lignId * (partHeight + minMargin));

            ctx.fillStyle = "rgb(0, 0, 0)";
            for (let i = 0; i < 5; i++) {
                ctx.fillRect(x + textMargin + minMargin, y + i * interligne + lignId * (partHeight + minMargin), 50, ligneHeight);
            }


            ctx.strokeStyle = "rgb(255, 0, 0)";
            startingpoint = {
                x: x + textMargin + minMargin + interligne,
                y: y + interligne * 3 + ligneHeight / 2
            }
            ctx.beginPath();
            ctx.moveTo(startingpoint.x, startingpoint.y)
            ctx.arc(startingpoint.x, startingpoint.y - 0.5 * interligne, 0.5 * interligne, Math.PI * 0.5, -Math.PI * 0.5, false);
            ctx.arc(startingpoint.x, startingpoint.y, interligne, -Math.PI * 0.5, Math.PI * 0.5, false);
            ctx.arc(startingpoint.x, startingpoint.y - 0.25 * interligne, 1.25 * interligne, Math.PI * 0.5, -Math.PI * 0.5, false);
            ctx.bezierCurveTo(startingpoint.x + interligne, startingpoint.y - 1.75 * interligne, startingpoint.x + 0.5 * interligne, startingpoint.y - 4 * interligne, startingpoint.x, startingpoint.y - 4 * interligne);
            ctx.bezierCurveTo(startingpoint.x - 0.5 * interligne, startingpoint.y - 4 * interligne, startingpoint.x - 0.5 * interligne, startingpoint.y - 3 * interligne, startingpoint.x, startingpoint.y - 1.5 * interligne);
            ctx.lineTo(startingpoint.x, startingpoint.y + 1.5 * interligne);
            ctx.stroke();

            lignId += 1
        });
    }

}