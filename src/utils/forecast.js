//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })




const request = require('request')


  const forecast = ((lat, long, callback) => {

    const URL_forecast = 'https://api.darksky.net/forecast/59d7d2b04a366f03d3c4faf3bc3b1d6c/'+ lat + ','+ long

    request({url:URL_forecast, json:true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to weather service ', undifined)
        } else if (body.error) {
            callback('unable to find location ', undifined)
        } else {
         // console.log(body.daily.data[0]) // to see the data in the body API
            callback(undefined, 'It is currently ' + body.daily.data[0].summary+ ' It is currently '+  body.currently.temperature + ' degrees out, the hight today is ' +body.daily.data[0].temperatureHigh + ' . With a low of ' +body.daily.data[0].temperatureLow +' . there is a ' + body.currently.precipProbability+ ' % chance of rain.')
        }
    })
  })            


  //calling forecast funtion
// forecast(-75.7088, 44.1545, (error, forecastData) => {
//     console.log('Error', error)
//     console.log('Data', forecastData)
//   })

module.exports = forecast 