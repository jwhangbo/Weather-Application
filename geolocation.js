const request = require('request')

/**
 * Finds the location using Google Maps API.
 * @param {string} place - represents the coordinates of a location.
 */
module.exports.get_location = function(place, key){
    var dict = {}
    var link = `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${key}`
    return new Promise((resolve, reject) => {
        request ({
            url: link,
            json: true
        },
    (err, resp, body) => {
        if (body.status === "OK"){
            dict.location = place;
            dict.lat = (body.results[0].geometry["location"].lat);
            dict.long = (body.results[0].geometry["location"].lng);
            resolve(dict)
        }
        else{
            reject(body.status)
        }
    })
    })
    
}