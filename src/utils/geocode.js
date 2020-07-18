const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidHViYW1vYnV0byIsImEiOiJja2JkeHd1cTEwZ2FxMnZxZWdlM3hsNGxxIn0.mig6GoV0cydjq4kDE8EthQ&limit=1'

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect: ', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to query: ', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode