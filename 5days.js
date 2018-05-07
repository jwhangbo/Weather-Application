const request = require('request');

/**
 * Builds 5 day forecast
 * @param  {String} location Location to obtain weather for
 * @param  {String} key      API Key used
 * @return {Dictionary}          Build up dictionary with all info needed.
 */
module.exports.forecast5days = function(location, key){
    var dict = {}
    var link = `https://api.worldweatheronline.com/premium/v1/weather.ashx?q=${location}&num_of_days=5&key=${key}&fx=yes&tp=24&format=json`
    return new Promise ((resolve, reject)=>{
        request({
            url: link,
            json: true
        },
    (error, response, body) =>{ 
        if(Object.keys(body["data"])[0] != "error"){
            var wwo = JSON.parse(JSON.stringify(body))["data"]["weather"]
            for(var i=0; i < 5; i ++){
                var day = i + 1
                var dayinfo = {}
                dayinfo["desc"] = wwo[i]["hourly"][0]["weatherDesc"][0]["value"]
                dayinfo["icon"] = wwo[i]["hourly"][0]["weatherIconUrl"][0]["value"]
                dayinfo["maxtemp"] = wwo[i]["maxtempC"]
                dayinfo["mintemp"] = wwo[i]["mintempC"]
                dict["day"+day] = dayinfo
            }
            
            
            resolve(dict)
        }else{
            reject(body["data"])
        }
    })
    })
}