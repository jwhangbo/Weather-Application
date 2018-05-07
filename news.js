const request = require("request");

/**
 * Gets top news about the location using the News API.
 * @param {string} city - city in with news is about.
 */
module.exports.NewsHeading = function(city, key) {
    var dict_title = {}
    var dict_url = {}
    var dict_pic = {}
    var link = `https://newsapi.org/v2/everything?sources=bbc-news&q=${city}&apiKey=${key}`
    return new Promise((resolve, reject) => {
        request({
            url: link,
            json: true
        }, (error, response, body) => {
            temp = 0
            if (!("ok" in body)) {
                if (body.articles.length > 5) {
                    for (var i = 0; i < 5; i++) {
                        dict_title[i] = body.articles[temp].title
                        dict_url[i] = body.articles[temp].url
                        dict_pic[i] = body.articles[temp].urlToImage
                        temp += 1
                    }
                } else {
                    for (var i = 0; i < body.articles.length; i++) {
                        dict_title[i] = body.articles[temp].title
                        dict_url[i] = body.articles[temp].url
                        dict_pic[i] = body.articles[temp].urlToImage
                        temp += 1
                    }
                }
            }
            resolve({dict_title, dict_url, dict_pic})
        })
    })
}