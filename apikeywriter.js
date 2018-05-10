const fs = require("fs")

// writes a dictionary into a file called apikeys.json

dict = {
    geolocation:"[ApiKey]",
    //darksky:"[ApiKey]",
    googlemaps:"[ApiKey]",
    worldweatheronline:"[ApiKey]",
    news:"[ApiKey]",
    pixabay:"[ApiKey]"
}

fs.writeFileSync("Apikeys.json", JSON.stringify(dict))