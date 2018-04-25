const express = require('express');
const request = require('request')
const hbs = require('hbs');
const bodyParser = require('body-parser');
const fs = require('fs');

var app = express();
var history = [];
var log_text = "";


app.set('view engine', 'hbs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'));

var dpub = __dirname + '/public/'
console.log(dpub)

app.get('/', (request, response) => {
    response.render(dpub + 'App.hbs');
});

app.post('/', function(request, response) {
    /*
    dict = {};
    console.log(request.body)
    //console.log(request.body["City"]);
   // get_dict(request.body["City"]);

    setTimeout(()=> {
        history.push(dict);
        write_file(history);
        response.render(dpub + 'App.hbs',{location: dict["location"], temperature: dict["temperature"] + "°C", summary: dict["summary"], latitude: dict["lat"], longitude: dict["lng"], file: read_file()});

    }, 2000)
    */
    var location = request.body["location"]
    get_location(location).then((dictionary)=> {
        return get_weather(dictionary).then((weather)=>{
            console.log(weather)
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
    var dict = {}
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
            reject("Some thing in googlemaps went wrong")
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
            reject("Something in darksky went wrong!")
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