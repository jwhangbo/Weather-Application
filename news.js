const request = require("request");

/**
 * Gets top news about the location using the News API.
 * @param {string} city - city in with news is about.
 */
module.exports.NewsHeading = function(city, key) {
    var dict_title = {}
    var dict_url = {}
    var link = `https://newsapi.org/v2/top-headlines?q=${city}&apiKey=${key}`
    return new Promise((resolve, reject) => {
        request({
            url: link,
            json: true
        }, (error, response, body) => {
            temp = 0
            if (!("ok" in body)) {
                for (var i = 0; i < body.articles.length; i++) {
                    dict_title[i] = body.articles[temp].title
                    dict_url[i] = body.articles[temp].url
                    temp += 1
                }
            resolve({dict_title, dict_url})
            }
        })
    })
}