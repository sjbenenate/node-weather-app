const request = require('request')
const fs = require('fs')

const forecast = (latitude, longitude, callback) => {

    const darkSkyAPIKey = fs.readFileSync('./src/keys/darkSkyAPIKey.txt')
    const darkSkyQueryOptions = '?lang=en&units=us&exclude=minutely,hourly,alerts,flags'
    const url = 'https://api.darksky.net/forecast/' + darkSkyAPIKey + '/' + latitude + ',' + longitude + darkSkyQueryOptions
    console.log(url)

    request({url, json: true}, (error, {body: forecastResponse} = {}) => {
        if (error) {
            callback('Unable to connect to weather services', {undefined})
        }
        else if (forecastResponse.error) {
            callback('Error in weather forcast response', {undefined})
        }
        else {
            dailyHigh = Math.round(forecastResponse.daily.data[0].temperatureHigh)

            highTime = new Date(forecastResponse.daily.data[0].temperatureHighTime)
            lowTime = new Date(forecastResponse.daily.data[0].temperatureLowTime)
            highHours = highTime.getHours()
            highMinutes = highTime.getMinutes()
            dailyLow = Math.round(forecastResponse.daily.data[0].temperatureLow)
            currentTemp = Math.round(forecastResponse.currently.temperature)
            currentPercip = Math.round(forecastResponse.currently.precipProbability)
            summary = forecastResponse.currently.summary

            callback(undefined, summary + '. Currently ' + currentTemp + 'F. High today of ' + dailyHigh + 'F at ' + highTime + '. Low today of ' + dailyLow + 'F at ' + lowTime + '.')
        }
    })
   
}

module.exports = forecast