//imports 
const request = require('request')

//my function
const geocode = ((address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmlsbWFyeXMiLCJhIjoiY2s3dW5tYXR0MTl5YzNsb3VmYXZ1eTJuNiJ9.Rgw9fdr34cTx8zadz4gl9Q'

    request({ url: geocodeURL, json: true }, ((error, {body}) => {

        if(error) {
          //  console.log() -- is replace by a callback

          callback('unable to connect to location services!') //internat conncetion is did fail for example
        }else if (body.features.length === 0) {
            callback('unable to find location, please try another search', undefined)
        } else {
            callback(undefined, {
                //properties of the my data parameter. thiis is to be able to return and object with its attributes.  
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    }))
})


//calling the function
// geocode('Cumaná Venezuela', (error, forecastData) => {
//     console.log('Error: ', error)
//     console.log('Data: ', forecastData)

// })

//exporting geocode function (single funtion)
module.exports = geocode

//exporting many funtion
// module.export = {
//     geocode: geocode 
//     anotherFunction: functionName

// }