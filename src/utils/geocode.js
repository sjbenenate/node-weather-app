const request = require('request')
const fs = require('fs')


const geocode = (address, callback) => {
    const MbAccessToken = 'access_token=' + fs.readFileSync('./src/keys/mapboxAPIKey.txt')
    const MbQueryOptions = '?' + MbAccessToken + '&limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json' + MbQueryOptions
    //console.log(url)
    request({url, json: true}, (error, {body: geocodeResponse} = {}) => {
        if (error) {
            callback('Unable to connect to location services.', {undefined})
        }
        else if (geocodeResponse.features === {undefined}) {
            callback('Location not found. Try another search.', {undefined})
        }
        else {
            callback(undefined, {
                latitude: geocodeResponse.features[0].center[1].toString(),
                longitude: geocodeResponse.features[0].center[0].toString(),
                location: geocodeResponse.features[0].place_name
            })
        }   
    })
}

module.exports = geocode