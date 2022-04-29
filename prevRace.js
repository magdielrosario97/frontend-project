let $body = document.body
let $container = $('.container')
// Creates Previous Race Results
function previousRaceResults() {
    $.get("http://ergast.com/api/f1/current/last/results.json", function(data) {

        const resultData = data.MRData.RaceTable.Races[0]
        const $resultContainer = $(`<div class='resultContainer'></div>`)
        $resultContainer.appendTo($container)
        $resultContainer.append([
            $(`<h3 id='resultInfo'>${resultData.season} Season - Round ${resultData.round} - ${resultData.date}</div>`),
            $(`<div id='resultGP'>${resultData.raceName} - ${resultData.Circuit.circuitName}</div>`)
        ])
        
        const $resultTable = $(`<table></table>`)
        $resultTable.appendTo($resultContainer)
        $resultTable.append([
            $(`<th>Pos</th>`),
            $(`<th>Num</th>`),
            $(`<th>Driver</th>`),
            $(`<th>Constructor</th>`),
            $(`<th>Status</th>`),
            $(`<th>Points</th>`)
        ])

        const standing = resultData.Results
        for (let i = 0; i < standing.length; i++) {
            const $rows = $(`<tr></tr>`)
            $rows.appendTo($resultTable)
        const position = standing[i].position
        const num = standing[i].number
        const driver = `${standing[i].Driver.givenName} ${standing[i].Driver.familyName}`
        const constructor = standing[i].Constructor.name
        const status = standing[i].status
        const points = standing[i].points
        $rows.append([
            $(`<td>${position}</td>`),
            $(`<td>${num}</td>`),
            $(`<td>${driver}</td>`),
            $(`<td>${constructor}</td>`),
            $(`<td>${status}</td>`),
            $(`<td>${points}</td>`),
            ])
        }
    })
}

previousRaceResults()