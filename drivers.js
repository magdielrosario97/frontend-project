let $body = document.body
let $container = $('.container')

$.get('http://ergast.com/api/f1/2022/drivers.json', function (data) {
    createDriverList(data)
})

function createDriverList(data) {
    const driverData = data.MRData.DriverTable.Drivers
    console.log(driverData)

    const $numOfDrivers = $(`<div id='driverSum'>Number of Drivers: ${driverData.length}</div>`)
    $numOfDrivers.appendTo($container)

    for (let i = 0; i < driverData.length; i++) {
        const codeName = driverData[i].code
        const permNumber = driverData[i].permanentNumber
        const fullName = `${driverData[i].givenName} ${driverData[i].familyName}`
        const nationality = driverData[i].nationality
        $container.append([
            $(`<div class='driverCard'></div>`).append([
                $(`<div>${codeName}</div>`),
                $(`<div>${permNumber}</div>`),
                $(`<div>${fullName}</div>`),
                $(`<div>${nationality}</div>`),
                $(`<div><a href='${driverData[i].url}'>Biography</a></div>`),
            ])
        ])
    }
}