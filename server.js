const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const fs = require('fs');

const geo = require("./geolocation.js")
const news = require("./news.js")


const keys = get_keys()
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

app.get('/', (request, response) => {
    response.render(dpub + 'App.hbs',{
        "apikey": keys.googlemaps
    });
});

app.post('/', function(request, response) {
    var returning_data = {}
    var location = request.body["location"]

    geo.get_location(location, keys.geolocation).then((dictionary)=>{
        //response.send(JSON.stringify(dictionary))
        returning_data["location"] = dictionary
        return news.NewsHeading(location, keys.news).then((dictionary)=>{
            returning_data["headlines"] = dictionary
            console.log(returning_data)
            response.send(JSON.stringify(returning_data))
        }, (error)=>{
            console.log(error);
        })
    },(error)=>{
        console.log(error)
    })
    
    
    /*
    get_location(location).then((dictionary)=> {
        return get_weather(dictionary).then((weather)=>{
            returning_data["requested"] = weather
            return get_weather(home).then((weather)=>{
                returning_data["home"] = weather
                console.log(returning_data)
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
    */
})

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
function get_keys(){
    file = fs.readFileSync("Apikeys.json")
    return JSON.parse(file)
}

/**
 * makes the server accessable via an internet browser
 */
app.listen(8080, () => {
    console.log('server is up on port 8080');
});
