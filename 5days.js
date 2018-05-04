const request = require('request');


/**
 * Builds 5 day forecast
 * @param  {String} location Location to obtain weather for
 * @param  {String} key      API Key used
 * @return {Dictionary}          Build up dictionary with all info needed.
 */
function forecast5days(location, key) {
    return new Promise  ((resolve, reject) => {
        var link = `https://api.worldweatheronline.com/premium/v1/weather.ashx?q=${location}&num_of_days=5&key=${key}&fx=yes&tp=24&format=json`
        request(
            link,
            function(error, response, body) {
                if (!error && response.statusCode == 200) {


                    var result = JSON.parse(body);
                    



                    var xdays = 0;
                    var html = {};
                    var desc = {};
                    var maxT = {};



                    for (var i = 0; i < 4; i++) {


                        result.data.weather.forEach(function(weather) {

                            switch (i) {


                                case 0:
                                    desc["Description"] = weather.hourly[0].weatherDesc[0].value;
                                    desc["Temperature Max"] = weather.maxtempC;
                                    desc["Temperature Min"] = weather.mintempC;
                                    break;
                                case 1:
                                    html["Day " + ++xdays] = desc
                                    break;
                            }

                        });

                    }

                    resolve(html);
                } else {
                    reject("Error occured");
                }
            });
    });
};




 forecast5days("Vancouver","5c64f9b43c864db9968204205180105").then((html)=>{
 	console.log(html)}).catch(function(){
 		console.log("Error occured")
 	})
