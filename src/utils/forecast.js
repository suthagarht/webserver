const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f0efb6e82cbaf0efe087881448add940&query=' + encodeURIComponent(latitude) + ',' +  encodeURIComponent(longitude)

    console.log(url)
request({url, json: true}, (error, response) => {
    if (error) {
        console.log(error)
        console.log('Something to do with saccessing the forcast API URL:.')
    } else if (response.body.error) {
        console.log(response.body)
        console.log(response.body.error) 
    } else {
        console.log(response.body.current.weather_descriptions)
        // console.log(response.body)
        callback(undefined, {
            forecastText: response.body.current.weather_descriptions,
            localTime: response.body.location.localtime
        })
    }
})
}

module.exports = forecast