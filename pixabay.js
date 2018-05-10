const request = require('request')

/**
 * Changes the background based on searched city with Pixabay API.
 * @param {string} place - represents coordinates of location.
 */

module.exports.city_background = function(place, key){
    var dict_bg = {}
    var link = `https://pixabay.com/api/?key=${key}&q=${place}&image_type=photo`
    return new Promise((resolve, reject) => {
        request({
            url:link,
            json:true
        },
        (err, resp, body) => {
            dict_bg = (body.hits[0].largeImageURL);
            console.log(dict_bg)
            resolve(dict_bg)
        })
    })
}

/**
pixabay('vancouver', 'YOUR KEY').then((dictionary) => {
    console.log(dictionary)
    
    }, (error) => {
    console.log(error)
} )*/

