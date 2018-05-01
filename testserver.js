const express = require('express');
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
    var returning_data = {}
    var location = request.body["location"]
    var home = request.body["home"]
    
    
    get_location(location).then((dictionary)=> {
        response.send(JSON.stringify(dictionary))
    }, (error)=> {
        console.log(error)
    })
})


function get_location(place){
    return new Promise((resolve, reject) => {
        var dict = { requested:
            { location: 'washington',
              lat: 47.7510741,
              long: -120.7401385,
              temperature: 12,
              summary: 'Clear' },
           home:
            { lat: 49.2776469,
              long: -122.9082689,
              temperature: 12,
              summary: 'Mostly Cloudy' } }
        resolve(dict)
    })
    
}

function write_file(list){
        fs.writeFileSync("search.json", JSON.stringify(list)); 
};

function read_file(){
    file = fs.readFileSync("search.json")
    var index_file = (-1 + JSON.parse(file.toString()).length)
    var file_cont = Object.values(JSON.parse(file.toString()))[index_file]["location"]
    log_text = log_text + file_cont + "<br>"
    return log_text
}

app.listen(8080, () => {
    console.log('server is up on port 8080');
});