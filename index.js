let $body = document.body
let $container = $('.container')

// Request next race data and invokes createUpcomingRaceCard to next race card
$.get("https://ergast.com/api/f1/current/next.json", function(data) {
    createUpcomingRaceCard(data)
});

// Request current season schedule and creates schedule
$.get("https://ergast.com/api/f1/current.json", function(data) {
    createSchedule(data)
})

// Creates next upcoming F1 Race Card Information
function createUpcomingRaceCard(data) {
    const raceInfo = data.MRData.RaceTable
    // console.log(raceInfo) // use to see all upcoming race's data

    const $nextRaceContainer = $(`<div class='nextRaceContainer'>Upcoming Race</div>`)
    const $nextRaceSeasonAndRound = $(`<h3 id='raceInfo'>${raceInfo.season} Season - Round ${raceInfo.round}</h3>`)
    $nextRaceContainer.appendTo($container)
    $nextRaceSeasonAndRound.appendTo($nextRaceContainer)

    const race = raceInfo.Races
    for (let i = 0; i < race.length; i++) {
        // console.log(race[i]) // use to get more specific info about each race 
        const raceName = race[i].raceName
        const raceDateAndTime = `${race[i].date} at ${race[i].time}`
        const trackName = race[i].Circuit.circuitName
        const trackLocation = `${race[i].Circuit.Location.locality}, ${race[i].Circuit.Location.country}`
        $nextRaceContainer.append([
            $(`<a id='raceName' href='${race[i].url}' target="_blank">${raceName}</a>`),
            $(`<div id='raceDate'>${raceDateAndTime}</div>`),
            $(`<div id='trackName'>${trackName}</div>`),
            $(`<div id='trackLocation'>${trackLocation}</div>`)
        ])
    }
}

// Creates current F1 Season Schedule
function createSchedule(data) {
    const $scheduleContainer = $(`<div class='seasonSchedule'></div>`)
    const $scheduleList = $(`<h3 id='raceList'>2022 Season Schedule</h3>`)
    $scheduleContainer.appendTo($body)
    $scheduleList.appendTo($scheduleContainer)

    const races = data.MRData.RaceTable.Races
    for (let i = 0; i < races.length; i++) {
        const nRaceRound = races[i].round
        const nRaceGP = races[i].raceName
        const nRaceDate = races[i].date
        const nRaceTrack = races[i].Circuit.circuitName
        const nRaceLocation = `${races[i].Circuit.Location.locality}, ${races[i].Circuit.Location.country}`
        $scheduleContainer.append([
            $(`<div class='raceCard' ><a href="${races[i].url}" target='_blank'></a></div>`).append([
            $(`<div id='round'>Round ${nRaceRound}</div>`),
            $(`<div id='gp'>${nRaceGP}</div>`),
            $(`<div id='date'>${nRaceDate}</div>`),
            $(`<div id='track'>${nRaceTrack}</div>`),
            $(`<div id='location'>${nRaceLocation}</div>`)
            ])
        ])
        $('.raceCard').click(function() {
            window.location = $(this).find("a").attr("href")
            return false
        })
        
    }
}

// Shows previous race results container when link in nav bar is clicked
let $resultBox = $('#resultLink')
$resultBox.on('click', () => {
    let $showResult = $('.resultContainer')
    $showResult.show()
    createExit($showResult)
})

$.get('https://en.wikipedia.org/w/api.php?action=query&titles=Formula_One&format=json&origin=*', function(data) {
    console.log(data)
})

// function pastDate (raceDate) {
//     const currentDate = new Date()
//     if (raceDate < currentDate) {
//         // do something to the div
//     }
// }

// function getCurrentDate(date) {
//     const today = new Date()
//     const year = today.getFullYear().toString().slice(-2)
//     const month = 
// }