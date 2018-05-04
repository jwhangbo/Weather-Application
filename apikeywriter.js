const fs = require("fs")

// writes a dictionary into a file called apikeys.json

dict = {
    geolocation:"",
    darksky:"",
    googlemaps:"",
    news:""
}

fs.writeFileSync("Apikeys.json", JSON.stringify(dict))