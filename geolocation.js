const request = require('request')

/**
 * Finds the location using Google Maps API.
 * @param {string} place - represents the coordinates of a location.
 */
module.exports.get_location = function(place, key) {
    var dict = {}
    var link = `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${key}`
    return new Promise((resolve, reject) => {
        request({
                url: link,
                json: true
            },
            (err, resp, body) => {
                console.log(link)
                const types = body.results[0].address_components[0].types
                if (body.status === "OK" && types.indexOf("locality")>= 0) {
                    dict.location = (body.results[0].address_components[0].long_name)
                    dict.lat = (body.results[0].geometry["location"].lat);
                    dict.long = (body.results[0].geometry["location"].lng);
                    resolve(dict)
                }
                else if(types.indexOf('locality')== -1){
                    dict["error"] = "Please select a city"
                    reject(dict)
                }
                else {
                    reject(body.status)
                }
            })
    })
}