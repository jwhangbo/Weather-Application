const express = require('express');
const request = require('request')
const hbs = require('hbs');
const bodyParser = require('body-parser');
const fs = require('fs');

/**
 * Variable used to use express() module
 * @type {Objext}
 */
var app = express();

/**
 * Variable used to store search history
 * @type {Array}
 */
var history = [];

/**
 * Variable used for log text
 * @type {String}
 */
var log_text = "";
app.set('view engine', 'hbs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'));


/**
 * Variable used to store /public/ directory
 * @type {[type]}
 */
var dpub = __dirname + '/public/'
console.log(dpub)

app.get('/', (request, response) => {
    response.render(dpub + 'App.hbs');
});

app.post('/', function(request, response) {
    var returning_data = {}
    var location = request.body["location"]
    var home = request.body["home"]
    
    
    get_location(location).then((dictionary)=> {
        return get_weather(dictionary).then((weather)=>{
            returning_data["requested"] = weather
            return get_weather(home).then((weather)=>{
                returning_data["home"] = weather
                response.send(JSON.stringify(returning_data))
            }, (error) => {
                console.log(error)
            })
        }, (error)=> {
            console.log(error)
        })
    }, (error)=> {
        console.log(error)
    })
})

/**
 * Finds the location using Google Maps API.
 * @param {string} place - represents the coordinates of a location.
 */
function get_location(place){
    console.log(place)
    var dict = {}
    var key = "AIzaSyD_uaW1hFHnMbrH_7zAQ2gTpybH-NG8KGs"
    var link = `http://maps.googleapis.com/maps/api/geocode/json?address=${place}`
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
/**
 * Gets the weather and returns a dictionary with the weather information.
 * @param {string} lat - The latitude of the location.
 * @param {string} lng - the longitude of the location.
 */
function get_weather(info){
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
/**
 * Appends list into search.json.
 * @param {array} list - writes a list object into a json file.
 */
function write_file(list){
        fs.writeFileSync("search.json", JSON.stringify(list)); 
};

/**
 * reads a Json file and returns it into a string
 */
function read_file(){
    file = fs.readFileSync("search.json")
    var index_file = (-1 + JSON.parse(file.toString()).length)
    var file_cont = Object.values(JSON.parse(file.toString()))[index_file]["location"]
    log_text = log_text + file_cont + "<br>"
    return log_text
}

/**
 * makes the server accessable via an internet browser
 */
app.listen(8080, () => {
    console.log('server is up on port 8080');
});