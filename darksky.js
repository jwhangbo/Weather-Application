const request = require('request')

/**
 * Gets the weather and returns a dictionary with the weather information.
 * @param {string} lat - The latitude of the location.
 * @param {string} lng - the longitude of the location.
 */
function get_weather(info, key){
    console.log(info)
    var dict = info
    var link = `https://api.darksky.net/forecast/b10f1155187ae53296449ef6730b03d3/${dict.lat},${dict.long}`;
    return new Promise((resolve, reject) => {
        request({
            url: link,
            json: true
        },
    (error, response, body) => {
        if (!('code' in body)){
            dict.temperature = Math.round((body.currently["temperature"]-32) * 5/9);
            dict.summary = body.currently["summary"];
            resolve(dict)
        }
        else{
            reject(body)
        }
    })
    })
}

module.exports = get_weather();
